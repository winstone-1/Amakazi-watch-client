import { useTheme } from '../context/ThemeContext';
import { Shield, Users, FileText, Building2, Settings } from 'lucide-react';

function Admin() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Admin Panel</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Manage users, reports, and organisations.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} hover:shadow-md transition cursor-pointer`}>
            <Users className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-semibold text-secondary dark:text-white">Users</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage user accounts</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} hover:shadow-md transition cursor-pointer`}>
            <FileText className="w-6 h-6 text-orange-500 mb-2" />
            <h3 className="font-semibold text-secondary dark:text-white">Reports</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Moderate reports</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} hover:shadow-md transition cursor-pointer`}>
            <Building2 className="w-6 h-6 text-purple-500 mb-2" />
            <h3 className="font-semibold text-secondary dark:text-white">Organisations</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Verify organisations</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} hover:shadow-md transition cursor-pointer`}>
            <Settings className="w-6 h-6 text-gray-500 mb-2" />
            <h3 className="font-semibold text-secondary dark:text-white">Settings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">System settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
