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
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userInfo = await userInfoResponse.json();

        const response = await api.post('/auth/google/', {
          access_token: tokenResponse.access_token,
          user_info: userInfo,
        });

        const { user, access, refresh } = response.data;
        login(user, access, refresh);
        success('Successfully signed in with Google!');
        
        // Use window.location.replace to prevent history issues
        window.location.replace('/dashboard');
      } catch (err) {
        error('Google sign in failed. Please try again.');
        console.error('Google auth error:', err);
        setIsLoading(false);
      }
    },
    onError: () => {
      error('Google sign in cancelled or failed. Please try again.');
      setIsLoading(false);
    },
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
