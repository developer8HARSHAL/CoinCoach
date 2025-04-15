// import { connectToDatabase } from "@/lib/mongodb"; // Ensure this path is correct

// export async function GET(request) {
//   try {
//     // Get the URL parameters
//     const { searchParams } = new URL(request.url);
//     const uid = searchParams.get("uid");

//     if (!uid) {
//       return new Response(
//         JSON.stringify({ error: "User ID is required" }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     console.log(`📊 Fetching progress data for user: ${uid}`);

//     // Connect to MongoDB
//     const { db } = await connectToDatabase();

//     // ✅ Fix: Use the correct collection name ("progress")
//     const userProgress = await db.collection("progress").findOne({ uid: uid });

//     if (!userProgress) {
//       console.log(`⚠️ No progress data found for user: ${uid}`);
//       // If no progress data found, return an empty modules object
//       return new Response(
//         JSON.stringify({ modules: {} }),
//         {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     console.log(`✅ Successfully retrieved progress data for user: ${uid}`);

//     // Return the module progress data
//     return new Response(
//       JSON.stringify({ modules: userProgress.modules }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("❌ Error fetching progress data:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to fetch progress data" }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }





import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
  try {
    // Get the URL parameters
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log(`📊 Fetching progress data for user: ${uid}`);

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Find user progress document
    const userProgress = await db.collection("progress").findOne({ uid: uid });

    if (!userProgress) {
      console.log(`⚠️ No progress data found for user: ${uid}`);
      // If no progress data found, return an empty modules object
      return new Response(
        JSON.stringify({ modules: {} }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log(`✅ Successfully retrieved progress data for user: ${uid}`);

    // Return the module progress data
    return new Response(
      JSON.stringify({ modules: userProgress.modules || {} }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error fetching progress data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch progress data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { uid, moduleId, moduleName, completedSections, totalSections, progress } = body;

    // Validate required fields
    if (!uid || !moduleId) {
      return new Response(
        JSON.stringify({ error: "User ID and Module ID are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Update or create the progress document
    const result = await db.collection("progress").updateOne(
      { uid },
      {
        $set: {
          [`modules.${moduleId}`]: {
            moduleName,
            completedSections,
            totalSections,
            progress,
            lastUpdated: new Date()
          }
        }
      },
      { upsert: true }
    );

    console.log(`✅ Progress updated for user ${uid}, module ${moduleId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Progress updated successfully", 
        moduleId
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error updating progress:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update progress" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}