// src/hooks/useModuleProgress.js
import { useState, useEffect } from 'react';
import { useAuth } from '../app/components/auth/AuthContext';

export default function useModuleProgress(moduleCategory = 'below-eighteen') {
  const { user } = useAuth();
  const [currentModule, setCurrentModule] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial progress when component mounts
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    fetchProgress();
  }, [user]);

  const fetchProgress = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/progress?uid=${user.uid}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // If user has progress for this module category, set it
        if (data.modules && data.modules[moduleCategory]) {
          setCurrentModule(data.modules[moduleCategory].completedSections + 1);
        }
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save progress when advancing to next module
  const saveProgress = async (currentModuleNumber, totalModules) => {
    if (!user) return;

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.uid,
          moduleId: moduleCategory,
          moduleName: "Below Eighteen Learning Path",
          completedSections: currentModuleNumber,
          totalSections: totalModules,
          progress: (currentModuleNumber / totalModules) * 100
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save progress');
      }
      
      console.log("Progress saved successfully");
      
      // Dispatch custom event to notify Dashboard that progress has been updated
      window.dispatchEvent(new Event('progressUpdated'));
      
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // Advance to next module and save progress
  const handleNext = async (totalModules) => {
    if (currentModule < totalModules) {
      // Save progress for the current module before advancing
      await saveProgress(currentModule, totalModules);
      
      // Advance to next module
      setCurrentModule(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    currentModule,
    setCurrentModule,
    handleNext,
    isLoading
  };
}