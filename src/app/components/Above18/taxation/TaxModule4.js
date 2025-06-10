"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Info, Clock, ArrowRight, Maximize2, Minimize2, Copy, Check } from "lucide-react";

const taxPoints = [
  {
    icon: "🔢",
    title: "How Tax Is Calculated (With Example)",
    description: `Let's say your annual income is ₹12,00,000\n\nStandard Deduction = ₹50,000\nTaxable income = ₹11,50,000\n\nApply slab rates:\n\n₹0 – ₹3,00,000 → 0% = ₹0\n₹3,00,001 – ₹6,00,000 → 5% = ₹15,000\n₹6,00,001 – ₹9,00,000 → 10% = ₹30,000\n₹9,00,001 – ₹11,50,000 → 15% = ₹37,500\n\n➡️ Total Tax = ₹82,500 + cess (4%) = ₹85,800`,
    keyPoints: [
      "Start with gross income",
      "Apply standard deduction",
      "Calculate tax per slab",
      "Add health & education cess (4%)"
    ]
  },
  {
    icon: "❌",
    title: "What Deductions Are NOT Allowed?",
    description:
      "Under the New Regime, the following are not allowed:\n\n• Section 80C (LIC, PPF, ELSS, etc.)\n• Section 80D (Health Insurance)\n• HRA (House Rent Allowance)\n• LTA (Leave Travel Allowance)\n• Home Loan Interest (Section 24b)\n• Donations (Section 80G)\n\n🔒 You can't reduce your income using these deductions.",
    keyPoints: [
      "No Section 80C investment deductions",
      "No health insurance premium deductions",
      "No house rent or home loan benefits",
      "No tax benefits for donations"
    ]
  },
  {
    icon: "✅",
    title: "What Is Still Allowed in the New Regime?",
    description:
      "Some benefits are retained:\n\n• ₹50,000 Standard Deduction\n• Employer's NPS Contribution (80CCD(2))\n• EPF & Gratuity (employer-driven)\n• Transport Allowance (disabled)\n• Conveyance Allowance (official duty)",
    keyPoints: [
      "Standard deduction of ₹50,000",
      "Employer NPS contributions",
      "EPF & Gratuity benefits",
      "Special allowances remain tax-free"
    ]
  },
  {
    icon: "👥",
    title: "Who Should Choose the New Tax Regime?",
    description:
      "✅ You don't have major investments under 80C\n✅ You're self-employed or a freelancer\n✅ Your income is under ₹7,00,000 (zero tax after rebate)\n✅ You prefer simplified tax filing\n✅ You're young with no long-term plans yet",
    keyPoints: [
      "Those with few tax-saving investments",
      "Self-employed individuals",
      "Income below ₹7,00,000",
      "People preferring simplicity over deductions"
    ]
  },
  {
    icon: "⚠️",
    title: "Filing Returns Under New Regime",
    description:
      "• New regime is auto-selected in ITR forms\n• Salaried individuals can opt out annually\n• Business owners/professionals can opt out only once\n• Re-entering old regime is restricted after opt-out",
    keyPoints: [
      "Default option in tax forms",
      "Salaried can switch annually",
      "Business owners have one-time choice",
      "Switching back has restrictions"
    ]
  },
  {
    icon: "📆",
    title: "Important Compliance Dates",
    description:
      "• ITR Filing Deadline: July 31\n\nAdvance Tax Due Dates:\n• 15% by June 15\n• 45% by Sept 15\n• 75% by Dec 15\n• 100% by March 15",
    keyPoints: [
      "ITR deadline: July 31",
      "Four advance tax installments",
      "Final payment by March 15",
      "Late filing attracts penalties"
    ]
  },
];

