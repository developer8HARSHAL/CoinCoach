// src/app/components/auth/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import AuthModal from './AuthModal';
import Cookies from 'js-cookie'; // You'll need to install this package

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [modalView, setModalView] = useState(null); // "signup", "login", etc.
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    // Sync user data with MongoDB when auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Store user email in a cookie for API access
                Cookies.set('firebaseUserEmail', currentUser.email, { secure: true });

                // Sync user with MongoDB
                try {
                    await syncUserWithDatabase(currentUser);
                } catch (error) {
                    console.error("Error syncing user with database:", error);
                }
            } else {
                // Remove the auth cookie when user signs out
                Cookies.remove('firebaseUserEmail');
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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
