import React, { createContext, useContext, useReducer } from 'react';

// Create a context
const ToastContext = createContext(undefined);

// Actions
const ADD_TOAST = 'ADD_TOAST';
const REMOVE_TOAST = 'REMOVE_TOAST';

// Generate unique ID for toasts
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// Initial state
const initialState = {
  toasts: [],
};

// Reducer function
function toastReducer(state, action) {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, { id: generateUniqueId(), ...action.toast }],
      };
      
    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      };
      
    default:
      return state;
  }
}

// Provider component
export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  
  const toast = (props) => {
    dispatch({ type: ADD_TOAST, toast: props });
  };
  
  const removeToast = (id) => {
    dispatch({ type: REMOVE_TOAST, id });
  };
  
  return (
    <ToastContext.Provider value={{ ...state, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

// Hook to use toast context
export function useToast() {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
}