// src/hooks/useModuleProgress.js
import { useState, useEffect } from 'react';
import { useAuth } from '../app/components/auth/AuthContext';

export default function useModuleProgress(courseId, totalModules = 2) {
  const { user } = useAuth();
  const [currentModule, setCurrentModule] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial progress when component mounts or courseId changes
  useEffect(() => {
    if (!user || !courseId) {
      setIsLoading(false);
      return;
    }

    fetchProgress();
  }, [user, courseId]);

  const fetchProgress = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/progress?uid=${user.uid}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // If user has progress for this course, set it
        if (data.modules && data.modules[courseId]) {
          const moduleData = data.modules[courseId];
          setCurrentModule(Math.min(moduleData.completedSections, totalModules - 1));
          setProgress(moduleData.progress);
        } else {
          // Initialize with default values
          setCurrentModule(0);
          setProgress(0);
        }
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark a module as complete and save progress
  const markModuleComplete = async (moduleIndex) => {
    if (!user) return;
    
    // Calculate new progress
    const completedSections = moduleIndex + 1;
    const newProgress = Math.min(100, (completedSections / totalModules) * 100);
    
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.uid,
          moduleId: courseId,
          moduleName: courseId, // You might want to use a more readable name
          completedSections: completedSections,
          totalSections: totalModules,
          progress: newProgress
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save progress');
      }
      
      console.log("Progress saved successfully");
      setProgress(newProgress);
      
      // Dispatch custom event to notify Dashboard that progress has been updated
      window.dispatchEvent(new Event('progressUpdated'));
      
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  return {
    currentModule,
    setCurrentModule,
    progress,
    markModuleComplete,
    isLoading
  };
}