// src/app/components/budgetplanner/budgetList.js
'use client';
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'; 
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function BudgetList({ entries, income, onEdit, onDelete }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });
  const [categorySummary, setCategorySummary] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  // Chart colors
  const categoryColors = {
    Needs: 'rgba(255, 99, 132, 0.7)',
    Wants: 'rgba(54, 162, 235, 0.7)',
    Savings: 'rgba(255, 206, 86, 0.7)',
    Income: 'rgba(75, 192, 192, 0.7)',
  };

  // Calculate spending by category
  useEffect(() => {
    if (!entries || entries.length === 0) return;

    // Group expenses by category
    const categories = {};
    let totalSpent = 0;

    entries.forEach((entry) => {
      const category = entry.category;
      const amount = Number(entry.amount);
      
      if (!categories[category]) {
        categories[category] = 0;
      }
      
      categories[category] += amount;
      totalSpent += amount;
    });

    // Calculate percentages and remaining income
    const remaining = Math.max(0, income - totalSpent);
    
    // Prepare chart data
    const labels = [...Object.keys(categories), 'Remaining'];
    const data = [...Object.values(categories), remaining];
    const backgroundColors = labels.map(
      label => categoryColors[label] || 'rgba(153, 102, 255, 0.7)'
    );

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
          borderWidth: 1,
        },
      ],
    });

    // Set category summary with percentages
    const summary = {};
    for (const [category, amount] of Object.entries(categories)) {
      const percentage = income > 0 ? ((amount / income) * 100).toFixed(1) : 0;
      summary[category] = {
        amount,
        percentage: Number(percentage),
      };
    }

    // Add remaining amount
    summary.Remaining = {
      amount: remaining,
      percentage: income > 0 ? ((remaining / income) * 100).toFixed(1) : 0,
    };

    setCategorySummary(summary);
  }, [entries, income]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = income > 0 ? ((value / income) * 100).toFixed(1) : 0;
            return `${label}: $${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
      
      {/* Chart and Summary Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="h-64">
          {chartData.labels.length > 0 && (
            <Doughnut data={chartData} options={chartOptions} />
          )}
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-lg font-medium mb-2">Category Summary</h3>
          <div className="space-y-2">
            {Object.entries(categorySummary).map(([category, data]) => (
              <div key={category} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: categoryColors[category] || 'rgba(153, 102, 255, 0.7)',
                    }}
                  ></div>
                  <span>{category}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">₹{data.amount.toFixed(2)}</span>
                  <span className="text-gray-500 text-sm ml-1">({data.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses List Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Expenses Detail</h3>
          <button
            onClick={toggleExpand}
            className="text-blue-500 text-sm hover:underline focus:outline-none"
          >
            {isExpanded ? 'Collapse' : 'Expand All'}
          </button>
        </div>

        <div className={`transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-64 overflow-y-auto'}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-right">Amount</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{entry.category}</td>
                  <td className="py-2 text-right">₹{Number(entry.amount).toFixed(2)}</td>
                  <td className="py-2 text-right">

<button
  onClick={() => onEdit(entry)}
  className="text-blue-500 hover:text-blue-700 mr-2 focus:outline-none"
  aria-label="Edit"
>
  <PencilIcon className="w-5 h-5" /> {/* Edit Icon */}
</button>
<button
  onClick={() => onDelete(entry._id)}
  className="text-red-500 hover:text-red-700 focus:outline-none"
  aria-label="Delete"
>
  <TrashIcon className="w-5 h-5" /> {/* Delete Icon */}
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}