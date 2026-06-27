import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Users, MessageCircle, UserPlus } from 'lucide-react';

function PeerSupport() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Peer Support</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Connect with trained peer supporters.</p>
        
        <Link
          to="/peer/chat"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          <MessageCircle className="w-5 h-5" />
          Start Chat
        </Link>

        <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Available Supporters
          </h3>
          <p className="text-sm text-green-600 dark:text-green-300 mt-1">
            3 supporters available in your area
          </p>
        </div>
      </div>
    </div>
  );
}

export default PeerSupport;
