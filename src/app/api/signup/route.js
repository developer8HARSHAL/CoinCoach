// src/app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/Firebase';

export async function POST(request) {
    try {
        const { fullName, emailOrPhone, passcode } = await request.json();
        
        // Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, emailOrPhone, passcode);
        const user = userCredential.user;
        
        // Update user profile with fullName
        await updateProfile(user, {
            displayName: fullName
        });
        
        // Save user to MongoDB
        const db = await connectToDatabase();
        await db.collection('users').insertOne({
            uid: user.uid,
            email: emailOrPhone,
            displayName: fullName,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in signup:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong' }, 
            { status: 500 }
        );
    }
}