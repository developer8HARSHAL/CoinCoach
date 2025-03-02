"use client";
import React, { useState, useEffect } from "react";
import { Timer, TrendingUp, PiggyBank, Lightbulb, ArrowRight } from "lucide-react";

export default function SavingsModule() {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [finalAmount, setFinalAmount] = useState(0);
  const [shortTermProgress, setShortTermProgress] = useState(0);
  const [longTermProgress, setLongTermProgress] = useState(0);

  useEffect(() => {
    calculateCompoundInterest();
  }, [initial, monthly, rate, years]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-200 flex items-center justify-center py-16">
      <main className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg">
            💰 Savings & Growth Insights
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Master the art of saving—whether for short-term needs or long-term wealth! 🚀
          </p>
        </div>

        {/* Theory Section */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-10 rounded-3xl border border-gray-300 mb-20">
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
          
        </div>

        {/* Progress Bars Section */}
        <div className="flex flex-col md:flex-row gap-12 justify-center">
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

        {/* Savings Calculator Section */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            🔢 Savings Growth Calculator
          </h2>
          <p className="text-center text-gray-700 mt-3">
            Calculate how much your money can grow with **monthly contributions & compounding**!
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
          </div>
        </div>
      </main>
    </div>
  );
}