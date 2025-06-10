"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import clsx from "clsx";

const smsOptions = [
  {
    message: "Congratulations! You won ₹5 crore in a lucky draw. Click here to claim your prize: bit.ly/claim-cash-now",
    isLegit: false,
  },
  {
    message: "Your bank will never ask for your PIN or OTP. Stay safe from frauds. - RBI",
    isLegit: true,
  },
];

export default function SpotTheScam() {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  };

  const resetGame = () => {
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        🕵️ Spot the Scam
      </h2>
      <p className="text-gray-600 mb-6">
        Which of the following messages is <span className="font-semibold">legitimate</span>?
      </p>

      <div className="space-y-4">
        {smsOptions.map((option, index) => {
          const isCorrect = option.isLegit;
          const isChosen = selected === index;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={clsx(
                "w-full text-left p-4 border rounded transition-all",
                !answered && "hover:bg-yellow-50",
                answered && isChosen && isCorrect && "bg-green-100 border-green-500",
                answered && isChosen && !isCorrect && "bg-red-100 border-red-400",
                answered && !isChosen && isCorrect && "bg-green-50 border-green-300"
              )}
            >
              <p className="text-sm text-gray-800">{option.message}</p>

              {answered && isChosen && isCorrect && (
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" /> Correct! This is a safe message.
                </div>
              )}

              {answered && isChosen && !isCorrect && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertTriangle className="w-4 h-4 mr-1" /> Oops! That was a phishing scam.
                </div>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={resetGame}
            className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200 rounded"
          >
            Try Another
          </button>
        </div>
      )}
    </div>
  );
}
