import { useTheme } from '../context/ThemeContext';

function Dashboard() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome to your AmakaziWatch dashboard.</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Total Reports</h3>
            <p className="text-2xl font-bold text-primary">1,247</p>
          </div>
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Active Cases</h3>
            <p className="text-2xl font-bold text-accent">89</p>
          </div>
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Response Rate</h3>
            <p className="text-2xl font-bold text-primary">94%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
