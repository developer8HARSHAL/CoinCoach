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
    
    // Ensure gameResult has required fields
    const gameData = {
      gameId: gameResult.gameId || 'unknown-game',
      gameName: gameResult.gameName || 'Unknown Game',
      score: gameResult.score || 0,
      level: gameResult.level || 1,
      duration: gameResult.duration || 0,
      completed: gameResult.completed || false,
      timestamp: new Date(),
      ...gameResult // Include any additional game-specific data
    };
    
    // Update user document with new game result
    const result = await userCollection.updateOne(
      { email },
      {
        $push: {
          gameHistory: gameData
        },
        $set: {
          lastGamePlayed: new Date()
        },
        $inc: {
          totalGamesPlayed: 1
        },
        $max: {
          bestGameScore: gameResult.score || 0
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
          gameHistory: [gameData],
          gamesPlayed: [], // For tracking which games were played
          lastGamePlayed: new Date(),
          totalGamesPlayed: 1,
          totalUniqueGamesPlayed: 0,
          bestGameScore: gameResult.score || 0,
          createdAt: new Date(),
          lastUpdated: new Date()
        });
      }
    } else {
      // Update the lastUpdated timestamp
      await userCollection.updateOne(
        { email },
        { $set: { lastUpdated: new Date() } }
      );
    }
    
    // Also update the gamesPlayed array if gameId is provided
    if (gameResult.gameId) {
      await userCollection.updateOne(
        { email },
        {
          $addToSet: {
            gamesPlayed: {
              gameId: gameResult.gameId,
              gameName: gameResult.gameName || 'Unknown Game',
              gameDescription: gameResult.gameDescription || '',
              gameLink: gameResult.gameLink || '',
              playedAt: new Date(),
              timesPlayed: 1
            }
          }
        }
      );
      
      // Update times played if game already exists
      await userCollection.updateOne(
        { email, 'gamesPlayed.gameId': gameResult.gameId },
        {
          $inc: { 'gamesPlayed.$.timesPlayed': 1 },
          $set: { 'gamesPlayed.$.lastPlayedAt': new Date() }
        }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Game result saved successfully',
      gameData 
    });
  } catch (error) {
    console.error('Failed to save game results:', error.message || error);
    return NextResponse.json({ 
      error: 'Failed to save game result' 
    }, { status: 500 });
  }
}








