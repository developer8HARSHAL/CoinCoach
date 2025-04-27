"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BudgetForm from "./budgetForm"; // Import BudgetForm component

export default function WelcomeScreen() {
  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [income, setIncome] = useState("");
  const [uid] = useState("user123");  // Replace with actual user ID logic
  const [editingEntry, setEditingEntry] = useState(null);
  const [allExpenses, setAllExpenses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (!userName || !userEmail) {
      setError("Please enter your name and email.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userEmail)) {
      setError("Please provide a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/budgetData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, userEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // If successful, show the BudgetForm screen
      setShowBudgetForm(true);

    } catch (err) {
      console.error("Error saving user:", err.message);
      setError(err.message || "Failed to save user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartPlanning = () => {
    setShowBudgetForm(true); // Show the BudgetForm screen after user details are submitted
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4">
      {!showBudgetForm ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full"
        >
          <form onSubmit={handleSubmit}>
            <motion.h1
              className="text-3xl font-bold text-orange-600 mb-3 tracking-tight"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to <span className="text-orange-500">Budget Planner</span>
            </motion.h1>

            <motion.p
              className="text-base text-gray-600 mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              💡 Take charge of your money — track, plan, and grow with the 50/30/20 rule.
            </motion.p>

            {error && (
              <motion.div
                className="mb-4 p-2 bg-red-100 text-red-600 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setName(e.target.value)}
              className="mb-3 w-full px-4 py-2 border border-orange-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-6 w-full px-4 py-2 border border-orange-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-full shadow-lg transition duration-300 disabled:opacity-50 w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Start Planning"
              )}
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <BudgetForm
          uid={uid}
          income={income}
          setIncome={setIncome}
          addEntry={setAllExpenses}  // Use this function to add entries to the list
          editingEntry={editingEntry}
          setEditingEntry={setEditingEntry}
          allExpenses={allExpenses}
        />
      )}
    </div>
  );
}
