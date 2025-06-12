"use client";
import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  TrendingUp, 
  PieChart, 
  ChevronRight, 
  Check, 
  List, 
  ArrowRight, 
  Calculator,
  Target,
  CreditCard,
  Smartphone,
  BookOpen,
  Award,
  Clock,
  DollarSign,
  BarChart3,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnhancedBudgetingModule() {
  const [completedSections, setCompletedSections] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const MODULE_ID = "budgeting-basics";
  const MODULE_NAME = "Budgeting Basics";
  const TOTAL_SECTIONS = 4;
  const USER_ID = "user123";

  const sections = [
    { 
      id: "intro", 
      title: "Creating Your First Budget", 
      icon: <Wallet className="h-6 w-6" />,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    { 
      id: "income", 
      title: "Income vs. Expenses", 
      icon: <TrendingUp className="h-6 w-6" />,
      color: "green",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    { 
      id: "expenses", 
      title: "The 50/30/20 Rule", 
      icon: <PieChart className="h-6 w-6" />,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    { 
      id: "goals", 
      title: "Smart Expense Tracking", 
      icon: <BarChart3 className="h-6 w-6" />,
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  const budgetingTips = [
    { icon: <Calculator className="h-5 w-5" />, text: "Use the envelope method for cash expenses" },
    { icon: <Smartphone className="h-5 w-5" />, text: "Track expenses with mobile apps" },
    { icon: <Target className="h-5 w-5" />, text: "Set specific, measurable financial goals" },
    { icon: <Clock className="h-5 w-5" />, text: "Review your budget monthly" }
  ];

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  // Function to toggle section visibility
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    setIsLoading(true);
    setCompletedSections([]);
    
    const fetchProgress = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data for demo
        const mockCompletedSections = [];
        setCompletedSections(mockCompletedSections);
        setProgress((mockCompletedSections.length / TOTAL_SECTIONS) * 100);
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProgress();
  }, []);

  const markSectionCompleted = async (section) => {
    if (!Array.isArray(completedSections)) return;
    if (completedSections.includes(section)) return;
    
    const updatedSections = [...completedSections, section];
    setCompletedSections(updatedSections);
    const updatedProgress = (updatedSections.length / TOTAL_SECTIONS) * 100;
    setProgress(updatedProgress);

    try {
      // Simulate API call
      console.log("Progress updated:", {
        uid: USER_ID,
        moduleId: MODULE_ID,
        moduleName: MODULE_NAME,
        completedSections: updatedSections,
        totalSections: TOTAL_SECTIONS,
        progress: updatedProgress
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const getSectionContent = (sectionId) => {
    switch(sectionId) {
      case "intro":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                What is a Budget?
              </h4>
              <p className="text-blue-800 leading-relaxed">
                A budget is your financial roadmap - a plan that helps you take control of your money by tracking income and expenses. 
                It's not about restricting yourself, but about making intentional choices with your money.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h5 className="font-semibold text-gray-900 mb-3">Step 1: Calculate Your Income</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Salary after taxes
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Side hustle earnings
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Investment returns
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <h5 className="font-semibold text-gray-900 mb-3">Step 2: Track Your Expenses</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Fixed costs (rent, insurance)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Variable expenses (groceries, gas)
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Discretionary spending
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
              <h5 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Pro Tip
              </h5>
              <p className="text-yellow-800 text-sm">
                Start with a simple budget and refine it over time. The best budget is one you'll actually use!
              </p>
            </div>
          </div>
        );
        
      case "income":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-3">The Foundation of Financial Health</h4>
              <p className="text-green-800 leading-relaxed">
                The golden rule of personal finance: spend less than you earn. Understanding this balance is crucial for building wealth and avoiding debt.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Income Sources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-sm text-green-700">Primary Job</span>
                    <span className="font-semibold text-green-800">$4,500</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-sm text-green-700">Freelance Work</span>
                    <span className="font-semibold text-green-800">$800</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-sm text-green-700">Investments</span>
                    <span className="font-semibold text-green-800">$200</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 font-bold text-green-900">
                    <span>Total Monthly Income</span>
                    <span>$5,500</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Monthly Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-red-200">
                    <span className="text-sm text-red-700">Housing</span>
                    <span className="font-semibold text-red-800">$1,800</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-red-200">
                    <span className="text-sm text-red-700">Food & Groceries</span>
                    <span className="font-semibold text-red-800">$600</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-red-200">
                    <span className="text-sm text-red-700">Transportation</span>
                    <span className="font-semibold text-red-800">$400</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-red-200">
                    <span className="text-sm text-red-700">Other Expenses</span>
                    <span className="font-semibold text-red-800">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 font-bold text-red-900">
                    <span>Total Monthly Expenses</span>
                    <span>$4,000</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h5 className="font-semibold text-blue-900 mb-2">Monthly Surplus: $1,500</h5>
              <p className="text-blue-800 text-sm">
                This surplus can be allocated towards savings, investments, debt repayment, or building an emergency fund.
              </p>
            </div>
          </div>
        );
        
      case "expenses":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-3">The 50/30/20 Budgeting Framework</h4>
              <p className="text-purple-800 leading-relaxed">
                This simple yet powerful rule helps you allocate your after-tax income across three essential categories, 
                ensuring a balanced approach to spending and saving.
              </p>
            </div>
            
            <div className="grid gap-4">
              <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-bold text-blue-900 text-lg">50% - Needs</h5>
                    <div className="bg-blue-100 px-3 py-1 rounded-full">
                      <span className="text-blue-800 font-semibold">$2,750</span>
                    </div>
                  </div>
                  <p className="text-blue-800 mb-3">Essential expenses you can't avoid:</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-700">Rent/Mortgage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-700">Utilities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-700">Groceries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-700">Insurance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-700">Transportation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-700">Minimum debt payments</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-bold text-green-900 text-lg">30% - Wants</h5>
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-green-800 font-semibold">$1,650</span>
                    </div>
                  </div>
                  <p className="text-green-800 mb-3">Lifestyle choices and entertainment:</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Dining out</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Entertainment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Hobbies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Shopping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Subscriptions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-green-700">Travel</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-purple-500 bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-bold text-purple-900 text-lg">20% - Savings & Debt</h5>
                    <div className="bg-purple-100 px-3 py-1 rounded-full">
                      <span className="text-purple-800 font-semibold">$1,100</span>
                    </div>
                  </div>
                  <p className="text-purple-800 mb-3">Building your financial future:</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      <span className="text-purple-700">Emergency fund</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      <span className="text-purple-700">Retirement savings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      <span className="text-purple-700">Investments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      <span className="text-purple-700">Extra debt payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      <span className="text-purple-700">Goal savings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-purple-600" />
                      <span className="text-purple-700">Investment accounts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case "goals":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-3">Master Your Money Flow</h4>
              <p className="text-orange-800 leading-relaxed">
                Effective expense tracking transforms your financial awareness, helping you make informed decisions and identify opportunities for optimization.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-orange-600" />
                  Digital Tracking Methods
                </h5>
                <div className="space-y-3">
                  <Card className="p-4 border-orange-200 bg-orange-50">
                    <h6 className="font-medium text-orange-900 mb-2">Mobile Apps</h6>
                    <p className="text-sm text-orange-800 mb-3">YNAB, Mint, PocketGuard for real-time tracking</p>
                    <div className="flex items-center gap-2 text-sm text-orange-700">
                      <Check className="h-4 w-4" />
                      Automatic categorization
                    </div>
                  </Card>
                  
                  <Card className="p-4 border-blue-200 bg-blue-50">
                    <h6 className="font-medium text-blue-900 mb-2">Bank Integration</h6>
                    <p className="text-sm text-blue-800 mb-3">Connect accounts for automated tracking</p>
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <Check className="h-4 w-4" />
                      Real-time balance updates
                    </div>
                  </Card>
                  
                  <Card className="p-4 border-green-200 bg-green-50">
                    <h6 className="font-medium text-green-900 mb-2">Spreadsheet Method</h6>
                    <p className="text-sm text-green-800 mb-3">Custom Excel or Google Sheets templates</p>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <Check className="h-4 w-4" />
                      Full customization control
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Smart Tracking Tips
                </h5>
                <div className="space-y-4">
                  {[
                    { title: "Set Weekly Reviews", desc: "Check your spending every week to stay on track", icon: <Clock className="h-5 w-5" /> },
                    { title: "Use Categories", desc: "Group expenses into meaningful categories", icon: <List className="h-5 w-5" /> },
                    { title: "Track Everything", desc: "Record even small purchases - they add up!", icon: <DollarSign className="h-5 w-5" /> },
                    { title: "Set Alerts", desc: "Get notified when approaching category limits", icon: <Award className="h-5 w-5" /> }
                  ].map((tip, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                        {tip.icon}
                      </div>
                      <div>
                        <h6 className="font-medium text-gray-900 mb-1">{tip.title}</h6>
                        <p className="text-sm text-gray-600">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
              <h5 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                The Envelope Method (Digital Version)
              </h5>
              <p className="text-indigo-800 mb-4">
                Allocate specific amounts to different spending categories, just like putting cash in envelopes.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-indigo-200">
                  <div className="text-sm font-medium text-indigo-900">Groceries</div>
                  <div className="text-lg font-bold text-indigo-700">$600</div>
                  <div className="text-xs text-indigo-600">$180 remaining</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-indigo-200">
                  <div className="text-sm font-medium text-indigo-900">Entertainment</div>
                  <div className="text-lg font-bold text-indigo-700">$300</div>
                  <div className="text-xs text-indigo-600">$120 remaining</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-indigo-200">
                  <div className="text-sm font-medium text-indigo-900">Transportation</div>
                  <div className="text-lg font-bold text-indigo-700">$400</div>
                  <div className="text-xs text-indigo-600">$250 remaining</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <PieChart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              💸 Budgeting Basics
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Master your finances with these essential budgeting skills and take control of your financial future
            </p>
          </div>
          
          {/* Progress Section */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-white border-opacity-20">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-semibold">Progress</span>
                  <span className="text-white font-bold">
                    {completedSections.length}/{TOTAL_SECTIONS} completed
                  </span>
                </div>
                <Progress 
                  value={animatedProgress} 
                  className="h-3 bg-white bg-opacity-20 rounded-full mb-2" 
                />
                <p className="text-blue-100 text-sm">
                  {animatedProgress.toFixed(0)}% complete - Keep going!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Tips Section */}
        <Card className="mb-12 bg-white shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Award className="h-6 w-6 text-yellow-500" />
              Quick Budgeting Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {budgetingTips.map((tip, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {tip.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">{tip.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const isCompleted = completedSections.includes(section.id);
            const isExpanded = expandedSection === section.id;
            
            return (
              <Card 
                key={section.id}
                className={`transition-all duration-300 hover:shadow-xl border-0 overflow-hidden ${
                  isCompleted ? 'ring-2 ring-green-200' : ''
                }`}
              >
                <div 
                  className={`cursor-pointer transition-all duration-200 ${
                    isExpanded ? `bg-gradient-to-r ${section.gradient} text-white` : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          isExpanded ? 'bg-white bg-opacity-20' : section.bgColor
                        }`}>
                          <div className={isExpanded ? 'text-white' : section.iconColor}>
                            {section.icon}
                          </div>
                        </div>
                        <div>
                          <h2 className={`text-xl sm:text-2xl font-bold ${
                            isExpanded ? 'text-white' : 'text-gray-900'
                          }`}>
                            {section.title}
                          </h2>
                          <p className={`text-sm mt-1 ${
                            isExpanded ? 'text-white text-opacity-90' : 'text-gray-600'
                          }`}>
                            Step {index + 1} of {TOTAL_SECTIONS}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isCompleted && (
                          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            <Check className="h-4 w-4" />
                            Completed
                          </div>
                        )}
                        <ChevronRight
                          className={`h-6 w-6 transition-transform duration-200 ${
                            isExpanded ? 'rotate-90 text-white' : 'text-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="bg-white border-t border-gray-200">
                    <div className="p-6 sm:p-8">
                      {getSectionContent(section.id)}
                      
                      {!isCompleted && (
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            Estimated reading time: 3-5 minutes
                          </div>
                          <Button 
                            className={`bg-gradient-to-r ${section.gradient} hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105`}
                            onClick={(e) => {
                              e.stopPropagation();
                              markSectionCompleted(section.id);
                            }}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Mark as Completed
                          </Button>
                        </div>
                      )}
                      
                      {isCompleted && (
                        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 text-green-800">
                            <Check className="h-5 w-5" />
                            <span className="font-semibold">Section Completed!</span>
                          </div>
                          <p className="text-green-700 text-sm mt-1">
                            Great job! You've mastered this concept. Continue to the next section.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Completion Celebration */}
        {completedSections.length === TOTAL_SECTIONS && (
          <Card className="mt-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-2xl">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">🎉 Congratulations!</h3>
              <p className="text-xl text-green-100 mb-6 max-w-2xl mx-auto">
                You've completed the Budgeting Basics module! You now have the foundation to take control of your finances and build a secure financial future.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold">
                  Download Certificate
                </Button>
                <Button className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 px-8 py-3 rounded-lg font-semibold">
                  Continue to Next Module
                </Button>
              </div> */}
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {completedSections.length > 0 && completedSections.length < TOTAL_SECTIONS && (
          <Card className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Keep Going! 🚀</h3>
                  <p className="text-blue-100">
                    You're {completedSections.length} out of {TOTAL_SECTIONS} sections complete. 
                    You're making great progress!
                  </p>
                </div>
                <Button 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                  onClick={() => {
                    const nextSection = sections.find(s => !completedSections.includes(s.id));
                    if (nextSection) {
                      setExpandedSection(nextSection.id);
                    }
                  }}
                >
                  Continue Learning
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}