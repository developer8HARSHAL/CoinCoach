"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Simplified Questions
const questions = [
  {
    question: "What is the first step towards financial independence?",
    options: ["Master Budgeting", "Leverage Compounding", "Achieve Financial Independence", "Understand Inflation"],
    answer: "Master Budgeting",
    type: "mcq",
  },
  {
    question: "True or False: Building an emergency fund is critical for financial stability.",
    options: ["True", "False"],
    answer: "True",
    type: "trueFalse",
  },
  {
    question: "What does compound interest help you with?",
    options: [
      "Pay off debts",
      "Grow wealth over time",
      "Help with inflation",
      "Avoid unnecessary spending",
    ],
    answer: "Grow wealth over time",
    type: "mcq",
  },
  {
    question: "What is the recommended emergency fund amount?",
    options: ["1-2 months of expenses", "3-6 months of expenses", "6-12 months of expenses", "1 year of expenses"],
    answer: "3-6 months of expenses",
    type: "mcq",
  },
  {
    question: "True or False: Inflation decreases your purchasing power.",
    options: ["True", "False"],
    answer: "True",
    type: "trueFalse",
  },
];

export default function FinancialIndependenceAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(30); // Timer set to 30 seconds

  useEffect(() => {
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isGameOver) {
      handleAnswer(""); // Time's up, automatically skip the question
    }
  }, [timer]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedOption(answer);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimer(30); // Reset timer for next question
        setSelectedOption("");
      } else {
        setIsGameOver(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setTimer(30);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-100 to-emerald-100 flex flex-col items-center py-10">
      {!isGameOver ? (
        <>
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Financial Independence Quiz
          </motion.h1>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg w-4/5 md:w-2/3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl font-semibold mb-4">{currentQuestion.question}</p>
            
            {currentQuestion.type === "mcq" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`w-full py-2 px-4 border rounded-lg ${selectedOption === option ? "bg-amber-500 text-white" : "bg-gray-200"}`}
                    onClick={() => handleAnswer(option)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {currentQuestion.type === "trueFalse" && (
              <div className="space-x-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`py-2 px-6 border rounded-lg ${selectedOption === option ? "bg-amber-500 text-white" : "bg-gray-200"}`}
                    onClick={() => handleAnswer(option)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            <div className="mt-6 text-lg font-semibold">
              Score: {score}/{questions.length}
            </div>
            <div className="mt-2 text-lg font-semibold">Time Left: {timer}s</div>
          </motion.div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Game Over! Your Final Score:
          </motion.h2>
          <p className="text-3xl font-semibold">{score} out of {questions.length}</p>
          <motion.button
            className="mt-4 py-2 px-6 bg-yellow-500 text-white font-bold rounded-lg"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Play Again
          </motion.button>
        </div>
      )}
    </div>
  );
}
