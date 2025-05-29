import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export function RevenueChart({ data }) {
  const [activeData, setActiveData] = useState('monthly');
  
  const periodOptions = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' },
  ];
  
  const chartData = data[activeData] || [];
  
  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };
  
  const formatTooltipValue = (value) => {
    return `$${value.toLocaleString()}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h3 className="text-lg font-semibold">Revenue Trends</h3>
        
        <div className="flex mt-3 md:mt-0 space-x-2">
          {periodOptions.map((option) => (
            <button
              key={option.id}
              className={`px-3 py-1 text-sm rounded-md ${
                activeData === option.id
                  ? 'bg-[#1a1a2e] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveData(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip formatter={formatTooltipValue} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name="Revenue" 
              stroke="#1a1a2e" 
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}