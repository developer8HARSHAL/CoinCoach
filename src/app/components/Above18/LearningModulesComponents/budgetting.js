"use client";
import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, PieChart, ChevronRight, Check, Bookmark, Book, DollarSign, List, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BudgetingModule() {
  const [completedSections, setCompletedSections] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("intro");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);
  const MODULE_ID = "budgeting-basics";
  const MODULE_NAME = "Budgeting Basics";
  const TOTAL_SECTIONS = 4;
  const USER_ID = "user123";

  const sections = [
    { id: "intro", title: "Creating a Budget", icon: <Wallet className="h-5 w-5" /> },
    { id: "income", title: "Income vs. Expenses", icon: <TrendingUp className="h-5 w-5" /> },
    { id: "expenses", title: "The 50/30/20 Rule", icon: <PieChart className="h-5 w-5" /> },
    { id: "goals", title: "Tracking Expenses Efficiently", icon: <List className="h-5 w-5" /> }
  ];

  // Function to toggle section visibility
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    setIsLoading(true);
    setCompletedSections([]);
    
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/progress?uid=${USER_ID}`);
        const data = await response.json();
        if (response.ok && data.modules?.[MODULE_ID]) {
          setCompletedSections(Array.isArray(data.modules[MODULE_ID].completedSections) ? data.modules[MODULE_ID].completedSections : []);
          setProgress(data.modules[MODULE_ID].progress || 0);
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (typeof window !== 'undefined') {
      fetchProgress();
    }
  }, []);

  const markSectionCompleted = async (section) => {
    if (!Array.isArray(completedSections)) return;
    if (completedSections.includes(section)) return;
    
    const updatedSections = [...completedSections, section];
    setCompletedSections(updatedSections);
    const updatedProgress = (updatedSections.length / TOTAL_SECTIONS) * 100;
    setProgress(updatedProgress);

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: USER_ID,
          moduleId: MODULE_ID,
          moduleName: MODULE_NAME,
          completedSections: updatedSections,
          totalSections: TOTAL_SECTIONS,
          progress: updatedProgress
        }),
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <Card className="shadow-xl bg-white rounded-xl overflow-hidden border-0 mb-12">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-extrabold">💸 Budgeting Basics</CardTitle>
                <p className="text-blue-100 mt-2">Master your finances with these essential budgeting skills</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <PieChart className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="mt-6">
              <Progress value={progress} className="h-4 bg-blue-800 bg-opacity-40 rounded-full" />
              <p className="text-blue-100 mt-2 font-medium">
                {completedSections.length}/{TOTAL_SECTIONS} sections completed ({progress.toFixed(0)}%)
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1: Creating a Budget */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSection("budget")}>
              <Wallet className="h-10 w-10 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Creating a Budget</h2>
              <div className="ml-auto flex items-center">
                {completedSections.includes("intro") && (
                  <span className="mr-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </span>
                )}
                <ArrowRight
                  className={`h-6 w-6 transform transition-transform ${
                    expandedSection === "budget" ? "rotate-90" : ""
                  }`}
                />
              </div>
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
                {!completedSections.includes("intro") && (
                  <Button 
                    className="mt-6 bg-blue-600 hover:bg-blue-700" 
                    onClick={(e) => {
                      e.stopPropagation();
                      markSectionCompleted("intro");
                    }}
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Income vs. Expenses */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSection("incomeExpenses")}>
              <TrendingUp className="h-10 w-10 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Income vs. Expenses</h2>
              <div className="ml-auto flex items-center">
                {completedSections.includes("income") && (
                  <span className="mr-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </span>
                )}
                <ArrowRight
                  className={`h-6 w-6 transform transition-transform ${
                    expandedSection === "incomeExpenses" ? "rotate-90" : ""
                  }`}
                />
              </div>
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
                {!completedSections.includes("income") && (
                  <Button 
                    className="mt-6 bg-blue-600 hover:bg-blue-700" 
                    onClick={(e) => {
                      e.stopPropagation();
                      markSectionCompleted("income");
                    }}
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Section 3: The 50/30/20 Rule */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSection("rule502030")}>
              <PieChart className="h-10 w-10 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">The 50/30/20 Rule</h2>
              <div className="ml-auto flex items-center">
                {completedSections.includes("expenses") && (
                  <span className="mr-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </span>
                )}
                <ArrowRight
                  className={`h-6 w-6 transform transition-transform ${
                    expandedSection === "rule502030" ? "rotate-90" : ""
                  }`}
                />
              </div>
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
                {!completedSections.includes("expenses") && (
                  <Button 
                    className="mt-6 bg-blue-600 hover:bg-blue-700" 
                    onClick={(e) => {
                      e.stopPropagation();
                      markSectionCompleted("expenses");
                    }}
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Section 4: Tracking Expenses Efficiently */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl p-8 rounded-3xl border border-gray-300">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSection("trackingExpenses")}>
              <List className="h-10 w-10 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Tracking Expenses Efficiently</h2>
              <div className="ml-auto flex items-center">
                {completedSections.includes("goals") && (
                  <span className="mr-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </span>
                )}
                <ArrowRight
                  className={`h-6 w-6 transform transition-transform ${
                    expandedSection === "trackingExpenses" ? "rotate-90" : ""
                  }`}
                />
              </div>
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
                {!completedSections.includes("goals") && (
                  <Button 
                    className="mt-6 bg-blue-600 hover:bg-blue-700" 
                    onClick={(e) => {
                      e.stopPropagation();
                      markSectionCompleted("goals");
                    }}
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}