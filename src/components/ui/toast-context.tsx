"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';
import ToastContainer from './toast';

type ToastType = 'success' | 'error' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: Omit<Toast, 'id'> }
  | { type: 'DISMISS_TOAST'; payload: string };

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, { ...action.payload, id: Math.random().toString(36).substr(2, 9) }];
    case 'DISMISS_TOAST':
      return state.filter(toast => toast.id !== action.payload);
    default:
      return state;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = (message: string, type: ToastType) => {
    dispatch({ type: 'ADD_TOAST', payload: { message, type } });
  };

  const dismissToast = (id: string) => {
    dispatch({ type: 'DISMISS_TOAST', payload: id });
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onDismiss={dismissToast} 
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}