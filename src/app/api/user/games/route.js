// /app/api/user/games/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    // Get email from query params
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ 
        error: 'Email parameter is required' 
      }, { status: 400 });
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Find all game records for this user
    const gameHistory = await db
      .collection('games')
      .find({ email: email })
      .sort({ timestamp: -1 }) // Sort by most recent first
      .toArray();
    
    // Calculate statistics from game history
    const totalGamesPlayed = gameHistory.length;
    
    // Find highest score
    const bestGameScore = gameHistory.length > 0 
      ? Math.max(...gameHistory.map(game => game.score || 0))
      : 0;
    
    // Get date of last game played
    const lastGamePlayed = gameHistory.length > 0 
      ? gameHistory[0].timestamp 
      : null;

    // Return the data
    return NextResponse.json({
      totalGamesPlayed,
      bestGameScore,
      lastGamePlayed,
      gameHistory
    });
  } catch (error) {
    console.error('Error fetching game data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch game data' 
    }, { status: 500 });
  }
}