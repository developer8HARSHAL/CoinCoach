'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ isLoading }) => {
  if (!isLoading) return null;
  
  // Bouncing coins animation
  const containerVariants = {
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

  // Variants for coin animations
  const coinVariants = {
    animate: (i) => ({
      y: [-15, 0, -15],
      scale: [1, 1.1, 1],
      rotate: [0, 10, 0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        delay: i * 0.2,
      }
    })
  };

  // Variants for the progress bar
  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: "100%",
      transition: { duration: 2, repeat: Infinity }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="bg-white rounded-xl p-8 flex flex-col items-center max-w-md w-full shadow-2xl border-2 border-yellow-400">
        <div className="text-2xl font-bold mb-6 text-yellow-600">CoinCoach</div>
        
        <div className="flex justify-center items-center mb-8 relative">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={coinVariants}
              animate="animate"
              className="w-10 h-10 mx-1 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-sm font-bold">$</span>
            </motion.div>
          ))}
        </div>
        
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
            variants={progressVariants}
            initial="initial"
            animate="animate"
          />
        </div>
        
        <p className="text-gray-600 font-medium text-center">
          Loading your financial wisdom...
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;