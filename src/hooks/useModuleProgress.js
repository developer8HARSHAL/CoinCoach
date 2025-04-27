// src/hooks/useModuleProgress.js
import { useState, useEffect } from 'react';
import { useAuth } from '../app/components/auth/AuthContext';

export default function useModuleProgress(courseId, totalModules) {
  const [currentModule, setCurrentModule] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch progress when the component mounts
  useEffect(() => {
    if (user && courseId) {
      fetchProgress();
    } else if (!user) {
      setIsLoading(false);
    }
  }, [user, courseId]);

  // Fetch user's progress for this course
  const fetchProgress = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/progress?uid=${user.uid}`);
      const data = await response.json();
      
      if (data.modules && data.modules[courseId]) {
        const courseProgress = data.modules[courseId];
        setProgress(courseProgress.progress || 0);
        
        // If there's progress, calculate which module to start at
        if (courseProgress.completedSections) {
          const moduleToStart = Math.min(
            courseProgress.completedSections, 
            totalModules - 1
          );
          setCurrentModule(moduleToStart);
        }
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mark a specific module as complete
  const markModuleComplete = async (moduleIndex) => {
    if (!user) return;
    
    // Calculate new progress
    const completedSections = moduleIndex + 1;
    const newProgress = Math.round((completedSections / totalModules) * 100);
    
    try {
      // Update progress in state
      setProgress(newProgress);
      
      // Save progress to the server
      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          moduleId: courseId,
          moduleName: courseId,
          completedSections,
          totalModules,
          progress: newProgress,
        }),
      });
      
      return true;
    } catch (error) {
      console.error("Error saving progress:", error);
      return false;
    }
  };
  
  // Mark the entire course as complete (100%)
  const markCourseComplete = async () => {
    if (!user) return;
    
    try {
      // Update progress to 100%
      setProgress(100);
      
      // Save 100% progress to the server
      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          moduleId: courseId,
          moduleName: courseId,
          completedSections: totalModules,
          totalModules,
          progress: 100,
        }),
      });
      
      return true;
    } catch (error) {
      console.error("Error saving course completion:", error);
      return false;
    }
  };

  return {
    currentModule,
    setCurrentModule,
    progress,
    markModuleComplete,
    markCourseComplete,
    isLoading,
  };
}