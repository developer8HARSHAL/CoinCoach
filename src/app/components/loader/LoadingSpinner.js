'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ isLoading }) => {
  if (!isLoading) return null;
  
  // Simple fade animation for the overlay
  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Simple infinite spinner animation
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Simple progress bar
  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: "100%",
      transition: { duration: 2, repeat: Infinity }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="bg-white rounded-lg p-6 flex flex-col items-center max-w-xs w-full shadow-lg">
        <div className="text-xl font-semibold mb-4 text-gray-800">CoinCoach</div>
        
        <motion.div
          variants={spinnerVariants}
          animate="animate"
          className="w-10 h-10 border-4 border-gray-200 border-t-yellow-500 rounded-full mb-4"
        />
        
        <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-3">
          <motion.div 
            className="h-full bg-yellow-500"
            variants={progressVariants}
            initial="initial"
            animate="animate"
          />
        </div>
        
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;