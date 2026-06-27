import { useState, useEffect } from 'react';
import { Shield, Users, MapPin, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

function Landing() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ reports: 1247, orgs: 89, counties: 47 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with actual API call to /api/reports/stats/
        // const response = await fetch('/api/reports/stats/');
        // const data = await response.json();
        // setStats(data);
        setTimeout(() => setLoading(false), 800);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-[#FF6B35]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#2C3E50] mb-4">
            AmakaziWatch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Kenya's first crowdsourced GBV awareness, reporting and prevention platform.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-lg mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 text-red-700">
              <Phone className="w-5 h-5" />
              <span className="font-bold">Emergency:</span>
              <span className="font-bold text-xl">1195</span>
              <span className="text-sm">(toll-free)</span>
            </div>
          </div>

          {/* Stats */}
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-3xl font-bold text-[#FF6B35]">{stats.reports}+</div>
                <div className="text-gray-500 text-sm">Reports Filed</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-3xl font-bold text-[#2C3E50]">{stats.orgs}</div>
                <div className="text-gray-500 text-sm">Active Organizations</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-3xl font-bold text-[#27AE60]">{stats.counties}</div>
                <div className="text-gray-500 text-sm">Counties Covered</div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/reports')}
              className="bg-[#FF6B35] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition flex items-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Report Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/organisations')}
              className="bg-[#2C3E50] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1A2A3A] transition flex items-center gap-2"
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

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <button 
              onClick={() => navigate('/education')}
              className="hover:text-[#FF6B35] flex items-center gap-1"
            >
              Learn More <ExternalLink className="w-3 h-3" />
            </button>
            <button 
              onClick={() => navigate('/scorecards')}
              className="hover:text-[#FF6B35] flex items-center gap-1"
            >
              View Scorecards <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
