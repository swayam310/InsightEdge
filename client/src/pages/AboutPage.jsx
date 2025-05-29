import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNav } from '../components/layout/TopNav';
import { Info, TrendingUp, FileText, Shield } from 'lucide-react';

export default function AboutPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const handleMenuClick = () => {
    setIsMobileOpen(true);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="About InsightEdge" onMenuClick={handleMenuClick} />
        
        <main className="flex-1 overflow-y-auto bg-neutral-100 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="bg-[#1a1a2e] text-white p-8 rounded-lg mb-8">
              <h1 className="text-3xl font-bold mb-4">Welcome to InsightEdge</h1>
              <p className="text-lg mb-6">
                InsightEdge is a comprehensive financial data analysis platform designed to help businesses make
                data-driven decisions by visualizing and analyzing their sales and financial data.
              </p>
              
              <div className="flex items-center">
                <a href="/contact" className="bg-white text-[#1a1a2e] px-6 py-2 rounded-md font-medium">
                  Contact Us
                </a>
              </div>
            </div>
            
            {/* Key Features */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Info className="h-6 w-6 mr-2" />
                Key Features
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                  <TrendingUp className="h-10 w-10 text-[#1a1a2e] mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Data Visualization</h3>
                  <p className="text-gray-600">
                    Transform your raw financial data into intuitive charts and graphs that make it easy to spot trends, patterns, and outliers.
                  </p>
                </div>
                
                <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                  <FileText className="h-10 w-10 text-[#1a1a2e] mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Multiple Data Formats</h3>
                  <p className="text-gray-600">
                    Upload and analyze data from various file formats including CSV, Excel, and JSON, or enter data manually through our intuitive interface.
                  </p>
                </div>
                
                <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                  <Shield className="h-10 w-10 text-[#1a1a2e] mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
                  <p className="text-gray-600">
                    Rest easy knowing your data is protected with our robust authentication system, ensuring only authorized users can access your information.
                  </p>
                </div>
                
                <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                  <TrendingUp className="h-10 w-10 text-[#1a1a2e] mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Sales Forecasting</h3>
                  <p className="text-gray-600">
                    Use historical data to predict future sales trends, helping you make informed decisions about inventory, staffing, and budgeting.
                  </p>
                </div>
              </div>
            </div>
            
            {/* About Us */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">About Us</h2>
              
              <p className="mb-4">
                InsightEdge was founded in 2023 with a mission to make financial data analysis accessible to businesses of all sizes. 
                We believe that data-driven decision making should not be limited to large corporations with extensive resources.
              </p>
              
              <p className="mb-4">
                Our team consists of experienced data scientists, financial analysts, and software developers who understand the challenges businesses face when trying to make sense of their financial data.
              </p>
              
              <p>
                We've designed InsightEdge to be intuitive, powerful, and flexible, allowing you to gain valuable insights from your data without requiring specialized technical knowledge.
              </p>
            </div>
            
            {/* How It Works */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">How It Works</h2>
              
              <ol className="list-decimal list-inside space-y-4 ml-4">
                <li className="pl-2">
                  <span className="font-medium">Upload your data</span>
                  <p className="text-gray-600 mt-1 ml-6">
                    Import your financial data through our file upload system or enter it manually using our data entry forms.
                  </p>
                </li>
                
                <li className="pl-2">
                  <span className="font-medium">Visualize and analyze</span>
                  <p className="text-gray-600 mt-1 ml-6">
                    Access your personalized dashboard to view interactive charts and graphs that highlight key metrics and trends.
                  </p>
                </li>
                
                <li className="pl-2">
                  <span className="font-medium">Generate forecasts</span>
                  <p className="text-gray-600 mt-1 ml-6">
                    Use our sales forecasting tools to predict future performance based on historical data.
                  </p>
                </li>
                
                <li className="pl-2">
                  <span className="font-medium">Make informed decisions</span>
                  <p className="text-gray-600 mt-1 ml-6">
                    Leverage the insights from your data to optimize inventory, pricing, marketing strategies, and more.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}