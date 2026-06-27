import { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const showToast = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    loading: (message) => toast.loading(message),
    dismiss: (toastId) => toast.dismiss(toastId),
    custom: (message, options) => toast(message, options),
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#2C3E50',
            color: '#fff',
          },
          success: {
            style: {
              background: '#27AE60',
            },
          },
          error: {
            style: {
              background: '#e74c3c',
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
