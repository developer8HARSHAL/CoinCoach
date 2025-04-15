// src/app/components/auth/AuthGate.js
'use client';

import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import LoadingSpinner from '../loader/LoadingSpinner'; // Assuming you have this component

export default function AuthGate({ children }) {
  const { user, loading, openModal } = useAuth();
  
  useEffect(() => {
    // Once loading is complete and there's no user, show the login modal
    if (!loading && !user) {
      openModal('login');
    }
  }, [loading, user, openModal]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // If user is authenticated, show the content
  // Otherwise, show a minimal placeholder while the modal opens
  return user ? children : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg text-gray-600 mb-4">Please log in to continue</p>
    </div>
  );
}