'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track route changes to show loading state
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      // Ensure loader is visible for at least 1.2 seconds for a better UX
      setTimeout(() => setIsLoading(false), 1200);
    };

    // This effect will run on route changes
    handleStart();
    
    // Simulate network delay for demonstration
    const timer = setTimeout(handleComplete, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <LoadingSpinner isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
};