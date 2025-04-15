// src/app/api/user/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { auth } from '@/app/firebase/Firebase';

// ✅ Make this async to use await inside
async function getCurrentUserEmail() {
  try {
    const cookieStore = await cookies(); // ✅ Await the cookies
    const sessionCookie = cookieStore.get('firebaseSessionToken');

    if (!sessionCookie) {
      console.error('No Firebase session token found');
      return null;
    }

    // This is a temporary solution
    const authCookie = cookieStore.get('firebaseUserEmail');
    return authCookie ? authCookie.value : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// ✅ GET user data from MongoDB
export async function GET() {
  try {
    const userEmail = await getCurrentUserEmail(); // ✅ Await here too

    if (!userEmail) {
      console.log('No authenticated user found');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('Fetching user data for:', userEmail);

    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');

    const userData = await userCollection.findOne({ email: userEmail });

    if (!userData) {
      console.log('User not found in database:', userEmail);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ UPDATE user data in MongoDB
export async function PUT(request) {
  try {
    const userEmail = await getCurrentUserEmail(); // ✅ Await here too

    if (!userEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const updatedData = await request.json();

    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');

    const result = await userCollection.updateOne(
      { email: userEmail },
      { $set: updatedData },
      { upsert: true }
    );

    const updatedUser = await userCollection.findOne({ email: userEmail });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
