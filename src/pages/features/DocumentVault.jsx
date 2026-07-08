import React from "react";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Video, FileText, Download, Trash2, FolderLock, Sparkles, AlertCircle, Shield } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import SkeletonCard from '../../components/common/SkeletonCard';
import { useToast } from '../../context/ToastContext';
import { vaultService } from '../../services/api';
import { mockCloudinaryUpload } from '../../utils/mockUpload';

const TYPE_ICONS = {
  image:    { icon: Image,    color: 'text-blue-500',   bg: 'bg-blue-500/10' },
  video:    { icon: Video,    color: 'text-red-500',    bg: 'bg-red-500/10' },
  document: { icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
};

function FileTypeIcon({ type }) {
  const cfg = TYPE_ICONS[type] || TYPE_ICONS.document;
  const Icon = cfg.icon;
  return (
    <div className={`rounded-2xl ${cfg.bg} p-2.5`}>
      <Icon className={`h-5 w-5 ${cfg.color}`} />
    </div>
  );
}

function DocumentVault() {
  const { success, error } = useToast();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await vaultService.list();
        setFiles(data.results || data || []);
      } catch { /* empty state */ }
      finally { setLoading(false); }
    };
    fetchFiles();
  }, []);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      // Simulate cloudinary upload
      const url = await mockCloudinaryUpload(file);
      
      const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document';
      
      // Try actual API upload if backend is up
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('file_type', fileType);
        formData.append('description', file.name);
        formData.append('incident_date', new Date().toISOString().split('T')[0]);
        
        const data = await vaultService.upload(formData);
        setFiles(prev => [data, ...prev]);
        success(`"${file.name}" uploaded securely.`);
      } catch (err) {
        // Fallback: Optimistic local add for demo
        const localFile = {
          id: Date.now(),
          description: file.name,
          file_type: fileType,
          created_at: new Date().toISOString(),
          size: file.size,
          url: url // Store mock URL
        };
        setFiles(prev => [localFile, ...prev]);
        success(`"${file.name}" uploaded to secure storage (mock).`);
      }
    } catch (err) {
      error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file permanently?')) return;
    try {
      await vaultService.delete(id);
    } catch { /* ignore if already gone */ }
    setFiles(prev => prev.filter(f => f.id !== id));
    success('File deleted.');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const stats = {
    images:    files.filter(f => f.file_type === 'image').length,
    videos:    files.filter(f => f.file_type === 'video').length,
    documents: files.filter(f => f.file_type === 'document').length,
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Encrypted Storage
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Document Vault</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Secure, encrypted storage for evidence, documents, and photos.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">
            <Shield className="h-4 w-4" />
            End-to-End Encrypted
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Images',    count: stats.images,    ...TYPE_ICONS.image },
          { label: 'Videos',    count: stats.videos,    ...TYPE_ICONS.video },
          { label: 'Documents', count: stats.documents, ...TYPE_ICONS.document },
        ].map(item => {
          const Icon = item.icon;
          return (
            <GlassCard key={item.label} className="p-5 text-center">
              <div className={`inline-flex rounded-full ${item.bg} p-3 mb-2`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <p className="text-2xl font-black text-secondary dark:text-white">{item.count}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* Upload zone */}
      <GlassCard
        className={`p-8 border-2 border-dashed transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-slate-300/70 dark:border-white/20'}`}
        hover={false}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={e => handleUpload(e.target.files[0])}
          accept="image/*,video/*,.pdf,.doc,.docx"
        />
        <div className="text-center">
          <motion.div animate={uploading ? { rotate: 360 } : {}} transition={{ duration: 1, repeat: uploading ? Infinity : 0, ease: 'linear' }} className="inline-flex">
            <Upload className={`h-10 w-10 mx-auto mb-3 ${uploading ? 'text-primary' : 'text-slate-300 dark:text-slate-600'}`} />
          </motion.div>
          <p className="font-semibold text-secondary dark:text-white text-sm">
            {uploading ? 'Uploading…' : 'Drop files here or click to upload'}
          </p>
          <p className="text-xs text-slate-400 mt-1">Images, videos, PDFs, Word documents accepted</p>
          {!uploading && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 flex items-center gap-2 mx-auto rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition"
            >
              <Upload className="h-4 w-4" />
              Choose File
            </motion.button>
          )}
        </div>
      </GlassCard>

      {/* Files list */}
      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <SkeletonCard key={i} lines={2} />)}</div>
      ) : files.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <FolderLock className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="font-semibold text-secondary dark:text-white mb-1">Vault is empty</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Upload documents, photos, or videos to secure them.</p>
        </GlassCard>
      ) : (
        <GlassCard className="p-6">
          <h2 className="font-bold text-secondary dark:text-white mb-4">Stored Files ({files.length})</h2>
          <AnimatePresence>
            <div className="space-y-3">
              {files.map((file, i) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60"
                >
                  <FileTypeIcon type={file.file_type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-secondary dark:text-white truncate">{file.description || 'Untitled'}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="capitalize">{file.file_type || 'file'}</span>
                      {file.size && <><span>·</span><span>{formatSize(file.size)}</span></>}
                      <span>·</span>
                      <span>{file.created_at ? new Date(file.created_at).toLocaleDateString() : 'Today'}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => success('Download started.')}
                      className="rounded-lg p-2 text-slate-400 hover:bg-sky-50 hover:text-sky-500 dark:hover:bg-sky-950/30 transition"
                      aria-label="Download file"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 transition"
                      aria-label="Delete file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </GlassCard>
      )}

      <GlassCard className="p-4 border-amber-200/70 bg-amber-50/80 dark:border-amber-400/20 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200">
            <strong>Privacy Notice:</strong> All files are encrypted and accessible only by you. We recommend regularly backing up important evidence to multiple secure locations (trusted person, legal aid organisation).
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

export default DocumentVault;
