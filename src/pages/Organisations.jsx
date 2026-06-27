import { useTheme } from '../context/ThemeContext';

function Organisations() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Organisations</h1>
        <p className="text-gray-500 dark:text-gray-400">Find verified organisations near you.</p>
        
        <div className="mt-4 p-4 bg-light dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Search and connect with support organisations.</p>
        </div>
      </div>
    </div>
  );
}

export default Organisations;
