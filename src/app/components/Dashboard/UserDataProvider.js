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
  const { user } = useAuth();

  // Fetch user data from MongoDB when component mounts or user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
    
      try {
        setLoading(true);
        console.log('Fetching user data for:', user.email);
    
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
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
    
        // Fallback to default profile with enhanced data structure
        if (user) {
          const defaultUserData = {
            name: user.displayName || "User Name",
            email: user.email,
            location: "",
            bio: "Tell us about yourself",
            jobTitle: "",
            profileImage: user.photoURL || "",
            demographics: {
              age: null,
              ageGroup: null,
              ageVerified: false
            },
            badges: [
              { id: 1, name: "Welcome", icon: "👋", description: "Joined the platform", earned: true },
            ],
            completedModules: 0,
            inProgressModules: 0,
            totalModules: 20,
            averageScore: 0,
            learningStreak: 0,
            lastLearningDate: null,
            gamesPlayed: 0,
            gamesWon: 0,
            favoriteGameCategory: null,
            gameAchievements: [],
            weeklyProgress: Array(7).fill(0),
            monthlyProgress: Array(30).fill(0),
            skillLevels: {
              financial_literacy: 0,
              budgeting: 0,
              investing: 0,
              saving: 0
            },
            preferredLearningTime: null,
            difficultyLevel: 'beginner',
            notifications: {
              email: true,
              push: true,
              weekly_summary: true,
              achievement_alerts: true
            },
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            profileCompleted: false
          };
    
          setUserData(defaultUserData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, toast]);

  // Function to update user data in MongoDB
  const updateUserData = async (updatedData) => {
    try {
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to update your profile.',
          variant: 'destructive',
        });
        return false;
      }
      
      setLoading(true);
      console.log('Updating user data:', updatedData);
      
      // Ensure email is included in the update data
      const dataToSend = {
        ...updatedData,
        email: user.email,
        lastUpdated: new Date().toISOString()
      };
      
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      console.log('Update response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API update error:', errorData);
        throw new Error(errorData.error || `Failed to update user data (${response.status})`);
      }
      
      const data = await response.json();
      console.log('Updated user data received:', data);
      setUserData(data);
      setError(null);
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been successfully saved.',
        variant: 'default',
      });
      
      return true;
    } catch (err) {
      console.error('Error updating user data:', err);
      setError(err.message);
      
      // Update local state but show error
      setUserData(updatedData);
      
      toast({
        title: 'Update Failed',
        description: `Could not save to database: ${err.message}`,
        variant: 'destructive',
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to update learning progress
  const updateLearningProgress = async (moduleId, progress, score) => {
    try {
      if (!userData) return false;
      
      const updatedUserData = {
        ...userData,
        completedModules: progress === 100 ? userData.completedModules + 1 : userData.completedModules,
        inProgressModules: progress > 0 && progress < 100 ? userData.inProgressModules + 1 : userData.inProgressModules,
        averageScore: score ? ((userData.averageScore + score) / 2) : userData.averageScore,
        lastLearningDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      return await updateUserData(updatedUserData);
    } catch (error) {
      console.error('Error updating learning progress:', error);
      return false;
    }
  };

  // Function to update game progress
  const updateGameProgress = async (gameData) => {
    try {
      if (!userData) return false;
      
      const updatedUserData = {
        ...userData,
        gamesPlayed: userData.gamesPlayed + 1,
        gamesWon: gameData.won ? userData.gamesWon + 1 : userData.gamesWon,
        favoriteGameCategory: gameData.category,
        lastUpdated: new Date().toISOString()
      };

      return await updateUserData(updatedUserData);
    } catch (error) {
      console.error('Error updating game progress:', error);
      return false;
    }
  };

  // Function to add achievement/badge
  const addAchievement = async (achievement) => {
    try {
      if (!userData) return false;
      
      const updatedBadges = [...(userData.badges || []), achievement];
      const updatedUserData = {
        ...userData,
        badges: updatedBadges,
        lastUpdated: new Date().toISOString()
      };

      const success = await updateUserData(updatedUserData);
      
      if (success) {
        toast({
          title: 'Achievement Unlocked!',
          description: `You earned the "${achievement.name}" badge!`,
          variant: 'default',
        });
      }
      
      return success;
    } catch (error) {
      console.error('Error adding achievement:', error);
      return false;
    }
  };

  // Calculate content filters based on user demographics
  const contentFilters = userData?.demographics?.age 
    ? {
        ageRestricted: userData.demographics.age < 18,
        difficultyLevel: userData.difficultyLevel || 'beginner',
        showAdvancedContent: userData.averageScore > 75
      }
    : { 
        ageRestricted: false, 
        difficultyLevel: 'beginner',
        showAdvancedContent: false 
      };

  // Calculate dashboard statistics
  const dashboardStats = userData ? {
    totalProgress: userData.completedModules && userData.totalModules 
      ? Math.round((userData.completedModules / userData.totalModules) * 100) 
      : 0,
    learningStreak: userData.learningStreak || 0,
    gamesWinRate: userData.gamesPlayed > 0 
      ? Math.round((userData.gamesWon / userData.gamesPlayed) * 100) 
      : 0,
    averageScore: userData.averageScore || 0,
    completionRate: userData.inProgressModules > 0 
      ? Math.round((userData.completedModules / (userData.completedModules + userData.inProgressModules)) * 100)
      : 0
  } : null;

  return (
    <UserDataContext.Provider 
      value={{ 
        userData, 
        updateUserData,
        updateLearningProgress,
        updateGameProgress,
        addAchievement,
        loading, 
        error,
        contentFilters,
        dashboardStats
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;