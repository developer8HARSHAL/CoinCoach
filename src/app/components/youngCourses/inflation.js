"use client"

import { FaFire, FaPiggyBank, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function InflationImpactModule({ onNext }) {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const flipCards = [
    {
      front: "💰 Today's ₹1000",
      back: "Buys a pair of jeans 👖 + a T-shirt 👕",
      color: "bg-green-100 border-green-400"
    },
    {
      front: "📅 In 5 years",
      back: "Only buys the jeans 👖 (no T-shirt)",
      color: "bg-yellow-100 border-yellow-400"
    },
    {
      front: "🕰️ In 10 years",
      back: "Just buys the T-shirt 👕 (no jeans)",
      color: "bg-orange-100 border-orange-400"
    },
    {
      front: "⏳ In 20 years",
      back: "Only buys a sandwich 🥪",
      color: "bg-red-100 border-red-400"
    }
  ];

  const examples = [
    "🧃 In 2010: ₹10 = full juice glass. Today: just a sip. 2030?: Maybe just the straw!",
    "🛒 Your parents' ₹100 weekly groceries now costs ₹500 for the same items",
    "🎬 Movie ticket that cost ₹50 in 2000 now costs ₹200-₹300"
  ];

  return (
    <div className="space-y-12 md:space-y-16 max-w-4xl mx-auto px-4">

      {/* 🔥 Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <FaFire className="text-5xl text-red-600 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-red-600">
          Inflation: The Silent Thief
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Your money loses value over time without you even spending it. Let's understand how this happens.
        </p>
      </motion.section>

      {/* 📉 Core Concept */}
      <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
        <div className="flex items-center gap-3 text-red-600 mb-3">
          <FaFire className="text-xl" />
          <h2 className="text-xl font-semibold">The Basic Problem</h2>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>Inflation means <span className="font-semibold">prices rise over time</span>, so each rupee buys less than before.</p>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="font-medium">Example: If inflation is 6%:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>What costs ₹100 today will cost ₹106 next year</li>
              <li>Your ₹100 saved becomes worth only ~₹94 in purchasing power</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 🃏 Flip Cards Section */}
      <section>
        <h3 className="text-xl font-semibold text-center mb-6">How Inflation Eats Your Money</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flipCards.map((card, index) => (
            <motion.div
              key={index}
              className={`h-32 cursor-pointer rounded-lg border-2 p-4 shadow-sm ${card.color} ${flippedIndex === index ? 'bg-white' : ''}`}
              onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
              whileHover={{ y: -5 }}
              animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {flippedIndex === index ? (
                <motion.div 
                  className="h-full flex items-center justify-center text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotateY: 180 }}
                >
                  <p>{card.back}</p>
                </motion.div>
              ) : (
                <motion.div 
                  className="h-full flex items-center justify-center text-center font-medium"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  <p>{card.front}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📊 Visual Timeline */}
      <section className="bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaPiggyBank className="text-yellow-600" />
          Real-Life Examples
        </h3>
        <div className="space-y-4">
          {examples.map((example, index) => (
            <motion.div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p>{example}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💡 Key Insight */}
      <section className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
        <h3 className="text-xl font-semibold mb-3 text-yellow-800">Why This Matters</h3>
        <div className="space-y-3 text-gray-700">
          <p>If you keep cash savings without investing:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your <span className="font-semibold">actual wealth decreases</span> over time</li>
            <li>You'll need <span className="font-semibold">more money</span> to maintain your lifestyle</li>
            <li>Retirement becomes <span className="font-semibold">harder</span> because costs rise</li>
          </ul>
        </div>
      </section>

      {/* � Solution Preview */}
      <section className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
        <h3 className="text-xl font-semibold mb-3 text-green-800">The Solution</h3>
        <p className="mb-3">You need to make your money grow faster than inflation through:</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg text-center shadow-sm">
            <p className="font-semibold">Investing</p>
            <p className="text-sm">Stocks, mutual funds, etc.</p>
          </div>
          <div className="bg-white p-3 rounded-lg text-center shadow-sm">
            <p className="font-semibold">Assets</p>
            <p className="text-sm">Real estate, gold, etc.</p>
          </div>
        </div>
      </section>

      {/* Next Button */}
      <div className="flex justify-center pt-6">
        <motion.button
          onClick={onNext}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Move to Next Lesson <FaArrowRight />
        </motion.button>
      </div>
    </div>
  );
}