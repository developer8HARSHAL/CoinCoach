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
    
    // Find the user
    const user = await usersCollection.findOne({ email: userEmail });
    
    if (!user) {
      console.log('User not found in database:', userEmail);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Filter out all profile-related notifications and keep only non-profile ones
    let notifications = (user.notifications || []).filter(notif => 
      notif.title !== "Complete your profile" && 
      notif.title !== "Profile Updated"
    );
    
    // Create a new notification for profile update
    const profileUpdatedNotification = {
      id: Date.now(),
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      time: new Date().toISOString(),
      unread: true
    };
    
    // Add the new notification at the beginning of the array
    notifications.unshift(profileUpdatedNotification);
    
    // Update the entire notifications array
    await usersCollection.updateOne(
      { email: userEmail },
      { $set: { notifications: notifications } }
    );
    
    console.log('Successfully replaced all profile notifications with a single update notification');
    return NextResponse.json({ 
      success: true,
      message: 'Profile notification updated' 
    });
  } catch (error) {
    console.error('Error updating profile notification:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}