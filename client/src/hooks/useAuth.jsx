import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import api from '../utils/api';
import { useToast } from './useToast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  
  // Query to get current user
  const { data, error, isLoading, refetch } = useQuery(
    'currentUser',
    async () => {
      try {
        const response = await api.get('/auth/user');
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        throw error;
      }
    },
    {
      retry: false,
      onSuccess: (data) => {
        setUser(data);
      }
    }
  );
  
  // Login mutation
  const loginMutation = useMutation(
    async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setUser(data);
        toast({
          title: "Login successful",
          description: `Welcome back, ${data.username}!`,
          variant: "success"
        });
      },
      onError: (error) => {
        toast({
          title: "Login failed",
          description: error.response?.data?.message || error.message,
          variant: "destructive",
        });
      }
    }
  );
  
  // Register mutation
  const registerMutation = useMutation(
    async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setUser(data);
        toast({
          title: "Registration successful",
          description: `Welcome to InsightEdge, ${data.username}!`,
          variant: "success"
        });
      },
      onError: (error) => {
        toast({
          title: "Registration failed",
          description: error.response?.data?.message || error.message,
          variant: "destructive",
        });
      }
    }
  );
  
  // Logout mutation
  const logoutMutation = useMutation(
    async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    },
    {
      onSuccess: () => {
        setUser(null);
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        });
      },
      onError: (error) => {
        toast({
          title: "Logout failed",
          description: error.response?.data?.message || error.message,
          variant: "destructive",
        });
      }
    }
  );
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        registerMutation,
        logoutMutation,
        refetchUser: refetch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}