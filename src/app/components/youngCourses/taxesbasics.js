"use client"

import { FaLandmark, FaReceipt, FaPiggyBank, FaChartPie, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BasicsOfTaxation({ onNext }) {
  const [activeTab, setActiveTab] = useState("income");
  const [activeExample, setActiveExample] = useState(0);

  const taxTypes = [
    {
      id: "income",
      title: "Income Tax",
      icon: <FaReceipt className="text-blue-500" />,
      description: "Paid on money you earn from salary, business, or investments",
      examples: [
        "👨‍💼 Rohan pays 5% tax on his ₹7 lakh salary",
        "👩‍⚕️ Dr. Priya pays 20% on her clinic's profits",
        "👨‍🌾 Farmer Vijay doesn't pay as agriculture income is exempt"
      ]
    },
    {
      id: "gst",
      title: "GST",
      icon: <FaLandmark className="text-purple-500" />,
      description: "Goods and Services Tax added to purchases",
      examples: [
        "🛒 5% GST on groceries, 18% on smartphones",
        "🍽️ 5% GST when you eat at a restaurant",
        "✈️ 12% GST on flight tickets"
      ]
    },
    {
      id: "investment",
      title: "Tax Savings",
      icon: <FaPiggyBank className="text-green-500" />,
      description: "Legal ways to reduce your tax burden",
      examples: [
        "🏥 Health insurance premiums save tax under 80D",
        "📚 Education loan interest is deductible",
        "💼 ₹1.5L deduction for investments (80C)"
      ]
    }
  ];

  const taxSpendingExamples = [
    { category: "Healthcare", percentage: 15, icon: "🏥" },
    { category: "Education", percentage: 15, icon: "📚" },
    { category: "Infrastructure", percentage: 20, icon: "🏗️" },
    { category: "Defense", percentage: 10, icon: "🛡️" },
    { category: "Social Welfare", percentage: 12, icon: "👵" },
    { category: "Others", percentage: 28, icon: "✨" }
  ];

  return (
    <div className="space-y-12 md:space-y-16 max-w-4xl mx-auto px-4 py-8">

      {/* 🏛️ Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <FaLandmark className="text-5xl text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700">
          Taxes Demystified
        </h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Understanding how taxes work helps you become a smarter earner and citizen
        </p>
      </motion.section>

      {/* 💰 Tax Type Selector */}
      <section className="bg-white p-2 rounded-xl shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide">
          {taxTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex-1 min-w-max px-4 py-3 text-center font-medium ${activeTab === type.id ? 'border-b-2 border-indigo-600 text-indigo-700' : 'text-gray-500'}`}
            >
              <div className="flex items-center justify-center gap-2">
                {type.icon}
                {type.title}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 📝 Active Tax Content */}
      <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
        {taxTypes.map((type) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeTab === type.id ? 1 : 0 }}
            className={`${activeTab === type.id ? 'block' : 'hidden'}`}
          >
            <h2 className="text-xl font-semibold mb-3">{type.title}</h2>
            <p className="text-gray-700 mb-4">{type.description}</p>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Real Examples:</h3>
              <ul className="space-y-2">
                {type.examples.map((example, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-lg">{example.split(" ")[0]}</span>
                    <span>{example.split(" ").slice(1).join(" ")}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 🏗️ Where Taxes Go */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-center">
          Where Your Tax Money Gets Used
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {taxSpendingExamples.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-lg shadow-sm text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-medium">{item.category}</h4>
              <div className="relative h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="absolute h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <p className="text-sm mt-1">{item.percentage}% of budget</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💡 Tax Saving Tips */}
      <section className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
        <h3 className="text-xl font-semibold mb-3 text-green-800 flex items-center gap-2">
          <FaPiggyBank />
          Smart Tax Habits
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full">
              <FaChartPie className="text-green-600" />
            </div>
            <p className="flex-1">
              <strong>Know your slabs:</strong> Different income levels have different tax rates
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full">
              <FaPiggyBank className="text-green-600" />
            </div>
            <p className="flex-1">
              <strong>Invest wisely:</strong> Use 80C deductions (PPF, ELSS, insurance etc.)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full">
              <FaReceipt className="text-green-600" />
            </div>
            <p className="flex-1">
              <strong>Keep records:</strong> Maintain bills and documents for 6+ years
            </p>
          </div>
        </div>
      </section>

      {/* Next Button */}
   
    </div>
  );
}