'use client';
import { createContext, useContext, useState } from 'react';
import AuthModal from './AuthModal';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [initialView, setInitialView] = useState('login');

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

    return (
        <AuthContext.Provider value={{ openLogin, openSignup, closeAuth }}>
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
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};