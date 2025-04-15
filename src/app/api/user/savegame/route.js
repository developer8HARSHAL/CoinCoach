// src/app/api/user/savegame/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { email, gameResult } = await request.json();
    
    if (!email || !gameResult) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }
    
    console.log('Saving game result for:', email);
    
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    // Update user document with new game result
    const result = await userCollection.updateOne(
      { email },
      {
        $push: {
          gameHistory: {
            ...gameResult,
            timestamp: new Date()
          }
        },
        $set: {
          lastGamePlayed: new Date()
        },
        $inc: {
          totalGamesPlayed: 1
        },
        $max: {
          bestGameScore: gameResult.score
        }
      }
    );
    
    
    if (result.modifiedCount === 0) {
      // If no document was modified, check if user exists
      const user = await userCollection.findOne({ email });
      
      if (!user) {
        // Create a new user document if user doesn't exist
        await userCollection.insertOne({
          email,
          gameHistory: [{ ...gameResult, timestamp: new Date() }],
          lastGamePlayed: new Date(),
          totalGamesPlayed: 1,
          bestGameScore: gameResult.score
        });
      }
    }
    
    return NextResponse.json({ success: true, message: 'Game result saved successfully' });
  } catch (error) {
 
      console.error('Failed to save game results', error.message || error);
   
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}