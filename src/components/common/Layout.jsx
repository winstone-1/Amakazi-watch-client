import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, User, Settings, Home, FileText, ShieldAlert, FolderLock, Users, Scale, Building2, BookOpen, BarChart3, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

function Layout() {
  const { logout, user } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#FF6B35]" />
            <span className="text-xl font-bold text-[#2C3E50]">AmakaziWatch</span>
          </div>
        </div>
        <nav className="p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-[#FF6B35] transition group"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Nav */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-[#2C3E50] hidden md:block">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-400 hover:text-[#FF6B35] cursor-pointer" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-[#2C3E50]">{user?.username || 'User'}</div>
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
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
