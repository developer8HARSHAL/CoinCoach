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
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [content, setContent] = useState(null); // Store children content
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track route changes to show loading state
  useEffect(() => {
    setIsLoading(true);
    setContent(null);
    
    // Simulate network delay for demonstration
    const timer = setTimeout(() => {
      setContent(children);
      // Add a small delay before hiding the loader to ensure content is rendered
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams, children]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      {!isLoading ? children : null}
    </LoadingContext.Provider>
  );
};