"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Percent, 
  ChevronDown, 
  ChevronUp, 
  CreditCard,
  School,
  Home,
  ShoppingCart,
  Wallet,
  Info,
  CalendarClock
} from 'lucide-react';
import Lottie from "lottie-react";
import person1Animation from "../../../lotties/person1.json";
import person2Animation from "../../../lotties/person2.json";

export default function CreditDebt2() {
  const [openDebt, setOpenDebt] = useState(null);
  const [activeTab, setActiveTab] = useState("types");
  const [hoveredPerson, setHoveredPerson] = useState(null);
  
  const toggleDebt = (type) => {
    setOpenDebt(openDebt === type ? null : type);
  };
  
  const creditCardTips = [
    { 
      name: "Alex", 
      tip: "Pay full balance monthly to avoid interest", 
      description: "Never carry a balance if you can help it. This is the #1 way to save money.", 
      animation: person2Animation,
      icon: Wallet
    },
    { 
      name: "Sophia", 
      tip: "Keep utilization below 30%", 
      description: "Using less than 30% of your credit limit helps your credit score.", 
      animation: person1Animation,
      icon: CreditCard
    },
    { 
      name: "Michael", 
      tip: "Only buy what you can afford", 
      description: "Credit cards aren't free money. Only charge what you can pay off.", 
      animation: person2Animation,
      icon: ShoppingCart
    },
    { 
      name: "Emma", 
      tip: "Use rewards strategically", 
      description: "Choose cards with rewards that match your spending habits.", 
      animation: person1Animation,
      icon: Wallet
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg shadow-sm bg-white">
            <button
              onClick={() => setActiveTab("types")}
              className={`px-6 py-3 text-base font-medium rounded-l-lg transition-all ${
                activeTab === "types" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              Types of Debt
            </button>
            <button
              onClick={() => setActiveTab("interest")}
              className={`px-6 py-3 text-base font-medium transition-all ${
                activeTab === "interest" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              Interest & Fees
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`px-6 py-3 text-base font-medium rounded-r-lg transition-all ${
                activeTab === "tips" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              Credit Card Tips
            </button>
          </div>
        </div>

        {activeTab === "types" && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-10">
            <div className="flex flex-col items-center text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Good Debt vs. Bad Debt</h2>
              <p className="text-gray-600 max-w-3xl">
                Not all debt is created equal. Understanding the difference between good and bad debt
                will help you make smarter financial decisions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Good Debt */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
                <div 
                  className="p-4 bg-blue-100 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDebt("good")}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-600 p-2 rounded-full mr-3">
                      <Home className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800">Good Debt</h3>
                  </div>
                  {openDebt === "good" ? 
                    <ChevronUp className="text-blue-800" /> : 
                    <ChevronDown className="text-blue-800" />
                  }
                </div>
                
                <div className={`p-5 transition-all duration-300 ${openDebt === "good" ? "block" : "hidden"}`}>
                  <p className="text-gray-600 mb-4">
                    Good debt is an investment that will grow in value or generate income over time.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <Home className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Home Loans</h4>
                        <p className="text-sm text-gray-600">Real estate typically appreciates over time and builds equity.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <School className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Student Loans</h4>
                        <p className="text-sm text-gray-600">Education can increase your earning potential over your lifetime.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bad Debt */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
                <div 
                  className="p-4 bg-blue-100 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDebt("bad")}
                >
                  <div className="flex items-center">
                    <div className="bg-blue-600 p-2 rounded-full mr-3">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800">Bad Debt</h3>
                  </div>
                  {openDebt === "bad" ? 
                    <ChevronUp className="text-blue-800" /> : 
                    <ChevronDown className="text-blue-800" />
                  }
                </div>
                
                <div className={`p-5 transition-all duration-300 ${openDebt === "bad" ? "block" : "hidden"}`}>
                  <p className="text-gray-600 mb-4">
                    Bad debt is used for purchases that quickly lose value and don't generate income.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Credit Card Debt</h4>
                        <p className="text-sm text-gray-600">High interest rates (12-25%) can make purchases cost much more over time.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Loans for Luxury Items</h4>
                        <p className="text-sm text-gray-600">Taking loans for vacations or electronics that depreciate quickly.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "interest" && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                  Understanding Credit Card Costs
                </h2>
                <p className="text-gray-600 mb-6">
                  Credit cards can be useful tools, but they come with costs you should understand.
                </p>
                
                <div className="bg-blue-50 p-5 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 flex items-center mb-3">
                    <Percent className="mr-2 h-5 w-5" /> Interest Rates
                  </h3>
                  <div className="text-gray-600 space-y-2">
                    <p>• Credit card APRs usually range from <strong>12% to 25%</strong></p>
                    <p>• Interest is charged only if you don't pay your full balance</p>
                    <p>• Even a 15% APR can double your debt in 5 years</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 flex items-center mb-3">
                    <Info className="mr-2 h-5 w-5" /> Common Fees
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <p>Annual Fee: ₹0-₹5,000</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <p>Late Payment: ₹300-₹1,000</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <p>Cash Advance: 2-5% of amount</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <p>Foreign Transaction: 1-3%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-100 rounded-xl p-6 flex justify-center items-center">
                <div className="text-center">
                  <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6">
                    <Percent className="h-20 w-20 text-white" />
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
                    <h3 className="font-bold text-lg text-blue-800 mb-2">Credit Card Interest Example</h3>
                    <p className="text-gray-700 mb-3">If you have ₹50,000 credit card debt at 18% APR:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b pb-1">
                        <span>Monthly interest:</span>
                        <span className="font-semibold">₹750</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-1">
                        <span>Total after 1 year:</span>
                        <span className="font-semibold">₹59,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total after 5 years:</span>
                        <span className="font-semibold text-red-600">₹114,700</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="bg-white rounded-xl shadow-md p-8 mb-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Credit Card Tips from Financial Experts
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Follow these simple tips to use credit cards wisely and avoid debt traps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {creditCardTips.map((person, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden bg-blue-50 border-blue-200 hover:shadow-lg transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredPerson(index)}
                  onMouseLeave={() => setHoveredPerson(null)}
                >
                  <div className="p-4 text-center">
                    <div className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                      {hoveredPerson === index ? (
                        <div className="w-full h-full">
                          <Lottie animationData={person.animation} loop={true} />
                        </div>
                      ) : (
                        <person.icon className="h-12 w-12 text-white" />
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-lg text-blue-800 mt-10 mb-1">{person.name} says:</h3>
                    <p className="text-gray-700 font-medium">{person.tip}</p>
                    
                    <div className={`mt-4 text-sm text-gray-600 transition-all duration-300 ${
                      hoveredPerson === index ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
                    }`}>
                      {person.description}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 bg-blue-600 rounded-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <CalendarClock className="h-8 w-8 mr-3" />
                <h3 className="text-xl font-semibold">Golden Rule of Credit Cards</h3>
              </div>
              <p className="text-lg">
                If you can't afford to pay for it in cash today, you probably shouldn't charge it to your credit card.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}