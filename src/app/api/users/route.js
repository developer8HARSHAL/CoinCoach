// src/app/api/users/route.js

import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { uid, email, displayName, photoURL } = await req.json();

    const { db } = await connectToDatabase();

    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ uid });

    if (!existingUser) {
      await usersCollection.insertOne({
        uid,
        email,
        displayName,
        photoURL,
        createdAt: new Date(),
      });
      console.log("✅ New user inserted:", email);
    } else {
      console.log("ℹ️ User already exists:", email);
    }

    return NextResponse.json({ message: "User synced successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error syncing user:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
