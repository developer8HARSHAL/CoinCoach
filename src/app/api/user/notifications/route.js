// src/app/api/user/notifications/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    // Get user email from cookie - FIX: use await before accessing cookies
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('firebaseUserEmail')?.value;
    
    console.log('Notifications API called for user:', userEmail);
    
    if (!userEmail) {
      console.log('No user email found in cookie');
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
    
    // Get user notifications or create default ones if they don't exist
    let notifications = user.notifications || [];
    
    // If notifications array is empty, create default welcome notifications
    if (notifications.length === 0) {
      console.log('Creating default notifications for user:', userEmail);
      // Default notifications for new users
      notifications = [
        {
          id: 1,
          title: "Welcome to CoinCoach!",
          description: "Start your financial journey with our courses and tools",
          time: new Date().toISOString(),
          unread: true
        },
        {
          id: 2,
          title: "Complete your profile",
          description: "Add more information to personalize your experience",
          time: new Date().toISOString(),
          unread: true
        },
        {
          id: 3,
          title: "Recommended course",
          description: "Budgeting Basics is perfect for beginners",
          time: new Date().toISOString(),
          unread: true
        }
      ];
      
      // Update user with default notifications
      await usersCollection.updateOne(
        { email: userEmail },
        { $set: { notifications: notifications } }
      );
    }
    
    console.log('Returning notifications:', notifications);
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Mark all notifications as read
export async function PUT(request) {
  try {
    // FIX: use await before accessing cookies
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('firebaseUserEmail')?.value;
    
    console.log('Marking notifications as read for user:', userEmail);
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Update all notifications to read
    await usersCollection.updateOne(
      { email: userEmail },
      { $set: { "notifications.$[].unread": false } }
    );
    
    console.log('Successfully marked all notifications as read');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}