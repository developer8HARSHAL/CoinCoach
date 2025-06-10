"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  PiggyBank,
  ShieldCheck,
  TrendingDown,
  PieChart,
  CalendarClock,
  Trophy
} from "lucide-react";

const roadmapSteps = [
  {
    icon: <PieChart className="w-6 h-6 text-white" />,
    bg: "bg-amber-300",
    title: "Master Budgeting",
    description: "Create a plan for your income and expenses to take control of your financial life.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    bg: "bg-amber-400",
    title: "Build an Emergency Fund",
    description: "Set aside 3–6 months of expenses to cover unexpected life events.",
  },
  {
    icon: <PiggyBank className="w-6 h-6 text-white" />,
    bg: "bg-amber-500",
    title: "Leverage Compounding",
    description: "Start investing early to let compound interest grow your wealth over time.",
  },
  {
    icon: <TrendingDown className="w-6 h-6 text-white" />,
    bg: "bg-amber-600",
    title: "Understand Inflation",
    description: "Learn how inflation affects your purchasing power and investments.",
  },
  {
    icon: <CalendarClock className="w-6 h-6 text-white" />,
    bg: "bg-amber-700",
    title: "Spend Smart, Save More",
    description: "Practice mindful spending and avoid unnecessary debt.",
  },
  {
    icon: <Trophy className="w-6 h-6 text-white" />, // 🎉 Final step!
    bg: "bg-amber-800",
    title: "Achieve Financial Independence!",
    description: "Enjoy the fruits of your discipline—freedom, security, and peace of mind.",
  },
];

export default function FinancialIndependenceModule2() {
  return (
    <div className="min-h-screen mt-5 bg-gradient-to-br from-rose-50 via-amber-100 to-emerald-100 flex flex-col items-center">
      <div className="text-center pt-10 px-6 pb-0">
        <motion.h1
          className=" text-black text-4xl md:text-5xl font-bold mb-1 mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Financial Roadmap to Independence
        </motion.h1>

        <motion.p
          className="text-black text-2xl max-w-3xl mx-auto mb-0 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          These essential steps form the core foundation of financial independence.
          Master each one to build a stable, sustainable financial future.
        </motion.p>
      </div>

      {/* Timeline Style Card Grid */}
      <div className="relative w-full max-w-5xl mt-16 px-6 mb-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 to-emerald-300 rounded-full"></div>
        
        <div className="flex flex-col gap-12">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-start ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              {/* Icon Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 z-10">
                <div className={`p-3 rounded-full shadow-xl ${step.bg}`}>
                  {step.icon}
                </div>
              </div>

              <Card className="w-full md:w-[42%] bg-white/70 backdrop-blur-md border-l-[8px] border-amber-500 shadow-xl rounded-xl px-6 py-5">
                <CardContent>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h2>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
