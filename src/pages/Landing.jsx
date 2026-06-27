import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, MapPin, Phone, ArrowRight, ExternalLink, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

function Landing() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [stats, setStats] = useState({ reports: 1247, orgs: 89, counties: 47 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-dark dark:to-gray-900 transition-colors duration-300">
        {/* Dark Mode Toggle in Landing */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-secondary shadow-lg hover:shadow-xl transition"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-secondary dark:text-white mb-4">
              AmakaziWatch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Kenya's first crowdsourced GBV awareness, reporting and prevention platform.
            </p>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-lg mx-auto mb-8">
              <div className="flex items-center justify-center gap-2 text-red-700 dark:text-red-400">
                <Phone className="w-5 h-5" />
                <span className="font-bold">Emergency:</span>
                <span className="font-bold text-xl">1195</span>
                <span className="text-sm">(toll-free)</span>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
                <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                  <div className="text-3xl font-bold text-primary">{stats.reports}+</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Reports Filed</div>
                </div>
                <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                  <div className="text-3xl font-bold text-secondary dark:text-white">{stats.orgs}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Active Organizations</div>
                </div>
                <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                  <div className="text-3xl font-bold text-accent">{stats.counties}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Counties Covered</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate('/reports')}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Report Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('/organisations')}
                className="bg-secondary dark:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-dark transition flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Find Help
              </button>
              <button 
                onClick={() => alert('🚨 Emergency alert triggered! Call 1195 for immediate help.')}
                className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition animate-pulse flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                SOS Emergency
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <button onClick={() => navigate('/education')} className="hover:text-primary flex items-center gap-1">
                Learn More <ExternalLink className="w-3 h-3" />
              </button>
              <button onClick={() => navigate('/scorecards')} className="hover:text-primary flex items-center gap-1">
                View Scorecards <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
