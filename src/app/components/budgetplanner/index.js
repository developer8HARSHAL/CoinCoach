// src/app/components/budgetplanner/index.js
'use client';
import React, { useState, useEffect } from 'react';
import BudgetForm from './budgetForm';
import BudgetList from './budgetList';
import WelcomeScreen from './welcomeScreen';
import SetFinancialGoals from './SetFinancialGoals';
import CongratulationModal from './congratulationModal';
import ProfileMenu from './profileMenu';
import AchievementHistory from './achievementHistory';
import BudgetingHistory from './budgetingHistory';
import Confetti from 'react-confetti';
import { auth } from '@/app/firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function BudgetPlanner() {
  const [income, setIncome] = useState(0);
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasAchievedRule, setHasAchievedRule] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Set window size
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

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch user budget data when authenticated
  useEffect(() => {
    const fetchBudgetData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/budgetOperation?uid=${user.uid}&operation=getData`);
        const result = await response.json();

        if (response.ok && result.data) {
          setIncome(result.data.income || 0);
          setEntries(result.data.expenses || []);
          setAchievements(result.data.achievements || []);
          
          // Check if 50/30/20 achievement exists
          const has5030Rule = result.data.achievements?.some(
            a => a.type === '50/30/20'
          );
          setHasAchievedRule(has5030Rule || false);
        }
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    if (user?.uid) {
      fetchBudgetData();
    }
  }, [user]);

  // Check 50/30/20 rule and add achievement
  useEffect(() => {
    if (!user?.uid || !income || income <= 0 || entries.length === 0) return;

    const totals = {
      Needs: 0,
      Wants: 0,
      Savings: 0,
    };

    entries.forEach((entry) => {
      if (totals[entry.category] !== undefined) {
        totals[entry.category] += Number(entry.amount);
      }
    });

    const needsPercent = (totals.Needs / income) * 100;
    const wantsPercent = (totals.Wants / income) * 100;
    const savingsPercent = (totals.Savings / income) * 100;

    // With 2% tolerance
    const withinRule = 
      needsPercent <= 52 && 
      wantsPercent <= 32 && 
      savingsPercent >= 18;

    if (withinRule && !hasAchievedRule) {
      setShowCongratsModal(true);
      setShowConfetti(true);
      setHasAchievedRule(true);
      
      // Add achievement
      const newAchievement = {
        type: '50/30/20',
        date: new Date().toISOString(),
        message: 'Followed 50/30/20 budgeting rule'
      };
      
      saveAchievement(newAchievement);
    }
  }, [entries, income, hasAchievedRule, user]);

  // Save achievement to database
  const saveAchievement = async (achievement) => {
    if (!user?.uid) return;

    try {
      const response = await fetch('/api/budgetOperation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          operation: 'addAchievement',
          data: { achievement }
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.data.achievement) {
        setAchievements(prev => [...prev, result.data.achievement]);
      }
    } catch (err) {
      console.error('Failed to save achievement:', err);
    }
  };

  const handleModalClose = () => {
    setShowCongratsModal(false);
    setShowConfetti(false);
  };

  const handleAddEntry = (updatedEntries) => {
    setEntries(updatedEntries);
  };

  const handleDeleteEntry = async (id) => {
    if (!user?.uid) return;

    try {
      const response = await fetch('/api/budgetOperation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          operation: 'deleteExpense',
          data: { expenseId: id },
        }),
      });

      if (response.ok) {
        setEntries(prev => prev.filter(entry => entry._id !== id));
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-orange-100 p-6 relative">
      {showConfetti && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          recycle={false} 
          numberOfPieces={500} 
        />
      )}

      <ProfileMenu 
        setActiveSection={setActiveSection} 
        userInfo={{
          userName: user.displayName || user.email.split('@')[0],
          userEmail: user.email,
          uid: user.uid
        }}
        achievements={achievements}
      />
      
      {showCongratsModal && <CongratulationModal onClose={handleModalClose} />}

      {activeSection === 'achievements' && (
        <AchievementHistory 
          achievements={achievements} 
          onClose={() => setActiveSection(null)} 
        />
      )}
      
      {activeSection === 'budget' && (
        <BudgetingHistory 
          entries={entries} 
          onClose={() => setActiveSection(null)} 
        />
      )}

      {!activeSection && (
        <div className="max-w-4xl mx-auto mt-4">
          <p className="text-xl font-semibold text-center mb-4">
            Welcome, {user.displayName || user.email.split('@')[0]}!
          </p>

          <BudgetForm
            uid={user.uid}
            income={income}
            setIncome={setIncome}
            addEntry={handleAddEntry}
            editingEntry={editingEntry}
            setEditingEntry={setEditingEntry}
            allExpenses={entries}
          />

          {entries.length > 0 && (
            <BudgetList
              entries={entries}
              income={Number(income)}
              onEdit={setEditingEntry}
              onDelete={handleDeleteEntry}
            />
          )}

          <SetFinancialGoals
            income={income}
            expenses={entries}
            achievements={achievements}
          />
        </div>
      )}
    </div>
  );
}