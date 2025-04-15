"use client"

import { useState, useEffect } from "react";
import { FaDollarSign, FaCoins } from "react-icons/fa";

export default function SimpleVsCompoundInterest() {
  const [time, setTime] = useState(5); // 5 years by default
  const [principal] = useState(1000); // Fixed Principal
  const [rate] = useState(0.08); // Fixed Rate (8%)
  const [compoundsPerYear] = useState(12); // Monthly compounding

  const [simpleInterestGrowth, setSimpleInterestGrowth] = useState(0);
  const [compoundInterestGrowth, setCompoundInterestGrowth] = useState(0);

  // Simple Interest Formula: SI = P * r * t
  const calculateSimpleInterest = () => principal * rate * time;

  // Compound Interest Formula: CI = P * (1 + r/n)^(nt) - P
  const calculateCompoundInterest = () => {
    return principal * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * time) - principal;
  };

  useEffect(() => {
    const si = calculateSimpleInterest();
    const ci = calculateCompoundInterest();
    setSimpleInterestGrowth(si);
    setCompoundInterestGrowth(ci);
  }, [time]);

  return (
    <div className="space-y-10 bg-gradient-to-br from-indigo-100 via-white to-pink-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-purple-700">💰 Simple vs Compound Interest</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Watch how your ₹1000 grows over time with Simple and Compound Interest!
          </p>
        </section>

        {/* Time Control Slider */}
        <section className="bg-white p-8 rounded-3xl shadow-xl border-l-[6px] border-purple-500">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Time (Years)</h2>
          <input
            type="range"
            min="1"
            max="10"
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value))}
            className="w-full h-2 bg-indigo-300 rounded-full"
          />
          <div className="flex justify-between mt-4">
            <span>1 Year</span>
            <span>{time} Years</span>
            <span>10 Years</span>
          </div>
        </section>

        {/* Animated Visualization */}
        <section className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border-l-[6px] border-green-500">
            <h2 className="text-3xl font-semibold text-green-700">Simple Interest Growth</h2>
            <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${(simpleInterestGrowth / 5000) * 100}%`, // Adjust for growth based on simple interest
                  transform: "translateX(-50%)",
                  transition: "transform 1s ease-in-out",
                }}
                className="h-16 bg-green-600 rounded-full flex items-center justify-center text-white"
              >
                ₹{(principal + simpleInterestGrowth).toFixed(2)}
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-4">
              Simple Interest accumulates linearly over time. For example, your ₹{principal} grows by ₹{simpleInterestGrowth} after {time} years.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border-l-[6px] border-blue-500">
            <h2 className="text-3xl font-semibold text-blue-700">Compound Interest Growth</h2>
            <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${(compoundInterestGrowth / 5000) * 100}%`, // Adjust for growth based on compound interest
                  transform: "translateX(-50%)",
                  transition: "transform 1s ease-in-out",
                }}
                className="h-16 bg-blue-600 rounded-full flex items-center justify-center text-white"
              >
                ₹{(principal + compoundInterestGrowth).toFixed(2)}
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-4">
              Compound Interest accumulates exponentially. The ₹{principal} grows faster as interest is calculated on the growing balance.
            </p>
          </div>
        </section>

        {/* 👉 Next Button */}
        <div className="flex justify-end mt-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300"
          >
            Next → 
          </button>
        </div>
      </div>
    </div>
  );
}
