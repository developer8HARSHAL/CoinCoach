// src/app/api/courses/completion/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    // Get user email from cookie
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('firebaseUserEmail')?.value;
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    const userData = await userCollection.findOne({ email: userEmail });
    
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Return the user's completed courses
    return NextResponse.json({
      completedCourses: userData.completedCourses || [],
      courseProgress: userData.courseProgress || {}
    });
  } catch (error) {
    console.error('Error fetching course completion data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Get user email from cookie
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('firebaseUserEmail')?.value;
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { courseName, isCompleted } = await request.json();
    
    if (!courseName) {
      return NextResponse.json({ error: 'Course name is required' }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    // Find the user
    const userData = await userCollection.findOne({ email: userEmail });
    
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get current completed courses array
    const completedCourses = userData.completedCourses || [];
    const courseProgress = userData.courseProgress || {};
    
    let updatedCompletedCourses = [...completedCourses];
    let updatedCourseProgress = { ...courseProgress };
    
    if (isCompleted) {
      // Add course to completed list if not already there
      if (!completedCourses.includes(courseName)) {
        updatedCompletedCourses.push(courseName);
      }
      
      // Update course progress
      updatedCourseProgress[courseName] = {
        isCompleted: true,
        completedAt: new Date().toISOString(),
        progress: 100
      };
    } else {
      // Remove course from completed list
      updatedCompletedCourses = completedCourses.filter(course => course !== courseName);
      
      // Update course progress
      if (updatedCourseProgress[courseName]) {
        updatedCourseProgress[courseName] = {
          ...updatedCourseProgress[courseName],
          isCompleted: false,
          progress: 0
        };
      }
    }
    
    // Update user document
    const updateResult = await userCollection.updateOne(
      { email: userEmail },
      {
        $set: {
          completedCourses: updatedCompletedCourses,
          courseProgress: updatedCourseProgress,
          lastUpdated: new Date().toISOString()
        }
      }
    );
    
    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log(`Course ${courseName} completion updated for user ${userEmail}:`, {
      isCompleted,
      totalCompletedCourses: updatedCompletedCourses.length
    });
    
    return NextResponse.json({
      success: true,
      courseName,
      isCompleted,
      completedCourses: updatedCompletedCourses,
      courseProgress: updatedCourseProgress[courseName]
    });
    
  } catch (error) {
    console.error('Error updating course completion:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}