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
        const userInfo = await userInfoResponse.json();

        // Send to your backend
        const response = await api.post('/auth/google/', {
          access_token: tokenResponse.access_token,
          user_info: userInfo,
        });

        const { user, access, refresh } = response.data;
        
        // Save to localStorage
        localStorage.setItem('token', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update auth context
        login(user, access, refresh);
        
        success('Successfully signed in with Google!');
        
        // Navigate to dashboard
        window.location.href = '/dashboard';
      } catch (err) {
        error('Google sign in failed. Please try again.');
        console.error('Google auth error:', err);
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error:', errorResponse);
      error('Google sign in cancelled or failed. Please try again.');
      setIsLoading(false);
    },
    // Use popup mode - this avoids redirect URI issues
    flow: 'popup',
  });

  return (
    <GoogleAuthContext.Provider value={{ googleLogin, isLoading }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  return useContext(GoogleAuthContext);
}
