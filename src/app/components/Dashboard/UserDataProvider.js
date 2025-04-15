// src/app/components/dashboard/UserDataProvider.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../auth/AuthContext';

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const { user } = useAuth(); // Get the authenticated user from AuthContext

  // Fetch user data from MongoDB when component mounts or user changes
  useEffect(() => {
    const fetchUserData = async () => {
      // Don't fetch if user is not logged in
      if (!user) {
        setLoading(false);
        return;
      }
    
      try {
        setLoading(true);
        console.log('Fetching user data for:', user.email);
    
        // Use the new endpoint with email as a query parameter
        const response = await fetch(`/api/user/info?email=${encodeURIComponent(user.email)}`);
        console.log('API response status:', response.status);
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch user data');
        }
    
        const data = await response.json();
        console.log('User data received:', data);
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
    
        // Fallback to default profile
        if (user) {
          const defaultUserData = {
            name: user.displayName || "User Name",
            email: user.email,
            location: "",
            bio: "Tell us about yourself",
            jobTitle: "",
            profileImage: user.photoURL || "",
            demographics: {},
            badges: [],
            completedModules: 0,
            inProgressModules: 0,
            averageScore: 0
          };
    
          setUserData(defaultUserData);
    
          toast({
            title: 'Using default profile',
            description: 'We\'ll save your information when you update your profile.',
            variant: 'default',
          });
        }
      } finally {
        setLoading(false);
      }
    };
    

    fetchUserData();
  }, [user, toast]); // Add user as dependency to re-fetch when user changes

// Function to update user data in MongoDB
const updateUserData = async (updatedData) => {
  try {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to update your profile.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    console.log('Updating user data:', updatedData);
    
    // Change the endpoint from '/api/user' to '/api/user/profile'
    // Change the method from 'PUT' to 'POST'
    const response = await fetch('/api/user/profile', {
      method: 'POST', // Changed from PUT to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updatedData,
        email: user.email // Explicitly include the email
      }),
    });
    
    console.log('Update response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API update error:', errorData);
      throw new Error(errorData.error || 'Failed to update user data');
    }
    
    const data = await response.json();
    console.log('Updated user data received:', data);
    setUserData(data);
    
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
      variant: 'default',
    });
  } catch (err) {
    console.error('Error updating user data:', err);
    setError(err.message);
    
    // Still update the local state even if saving to DB failed
    setUserData(updatedData);
    
    toast({
      title: 'Update Failed',
      description: 'Changes saved locally, but couldn\'t update database. Please try again later.',
      variant: 'destructive',
    });
  } finally {
    setLoading(false);
  }
};

  // Calculate content filters based on user demographics
  const contentFilters = userData?.demographics?.age 
    ? {
        ageRestricted: userData.demographics.age < 18,
        // Add other filters as needed
      }
    : { ageRestricted: false };

  // Provide user data and update function to all children
  return (
    <UserDataContext.Provider 
      value={{ 
        userData, 
        updateUserData, 
        loading, 
        error,
        contentFilters
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;