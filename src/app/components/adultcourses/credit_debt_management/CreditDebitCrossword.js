"use client";
import React, { useState, useMemo } from "react";
import Crossword from "@jaredreisinger/react-crossword";

const CreditDebitCrossword = () => {
  const [solved, setSolved] = useState(false);

  const data = useMemo(() => ({
    across: {
      "2": { clue: "Result of multiple credit applications", answer: "INQUIRY", row: 1, col: 0 },
      "4": { clue: "Most important factor in credit score", answer: "PAYMENTS", row: 3, col: 2 },
      "9": { clue: "High-interest debt payoff method", answer: "AVALANCHE", row: 9, col: 6 },
      "6": { clue: "Loans for beneficial investments", answer: "GOOD", row: 5, col: 8 }
    },
    down: {
      "7": { clue: "Represents creditworthiness", answer: "CREDIT", row: 2, col: 11 },
      "1": { clue: "Different types of credit accounts", answer: "MIX", row: 0, col: 0 },
      "3": { clue: "Amount of credit being used", answer: "USAGE", row: 1, col: 3 },
      "5": { clue: "Smallest debt payoff method", answer: "SNOWBALL", row: 3, col: 9 },
      "8": { clue: "Debt for non-essential expenses", answer: "BAD", row: 8, col: 6 },
      "10": { clue: "Yearly credit card charge", answer: "FEE", row: 7, col: 14 }
    }
  }), []);

  console.log("Crossword Data:", JSON.stringify(data, null, 2));

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Credit & Debt Management Crossword</h1>
      <div className="bg-white p-4 shadow-lg rounded-xl">
      <div style={{ width: "500px", height: "900px" }}>
          <Crossword
            data={data}
            onCrosswordCorrect={() => setSolved(true)}
          />
        </div>
        {solved && <p className="mt-4 text-green-600 font-semibold">Congratulations! You solved the crossword!</p>}
      </div>
    </div>
  );
};

export default CreditDebitCrossword;

