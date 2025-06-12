// src/app/api/user/games/status/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const gameId = searchParams.get('gameId');
    
    if (!email || !gameId) {
      return NextResponse.json({ 
        error: 'Email and gameId parameters are required' 
      }, { status: 400 });
    }

    console.log('Checking game status for:', { email, gameId });

    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    // Find user and check if game was played
    const user = await userCollection.findOne({ 
      email,
      'gamesPlayed.gameId': gameId 
    });
    
    const isPlayed = !!user;
    const gameData = user?.gamesPlayed?.find(game => game.gameId === gameId);
    
    return NextResponse.json({
      isPlayed,
      gameData: gameData || null,
      timesPlayed: gameData?.timesPlayed || 0,
      lastPlayedAt: gameData?.lastPlayedAt || gameData?.playedAt || null
    });
    
  } catch (error) {
    console.error('Error checking game status:', error);
    return NextResponse.json({ 
      error: 'Failed to check game status' 
    }, { status: 500 });
  }
}