import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Shield, LogOut, User, Settings, Home, FileText, ShieldAlert, 
  FolderLock, Users, Scale, Building2, BookOpen, BarChart3, Bell,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/reports', icon: FileText, label: 'Reports' },
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
      <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300 flex">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-secondary rounded-lg shadow-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <aside className={`
          fixed md:relative z-40 w-64 bg-white dark:bg-secondary shadow-lg border-r border-gray-200 dark:border-gray-700 
          transition-transform duration-300 h-screen
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-secondary dark:text-white">AmakaziWatch</span>
            </div>
          </div>
          <nav className="p-2 overflow-y-auto h-[calc(100vh-80px)]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-primary transition group"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Nav */}
          <header className="bg-white dark:bg-secondary shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-secondary dark:text-white hidden md:block">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <Bell className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-secondary dark:text-white">{user?.username || 'User'}</div>
                  <div className="text-xs text-gray-400">{user?.role || 'Survivor'}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
