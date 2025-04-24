"use client";

import { useState } from "react";
import TaxModule1 from "./Above18/taxation/TaxModule1";
import TaxModule2 from "./Above18/taxation/TaxModule2";
import TaxModule3 from "./Above18/taxation/TaxModule3";
import TaxModule4 from "./Above18/taxation/TaxModule4";

export default function TaxJourney() {
  const [currentModule, setCurrentModule] = useState("Module1");

  const handleNext = () => {
    if (currentModule === "Module1") {
      setCurrentModule("Module2");
    } else if (currentModule === "Module2") {
      setCurrentModule("Module3");
    } else if (currentModule === "Module3") {
      setCurrentModule("Module4");
    } else {
      setCurrentModule("Module1");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full text-white">
      {/* Full Width Module Display */}
      <div className="w-full">
        {currentModule === "Module1" && <TaxModule1 />}
        {currentModule === "Module2" && <TaxModule2 />}
        {currentModule === "Module3" && <TaxModule3 />}
        {currentModule === "Module4" && <TaxModule4 />}
      </div>

      {/* Navigation Button */}
      <div className="w-full text-center mt-10 mb-20">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-amber-500 text-white font-bold text-lg rounded-lg hover:bg-amber-600 transition-all"
        >
          {currentModule === "Module1"
            ? "Next: Understanding Tax Slabs →"
            : currentModule === "Module2"
            ? "Next: Deductions Explained →"
            : currentModule === "Module3"
            ? "Next: Tax Regime Options →"
            : "Back to Module 1"}
        </button>
      </div>
    </div>
  );
}