const TaxModule4 = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [fullscreenView, setFullscreenView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Toggle specific card expansion
  const toggleCard = (index) => {
    if (showAll) return;
    
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  // Toggle expand/collapse all
  const toggleShowAll = () => {
    setShowAll(!showAll);
    
    // If turning off show all, reset individual expansions
    if (showAll) {
      setExpandedCards({});
    }
  };
  
  // Copy content to clipboard
  const copyContent = (index) => {
    navigator.clipboard.writeText(taxPoints[index].description);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  // Effect to handle fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && fullscreenView) {
        setFullscreenView(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenView]);

  return (
    <div 
      className={`relative ${fullscreenView ? 'fixed inset-0 z-50' : 'min-h-screen'} 
        bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]} overflow-hidden 
        px-6 py-20 flex items-center justify-center transition-all duration-500`}
    >
      {/* Floating hologram effect */}
      <div className="absolute inset-0 bg-[url('/images/holographic-bg.png')] bg-cover bg-center opacity-10 animate-pulse" />
      
      {/* Floating Currency Dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full text-white">
        {/* Header Section */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4">
            <span className="text-yellow-300 font-medium">Made Simple & Interactive</span>
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            💡 All About New Tax Regime
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Understanding the new income tax system in India without the jargon. Swipe through key concepts or view detailed calculations.
          </p>
          
          {/* Controls */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleShowAll}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 transition-all"
            >
              {showAll ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              {showAll ? "Collapse All" : "Expand All"}
            </motion.button>
            
            {/* <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFullscreenView(!fullscreenView)}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 transition-all"
            >
              {fullscreenView ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              {fullscreenView ? "Exit Fullscreen" : "Fullscreen Mode"}
            </motion.button> */}
          </div>
        </motion.header>

        {/* Tab Navigation for Mobile */}
        <div className="md:hidden mb-8 overflow-x-auto flex no-scrollbar">
          <div className="flex gap-2 p-1 min-w-full">
            {taxPoints.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeTab === index 
                    ? "bg-yellow-500/20 text-yellow-300 font-medium" 
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.title.split(' ').slice(0, 2).join(' ')}...
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile View - Single Card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-yellow-300 flex items-center">
                  <span className="mr-3 text-3xl">{taxPoints[activeTab].icon}</span>
                  {taxPoints[activeTab].title}
                </h2>
                <button 
                  onClick={() => copyContent(activeTab)}
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  {copiedIndex === activeTab ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl uppercase text-white/60 mb-2 flex items-center gap-2">
                  <Info size={20} /> Key Points
                </h2>
                <ul className="grid grid-cols-1 gap-2">
                  {taxPoints[activeTab].keyPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="bg-white/20 rounded-full p-1 flex-shrink-0">
                        <ArrowRight size={12} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <pre className="whitespace-pre-wrap text-white/90 text-xl bg-white/5 p-4 rounded-lg border border-white/10">{taxPoints[activeTab].description}</pre>
              
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                  disabled={activeTab === 0}
                  className={`px-3 py-1 rounded flex items-center gap-1 ${
                    activeTab === 0 ? "opacity-50 cursor-not-allowed" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <ChevronDown className="rotate-90" size={16} /> Prev
                </button>
                <button
                  onClick={() => setActiveTab(Math.min(taxPoints.length - 1, activeTab + 1))}
                  disabled={activeTab === taxPoints.length - 1}
                  className={`px-3 py-1 rounded flex items-center gap-1 ${
                    activeTab === taxPoints.length - 1 ? "opacity-50 cursor-not-allowed" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Next <ChevronDown className="-rotate-90" size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop View - Grid of Cards */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
          {taxPoints.map((item, index) => {
            const isExpanded = showAll || expandedCards[index];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-xl ${
                  isExpanded ? "cursor-default" : "cursor-pointer hover:scale-[1.02]"
                }`}
              >
                <div 
                  className="p-6 flex items-center justify-between"
                  onClick={() => toggleCard(index)}
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-3xl">{item.icon}</span>
                    <h3 className="text-xl font-semibold text-yellow-300">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyContent(index);
                      }}
                      className="p-2 rounded-full hover:bg-white/10"
                    >
                      {copiedIndex === index ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                    {!showAll && (
                      isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                    )}
                  </div>
                </div>
                
                {/* Key Points Summary - Always visible */}
                <div className="px-6 pb-4">
                  <h4 className="text-lg uppercase text-white/60 mb-2 flex items-center gap-2">
                    <Info size={14} /> Key Points
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {item.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-lg">
                        <span className="mt-1 bg-white/20 rounded-full p-1 flex-shrink-0">
                          <ArrowRight size={10} />
                        </span>
                        <span className="text-white/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Full Details - Expandable */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10"
                    >
                      <pre className="whitespace-pre-wrap text-white/90 text-lg p-6">{item.description}</pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center md:hidden">
          <div className="flex gap-1">
            {taxPoints.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full ${
                  i === activeTab ? "bg-yellow-400" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxModule4;
