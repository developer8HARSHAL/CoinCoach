"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Define animations for the card
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// ModuleCard component
const ModuleCard = ({ name, title, description, image, topics, index }) => {
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleComplete = () => {
    setCompleted(!completed);
  };

  const handleStartLearning = () => {
    router.push(`/${name}`);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ delay: 0.1 * index }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-3 right-3 p-2 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-200'}`}
        >
          <FaCheckCircle className={`w-6 h-6 ${completed ? 'text-white' : 'text-gray-500'}`} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Topics covered:</h4>
          <ul className="space-y-1">
            {topics.map((topic, i) => (
              <li key={i} className="flex items-start text-sm">
                <svg
                  className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="text-purple-600 hover:text-purple-800 font-medium"
            onClick={handleStartLearning}
          >
            Start Learning
          </button>
          <button
            className={`flex items-center ${completed ? 'text-green-600 hover:text-green-800' : 'text-gray-500 hover:text-gray-700'} font-medium`}
            onClick={handleComplete}
          >
            {completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main CoursesPage component
export default function CoursesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);  // Keep track of the first module in the row
  const modules = [
    {
      name: "budgetting",
      title: "Budgeting Basics",
      description: "Learn how to create and maintain a budget that works for your financial goals and lifestyle.",
      image: "/Budgeting.jpg",
      topics: [
        "Creating your first budget",
        "Tracking expenses effectively",
        "Setting financial goals",
        "Budget adjustment strategies",
      ],
    },
    {
      name: "savings",
      title: "Saving Strategies",
      description: "Discover proven techniques to build your savings and create financial security.",
      image: "/saving.png",
      topics: [
        "Emergency fund essentials",
        "Automating your savings",
        "High-yield savings options",
        "Saving for major purchases",
      ],
    },
    {
      name: "investments",
      title: "Investment Fundamentals",
      description: "Start your investment journey with clear explanations of investment basics and options.",
      image: "/images/invest.jpg",
      topics: [
        "Understanding risk and return",
        "Types of investment accounts",
        "Introduction to stocks and bonds",
        "Building a diversified portfolio",
      ],
    },
    {
      name: "creditdebt",
      title: "Debt Management",
      description: "Take control of your debt with strategic approaches to reduce and eliminate what you owe.",
      image: "/Debt.jpg",
      topics: [
        "Prioritizing debt repayment",
        "Debt consolidation options",
        "Improving your credit score",
        "Negotiating with creditors",
      ],
    },
    {
      name: "wealthbuilding",
      title: "Financial Independence and Wealth Building",
      description: "Build wealth and achieve financial independence with smart strategies and mindset.",
      image: "/images/piggy.jpg",
      topics: [
        "Investment strategies for wealth building",
        "Income streams beyond a salary",
        "Long-term financial planning",
        "Creating passive income",
      ],
    },
    {
      name: "taxes",
      title: "Taxations",
      description: "Master the intricacies of tax laws, deductions, and planning for personal and business taxes.",
      image: "/images/500rs.jpeg",
      topics: [
        "Taxation basics and filing",
        "Common tax deductions and credits",
        "Tax planning for small businesses",
        "Understanding tax laws and policies",
      ],
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % modules.length);  // Adjust index to move smoothly
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + modules.length) % modules.length);  // Prevent going into negative indices
  };

  return (
    <motion.div
      id="modules"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="py-20 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          <span className="relative inline-block px-2">
            Courses
            <svg
              className="absolute -bottom-2 left-0 w-full"
              xmlns="http://www.w3.org/2000/svg"
              height="12"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <path d="M0,0 Q50,12 100,0" fill="#EAB308" />
            </svg>
          </span>
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Learn at your own pace with our comprehensive self-guided modules. Track your progress and mark completed sections as you master financial concepts.
        </p>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {modules.slice(currentIndex, currentIndex + 3).map((module, index) => (
              <ModuleCard
                key={index}
                name={module.name}
                title={module.title}
                description={module.description}
                image={module.image}
                topics={module.topics}
                index={index}
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button
              onClick={handlePrev}
              className="bg-gray-600 text-white p-3 rounded-full shadow-lg"
            >
              &#10094;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button
              onClick={handleNext}
              className="bg-gray-600 text-white p-3 rounded-full shadow-lg"
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}