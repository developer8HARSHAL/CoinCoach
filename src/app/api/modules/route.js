// src/app/api/modules/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { coursesData } from '@/app/data/courses';

// Helper function to get current user email
async function getCurrentUserEmail() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('firebaseUserEmail');
    return authCookie ? authCookie.value : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Transform courses data into modules format
function transformCoursesToModules() {
  const modules = [];
  let moduleId = 1;

  // Transform youth courses
  coursesData.youth.forEach(course => {
    modules.push({
      id: moduleId++,
      courseId: course.id,
      title: course.name,
      description: course.desc,
      duration: getEstimatedDuration(course.id),
      difficulty: 'Beginner',
      category: getCourseCategory(course.id),
      rating: getRandomRating(),
      enrolledUsers: getRandomEnrollment(),
      imageUrl: course.img,
      addr: course.addr,
      targetAge: 'youth'
    });
  });

  // Transform adult courses
  coursesData.adult.forEach(course => {
    modules.push({
      id: moduleId++,
      courseId: course.id,
      title: course.name,
      description: course.desc,
      duration: getEstimatedDuration(course.id),
      difficulty: getCourseDifficulty(course.id),
      category: getCourseCategory(course.id),
      rating: getRandomRating(),
      enrolledUsers: getRandomEnrollment(),
      imageUrl: course.img,
      addr: course.addr,
      targetAge: 'adult'
    });
  });

  return modules;
}

// Helper functions for module properties
function getEstimatedDuration(courseId) {
  const durations = {
    'time-value-money': '30 min',
    'inflation': '25 min',
    'opportunity-cost': '20 min',
    'simple-compound-interest': '35 min',
    'bank-statements': '40 min',
    'digital-payments': '30 min',
    'taxation-basics': '45 min',
    'mutual-funds-basics': '50 min',
    'credit-debt-management': '60 min',
    'investment-basics': '75 min',
    'financial-independence': '90 min',
    'retirement-planning': '80 min',
    'tax-strategies': '70 min',
    'real-estate-investing': '85 min'
  };
  return durations[courseId] || '45 min';
}

function getCourseCategory(courseId) {
  const categories = {
    'time-value-money': 'Financial Basics',
    'inflation': 'Economics',
    'opportunity-cost': 'Financial Planning',
    'simple-compound-interest': 'Savings',
    'bank-statements': 'Banking',
    'digital-payments': 'Technology',
    'taxation-basics': 'Tax Planning',
    'mutual-funds-basics': 'Investing',
    'credit-debt-management': 'Debt Management',
    'investment-basics': 'Investing',
    'financial-independence': 'Wealth Building',
    'retirement-planning': 'Retirement',
    'tax-strategies': 'Tax Planning',
    'real-estate-investing': 'Investing'
  };
  return categories[courseId] || 'General';
}

function getCourseDifficulty(courseId) {
  const difficulties = {
    'credit-debt-management': 'Intermediate',
    'investment-basics': 'Intermediate',
    'financial-independence': 'Advanced',
    'retirement-planning': 'Intermediate',
    'tax-strategies': 'Advanced',
    'real-estate-investing': 'Advanced'
  };
  return difficulties[courseId] || 'Beginner';
}

function getRandomRating() {
  return (4.5 + Math.random() * 0.4).toFixed(1);
}

function getRandomEnrollment() {
  const enrollments = ['1.2k', '950', '800', '1.5k', '720', '2.1k', '650', '1.8k'];
  return enrollments[Math.floor(Math.random() * enrollments.length)];
}

