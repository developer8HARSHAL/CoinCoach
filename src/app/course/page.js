"use client";


import TimeValueOfMoneyTheory from "../components/youngCourses/belowEighteen";
import ModuleProgressWrapper from "../components/ModuleProgressWrapper";
import { useState } from "react";

export default function Course() {
  const moduleList = [
    "timeValueOfMoney",
    "inflation",
    "interests",
    "upiPayment",
    "bankStatementt",
    "opportunityCost",
    "taxesbasics",
    "mutualbasics",
  ];

  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const goToNextModule = () => {
   
    if (currentModuleIndex < moduleList.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Choose the right module component dynamically
  const CurrentModule = () => {
    const current = moduleList[currentModuleIndex];
    if (current === "timeValueOfMoney") {
      return <TimeValueOfMoneyTheory />;
    }
    return <div>Coming Soon: {current}</div>; // Placeholder
  };

  return (
    <ModuleProgressWrapper
      moduleCategory="below-eighteen"
      moduleName="Below Eighteen Learning Path"
      currentModuleIndex={currentModuleIndex + 1}
      totalModules={moduleList.length}
      onNext={goToNextModule}
    >
      <CurrentModule />
    </ModuleProgressWrapper>
  );
}
