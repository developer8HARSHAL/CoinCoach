// pages/investment-basics.jsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, TrendingUp, Briefcase, Home, Diamond, PieChart, ShieldCheck, ArrowRight } from 'lucide-react';

export default function InvestmentBasics() {
  return (
    <div className="min-h-screen bg-gray-50">
     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Investment Basics
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Master the fundamentals of investing to secure your financial future
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 mb-16 rounded-xl overflow-hidden shadow-lg">
          <img 
            src="https://i.pinimg.com/736x/11/91/c2/1191c215e4e5d4f9deb3bfbe544313c2.jpg" 
            alt="Investment planning concept" 
            className="object-cover w-full h-full"
          />
        </div>


        {/* Main Content - Section 1: Understanding Investment */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Understanding Investment</h2>
            <div className="ml-4 h-1 bg-blue-600 flex-grow rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-blue-600" />
                What is investing?
              </h3>
              <p className="text-gray-700 mb-4">
                Investing is the act of allocating resources, usually money, with the expectation of generating income or profit over time. 
                Unlike saving, which involves putting money aside for future use with minimal risk, investing involves a degree of risk in pursuit of potentially higher returns.
              </p>
              <p className="text-gray-700 mb-4">
                When you invest, you're purchasing assets that you believe will increase in value over time. This growth can come from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Capital appreciation (increase in the value of the asset)</li>
                <li>Income generation (dividends, interest, or rental income)</li>
                <li>A combination of both</li>
              </ul>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <img 
                src="/api/placeholder/600/400" 
                alt="Investment growth concept" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <ShieldCheck className="mr-2 h-6 w-6 text-blue-600" />
              Risk vs. reward
            </h3>
            <p className="text-gray-700 mb-6">
              The relationship between risk and reward is fundamental to investing. Generally, investments with higher potential returns carry higher risk, 
              while those with lower risk typically offer lower returns.
            </p>
            
            {/* Video Embed */}
            <div className="relative w-full h-0 pb-16:9 mb-6 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/placeholder" 
                title="Understanding Risk vs. Reward" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Return</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Examples</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Low</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1-3%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Savings accounts, CDs, Treasury bonds</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Medium</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">4-8%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Corporate bonds, dividend stocks, REITs</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">High</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">8%+</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Growth stocks, emerging markets, commodities</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-gray-700">
              Understanding your risk tolerance is essential for creating an investment strategy that aligns with your financial goals and comfort level.
            </p>
          </div>
        </section>

        {/* Main Content - Section 2: Types of Investments */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Types of Investments</h2>
            <div className="ml-4 h-1 bg-blue-600 flex-grow rounded-full"></div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
              Stocks, bonds, and mutual funds
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="/api/placeholder/400/200" 
                    alt="Stock market chart" 
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-700">
                    Stocks represent ownership in a company. When you purchase a share of stock, you're buying a small piece of that company and become a shareholder.
                    As the company grows and profits, the value of your shares may increase.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bonds</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="/api/placeholder/400/200" 
                    alt="Bond certificate" 
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-700">
                    Bonds are essentially loans that investors make to entities such as governments or corporations. In return, the entity promises to pay back the loan with interest
                    by a specific date.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mutual Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="/api/placeholder/400/200" 
                    alt="Mutual fund concept" 
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <p className="text-gray-700">
                    Mutual funds pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. They offer an easy way to gain
                    diversification.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Home className="mr-2 h-6 w-6 text-blue-600" />
                  Real estate investment
                </h3>
                <p className="text-gray-700 mb-4">
                  Real estate investing involves purchasing, owning, managing, renting, or selling property for profit. It can generate income through rental payments
                  and appreciation in property value over time.
                </p>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Common real estate investment options:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Residential properties (single-family homes, apartments)</li>
                    <li>Commercial properties (office buildings, retail spaces)</li>
                    <li>Real Estate Investment Trusts (REITs)</li>
                    <li>Real estate crowdfunding platforms</li>
                    <li>Real estate mutual funds or ETFs</li>
                  </ul>
                </div>
                <p className="text-gray-700">
                  Real estate can provide both regular income and long-term appreciation, but it requires more capital, knowledge, and active management than many other investments.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-md">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Real estate investment properties" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Diamond className="mr-2 h-6 w-6 text-blue-600" />
              Alternative investments
            </h3>
            
            <p className="text-gray-700 mb-6">
              Alternative investments are assets that fall outside the conventional investment categories of stocks, bonds, and cash. These investments often have 
              different risk and return profiles than traditional investments.
            </p>
            
            {/* Video Embed */}
            <div className="relative w-full h-0 pb-16:9 mb-8 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/placeholder" 
                title="Alternative Investment Options Explained" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <img 
                      src="https://i.pinimg.com/474x/1b/5b/9a/1b5b9a435c589b2147e0c4e1ce7759b0.jpg" 
                      alt="Cryptocurrency icon" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 text-center mb-2">Cryptocurrencies</h4>
                <p className="text-gray-700 text-center">
                  Digital currencies using cryptography for security. Known for high volatility and potential for significant returns, but with substantial risk.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <img 
                      src="/api/placeholder/100/100" 
                      alt="Commodities icon" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 text-center mb-2">Commodities</h4>
                <p className="text-gray-700 text-center">
                  Physical goods like gold, silver, oil, and agricultural products. Can serve as a hedge against inflation and economic uncertainty.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <img 
                      src="/api/placeholder/100/100" 
                      alt="Alternative investments icon" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 text-center mb-2">Other Alternatives</h4>
                <p className="text-gray-700 text-center">
                  Private equity, venture capital, hedge funds, collectibles (art, wine, antiques), and peer-to-peer lending.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Section 3: Diversification & Risk Management */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Diversification & Risk Management</h2>
            <div className="ml-4 h-1 bg-blue-600 flex-grow rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <img 
                src="/api/placeholder/600/400" 
                alt="Asset allocation pie chart" 
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="mr-2 h-6 w-6 text-blue-600" />
                Asset allocation strategies
              </h3>
              <p className="text-gray-700 mb-4">
                Asset allocation is the process of dividing your investments among different asset categories like stocks, bonds, and cash. This strategy is based on the
                understanding that different assets perform differently under various market conditions.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Strategic Asset Allocation</h4>
                  <p className="text-gray-700">
                    Creating a fixed mix of assets based on expected rates of return for each asset class, your risk tolerance, and investment time horizon.
                    This approach requires periodic rebalancing to maintain the desired allocation.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Tactical Asset Allocation</h4>
                  <p className="text-gray-700">
                    Temporarily adjusting your asset mix to capitalize on exceptional investment opportunities or to avoid market downturns.
                    This requires more active management and market timing.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Age-Based Asset Allocation</h4>
                  <p className="text-gray-700">
                    Following the guideline that your percentage in stocks should be approximately 100 minus your age. As you age, you gradually shift from
                    higher-risk to lower-risk investments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <ShieldCheck className="mr-2 h-6 w-6 text-blue-600" />
              How to minimize risk
            </h3>
            
            <p className="text-gray-700 mb-6">
              While all investments carry some level of risk, there are strategies to minimize unnecessary risks and protect your investment portfolio.
            </p>
            
            {/* Video Embed */}
            <div className="relative w-full h-0 pb-16:9 mb-8 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/placeholder" 
                title="Investment Risk Management Strategies" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <div className="bg-blue-100 p-1 rounded-full mr-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  Diversification
                </h4>
                <p className="text-gray-700">
                  Spread your investments across various asset classes, industries, and geographic regions to reduce the impact of any single investment's performance on your overall portfolio.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <div className="bg-blue-100 p-1 rounded-full mr-2">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  Dollar-cost averaging
                </h4>
                <p className="text-gray-700">
                  Invest a fixed amount at regular intervals, regardless of market conditions, to reduce the impact of market volatility.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <div className="bg-blue-100 p-1 rounded-full mr-2">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  Regular rebalancing
                </h4>
                <p className="text-gray-700">
                  Periodically adjust your portfolio back to your target asset allocation to maintain your desired level of risk.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <div className="bg-blue-100 p-1 rounded-full mr-2">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  Emergency fund
                </h4>
                <p className="text-gray-700">
                  Maintain a cash reserve for unexpected expenses to avoid having to sell investments at inopportune times.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-100">
              <h4 className="font-medium text-yellow-800 text-lg mb-2">Key Takeaway:</h4>
              <p className="text-yellow-700">
                The goal isn't to eliminate risk entirely, but rather to manage it in a way that aligns with your investment goals, time horizon, and risk tolerance.
                Remember that higher returns typically require accepting some level of risk.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-blue-600 text-white rounded-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to start investing?</h2>
              <p className="mb-6">
                Now that you understand the basics of investing, take the next step towards building your financial future.
                Create a personalized investment plan based on your goals and risk tolerance.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
                Create Your Investment Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img 
                src="https://i.pinimg.com/736x/e1/78/8e/e1788eed934841e936e743964acf3659.jpg" 
                alt="Financial planning" 
                className="object-cover "
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
