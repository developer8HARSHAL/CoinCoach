// src/app/api/user/notifications/profile-updated/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';

export async function PUT(request) {
  try {
    // Get user email from cookie
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('firebaseUserEmail')?.value;
    
    console.log('Updating profile notification for user:', userEmail);
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Find the user and their notifications
    const user = await usersCollection.findOne({ email: userEmail });
    
    if (!user) {
      console.log('User not found in database:', userEmail);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get user's current notifications
    const notifications = user.notifications || [];
    
    // Check if "Profile Updated" notification already exists
    const existingProfileUpdateIndex = notifications.findIndex(
      notif => notif.title === "Profile Updated"
    );
    
    // Find the "Complete your profile" notification
    const completeProfileIndex = notifications.findIndex(
      notif => notif.title === "Complete your profile"
    );
    
    // Create a new notification for profile update
    const profileUpdatedNotification = {
      id: Date.now(), // Generate a unique ID
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      time: new Date().toISOString(),
      unread: true
    };
    
    // Remove existing "Profile Updated" notification if it exists
    if (existingProfileUpdateIndex !== -1) {
      notifications.splice(existingProfileUpdateIndex, 1);
    }
    
    // Remove "Complete your profile" notification if it exists
    if (completeProfileIndex !== -1) {
      notifications.splice(completeProfileIndex, 1);
    }
    
    // Add the new notification at the beginning of the array
    notifications.unshift(profileUpdatedNotification);
    
    // Update user notifications in database
    await usersCollection.updateOne(
      { email: userEmail },
      { $set: { notifications: notifications } }
    );
    
    console.log('Successfully updated profile notification');
    return NextResponse.json({ 
      success: true,
      message: 'Profile notification updated' 
    });
  } catch (error) {
    console.error('Error updating profile notification:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}