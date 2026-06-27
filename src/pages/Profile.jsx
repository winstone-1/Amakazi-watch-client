import { useTheme } from '../context/ThemeContext';
import { User, Mail, Phone, MapPin, Shield, Edit, Save, X } from 'lucide-react';

function Profile() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Profile</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Manage your personal information.</p>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input
                type="text"
                value="testuser"
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value="test@amakaziwatch.com"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value="+254712345678"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">County</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                  disabled
                >
                  <option>Nairobi</option>
                  <option>Kisumu</option>
                  <option>Mombasa</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea
              value="Community health worker helping survivors of GBV."
              rows={3}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              disabled
            />
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'}`}>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Role: Survivor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
