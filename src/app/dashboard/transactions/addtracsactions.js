'use client';

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function AddTransaction({ onAddTransaction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');

  const categories = [
    { value: "food", label: "Food & Drinks" },
    { value: "groceries", label: "Groceries" },
    { value: "transportation", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "utilities", label: "Utilities" },
    { value: "shopping", label: "Shopping" },
    { value: "health", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "housing", label: "Housing" },
    { value: "other", label: "Other" },
  ];

  const paymentMethods = [
    { value: "googlepay", label: "Google Pay" },
    { value: "phonepay", label: "PhonePe" },
    { value: "card", label: "Credit/Debit Card" },
    { value: "cash", label: "Cash" },
    { value: "bank", label: "Bank Transfer" },
    { value: "upi", label: "UPI" },
    { value: "other", label: "Other" },
  ];

  const resetForm = () => {
    setDate(new Date());
    setDescription('');
    setAmount('');
    setCategory('');
    setPaymentMethod('');
    setNotes('');
  };

  const handleSubmit = () => {
    // Validate inputs
    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!category) {
      alert("Please select a category");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Create transaction object
    const newTransaction = {
      id: Date.now(), // simple unique ID
      date: format(date, 'yyyy-MM-dd'),
      description,
      amount: parseFloat(amount),
      category,
      paymentMethod,
      notes,
    };

    // Call parent component function to add transaction
    onAddTransaction(newTransaction);
    
    // Close dialog and reset form
    setIsOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Enter the details of your transaction below
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Date selector with calendar */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="col-span-1">Date</Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Description field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="col-span-1">Description</Label>
            <Input 
              id="description" 
              className="col-span-3" 
              placeholder="E.g., Coffee at Starbucks" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          {/* Amount field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="col-span-1">Amount</Label>
            <div className="col-span-3 flex">
              <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">₹</div>
              <Input 
                id="amount" 
                type="number" 
                step="0.01" 
                min="0"
                placeholder="0.00"
                className="rounded-l-none" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          
          {/* Category dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="col-span-1">Category</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
            >
              <SelectTrigger id="category" className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Payment Method dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payment" className="col-span-1">Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger id="payment" className="col-span-3">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map(method => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Notes field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="col-span-1">Notes</Label>
            <Input 
              id="notes" 
              className="col-span-3" 
              placeholder="Optional notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => {
            setIsOpen(false);
            resetForm();
          }}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>Add Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}