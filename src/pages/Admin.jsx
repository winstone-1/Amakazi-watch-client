import { useTheme } from '../context/ThemeContext';

function Admin() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Admin Panel</h1>
        <p className="text-gray-500 dark:text-gray-400">Admin dashboard with user and content management.</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Users</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage user accounts</p>
          </div>
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Reports</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Moderate reports</p>
          </div>
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Organisations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Verify organisations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
