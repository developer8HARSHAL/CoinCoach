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
      <div className="flex justify-center pt-6">
        <motion.button
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn How to Harness This Power <FaArrowRight />
        </motion.button>
      </div>
    </div>
  );
}