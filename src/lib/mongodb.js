// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

let client;
let cachedDb;

export async function connectToDatabase() {
    try {
        // If we have a cached connection, return it
        if (cachedDb) {
            console.log('Using cached database instance');
            return cachedDb;
        }

        // Connection options
        const options = {
            maxPoolSize: 10,
            minPoolSize: 5,
            retryWrites: true,
            w: 'majority',
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };

        // Create new connection
        if (!client) {
            console.log('Creating new database connection');
            client = new MongoClient(uri, options);
            await client.connect();
        }

        // Get database instance
        const db = client.db();
        
        // Set up indexes if they don't exist
        await setupIndexes(db);

        // Cache the database connection
        cachedDb = db;
        
        console.log('Successfully connected to MongoDB');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Unable to connect to database');
    }
}

async function setupIndexes(db) {
    try {
        // Create indexes for users collection
        await db.collection('users').createIndexes([
            { key: { uid: 1 }, unique: true },
            { key: { email: 1 }, unique: true },
            { key: { createdAt: 1 } }
        ]);

        // Create indexes for other collections as needed
        await db.collection('progress').createIndexes([
            { key: { uid: 1 } },
            { key: { updatedAt: 1 } }
        ]);

        await db.collection('quiz_results').createIndexes([
            { key: { uid: 1 } },
            { key: { completedAt: 1 } }
        ]);

        console.log('Database indexes have been set up');
    } catch (error) {
        console.error('Error setting up indexes:', error);
        // Don't throw error here - indexes are helpful but not critical
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        if (client) {
            await client.close();
            console.log('MongoDB connection closed through app termination');
        }
        process.exit(0);
    } catch (error) {
        console.error('Error during database disconnection:', error);
        process.exit(1);
    }
});