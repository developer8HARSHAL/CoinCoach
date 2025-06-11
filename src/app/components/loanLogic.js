"use client";

import { useState } from "react";

const questions = [
  {
    need: "Paying college tuition fees.",
    options: ["Home Loan", "Education Loan", "Personal Loan"],
    correct: "Education Loan",
  },
  {
    need: "Sudden medical expenses in the family.",
    options: ["Emergency Loan", "Car Loan", "Business Loan"],
    correct: "Emergency Loan",
  },
  {
    need: "Buying your first car.",
    options: ["Car Loan", "Gold Loan", "Education Loan"],
    correct: "Car Loan",
  },
  {
    need: "Expanding a small bakery business.",
    options: ["Business Loan", "Home Loan", "Personal Loan"],
    correct: "Business Loan",
  },
  {
    need: "Renovating your home.",
    options: ["Home Improvement Loan", "Car Loan", "Student Loan"],
    correct: "Home Improvement Loan",
  },
  {
    need: "Covering wedding expenses.",
    options: ["Wedding Loan", "Gold Loan", "Auto Loan"],
    correct: "Wedding Loan",
  },
  {
    need: "Buying a house.",
    options: ["Home Loan", "Emergency Loan", "Education Loan"],
    correct: "Home Loan",
  },
  {
    need: "Need quick cash, have gold ornaments.",
    options: ["Gold Loan", "Business Loan", "Car Loan"],
    correct: "Gold Loan",
  },
];

export default function LoanLogic() {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[level];

  const handleSelect = (choice) => {
    if (selected) return;
    setSelected(choice);

    if (choice === current.correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (level + 1 < questions.length) {
        setLevel(level + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const reset = () => {
    setLevel(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="max-w-md mx-auto my-24 bg-white p-6 text-center shadow rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Loan Match Score</h2>
        <p className="text-4xl font-extrabold text-purple-700">{score} / {questions.length}</p>
        <p className="mt-4 text-gray-600 text-lg">
          {score >= 7 ? "🎯 You're a loan logic master!" :
           score >= 5 ? "⚖️ Good job! A little polish needed." :
           "📚 Keep practicing to learn loan basics better!"}
        </p>
        <button onClick={reset} className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-24 bg-white p-6 rounded-xl shadow text-center">
      <h1 className="text-3xl font-extrabold text-purple-800 mb-4">💸 Loan Logic</h1>
      <p className="text-lg text-gray-600 mb-2">Level {level + 1} of {questions.length}</p>
      <p className="text-gray-700 text-lg mb-6">
        Which loan best fits the need?
      </p>

      <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6 border border-gray-200">
        <p className="text-xl font-medium text-gray-800">{current.need}</p>
      </div>

      <div className="grid gap-4">
        {current.options.map((option) => {
          const isCorrect = option === current.correct;
          const isChosen = selected === option;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full py-3 px-4 border rounded-md transition text-left ${
                selected
                  ? isChosen && isCorrect
                    ? "bg-green-100 border-green-500 text-green-700"
                    : isChosen && !isCorrect
                    ? "bg-red-100 border-red-400 text-red-700"
                    : isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-white border-gray-300"
                  : "hover:bg-purple-50 border-gray-300"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
