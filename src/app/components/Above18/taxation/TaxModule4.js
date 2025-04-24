"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const taxPoints = [
  {
    icon: "🔢",
    title: "How Tax Is Calculated (With Example)",
    description: `Let’s say your annual income is ₹12,00,000\n\nStandard Deduction = ₹50,000\nTaxable income = ₹11,50,000\n\nApply slab rates:\n\n₹0 – ₹3,00,000 → 0% = ₹0\n₹3,00,001 – ₹6,00,000 → 5% = ₹15,000\n₹6,00,001 – ₹9,00,000 → 10% = ₹30,000\n₹9,00,001 – ₹11,50,000 → 15% = ₹37,500\n\n➡️ Total Tax = ₹82,500 + cess (4%) = ₹85,800`,
  },
  {
    icon: "❌",
    title: "What Deductions Are NOT Allowed?",
    description:
      "Under the New Regime, the following are not allowed:\n\n• Section 80C (LIC, PPF, ELSS, etc.)\n• Section 80D (Health Insurance)\n• HRA (House Rent Allowance)\n• LTA (Leave Travel Allowance)\n• Home Loan Interest (Section 24b)\n• Donations (Section 80G)\n\n🔒 You can’t reduce your income using these deductions.",
  },
  {
    icon: "✅",
    title: "What Is Still Allowed in the New Regime?",
    description:
      "Some benefits are retained:\n\n• ₹50,000 Standard Deduction\n• Employer's NPS Contribution (80CCD(2))\n• EPF & Gratuity (employer-driven)\n• Transport Allowance (disabled)\n• Conveyance Allowance (official duty)",
  },
  {
    icon: "👥",
    title: "Who Should Choose the New Tax Regime?",
    description:
      "✅ You don't have major investments under 80C\n✅ You're self-employed or a freelancer\n✅ Your income is under ₹7,00,000 (zero tax after rebate)\n✅ You prefer simplified tax filing\n✅ You’re young with no long-term plans yet",
  },
  {
    icon: "⚠️",
    title: "Filing Returns Under New Regime",
    description:
      "• New regime is auto-selected in ITR forms\n• Salaried individuals can opt out annually\n• Business owners/professionals can opt out only once\n• Re-entering old regime is restricted after opt-out",
  },
  {
    icon: "📆",
    title: "Important Compliance Dates",
    description:
      "• ITR Filing Deadline: July 31\n\nAdvance Tax Due Dates:\n• 15% by June 15\n• 45% by Sept 15\n• 75% by Dec 15\n• 100% by March 15",
  },
];

const TaxModule4 = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleInfo = (index) => {
    setExpanded(expanded === index ? null : index); // Toggle between expand and collapse
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden px-6 py-20 flex items-center justify-center">
      {/* Floating hologram effect */}
      <div className="absolute inset-0 bg-[url('/images/holographic-bg.png')] bg-cover bg-center opacity-10 animate-pulse" />
      
      {/* Floating Currency Dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-yellow-400 rounded-full opacity-70 blur"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              y: [-30, 30, -30],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl text-white">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          💡 All About New Tax Regime
        </motion.h1>

        <div className="grid grid-cols-1 gap-16">
          {taxPoints.map((item, index) => (
            <div key={index}>
              {/* Button for toggling */}
              <motion.button
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:scale-[1.05] transition-transform duration-300 text-xl font-semibold text-yellow-300 flex items-center justify-between"
                onClick={() => toggleInfo(index)}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-3xl">{item.icon}</span>
                  {item.title}
                </div>
                <span className="text-2xl">{expanded === index ? "▲" : "▼"}</span> {/* Indicator for dropdown */}
              </motion.button>

              {/* Dropdown content */}
              {expanded === index && (
                <motion.div
                  className="mt-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <pre className="whitespace-pre-wrap text-xl text-white text-sm">{item.description}</pre>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxModule4;
