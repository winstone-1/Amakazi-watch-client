import { useTheme } from '../../context/ThemeContext';

function Heatmap() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Heatmap</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">County report density and organization locations.</p>
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-light'} flex items-center justify-center h-64`}>
          <p className="text-gray-500 dark:text-gray-400">Map loading...</p>
        </div>
      </div>
    </div>
  );
}

export default Heatmap;
