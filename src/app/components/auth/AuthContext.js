// src/app/components/auth/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import AuthModal from './AuthModal';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [initialView, setInitialView] = useState('login');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        
        return () => unsubscribe();
    }, []);

    const openLogin = () => {
        setInitialView('login');
        setIsAuthModalOpen(true);
    };

    const openSignup = () => {
        setInitialView('signup');
        setIsAuthModalOpen(true);
    };

    const closeAuth = () => {
        setIsAuthModalOpen(false);
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const value = {
        user,
        loading,
        openLogin,
        openSignup,
        closeAuth,
        logout,
        isAuthModalOpen,
        initialView
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={closeAuth} 
                initialView={initialView} 
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