'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingUp, Trophy, Target, Wallet, CreditCard, PiggyBank, IndianRupee, DollarSign, Plus, Minus, ArrowRight, Calendar, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AnalyticsContent from './AnalyticsContent';

const Dashboard = () => {
  // Main financial state
  const [income, setIncome] = useState(50000);
  const [expenses, setExpenses] = useState(30000);
  const [savings, setSavings] = useState(20000);
  const [points, setPoints] = useState(150);
  const [savingsGoal, setSavingsGoal] = useState(30000);
  
  // Historical data
  const [monthlyData, setMonthlyData] = useState([
    { name: 'Jan', income: 50000, expenses: 15000, savings: 15000 },
    { name: 'Feb', income: 52000, expenses: 28000, savings: 24000 },
    { name: 'Mar', income: 48000, expenses: 32000, savings: 16000 },
    { name: 'Apr', income: 55000, expenses: 31000, savings: 24000 },
    { name: 'May', income: 53000, expenses: 29000, savings: 24000 },
    { name: 'Jun', income: 56000, expenses: 33000, savings: 23000 },
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    { category: 'Housing', amount: 12000 },
    { category: 'Food', amount: 5000 },
    { category: 'Transport', amount: 3000 },
    { category: 'Utilities', amount: 2000 },
    { category: 'Entertainment', amount: 1500 },
    { category: 'Others', amount: 6500 },
  ]);

  // Analytics data
  const [incomeGrowth, setIncomeGrowth] = useState(4);
  const [expenseGrowth, setExpenseGrowth] = useState(-2);
  const [netWorthGrowth, setNetWorthGrowth] = useState(12);
  
  // Transactions data
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, description: 'Salary Deposit', amount: 50000, type: 'income', date: '2025-02-01' },
    { id: 2, description: 'Rent Payment', amount: -12000, type: 'expense', date: '2025-02-03' },
    { id: 3, description: 'Grocery Shopping', amount: -2500, type: 'expense', date: '2025-02-05' },
    { id: 4, description: 'Investment Returns', amount: 3500, type: 'income', date: '2025-02-10' },
    { id: 5, description: 'Utility Bills', amount: -1800, type: 'expense', date: '2025-02-12' },
  ]);

  // Upcoming bills
  const [upcomingBills, setUpcomingBills] = useState([
    { id: 1, description: 'Electricity Bill', amount: 1200, dueDate: '2025-02-20' },
    { id: 2, description: 'Internet Bill', amount: 800, dueDate: '2025-02-22' },
    { id: 3, description: 'Credit Card Payment', amount: 5000, dueDate: '2025-02-25' },
    { id: 4, description: 'Insurance Premium', amount: 2500, dueDate: '2025-03-01' },
  ]);

  // Calculate total income, expenses and savings from transactions
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const thisMonthTransactions = recentTransactions.filter(t => {
      const transactionMonth = new Date(t.date).getMonth();
      return transactionMonth === currentMonth;
    });
    
    const totalIncome = thisMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = thisMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setSavings(totalIncome - totalExpenses);
  }, [recentTransactions]);

  // Functions for calculations
  const calculateSavingsProgress = () => {
    return (savings / savingsGoal) * 100;
  };

  // Get financial advice based on current status
  const getFinancialAdvice = () => {
    const savingsRate = (savings / income) * 100;
    
    if (savingsRate < 10) {
      return "Try to save at least 10% of your income each month.";
    } else if (savingsRate < 20) {
      return "Good job! Consider increasing your savings to 20% of income.";
    } else {
      return "Excellent saving habits! Your financial future looks bright.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-xl font-semibold">{points} Points</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                  <IndianRupee className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {income.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    {incomeGrowth >= 0 ? <ArrowUp className="h-3 w-3 text-green-500 mr-1" /> : <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
                    <span>{Math.abs(incomeGrowth)}% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                  <CreditCard className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {expenses.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    {expenseGrowth >= 0 ? <ArrowUp className="h-3 w-3 text-red-500 mr-1" /> : <ArrowDown className="h-3 w-3 text-green-500 mr-1" />}
                    <span>{Math.abs(expenseGrowth)}% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Savings</CardTitle>
                  <PiggyBank className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {savings.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                  </div>
                  <Progress value={calculateSavingsProgress()} className="mt-2" />
                  <p className="text-xs text-gray-500 mt-1">{calculateSavingsProgress().toFixed(0)}% of monthly goal</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
                  <Wallet className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(income - expenses).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    {netWorthGrowth >= 0 ? <ArrowUp className="h-3 w-3 text-green-500 mr-1" /> : <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
                    <span>{Math.abs(netWorthGrowth)}% from last year</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Overview</CardTitle>
                  <CardDescription>Your financial activity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#22c55e" />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
                      <Line type="monotone" dataKey="savings" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>Where your money goes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenseCategories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'income' ? 
                              <Plus className="h-5 w-5 text-green-600" /> : 
                              <Minus className="h-5 w-5 text-red-600" />
                            }
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <span className={`font-medium ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount.toLocaleString("en-IN", { 
                            style: "currency", 
                            currency: "INR",
                            signDisplay: 'never'
                          })}
                          {transaction.type === 'income' ? ' +' : ' -'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">View All Transactions</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bills</CardTitle>
                  <CardDescription>Don't miss these payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingBills.slice(0, 3).map((bill) => (
                      <div key={bill.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{bill.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Due: {bill.dueDate}</span>
                          </div>
                        </div>
                        <span className="font-medium">
                          {bill.amount.toLocaleString("en-IN", { 
                            style: "currency", 
                            currency: "INR" 
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">View All Bills</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center">
                <div>
                  <CardTitle>Financial Advice</CardTitle>
                  <CardDescription>Tips to improve your finances</CardDescription>
                </div>
                <AlertCircle className="ml-auto h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <p>{getFinancialAdvice()}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANALYTICS & BUDGET TABS */}
          <AnalyticsContent 
            monthlyData={monthlyData}
            expenseCategories={expenseCategories}
            setExpenseCategories={setExpenseCategories}
            income={income}
            expenses={expenses}
            savings={savings}
            savingsGoal={savingsGoal}
            setSavingsGoal={setSavingsGoal}
            points={points}
            setPoints={setPoints}
            expenseDistribution={expenseCategories.map(({ category, amount }) => ({
              name: category,
              value: amount
            }))}
            recentTransactions={recentTransactions}
            setRecentTransactions={setRecentTransactions}
          />
          
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;