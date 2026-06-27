import { useTheme } from '../context/ThemeContext';
import { Building2, Search, MapPin, Star } from 'lucide-react';

function Organisations() {
  const { darkMode } = useTheme();

  const orgs = [
    { name: 'FIDA Kenya', type: 'Legal Aid', county: 'Nairobi', rating: 4.8 },
    { name: 'Women's Rights Initiative', type: 'NGO', county: 'Kisumu', rating: 4.5 },
    { name: 'GBV Recovery Center', type: 'Shelter', county: 'Mombasa', rating: 4.7 },
  ];

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Organisations</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Find verified organisations near you.</p>
        
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search organisations..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
            Search
          </button>
        </div>

        <div className="space-y-4">
          {orgs.map((org, i) => (
            <div key={i} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-secondary dark:text-white">{org.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{org.type}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{org.county}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-secondary dark:text-white">{org.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Organisations;
