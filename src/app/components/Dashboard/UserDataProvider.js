'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Assume we have the user ID from authentication context
        // You'll need to replace this with your actual auth implementation
        const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
        
        if (!uid) {
          setLoading(false);
          return;
        }

        // Fetch user profile
        const userResponse = await fetch(`/api/user?uid=${uid}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Fetch progress data
        const progressResponse = await fetch(`/api/progress?uid=${uid}`);
        let progressData = null;
        
        if (progressResponse.ok) {
          progressData = await progressResponse.json();
        }

        // Combine data and update modules with progress information
        const combinedData = {
          ...userData,
          modules: userData.modules.map(module => {
            // Find module progress if it exists
            const moduleProgress = progressData?.modules?.find(m => m.moduleId === module.id);
            
            if (moduleProgress) {
              return {
                ...module,
                progress: moduleProgress.progress || 0,
                completedLessons: moduleProgress.completedSections || 0,
                completed: moduleProgress.completed || false,
                lastAccessed: moduleProgress.lastUpdated || module.lastAccessed
              };
            }
            
            return module;
          })
        };

        // Recalculate overall progress
        if (combinedData.modules.length > 0) {
          const totalLessons = combinedData.modules.reduce((sum, module) => sum + module.totalLessons, 0);
          const completedLessons = combinedData.modules.reduce((sum, module) => sum + (module.completedLessons || 0), 0);
          
          // Update analytics
          combinedData.analytics.moduleEngagement = combinedData.modules.map(module => ({
            module: module.title,
            percentage: module.progress || 0
          }));
        }
        
        setUserData(combinedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  // Function to update progress
  const updateModuleProgress = async (moduleId, moduleName, completedSections, totalSections, completed = false) => {
    try {
      const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
      if (!uid) return;

      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          moduleId,
          moduleName,
          completedSections,
          totalSections,
          completed
        }),
      });

      if (!response.ok) throw new Error('Failed to update progress');
      
      // Update local state to reflect changes immediately
      setUserData(prevData => {
        if (!prevData) return null;
        
        const progressPercentage = Math.round((completedSections / totalSections) * 100);
        
        return {
          ...prevData,
          modules: prevData.modules.map(module => 
            module.id === moduleId 
              ? {
                  ...module,
                  progress: progressPercentage,
                  completedLessons: completedSections,
                  completed: completed,
                  lastAccessed: new Date()
                } 
              : module
          ),
          // Update module engagement in analytics
          analytics: {
            ...prevData.analytics,
            moduleEngagement: prevData.modules.map(module => ({
              module: module.title,
              percentage: module.id === moduleId ? progressPercentage : module.progress || 0
            }))
          }
        };
      });

      return true;
    } catch (error) {
      console.error('Error updating module progress:', error);
      return false;
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, loading, error, updateModuleProgress }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}