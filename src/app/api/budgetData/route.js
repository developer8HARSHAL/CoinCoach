export async function POST(request) {
    const { userName, userEmail } = await request.json();
  
    if (!userName || !userEmail) {
      return new Response(JSON.stringify({ error: "Missing userName or userEmail" }), { status: 400 });
    }
  
    // You can save to database here later
    console.log("Received user:", userName, userEmail);
  
    return new Response(JSON.stringify({ message: "User saved successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  