import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function TopNav({ title, onMenuClick }) {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="lg:hidden mr-4 text-gray-600 hover:text-gray-900"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-[#1a1a2e] text-white flex items-center justify-center">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.username.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline text-sm font-medium">
              {user?.name || user?.username}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}