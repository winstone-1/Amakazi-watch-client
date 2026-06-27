import { useTheme } from '../context/ThemeContext';

function Education() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Education</h1>
        <p className="text-gray-500 dark:text-gray-400">Learn about GBV awareness and prevention.</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Articles</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Read educational content</p>
          </div>
          <div className="p-4 bg-light dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-secondary dark:text-white">Videos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Watch awareness videos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
