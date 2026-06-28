import { useTheme } from '../../context/ThemeContext';

function Subscriptions() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Subscriptions</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Choose a plan that works for you.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-light'} text-center`}>
            <h3 className="font-semibold text-secondary dark:text-white">Free</h3>
            <p className="text-2xl font-bold text-primary mt-2">KES 0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Basic features</p>
          </div>
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-light'} text-center border-2 border-primary`}>
            <h3 className="font-semibold text-secondary dark:text-white">Pro</h3>
            <p className="text-2xl font-bold text-primary mt-2">KES 5,000</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Advanced features</p>
          </div>
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-light'} text-center`}>
            <h3 className="font-semibold text-secondary dark:text-white">Enterprise</h3>
            <p className="text-2xl font-bold text-primary mt-2">KES 20,000</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Full access</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
