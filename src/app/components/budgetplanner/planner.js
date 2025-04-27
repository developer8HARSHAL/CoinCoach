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

export default function Planner() {
    const [income, setIncome] = useState(0);
    const [entries, setEntries] = useState([]);
    const [started, setStarted] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [goals, setGoals] = useState([]);
    const [showCongratsModal, setShowCongratsModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [hasAchievedRule, setHasAchievedRule] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [activeSection, setActiveSection] = useState(null);
    const [achievements, setAchievements] = useState([]); // New state for achievements
    
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

    // Load initial state from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedStarted = localStorage.getItem('budgetPlannerStarted');
            const savedUserInfo = localStorage.getItem('budgetPlannerUserInfo');
            const savedEntries = localStorage.getItem('budgetPlannerEntries');
            const savedIncome = localStorage.getItem('budgetPlannerIncome');
            const savedHasAchieved = localStorage.getItem('budgetPlannerHasAchieved');

            if (savedStarted === 'true') setStarted(true);
            if (savedUserInfo) setUserInfo(JSON.parse(savedUserInfo));
            if (savedEntries) setEntries(JSON.parse(savedEntries));
            if (savedIncome) setIncome(Number(savedIncome));
            if (savedHasAchieved) setHasAchievedRule(savedHasAchieved === 'true');
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('budgetPlannerStarted', String(started));
            if (userInfo) {
                localStorage.setItem('budgetPlannerUserInfo', JSON.stringify(userInfo));
            }
            localStorage.setItem('budgetPlannerEntries', JSON.stringify(entries));
            localStorage.setItem('budgetPlannerIncome', String(income));
            localStorage.setItem('budgetPlannerHasAchieved', String(hasAchievedRule));
        }
    }, [started, userInfo, entries, income, hasAchievedRule]);

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
            if (started && userInfo?.uid) {
                try {
                    const response = await fetch(`/api/budgetOperation?uid=${userInfo.uid}&operation=getData`);
                    const result = await response.json();

                    if (response.ok && result.data) {
                        setIncome(result.data.income || 0);
                        setEntries(result.data.expenses || []);
                        setAchievements(result.data.achievements || []); // Load achievements
                    } else if (response.status === 404) {
                        setStarted(false);
                        localStorage.setItem('budgetPlannerStarted', 'false');
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchData();
    }, [started, userInfo?.uid]);

    // Check 50/30/20 rule and add achievement
    useEffect(() => {
        if (income > 0 && entries.length > 0) {
            const totals = {
                Needs: 0,
                Wants: 0,
                Savings: 0,
            };

            entries.forEach((entry) => {
                if (totals[entry.category] !== undefined) {
                    totals[entry.category] += entry.amount;
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
                    id: Date.now(),
                    type: '50/30/20',
                    date: new Date().toISOString(),
                    message: 'Followed 50/30/20 budgeting rule'
                };
                
                setAchievements(prev => [...prev, newAchievement]);
                saveAchievement(newAchievement);
            }
        }
    }, [entries, income, hasAchievedRule]);

    // Save achievement to database
    const saveAchievement = async (achievement) => {
        try {
            const response = await fetch('/api/budgetOperation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: userInfo?.uid,
                    operation: 'addAchievement',
                    data: { achievement }
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
        } catch (err) {
            console.error('Failed to save achievement:', err);
        }
    };

    const handleStart = async ({ userName, userEmail, uid }) => {
        setUserInfo({ userName, userEmail, uid });
        setStarted(true);
        localStorage.setItem('budgetPlannerStarted', 'true');
    };

    const handleModalClose = () => {
        setShowCongratsModal(false);
        setShowConfetti(false);
    };

    const addEntry = async (newEntry) => {
        try {
            if (editingEntry) {
                const response = await fetch('/api/budgetOperation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        uid: userInfo.uid,
                        operation: 'updateExpense',
                        data: {
                            expenseId: editingEntry._id,
                            expense: newEntry,
                        },
                    }),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Update failed');

                setEntries(newEntry
                );
                setEditingEntry(null);
            } else {
                const response = await fetch('/api/budgetOperation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        uid: userInfo.uid,
                        operation: 'addExpense',
                        data: { expense: newEntry },
                    }),
                });

                const fetchExpenses = async () => {
                    const response = await fetch('/api/budgetOperation', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        uid,
                        operation: 'getExpenses',
                      }),
                    });
                    const result = await response.json();
                    if (response.ok) {
                      setAllExpenses(result.data.expenses || []);
                    }
                  };
                
                  if (uid) {
                    fetchExpenses();
                  }
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Add failed');

                const insertedEntry = result.data.expenses.find(exp => 
                    exp.amount === newEntry.amount && exp.category === newEntry.category
                );
                setEntries(prevEntries => [...prevEntries, insertedEntry]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteEntry = async (id) => {
        try {
            const response = await fetch('/api/budgetOperation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: userInfo.uid,
                    operation: 'deleteExpense',
                    data: { expenseId: id },
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Delete failed');
            setEntries(prevEntries => prevEntries.filter(entry => entry._id !== id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
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

            {!started ? (
                <WelcomeScreen onStart={handleStart} />
            ) : (
                <>
                    <ProfileMenu 
                        setActiveSection={setActiveSection} 
                        userInfo={userInfo}
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
                    {activeSection === 'profile' && (
                        <Profile 
                            userInfo={userInfo} 
                            achievements={achievements}
                            onClose={() => setActiveSection(null)} 
                        />
                    )}

                    {!activeSection && (
                        <div className="max-w-4xl mx-auto mt-4">
                            {userInfo && (
                                <p className="text-xl font-semibold text-center mb-4">
                                    Welcome, {userInfo.userName}!
                                </p>
                            )}

                            <BudgetForm
                                uid={userInfo?.uid}
                                income={income}
                                setIncome={setIncome}
                                addEntry={addEntry}
                                editingEntry={editingEntry}
                                setEditingEntry={setEditingEntry}
                                allExpenses={entries}
                            />

                            <BudgetList
                                entries={entries}
                                income={Number(income)}
                                onEdit={setEditingEntry}
                                onDelete={deleteEntry}
                            />

                            <SetFinancialGoals
                                income={income}
                                expenses={entries}
                                goals={goals}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}