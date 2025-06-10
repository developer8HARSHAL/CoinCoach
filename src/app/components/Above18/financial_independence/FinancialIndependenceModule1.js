"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Home,
  Briefcase,
  BookOpen,
  PlayCircle,
  TrendingUp,
} from "lucide-react";

const incomeSources = [
  {
    icon: <Home className="w-10 h-10 text-indigo-500" />,
    title: "Rental Income",
    description: "Earn passive income by renting out properties and live a stress free life.",
  },
  {
    icon: <DollarSign className="w-10 h-10 text-cyan-500" />,
    title: "Dividends",
    description: "Receive earnings from stocks that pay dividends.",
  },
  {
    icon: <Briefcase className="w-10 h-10 text-violet-500" />,
    title: "Side Hustles",
    description:
      "Generate extra income through freelance gigs and online businesses.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-fuchsia-500" />,
    title: "Selling Digital Products",
    description: "Earn money by selling e-books, courses, or stock photos.",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-sky-500" />,
    title: "Affiliate Marketing",
    description: "Promote products and earn commissions per sale.",
  },
  {
    icon: <PlayCircle className="w-10 h-10 text-purple-500" />,
    title: "YouTube & Blogging",
    description: "Monetize content through ads and sponsorships.",
  },
];

export default function FinancialIndependenceModule1() {
  return (
<div className="min-h-screen mt-5 bg-gradient-to-br from-rose-50 via-amber-100 to-emerald-100 flex flex-col">
<div className="text-center pt-10 px-6 pb-0">
<motion.h1
      className="text-black text-4xl md:text-5xl font-bold mb-1 mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Financial Independence & Wealth Building
    </motion.h1>
  
    <motion.p
      className="text-black text-2xl max-w-3xl mx-auto mb-0 mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      Discover the keys to financial freedom through smart saving, investing,
      and creating multiple streams of income.
    </motion.p>
    </div>
  
    {/* Information boxes at the bottom */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20 mt-10 pt-2">
    {incomeSources.map((source, index) => (
        <motion.div 
          key={index} 
          whileHover={{ scale: 1.05 }} 
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="p-6 shadow-lg bg-white rounded-lg border-l-[8px] border-amber-500">
            <CardContent className="flex items-center space-x-4">
              {source.icon}
              <div>
                <h2 className="text-xl font-semibold">{source.title}</h2>
                <p className="text-gray-600">{source.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
  
  );
}
