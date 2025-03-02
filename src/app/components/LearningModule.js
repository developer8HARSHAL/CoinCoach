"use client";
import React, { useState } from "react";
import SavingsModule from "./LearningModulesComponents/savingsModule";
import BudgetingModule from "./LearningModulesComponents/budgetting";
import InvestmentBasics from "./inverstment/investmentbasics";

export default function LearningModule() {
  // State to manage which component to display
  const [currentModule, setCurrentModule] = useState("savings");

  // Function to handle the "Next" button click
  const handleNext = () => {
    if (currentModule === "savings") {
      setCurrentModule("budgetting");
    } else if (currentModule === "budgetting") {
      setCurrentModule("investment");
    } else {
      setCurrentModule("savings"); // Loop back to the first module
    }
  };

  // Function to get the button text based on the current module
  const getButtonText = () => {
    if (currentModule === "savings") {
      return "Next: Budgeting Module →";
    } else if (currentModule === "budgetting") {
      return "Next: Investment Module →";
    } else {
      return "Back to Savings Module";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-200 flex items-center justify-center py-16">
      <main className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20">
        {/* Render the current module based on state */}
        {currentModule === "savings" && <SavingsModule />}
        {currentModule === "budgetting" && <BudgetingModule />}
        {currentModule === "investment" && <InvestmentBasics />}

        {/* Next Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            {getButtonText()}
          </button>
        </div>
      </main>
    </div>
  );
}