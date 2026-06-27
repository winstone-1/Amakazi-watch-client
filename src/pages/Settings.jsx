import { useTheme } from '../context/ThemeContext';
import { Settings as SettingsIcon, Moon, Sun, Globe, Bell, Shield } from 'lucide-react';

function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Settings</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Application settings and preferences.</p>

        <div className="space-y-3">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-yellow-400" /> : <Sun className="w-5 h-5 text-gray-600" />}
              <span className="text-secondary dark:text-white">Dark Mode</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                darkMode ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {darkMode ? 'On' : 'Off'}
            </button>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-500" />
              <span className="text-secondary dark:text-white">Language</span>
            </div>
            <select className={`px-4 py-2 rounded-lg border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-primary`}>
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-purple-500" />
              <span className="text-secondary dark:text-white">Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-secondary dark:text-white">2FA Security</span>
            </div>
            <button className="text-primary font-medium hover:underline text-sm">Enable</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
