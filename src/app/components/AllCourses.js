"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

// Define course modules for different age groups
const coursesData = {
  // Below 18 courses
  under18: [
    {
      name: "money-basics",
      title: "Money Basics",
      description: "Learn about the value of money and how inflation affects your savings.",
      image: "/images/ymoney.jpg",
      topics: [
        "Time value of money",
        "Understanding inflation",
        "Saving basics",
        "Financial planning for teens"
      ],
    },
    {
      name: "financial-concepts",
      title: "Financial Concepts",
      description: "Understand opportunity cost and how interest calculations work.",
      image: "/images/yFinancial.jpg",
      topics: [
        "Opportunity cost basics",
        "Interest calculations",
        "Making financial decisions",
        "Planning for the future"
      ],
    },
    {
      name: "banking-essentials",
      title: "Banking Essentials",
      description: "Learn how to read bank statements and use digital payment methods safely.",
      image: "/images/ybank.jpg",
      topics: [
        "Reading bank statements",
        "Digital payments",
        "Banking safety",
        "Setting up your first account"
      ],
    },
    {
      name: "financial-planning",
      title: "Financial Planning",
      description: "Discover taxation basics and how mutual funds work.",
      image: "/images/yplanning.jpg",
      topics: [
        "Taxation basics for teens",
        "Introduction to mutual funds",
        "Setting financial goals",
        "Planning for education"
      ],
    }
  ],
  
  // Above 18 courses
  above18: [
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
      title: "Credit & Debt Management",
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
      title: "Financial Independence",
      description: "Build wealth and achieve financial independence with smart strategies and mindset.",
      image: "/images/piggy.jpg",
      topics: [
        "Investment strategies for wealth",
        "Multiple income streams",
        "Long-term financial planning",
        "Creating passive income",
      ],
    },
    {
      name: "taxes",
      title: "Taxation",
      description: "Master the intricacies of tax laws, deductions, and planning for personal and business taxes.",
      image: "/images/500rs.jpeg",
      topics: [
        "Taxation basics and filing",
        "Common tax deductions",
        "Tax planning for businesses",
        "Understanding tax policies",
      ],
    }
  ]
};

// Add this component for better UX during age detection:
const AgeDetectionLoader = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
    <p className="text-gray-600">Detecting your age group...</p>
    <p className="text-sm text-gray-500 mt-2">Preparing personalized courses for you</p>
  </div>
);

