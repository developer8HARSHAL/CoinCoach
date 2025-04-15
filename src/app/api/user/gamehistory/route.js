// src/app/api/user/gamehistory/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    // Get email from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }
    
    console.log('Fetching game history for:', email);
    
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    // Find user and retrieve game history
    const user = await userCollection.findOne(
      { email },
      { projection: { gameHistory: 1, bestGameScore: 1, totalGamesPlayed: 1 } }
    );
    
    if (!user) {
      return NextResponse.json({ gameHistory: [] });
    }
    
    // Sort game history by date descending (newest first)
    const gameHistory = user.gameHistory || [];
    gameHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return NextResponse.json({
      gameHistory,
      bestGameScore: user.bestGameScore || 0,
      totalGamesPlayed: user.totalGamesPlayed || 0
    });
  } catch (error) {
    console.error('Error fetching game history:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}