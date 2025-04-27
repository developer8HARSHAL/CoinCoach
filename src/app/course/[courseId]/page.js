"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../components/auth/AuthContext";
import useModuleProgress from "../../../hooks/useModuleProgress";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCheckCircle, FaArrowRight } from "react-icons/fa";

// Import your module components
import TimeValueOfMoneyModule from "../../components/youngCourses/belowEighteen";
import InflationImpactModule from "../../components/youngCourses/inflation";
import OpportunityCostModule from "../../components/youngCourses/opportunityCost";
import InterestsModule from "../../components/youngCourses/interests";
import BankStatementModule from "../../components/youngCourses/bankStatementt";
import UpiPaymentModule from "../../components/youngCourses/upiPayment";
import TaxesBasicsModule from "../../components/youngCourses/taxesbasics";
import MutualBasicsModule from "../../components/youngCourses/mutualbasics";

// Define the courses and their respective modules with component references
const courseModules = {
  "money-basics": {
    title: "Money Basics",
    modules: [
      {
        id: "time-value-money",
        title: "Time Value of Money",
        component: TimeValueOfMoneyModule
      },
      {
        id: "inflation-impact",
        title: "Inflation Impact",
        component: InflationImpactModule
      }
    ]
  },
  "financial-concepts": {
    title: "Financial Concepts",
    modules: [
      {
        id: "opportunity-cost",
        title: "Opportunity Cost",
        component: OpportunityCostModule
      },
      {
        id: "interest-calculations",
        title: "Simple & Compound Interest",
        component: InterestsModule
      }
    ]
  },
  "banking-essentials": {
    title: "Banking Essentials",
    modules: [
      {
        id: "bank-statements",
        title: "Bank Statements",
        component: BankStatementModule
      },
      {
        id: "digital-payments",
        title: "Digital Payments",
        component: UpiPaymentModule
      }
    ]
  },
  "financial-planning": {
    title: "Financial Planning",
    modules: [
      {
        id: "taxation-basics",
        title: "Basics of Taxation",
        component: TaxesBasicsModule
      },
      {
        id: "mutual-funds",
        title: "Mutual Funds Basics",
        component: MutualBasicsModule
      }
    ]
  }
};

// Component for Module Content
function ModuleContent({ module, onNext, onPrev, isLastModule, courseId, moduleIndex, totalModules }) {
  const ModuleComponent = module.component;
  const router = useRouter();
  
  return (
    <div className="rounded-xl">
      <h2 className="text-2xl font-bold mb-4">{module.title}</h2>
      <div className="prose max-w-none">
        {/* Render the actual module component */}
        <ModuleComponent onNext={onNext} />
        
        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          {moduleIndex > 0 ? (
            <button
              onClick={onPrev}
              className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Previous Module
            </button>
          ) : (
            <div></div> // Empty div for spacing when there's no prev button
          )}
          
          {isLastModule ? (
            <button
              onClick={() => router.push("/course")}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Courses
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next Module <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Course Completion Component
function CourseCompletion({ courseId, courseTitle }) {
  const router = useRouter();
  
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <FaCheckCircle className="text-green-500 w-20 h-20" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Course Completed!</h2>
      <p className="text-xl mb-8">
        Congratulations! You've completed the {courseTitle} course.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => router.push("/course")}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to All Courses
        </button>
      </div>
    </div>
  );
}

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = params.courseId;
  
  // Get the course data based on courseId
  const courseData = courseModules[courseId];
  
  // If course doesn't exist, redirect to courses page
  useEffect(() => {
    if (!courseData) {
      router.push("/course");
    }
  }, [courseData, router]);
  
  // Use the hook to track progress
  const { 
    currentModule, 
    setCurrentModule, 
    progress, 
    markModuleComplete, 
    isLoading 
  } = useModuleProgress(courseId, courseData?.modules?.length || 0);
  
  // Handle user not logged in
  if (!user && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Login Required</h2>
          <p className="text-gray-700 mb-6">Please sign in to access your courses and track progress</p>
          <button 
            onClick={() => useAuth().openModal('login')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
  
  // Show loading state
  if (isLoading || !courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center">
        <div className="text-2xl text-purple-700">Loading course...</div>
      </div>
    );
  }
  
  // Handle next button click
  const handleNext = () => {
    // Mark current module as complete
    markModuleComplete(currentModule);
    
    // Move to next module if not at the end
    if (currentModule < courseData.modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };
  
  // Handle previous button click
  const handlePrev = () => {
    // Move to previous module if not at the beginning
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
    }
  };
  
  // Check if the course is completed
  const isCompleted = progress === 100;
  
  // Check if current module is the last one
  const isLastModule = currentModule === courseData.modules.length - 1;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Course Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.push("/course")}
            className="flex items-center text-purple-700 hover:text-purple-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Courses
          </button>
          <h1 className="text-2xl font-bold text-center">{courseData.title}</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>{progress}% Complete</span>
            <span>{Math.round(progress / 100 * courseData.modules.length)}/{courseData.modules.length} Modules</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Module Content or Completion Screen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={currentModule} // Add key to trigger animation on module change
        >
          {isCompleted ? (
            <CourseCompletion courseId={courseId} courseTitle={courseData.title} />
          ) : (
            courseData.modules[currentModule] && (
              <ModuleContent 
                module={courseData.modules[currentModule]} 
                onNext={handleNext}
                onPrev={handlePrev}
                isLastModule={isLastModule}
                courseId={courseId}
                moduleIndex={currentModule}
                totalModules={courseData.modules.length}
              />
            )
          )}
        </motion.div>
      </div>
    </div>
  );
}