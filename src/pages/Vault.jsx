import { Link } from 'react-router-dom';
import { FolderLock, Upload, FileText, Image, Video, Shield, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

function Vault() {
  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Encrypted Storage
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Document Vault</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Secure encrypted evidence storage. Your files are protected with end-to-end encryption and only accessible by you.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">
            <Shield className="h-4 w-4" />
            Bank-Level Security
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-secondary dark:text-white">Upload Evidence</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Securely store photos, documents, and other evidence</p>
          </div>
        </div>
        <Link
          to="/vault/documents"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600 sm:w-auto"
        >
          <Upload className="h-5 w-5" />
          Upload New Evidence
        </Link>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Image, label: 'Images', count: '0', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-950/30' },
          { icon: Video, label: 'Videos', count: '0', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-950/30' },
          { icon: FileText, label: 'Documents', count: '0', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-950/30' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard key={item.label} className="p-5 text-center">
              <div className={`mb-3 inline-flex rounded-full ${item.bg} p-3`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <p className="text-2xl font-black text-secondary dark:text-white">{item.count}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.label}</p>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="border-amber-200/70 bg-amber-50/80 p-6 dark:border-amber-400/20 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-amber-500/10 p-2">
            <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-100">Privacy Notice</h3>
            <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
              All files in your vault are encrypted and can only be accessed by you. We recommend regularly backing up important evidence 
              to multiple secure locations.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default Vault;
