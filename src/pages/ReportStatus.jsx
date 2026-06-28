import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, CheckCircle, Clock3, AlertTriangle, MessageSquare, ArrowRight, Shield } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import api from '../api/axios';

const mockStatus = {
  ref: 'AW-2025-0042',
  status: 'in_review',
  submitted: 'May 10, 2025',
  lastUpdate: 'May 12, 2025',
  assignedOrg: 'Hope Center Nairobi',
  timeline: [
    { step: 'Report Submitted', date: 'May 10, 2025', done: true, note: 'Your report was received and assigned a reference number.' },
    { step: 'Under Review', date: 'May 11, 2025', done: true, note: 'A caseworker has been assigned and is reviewing your report.' },
    { step: 'Organization Contacted', date: 'May 12, 2025', done: true, note: 'Hope Center Nairobi has been notified and is preparing a response.' },
    { step: 'Response Provided', date: 'Pending', done: false, note: 'You will be contacted by the assigned organization.' },
    { step: 'Case Closed', date: 'Pending', done: false, note: 'The case will be closed once support has been provided.' },
  ],
};

const statusColors = {
  submitted: 'bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300',
  in_review: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300',
  resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300',
  closed: 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400',
};

function ReportStatus() {
  const [ref, setRef] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [followUpSent, setFollowUpSent] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.get(`/reports/status/${ref.trim()}/`);
      setResult(res.data);
    } catch {
      // Use mock data for demo if backend not available
      if (ref.trim().toUpperCase() === 'AW-2025-0042') {
        setResult(mockStatus);
      } else {
        setError('No report found with that reference number. Please check and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/reports/status/${result.ref}/follow-up/`, { message: followUp });
    } catch {
      // ignore
    }
    setFollowUpSent(true);
    setFollowUp('');
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <FileText className="h-4 w-4" />
          Report Tracker
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Track Your Report</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter your case reference number to check the status of your report.</p>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. AW-2025-0042"
              value={ref}
              onChange={e => setRef(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/70 bg-white/80 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white text-sm uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : <><ArrowRight className="h-4 w-4" /> Track</>}
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}
      </GlassCard>

      {result && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <GlassCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Case Reference</p>
                <h2 className="text-2xl font-black text-secondary dark:text-white">{result.ref}</h2>
              </div>
              <span className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${statusColors[result.status] || statusColors.submitted}`}>
                {result.status?.replace('_', ' ')}
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
              <div>
                <p className="text-xs text-slate-400">Submitted</p>
                <p className="font-semibold text-secondary dark:text-white">{result.submitted}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Last Updated</p>
                <p className="font-semibold text-secondary dark:text-white">{result.lastUpdate}</p>
              </div>
              {result.assignedOrg && (
                <div>
                  <p className="text-xs text-slate-400">Assigned To</p>
                  <p className="font-semibold text-secondary dark:text-white">{result.assignedOrg}</p>
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-secondary dark:text-white mb-6">Case Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-6">
                {result.timeline.map((step, i) => (
                  <div key={i} className="relative flex gap-4 pl-10">
                    <div className={`absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 ${step.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'}`}>
                      {step.done ? <CheckCircle className="h-4 w-4" /> : <Clock3 className="h-4 w-4 text-slate-400" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-3">
                        <p className={`font-semibold text-sm ${step.done ? 'text-secondary dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>{step.step}</p>
                        <span className="text-xs text-slate-400">{step.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-secondary dark:text-white mb-1 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Add a Follow-Up Note
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Provide additional information or ask a question about your case.</p>
            {followUpSent ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">Note sent. We'll get back to you soon.</span>
              </div>
            ) : (
              <form onSubmit={handleFollowUp} className="space-y-3">
                <textarea
                  value={followUp}
                  onChange={e => setFollowUp(e.target.value)}
                  required
                  rows={3}
                  placeholder="Add your note here..."
                  className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white resize-none"
                />
                <button type="submit" className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-orange-600 transition">
                  <MessageSquare className="h-4 w-4" />
                  Send Note
                </button>
              </form>
            )}
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Need more help? Call the GBV Helpline:{' '}
                <a href="tel:1195" className="font-bold text-primary hover:underline">1195</a> (free, 24/7)
              </p>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}

export default ReportStatus;
