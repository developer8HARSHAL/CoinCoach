'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, PencilLine, BadgeIndianRupee, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function BudgetList({ entries, income, onEdit, onDelete }) {
  // Calculate totals and grouped entries
  const calculateTotals = () => {
    const totals = { Needs: 0, Wants: 0, Savings: 0 };
    const grouped = { Needs: [], Wants: [], Savings: [] };

    entries.forEach((entry) => {
      if (grouped[entry.category]) {
        grouped[entry.category].push(entry);
        totals[entry.category] += entry.amount;
      }
    });

    return { totals, grouped };
  };

  const { totals: categoryTotals, grouped: groupedEntries } = calculateTotals();
  const totalSpent = categoryTotals.Needs + categoryTotals.Wants + categoryTotals.Savings;
  const remaining = income - totalSpent;

  // Calculate recommended amounts
  const recommended = {
    needs: income * 0.5,
    wants: income * 0.3,
    savings: income * 0.2
  };

  // Calculate percentages
  const actualPercentages = {
    needs: (categoryTotals.Needs / income) * 100,
    wants: (categoryTotals.Wants / income) * 100,
    savings: (categoryTotals.Savings / income) * 100
  };

  // Generate suggestions
  const getSuggestions = () => {
    const suggestions = [];
    
    if (categoryTotals.Needs > recommended.needs) {
      const overspend = categoryTotals.Needs - recommended.needs;
      suggestions.push({
        type: 'needs',
        message: `Reduce Needs by ₹${overspend.toLocaleString()}`,
        action: 'Try negotiating rent or cutting utility costs'
      });
    }

    if (categoryTotals.Wants > recommended.wants) {
      const overspend = categoryTotals.Wants - recommended.wants;
      suggestions.push({
        type: 'wants',
        message: `Reduce Wants by ₹${overspend.toLocaleString()}`,
        action: 'Delay non-essential purchases this month'
      });
    }

    if (categoryTotals.Savings < recommended.savings) {
      const shortfall = recommended.savings - categoryTotals.Savings;
      suggestions.push({
        type: 'savings',
        message: `Increase Savings by ₹${shortfall.toLocaleString()}`,
        action: 'Automate transfers to savings on payday'
      });
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  const renderEntry = (entry, idx) => (
    <motion.li
      key={entry._id || `${entry.category}-${idx}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex justify-between items-center border-b py-1 group"
    >
      <div className="flex items-center gap-2">
        <BadgeIndianRupee className="w-4 h-4 text-gray-600" />
        <span className="text-sm">{entry.description || `Entry ${idx + 1}`}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">₹{entry.amount}</span>
        
        {['Needs', 'Wants', 'Savings'].includes(entry.category) && (
          <>
            <button
              className="text-blue-500 opacity-0 group-hover:opacity-100 transition"
              onClick={() => onEdit(entry)}
            >
              <PencilLine className="w-4 h-4" />
            </button>
            <button
              className="text-red-500 opacity-0 group-hover:opacity-100 transition"
              onClick={() => {
                if (confirm('Are you sure you want to delete this entry?')) {
                  onDelete(entry._id);
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </motion.li>
  );

  const CategoryCard = ({ title, color, entries }) => (
    <div className="h-full">
      <h4 className={`text-${color}-600 font-semibold text-lg mb-2 text-center`}>{title}</h4>
      <ul className={`space-y-1 bg-${color}-50 rounded-lg p-3 h-full min-h-[200px]`}>
        <AnimatePresence>
          {entries.length > 0 ? (
            entries.map((entry, idx) => renderEntry(entry, idx))
           ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 py-4"
              >
                No {title.toLowerCase()} expenses yet
              </motion.div>
            )
          }
        </AnimatePresence>
      </ul>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-2 mb-6">
        📊 Budget Summary
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <CategoryCard title="Needs" color="blue" entries={groupedEntries.Needs} />
        <CategoryCard title="Wants" color="pink" entries={groupedEntries.Wants} />
        <CategoryCard title="Savings" color="green" entries={groupedEntries.Savings} />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Enhanced Pie Chart with 50/30/20 Analysis */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">Budget Distribution (50/30/20 Rule)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Needs', value: categoryTotals.Needs },
                    { name: 'Wants', value: categoryTotals.Wants },
                    { name: 'Savings', value: categoryTotals.Savings },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ec4899" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '0.5rem'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Budget Rule Analysis */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4">Rule Compliance</h4>
            
            {/* Progress Bars */}
            <div className="space-y-4">
              {['needs', 'wants', 'savings'].map((type) => (
                <div key={type}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium capitalize">
                      {type} ({type === 'needs' ? '50%' : type === 'wants' ? '30%' : '20%'})
                    </span>
                    <span className="font-medium">
                      {actualPercentages[type].toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        type === 'needs' ? 'bg-blue-500' : 
                        type === 'wants' ? 'bg-pink-500' : 'bg-green-500'
                      }`} 
                      style={{
                        width: `${Math.min(100, actualPercentages[type])}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-red-600 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Budget Adjustments Needed
                </h4>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2 font-medium">
                      {suggestion.type === 'savings' ? (
                        <ArrowUp size={16} className="text-green-600" />
                      ) : (
                        <ArrowDown size={16} className="text-red-600" />
                      )}
                      {suggestion.message}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.action}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="w-full h-full">
          <h4 className="text-center font-semibold text-lg mb-2">Income vs Spending</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Income', amount: income },
                  { name: 'Spent', amount: totalSpent },
                  { name: 'Remaining', amount: remaining },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '0.5rem'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="amount" 
                  fill="#f97316" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}