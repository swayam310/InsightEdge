import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const { loginMutation, registerMutation, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      loginMutation.mutate({ username, password });
    } else {
      registerMutation.mutate({ username, password, email, name });
    }
  };
  
  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">
            {isLogin ? 'Login to InsightEdge' : 'Register New Account'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block mb-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <label className="block mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full p-2 bg-[#1a1a2e] text-white rounded"
              disabled={loginMutation.isLoading || registerMutation.isLoading}
            >
              {(loginMutation.isLoading || registerMutation.isLoading) ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Login' : 'Register'
              )}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#1a1a2e] underline"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block md:w-1/2 bg-[#1a1a2e] text-white p-8">
        <div className="h-full flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">InsightEdge</h2>
          <p className="text-xl mb-6">Business Financial Data Analyzer</p>
          <ul className="list-disc list-inside space-y-2 mb-8">
            <li>Upload financial data (CSV, Excel, JSON)</li>
            <li>Visualize sales trends and patterns</li>
            <li>Generate reports and forecasts</li>
            <li>Make data-driven business decisions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}