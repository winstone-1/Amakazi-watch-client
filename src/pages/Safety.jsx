import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Clock, Key, Shield, MapPin } from 'lucide-react';

function Safety() {
  const { darkMode } = useTheme();

  const safetyFeatures = [
    { path: '/safety/timer', icon: Clock, label: 'Safety Timer', desc: 'Set a check-in timer' },
    { path: '/safety/safe-word', icon: Key, label: 'Safe Word', desc: 'Manage your safe word' },
    { path: '/safety/risk-assessment', icon: Shield, label: 'Risk Assessment', desc: 'Evaluate your situation' },
    { path: '/safety/escape-plan', icon: MapPin, label: 'Escape Plan', desc: 'Create an exit strategy' },
  ];

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-secondary dark:text-white mb-2">Safety Tools</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Emergency resources and safety planning.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyFeatures.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className={`p-4 rounded-lg transition hover:scale-105 ${
                darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-light hover:bg-gray-200'
              }`}
            >
              <feature.icon className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-secondary dark:text-white">{feature.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Safety;
