// /src/app/courses/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../components/auth/AuthContext';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// In the ModuleCard component, modify to receive and use the onClick prop:
const ModuleCard = ({ title, description, image, topics, index, onClick }) => {
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

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      onClick={onClick} // Add the onClick handler here
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Rest of the ModuleCard component remains the same */}
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {image && <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-xl font-bold text-white p-4">{title}</h3>
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
        <div className="flex justify-end">
          <button 
            className="px-4 py-2  text-purple-600 rounded-lg "
            onClick={(e) => {
              e.stopPropagation(); // Prevent double-triggering the parent onClick
              onClick(); // Call the same onClick passed from parent
            }}
          >
            Start Learning
          </button>
        </div>
      </div>
    </motion.div>
  );
};



export default function CoursesPage() {
  const router = useRouter();
  const { user } = useAuth();
  
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

  const courses = [
    {
      id: 'money-basics',
      title: 'Money Basics',
      description: 'Learn about the time value of money and inflation impact.',
      image: '/images/ymoney.jpg',
      topics: ['time-value-money', 'inflation-impact']
    },
    {
      id: 'financial-concepts',
      title: 'Financial Concepts',
      description: 'Understand opportunity cost and interest calculations.',
      image: '/images/yFinancial.jpg',
      topics: ['opportunity-cost', 'interest-calculations']
    },
    {
      id: 'banking-essentials',
      title: 'Banking Essentials',
      description: 'Learn about bank statements and digital payments.',
      image: '/images/ybank.jpg',
      topics: ['bank-statements', 'digital-payments']
    },
    {
      id: 'financial-planning',
      title: 'Financial Planning',
      description: 'Discover taxation basics and mutual funds.',
      image: '/images/yplanning.jpg',
      topics: ['taxation-basics', 'mutual-funds']
    }
  ];

  // Handle course click
  const handleCourseClick = (courseId) => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      
      {/* Self-Paced Modules Section */}
      <motion.div 
        ref={modulesRef}
        initial="hidden"
        animate={modulesInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 md:py-32 bg-white"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            <span className="relative inline-block px-2">
            Financial learning
              <svg className="absolute -bottom-2 left-0 w-full" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,0 Q50,12 100,0" fill="#EAB308" />
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Learn at your own pace with our comprehensive self-guided modules. Track your progress and mark completed sections as you master financial concepts.
          </p>
          
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
  {courses.map((course, index) => (
    <ModuleCard 
      key={index}
      title={course.title}
      description={course.description}
      image={course.image}
      topics={course.topics}
      index={index}
      onClick={() => handleCourseClick(course.id)} // Pass the function with the course.id
    />
  ))}
</div>
          
        
        </div>
      </motion.div>

     
    </div>
  );
}