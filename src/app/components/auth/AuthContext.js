// src/app/components/auth/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import AuthModal from './AuthModal';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [modalView, setModalView] = useState(null); // "signup", "login", etc.
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    // Function to open modal with a specific view
    const openModal = (view) => {
        setModalView(view);
        setShowModal(true);
    };

    // Function to close modal
    const closeModal = () => {
        setShowModal(false);
        setModalView(null);
    };

    // Function to fetch user notifications
    const fetchNotifications = async () => {
        if (!user) return;
        
        console.log('Fetching notifications for user:', user?.email);
        try {
            const response = await fetch('/api/user/notifications');
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched notifications:', data.notifications);
                setNotifications(data.notifications || []);
                // Count unread notifications
                const unreadCount = data.notifications?.filter(notif => notif.unread).length || 0;
                setNotificationCount(unreadCount);
            } else {
                console.error('Failed to fetch notifications:', response.status);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    // Function to mark all notifications as read
    const markAllNotificationsAsRead = async () => {
        if (!user) return;
        
        try {
            const response = await fetch('/api/user/notifications', {
                method: 'PUT'
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Marked all notifications as read:', data);
                // Update local state
                setNotifications(prev => 
                    prev.map(notif => ({ ...notif, unread: false }))
                );
                setNotificationCount(0);
            }
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        }
    };

    // Sync user data with MongoDB when auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Store user email in a cookie for API access
                Cookies.set('firebaseUserEmail', currentUser.email, { secure: true, sameSite: 'strict' });

                // Sync user with MongoDB
                try {
                    await syncUserWithDatabase(currentUser);
                    // Fetch notifications after user is authenticated
                    console.log('User authenticated, fetching notifications');
                    // We need to make sure we update the user first before fetching notifications
                    setTimeout(() => fetchNotifications(), 1000);
                } catch (error) {
                    console.error("Error syncing user with database:", error);
                }
            } else {
                // Remove the auth cookie when user signs out
                Cookies.remove('firebaseUserEmail');
                // Clear notifications when user logs out
                setNotifications([]);
                setNotificationCount(0);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // We need to listen for user changes and fetch notifications when user changes
    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);

    // Function to sync Firebase user with MongoDB
    const syncUserWithDatabase = async (currentUser) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName || '',
                    photoURL: currentUser.photoURL || '',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to sync user data');
            }

            console.log('User synced with database');
        } catch (error) {
            console.error('Error syncing user with database:', error);
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await signOut(auth);
            Cookies.remove('firebaseUserEmail');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const value = {
        user,
        loading,
        modalView,
        showModal,
        notifications,
        notificationCount,
        fetchNotifications,
        markAllNotificationsAsRead,
        openModal,
        closeModal,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            <AuthModal
                isOpen={showModal}
                onClose={closeModal}
                initialView={modalView}
            />
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};