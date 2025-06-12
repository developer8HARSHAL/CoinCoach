// src/app/api/user/games/mark-played/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { email, gameId, gameName, gameDescription, gameLink } = await request.json();
    
    console.log('Marking game as played:', { email, gameId, gameName });

    if (!email || !gameId || !gameName) {
      return NextResponse.json(
        { error: 'Missing required fields: email, gameId, gameName' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Find the user
    let user = await usersCollection.findOne({ email });

    if (!user) {
      // Create new user with proper structure
      const newUser = {
        email,
        gamesPlayed: [],
        gameHistory: [],
        totalGamesPlayed: 0,
        totalUniqueGamesPlayed: 0,
        createdAt: new Date(),
        lastActive: new Date()
      };
      
      await usersCollection.insertOne(newUser);
      user = newUser;
    }

    // MIGRATION: Fix existing users with incorrect gamesPlayed structure
    let needsMigration = false;
    
    if (!Array.isArray(user.gamesPlayed)) {
      // Store the old count for migration
      const oldGamesPlayedCount = typeof user.gamesPlayed === 'number' ? user.gamesPlayed : 0;
      
      // Migrate the user document structure
      await usersCollection.updateOne(
        { email },
        {
          $set: {
            gamesPlayed: [], // Convert to array
            gameHistory: user.gameHistory || [],
            totalGamesPlayed: oldGamesPlayedCount,
            totalUniqueGamesPlayed: user.totalUniqueGamesPlayed || 0,
            lastActive: new Date(),
            migratedAt: new Date()
          }
        }
      );
      
      // Refresh user document after migration
      user = await usersCollection.findOne({ email });
      needsMigration = true;
      console.log(`Migrated user ${email} - old gamesPlayed count: ${oldGamesPlayedCount}`);
    }
    
    if (!Array.isArray(user.gameHistory)) {
      user.gameHistory = [];
    }

    // Check if game already exists in user's played games
    const existingGame = user.gamesPlayed.find(game => game.gameId === gameId);

    const currentTime = new Date();

    if (existingGame) {
      // Game already played, increment play count
      await usersCollection.updateOne(
        { email, 'gamesPlayed.gameId': gameId },
        {
          $inc: { 
            'gamesPlayed.$.timesPlayed': 1,
            'totalGamesPlayed': 1
          },
          $set: {
            'gamesPlayed.$.lastPlayedAt': currentTime,
            'lastActive': currentTime,
            'lastGamePlayed': currentTime
          }
        }
      );

      return NextResponse.json({
        success: true,
        message: 'Game play count updated',
        isNewGame: false,
        timesPlayed: existingGame.timesPlayed + 1
      });
    } else {
      // New game for this user
      const newGameEntry = {
        gameId,
        gameName,
        gameDescription: gameDescription || '',
        gameLink: gameLink || '',
        playedAt: currentTime,
        lastPlayedAt: currentTime,
        timesPlayed: 1
      };

      await usersCollection.updateOne(
        { email },
        {
          $push: { gamesPlayed: newGameEntry },
          $inc: { 
            totalGamesPlayed: 1,
            totalUniqueGamesPlayed: 1
          },
          $set: {
            lastActive: currentTime,
            lastGamePlayed: currentTime
          }
        }
      );

      return NextResponse.json({
        success: true,
        message: 'New game marked as played',
        isNewGame: true,
        timesPlayed: 1
      });
    }

  } catch (error) {
    console.error('Failed to mark game as played:', error);
    return NextResponse.json(
      { error: 'Failed to mark game as played', details: error.message },
      { status: 500 }
    );
  }
}