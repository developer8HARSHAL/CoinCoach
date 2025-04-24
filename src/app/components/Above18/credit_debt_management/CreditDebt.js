"use client";
import React from 'react';
import { 
  ShieldCheck,
  Wallet,
  FileText,
  HandCoins
} from 'lucide-react';
import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import DebtHigh from "../../../lotties/person1.json";
import DebtSmall from "../../../lotties/person2.json";

export default function CreditDebt() {
    const [hoveredMethod, setHoveredMethod] = useState(null);
    return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Understanding Credit & Debt Management */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="text-[#1E3A8A] font-medium mb-2">Understanding Credit & Debt Management</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What is Credit Score?
            </h2>
            <p className="text-gray-600 mb-6">
            A credit score is a numerical representation of a person’s creditworthiness, 
            helping lenders assess how likely they are to repay borrowed money. It ranges 
            from 300 to 850 (in most scoring systems like FICO and VantageScore). A higher 
            score indicates better creditworthiness and makes it easier to secure loans with
             favorable interest rates.
            </p>
           
          </div>

          <div className="relative">
            <div className="bg-[#1E3A8A] rounded-full w-64 h-64 flex items-center justify-center mx-auto relative">
              <ShieldCheck className="h-32 w-32 text-white" />
              <div className="absolute -bottom-4 -right-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-6 h-1 bg-gray-800 transform rotate-45"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute top-1/4 -left-6">
              <div className="w-6 h-6 text-[#1E3A8A] ml-[50px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/3">
              <div className="w-24 h-24 rounded-full bg-gray-100"></div>
            </div>
          </div>
        </div>

        {/* Section 2: Factors Affecting Credit Scores */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Factors Affecting Credit Scores:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="relative">
              <div className="bg-blue-100 w-full h-64 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  {/* Risk vs Reward illustration */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded border-2 border-[#1E3A8A] flex items-center justify-center mb-2">
                      <FileText className="h-12 w-12 text-[#1E3A8A]" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded border-2 border-[#1E3A8A] flex items-center justify-center mb-2">
                      <Wallet className="h-12 w-12 text-[#1E3A8A]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-gray-600 mb-6">
              <ul className="list-disc ml-6">
                <li><b>Payment history:</b> Making timely payments on loans and credit cards improves your score, while missed or late payments lower it.</li>
                <li><b>Credit Utilization Ratio:</b> This is the percentage of your total credit limit that you’re using. Keeping it below 30% of your credit limit is ideal. For example, if your credit limit is ₹1,00,000, you should keep your balance below ₹30,000.</li>
                <li><b>Length of Credit History:</b> A longer credit history provides more data for lenders to evaluate</li>
                <li><b>Credit Mix:</b> A diverse mix of credit accounts (credit cards, home loans, personal loans) can help boost your score, as it demonstrates responsible credit management.                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Methods for Paying off Debt */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="relative">
            <div className="bg-[#1E3A8A] rounded-full w-64 h-64 flex items-center justify-center mx-auto relative">
              <HandCoins className="h-32 w-32 text-white" />
              <div className="absolute -bottom-4 -right-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-6 h-1 bg-gray-800 transform rotate-45"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute top-1/4 -left-6">
              <div className="w-6 h-6 text-[#1E3A8A] ml-[50px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/3">
              <div className="w-24 h-24 rounded-full bg-gray-100"></div>
            </div>
          </div>

          <div>
            <p className="text-[#1E3A8A] font-medium mb-2">Methods for Paying off Debt</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Avalanche & Snowball Method
            </h2>
            <ul className='list-disc ml-6 text-gray-600 mb-6'>
              <li><b>Avalanche Method (Mathematically Efficient): </b>Focuses on paying off the highest-interest debt first while making minimum payments on others.
              </li>
              <li><b>Snowball Method (Psyvhologically Motivating): </b>Focuses on paying off the smallest debts first to build momentum.
              </li>
            </ul>
            <p className="text-[#1E3A8A] font-medium mb-2">Which One to Choose?</p>
            <p className="text-gray-600 mb-6">If you want to save more money, choose the <b>Avalanche Method.</b>
            If you need motivation and quick wins, choose the <b>Snowball Method.</b>
            </p>
          </div>
        </div>
        
        {/* Example for Avalanche and Snowball */}
        <div>
    
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 p-6 text-center text-white">
            {/* Title */}
            <motion.h1 
                className="text-4xl font-extrabold mb-6 drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Debt Repayment Strategies
            </motion.h1>
            
            <motion.p 
                className="text-lg max-w-2xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                You have three debts: <br/>
                1.) ₹50,000 at 18% interest<br/>
                2.) ₹30,000 at 12% interest<br/>
                3.) ₹20,000 at 6% interest
            </motion.p>

            <div className="flex space-x-28">
                {/* Avalanche Method */}
                <motion.div
                    className="relative flex flex-col items-center cursor-pointer"
                    onHoverStart={() => setHoveredMethod("Avalanche")}
                    onHoverEnd={() => setHoveredMethod(null)}
                >
                    <motion.div
                        className="w-28 h-36 flex items-center justify-center bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:shadow-blue-500/50"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Lottie animationData={DebtHigh} />
                    </motion.div>
                    {hoveredMethod === "Avalanche" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-36 w-72 p-5 bg-white text-black shadow-xl rounded-lg border-l-4 border-blue-700"
                        >
                            <h2 className="text-xl font-semibold text-blue-800">Avalanche Method</h2>
                            <p className="text-sm text-gray-700">
                                Pay off ₹50,000 at 18% interest first, then ₹30,000 at 12%, and finally ₹20,000 at 6%. This minimizes total interest paid.
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Snowball Method */}
                <motion.div
                    className="relative flex flex-col items-center cursor-pointer"
                    onHoverStart={() => setHoveredMethod("Snowball")}
                    onHoverEnd={() => setHoveredMethod(null)}
                >
                    <motion.div
                        className="w-28 h-36 flex items-center justify-center bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:shadow-blue-500/50"
                        whileHover={{ scale: 1.1 }}
                    >
                        <Lottie animationData={DebtSmall} />
                    </motion.div>
                    {hoveredMethod === "Snowball" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-36 w-72 p-5 bg-white text-black shadow-xl rounded-lg border-l-4 border-blue-700"
                        >
                            <h2 className="text-xl font-semibold text-blue-800">Snowball Method</h2>
                            <p className="text-sm text-gray-700">
                                Pay off ₹20,000 at 6% interest first, then ₹30,000 at 12%, and finally ₹50,000 at 18%. Builds motivation by clearing smaller debts faster.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
        </div>
      </main>
    </div>
  );
}