"use client";
import React, { useState } from "react";
import { Wallet, TrendingUp, PieChart, List, ArrowRight } from "lucide-react";

export default function BudgetingModule() {
  // State to track which section is expanded
  const [expandedSection, setExpandedSection] = useState(null);

  // Function to toggle section visibility
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center py-16">
      <main className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg">
            💸 Budgeting Basics
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Learn how to create a budget, manage income vs. expenses, and track your spending effectively! 🚀
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1: Creating a Budget */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSection("budget")}>
              <Wallet className="h-10 w-10 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Creating a Budget</h2>
              <ArrowRight
                className={`h-6 w-6 ml-auto transform transition-transform ${
                  expandedSection === "budget" ? "rotate-90" : ""
                }`}
              />
            </div>
            {expandedSection === "budget" && (
              <div className="mt-6 text-gray-700">
                <p>
                  A budget is a plan for how you will spend your money. It helps you prioritize your expenses, save for
                  goals, and avoid overspending. Here's how to create one:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>List all sources of income.</li>
                  <li>Track your monthly expenses.</li>
                  <li>Categorize expenses (e.g., needs, wants, savings).</li>
                  <li>Adjust spending to align with your financial goals.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Section 2: Income vs. Expenses */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSection("incomeExpenses")}>
              <TrendingUp className="h-10 w-10 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Income vs. Expenses</h2>
              <ArrowRight
                className={`h-6 w-6 ml-auto transform transition-transform ${
                  expandedSection === "incomeExpenses" ? "rotate-90" : ""
                }`}
              />
            </div>
            {expandedSection === "incomeExpenses" && (
              <div className="mt-6 text-gray-700">
                <p>
                  Understanding the difference between income and expenses is key to managing your finances. Income is
                  the money you earn, while expenses are the money you spend.
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Income: Salary, bonuses, freelance work, etc.</li>
                  <li>Expenses: Rent, groceries, utilities, entertainment, etc.</li>
                  <li>Always aim to spend less than you earn.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Section 3: The 50/30/20 Rule */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSection("rule502030")}>
              <PieChart className="h-10 w-10 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">The 50/30/20 Rule</h2>
              <ArrowRight
                className={`h-6 w-6 ml-auto transform transition-transform ${
                  expandedSection === "rule502030" ? "rotate-90" : ""
                }`}
              />
            </div>
            {expandedSection === "rule502030" && (
              <div className="mt-6 text-gray-700">
                <p>
                  The 50/30/20 rule is a simple budgeting framework:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li><strong>50% Needs:</strong> Essential expenses like rent, utilities, and groceries.</li>
                  <li><strong>30% Wants:</strong> Non-essential expenses like dining out, entertainment, and hobbies.</li>
                  <li><strong>20% Savings:</strong> Savings, investments, and debt repayment.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Section 4: Tracking Expenses Efficiently */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSection("trackingExpenses")}>
              <List className="h-10 w-10 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Tracking Expenses Efficiently</h2>
              <ArrowRight
                className={`h-6 w-6 ml-auto transform transition-transform ${
                  expandedSection === "trackingExpenses" ? "rotate-90" : ""
                }`}
              />
            </div>
            {expandedSection === "trackingExpenses" && (
              <div className="mt-6 text-gray-700">
                <p>
                  Tracking your expenses helps you understand where your money is going and identify areas to cut back.
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Use budgeting apps or spreadsheets.</li>
                  <li>Review your bank statements regularly.</li>
                  <li>Set spending limits for each category.</li>
                  <li>Avoid impulse purchases.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}