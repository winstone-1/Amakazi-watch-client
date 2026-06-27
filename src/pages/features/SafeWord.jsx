import { useState } from 'react';
import { Shield, Key, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

function SafeWord() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [safeWord, setSafeWord] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSave = async () => {
    if (!safeWord.trim()) {
      error('Please enter a safe word');
      return;
    }
    try {
      await api.post('/safety/safe-word/', { code_word: safeWord });
      setIsActive(true);
      success('Safe word saved successfully!');
    } catch (err) {
      error('Failed to save safe word');
    }
  };

  const handleTrigger = async () => {
    try {
      await api.post('/safety/safe-word/trigger/', { location: 'Current location' });
      success('🚨 Safe word alert triggered! Help is on the way.');
    } catch (err) {
      error('Failed to trigger alert');
    }
  };

  return (
    <div className="transition-colors duration-300">
      <div className={`rounded-2xl p-8 backdrop-blur-xl border ${
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-white/20 shadow-xl'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-purple-500/10">
            <Key className="w-6 h-6 text-purple-500" />
          </div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Safe Word</h1>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Secret Safe Word
          </label>
          <input
            type="text"
            value={safeWord}
            onChange={(e) => setSafeWord(e.target.value)}
            disabled={isActive}
            className={`w-full px-4 py-3 rounded-xl border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-primary`}
            placeholder="Enter a word only you know..."
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Use this word to silently alert emergency contacts
          </p>
        </div>

        {!isActive ? (
          <button
            onClick={handleSave}
            className="w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Save Safe Word
          </button>
        ) : (
          <div className="space-y-3">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border border-green-200 dark:border-green-800`}>
              <p className="text-green-700 dark:text-green-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safe word is active: <strong>{safeWord}</strong>
              </p>
            </div>
            <button
              onClick={handleTrigger}
              className="w-full bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 animate-pulse"
            >
              <AlertTriangle className="w-5 h-5" />
              Trigger Emergency Alert
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SafeWord;
