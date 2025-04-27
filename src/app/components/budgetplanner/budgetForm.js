'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import BudgetList from './budgetList';

export default function BudgetForm({
  uid,
  income,
  setIncome,
  addEntry,
  editingEntry,
  setEditingEntry,
  allExpenses = [],
}) {
  const [showIncomeCard, setShowIncomeCard] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Set window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Load editing entry
  useEffect(() => {
    if (editingEntry) {
      setCategory(editingEntry.category);
      setDescription(editingEntry.description);
      setAmount(editingEntry.amount);
      setShowIncomeCard(true);
    }
  }, [editingEntry]);

  // Check 50/30/20 rule with 2% tolerance
  useEffect(() => {
    if (income > 0 && allExpenses.length > 0) {
      const totals = {
        Needs: 0,
        Wants: 0,
        Savings: 0,
      };

      allExpenses.forEach((exp) => {
        if (totals[exp.category] !== undefined) {
          totals[exp.category] += exp.amount;
        }
      });

      const needsPct = (totals.Needs / income) * 100;
      const wantsPct = (totals.Wants / income) * 100;
      const savingsPct = (totals.Savings / income) * 100;

      const withinRule =
        needsPct <= 52 && // 50% + 2% tolerance
        wantsPct <= 32 && // 30% + 2% tolerance
        savingsPct >= 18;  // 20% - 2% tolerance

      setShowSuccess(withinRule);
    } else {
      setShowSuccess(false);
    }
  }, [allExpenses, income]);

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!uid || !income || isNaN(income) || Number(income) <= 0) {
      setError('Please enter a valid income');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/budgetOperation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          operation: 'setIncome',
          data: { income: Number(income) },
        }),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Failed to save income');
      setShowIncomeCard(true);
      setShowSuccess(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    setError(null);

    if (!category || !amount || isNaN(amount) || Number(amount) <= 0 || !uid) {
      setError('Please fill in all fields correctly');
      return;
    }

    setIsLoading(true);
    try {
      const expenseData = {
        category,
        description: description || `${category} Expense`,
        amount: Number(amount),
        type: 'Expense',
        date: new Date().toISOString(),
        ...(editingEntry && { _id: editingEntry._id }),
      };

      const operation = editingEntry ? 'updateExpense' : 'addExpense';
      const body = {
        uid,
        operation,
        data: editingEntry
          ? { expenseId: editingEntry._id, expense: expenseData }
          : { expense: expenseData },
      };

      const response = await fetch('/api/budgetOperation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to save expense');

      // Proper state management for both add and update operations
      if (editingEntry) {
        // For updates, replace the existing entry
        const updatedExpenses = allExpenses.map(entry => 
          entry._id === editingEntry._id ? result.data.expense : entry
        );
        addEntry(updatedExpenses);
      } else {
        // For new entries, add to the existing array
        addEntry([...allExpenses, result.data.expense]);
      }

      // Reset form fields
      if (!editingEntry) {
        setCategory('');
        setDescription('');
        setAmount('');
      } else {
        setEditingEntry(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setShowIncomeCard(true);
  };

  const handleDeleteEntry = async (entryId) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/budgetOperation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          operation: 'deleteExpense',
          data: { expenseId: entryId },
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to delete expense');

      const updatedExpenses = allExpenses.filter(entry => entry._id !== entryId);
      addEntry(updatedExpenses);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 mt-10 bg-white/30 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 w-full max-w-2xl mx-auto space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">💰 Budget Planner</h2>

        {error && (
          <motion.div
            className="bg-red-100 text-red-600 p-3 rounded-md mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {showSuccess && (
          <>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={300}
            />
            <motion.div
              className="bg-green-200 text-green-800 p-4 rounded-xl font-bold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🎉 Great job! You're following the 50/30/20 rule!
            </motion.div>
          </>
        )}

        {!showIncomeCard ? (
          <form onSubmit={handleIncomeSubmit} className="flex gap-3 items-center">
            <input
              type="number"
              placeholder="Enter Monthly Income"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 shadow-inner transition"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
              min="0"
              step="0.01"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:scale-105 transition-transform ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Saving...' : 'Submit'}
            </button>
          </form>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 text-green-800 p-5 rounded-xl text-center shadow-lg text-2xl font-semibold"
            >
              Your Monthly Income: ₹{income.toLocaleString()}
            </motion.div>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Select Expense Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90"
                  required
                >
                  <option value="">Choose Category</option>
                  <option value="Needs">Needs (50%)</option>
                  <option value="Wants">Wants (30%)</option>
                  <option value="Savings">Savings (20%)</option>
                </select>
              </div>

              {category && (
                <>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-gray-300 p-3 rounded-lg h-24 resize-none bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder={`Describe your ${category.toLowerCase()} expense...`}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full border border-gray-300 p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={handleAddOrUpdate}
                      disabled={isLoading}
                      className={`px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {editingEntry ? 'Update Expense' : 'Add Expense'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* Budget List Section */}
      {showIncomeCard && (
        <div className="w-full max-w-6xl mx-auto">
          <BudgetList
            entries={allExpenses}
            income={income}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
        </div>
      )}
    </div>
  );
}