import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Shield, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useGoogleAuth } from '../context/GoogleAuthContext';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../api/axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { success, error } = useToast();
  const { googleLogin, isLoading: googleLoading } = useGoogleAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post('/auth/token/', {
        username: email,
        password: password,
      });
      const { access, refresh, user } = response.data;
      login(user, access, refresh);
      success('Welcome back!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      error('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      darkMode ? 'bg-dark' : 'bg-gradient-to-br from-orange-50 to-white'
    }`}>
      <div className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center text-secondary dark:text-white mb-2">Welcome Back</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Sign in to your AmakaziWatch account</p>

        <button
          onClick={() => googleLogin()}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition mb-4 disabled:opacity-50"
        >
          {googleLoading ? <LoadingSpinner size="sm" /> : <><Chrome className="w-5 h-5" /> Sign in with Google</>}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300 dark:border-gray-600"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-secondary text-gray-500 dark:text-gray-400">or continue with email</span></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email or Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-secondary dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email or username"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-secondary dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <LoadingSpinner size="sm" color="white" /> : 'Sign In'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/register" className="text-sm text-primary hover:underline">Don't have an account? Register</Link>
        </div>
        <div className="mt-2 text-center">
          <Link to="/reset-password" className="text-sm text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-white">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
