"use client";

import { useState } from "react";

import FinancialIndependenceModule1 from "./Above18/financial_independence/FinancialIndependenceModule1";
import FinancialIndependenceModule2 from "./Above18/financial_independence/FinancialIndependenceModule2";
import FinancialIndependenceAssessment from "./Above18/financial_independence/FinancialIndependenceAssessment";

export default function wealthbuilding() {
  const [currentModule, setCurrentModule] = useState("Module1");

  const handleNext = () => {
    if (currentModule === "Module1") {
      setCurrentModule("Module2");
    } else if (currentModule === "Module2") {
      setCurrentModule("Module3");
    } else {
      setCurrentModule("Module1");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full text-white">
      {/* Full Width Module Display */}
      <div className="w-full">
        {currentModule === "Module1" && <FinancialIndependenceModule1 />}
        {currentModule === "Module2" && <FinancialIndependenceModule2 />}
        {currentModule === "Module3" && <FinancialIndependenceAssessment />}

      </div>

      {/* Navigation Button */}
      <div className="w-full text-center mt-10 mb-20">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-amber-500 text-white font-bold text-lg rounded-lg hover:bg-amber-600 transition-all"
        >
          {currentModule === "Module1"
            ? "Next →"
            : currentModule === "Module2"
            ? "Next →"
            : currentModule === "Module3"
            ? "Next →"
            : "Back to Module 1"}
        </button>
      </div>
    </div>
  );
}
