"use client";
import React, { useState, useEffect } from "react";
import { Timer, TrendingUp, PiggyBank, Lightbulb } from "lucide-react";

// Replace with simple HTML elements instead of missing UI components
// We'll create simplified versions of the missing components

export default function SavingsModule() {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [finalAmount, setFinalAmount] = useState(0);
  const [shortTermProgress, setShortTermProgress] = useState(0);
  const [longTermProgress, setLongTermProgress] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Module constants for progress tracking
  const MODULE_ID = "savings-growth";
  const MODULE_NAME = "Savings & Growth Insights";
  const TOTAL_SECTIONS = 3;
  const USER_ID = "user123"; // This would typically come from authentication

  // Sections that can be completed
  const SECTIONS = {
    THEORY: "savings-theory",
    CALCULATOR: "savings-calculator",
    PROGRESS_BARS: "savings-progress-bars"
  };

  useEffect(() => {
    fetchProgress();
    calculateCompoundInterest();
  }, [initial, monthly, rate, years]);

  // Auto-hide toast message after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const fetchProgress = async () => {
    try {
      const response = await fetch(`/api/progress?uid=${USER_ID}`);
      const data = await response.json();
      
      // Handle the module data structure
      if (response.ok) {
        const modules = data.modules || {};
        const moduleData = modules[MODULE_ID] || { completedSections: [], progress: 0 };
        setProgress(moduleData.progress || 0);
        setCompletedSections(Array.isArray(moduleData.completedSections) 
          ? moduleData.completedSections 
          : []);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    }
  };

  const markSectionCompleted = async (section) => {
    if (!Array.isArray(completedSections) || completedSections.includes(section)) return;
    
    const updatedSections = [...completedSections, section];
    setCompletedSections(updatedSections);
    const updatedProgress = (updatedSections.length / TOTAL_SECTIONS) * 100;
    setProgress(updatedProgress);
    
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: USER_ID,
          moduleId: MODULE_ID,
          moduleName: MODULE_NAME,
          completedSections: updatedSections,
          totalSections: TOTAL_SECTIONS,
          progress: updatedProgress
        }),
      });
      
      if (response.ok) {
        // Show toast message
        setToastMessage({
          title: "Progress Saved",
          description: `You've completed the ${getSectionName(section)} section!`,
          variant: "success"
        });
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
      setToastMessage({
        title: "Error Saving Progress",
        description: "Please try again later",
        variant: "error"
      });
    }
  };

  const getSectionName = (sectionKey) => {
    switch(sectionKey) {
      case SECTIONS.THEORY: return "Why Savings Matter";
      case SECTIONS.CALCULATOR: return "Savings Calculator";
      case SECTIONS.PROGRESS_BARS: return "Savings Progress";
      default: return "Section";
    }
  };

  const calculateCompoundInterest = () => {
    let balance = initial;
    let shortTermBalance = initial;
    let longTermBalance = initial;

    for (let i = 1; i <= 3; i++) {
      shortTermBalance = (shortTermBalance + monthly * 12) * (1 + rate / 100);
    }
    setShortTermProgress((shortTermBalance / 10000) * 100);

    for (let i = 1; i <= years; i++) {
      longTermBalance = (longTermBalance + monthly * 12) * (1 + rate / 100);
    }
    setLongTermProgress((longTermBalance / 100000) * 100);
    setFinalAmount(longTermBalance.toFixed(2));
  };

  const isSectionCompleted = (section) => {
    return completedSections.includes(section);
  };

  // Simple button component
  const Button = ({ onClick, disabled, className, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded font-medium ${disabled ? 'bg-gray-400 cursor-not-allowed' : className}`}
    >
      {children}
    </button>
  );

  // Simple progress bar component
  const Progress = ({ value, className }) => (
    <div className={`bg-gray-200 rounded-full ${className}`}>
      <div
        className="bg-blue-600 rounded-full transition-all duration-500 h-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-200 flex items-center justify-center py-16">
      {/* Simple toast notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${
          toastMessage.variant === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <h4 className="font-bold">{toastMessage.title}</h4>
          <p>{toastMessage.description}</p>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
        {/* Header with Progress Bar */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg">
            💰 Savings & Growth Insights
          </h1>
          <p className="text-lg text-gray-700 mt-4 mb-6">
            Master the art of saving—whether for short-term needs or long-term wealth! 🚀
          </p>
          
          {/* Overall Module Progress */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Your Module Progress</span>
              <span className="text-sm font-medium text-gray-700">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        {/* Theory Section */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-10 rounded-3xl border border-gray-300 mb-20 relative">
          {isSectionCompleted(SECTIONS.THEORY) && (
            <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Completed ✓
            </div>
          )}
          
          <div className="text-center">
            <PiggyBank className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Savings Matter
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Savings are the foundation of financial security and growth. Whether you're saving for a rainy day, a dream vacation, or a comfortable retirement, understanding how to grow your money is key. Here's why savings are so important:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-6 rounded-2xl text-center">
              <Lightbulb className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Security</h3>
              <p className="text-gray-700">
                Savings act as a safety net for unexpected expenses, helping you avoid debt and stress.
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-2xl text-center">
              <TrendingUp className="h-10 w-10 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wealth Growth</h3>
              <p className="text-gray-700">
                With compound interest, your savings grow exponentially over time, turning small contributions into significant wealth.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl text-center">
              <Timer className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Future Goals</h3>
              <p className="text-gray-700">
                Whether it's buying a home, starting a business, or retiring comfortably, savings make your dreams achievable.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => markSectionCompleted(SECTIONS.THEORY)} 
              disabled={isSectionCompleted(SECTIONS.THEORY)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSectionCompleted(SECTIONS.THEORY) ? "Section Completed ✓" : "Mark as Completed"}
            </Button>
          </div>
        </div>

        {/* Progress Bars Section */}
        <div className="flex flex-col md:flex-row gap-12 justify-center mb-20 relative">
          {isSectionCompleted(SECTIONS.PROGRESS_BARS) && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Completed ✓
            </div>
          )}
          
          <div className="w-full md:w-1/2 bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 mb-6">
              <Timer className="h-10 w-10 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Short-Term Savings</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Quick access to cash for emergencies, travel, or planned expenses within a few years.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${shortTermProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Progress after 3 years: ${(shortTermProgress * 100).toFixed(2)}
            </p>
          </div>

          <div className="w-full md:w-1/2 bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 mb-6">
              <TrendingUp className="h-10 w-10 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Long-Term Savings</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Focused on future goals like retirement, investments, and wealth growth over decades.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${longTermProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Progress after {years} years: ${(longTermProgress * 1000).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="text-center mb-20">
          <Button 
            onClick={() => markSectionCompleted(SECTIONS.PROGRESS_BARS)} 
            disabled={isSectionCompleted(SECTIONS.PROGRESS_BARS)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSectionCompleted(SECTIONS.PROGRESS_BARS) ? "Section Completed ✓" : "Mark Progress Bars as Completed"}
          </Button>
        </div>

        {/* Savings Calculator Section */}
        <div className="mt-24 relative">
          {isSectionCompleted(SECTIONS.CALCULATOR) && (
            <div className="absolute -top-3 right-1/2 translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Completed ✓
            </div>
          )}
          
          <h2 className="text-4xl font-bold text-center text-gray-900">
            🔢 Savings Growth Calculator
          </h2>
          <p className="text-center text-gray-700 mt-3">
            Calculate how much your money can grow with monthly contributions & compounding!
          </p>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-10 rounded-3xl border border-gray-300 mt-12 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 font-medium">💰 Initial Savings ($)</label>
                <input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 mt-3" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">📈 Interest Rate (%)</label>
                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 mt-3" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">⏳ Years</label>
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 mt-3" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">💸 Monthly Contribution ($)</label>
                <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 mt-3" />
              </div>
            </div>
            <button onClick={calculateCompoundInterest} className="mt-8 w-full py-4 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition-all">
              Calculate Growth 🚀
            </button>
            {finalAmount > 0 && (
              <div className="mt-8 text-center text-2xl font-semibold text-gray-900">
                📊 Your savings will grow to:  
                <span className="text-green-600"> ${finalAmount}</span> 🎉
              </div>
            )}
            
            <div className="mt-8 text-center">
              <Button 
                onClick={() => markSectionCompleted(SECTIONS.CALCULATOR)} 
                disabled={isSectionCompleted(SECTIONS.CALCULATOR)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSectionCompleted(SECTIONS.CALCULATOR) ? "Section Completed ✓" : "Mark Calculator as Completed"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}