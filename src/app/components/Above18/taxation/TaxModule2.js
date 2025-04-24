"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Landmark, BadgePercent, Banknote } from "lucide-react";

export default function TaxModule2() {
  const [activeIndex, setActiveIndex] = useState(null);

  const sections = [
    {
      icon: <User className="w-6 h-6 text-indigo-600" />,
      title: "Who's Who in Taxes?",
      content: (
        <div className="text-left text-lg">
          <p className="mb-2">👨‍💼 <strong>Individuals:</strong> If you're under 60, this is you.</p>
          <p className="mb-2">🧓 <strong>Senior Citizens:</strong> Aged 60–80 years. Slightly cooler tax slabs.</p>
          <p className="mb-2">👴 <strong>Super Seniors:</strong> 80+ years. Heroes with special tax treatment.</p>
          <p>🏢 <strong>HUFs, Firms, Companies:</strong> They follow different rules altogether.</p>
        </div>
      ),
    },
    {
      icon: <Landmark className="w-6 h-6 text-yellow-600" />,
      title: "Tax Slabs - Like Tiers in a Game",
      content: (
        <div className="text-left text-lg">
          <p className="mb-1">💰 ₹0 – ₹3,00,000 → <strong>0%</strong></p>
          <p className="mb-1">💰 ₹3,00,001 – ₹6,00,000 → <strong>5%</strong></p>
          <p className="mb-1">💰 ₹6,00,001 – ₹9,00,000 → <strong>10%</strong></p>
          <p className="mb-1">💰 ₹9,00,001 – ₹12,00,000 → <strong>15%</strong></p>
          <p className="mb-1">💰 ₹12,00,001 – ₹15,00,000 → <strong>20%</strong></p>
          <p>💰 Above ₹15,00,000 → <strong>30%</strong></p>
        </div>
      ),
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-green-600" />,
      title: "Section 87A – Tax Magic!",
      content: (
        <div className="text-left text-lg">
          <p>🪄 Earn up to ₹7,00,000 and still pay ZERO tax? Yes, thanks to the <strong>Section 87A Rebate!</strong></p>
          <p>It’s like a get-out-of-tax card for middle-income earners.</p>
        </div>
      ),
    },
    {
      icon: <Banknote className="w-6 h-6 text-pink-600" />,
      title: "Quick Tax Nuggets",
      content: (
        <ul className="list-disc ml-5 text-left text-lg">
          <li>📌 ₹50,000 Standard Deduction for salary/pension income</li>
          <li>📌 No HRA, LTA, or 80C under new regime</li>
          <li>📌 Choose old vs new regime every financial year</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-100 to-emerald-200 flex flex-col items-center pt-10 pb-16 px-4 sm:px-6 lg:px-12">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-emerald-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Meet the Indian Tax System 🎯
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-center max-w-3xl mb-12 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Tap on each box to reveal fun facts and insights about income tax!
      </motion.p>

      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {sections.map((sec, i) => (
          <motion.div
            key={i}
            className={`bg-white border border-gray-200 rounded-xl p-4 shadow-md 
              ${i === 0 ? 'bg-indigo-100' : i === 1 ? 'bg-yellow-100' : i === 2 ? 'bg-green-100' : 'bg-pink-100'}
              hover:scale-105 hover:shadow-xl hover:bg-opacity-80 transition cursor-pointer`}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gray-100 p-2 rounded-full">
                {sec.icon}
              </div>
              <h2 className="text-lg font-semibold text-emerald-700">{sec.title}</h2>
            </div>
            {activeIndex === i && (
              <motion.div
                className="text-sm text-gray-700"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {sec.content}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
