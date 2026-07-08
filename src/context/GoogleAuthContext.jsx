import { createContext, useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import api from '../api/axios';

const GoogleAuthContext = createContext();

export function GoogleAuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        if (!userInfoResponse.ok) {
          throw new Error('Failed to fetch user info from Google');
        }
        
        const userInfo = await userInfoResponse.json();

        // Send to your backend
        const response = await api.post('/auth/google/', {
          access_token: tokenResponse.access_token,
          user_info: userInfo,
        });

        const { user, access, refresh } = response.data;
        
        // Save to localStorage and update auth context
        login(user, access, refresh);
        
        success('Successfully signed in with Google! 🎉');
        
        // Navigate to dashboard
        window.location.href = '/dashboard';
      } catch (err) {
        console.error('Google auth error:', err);
        const errorMessage = err.response?.data?.detail || err.message || 'Google sign in failed. Please try again.';
        error(errorMessage);
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error:', errorResponse);
      if (errorResponse.error === 'popup_closed_by_user') {
        error('Login cancelled. Please try again.');
      } else {
        error('Google sign in failed. Please try again.');
      }
      setIsLoading(false);
    },
    flow: 'popup',
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <GoogleAuthContext.Provider value={{ googleLogin: handleGoogleLogin, isLoading }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
}
