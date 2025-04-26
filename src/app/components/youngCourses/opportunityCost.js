"use client"

import { FaExchangeAlt, FaBalanceScale, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function OpportunityCostModule({ onNext }) {
  const [activeChoice, setActiveChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const choices = [
    {
      option: "🍕 Spend ₹500 on pizza tonight",
      cost: "₹500 not invested (could grow to ~₹1,200 in 5 years)",
      emoji: "🍕→📉"
    },
    {
      option: "🛍️ Buy ₹2,000 sneakers now",
      cost: "₹2,000 not saved (could be 1 month of SIP investments)",
      emoji: "👟→💸"
    },
    {
      option: "🎮 Play 2 hours of video games",
      cost: "2 hours not spent learning a new skill",
      emoji: "🕹️→📚"
    },
    {
      option: "📱 Scroll social media for 1 hour",
      cost: "1 hour not spent on a side hustle",
      emoji: "📱→💼"
    }
  ];

  const handleChoiceSelect = (index) => {
    setActiveChoice(index);
    setShowResult(true);
    setTimeout(() => setShowResult(false), 3000);
  };

  return (
    <div className="space-y-12 md:space-y-16 max-w-4xl mx-auto px-4">

      {/* 🔁 Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <FaExchangeAlt className="text-5xl text-blue-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
          The Hidden Cost of Every Choice
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Every "yes" means saying "no" to something else. Let's uncover what you're really giving up.
        </p>
      </motion.section>

      {/* ⚖️ Core Concept */}
      <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
        <div className="flex items-center gap-3 text-blue-700 mb-3">
          <FaBalanceScale className="text-xl" />
          <h2 className="text-xl font-semibold">What Is Opportunity Cost?</h2>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>It's the value of the <span className="font-semibold">next best alternative</span> you give up when making a choice.</p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-medium">Example:</p>
            <p>Choosing to watch TV for 2 hours means giving up time you could have spent learning, exercising, or earning.</p>
          </div>
        </div>
      </section>

      {/* 🎮 Interactive Decision Game */}
      <section>
        <h3 className="text-xl font-semibold text-center mb-6">Make a Choice, See the Cost</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {choices.map((choice, index) => (
            <motion.button
              key={index}
              className={`p-4 rounded-lg border-2 text-left ${activeChoice === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => handleChoiceSelect(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-lg">{choice.option}</div>
              {activeChoice === index && showResult && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-blue-700"
                >
                  <p>Opportunity cost: {choice.cost}</p>
                  <div className="text-2xl mt-1">{choice.emoji}</div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-3">Click any option to see its hidden cost</p>
      </section>

      {/* 📊 Visual Comparison */}
      <section className="bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaExchangeAlt className="text-blue-600" />
          Real-Life Trade-offs
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
            <p className="font-medium">Daily ₹100 coffee</p>
            <p className="text-sm text-gray-600 mt-1">= ₹3,000/month not invested</p>
            <p className="text-sm text-gray-600">= ~₹2.5 lakhs in 5 years</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
            <p className="font-medium">1 hour social media/day</p>
            <p className="text-sm text-gray-600 mt-1">= 365 hours/year</p>
            <p className="text-sm text-gray-600">= Could learn a new skill</p>
          </div>
        </div>
      </section>

      {/* 💡 Key Insight */}
      <section className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
        <h3 className="text-xl font-semibold mb-3 text-purple-800">Smart Thinking</h3>
        <div className="space-y-3 text-gray-700">
          <p>Opportunity cost isn't about depriving yourself, but about:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-semibold">Making conscious choices</span> with awareness</li>
            <li><span className="font-semibold">Aligning small decisions</span> with big goals</li>
            <li><span className="font-semibold">Finding balance</span> between now and later</li>
          </ul>
        </div>
      </section>

      {/* Next Button */}
    
    </div>
  );
}