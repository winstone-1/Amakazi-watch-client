import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, LogOut, Home, FileText, ShieldAlert, 
  FolderLock, Users, Scale, Building2, BookOpen, BarChart3, Bell, Map,
  Moon, Sun, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

function Layout() {
  const { logout, user } = useAuth();
  const { success } = useToast();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/heatmap', icon: Map, label: 'Heatmap' },
    { path: '/safety', icon: ShieldAlert, label: 'Safety' },
    { path: '/vault', icon: FolderLock, label: 'Vault' },
    { path: '/peer-support', icon: Users, label: 'Peer Support' },
    { path: '/legal-bot', icon: Scale, label: 'Legal Bot' },
    { path: '/organisations', icon: Building2, label: 'Organisations' },
    { path: '/education', icon: BookOpen, label: 'Education' },
    { path: '/scorecards', icon: BarChart3, label: 'Scorecards' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300 flex">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 rounded-xl border border-white/70 bg-white/80 p-2.5 shadow-lg backdrop-blur-xl"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-secondary" /> : <Menu className="w-6 h-6 text-secondary" />}
        </button>

        <aside className={`
          fixed md:relative z-40 w-64 rounded-r-[28px] border-r border-white/70 bg-white/70 shadow-[20px_0_60px_-30px_rgba(15,23,42,0.3)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/70
          transition-transform duration-300 h-screen
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="border-b border-slate-200/70 p-4 dark:border-white/10">
            <div className="flex items-center gap-2">
              <div className="rounded-2xl bg-primary/10 p-2">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <span className="text-lg font-bold text-secondary dark:text-white">AmakaziWatch</span>
            </div>
          </div>
          <nav className="h-[calc(100vh-84px)] overflow-y-auto p-3">
            {navItems.map((item) => {
              const active = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-slate-600 hover:bg-orange-50 hover:text-primary dark:text-slate-300 dark:hover:bg-orange-900/20'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/70 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/70 md:px-6">
            <div className="flex items-center gap-4">
              <h1 className="hidden text-xl font-semibold text-secondary dark:text-white md:block">{navItems.find((item) => location.pathname.startsWith(item.path))?.label || 'Dashboard'}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="rounded-xl p-2.5 transition hover:bg-slate-100 dark:hover:bg-slate-700"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <div className="rounded-xl border border-slate-200/70 bg-white/70 p-2 text-slate-400 dark:border-white/10 dark:bg-slate-800/70">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-medium text-secondary dark:text-white">{user?.username || 'User'}</div>
                  <div className="text-xs text-slate-400">{user?.role || 'Survivor'}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 transition-colors duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
