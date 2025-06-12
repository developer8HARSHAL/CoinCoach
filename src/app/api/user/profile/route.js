// src/app/api/user/profile/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// POST handler for updating user profile
export async function POST(request) {
  try {
    const updatedData = await request.json();
    
    // Get email from the request body (sent from UserDataProvider)
    const email = updatedData.email;
    
    if (!email) {
      console.log('No user email found in request body');
      return NextResponse.json({ error: 'User email required' }, { status: 400 });
    }
    
    console.log('Updating profile for user:', email);
    console.log('Update data received:', updatedData);
    
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    // Prepare the update data
    const updateFields = {
      name: updatedData.name,
      location: updatedData.location,
      bio: updatedData.bio,
      jobTitle: updatedData.jobTitle,
      profileImage: updatedData.profileImage,
      demographics: updatedData.demographics,
      badges: updatedData.badges,
      completedModules: updatedData.completedModules,
      inProgressModules: updatedData.inProgressModules,
      totalModules: updatedData.totalModules,
      averageScore: updatedData.averageScore,
      learningStreak: updatedData.learningStreak,
      lastLearningDate: updatedData.lastLearningDate,
      gamesPlayed: updatedData.gamesPlayed,
      gamesWon: updatedData.gamesWon,
      favoriteGameCategory: updatedData.favoriteGameCategory,
      gameAchievements: updatedData.gameAchievements,
      weeklyProgress: updatedData.weeklyProgress,
      monthlyProgress: updatedData.monthlyProgress,
      skillLevels: updatedData.skillLevels,
      preferredLearningTime: updatedData.preferredLearningTime,
      difficultyLevel: updatedData.difficultyLevel,
      notifications: updatedData.notifications,
      profileCompleted: updatedData.profileCompleted,
      lastUpdated: updatedData.lastUpdated || new Date().toISOString()
    };

    // Remove undefined fields
    Object.keys(updateFields).forEach(key => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });
    
    console.log('Fields to update:', updateFields);
    
    // Use upsert to create user if doesn't exist, or update if exists
    const result = await userCollection.updateOne(
      { email },
      { 
        $set: updateFields,
        $setOnInsert: {
          email: email,
          createdAt: new Date().toISOString()
        }
      },
      { upsert: true }
    );
    
    console.log('Update result:', result);
    
    // Get the updated/created user data
    const updatedUser = await userCollection.findOne({ email });
    
    console.log('Updated user data:', updatedUser);
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ 
      error: error.message,
      details: 'Failed to update user profile in database'
    }, { status: 500 });
  }
}

// GET handler for retrieving user profile (optional, for testing)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    const user = await userCollection.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}