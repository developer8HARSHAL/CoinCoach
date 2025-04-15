"use client"
import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const askQuestion = async () => {
    const res = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();
    setResponse(`${data.term}: ${data.definition}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">CoinCoach Chatbot</h1>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Ask a financial term..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={askQuestion}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ask
      </button>
      {response && (
        <div className="mt-4 p-3 border rounded bg-gray-100">{response}</div>
      )}
    </div>
  );
}
