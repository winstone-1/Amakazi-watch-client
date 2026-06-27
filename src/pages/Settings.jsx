import { useTheme } from '../context/ThemeContext';
import { Settings as SettingsIcon, Moon, Sun, Globe, Bell, Shield } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <SettingsIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">Settings</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Personalize the experience and stay in control of your privacy.</p>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-3">
        {[
          { label: 'Dark Mode', icon: darkMode ? Moon : Sun, value: darkMode ? 'On' : 'Off', action: toggleDarkMode, accent: darkMode ? 'text-yellow-400' : 'text-slate-600' },
          { label: 'Language', icon: Globe, value: 'English', action: null, accent: 'text-sky-500' },
          { label: 'Notifications', icon: Bell, value: 'Enabled', action: null, accent: 'text-violet-500' },
          { label: '2FA Security', icon: Shield, value: 'Enable', action: null, accent: 'text-emerald-500' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard key={item.label} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-2xl bg-white/70 p-2 dark:bg-slate-800/70 ${item.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-secondary dark:text-white">{item.label}</span>
              </div>
              {item.action ? (
                <button onClick={item.action} className={`rounded-full px-4 py-2 text-sm font-semibold ${darkMode ? 'bg-yellow-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {item.value}
                </button>
              ) : (
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.value}</span>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;
