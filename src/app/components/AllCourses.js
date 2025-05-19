"use client";
import React, { useState, useEffect } from 'react';
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

// Main CoursesPage component
export default function AgeSpecificCoursesPage() {
  const [moduleStates, setModuleStates] = useState({});
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Admin flag - could be based on user role
  const router = useRouter();
  
  // Animation controls
  const [modulesRef, modulesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
    
    // Set up event listener for user data updates
    window.addEventListener('userDataUpdated', handleUserDataUpdate);
    
    // Add event listener for real-time user profile updates
    window.addEventListener('userProfileUpdated', handleProfileUpdate);
    
    // Add event listener for user age changes
    window.addEventListener('userAgeChanged', handleAgeChange);
    
    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
      window.removeEventListener('userProfileUpdated', handleProfileUpdate);
      window.removeEventListener('userAgeChanged', handleAgeChange);
    };
  }, []);

  // Handle specific age change events
  const handleAgeChange = (event) => {
    if (event.detail && event.detail.newAge !== undefined) {
      const newAge = event.detail.newAge;
      const newAgeGroup = newAge < 18 ? 'under18' : 'above18';
      
      // Calculate previous age group for comparison
      const oldAgeGroup = userData?.age < 18 ? 'under18' : 'above18';
      
      // Update the userData with the new age
      setUserData(prev => ({
        ...prev,
        age: newAge
      }));
      
      // For non-admin users, we always enforce their age-appropriate content
      if (!isAdmin) {
        // Update the selected age group
        setSelectedAgeGroup(newAgeGroup);
        
        // Only show refresh animation if the age group actually changed
        if (oldAgeGroup !== newAgeGroup) {
          triggerRefreshAnimation();
        }
      }
    }
  };
  
  // Handle general profile updates (including possible age changes)
  const handleProfileUpdate = (event) => {
    if (event.detail && event.detail.userData) {
      const updatedUserData = event.detail.userData;
      
      // Calculate age groups for comparison
      const oldAgeGroup = userData?.age < 18 ? 'under18' : 'above18';
      const newAgeGroup = updatedUserData.age < 18 ? 'under18' : 'above18';
      
      // Check if the age group changed
      const ageGroupChanged = oldAgeGroup !== newAgeGroup;
      
      // Update user data
      setUserData(updatedUserData);
      
      // Update admin status
      const userIsAdmin = updatedUserData.role === 'admin';
      setIsAdmin(userIsAdmin);
      
      // For non-admin users, we always force them to see their age group's courses
      if (!userIsAdmin) {
        // Always update the selected age group to match their age
        setSelectedAgeGroup(newAgeGroup);
        
        // Only show refresh animation if the age group changed
        if (ageGroupChanged) {
          triggerRefreshAnimation();
        }
      }
    }
  };
  
  // Setup a refresh animation effect to highlight course changes
  const [refreshing, setRefreshing] = useState(false);
  
  const triggerRefreshAnimation = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Animation duration
  };
  
  // Handle user data updates (including age changes)
  const handleUserDataUpdate = (event) => {
    // Update the user data from the event
    if (event.detail && event.detail.userData) {
      const updatedUserData = event.detail.userData;
      
      // Calculate age groups
      const oldAgeGroup = userData?.age < 18 ? 'under18' : 'above18';
      const newAgeGroup = updatedUserData.age < 18 ? 'under18' : 'above18';
      
      // Check if age group changed
      const ageGroupChanged = oldAgeGroup !== newAgeGroup;
      
      // Update user data
      setUserData(updatedUserData);
      
      // Always update the admin status
      setIsAdmin(updatedUserData.role === 'admin');
      
      // For non-admin users, always enforce their age-appropriate content
      // This ensures they can't see courses from other age groups
      if (!updatedUserData.role === 'admin') {
        setSelectedAgeGroup(newAgeGroup);
        
        // Show refresh animation only if the age group actually changed
        if (ageGroupChanged) {
          triggerRefreshAnimation();
        }
      }
    } else {
      // If no detail is provided, fetch fresh data
      fetchUserData();
    }
  };
  
  // Function to fetch user data
  async function fetchUserData() {
    try {
      setLoading(true);
      const response = await fetch('/api/user/info');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      
      setUserData(data);
      
      // Check if user is admin (you can adjust this based on your user roles)
      const userIsAdmin = data.role === 'admin';
      setIsAdmin(userIsAdmin);
      
      // Set the appropriate age group based on user's age
      if (data.age !== undefined) {
        const ageGroup = data.age < 18 ? 'under18' : 'above18';
        
        // For non-admin users, we force them to only see their age group's courses
        // For admin users, we allow them to see 'all' courses if that was selected
        if (!userIsAdmin || selectedAgeGroup === '') {
          setSelectedAgeGroup(ageGroup);
        }
      } else {
        // If age is not available, default to 'all' for admins only
        // For regular users with missing age, default to adult courses
        setSelectedAgeGroup(userIsAdmin ? 'all' : 'above18');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
      setSelectedAgeGroup('all'); // Default to all if there's an error
    } finally {
      setLoading(false);
    }
  }

  // Setup polling for user data changes
  useEffect(() => {
    // Setup a polling interval to check for user data changes
    const pollingInterval = setInterval(() => {
      if (!loading) {  // Only poll if not currently loading
        checkForUserDataChanges();
      }
    }, 30000); // Poll every 30 seconds
    
    return () => clearInterval(pollingInterval);
  }, [loading]);
  
  // Function to check for user data changes
  const checkForUserDataChanges = async () => {
    try {
      const response = await fetch('/api/user/info');
      
      if (!response.ok) {
        return;  // Silently fail on polling errors
      }
      
      const data = await response.json();
      
      // Update admin status
      const userIsAdmin = data.role === 'admin';
      
      // Check if age group changed
      if (userData && data.age !== undefined) {
        const currentAgeGroup = userData.age < 18 ? 'under18' : 'above18';
        const newAgeGroup = data.age < 18 ? 'under18' : 'above18';
        
        // Check if role changed
        const roleChanged = (userData.role === 'admin') !== (data.role === 'admin');
        
        if (currentAgeGroup !== newAgeGroup || roleChanged) {
          // Age group or role changed, update data
          setUserData(data);
          setIsAdmin(userIsAdmin);
          
          // For non-admin users, we force them to see their age group's courses
          if (!userIsAdmin) {
            setSelectedAgeGroup(newAgeGroup);
            
            // Only show refresh animation if the age group actually changed
            if (currentAgeGroup !== newAgeGroup) {
              triggerRefreshAnimation();
            }
          }
        } else if (JSON.stringify(userData) !== JSON.stringify(data)) {
          // Other user data changed, just update silently
          setUserData(data);
          setIsAdmin(userIsAdmin);
        }
      }
    } catch (err) {
      console.error('Error polling for user data:', err);
    }
  };

  // Watch for changes in userData and update the age group accordingly
  // Force appropriate age group selection for non-admin users
  useEffect(() => {
    if (userData && userData.age !== undefined) {
      const appropriateAgeGroup = userData.age < 18 ? 'under18' : 'above18';
      
      // For non-admin users, always enforce the correct age group
      // This ensures they can't see courses from other age groups
      if (!isAdmin) {
        // Force the selection to match their age group
        setSelectedAgeGroup(appropriateAgeGroup);
      }
    }
  }, [userData, isAdmin]);

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

  // Filter courses based on selected age group
  // For non-admin users, strictly show only their age group's courses
  const displayedCourses = isAdmin && selectedAgeGroup === 'all'
    ? [...coursesData.under18, ...coursesData.above18] 
    : coursesData[selectedAgeGroup] || [];

  const handleComplete = (moduleName) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
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
            onClick={() => fetchUserData()} 
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
            {userData && userData.age !== undefined
              ? `Welcome ${userData.name || 'back'}! Here are financial courses tailored for ${userData.age < 18 ? 'your age group' : 'adults'}.` 
              : 'Learn at your own pace with our comprehensive self-guided modules.'}
          </p>

          {/* Age group selector - only shown for admins */}
          {isAdmin && (
            <AgeSelector 
              selectedAgeGroup={selectedAgeGroup} 
              setSelectedAgeGroup={setSelectedAgeGroup}
              userAge={userData?.age}
              isAdmin={isAdmin}
            />
          )}

          {/* Display message if no courses are available */}
          {displayedCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No courses available for the selected age group.</p>
            </div>
          )}

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: refreshing ? 0.6 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {displayedCourses.map((module, index) => (
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
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}