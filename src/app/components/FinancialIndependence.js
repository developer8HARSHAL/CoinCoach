"use client";

import { useState } from "react";
import FinancialIndependenceModule1 from "./Above18/financial_independence/FinancialIndependenceModule1";
import FinancialIndependenceModule2 from "./Above18/financial_independence/FinancialIndependenceModule2";
import FinancialIndependenceAssessment from "./Above18/financial_independence/FinancialIndependenceAssessment";

export default function FinancialIndependence() {
  const [currentModule, setCurrentModule] = useState("Module1");

  const handleNext = () => {
    if (currentModule === "Module1") {
      setCurrentModule("Module2");
    } else if (currentModule === "Module2") {
      setCurrentModule("Assessment");
    } else {
      setCurrentModule("Module1"); // Restart
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex w-[100%] items-center justify-center">
      <main className="max-w-[100rem] w-screen px-8">
        {/* Module Renderer */}
        {currentModule === "Module1" && <FinancialIndependenceModule1 />}
        {currentModule === "Module2" && <FinancialIndependenceModule2 />}
        {currentModule === "Assessment" && <FinancialIndependenceAssessment/>}

        {/* Navigation Button */}
        <div className="text-center mt-20 mb-10">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-amber-500 text-white font-bold text-lg rounded-lg hover:bg-amber-600 transition-all"
          >
            {currentModule === "Module1"
              ? "Next: Roadmap to Independence →"
              : currentModule === "Module2"
              ? "Next: Test Your Knowledge →"
              : "Back to Module 1"}
          </button>
        </div>
      </main>
    </div>
  );
}
