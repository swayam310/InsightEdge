import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Home, 
  UploadCloud, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Mail,
  X,
  FileText,
  User
} from 'lucide-react';

export function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();
  const { user, logoutMutation } = useAuth();
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };
  
  const navItems = [
    { icon: Home, text: 'Dashboard', path: '/' },
    { icon: UploadCloud, text: 'Upload Data', path: '/upload' },
    { icon: Mail, text: 'Contact Us', path: '/contact' },
    { icon: FileText, text: 'About', path: '/about' },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a2e] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
  }`;
  
  const overlayClasses = `fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
    isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;
  
  return (
    <>
      <div className={overlayClasses} onClick={closeMobileMenu}></div>
      
      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
            <h1 className="text-xl font-bold">InsightEdge</h1>
            <button 
              className="lg:hidden text-gray-300 hover:text-white"
              onClick={closeMobileMenu}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* User Info */}
          {user && (
            <div className="px-6 py-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-300" />
                </div>
                <div>
                  <p className="font-medium">{user.name || user.username}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-2 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={closeMobileMenu}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.text}</span>
              </Link>
            ))}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="px-4 py-4 border-t border-gray-700">
            <button
              className="flex items-center w-full px-2 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}