// ModuleCard component restyled to match page.js styling
const ModuleCard = ({ name, title, description, image, topics, index, completed, onComplete, userData, isAdmin }) => {
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

  // Get the user's age from the demographics object
  const userAge = userData?.demographics?.age;

  const handleStartLearning = () => {
    // Validate access before navigation
    if (userData && userAge !== undefined) {
      const userAgeGroup = userAge < 18 ? 'under18' : 'above18';
      const courseAgeGroup = coursesData.under18.some(c => c.name === name) ? 'under18' : 'above18';
      
      if (!isAdmin && userAgeGroup !== courseAgeGroup) {
        alert(`This course is not available for your age group. Please select courses from the ${userAgeGroup} section.`);
        return;
      }
    }
    
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

// AgeSelector component to filter courses by age group
const AgeSelector = ({ selectedAgeGroup, setSelectedAgeGroup, userAge, isAdmin }) => {
  const ageGroups = [
    { id: 'all', label: 'All Courses' },
    { id: 'under18', label: 'Under 18' },
    { id: 'above18', label: 'Above 18' }
  ];

  // If not admin, only show age groups that are relevant to the user
  const filteredAgeGroups = isAdmin 
    ? ageGroups 
    : [
        { id: userAge < 18 ? 'under18' : 'above18', 
          label: userAge < 18 ? 'Under 18' : 'Above 18' }
      ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filteredAgeGroups.map((group) => (
        <button
          key={group.id}
          onClick={() => setSelectedAgeGroup(group.id)}
          className={`px-6 py-3 rounded-full font-medium transition ${
            selectedAgeGroup === group.id
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {group.label}
        </button>
      ))}
    </div>
  );
};

// Main CoursesPage component
export default function AgeSpecificCoursesPage() {
  const [moduleStates, setModuleStates] = useState({});
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  
  // Animation controls
  const [modulesRef, modulesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Function to handle course completion
  const handleComplete = (moduleName) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  // Replace the existing useEffect that fetches user data with this optimized version:
  useEffect(() => {
    const initializeUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/info');
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        console.log("User data received:", data);
        
        // Set user data
        setUserData(data);
        
        // Determine admin status
        const userIsAdmin = data.role === 'admin';
        setIsAdmin(userIsAdmin);
        
        // Get age from demographics object
        const userAge = data.demographics?.age;
        
        // Auto-set age group based on user's age (this is the key fix)
        if (userAge !== undefined && userAge !== null) {
          const ageGroup = userAge < 18 ? 'under18' : 'above18';
          setSelectedAgeGroup(ageGroup);
          console.log(`Setting age group to ${ageGroup} based on user age ${userAge}`);
        } else {
          // Handle users without age set
          setSelectedAgeGroup('above18'); // Default to adult courses
          console.warn('User age not set in demographics, defaulting to adult courses');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        // Default to adult courses on error
        setSelectedAgeGroup('above18');
      } finally {
        setLoading(false);
      }
    };

    initializeUserData();
  }, []);

  // Enhanced error handling for missing age
  const handleMissingAge = () => {
    return (
      <div className="text-center py-12 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-xl font-semibold text-yellow-800 mb-4">Age Information Required</h3>
        <p className="text-yellow-700 mb-6">
          Please update your profile with your age to see age-appropriate courses.
        </p>
        <button 
          onClick={() => router.push('/dashboard')}
          className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
        >
          Update Profile
        </button>
      </div>
    );
  };

  // Helper function to get user age safely
  const getUserAge = () => {
    return userData?.demographics?.age;
  };

  // Function to get displayed courses with validation
  const getDisplayedCourses = () => {
    // Get user age from demographics
    const userAge = getUserAge();
    
    // For admin users, show all if 'all' is selected, otherwise show selected group
    if (isAdmin && selectedAgeGroup === 'all') {
      return [...coursesData.under18, ...coursesData.above18];
    }
    
    // For regular users or when specific age group is selected
    const courses = coursesData[selectedAgeGroup] || [];
    
    // Additional validation: ensure user can access these courses
    if (userData && userAge !== undefined) {
      const userAgeGroup = userAge < 18 ? 'under18' : 'above18';
      
      // Non-admin users should only see their age group's courses
      if (!isAdmin && selectedAgeGroup !== userAgeGroup) {
        console.warn(`Access denied: User age group (${userAgeGroup}) doesn't match selected (${selectedAgeGroup})`);
        return coursesData[userAgeGroup] || [];
      }
    }
    
    return courses;
  };

  const displayedCourses = getDisplayedCourses();

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
  
  // Refresh animation variants
  const refreshVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  // Check if age is available in demographics
  const hasAgeInfo = userData?.demographics?.age !== undefined && userData?.demographics?.age !== null;

  // Replace your current loading return with:
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex justify-center items-center">
        <AgeDetectionLoader />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
              Financial Courses
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
          
          {/* Conditional message for refresh animation */}
          <motion.div
            initial="hidden"
            animate={refreshing ? "visible" : "hidden"}
            exit="exit"
            variants={refreshVariants}
            className="bg-green-100 text-green-700 p-4 rounded-md mb-6 mx-auto max-w-3xl"
          >
            <div className="flex items-center justify-center">
              <FaCheckCircle className="mr-2" />
              <p>Courses updated to match your age group!</p>
            </div>
          </motion.div>
          
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            {userData && hasAgeInfo
              ? `Welcome ${userData.name || 'back'}! Here are financial courses tailored for ${getUserAge() < 18 ? 'your age group' : 'adults'}.` 
              : 'Learn at your own pace with our comprehensive self-guided modules.'}
          </p>

          {/* Age group selector - only shown for admins */}
          {isAdmin && (
            <AgeSelector 
              selectedAgeGroup={selectedAgeGroup} 
              setSelectedAgeGroup={setSelectedAgeGroup}
              userAge={getUserAge()}
              isAdmin={isAdmin}
            />
          )}

          {/* Main course display logic */}
          {!hasAgeInfo ? (
            handleMissingAge()
          ) : displayedCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No courses available for the selected age group.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
              initial={{ opacity: 1 }}
              animate={{ opacity: refreshing ? 0.6 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {displayedCourses.map((module, index) => (
                <ModuleCard
                  key={`${selectedAgeGroup}-${index}`} // Add key to force re-render on age group change
                  name={module.name}
                  title={module.title}
                  description={module.description}
                  image={module.image}
                  topics={module.topics}
                  index={index}
                  completed={!!moduleStates[module.name]}
                  onComplete={() => handleComplete(module.name)}
                  userData={userData}
                  isAdmin={isAdmin}
                />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
