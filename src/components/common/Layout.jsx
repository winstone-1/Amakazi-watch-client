import { Outlet, Link } from 'react-router-dom';

function Layout() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="text-xl font-bold text-[#FF6B35]">AmakaziWatch</Link>
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-sm text-gray-600 hover:text-[#FF6B35]">Profile</Link>
              <button onClick={handleLogout} className="bg-[#2C3E50] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1A2A3A]">Logout</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
