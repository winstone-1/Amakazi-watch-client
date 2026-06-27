import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { 
  User, Mail, Phone, MapPin, Shield, Edit, Save, X, 
  Award, Calendar, Clock, FileText, Users, Settings,
  AlertCircle, CheckCircle, Building2, Scale
} from 'lucide-react';
import api from '../api/axios';

function Profile() {
  const { user, token } = useAuth();
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    county: '',
    bio: '',
    role: 'survivor',
  });
  const [stats, setStats] = useState({
    reports: 0,
    peerSessions: 0,
    legalQueries: 0,
    workshops: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile/');
      setProfile(response.data);
      
      // Fetch stats based on role
      const statsResponse = await api.get('/profile/stats/');
      setStats(statsResponse.data);
    } catch (err) {
      // Fallback to localStorage data
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      setProfile({
        username: storedUser.username || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        county: storedUser.county || '',
        bio: storedUser.bio || '',
        role: storedUser.role || 'survivor',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.patch('/profile/', profile);
      success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      error('Failed to update profile');
    }
  };

  const getRoleBadge = () => {
    const badges = {
      survivor: { color: 'bg-blue-500', label: 'Survivor' },
      counselor: { color: 'bg-green-500', label: 'Counselor' },
      org_staff: { color: 'bg-purple-500', label: 'Org Staff' },
      county_official: { color: 'bg-orange-500', label: 'County Official' },
      admin: { color: 'bg-red-500', label: 'Admin' },
    };
    return badges[profile.role] || badges.survivor;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const roleBadge = getRoleBadge();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center`}>
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary dark:text-white">
                {profile.username}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full text-white ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Member since {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              isEditing
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-primary text-white hover:bg-orange-600'
            }`}
          >
            {isEditing ? <X className="w-4 h-4 inline mr-1" /> : <Edit className="w-4 h-4 inline mr-1" />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <FileText className="w-5 h-5 text-primary mb-1" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Reports</p>
            <p className="text-xl font-bold text-secondary dark:text-white">{stats.reports}</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <Users className="w-5 h-5 text-green-500 mb-1" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Peer Sessions</p>
            <p className="text-xl font-bold text-secondary dark:text-white">{stats.peerSessions}</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <Scale className="w-5 h-5 text-blue-500 mb-1" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Legal Queries</p>
            <p className="text-xl font-bold text-secondary dark:text-white">{stats.legalQueries}</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <Award className="w-5 h-5 text-purple-500 mb-1" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Workshops</p>
            <p className="text-xl font-bold text-secondary dark:text-white">{stats.workshops}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({...profile, username: e.target.value})}
                disabled={!isEditing}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-200'
                } ${isEditing ? 'focus:ring-2 focus:ring-primary' : 'opacity-70'} focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200'
                  } ${isEditing ? 'focus:ring-2 focus:ring-primary' : 'opacity-70'} focus:outline-none`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200'
                  } ${isEditing ? 'focus:ring-2 focus:ring-primary' : 'opacity-70'} focus:outline-none`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                County
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={profile.county}
                  onChange={(e) => setProfile({...profile, county: e.target.value})}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200'
                  } ${isEditing ? 'focus:ring-2 focus:ring-primary' : 'opacity-70'} focus:outline-none`}
                >
                  <option value="">Select County</option>
                  {['Nairobi', 'Kisumu', 'Mombasa', 'Eldoret', 'Nakuru', 'Kiambu', 'Thika'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-200'
              } ${isEditing ? 'focus:ring-2 focus:ring-primary' : 'opacity-70'} focus:outline-none`}
              placeholder="Tell us about yourself..."
            />
          </div>

          {isEditing && (
            <button
              onClick={handleUpdate}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          )}
        </div>

        {/* Role-specific features */}
        {profile.role === 'counselor' && (
          <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Counselor Features
            </h3>
            <p className="text-sm text-green-600 dark:text-green-300 mt-1">
              You have access to manage peer support sessions and view survivor reports.
            </p>
          </div>
        )}

        {profile.role === 'org_staff' && (
          <div className="mt-6 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Organization Staff Features
            </h3>
            <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">
              Manage resource inventory, view case matching, and create campaigns.
            </p>
          </div>
        )}

        {profile.role === 'county_official' && (
          <div className="mt-6 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
            <h3 className="font-semibold text-orange-700 dark:text-orange-400 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              County Official Features
            </h3>
            <p className="text-sm text-orange-600 dark:text-orange-300 mt-1">
              Access county scorecards, analytics, and intelligence API keys.
            </p>
          </div>
        )}

        {profile.role === 'admin' && (
          <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <h3 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Admin Features
            </h3>
            <p className="text-sm text-red-600 dark:text-red-300 mt-1">
              Full access to all features including user management and content moderation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
