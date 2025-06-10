"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import clsx from "clsx";

const questions = [
  {
    messages: [
      "Congratulations! You have won a free iPhone. Click here to claim: bit.ly/free-prize",
      "RBI reminder: Do not share your OTP or PIN with anyone. Stay secure."
    ],
    correctIndex: 1,
  },
  {
    messages: [
      "Your bank account will be blocked! Click here immediately to verify your KYC.",
      "Your electricity bill of ₹950 is due. Pay at your official provider's site."
    ],
    correctIndex: 1,
  },
  {
    messages: [
      "Dear user, claim your gift card worth ₹500 now: winbig.in",
      "Never share ATM PIN over call or SMS – Bank of India"
    ],
    correctIndex: 1,
  },
  {
    messages: [
      "You have been selected for a government subsidy. Click to enter Aadhaar details.",
      "UIDAI will never ask for your biometric or OTP over phone or email."
    ],
    correctIndex: 1,
  },
  {
    messages: [
      "Your PayTM KYC is incomplete. Click to update now or your account will be locked.",
      "PayTM will never ask for sensitive information via unofficial links."
    ],
    correctIndex: 1,
  },
  {
    messages: [
      "You've won ₹1 lakh in a WhatsApp lottery. Contact us urgently!",
      "IRCTC: Booking confirmation for your train is available in the app or official site."
    ],
    correctIndex: 1,
  },
  {
    messages: [
      "Income Tax refund available. Click here to submit your bank details.",
      "Income Tax Department never asks for account info via SMS/email."
    ],
    correctIndex: 1,
  },
  {
    messages: [
      "Urgent! Suspicious login from Russia. Click to secure your account immediately.",
      "Enable 2FA and regularly update your password to stay safe online."
    ],
    correctIndex: 1,
  },
];

export default function SpotTheScam() {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const current = questions[level];

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === current.correctIndex) setScore(score + 1);
    setTimeout(() => {
      if (level + 1 < questions.length) {
        setLevel(level + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1300);
  };

  const getResultMessage = () => {
    if (score >= 7) return "🛡️ You're scam-proof! Excellent instincts.";
    if (score >= 5) return "⚠️ Fair awareness, but be cautious!";
    return "🚨 You're likely to get scammed. Learn and stay alert!";
  };

  const resetGame = () => {
    setLevel(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-lg border border-yellow-100">
      <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 py-10 px-6 rounded-xl shadow-inner text-center mb-10">
        <h1 className="text-4xl font-extrabold text-yellow-800 mb-4">
          🕵️‍♀️ Spot the Scam Challenge!
        </h1>
        <p className="text-xl text-yellow-700 max-w-xl mx-auto">
          Can you tell a real message from a scam? Test your fraud-spotting skills in this 8-level challenge!
        </p>
      </div>

      {showResult ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Scam Awareness Score</h2>
          <p className="text-5xl font-extrabold text-yellow-600 mb-4">{score}/8</p>
          <p className="text-lg text-gray-700 mb-6">{getResultMessage()}</p>
          <button
            onClick={resetGame}
            className="flex items-center mx-auto px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Level {level + 1} of 8</h2>
            <p className="text-gray-600">Tap the message you think is <span className="text-green-700 font-medium">legitimate</span>.</p>
          </div>

          <div className="space-y-4">
            {current.messages.map((msg, idx) => {
              const isCorrect = idx === current.correctIndex;
              const isChosen = idx === selected;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={clsx(
                    "w-full text-left p-4 border rounded-xl transition-all duration-300",
                    selected === null && "hover:bg-yellow-50",
                    selected !== null && isChosen && isCorrect && "bg-green-100 border-green-500 text-green-800",
                    selected !== null && isChosen && !isCorrect && "bg-red-100 border-red-400 text-red-800",
                    selected !== null && !isChosen && isCorrect && "bg-green-50 border-green-300"
                  )}
                >
                  <p className="text-base font-medium">{msg}</p>
                  {selected !== null && isChosen && isCorrect && (
                    <div className="mt-2 flex items-center text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" /> Correct
                    </div>
                  )}
                  {selected !== null && isChosen && !isCorrect && (
                    <div className="mt-2 flex items-center text-red-600 text-sm">
                      <AlertTriangle className="w-4 h-4 mr-1" /> Incorrect
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
