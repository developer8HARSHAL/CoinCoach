"use client";
import { useState, useRef, useEffect } from "react";
import { FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm CoinCoach. Ask me about any financial term and I'll explain it in simple words.",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const askQuestion = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { text: `${data.term}: ${data.definition}`, sender: "bot" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") askQuestion();
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FiMessageSquare size={24} />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[80vh] bg-white rounded-xl shadow-lg z-50 flex flex-col overflow-hidden border">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center">
              <RiRobot2Line className="text-xl mr-2" />
              <h1 className="text-lg font-semibold">CoinCoach</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-sm hover:underline"
            >
              ✕
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-xs rounded-lg px-3 py-2 text-sm ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-2">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 border rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask about financial terms..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                onClick={askQuestion}
                disabled={isLoading || !input.trim()}
                className={`bg-blue-600 text-white px-3 py-2 rounded-r-lg text-sm ${
                  isLoading || !input.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
