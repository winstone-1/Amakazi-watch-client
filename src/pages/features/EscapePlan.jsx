import { useState } from 'react';
import { MapPin, Home, Car, Users, FileText, Download } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

function EscapePlan() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [formData, setFormData] = useState({ county: 'Nairobi', has_children: false });
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePlan = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/safety/escape-plan/', formData);
      setPlan(response.data);
      success('Escape plan generated!');
    } catch (err) {
      error('Failed to generate plan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transition-colors duration-300">
      <div className={`rounded-2xl p-8 backdrop-blur-xl border ${
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-white/20 shadow-xl'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <MapPin className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Escape Plan Generator</h1>
        </div>

        {!plan ? (
          <>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">County</label>
                <select
                  value={formData.county}
                  onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  {['Nairobi', 'Kisumu', 'Mombasa', 'Eldoret', 'Nakuru'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="children"
                  checked={formData.has_children}
                  onChange={(e) => setFormData({ ...formData, has_children: e.target.checked })}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="children" className="text-gray-700 dark:text-gray-300">I have children</label>
              </div>
            </div>
            <button
              onClick={generatePlan}
              disabled={isLoading}
              className="w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
            >
              {isLoading ? 'Generating...' : 'Generate My Escape Plan'}
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className="font-semibold text-secondary dark:text-white mb-3">Your Safe Locations</h3>
              <ul className="space-y-2">
                {plan.safe_locations?.map((loc, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Home className="w-4 h-4 text-primary" />
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <h3 className="font-semibold text-secondary dark:text-white mb-3">Transportation Plan</h3>
              <p className="text-gray-600 dark:text-gray-400">{plan.transportation_plan}</p>
            </div>
            <button
              onClick={() => setPlan(null)}
              className="w-full bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-dark transition"
            >
              Regenerate Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EscapePlan;
