import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../utils/api';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNav } from '../components/layout/TopNav';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { SalesForecast } from '../components/dashboard/SalesForecast';
import { FileUpload } from '../components/ui/FileUpload';
import { 
  DollarSign, 
  ShoppingCart, 
  CreditCard, // Using CreditCard instead of Receipt 
  TrendingUp,
  FileDown,
  Keyboard
} from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery('dashboardData', async () => {
    try {
      const response = await api.get('/data/dashboard');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  });

  const handleMenuClick = () => {
    setIsMobileOpen(true);
  };

  const handleManualDataClick = () => {
    navigate('/upload');
  };

  const handleFileUpload = (data) => {
    toast({
      title: "Upload successful",
      description: `${data.count} records have been uploaded.`,
      variant: "success"
    });
  };

  const handleDownloadTemplateClick = () => {
    toast({
      title: "Template downloaded",
      description: "The financial data template has been downloaded.",
    });
  };

  const handleViewAllTransactions = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in a future update.",
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Generation",
      description: "Your forecast report is being generated. It will be available for download shortly.",
    });
  };

  const handleRefreshForecast = () => {
    toast({
      title: "Forecast Refreshed",
      description: "The sales forecast has been updated with the latest data.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const {
    totalRevenue = 0,
    totalSales = 0,
    avgOrderValue = 0,
    categoryData = [],
    revenueData = { monthly: [], quarterly: [], yearly: [] },
    recentTransactions = []
  } = dashboardData || {};

  // Sample data for forecast (in a real app, this would come from the backend)
  const forecastGrowth = [
    { period: 'Next Month', growth: 12.4 },
    { period: 'Q3 2023', growth: 18.7 },
    { period: 'Year End', growth: 22.1 },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="Dashboard" onMenuClick={handleMenuClick} />

        <main className="flex-1 overflow-y-auto bg-neutral-100 p-6">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Revenue"
              value={`$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              changeValue={12.5}
              compareText="vs last month"
              icon={<DollarSign className="h-5 w-5" />}
            />
            <StatCard
              title="Total Sales"
              value={totalSales.toString()}
              changeValue={8.2}
              compareText="vs last month"
              icon={<ShoppingCart className="h-5 w-5" />}
            />
            <StatCard
              title="Average Order"
              value={`$${avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              changeValue={-2.4}
              compareText="vs last month"
              icon={<CreditCard className="h-5 w-5" />}
            />
            <StatCard
              title="Profit Margin"
              value="32.8%"
              changeValue={5.1}
              compareText="vs last month"
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>

          {/* Upload Data Card */}
          <div className="mb-6">
            <FileUpload onSuccess={handleFileUpload}>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-2">
                    <Keyboard className="text-[#1a1a2e] mr-2 h-4 w-4" />
                    <h3 className="font-medium">Manual Data Entry</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Prefer to enter data manually? Use our form-based input option.</p>
                  <button
                    onClick={handleManualDataClick}
                    className="text-sm px-3 py-1.5 bg-[#1a1a2e] text-white rounded-md hover:bg-opacity-90 transition"
                  >
                    Enter Data Manually
                  </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-2">
                    <FileDown className="text-[#1a1a2e] mr-2 h-4 w-4" />
                    <h3 className="font-medium">Download Templates</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Use our ready-made templates for easy data formatting.</p>
                  <button
                    onClick={handleDownloadTemplateClick}
                    className="text-sm px-3 py-1.5 bg-[#1a1a2e] text-white rounded-md hover:bg-opacity-90 transition"
                  >
                    Get Templates
                  </button>
                </div>
              </div>
            </FileUpload>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RevenueChart data={revenueData} />
            </div>
            <div>
              <CategoryChart data={categoryData.map((item, index) => ({
                ...item,
                color: ['#1a1a2e', '#ffff00', '#6c757d', '#adb5bd'][index % 4]
              }))} />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentTransactions
                transactions={recentTransactions}
                onViewAll={handleViewAllTransactions}
              />
            </div>
            <div>
              <SalesForecast
                monthlyTarget={35000}
                currentSales={29750}
                projectedGrowth={forecastGrowth}
                onDownloadReport={handleDownloadReport}
                onRefresh={handleRefreshForecast}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}