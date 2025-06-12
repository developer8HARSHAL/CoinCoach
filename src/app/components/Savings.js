"use client";
import React from 'react';
import { ArrowRight, TrendingUp, Shield, Target, PiggyBank, Calculator, Book, Award, CheckCircle, Star } from 'lucide-react';

export default function SavingsPage() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50" style={{ scrollBehavior: 'smooth' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <Star className="w-4 h-4" />
                #1 Financial Education Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master Your 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Financial Future
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Transform your relationship with money through our comprehensive savings strategies. 
                Learn from experts, build lasting habits, and secure your financial independence with confidence.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={(e) => handleSmoothScroll(e, 'courses')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Topics Below
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <PiggyBank className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">$50K+</div>
                      <div className="text-sm text-gray-700">Average Savings</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">24%</div>
                      <div className="text-sm text-gray-700">ROI Growth</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">100K+</div>
                      <div className="text-sm text-gray-700">Students</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <Award className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">4.9★</div>
                      <div className="text-sm text-gray-700">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Topics */}
      <section id="courses" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Master These Essential Skills
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Learn practical financial strategies that you can implement immediately to transform your savings journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <button 
                key={index} 
                onClick={(e) => handleSmoothScroll(e, course.id)}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 text-left w-full"
              >
                <div className="p-2">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                    <course.icon className="w-16 h-16 text-blue-600" />
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{course.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{course.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                    <span>Learn How To Do It</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Topic Explanations */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-24">
          {detailedSections.map((section, index) => (
            <div key={index} id={section.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16 scroll-mt-20`}>
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-30"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                    <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                      <section.icon className="w-32 h-32 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Step-by-Step Guide
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {section.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {section.description}
                </p>
                
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-900">How to Get Started:</h4>
                  <div className="space-y-4">
                    {section.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-1">{step.title}</h5>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Expected Results:
                  </h4>
                  <div className="space-y-2">
                    {section.results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Join thousands of successful learners who have mastered their finances through our comprehensive program. 
              Start your journey today with our interactive quiz!
            </p>
            <div className="flex justify-center">
              <a href="/quiz" className="group px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Take Assessment Quiz
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const courses = [
  {
    id: "budgeting-mastery",
    title: "Budgeting Mastery",
    description: "Create sustainable budgets that adapt to your lifestyle while maximizing your savings potential through proven methodologies.",
    icon: Calculator,
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund Builder",
    description: "Build a robust financial safety net with strategies for consistent saving and smart fund allocation during emergencies.",
    icon: Shield,
  },
  {
    id: "investment-fundamentals",
    title: "Investment Fundamentals",
    description: "Master the basics of investing with risk assessment, portfolio diversification, and long-term wealth building strategies.",
    icon: TrendingUp,
  },
  {
    id: "debt-management",
    title: "Debt Freedom Plan",
    description: "Eliminate debt systematically using proven methods like debt snowball and avalanche techniques for financial freedom.",
    icon: Target,
  },
];

const detailedSections = [
  {
    id: "budgeting-mastery",
    title: "Master Your Monthly Budget",
    description: "Learn to create a realistic budget that actually works for your lifestyle. We'll teach you the 50/30/20 rule and how to customize it for your unique situation, ensuring every dollar has a purpose while still allowing for life's pleasures.",
    steps: [
      {
        title: "Calculate Your After-Tax Income",
        description: "Start by determining your exact monthly take-home pay from all sources including salary, freelance work, and side hustles."
      },
      {
        title: "Track Your Current Spending",
        description: "Use apps like Mint or YNAB to monitor where your money goes for 2-3 weeks. Categorize every expense to identify spending patterns."
      },
      {
        title: "Apply the 50/30/20 Framework",
        description: "Allocate 50% to needs (rent, groceries, utilities), 30% to wants (dining out, entertainment), and 20% to savings and debt repayment."
      },
      {
        title: "Set Up Automatic Transfers",
        description: "Create automatic transfers to savings accounts immediately after payday, so you save before you have a chance to spend."
      },
      {
        title: "Review and Adjust Monthly",
        description: "Schedule monthly budget reviews to track progress, identify overspending areas, and adjust categories as needed."
      }
    ],
    results: [
      "Reduce overspending by an average of 23% within the first month",
      "Build a systematic approach to saving that doesn't feel restrictive",
      "Gain complete visibility into your spending patterns and habits",
      "Create buffer funds for irregular expenses like car repairs or medical bills"
    ],
    icon: Calculator
  },
  {
    id: "emergency-fund",
    title: "Build Your Financial Safety Net",
    description: "An emergency fund is your financial insurance policy. Learn how to calculate the right amount to save, where to keep it for easy access, and how to build it systematically without overwhelming your current budget.",
    steps: [
      {
        title: "Determine Your Target Amount",
        description: "Calculate 3-6 months of essential expenses (rent, utilities, groceries, minimum debt payments). Start with $1,000 as your initial goal."
      },
      {
        title: "Choose the Right Account",
        description: "Open a high-yield savings account separate from your checking account. Look for accounts offering 4-5% APY with no minimum balance fees."
      },
      {
        title: "Automate Your Savings",
        description: "Set up automatic transfers of $50-200 per month (or whatever you can afford) to your emergency fund right after payday."
      },
      {
        title: "Find Extra Money to Save",
        description: "Use windfalls like tax refunds, bonuses, or cash gifts. Sell unused items or pick up occasional side work to boost your fund faster."
      },
      {
        title: "Know When to Use It",
        description: "Only use for true emergencies: job loss, medical bills, major car repairs, or home emergencies. Not for vacations or shopping."
      }
    ],
    results: [
      "Sleep better knowing you can handle a $1,000-5,000 emergency without debt",
      "Reduce financial stress and anxiety by 60-80%",
      "Avoid high-interest credit card debt during unexpected situations",
      "Build confidence to take calculated career risks or negotiate better terms"
    ],
    icon: Shield
  },
  {
    id: "investment-fundamentals",
    title: "Start Investing with Confidence",
    description: "Investing doesn't have to be complicated or risky. Learn the fundamentals of building long-term wealth through simple, proven strategies that work regardless of market conditions. Start with as little as $25 per month.",
    steps: [
      {
        title: "Understand Risk vs. Return",
        description: "Learn how different investments (stocks, bonds, real estate) behave over time. Understand that higher potential returns come with higher volatility."
      },
      {
        title: "Start with Index Funds",
        description: "Begin with low-cost broad market index funds (like S&P 500). These automatically diversify your investment across hundreds of companies."
      },
      {
        title: "Open Investment Accounts",
        description: "Start with a Roth IRA for tax-free growth, then add a taxable brokerage account. Use platforms like Vanguard, Fidelity, or Schwab."
      },
      {
        title: "Practice Dollar-Cost Averaging",
        description: "Invest the same amount every month regardless of market conditions. This reduces the impact of market timing and volatility."
      },
      {
        title: "Gradually Increase Contributions",
        description: "Start with whatever you can afford ($25-100/month), then increase by $25 every 3-6 months as your income grows."
      }
    ],
    results: [
      "Build wealth that compounds over time - potentially $500,000+ over 30 years",
      "Beat inflation and maintain purchasing power of your money",
      "Create passive income streams for future financial independence",
      "Learn to stay calm during market volatility and focus on long-term goals"
    ],
    icon: TrendingUp
  },
  {
    id: "debt-management",
    title: "Eliminate Debt Strategically",
    description: "Break free from the debt cycle using proven psychological and mathematical strategies. Whether you have credit cards, student loans, or other debts, learn how to pay them off efficiently while staying motivated.",
    steps: [
      {
        title: "List All Your Debts",
        description: "Create a complete inventory: creditor names, balances, minimum payments, and interest rates. Include everything from credit cards to student loans."
      },
      {
        title: "Choose Your Strategy",
        description: "Debt Snowball: Pay minimums on all debts, extra money goes to smallest balance first. Debt Avalanche: Target highest interest rate first."
      },
      {
        title: "Find Extra Money for Payments",
        description: "Review your budget to find an extra $50-200 monthly. Cancel unused subscriptions, eat out less, or take on temporary side work."
      },
      {
        title: "Negotiate with Creditors",
        description: "Call credit card companies to request lower interest rates. Many will reduce rates by 2-5% if you have a good payment history."
      },
      {
        title: "Avoid Creating New Debt",
        description: "Use cash or debit cards only. If you must use credit cards, pay them off in full each month to avoid interest charges."
      }
    ],
    results: [
      "Pay off debts 2-4 years faster than making minimum payments only",
      "Save thousands in interest payments over the life of your debts",
      "Improve your credit score by 50-100 points as balances decrease",
      "Free up hundreds of dollars monthly for savings and investments once debt-free"
    ],
    icon: Target
  }
];