// src/app/api/user/games/route.js
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

    console.log('Fetching game data for:', email);

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const userCollection = db.collection('users');
    
    // Find user document
    const user = await userCollection.findOne({ email });
    
    if (!user) {
      return NextResponse.json({
        totalGamesPlayed: 0,
        totalUniqueGamesPlayed: 0,
        bestGameScore: 0,
        lastGamePlayed: null,
        gamesPlayed: [],
        gameHistory: []
      });
    }
    
    // Extract game data from user document
    const gamesPlayed = user.gamesPlayed || [];
    const gameHistory = user.gameHistory || [];
    const totalGamesPlayed = user.totalGamesPlayed || 0;
    const totalUniqueGamesPlayed = user.totalUniqueGamesPlayed || gamesPlayed.length;
    
    // Calculate best score from game history
    const bestGameScore = gameHistory.length > 0 
      ? Math.max(...gameHistory.map(game => game.score || 0))
      : 0;
    
    // Get date of last game played
    const lastGamePlayed = user.lastGamePlayed || 
      (gameHistory.length > 0 ? gameHistory[gameHistory.length - 1].timestamp : null) ||
      (gamesPlayed.length > 0 ? gamesPlayed[gamesPlayed.length - 1].lastPlayedAt || gamesPlayed[gamesPlayed.length - 1].playedAt : null);

    // Return comprehensive game data
    return NextResponse.json({
      totalGamesPlayed,
      totalUniqueGamesPlayed,
      bestGameScore,
      lastGamePlayed,
      gamesPlayed: gamesPlayed.map(game => ({
        gameId: game.gameId,
        gameName: game.gameName,
        timesPlayed: game.timesPlayed,
        firstPlayedAt: game.playedAt,
        lastPlayedAt: game.lastPlayedAt || game.playedAt
      })),
      gameHistory: gameHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    });
  } catch (error) {
    console.error('Error fetching game data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch game data' 
    }, { status: 500 });
  }
}