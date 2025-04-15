import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb://127.0.0.1:27017/coincoach"; // Use 127.0.0.1 instead of localhost
const MONGODB_DB_NAME = "coincoach";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log("📌 Connecting to MongoDB...");
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);

    cachedClient = client;
    cachedDb = db;

    console.log("✅ Connected to MongoDB:", MONGODB_DB_NAME);
    return { client, db };
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
}
