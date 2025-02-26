// src/app/api/test-db/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await connectToDatabase();
        
        // Simple ping to verify connection
        await db.command({ ping: 1 });
        
        // Get some basic stats
        const stats = await db.stats();
        
        return NextResponse.json({
            status: 'Connected',
            databaseName: db.databaseName,
            collections: await db.listCollections().toArray(),
            stats: {
                collections: stats.collections,
                indexes: stats.indexes,
                objects: stats.objects
            }
        });
    } catch (error) {
        return NextResponse.json(
            { 
                status: 'Error',
                message: error.message 
            },
            { status: 500 }
        );
    }
}