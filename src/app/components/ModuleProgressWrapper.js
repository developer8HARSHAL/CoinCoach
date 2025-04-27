// In ModuleProgressWrapper.js - Add this import at the top
import { useState } from "react";
import { useAuth } from "./auth/AuthContext"; // Adjust the path if needed
import { FaArrowRight, FaCheckCircle, FaTrophy } from "react-icons/fa";
import TimeValueOfMoneyModule from "../components/youngCourses/belowEighteen";
import InflationImpactModule from "../components/youngCourses/inflation";
import InterestsModule from "../components/youngCourses/interests";
import UpiPaymentModule from "../components/youngCourses/upiPayment";
import BankStatementModule from "../components/youngCourses/bankStatementt";
import OpportunityCostModule from "../components/youngCourses/opportunityCost";
import TaxesBasicsModule from "../components/youngCourses/taxesbasics";
import MutualBasicsModule from "../components/youngCourses/mutualbasics";

export default function ModuleProgressWrapper({ 
  children, 
  moduleCategory, 
  moduleName, 
  currentModuleIndex, 
  totalModules, 
  onNext 
}) {
  const { user } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  //  const modules = [
  //         { id: "timeValueOfMoney", component: TimeValueOfMoneyModule },
  //         { id: "inflation", component: InflationImpactModule },
  //         { id: "interests", component: InterestsModule },
  //         { id: "upiPayment", component: UpiPaymentModule },
  //         { id: "bankStatement", component: BankStatementModule },
  //         { id: "opportunityCost", component: OpportunityCostModule },
  //         { id: "taxesBasics", component: TaxesBasicsModule },
  //         { id: "mutualBasics", component: MutualBasicsModule }
  //     ];
    const handleNext = async () => {
      if (!user) return;
      
      const payload = {
        uid: user.uid,
        moduleCategory,  // Ensure this is the correct identifier
        moduleId: modules[currentModuleIndex].id,  // Use moduleId from modules array
        progress: currentModuleIndex,
      };
  
      console.log("📤 Sending progress data:", payload);
  
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          setShowNotification(true);
  
          if (currentModuleIndex === totalModules) {
            setShowCompletionMessage(true);
          } else {
            if (onNext) onNext();
          }
  
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        } else {
          console.error("❌ Failed to save progress:", await response.text());
        }
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    };
  
    return (
      <div className="module-wrapper">
        {children}
  
        <div className="flex justify-center mt-8">
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
          >
            {currentModuleIndex === totalModules ? 'Complete Course' : 'Save & Continue'}
            <FaArrowRight />
          </button>
        </div>
  
        {showNotification && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-fade-in-up">
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>Progress saved successfully!</p>
            </div>
          </div>
        )}
  
        {showCompletionMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4 animate-scale-in">
              <div className="text-center">
                <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                  <FaTrophy className="text-4xl text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
                <p className="text-gray-600 mb-6">
                  You've completed the entire course! Your progress has been saved.
                </p>
                <button
                  onClick={() => setShowCompletionMessage(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  