import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Filter, AlertCircle, CheckCircle, Clock3, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import SkeletonCard from '../components/common/SkeletonCard';
import { getReports, createReport } from '../api/reports';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const statusConfig = {
  pending:    { label: 'Pending',    icon: Clock3,       bg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300' },
  in_review:  { label: 'In Review',  icon: AlertCircle,  bg: 'bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300' },
  resolved:   { label: 'Resolved',   icon: CheckCircle,  bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300' },
};

function ReportBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.bg}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function NewReportModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ incident_type: '', description: '', county: '', anonymous: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-[24px] p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-black text-secondary dark:text-white mb-1">New Report</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your report is encrypted and confidential.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Incident Type</label>
            <select
              value={form.incident_type}
              onChange={e => setForm({ ...form, incident_type: e.target.value })}
              required
              className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
            >
              <option value="">Select type</option>
              <option value="physical">Physical Violence</option>
              <option value="sexual">Sexual Violence</option>
              <option value="psychological">Psychological/Emotional Abuse</option>
              <option value="economic">Economic Abuse</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">County</label>
            <input
              type="text"
              placeholder="e.g. Nairobi"
              value={form.county}
              onChange={e => setForm({ ...form, county: e.target.value })}
              className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              required
              rows={4}
              placeholder="Describe what happened. Your safety is our priority."
              className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white resize-none"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.anonymous}
              onChange={e => setForm({ ...form, anonymous: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm text-slate-600 dark:text-slate-300">Submit anonymously</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-full border border-slate-200/70 py-2.5 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300 hover:border-slate-400 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50">
              {loading ? 'Submitting…' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Reports() {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { fetchReports(); }, []);

  const fetchReports = async () => {
    setLoading(true);
    setApiError(false);
    try {
      const data = await getReports();
      setReports(data.results || data || []);
    } catch {
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (form) => {
    try {
      await createReport(form);
      success('Report submitted successfully!');
      setShowModal(false);
      fetchReports();
    } catch {
      error('Failed to submit report. Please try again.');
    }
  };

  const filtered = reports.filter(r =>
    !search ||
    String(r.id).includes(search) ||
    (r.incident_type || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.county || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 transition-colors duration-300">
      {showModal && <NewReportModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />}

      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Secure Reporting
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Reports</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">All reports are encrypted and confidential.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition"
          >
            <Plus className="h-4 w-4" />
            New Report
          </button>
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, type, or county…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/70 bg-white/80 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
          />
        </div>
      </GlassCard>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <SkeletonCard key={i} lines={2} />)}
        </div>
      ) : apiError ? (
        <GlassCard className="p-8 text-center">
          <AlertCircle className="h-10 w-10 mx-auto mb-3 text-red-400" />
          <p className="font-semibold text-secondary dark:text-white mb-1">Could not load reports</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Check your connection or try again.</p>
          <button onClick={fetchReports} className="rounded-full border border-slate-200/70 px-5 py-2 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300 hover:border-primary hover:text-primary transition">
            Retry
          </button>
        </GlassCard>
      ) : filtered.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <FileText className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="font-semibold text-secondary dark:text-white mb-1">{search ? 'No matching reports' : 'No reports yet'}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {search ? 'Try a different search term.' : 'Your reports will appear here once submitted.'}
          </p>
          {!search && (
            <button onClick={() => setShowModal(true)} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 transition">
              File First Report
            </button>
          )}
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((report, i) => (
            <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <GlassCard className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary flex-shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-secondary dark:text-white text-sm">
                          Report #{report.id}
                        </p>
                        {report.anonymous && (
                          <span className="text-xs text-slate-400">· Anonymous</span>
                        )}
                      </div>
                      {report.incident_type && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 capitalize">
                          {report.incident_type.replace('_', ' ')}
                          {report.county && ` · ${report.county}`}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 mt-0.5">
                        {report.created_at ? new Date(report.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ReportBadge status={report.status || 'pending'} />
                    <Link
                      to={`/report-status`}
                      state={{ ref: report.reference_number }}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Track →
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reports;
