'use client';
import React, { useState } from 'react';
import BudgetForm from './budgetForm';
import BudgetList from './budgetList';
import WelcomeScreen from './welcomeScreen';

export default function BudgetPlanner() {
  const [income, setIncome] = useState(0);
  const [entries, setEntries] = useState([]);
  const [started, setStarted] = useState(false);

  const handleAddEntry = (entry) => {
    setEntries([...entries, entry]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      {!started ? (
        <WelcomeScreen onStart={() => setStarted(true)} />
      ) : (
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-orange-700 text-center mb-6">Your Budget Planner</h2>
          <BudgetForm income={income} setIncome={setIncome} onAddEntry={handleAddEntry} />
          <BudgetList entries={entries} income={income} />
        </div>
      )}
    </div>
  );
}
