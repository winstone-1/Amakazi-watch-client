import { useTheme } from '../context/ThemeContext';
import { BarChart3, Award, TrendingUp } from 'lucide-react';

function Scorecards() {
  const { darkMode } = useTheme();

  const counties = [
    { name: 'Nairobi', score: 92, rank: 1, change: '+5%' },
    { name: 'Kisumu', score: 85, rank: 2, change: '+3%' },
    { name: 'Mombasa', score: 78, rank: 3, change: '-1%' },
  ];

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-secondary dark:text-white">County Scorecards</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Performance rankings for all counties.</p>

        <div className="space-y-3">
          {counties.map((county, i) => (
            <div key={i} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'} flex justify-between items-center`}>
              <div className="flex items-center gap-3">
                <span className={`text-lg font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-500' : 'text-gray-500'}`}>
                  #{county.rank}
                </span>
                <div>
                  <h3 className="font-semibold text-secondary dark:text-white">{county.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <TrendingUp className={`w-3 h-3 ${county.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={county.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{county.change}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${county.score}%` }} />
                </div>
                <span className="font-bold text-secondary dark:text-white">{county.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Scorecards;
