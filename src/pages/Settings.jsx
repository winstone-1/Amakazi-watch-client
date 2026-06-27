import { useTheme } from '../context/ThemeContext';

function Settings() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Application settings and preferences.</p>
        
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg flex items-center justify-between">
            <span className="text-secondary dark:text-white">Dark Mode</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Toggle in header</span>
          </div>
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg flex items-center justify-between">
            <span className="text-secondary dark:text-white">Language</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">English / Swahili</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
