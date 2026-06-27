import { useTheme } from '../../context/ThemeContext';

function CaseMatching() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className={`rounded-2xl p-8 backdrop-blur-xl border ${
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-white/20 shadow-xl'
      }`}>
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-4">CaseMatching</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">This is the CaseMatching feature page.</p>
        <div className={`p-6 rounded-xl ${
          darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <p className="text-gray-600 dark:text-gray-400">Feature coming soon. Check back later.</p>
        </div>
      </div>
    </div>
  );
}

export default CaseMatching;
