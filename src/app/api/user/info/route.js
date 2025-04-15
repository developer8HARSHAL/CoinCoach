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
    
    const userData = await userCollection.findOne({ email });
    
    if (!userData) {
      console.log('User not found in database:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}