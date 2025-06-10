"use client";
import React, { useState } from 'react';
import { 
  ShieldCheck,
  Wallet,
  FileText,
  HandCoins,
  CircleDollarSign,
  Hourglass,
  Clock,
  BarChart4
} from 'lucide-react';
import Lottie from "lottie-react";
import DebtHigh from "../../../lotties/person1.json";
import DebtSmall from "../../../lotties/person2.json";

export default function CreditDebt() {
    const [hoveredMethod, setHoveredMethod] = useState(null);
    const [activeTab, setActiveTab] = useState("credit");
    
    return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg shadow-sm bg-white">
            <button
              onClick={() => setActiveTab("credit")}
              className={`px-8 py-3 text-base font-medium rounded-l-lg transition-all ${
                activeTab === "credit" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              Credit Scores
            </button>
            <button
              onClick={() => setActiveTab("debt")}
              className={`px-8 py-3 text-base font-medium rounded-r-lg transition-all ${
                activeTab === "debt" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              Debt Management
            </button>
          </div>
        </div>

        {activeTab === "credit" ? (
          <>
            {/* Section 1: Understanding Credit Score - Simplified */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-blue-100 p-2 rounded-lg mb-2">
                    <CircleDollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    What is a Credit Score?
                  </h2>
                  <p className="text-gray-600 mb-4 text-lg">
                    Think of a credit score as your financial report card (300-850 points).
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <span className="text-blue-600 text-sm font-medium">✓</span>
                      </div>
                      <p className="text-gray-600">Higher score = better loan terms and lower interest rates</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <span className="text-blue-600 text-sm font-medium">✓</span>
                      </div>
                      <p className="text-gray-600">Banks and lenders use it to decide if they should lend you money</p>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <div className="bg-blue-600 rounded-full w-48 h-48 flex items-center justify-center relative shadow-lg">
                    <ShieldCheck className="h-24 w-24 text-white" />
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md">
                      <div className="text-blue-600 font-bold">750+</div>
                      <div className="text-xs text-gray-500">Excellent</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Credit Score Factors - Visual Cards */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What Affects Your Credit Score?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Payment History */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="bg-blue-600 p-4 flex justify-center">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">Payment History</h3>
                  <p className="text-gray-600">Pay your bills on time! Late payments hurt your score the most.</p>
                  <div className="mt-3 text-sm font-medium text-blue-600">35% Impact</div>
                </div>
              </div>
              
              {/* Credit Utilization */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="bg-blue-600 p-4 flex justify-center">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">Credit Utilization</h3>
                  <p className="text-gray-600">Keep your credit card balances below 30% of your limit.</p>
                  <div className="mt-3 text-sm font-medium text-blue-600">30% Impact</div>
                </div>
              </div>
              
              {/* Credit History Length */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="bg-blue-600 p-4 flex justify-center">
                  <Hourglass className="h-8 w-8 text-white" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">Credit Age</h3>
                  <p className="text-gray-600">Longer credit history helps. Keep old accounts open if possible.</p>
                  <div className="mt-3 text-sm font-medium text-blue-600">15% Impact</div>
                </div>
              </div>
              
              {/* Credit Mix */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="bg-blue-600 p-4 flex justify-center">
                  <BarChart4 className="h-8 w-8 text-white" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">Credit Mix</h3>
                  <p className="text-gray-600">Having different types of loans (credit cards, auto loan) can help.</p>
                  <div className="mt-3 text-sm font-medium text-blue-600">10% Impact</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Debt Management Section */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-blue-100 p-2 rounded-lg mb-2">
                    <HandCoins className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Smart Ways to Pay Off Debt
                  </h2>
                  <p className="text-gray-600 mb-4">
                    There are two popular methods to tackle multiple debts. Choose the one that works best for you!
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="bg-blue-600 rounded-full w-48 h-48 flex items-center justify-center relative shadow-lg">
                    <HandCoins className="h-24 w-24 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Debt Repayment Methods - Simplified and Visual */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Avalanche Method */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="h-48 flex justify-center items-center mb-4">
                    <Lottie animationData={DebtHigh} style={{ height: 150 }} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Avalanche Method</h3>
                  <p className="text-gray-600 mb-4">
                    Pay minimum on all debts, but put extra money toward the <span className="font-bold">highest interest rate</span> debt first.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm">✓ Saves the most money in interest</p>
                    <p className="text-sm">✓ Mathematically efficient</p>
                  </div>
                </div>
              </div>
              
              {/* Snowball Method */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="h-48 flex justify-center items-center mb-4">
                    <Lottie animationData={DebtSmall} style={{ height: 150 }} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Snowball Method</h3>
                  <p className="text-gray-600 mb-4">
                    Pay minimum on all debts, but put extra money toward the <span className="font-bold">smallest balance</span> debt first.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm">✓ Quick wins keep you motivated</p>
                    <p className="text-sm">✓ Psychologically rewarding</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Example */}
            <div className="bg-blue-600 rounded-xl shadow-md p-8 text-white">
              <h3 className="text-xl font-bold mb-4 text-center">Example: How Each Method Works</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-2">You have 3 debts:</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <div className="w-4 h-4 mr-2 rounded-full bg-red-400"></div>
                      <span>₹50,000 (18% interest)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 mr-2 rounded-full bg-yellow-400"></div>
                      <span>₹30,000 (12% interest)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 mr-2 rounded-full bg-green-400"></div>
                      <span>₹20,000 (6% interest)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-gray-800">
                      <h4 className="font-bold text-blue-800 mb-2">Avalanche Order:</h4>
                      <ol className="list-decimal ml-5 space-y-1">
                        <li>₹50,000 (18%)</li>
                        <li>₹30,000 (12%)</li>
                        <li>₹20,000 (6%)</li>
                      </ol>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 text-gray-800">
                      <h4 className="font-bold text-blue-800 mb-2">Snowball Order:</h4>
                      <ol className="list-decimal ml-5 space-y-1">
                        <li>₹20,000 (6%)</li>
                        <li>₹30,000 (12%)</li>
                        <li>₹50,000 (18%)</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}