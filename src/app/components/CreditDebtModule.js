"use client";

import { useState } from "react";
import CreditDebt from "./";
import CreditDebt2 from "./adultcourses/credit_debt_management/CreditDebt2page";

import CreditDebitCrossword from "./Above18/credit_debt_management/CreditDebitCrossword";

export default function CreditDebtModule() {
  const [currentModule, setCurrentModule] = useState("CreditDebt");

  const handleNext = () => {
    if (currentModule === "CreditDebt") {
      setCurrentModule("CreditDebt2");
    } else if (currentModule === "CreditDebt2") {
      setCurrentModule("CreditDebtCrossword");
    } else {
      setCurrentModule("CreditDebt"); // Loop back to first module
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <main className="max-w-[100rem] w-screen mx-auto px-8 sm:px-12 lg:px-20">
        {/* Render the current module */}
        {currentModule === "CreditDebt" && <CreditDebt />}
        {currentModule === "CreditDebt2" && <CreditDebt2 />}
        {currentModule === "CreditDebtCrossword" && <CreditDebitCrossword/>}

        {/* Next Module Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-yellow-500 text-black font-bold text-lg rounded-lg hover:bg-yellow-600 transition-all"
          >
            {currentModule === "CreditDebt" ? "Next: Module 2 →" :
             currentModule === "CreditDebt2" ? "Next: Solve the Crossword →" :
             "Back to Module 1"}
          </button>
        </div>
      </main>
    </div>
  );
}
