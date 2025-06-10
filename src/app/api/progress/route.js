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
      return NextResponse.json({ 
        modules: {},
        completedCourses: []
      });
    }

    const userData = userSnap.data();
    
    // Return user progress data including completed courses
    return NextResponse.json({
      modules: userData.modules || {},
      completedCourses: userData.completedCourses || []
    });
  } catch (error) {
    console.error("Error in progress API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { uid, moduleId, moduleName, completedSections, totalSections, progress, markAsComplete } = await request.json();

    if (!uid || !moduleId) {
      return NextResponse.json({ error: "User ID and module ID are required" }, { status: 400 });
    }

    // Get user document
    const userDoc = doc(db, "users", uid);
    const userSnap = await getDoc(userDoc);

    // Prepare the module data
    const moduleData = {
      moduleName,
      completedSections,
      totalSections,
      progress: markAsComplete ? 100 : progress, // Ensure 100% when marking complete
      lastUpdated: new Date().toISOString()
    };

    // If marking as complete, add completion data
    if (markAsComplete) {
      moduleData.isCompleted = true;
      moduleData.completedAt = new Date().toISOString();
      moduleData.progress = 100; // Guarantee 100% progress
    }

    let updatedCompletedCourses = [];

    // If user doesn't exist, initialize with empty data
    if (!userSnap.exists()) {
      updatedCompletedCourses = markAsComplete ? [moduleId] : [];
      
      const newUserData = { 
        modules: {
          [moduleId]: moduleData
        },
        completedCourses: updatedCompletedCourses
      };
      
      await setDoc(userDoc, newUserData);
    } else {
      // Update existing user data
      const userData = userSnap.data();
      const existingCompletedCourses = userData.completedCourses || [];
      
      // Update completed courses array if marking as complete
      updatedCompletedCourses = [...existingCompletedCourses];
      if (markAsComplete && !existingCompletedCourses.includes(moduleId)) {
        updatedCompletedCourses.push(moduleId);
      }
      
      await setDoc(userDoc, {
        ...userData,
        modules: {
          ...userData.modules,
          [moduleId]: moduleData
        },
        completedCourses: updatedCompletedCourses
      });
    }

    console.log(`Course ${moduleId} completion status:`, {
      isCompleted: markAsComplete,
      progress: moduleData.progress,
      completedCourses: updatedCompletedCourses
    });

    // Return comprehensive response for frontend sync
    return NextResponse.json({ 
      success: true,
      isCompleted: markAsComplete,
      progress: moduleData.progress,
      completedCourses: updatedCompletedCourses,
      moduleData: moduleData
    });
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}