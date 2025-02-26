import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";

const AnalyticsContent = ({ 
  expenseCategories, 
  setExpenseCategories,
  points, 
  setPoints
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const addExpenseCategory = () => {
    if (newCategory && newAmount) {
      const amount = parseInt(newAmount);
      if (!isNaN(amount) && amount > 0) {
        setExpenseCategories([
          ...expenseCategories,
          { category: newCategory, amount: amount }
        ]);
        setNewCategory('');
        setNewAmount('');
        setPoints(points + 5); // Award 5 points for adding a category
      }
    }
  };

  const EXPENSE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#8dd1e1'];

  return (
    <>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Breakdown of your expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={expenseCategories.map(({ category, amount }) => ({ name: category, value: amount }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Points Allocation</CardTitle>
            <CardDescription>Earn points for good financial habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondar" className={"bg-yellow-400"}>Current Points: {points}</Badge>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                <li>+5 points for adding an expense category</li>
                <li>+10 points for updating a savings goal</li>
                <li>+2 points for logging a transaction</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="budget" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>Manage your monthly expense categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{category.category}</span>
                    <Progress value={100} className="h-2" />
                    <span className="text-sm">₹{category.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Category Name</Label>
                <Input 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)} 
                  placeholder="e.g. Groceries"
                />
                <Label>Amount</Label>
                <Input 
                  value={newAmount} 
                  onChange={(e) => setNewAmount(e.target.value)} 
                  type="number" 
                  placeholder="e.g. 500"
                />
                <Button onClick={addExpenseCategory} className="w-full">Add Category</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </>
  );
};

export default AnalyticsContent;
