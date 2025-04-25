"use client";

import { useState } from "react";
import { FaChartLine, FaPiggyBank, FaBalanceScale, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function MutualFundsModule({ onNext }) {
  const [activeTab, setActiveTab] = useState("what");
  const [flippedCard, setFlippedCard] = useState(null);

  const fundTypes = [
    {
      name: "Equity Funds",
      description: "Invest mainly in stocks",
      risk: "High",
      returns: "High (long-term)",
      example: "Index funds, sector funds",
      emoji: "📈"
    },
    {
      name: "Debt Funds",
      description: "Invest in bonds & fixed income",
      risk: "Low",
      returns: "Moderate",
      example: "Corporate bond funds, gilt funds",
      emoji: "🏦"
    },
    {
      name: "Hybrid Funds",
      description: "Mix of stocks and bonds",
      risk: "Medium",
      returns: "Balanced",
      example: "Aggressive hybrid funds",
      emoji: "⚖️"
    },
    {
      name: "Solution Funds",
      description: "Goal-based investing",
      risk: "Varies",
      returns: "Varies",
      example: "Retirement funds, children's plans",
      emoji: "🎯"
    }
  ];

  const benefits = [
    "Professional management by experts",
    "Diversification reduces risk",
    "Small amounts can be invested (SIPs)",
    "Liquidity - easy to buy/sell",
    "Tax benefits in some cases"
  ];

  const toggleCardFlip = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <div className="space-y-12 md:space-y-16 max-w-4xl mx-auto px-4 py-8">
      {/* 🚀 Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <FaChartLine className="text-5xl text-blue-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
          Mutual Funds Made Simple
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Discover how mutual funds can help grow your money without needing to pick stocks yourself
        </p>
      </motion.section>

      {/* 📌 Navigation Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b">
        <button
          onClick={() => setActiveTab("what")}
          className={`flex-1 min-w-max px-4 py-3 font-medium ${activeTab === "what" ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-500'}`}
        >
          What Are They?
        </button>
        <button
          onClick={() => setActiveTab("types")}
          className={`flex-1 min-w-max px-4 py-3 font-medium ${activeTab === "types" ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-500'}`}
        >
          Types
        </button>
        <button
          onClick={() => setActiveTab("benefits")}
          className={`flex-1 min-w-max px-4 py-3 font-medium ${activeTab === "benefits" ? 'border-b-2 border-blue-600 text-blue-700' : 'text-gray-500'}`}
        >
          Benefits
        </button>
      </div>

      {/* 💡 Content Sections */}
      <AnimatePresence mode="wait">
        {activeTab === "what" && (
          <motion.section
            key="what"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500"
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-700">What Are Mutual Funds?</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                A mutual fund pools money from many investors to buy stocks, bonds, or other assets.
                Professional fund managers make the investment decisions.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium">Simple Analogy:</p>
                <p>Like a pizza where many people buy slices (units), and a chef (fund manager) decides the toppings (investments).</p>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === "types" && (
          <motion.section
            key="types"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Main Types of Mutual Funds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fundTypes.map((fund, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  onClick={() => toggleCardFlip(index)}
                  className={`bg-white p-5 rounded-xl shadow-sm border-2 cursor-pointer ${flippedCard === index ? 'border-blue-400' : 'border-gray-200'}`}
                >
                  {flippedCard === index ? (
                    <motion.div
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      className="space-y-3"
                    >
                      <div className="text-2xl">{fund.emoji}</div>
                      <h3 className="font-semibold">{fund.name}</h3>
                      <div className="text-sm space-y-2">
                        <p><span className="font-medium">Risk:</span> {fund.risk}</p>
                        <p><span className="font-medium">Returns:</span> {fund.returns}</p>
                        <p><span className="font-medium">Example:</span> {fund.example}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ rotateY: -90 }}
                      animate={{ rotateY: 0 }}
                      className="flex items-center gap-4"
                    >
                      <div className="text-3xl">{fund.emoji}</div>
                      <div>
                        <h3 className="font-semibold">{fund.name}</h3>
                        <p className="text-sm text-gray-600">{fund.description}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === "benefits" && (
          <motion.section
            key="benefits"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
          >
            <h2 className="text-xl font-semibold mb-4 text-green-700">Why Invest in Mutual Funds?</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <FaCheckCircle className="text-green-600" />
                  </div>
                  <p>{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 📊 SIP Visualization */}
      <section className="bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
          <FaPiggyBank />
          The Power of SIPs
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700">
            Systematic Investment Plans (SIPs) let you invest small amounts regularly (like ₹500/month).
          </p>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: "30%" }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium">Small Amounts</p>
              <p className="text-sm text-gray-600">Start with ₹500</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium">Disciplined</p>
              <p className="text-sm text-gray-600">Regular investing</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium">Cost Averaging</p>
              <p className="text-sm text-gray-600">Buy at all levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* 💡 Key Insight */}
      <section className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
        <h3 className="text-xl font-semibold mb-3 text-purple-800">Smart Investor Tip</h3>
        <div className="space-y-3 text-gray-700">
          <p>Mutual funds work best when you:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Invest for <span className="font-medium">long-term</span> (5+ years)</li>
            <li>Choose funds matching your <span className="font-medium">risk appetite</span></li>
            <li>Review performance <span className="font-medium">periodically</span></li>
          </ul>
        </div>
      </section>

    {/* Next Button */}
<div className="flex justify-center pt-6">
  <motion.button
    onClick={onNext}
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Complete Course <FaArrowRight />
  </motion.button>
</div>
    </div>
  );
}