import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#1a1a2e]">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another URL.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-[#1a1a2e] text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          <Home className="mr-2 h-5 w-5" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}