// GET all modules with user progress
export async function GET(request) {
  try {
    const userEmail = await getCurrentUserEmail();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    
    // Get modules from courses data
    let modules = transformCoursesToModules();
    
    // Filter by category if specified
    if (category && category !== 'all') {
      modules = modules.filter(module => 
        module.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // If user is authenticated, get their progress
    let userProgress = {};
    let userModuleProgress = {};
    
    if (userEmail) {
      try {
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('users');
        const userData = await usersCollection.findOne({ email: userEmail });
        
        if (userData) {
          userProgress = userData.moduleProgress || {};
          userModuleProgress = userData.modules || {};
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue without user data if DB fails
      }
    }
    
    // Add progress and status to each module
    const modulesWithProgress = modules.map(module => {
      const courseProgress = userProgress[module.courseId] || {};
      const moduleProgress = userModuleProgress[module.id] || {};
      
      // Determine status based on progress
      let status = 'available';
      let progress = 0;
      
      if (courseProgress.progress !== undefined) {
        progress = courseProgress.progress;
        if (progress === 100) {
          status = 'completed';
        } else if (progress > 0) {
          status = 'in-progress';
        }
      }
      
      return {
        ...module,
        progress,
        status,
        completedSections: courseProgress.completedSections || 0,
        totalSections: courseProgress.totalModules || 1,
        lastAccessed: courseProgress.lastAccessed || null,
        startedAt: courseProgress.startedAt || null,
        completedAt: courseProgress.completedAt || null
      };
    });
    
    // Filter by status if specified
    let filteredModules = modulesWithProgress;
    if (status && status !== 'all') {
      filteredModules = modulesWithProgress.filter(module => 
        module.status === status
      );
    }
    
    // Calculate stats
    const stats = {
      total: modulesWithProgress.length,
      completed: modulesWithProgress.filter(m => m.status === 'completed').length,
      inProgress: modulesWithProgress.filter(m => m.status === 'in-progress').length,
      available: modulesWithProgress.filter(m => m.status === 'available').length,
      locked: modulesWithProgress.filter(m => m.status === 'locked').length
    };
    
    // Calculate category completion
    const categories = [...new Set(modulesWithProgress.map(m => m.category))];
    const categoryStats = categories.map(category => {
      const categoryModules = modulesWithProgress.filter(m => m.category === category);
      const completed = categoryModules.filter(m => m.status === 'completed').length;
      
      return {
        name: category,
        completed,
        total: categoryModules.length,
        color: getCategoryColor(category)
      };
    });
    
    return NextResponse.json({
      modules: filteredModules,
      stats,
      categoryStats,
      userAuthenticated: !!userEmail
    });
    
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch modules',
      details: error.message 
    }, { status: 500 });
  }
}

// Helper function to get category colors
function getCategoryColor(category) {
  const colors = {
    'Budgeting': 'bg-blue-500',
    'Investing': 'bg-green-500',
    'Savings': 'bg-yellow-500',
    'Debt Management': 'bg-red-500',
    'Tax Planning': 'bg-purple-500',
    'Financial Basics': 'bg-indigo-500',
    'Economics': 'bg-pink-500',
    'Financial Planning': 'bg-teal-500',
    'Banking': 'bg-orange-500',
    'Technology': 'bg-cyan-500',
    'Wealth Building': 'bg-emerald-500',
    'Retirement': 'bg-amber-500'
  };
  return colors[category] || 'bg-gray-500';
}

// POST - Update module progress
export async function POST(request) {
  try {
    const userEmail = await getCurrentUserEmail();
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { moduleId, courseId, progress, status, completedSections, totalSections } = await request.json();
    
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Update user's module progress
    const updateData = {
      [`moduleProgress.${courseId}`]: {
        progress: progress || 0,
        completedSections: completedSections || 0,
        totalModules: totalSections || 1,
        lastAccessed: new Date().toISOString(),
        ...(progress === 100 && { completedAt: new Date().toISOString() }),
        ...(progress > 0 && !await hasStartedBefore(userEmail, courseId) && { startedAt: new Date().toISOString() })
      }
    };
    
    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: updateData },
      { upsert: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Progress updated successfully',
      result 
    });
    
  } catch (error) {
    console.error('Error updating module progress:', error);
    return NextResponse.json({ 
      error: 'Failed to update progress',
      details: error.message 
    }, { status: 500 });
  }
}

// Helper function to check if user has started a course before
async function hasStartedBefore(userEmail, courseId) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    const userData = await usersCollection.findOne(
      { email: userEmail },
      { projection: { [`moduleProgress.${courseId}.startedAt`]: 1 } }
    );
    
    return userData?.moduleProgress?.[courseId]?.startedAt ? true : false;
  } catch (error) {
    console.error('Error checking start status:', error);
    return false;
  }
}