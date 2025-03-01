// pages/investment-basics.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  ArrowRight, 
  Building,
  ShieldCheck
} from 'lucide-react';

export default function InvestmentBasics() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Understanding Investment */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="text-green-500 font-medium mb-2">Understanding Investment</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What is investing?
            </h2>
            <p className="text-gray-600 mb-6">
              Investing involves allocating resources, usually money, with the expectation 
              of generating income or profit over time. Unlike saving, investing puts your 
              money to work in different vehicles that have the potential to generate returns.
            </p>
           
          </div>

          <div className="relative">
            <div className="bg-green-500 rounded-full w-64 h-64 flex items-center justify-center mx-auto relative">
              <DollarSign className="h-32 w-32 text-white" />
              <div className="absolute -bottom-4 -right-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-6 h-1 bg-gray-800 transform rotate-45"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute top-1/4 -left-6">
              <div className="w-6 h-6 text-green-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/3">
              <div className="w-24 h-24 rounded-full bg-gray-100"></div>
            </div>
          </div>
        </div>

        {/* Section 2: Risk vs. Reward */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Risk vs reward
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="relative">
              <div className="bg-green-100 w-full h-64 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  {/* Risk vs Reward illustration */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded border-2 border-green-500 flex items-center justify-center mb-2">
                      <TrendingUp className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded border-2 border-green-500 flex items-center justify-center mb-2">
                      <ShieldCheck className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-gray-600 mb-6">
                The relationship between risk and reward is fundamental to investing. 
                Generally, investments with higher potential returns carry higher risks. 
                Understanding your risk tolerance is essential to building an appropriate 
                investment portfolio.
              </p>
             
            </div>
          </div>
        </div>

        {/* Section 3: Types of Investments */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="text-green-500 font-medium mb-2">Types of Investments</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stocks, bonds, and<br />
              mutual funds
            </h2>
            <p className="text-gray-600 mb-6">
              These traditional investment vehicles form the foundation of most portfolios. 
              Stocks represent ownership in companies, bonds are loans to entities, and 
              mutual funds pool money from multiple investors to purchase a diversified mix of securities.
            </p>
            
          </div>

          <div className="relative">
            <div className="bg-green-500 w-72 h-72 flex items-center justify-center relative z-10">
              <div className="bg-white p-6 w-64 h-64 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-full w-10 h-10 bg-gray-100 flex items-center justify-center">
                    <div className="rounded-full w-6 h-6 bg-green-500"></div>
                  </div>
                  <div></div>
                  <div></div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <div className="w-16 h-1 bg-green-500 mb-2"></div>
                  <div className="w-24 h-1 bg-gray-300"></div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-3 mb-3">
                  <div className="w-16 h-1 bg-green-500 mb-2"></div>
                  <div className="w-24 h-1 bg-gray-300"></div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="w-16 h-1 bg-green-500 mb-2"></div>
                  <div className="w-24 h-1 bg-gray-300"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 border-2 border-green-500 -z-10"></div>
          </div>
        </div>

        {/* Section 4: Real Estate Investment */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="relative">
            <div className="bg-green-500 rounded-full w-64 h-64 flex items-center justify-center mx-auto relative">
              <Building className="h-32 w-32 text-white" />
              <div className="absolute -bottom-4 -right-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-6 h-1 bg-gray-800 transform rotate-45"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute top-1/4 -left-6">
              <div className="w-6 h-6 text-green-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/3">
              <div className="w-24 h-24 rounded-full bg-gray-100"></div>
            </div>
          </div>

          <div>
            <p className="text-green-500 font-medium mb-2">Types of Investments</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real estate<br />
              investment
            </h2>
            <p className="text-gray-600 mb-6">
              Real estate investing involves purchasing, owning, and managing property 
              for profit. This can include residential, commercial, or industrial properties, 
              as well as REITs (Real Estate Investment Trusts) for those seeking exposure 
              without direct ownership.
            </p>
            
          </div>
        </div>

        {/* Section 5: Diversification & Risk Management */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="text-green-500 font-medium mb-2">Diversification & Risk Management</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Asset allocation<br />
              strategies
            </h2>
            <p className="text-gray-600 mb-6">
              Asset allocation involves dividing investments among different asset categories 
              like stocks, bonds, and cash. The right mix depends on your goals, risk tolerance, 
              and investment timeframe, and helps balance risk and reward in your portfolio.
            </p>
           
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center mb-4">
                    <PieChart className="h-20 w-20 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-center">Portfolio Diversification</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}