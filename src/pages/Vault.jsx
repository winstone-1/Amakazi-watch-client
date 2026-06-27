import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FolderLock, Upload, FileText, Image, Video } from 'lucide-react';

function Vault() {
  const { darkMode } = useTheme();

  return (
    <div className="transition-colors duration-300">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <FolderLock className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Document Vault</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Secure encrypted evidence storage.</p>
        
        <Link
          to="/vault/documents"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          <Upload className="w-5 h-5" />
          Upload Evidence
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'}`}>
            <Image className="w-5 h-5 text-blue-500 mb-2" />
            <h3 className="font-semibold text-secondary dark:text-white">Images</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">0 documents</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'}`}>
            <Video className="w-5 h-5 text-red-500 mb-2" />
            <h3 className="font-semibold text-secondary dark:text-white">Videos</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">0 documents</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-light'}`}>
            <FileText className="w-5 h-5 text-green-500 mb-2" />
            <h3 className="font-semibold text-secondary dark:text-white">Documents</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">0 documents</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vault;
