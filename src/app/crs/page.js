"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ModuleProgressWrapper from "../components/ModuleProgressWrapper";
import { useAuth } from "../components/auth/AuthContext";

// Import all modules
import TimeValueOfMoneyModule from "../components/youngCourses/belowEighteen";
import InflationImpactModule from "../components/youngCourses/inflation";
import InterestsModule from "../components/youngCourses/interests";
import UpiPaymentModule from "../components/youngCourses/upiPayment";
import BankStatementModule from "../components/youngCourses/bankStatementt";
import OpportunityCostModule from "../components/youngCourses/opportunityCost";
import TaxesBasicsModule from "../components/youngCourses/taxesbasics";
import MutualBasicsModule from "../components/youngCourses/mutualbasics";

export default function Course() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [progressData, setProgressData] = useState(null);
    
    // Define the modules in your course
    const modules = [
        { id: "timeValueOfMoney", component: TimeValueOfMoneyModule },
        { id: "inflation", component: InflationImpactModule },
        { id: "interests", component: InterestsModule },
        { id: "upiPayment", component: UpiPaymentModule },
        { id: "bankStatement", component: BankStatementModule },
        { id: "opportunityCost", component: OpportunityCostModule },
        { id: "taxesBasics", component: TaxesBasicsModule },
        { id: "mutualBasics", component: MutualBasicsModule }
    ];
    
    // Fetch user's progress when component mounts
    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        fetchProgress();
    }, [user]);

    const fetchProgress = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/progress?uid=${user.uid}`);
            
            if (response.ok) {
                const data = await response.json();
                setProgressData(data);
                
                // If user has progress for this module category, set it
                if (data.modules && data.modules['below-eighteen']) {
                    // Set to the last completed module or the next incomplete one
                    const completedSections = data.modules['below-eighteen'].completedSections;
                    const nextModule = Math.min(completedSections, modules.length - 1);
                    setCurrentModuleIndex(nextModule);
                }
            }
        } catch (error) {
            console.error("Error fetching progress:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to save progress
    const saveProgress = async (moduleIndex) => {
        if (!user) return;
        
        try {
            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    moduleCategory: 'below-eighteen',
                    completedSections: moduleIndex + 1, // +1 because module index is 0-based
                }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to save progress');
            }
            
            return await response.json();
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };
    
    // Function to move to next module or redirect if completed
    const goToNextModule = async () => {
        // Save current progress
        await saveProgress(currentModuleIndex);
        
        if (currentModuleIndex < modules.length - 1) {
            // Move to next module
            setCurrentModuleIndex(prevIndex => prevIndex + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // This was the last module - course is complete
            // Save final progress and redirect to homepage
            await saveProgress(modules.length - 1);
            router.push('/'); // Redirect to homepage
        }
    };
    
    // Get current module component
    const CurrentModule = modules[currentModuleIndex].component;
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3">Loading your progress...</p>
            </div>
        );
    }
    
    return (
        <div className="course-container">
            {/* Progress indicator */}
            <div className="bg-gray-100 p-4 mb-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Course Progress</h3>
                    <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
                        Module {currentModuleIndex + 1} of {modules.length}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${((currentModuleIndex + 1) / modules.length) * 100}%` }}
                    ></div>
                </div>
            </div>
            
            <ModuleProgressWrapper
                moduleCategory="below-eighteen"
                moduleName="Below Eighteen Learning Path"
                currentModuleIndex={currentModuleIndex + 1}
                totalModules={modules.length}
                onNext={goToNextModule}
                modules={modules}
                isLastModule={currentModuleIndex === modules.length - 1}
            >
                <CurrentModule />
            </ModuleProgressWrapper>
        </div>
    );
}