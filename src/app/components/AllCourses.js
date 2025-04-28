"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

// ModuleCard component restyled to match page.js styling
const ModuleCard = ({ name, title, description, image, topics, index, completed, onComplete }) => {
  const router = useRouter();

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  const handleStartLearning = () => {
    router.push(`/${name}`);
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      onClick={handleStartLearning}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-xl font-bold text-white p-4">{title}</h3>
        </div>
        <div
          className={`absolute top-3 right-3 p-2 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-200'}`}
        >
          <FaCheckCircle className={`w-6 h-6 ${completed ? 'text-white' : 'text-gray-500'}`} />
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        {topics && topics.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-gray-500 mb-2">Topics covered:</h4>
            <div className="flex flex-wrap gap-2">
              {topics.slice(0, 3).map((topic, i) => (
                <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {topic}
                </span>
              ))}
              {topics.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  +{topics.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <button 
            className="px-4 py-2 text-purple-600 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleStartLearning();
            }}
          >
            Start Learning
          </button>
          <button
            className={`flex items-center ${completed ? 'text-green-600 hover:text-green-800' : 'text-gray-500 hover:text-gray-700'} font-medium`}
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
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
  const [moduleStates, setModuleStates] = useState({});
  const router = useRouter();
  
  // Animation controls
  const [modulesRef, modulesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

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

  const handleComplete = (moduleName) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <motion.div 
        ref={modulesRef}
        initial="hidden"
        animate={modulesInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 md:py-32 bg-white"
        id="modules"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                name={module.name}
                title={module.title}
                description={module.description}
                image={module.image}
                topics={module.topics}
                index={index}
                completed={!!moduleStates[module.name]}
                onComplete={() => handleComplete(module.name)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}