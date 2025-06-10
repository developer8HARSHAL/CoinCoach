"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  ShieldCheck,
  BarChart3,
  Target,
  Clock,
  AlertTriangle,
  Calculator,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function InvestmentBasics() {
  const [activeTab, setActiveTab] = useState('basics');
  const [expandedSections, setExpandedSections] = useState({});
  const [riskTolerance, setRiskTolerance] = useState(50);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const investmentTypes = [
    {
      type: "Stocks",
      risk: "High",
      return: "8-12%",
      description: "Ownership shares in companies with potential for capital appreciation and dividends",
      pros: ["High growth potential", "Liquidity", "Dividend income"],
      cons: ["High volatility", "Market risk", "Company-specific risk"]
    },
    {
      type: "Bonds",
      risk: "Low-Medium",
      return: "3-6%",
      description: "Debt securities that provide fixed income with lower risk than stocks",
      pros: ["Stable income", "Lower volatility", "Portfolio diversification"],
      cons: ["Interest rate risk", "Inflation risk", "Credit risk"]
    },
    {
      type: "Real Estate",
      risk: "Medium",
      return: "6-10%",
      description: "Physical property investments or REITs for real estate exposure",
      pros: ["Inflation hedge", "Passive income", "Tax benefits"],
      cons: ["Illiquidity", "High transaction costs", "Market dependency"]
    },
    {
      type: "Commodities",
      risk: "High",
      return: "Variable",
      description: "Raw materials like gold, oil, and agricultural products",
      pros: ["Inflation protection", "Portfolio diversification", "Hedge against currency"],
      cons: ["High volatility", "No income generation", "Storage costs"]
    }
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Low-Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPortfolioRecommendation = (riskLevel) => {
    if (riskLevel < 30) {
      return {
        allocation: { stocks: 20, bonds: 60, cash: 15, alternatives: 5 },
        profile: "Conservative",
        description: "Focused on capital preservation with modest growth"
      };
    } else if (riskLevel < 70) {
      return {
        allocation: { stocks: 60, bonds: 30, cash: 5, alternatives: 5 },
        profile: "Moderate",
        description: "Balanced approach between growth and stability"
      };
    } else {
      return {
        allocation: { stocks: 80, bonds: 10, cash: 5, alternatives: 5 },
        profile: "Aggressive",
        description: "Growth-focused with higher risk tolerance"
      };
    }
  };

  const recommendation = getPortfolioRecommendation(riskTolerance);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Investment Education
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master the <span className="text-blue-600">Fundamentals</span> of Investing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build wealth through strategic investment decisions. Learn core concepts, 
            risk management, and advanced strategies to grow your financial portfolio.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            {['basics', 'strategies', 'calculator'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab === 'basics' && 'Investment Basics'}
                {tab === 'strategies' && 'Advanced Strategies'}
                {tab === 'calculator' && 'Portfolio Builder'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'basics' && (
          <div className="space-y-20">
            {/* What is Investment - Enhanced */}
            <section className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  <Target className="w-4 h-4 mr-2" />
                  Foundation
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  What is Investment?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Investment is the strategic allocation of capital with the expectation of generating 
                  returns over time. It involves purchasing assets that have the potential to increase 
                  in value, provide income, or both. The fundamental principle is to make your money 
                  work for you through compound growth.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-2">Time Horizon</h4>
                    <p className="text-sm text-gray-600">Long-term wealth building through strategic patience</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-2">Compound Growth</h4>
                    <p className="text-sm text-gray-600">Exponential returns through reinvestment</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl w-80 h-80 flex items-center justify-center mx-auto relative shadow-2xl">
                  <DollarSign className="h-32 w-32 text-white" />
                  <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-yellow-500 rounded-full p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </section>

            {/* Investment Types - Enhanced Grid */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Vehicles</h2>
                <p className="text-lg text-gray-600">Explore different asset classes and their characteristics</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {investmentTypes.map((investment, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{investment.type}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(investment.risk)}`}>
                          {investment.risk} Risk
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{investment.description}</p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span className="text-sm text-gray-500">Expected Return</span>
                          <div className="text-2xl font-bold text-green-600">{investment.return}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">Annual Average</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => toggleSection(investment.type)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium">View Pros & Cons</span>
                        {expandedSections[investment.type] ? <ChevronUp /> : <ChevronDown />}
                      </button>

                      {expandedSections[investment.type] && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-green-700 mb-2">Pros</h5>
                            <ul className="space-y-1">
                              {investment.pros.map((pro, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-center">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-red-700 mb-2">Cons</h5>
                            <ul className="space-y-1">
                              {investment.cons.map((con, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-center">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Risk vs Reward - Interactive */}
            <section className="bg-white rounded-2xl p-12 shadow-lg">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Risk vs Reward</h2>
                <p className="text-lg text-gray-600">Understanding the fundamental relationship between risk and return</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-green-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Key Principles</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-1" />
                        <div>
                          <h4 className="font-semibold">Higher Risk, Higher Potential Return</h4>
                          <p className="text-sm text-gray-600">Riskier investments typically offer greater potential returns to compensate investors</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <ShieldCheck className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-semibold">Risk Tolerance Assessment</h4>
                          <p className="text-sm text-gray-600">Your ability and willingness to accept potential losses for potential gains</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <BarChart3 className="w-5 h-5 text-blue-500 mt-1" />
                        <div>
                          <h4 className="font-semibold">Diversification Benefits</h4>
                          <p className="text-sm text-gray-600">Spreading risk across multiple assets to optimize risk-adjusted returns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 h-80 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {/* Risk-Return Chart Visualization */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-2 border-gray-300 rounded-full relative">
                          <div className="absolute top-4 right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute bottom-4 left-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">Risk</div>
                              <div className="text-sm text-gray-600">vs</div>
                              <div className="text-2xl font-bold text-gray-900">Return</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'strategies' && (
          <div className="space-y-16">
            {/* Advanced Investment Strategies */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Investment Strategies</h2>
                <p className="text-lg text-gray-600">Sophisticated approaches for experienced investors</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                      <Calculator className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Dollar Cost Averaging</h3>
                    <p className="text-gray-600 mb-4">
                      Invest fixed amounts regularly regardless of market conditions to reduce timing risk and volatility impact.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Benefits:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Reduces market timing risk</li>
                        <li>• Smooths out volatility</li>
                        <li>• Disciplined approach</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Value Investing</h3>
                    <p className="text-gray-600 mb-4">
                      Identify undervalued securities trading below their intrinsic value for long-term appreciation.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Key Metrics:</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Price-to-Earnings (P/E) ratio</li>
                        <li>• Price-to-Book (P/B) ratio</li>
                        <li>• Debt-to-Equity ratio</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Growth Investing</h3>
                    <p className="text-gray-600 mb-4">
                      Focus on companies with above-average growth potential, often in emerging industries or technologies.
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Indicators:</h4>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Revenue growth rate</li>
                        <li>• Market expansion</li>
                        <li>• Innovation pipeline</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Modern Portfolio Theory */}
            <section className="bg-white rounded-2xl p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Modern Portfolio Theory</h2>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-lg text-gray-600">
                    Developed by Harry Markowitz, MPT demonstrates how to construct portfolios 
                    that maximize expected return for a given level of risk through optimal diversification.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Efficient Frontier</h4>
                      <p className="text-sm text-gray-600">The set of optimal portfolios offering the highest expected return for each level of risk</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Correlation Benefits</h4>
                      <p className="text-sm text-gray-600">Assets with low correlation reduce overall portfolio volatility without sacrificing returns</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Optimal Allocation</h3>
                    <p className="text-gray-600">Risk-adjusted portfolio construction</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-12">
            {/* Interactive Portfolio Builder */}
            <section className="bg-white rounded-2xl p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Portfolio Risk Assessment</h2>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Risk Tolerance Level: {riskTolerance}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={riskTolerance}
                      onChange={(e) => setRiskTolerance(parseInt(e.target.value))}
                      className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Conservative</span>
                      <span>Moderate</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Recommended: {recommendation.profile} Portfolio
                    </h3>
                    <p className="text-gray-600 mb-4">{recommendation.description}</p>
                    
                    <div className="space-y-3">
                      {Object.entries(recommendation.allocation).map(([asset, percentage]) => (
                        <div key={asset} className="flex items-center justify-between">
                          <span className="capitalize font-medium">{asset}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium w-8">{percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8">
                  <div className="text-center mb-8">
                    <div className="w-32 h-32 mx-auto relative">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="transparent" stroke="#e5e7eb" strokeWidth="2"/>
                        {/* Stocks */}
                        <circle 
                          cx="18" cy="18" r="16" fill="transparent" 
                          stroke="#3b82f6" strokeWidth="2"
                          strokeDasharray={`${recommendation.allocation.stocks} 100`}
                          strokeDashoffset="0"
                        />
                        {/* Bonds */}
                        <circle 
                          cx="18" cy="18" r="16" fill="transparent" 
                          stroke="#10b981" strokeWidth="2"
                          strokeDasharray={`${recommendation.allocation.bonds} 100`}
                          strokeDashoffset={`-${recommendation.allocation.stocks}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{recommendation.profile}</div>
                          <div className="text-sm text-gray-600">Portfolio</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Expected Annual Return</span>
                        <span className="text-green-600 font-bold">
                          {riskTolerance < 30 ? '4-6%' : riskTolerance < 70 ? '6-8%' : '8-12%'}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Volatility Level</span>
                        <span className={`font-bold ${riskTolerance < 30 ? 'text-green-600' : riskTolerance < 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {riskTolerance < 30 ? 'Low' : riskTolerance < 70 ? 'Medium' : 'High'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Apply these concepts to build a diversified portfolio aligned with your financial goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Portfolio
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}