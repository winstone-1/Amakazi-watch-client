import { useTheme } from '../context/ThemeContext';

function Safety() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Safety</h1>
        <p className="text-gray-500 dark:text-gray-400">Safety tools and emergency resources.</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Safety Timer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Set a safety check-in timer</p>
          </div>
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Safe Word</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your safe word</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Safety;
