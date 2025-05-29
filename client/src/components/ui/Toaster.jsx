import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '../../hooks/useToast';
import { X } from 'lucide-react';

function Toast({ toast, onClose }) {
  const { id, title, description, variant = 'default' } = toast;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000); // Auto dismiss after 5 seconds
    
    return () => clearTimeout(timer);
  }, [id, onClose]);
  
  const variantStyles = {
    default: 'bg-white border-gray-200',
    destructive: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };
  
  return (
    <div 
      className={`max-w-sm w-full rounded-lg shadow-lg border p-4 mb-3 
        ${variantStyles[variant]} 
        transform transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-start">
        <div>
          {title && <h3 className="font-medium text-sm">{title}</h3>}
          {description && <p className="text-sm mt-1 opacity-90">{description}</p>}
        </div>
        <button 
          onClick={() => onClose(id)} 
          className="text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Close</span>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Toaster() {
  const { toasts, removeToast } = useToast();
  
  // Create portal element if it doesn't exist
  useEffect(() => {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    
    return () => {
      const container = document.getElementById('toast-container');
      if (container) {
        document.body.removeChild(container);
      }
    };
  }, []);
  
  const container = document.getElementById('toast-container');
  
  if (!container) return null;
  
  return createPortal(
    <div className="fixed top-0 right-0 p-4 max-h-screen overflow-hidden flex flex-col items-end z-50 pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </div>,
    container
  );
}