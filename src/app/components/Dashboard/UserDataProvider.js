'use client';

import React, { createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

const defaultUserData = {
  name: "Harshal",
  email: "harshal@gmail.com",
  profileImage: "https://i.pinimg.com/474x/7e/dd/fc/7eddfcef47fb69ef3d9f68a6bc4f708a.jpg",
  bio: "Financial enthusiast learning to build wealth and stability. Working in tech with a passion for sustainable investing.",
  message: "Currently focused on creating my emergency fund and understanding the stock market basics.",
  streaks: {
    currentWeekly: 5,
    longestWeekly: 8,
    currentMonthly: 3,
    longestMonthly: 6
  },
  games: {
    total: 24,
    completed: 15,
    highestScore: 950,
    lastPlayed: "2025-02-25",
    favoriteGame: "Investment Simulator"
  },
  modules: [
    {
      id: 1,
      title: "Early Savings & Budgeting",
      totalLessons: 12,
      completedLessons: 8,
      progress: 67,
      lastAccessed: "2025-02-25",
      image: "/saving.png",
      description: "Learn fundamental saving strategies and budgeting techniques to build a solid financial foundation."
    },
    {
      id: 2,
      title: "Investment Basics",
      totalLessons: 14,
      completedLessons: 5,
      progress: 36,
      lastAccessed: "2025-02-24",
      image: "",
      description: "Understand how different investment vehicles work and start building your portfolio."
    },
    {
      id: 3,
      title: "Credit & Debt Management",
      totalLessons: 10,
      completedLessons: 3,
      progress: 30,
      lastAccessed: "2025-02-23",
      image: "",
      description: "Master credit scores, debt repayment strategies, and healthy borrowing habits."
    },
    {
      id: 4,
      title: "Retirement & Future Planning",
      totalLessons: 12,
      completedLessons: 2,
      progress: 17,
      lastAccessed: "2025-02-20",
      image: "",
      description: "Set up retirement accounts and create a roadmap for long-term financial security."
    },
    {
      id: 5,
      title: "Financial Independence & Wealth Building",
      totalLessons: 15,
      completedLessons: 1,
      progress: 7,
      lastAccessed: "2025-02-15",
      image: "",
      description: "Advanced strategies for building sustainable wealth and achieving financial freedom."
    }
  ],
  activityLog: [
    { date: "2025-02-26", activities: ["Completed Budget Planning lesson", "Practiced creating monthly budget"] },
    { date: "2025-02-25", activities: ["Reviewed Emergency Fund concepts", "Completed quiz on Savings Strategies"] },
    { date: "2025-02-24", activities: ["Studied Stock Market Basics", "Watched video on ETFs vs Mutual Funds"] },
    { date: "2025-02-23", activities: ["Completed Credit Score lesson", "Took assessment on Debt Types"] },
    { date: "2025-02-22", activities: ["Weekend - No activities"] },
    { date: "2025-02-21", activities: ["Completed Expense Tracking exercise", "Read article on 50/30/20 Rule"] },
    { date: "2025-02-20", activities: ["Reviewed 401k Options lesson", "Practiced retirement calculator"] }
  ],
  analytics: {
    timeSpent: [
      { week: "Week 1", hours: 3.5 },
      { week: "Week 2", hours: 4.2 },
      { week: "Week 3", hours: 5.8 },
      { week: "Week 4", hours: 4.5 },
      { week: "Week 5", hours: 6.2 }
    ],
    moduleEngagement: [
      { module: "Savings", percentage: 45 },
      { module: "Investment", percentage: 25 },
      { module: "Credit", percentage: 15 },
      { module: "Retirement", percentage: 10 },
      { module: "Wealth", percentage: 5 }
    ],
    quizScores: [
      { quiz: "Budget Basics", score: 85 },
      { quiz: "Emergency Fund", score: 92 },
      { quiz: "Stock Market", score: 78 },
      { quiz: "Credit Scores", score: 88 },
      { quiz: "Retirement Plans", score: 72 }
    ]
  },
  demographics: {
    ageGroup: "22",
    location: "pune",
    occupation: "Software Developer",
    financialGoals: ["Home Ownership", "Retirement by 55", "Student Loan Payoff"]
  }
};

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(defaultUserData);

  const updateUserData = (newData) => {
    setUserData(newData);
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};