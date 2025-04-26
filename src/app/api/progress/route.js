// src/app/api/progress/route.js
import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config";

export async function GET(request) {
  try {
    // Extract user ID from query params
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Get user progress from Firestore
    const userDoc = doc(db, "users", uid);
    const userSnap = await getDoc(userDoc);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnap.data();
    
    // Return user progress data
    return NextResponse.json({
      modules: userData.modules || {},
    });
  } catch (error) {
    console.error("Error in progress API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { uid, moduleId, moduleName, completedSections, totalSections, progress } = await request.json();

    if (!uid || !moduleId) {
      return NextResponse.json({ error: "User ID and module ID are required" }, { status: 400 });
    }

    // Get user document
    const userDoc = doc(db, "users", uid);
    const userSnap = await getDoc(userDoc);

    // If user doesn't exist, initialize with empty data
    if (!userSnap.exists()) {
      await setDoc(userDoc, { 
        modules: {
          [moduleId]: {
            moduleName,
            completedSections,
            totalSections,
            progress,
            lastUpdated: new Date().toISOString()
          }
        }
      });
    } else {
      // Update existing user data
      const userData = userSnap.data();
      
      await setDoc(userDoc, {
        ...userData,
        modules: {
          ...userData.modules,
          [moduleId]: {
            moduleName,
            completedSections,
            totalSections,
            progress,
            lastUpdated: new Date().toISOString()
          }
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}