'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SetFinancialGoals({ income, expenses }) {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goals, setGoals] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Auto-suggest goal amount as 20% of income
  useEffect(() => {
    if (income) {
      const suggested = Math.round(income * 0.2);
      setGoalAmount(suggested);
    }
  }, [income]);

  // Add a new goal
  const handleAddGoal = () => {
    if (!goalName || !goalAmount) return;
    const newGoal = {
      id: Date.now(),
      name: goalName,
      target: Number(goalAmount),
      progress: 0,
      isCompleted: false,
      confettiShown: false,
    };
    setGoals([...goals, newGoal]);
    setGoalName('');
    setGoalAmount('');
  };

  // Delete goal
  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  // Calculate total savings
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const savings = income - totalExpenses;

  // Common goal suggestions
  const suggestedGoals = [
    { name: "Emergency Fund (3 months)", amount: Math.round(income * 3) },
    { name: "Vacation Fund", amount: Math.round(income * 0.5) },
    { name: "New Gadget", amount: Math.round(income * 0.3) }
  ];

  // Automatically update progress based on savings
  useEffect(() => {
    const newGoals = goals.map((goal) => {
      const calculatedProgress = Math.min((savings / goal.target) * 100, 100);
      const isCompleted = calculatedProgress >= 100;
      const justCompleted = isCompleted && goal.progress < 100;
      
      return {
        ...goal,
        progress: calculatedProgress,
        isCompleted,
        confettiShown: justCompleted ? false : goal.confettiShown
      };
    });

    setGoals(newGoals);

    // Show confetti for any newly completed goals
    if (newGoals.some((goal) => goal.isCompleted && !goal.confettiShown)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      setGoals((prevGoals) =>
        prevGoals.map((goal) => ({
          ...goal,
          confettiShown: goal.isCompleted ? true : goal.confettiShown,
        }))
      );
    }
  }, [expenses, income]);

  return (
    <div className="absolute top-6 right-6 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-md transition-all flex items-center gap-2"
      >
        🎯 {isOpen ? 'Hide Goals' : 'Set Goals'}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 150, damping: 18 }}
          className="mt-2 w-[320px] rounded-2xl shadow-2xl bg-white/70 backdrop-blur-xl p-4"
        >
          {showConfetti && <Confetti />}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎯</span>
            <h2 className="text-lg font-bold text-purple-700">Set Financial Goals</h2>
          </div>

          {/* Savings Summary */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-800">
              Current Savings: ₹{savings >= 0 ? savings : 0}
            </p>
            <p className={`text-xs ${savings >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {savings >= 0 ? 'Great job! You\'re saving money.' : 'Warning: You\'re overspending!'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-3 shadow-inner space-y-2">
            <input
              type="text"
              placeholder="Goal name (e.g., Save ₹5000)"
              className="w-full px-2 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setGoalName(e.target.value)}
              value={goalName}
            />
            <input
              type="number"
              placeholder="Target amount"
              className="w-full px-2 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setGoalAmount(e.target.value)}
              value={goalAmount}
            />

            {/* Quick Goal Suggestions */}
            <div className="grid grid-cols-3 gap-2">
              {suggestedGoals.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setGoalName(suggestion.name);
                    setGoalAmount(suggestion.amount);
                  }}
                  className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 p-1 rounded"
                >
                  {suggestion.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddGoal}
              className="w-full text-sm bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white py-1.5 rounded-md font-medium shadow-md transition-all"
            >
              ➕ Add Goal
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {goals.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4">No goals added yet</p>
            ) : (
              goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      value={goal.progress}
                      text={`${Math.round(goal.progress)}%`}
                      styles={buildStyles({
                        textSize: '24px',
                        pathColor: goal.isCompleted ? '#10b981' : '#4f46e5',
                        textColor: '#1f2937',
                        trailColor: '#e5e7eb',
                      })}
                    />
                  </div>
                  <div className="flex-1 ml-3 text-sm">
                    <p className="font-semibold text-gray-800">{goal.name}</p>
                    <p className="text-xs text-gray-500">
                      ₹{Math.round((goal.progress / 100) * goal.target)} / ₹{goal.target}
                    </p>
                    {goal.isCompleted && (
                      <p className="text-green-600 flex items-center gap-1 text-xs mt-1">
                        <FaCheckCircle /> Goal Achieved!
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ❌
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}