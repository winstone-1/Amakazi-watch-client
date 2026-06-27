import { useState } from 'react';
import { Upload, File, Image, Video, FileText, Download, Trash2, FolderLock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

function DocumentVault() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_type', file.type.startsWith('image') ? 'image' : 'document');
    formData.append('description', file.name);
    formData.append('incident_date', new Date().toISOString());

    try {
      const response = await api.post('/vault/documents/', formData);
      setFiles([response.data, ...files]);
      success('Evidence uploaded successfully!');
    } catch (err) {
      error('Upload failed. Please try again.');
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
          <div className="p-3 rounded-xl bg-yellow-500/10">
            <FolderLock className="w-6 h-6 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-secondary dark:text-white">Document Vault</h1>
        </div>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center mb-6">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleUpload}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">Click to upload evidence</p>
            <p className="text-sm text-gray-400">Images, videos, documents accepted</p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className={`flex items-center justify-between p-4 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  {file.file_type === 'image' && <Image className="w-5 h-5 text-blue-500" />}
                  {file.file_type === 'video' && <Video className="w-5 h-5 text-red-500" />}
                  {file.file_type === 'document' && <FileText className="w-5 h-5 text-green-500" />}
                  <div>
                    <p className="text-secondary dark:text-white font-medium">{file.description}</p>
                    <p className="text-sm text-gray-400">{new Date(file.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition">
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-red-500/10 rounded-lg transition">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentVault;
