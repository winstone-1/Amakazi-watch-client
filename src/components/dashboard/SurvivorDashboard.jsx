import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, FileText, HeartHandshake, Clock3, AlertTriangle, ArrowRight, Phone, Sparkles } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getReports, getReportStats } from '../../api/reports';
import { triggerPanic } from '../../api/panic';
import { useToast } from '../../context/ToastContext';

function SurvivorDashboard() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
  const [sosLoading, setSosLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [reportsData, statsData] = await Promise.all([
        getReports(),
        getReportStats()
      ]);
      setReports(reportsData.results || reportsData || []);
      setStats(statsData || { total: 0, pending: 0, resolved: 0 });
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setLoading(false);
    }
  };

  const handleSOS = async () => {
    setSosLoading(true);
    try {
      await triggerPanic({ latitude: 0, longitude: 0 });
      success('Emergency SOS alert sent! Help is on the way.');
    } catch (err) {
      error('Failed to send SOS. Please call 1195 directly.');
    } finally {
      setSosLoading(false);
    }
  };

  const quickActions = [
    { title: 'File a Report', description: 'Report an incident safely', icon: FileText, path: '/reports' },
    { title: 'Safety Tools', description: 'Timer, risk check, escape plan', icon: ShieldAlert, path: '/safety' },
    { title: 'Find Help', description: 'Locate support nearby', icon: HeartHandshake, path: '/organisations' },
    { title: 'Peer Support', description: 'Connect with counselors', icon: Phone, path: '/peer-support' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Welcome Banner */}
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Welcome back
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Your Safety Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Stay informed, take action quickly, and access trusted support resources from one protected space.
            </p>
          </div>
          <button
            onClick={handleSOS}
            disabled={sosLoading}
            className="rounded-full border border-red-200/70 bg-red-50/80 px-6 py-3 text-sm font-semibold text-red-600 shadow-lg transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-400 disabled:opacity-50"
          >
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            {sosLoading ? 'Sending...' : 'Emergency SOS'}
          </button>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Reports</p>
            <p className="mt-2 text-3xl font-black text-primary">{stats.total}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">All time</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending</p>
            <p className="mt-2 text-3xl font-black text-accent">{stats.pending}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Awaiting action</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Resolved</p>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats.resolved}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Completed cases</p>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Quick Actions */}
        <GlassCard className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-secondary dark:text-white">Quick Actions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Move from insight to action in a moment</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.path} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg dark:border-white/10 dark:bg-slate-800/70">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-secondary dark:text-white">{action.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </GlassCard>

        {/* Recent Reports */}
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Recent Reports</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your latest reports at a glance</p>
            </div>
            <Link to="/reports" className="text-sm font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {reports.slice(0, 3).map((report) => (
              <div key={report.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-secondary dark:text-white">Report #{report.id}</p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      report.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300' :
                      report.status === 'resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300' :
                      'bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300'
                    }`}>
                      {report.status || 'Pending'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{report.created_at || 'Recently'}</p>
                </div>
              </div>
            ))}
            {reports.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No reports yet</p>
                <Link to="/reports" className="text-sm font-semibold text-primary hover:underline">
                  File your first report
                </Link>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Activity Feed */}
      <GlassCard className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Clock3 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary dark:text-white">Recent Activity</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your latest updates at a glance</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { title: 'New resource added', detail: 'Safe shelter directory refreshed for Nairobi', time: '10 min ago' },
            { title: 'Safety timer started', detail: 'Check-in window set for 30 minutes', time: '1 hour ago' },
            { title: 'Organization response', detail: 'Caseworker replied to your latest report', time: 'Today' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
              <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-secondary dark:text-white">{item.title}</p>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export default SurvivorDashboard;
