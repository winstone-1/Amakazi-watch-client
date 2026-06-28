import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Normalise user objects coming from different API shapes
function normaliseUser(userData) {
  if (!userData) return null;
  return {
    ...userData,
    // Guarantee role is always present and lowercase
    role: (userData.role || 'survivor').toLowerCase().trim(),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
        return normaliseUser(JSON.parse(storedUser));
      }
    } catch (e) {
      localStorage.removeItem('user');
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
        const parsed = normaliseUser(JSON.parse(storedUser));
        setToken(storedToken);
        setUser(parsed);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    try {
      const normalised = normaliseUser(userData);
      console.log('[AuthContext.login] storing user:', normalised);

      setUser(normalised);
      setToken(accessToken);
      setIsAuthenticated(true);
      localStorage.setItem('token', accessToken);
      if (refreshToken) localStorage.setItem('refresh', refreshToken);
      localStorage.setItem('user', JSON.stringify(normalised));
      return true;
    } catch (e) {
      console.error('[AuthContext.login] error:', e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    window.location.replace('/login');
  };

  const updateUser = (updatedData) => {
    const newUser = normaliseUser({ ...user, ...updatedData });
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
