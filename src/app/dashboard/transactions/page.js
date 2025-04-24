'use client';

import { useState } from 'react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, 
  DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export default function TransactionsPage() {
  const [emailConnected, setEmailConnected] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  
  const connectEmail = () => {
    setEmailConnected(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Transaction Manager</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹0.00</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Budget Status</CardTitle>
            <CardDescription>0% of monthly budget used</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={0} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="email-sync">Email Sync</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View and manage your transactions</CardDescription>
              </div>
              <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
                <DialogTrigger asChild>
                  <Button>Add Transaction</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <DialogDescription>
                      Enter the details of your transaction below
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="col-span-1">Date</Label>
                      <div className="col-span-3">
                        <Input id="date" type="date" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="col-span-1">Description</Label>
                      <Input id="description" className="col-span-3" />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="col-span-1">Amount</Label>
                      <Input id="amount" type="number" className="col-span-3" />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="col-span-1">Category</Label>
                      <Select className="col-span-3">
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food">Food & Drinks</SelectItem>
                          <SelectItem value="groceries">Groceries</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="payment" className="col-span-1">Payment Method</Label>
                      <Select className="col-span-3">
                        <SelectTrigger id="payment">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="googlepay">Google Pay</SelectItem>
                          <SelectItem value="phonepay">PhonePe</SelectItem>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingTransaction(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Transaction</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="food">Food & Drinks</SelectItem>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Input 
                  placeholder="Search transactions..." 
                  className="max-w-sm" 
                />
              </div>
              
              <Table>
                <TableCaption>A list of your recent transactions.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Transaction data will be mapped here */}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Export Data</Button>
              <div className="flex gap-1">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email-sync">
          <Card>
            <CardHeader>
              <CardTitle>Email Transaction Sync</CardTitle>
              <CardDescription>
                Connect your email to automatically import transaction details from payment platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!emailConnected ? (
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="mb-6 text-center">
                    <h3 className="text-lg font-medium mb-2">Connect Your Email</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      We'll scan for transaction emails from Google Pay, PhonePe, and other platforms
                    </p>
                  </div>
                  
                  <div className="grid gap-4 w-full max-w-sm">
                    <Button className="w-full" onClick={connectEmail}>
                      Connect Gmail
                    </Button>
                    <Button className="w-full" variant="outline">
                      Connect Outlook
                    </Button>
                    <Button className="w-full" variant="outline">
                      Connect Yahoo Mail
                    </Button>
                  </div>
                  
                  <p className="mt-6 text-xs text-gray-500 text-center max-w-md">
                    We only scan for transaction emails and don't store or read any other email content.
                    Your data is securely processed and encrypted.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium">Email Connected</h4>
                      <p className="text-sm text-gray-500">example@gmail.com</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Disconnect
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Sync Settings</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Google Pay Transactions</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>PhonePe Transactions</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Bank Statements</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Credit Card Statements</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button>Sync Now</Button>
                    <Button variant="outline">Configure Auto-Sync</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>View your spending patterns and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
                  <p className="text-sm text-gray-500">No data available yet</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Monthly Comparison</h3>
                  <div className="h-64 flex items-center justify-center border rounded-md">
                    <p className="text-gray-500">No data available yet</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import Transactions</CardTitle>
              <CardDescription>
                Upload transaction files or import from third-party services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Drop files to upload</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    or click to browse (CSV, Excel, PDF bank statements)
                  </p>
                  <Button variant="outline">Select Files</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Connect to Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-blue-100"></div>
                      <div className="text-left">
                        <p className="font-medium">Google Pay</p>
                        <p className="text-xs text-gray-500">Connect your Google Pay account</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-purple-100"></div>
                      <div className="text-left">
                        <p className="font-medium">PhonePe</p>
                        <p className="text-xs text-gray-500">Link your PhonePe account</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-4 px-4 justify-start">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-green-100"></div>
                      <div className="text-left">
                        <p className="font-medium">Bank Account</p>
                        <p className="text-xs text-gray-500">Connect your bank account</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}