import React, { createContext, useContext, useEffect } from 'react';
import { useStore } from '../store/store';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, token, role, is2faVerified, setAuth, clearAuth, set2faVerified } = useStore();

  const isAuthenticated = !!token && (!user || is2faVerified);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        is2faVerified,
        isAuthenticated,
        login: setAuth,
        logout: clearAuth,
        verify2FAStatus: set2faVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
