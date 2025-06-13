"use client"

import { FaPiggyBank, FaChartLine, FaLightbulb,FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SimpleVsCompoundInterest({ onNext }) {
  const interestStories = [
    {
      title: "The Farmer's Choice",
      description: "Two farmers each save ₹10,000. One uses simple interest, the other compounds. See the difference after 10 years!",
      simple: "₹15,000",
      compound: "₹21,589",
      emoji: "👨‍🌾"
    },
    {
      title: "Student Savings",
      description: "A student saves ₹5,000 from summer jobs. Simple interest vs compound over 5 years:",
      simple: "₹6,500",
      compound: "₹7,346",
      emoji: "🎓"
    },
    {
      title: "Retirement Planning",
      description: "₹1,00,000 invested at age 25 grows differently by retirement:",
      simple: "₹3,00,000 (simple)",
      compound: "₹10,06,266 (compound)",
      emoji: "🧓"
    }
  ];
  const [time, setTime] = useState(5); // 5 years by default
  const [principal] = useState(1000); // Fixed Principal
  const [rate] = useState(0.08); // Fixed Rate (8%)
  const [compoundsPerYear] = useState(12); // Monthly compounding

  const [activeStory, setActiveStory] = useState(0);

  return (
    <div className="space-y-12 md:space-y-16 max-w-4xl mx-auto px-4 py-8">

      {/* 🚀 Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <FaPiggyBank className="text-5xl text-indigo-600" />
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
            onClick={onNext}            
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300"
          >
            Next → 
          </button>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700">
          The Magic of Growing Money
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Discover why compound interest is often called the "8th wonder of the world" and how it beats simple interest over time.
        </p>
      </motion.section>

      {/* 📊 Core Concept Cards */}
      <section className="grid md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
        >
          <div className="flex items-center gap-3 text-green-700 mb-3">
            <FaChartLine className="text-xl" />
            <h2 className="text-xl font-semibold">Simple Interest</h2>
          </div>
          <p className="text-gray-700">
            Earns interest only on the original amount. Like getting the same small bonus every year.
          </p>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="font-medium">Example:</p>
            <p>₹10,000 at 5% = ₹500 every year</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500"
        >
          <div className="flex items-center gap-3 text-blue-700 mb-3">
            <FaLightbulb className="text-xl" />
            <h2 className="text-xl font-semibold">Compound Interest</h2>
          </div>
          <p className="text-gray-700">
            Earns interest on your interest. Your money grows faster because it builds upon itself.
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium">Example:</p>
            <p>₹10,000 at 5% = ₹525 in year 2 (5% of ₹10,500)</p>
          </div>
        </motion.div>
      </section>

      {/* 📖 Story Carousel */}
      <section>
        <h3 className="text-xl font-semibold text-center mb-6">Real Life Comparisons</h3>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-4 text-3xl">
            {interestStories[activeStory].emoji}
          </div>
          <h4 className="text-lg font-semibold text-center mb-2">
            {interestStories[activeStory].title}
          </h4>
          <p className="text-gray-700 text-center mb-4">
            {interestStories[activeStory].description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Simple Interest</p>
              <p className="text-xl font-bold text-green-700">
                {interestStories[activeStory].simple}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Compound Interest</p>
              <p className="text-xl font-bold text-blue-700">
                {interestStories[activeStory].compound}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {interestStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStory(index)}
              className={`w-3 h-3 rounded-full ${activeStory === index ? 'bg-indigo-600' : 'bg-indigo-200'}`}
            />
          ))}
        </div>
      </section>

      {/* 🎯 Visual Comparison */}
      <section className="bg-indigo-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center">
          <FaChartLine className="text-indigo-600" />
          Growth Over Time
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <span>Year 1</span>
              <span>Year 10</span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="absolute h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: "30%" }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">Simple Interest Growth</p>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span>Year 1</span>
              <span>Year 10</span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="absolute h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">Compound Interest Growth</p>
          </div>
        </div>
      </section>

      {/* 💡 Key Insight */}
      <section className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
        <h3 className="text-xl font-semibold mb-3 text-purple-800">Why This Matters</h3>
        <div className="space-y-3 text-gray-700">
          <p>The earlier you start investing, the more compound interest works for you:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Small amounts grow significantly over decades</li>
            <li>Regular investments multiply the effect</li>
            <li>Time is your most powerful ally</li>
          </ul>
        </div>
      </section>

      {/* Next Button */}
     
    </div>
  );
}