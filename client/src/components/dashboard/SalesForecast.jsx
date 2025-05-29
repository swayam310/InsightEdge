import React from 'react';
import { ArrowUp, FileText, RefreshCcw } from 'lucide-react';

export function SalesForecast({ 
  monthlyTarget, 
  currentSales, 
  projectedGrowth,
  onDownloadReport,
  onRefresh
}) {
  const percentComplete = (currentSales / monthlyTarget) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Sales Forecast</h3>
        <div className="flex space-x-2">
          <button 
            onClick={onDownloadReport}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Download report"
          >
            <FileText className="h-5 w-5" />
          </button>
          <button 
            onClick={onRefresh}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Refresh forecast"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Monthly Target</span>
          <span className="text-sm font-medium">${monthlyTarget.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-[#1a1a2e] h-2.5 rounded-full" 
            style={{ width: `${Math.min(percentComplete, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">Current Sales</span>
          <span className="text-sm font-medium">${currentSales.toLocaleString()} ({percentComplete.toFixed(1)}%)</span>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-600 mb-4">Projected Growth</h4>
        <div className="space-y-4">
          {projectedGrowth.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{item.period}</span>
              <span className="flex items-center text-sm font-medium text-green-600">
                <ArrowUp className="h-3 w-3 mr-1" />
                {item.growth}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}