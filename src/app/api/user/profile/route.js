// src/app/api/user/profile/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';

// POST handler for updating user profile
export async function POST(request) {
  try {
    const updatedData = await request.json();
    const cookieStore = cookies();
    const userEmail = cookieStore.get('firebaseUserEmail')?.value;
    
    // Check if email exists in the request or cookies
    const email = updatedData.email || userEmail;
    
    if (!email) {
      console.log('No user email found for profile update');
      return NextResponse.json({ error: 'User email required' }, { status: 400 });
    }
    
    console.log('Updating profile for user:', email);
    
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    // Find the user by email
    const existingUser = await userCollection.findOne({ email });
    
    if (!existingUser) {
      console.log('User not found for profile update:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Update the user data
    const result = await userCollection.updateOne(
      { email },
      { 
        $set: {
          // Update basic profile fields
          name: updatedData.name || existingUser.name,
          location: updatedData.location || existingUser.location,
          bio: updatedData.bio || existingUser.bio,
          jobTitle: updatedData.jobTitle || existingUser.jobTitle,
          profileImage: updatedData.profileImage || existingUser.profileImage,
          
          // Update demographics
          demographics: updatedData.demographics || existingUser.demographics,
          
          // Update timestamp
          lastUpdated: new Date().toISOString()
        }
      }
    );
    
    // Get the updated user data
    const updatedUser = await userCollection.findOne({ email });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}