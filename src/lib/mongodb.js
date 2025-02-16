import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; 

if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let client;

export async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
    }
    return client.db('coincoach');
}
