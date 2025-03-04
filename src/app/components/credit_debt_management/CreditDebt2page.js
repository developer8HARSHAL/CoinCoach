"use client";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Percent, ChevronDown, ChevronUp
} from 'lucide-react';
import Lottie from "lottie-react";
import person1Animation from "../../lotties/person1.json";
import person2Animation from "../../lotties/person2.json";

export default function CreditDebt2() {
  const [openDebt, setOpenDebt] = useState(null);
  const toggleDebt = (type) => {
    setOpenDebt(openDebt === type ? null : type);
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const responsibilities = [
    { name: "Alex", advice: "Pay the full balance every month to avoid interest charges.", animation: person2Animation },
    { name: "Sophia", advice: "Don’t max out your credit card. Keep utilization below 30%.", animation: person1Animation },
    { name: "Michael", advice: "Use credit cards for necessary expenses, not luxuries.", animation: person2Animation },
    { name: "Emma", advice: "Take advantage of rewards and cashback wisely for savings.", animation: person1Animation },
    { name: "Daniel", advice: "Set up autopay to avoid late fees and protect your credit score.", animation: person2Animation },
    { name: "Olivia", advice: "Check your credit report regularly for errors and fraud.", animation: person1Animation }
  ];
    return(
        <div className="min-h-screen bg-white">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center text-center p-10">
              <p className="text-[#1E3A8A] font-medium mb-2">Types of Debts</p>
              <h2 className="text-4xl font-bold text-[#1E3A8A] mb-6">Good Debt, Bad Debt</h2>
              <div className="space-y-6 w-full max-w-2xl text-xl">
                <div className="border border-[#1E3A8A] p-6 rounded-lg cursor-pointer bg-[#E3EFFE]" onClick={() => toggleDebt("good")}> 
                  <div className="flex justify-between items-center">
                    <b className="text-[#1E3A8A]">Good Debt: Used for investments that can grow in value over time.</b>
                    {openDebt === "good" ? <ChevronUp size={20} className="text-[#1E3A8A]" /> : <ChevronDown size={20} className="text-[#1E3A8A]" />}
                  </div>
                  {openDebt === "good" && (
                  <ul className="mt-2 list-disc ml-6 text-gray-700 text-left">
                    <li><b>Student Loans:</b> Invests in education, which can lead to higher earnings.</li>
                    <li className="text-left"><b>Home Loans:</b> Real estate can appreciate in value.</li>
                  </ul>
                  )}
                </div>  

              <div className="border border-[#1E3A8A] p-6 rounded-lg cursor-pointer bg-[#E3EFFE]" onClick={() => toggleDebt("bad")}> 
                <div className="flex justify-between items-center">
                  <b className="text-[#1E3A8A]">Bad Debt: Used for non-essential expenses and depreciating assets.</b>
                  {openDebt === "bad" ? <ChevronUp size={20} className="text-[#1E3A8A]" /> : <ChevronDown size={20} className="text-[#1E3A8A]" />}
                </div>
                {openDebt === "bad" && (
                <ul className="mt-2 list-disc ml-6 text-gray-700 text-left">
                  <li><b>Credit Card Debt:</b> High-interest debt often used for luxury items.</li>
                  <li><b>Personal Loans for Unnecessary Purchases:</b> Loans for vacations or gadgets can lead to financial strain.</li>
                </ul>
                )}
              </div>
            </div>
          </div>
        
        {/* Section 5:Interest Rates & Credit Card Fees */}
        <div className="grid md:grid-cols-2 gap-16 mb-20 mt-[100px]">
          <div>
            <p className="text-[#1E3A8A] font-medium mb-2">Credit Cards & Loans</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interest Rates & <br/>Credit Card Fees
            </h2>
            <p className="text-gray-600 mb-6">
              <ul className='list-disc ml-6'>
                <li><b>Interest Rates: </b>The cost of borrowing money. Credit card APRs (Annual Percent Rate) can range from 12% to 40% annually, depending on the provider and user profile.
                Some credit cards offer 0% APR promotional periods, but interest kicks in after that.</li>
                <li><b>Common Credit Card Fees: </b><br/>
                - <b>Annual Fee:</b> Some premium cards charge a yearly fee.<br/>
                - <b>Late Payment Fee:</b> Charged if you miss a payment due date.<br/>
                - <b>Over-limit Fee:</b> If you exceed your credit limit, you might be charged extra.<br/>
                - <b>Cash Advance Fee:</b> Withdrawing cash using a credit card incurs high fees and interest.<br/>
                </li>
              </ul>
            </p>
           
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-full h-80 bg-blue-100 rounded flex items-center justify-center mb-4">
                    <Percent className="h-40 w-40 text-[#1E3A8A]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      
      <div className="flex flex-col items-center justify-center ml-[-95px] min-h-screen w-screen max-w-7xl bg-gradient-to-b from-blue-900 to-blue-600 p-6 text-center text-white">
      <motion.h1 
        className="text-4xl font-extrabold mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How to Use Credit Cards Responsibly?
      </motion.h1>
      
      <div className="flex space-x-20 mt-12">
        {responsibilities.map((person, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center cursor-pointer"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div
              className="w-28 h-36 flex items-center justify-center bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:shadow-blue-500/50"
              whileHover={{ scale: 1.1 }}
            >
              <Lottie animationData={person.animation} loop={false} autoplay={hoveredIndex === index} />
            </motion.div>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-36 w-72 p-5 bg-white text-black shadow-xl rounded-lg border-l-4 border-blue-700"
              >
                <h2 className="text-xl font-semibold text-blue-800">{person.name}</h2>
                <p className="text-sm text-gray-700">{person.advice}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </main>
</div>
)}