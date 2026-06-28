import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, Shield, Sun, Moon, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../api/axios';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await api.post('/auth/password-reset/', { email });
      setIsSent(true);
      success('Password reset email sent!');
    } catch (err) {
      error('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        darkMode ? 'bg-dark' : 'bg-gradient-to-br from-orange-50 to-white'
      }`}>
        <div className="bg-white dark:bg-secondary rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">Check Your Email</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

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
        <h2 className="text-2xl font-bold text-center text-secondary dark:text-white mb-2">Reset Password</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Enter your email and we'll send you a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-secondary dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
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
            {isLoading ? <LoadingSpinner size="sm" color="white" /> : 'Send Reset Link'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
