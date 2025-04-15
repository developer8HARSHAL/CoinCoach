'use client';
import { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function AuthModal({ isOpen, onClose, initialView }) {
    const [currentView, setCurrentView] = useState(initialView);

    useEffect(() => {
        setCurrentView(initialView);
    }, [initialView]);

    if (!isOpen) return null;

    return (
        <>
            {currentView === 'login' ? (
                <Login
                    isOpen={isOpen}
                    onClose={onClose}
                    onSwitchToSignup={() => setCurrentView('signup')}
                />
            ) : (
                <Signup
                    isOpen={isOpen}
                    onClose={onClose}
                    onSwitchToLogin={() => setCurrentView('login')}
                />
            )}
            
        </>
    );
}