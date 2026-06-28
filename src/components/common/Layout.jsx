import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, LogOut, Home, FileText, ShieldAlert, 
  FolderLock, Users, Scale, Building2, BookOpen, BarChart3, Bell, Map, CreditCard, UserCircle2,
  Moon, Sun, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import Footer from './Footer';

function Layout() {
  const { logout, user } = useAuth();
  const { success } = useToast();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const handleLogout = () => {
    logout();
    success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard', showFor: 'all' },
    { path: '/reports', icon: FileText, label: 'Reports', showFor: 'all' },
    { path: '/safety', icon: ShieldAlert, label: 'Safety', showFor: ['survivor'] },
    { path: '/vault', icon: FolderLock, label: 'Vault', showFor: ['survivor'] },
    { path: '/peer-support', icon: Users, label: 'Peer Support', showFor: ['survivor', 'counselor'] },
    { path: '/legal-bot', icon: Scale, label: 'Legal Bot', showFor: 'all' },
    { path: '/organisations', icon: Building2, label: 'Organisations', showFor: 'all' },
    { path: '/education', icon: BookOpen, label: 'Education', showFor: 'all' },
    { path: '/org/inventory', icon: FolderLock, label: 'Inventory', showFor: ['org_staff'] },
    { path: '/org/case-matching', icon: Users, label: 'Case Matching', showFor: ['org_staff'] },
    { path: '/campaigns', icon: BarChart3, label: 'Campaigns', showFor: ['org_staff'] },
    { path: '/scorecards', icon: BarChart3, label: 'Scorecards', showFor: ['county_official', 'admin'] },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', showFor: ['county_official', 'admin'] },
    { path: '/heatmap', icon: Map, label: 'Heatmap', showFor: ['county_official', 'admin'] },
    { path: '/admin', icon: Shield, label: 'Admin Panel', showFor: ['admin'] },
    { path: '/subscriptions', icon: CreditCard, label: 'Subscriptions', showFor: 'all' },
  ];

  const role = (user?.role || 'survivor').toString().toLowerCase();
  const filteredNav = navItems.filter(item => 
    item.showFor === 'all' || 
    (Array.isArray(item.showFor) && item.showFor.includes(role))
  );

  const quickActions = [
    { label: 'Report', path: '/reports', icon: FileText },
    { label: 'Safety', path: '/safety', icon: ShieldAlert },
    { label: 'Profile', path: '/profile', icon: UserCircle2 },
  ];

  const roleLabel = (user?.role || 'survivor').toString().toLowerCase();
  const roleBadge = roleLabel.includes('counselor')
    ? 'Counselor'
    : roleLabel.includes('org')
      ? 'Organisation'
      : roleLabel.includes('county')
        ? 'County'
        : roleLabel.includes('admin')
          ? 'Admin'
          : 'Survivor';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300 flex">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 rounded-xl border border-white/70 bg-white/80 p-2.5 shadow-lg backdrop-blur-xl"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={sidebarOpen}
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
            {filteredNav.map((item) => {
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
              <h1 className="hidden text-xl font-semibold text-secondary dark:text-white md:block">{filteredNav.find((item) => location.pathname.startsWith(item.path))?.label || 'Dashboard'}</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 md:flex">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const active = location.pathname === action.path;
                  return (
                    <Link
                      key={action.path}
                      to={action.path}
                      className={`rounded-full px-3 py-2 text-sm font-semibold transition ${active ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-orange-900/20'}`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {action.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <button
                onClick={toggleDarkMode}
                className="rounded-xl p-2.5 transition hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications((value) => !value)}
                  className="rounded-xl border border-slate-200/70 bg-white/70 p-2 text-slate-400 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800/70 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Open notifications"
                  aria-expanded={showNotifications}
                  aria-haspopup="true"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary" aria-label="3 new notifications" />
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-slate-200/70 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/95">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-secondary dark:text-white">Notifications</p>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">3 new</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { title: 'Safety check-in due', detail: 'Your timer window ends in 10 minutes', time: 'Now' },
                        { title: 'New resource added', detail: 'A new shelter was added near you', time: '1h ago' },
                        { title: 'Legal bot reply', detail: 'A new response was posted for your question', time: 'Today' },
                      ].map((item) => (
                        <div key={item.title} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-slate-900/40">
                          <p className="text-sm font-semibold text-secondary dark:text-white">{item.title}</p>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
                          <p className="mt-1 text-xs text-slate-400">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-medium text-secondary dark:text-white">{user?.username || 'User'}</div>
                  <div className="flex items-center justify-end gap-2 text-xs text-slate-400">
                    <span>{roleBadge}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 transition-colors duration-300">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
