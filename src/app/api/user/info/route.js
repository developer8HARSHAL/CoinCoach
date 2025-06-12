// src/app/api/user/info/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    // Get user email from cookie
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('firebaseUserEmail')?.value;
    
    // Check URL params as a fallback
    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get('email');
    
    // Use either cookie email or param email
    const email = userEmail || emailParam;
    
    if (!email) {
      console.log('No authenticated user found');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    console.log('Fetching user data for:', email);
    
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    // Fetch user data with proper field handling
    const userData = await userCollection.findOne({ email });
    console.log('Raw user data from MongoDB:', userData);
    
    if (!userData) {
      console.log('User not found in database:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Structure the response with proper data types and defaults
    const structuredUserData = {
      // Basic Profile Information
      _id: userData._id,
      uid: userData.uid,
      email: userData.email,
      name: userData.name || userData.displayName || 'User',
      displayName: userData.displayName || userData.name || 'User',
      profileImage: userData.profileImage || userData.photoURL || '',
      bio: userData.bio || '',
      location: userData.location || '',
      jobTitle: userData.jobTitle || '',
      
      // Demographics with proper type handling
      demographics: {
        age: userData.demographics?.age ? Number(userData.demographics.age) : null,
        ageGroup: userData.demographics?.ageGroup || null,
        ageVerified: userData.demographics?.ageVerified || false,
        gender: userData.demographics?.gender || null,
        education: userData.demographics?.education || null,
        occupation: userData.demographics?.occupation || null
      },
      
      // Learning Statistics (with defaults)
      completedModules: Number(userData.completedModules) || 0,
      inProgressModules: Number(userData.inProgressModules) || 0,
      totalModules: Number(userData.totalModules) || 20,
      averageScore: Number(userData.averageScore) || 0,
      learningStreak: Number(userData.learningStreak) || 0,
      lastLearningDate: userData.lastLearningDate || null,
      
      // Game Statistics
      gamesPlayed: Number(userData.gamesPlayed) || 0,
      gamesWon: Number(userData.gamesWon) || 0,
      favoriteGameCategory: userData.favoriteGameCategory || null,
      gameAchievements: userData.gameAchievements || [],
      
      // Progress Tracking
      weeklyProgress: userData.weeklyProgress || Array(7).fill(0),
      monthlyProgress: userData.monthlyProgress || Array(30).fill(0),
      skillLevels: userData.skillLevels || {
        financial_literacy: 0,
        budgeting: 0,
        investing: 0,
        saving: 0
      },
      
      // Badges/Achievements
      badges: userData.badges || [
        { 
          id: 1, 
          name: "Welcome", 
          icon: "👋", 
          description: "Joined the platform", 
          earned: true,
          earnedDate: userData.createdAt || new Date().toISOString()
        }
      ],
      
      // Learning Preferences
      preferredLearningTime: userData.preferredLearningTime || null,
      difficultyLevel: userData.difficultyLevel || 'beginner',
      notifications: userData.notifications || {
        email: true,
        push: true,
        weekly_summary: true,
        achievement_alerts: true
      },
      
      // Timestamps
      createdAt: userData.createdAt || new Date().toISOString(),
      lastUpdated: userData.lastUpdated || new Date().toISOString(),
      lastLoginDate: userData.lastLoginDate || new Date().toISOString(),
      profileCompleted: userData.profileCompleted || false,
      
      // Calculated fields
      winRate: userData.gamesPlayed > 0 ? 
        Math.round((userData.gamesWon / userData.gamesPlayed) * 100) : 0,
      completionRate: userData.totalModules > 0 ? 
        Math.round((userData.completedModules / userData.totalModules) * 100) : 0,
      
      // Additional metadata
      isActive: userData.isActive !== false, // Default to true if not specified
      accountStatus: userData.accountStatus || 'active',
      lastActiveDate: userData.lastActiveDate || new Date().toISOString()
    };
    
    console.log('Structured user data being returned:', {
      email: structuredUserData.email,
      name: structuredUserData.name,
      completedModules: structuredUserData.completedModules,
      gamesPlayed: structuredUserData.gamesPlayed,
      demographics: structuredUserData.demographics
    });
    
    return NextResponse.json(structuredUserData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch user data',
      details: error.message 
    }, { status: 500 });
  }
}