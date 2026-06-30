import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, FileText, HeartHandshake, Clock3, AlertTriangle, Phone, Sparkles } from 'lucide-react';
import AnimatedCard from '../common/AnimatedCard';
import { getReports, getReportStats } from '../../api/reports';
import { triggerPanic } from '../../api/panic';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

function SurvivorDashboard() {
  const { user } = useAuth();
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
    { title: 'Report Now', description: 'Report an incident safely', icon: FileText, path: '/reports' },
    { title: 'Safety Tools', description: 'Timer, risk check, escape plan', icon: ShieldAlert, path: '/safety' },
    { title: 'Find Help', description: 'Locate support nearby', icon: HeartHandshake, path: '/organisations' },
    { title: 'Safety Timer', description: 'Start a check-in timer', icon: Clock3, path: '/safety/timer' },
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
      <AnimatedCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-primary/30 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-black">{user?.username?.[0]?.toUpperCase() || 'U'}</span>
              )}
            </div>
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-xs font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
                <Sparkles className="h-3 w-3" />
                Survivor Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-secondary dark:text-white">Welcome back, {user?.username || 'Friend'}. You're not alone.</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Stay informed, take action quickly, and access trusted support resources from one protected space.
              </p>
            </div>
          </div>
          <button
            onClick={handleSOS}
            disabled={sosLoading}
            className="rounded-full border border-red-200/70 bg-red-50/80 px-6 py-3 text-sm font-semibold text-red-600 shadow-lg transition hover:bg-red-100 hover:scale-105 active:scale-95 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-400 disabled:opacity-50"
          >
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            {sosLoading ? 'Sending...' : 'Emergency SOS'}
          </button>
        </div>
      </AnimatedCard>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <AnimatedCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Reports filed</p>
            <p className="mt-2 text-3xl font-black text-primary">{stats.total || 4}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Lifetime reports</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <AnimatedCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Active cases</p>
            <p className="mt-2 text-3xl font-black text-accent">{stats.pending || 1}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Currently open</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <AnimatedCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Response rate</p>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">98%</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Within 24 hours</p>
          </AnimatedCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Quick Actions & Safety Timer */}
        <div className="space-y-6">
          <AnimatedCard className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-secondary dark:text-white">Quick Actions</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Move from insight to action in a moment</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link to="/reports" className="col-span-1 sm:col-span-3 rounded-2xl border-none bg-gradient-to-r from-primary to-orange-400 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg shadow-orange-500/20 text-white">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg">Report Now</h3>
                <p className="mt-1 text-sm text-orange-100">Report an incident safely</p>
              </Link>
              <Link to="/safety" className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg dark:border-white/10 dark:bg-slate-800/70">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-secondary dark:text-white">Safety Tools</h3>
              </Link>
              <Link to="/organisations" className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg dark:border-white/10 dark:bg-slate-800/70">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-secondary dark:text-white">Find Help</h3>
              </Link>
              <Link to="/safety/timer" className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg dark:border-white/10 dark:bg-slate-800/70">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-secondary dark:text-white">Safety Timer</h3>
              </Link>
            </div>
          </AnimatedCard>
          
          <AnimatedCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-secondary dark:text-white">Safety Timer</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Active check-in countdown</p>
              </div>
            </div>
            <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/70 dark:border-slate-700">
              <div className="relative h-20 w-20 flex-shrink-0">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="fill-none stroke-slate-200 dark:stroke-slate-700" strokeWidth="8" />
                  <circle cx="50" cy="50" r="45" className="fill-none stroke-primary transition-all duration-1000" strokeWidth="8" strokeDasharray="283" strokeDashoffset="56" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-secondary dark:text-white">12:45</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-secondary dark:text-white">Check-in Required</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Next check-in in 12 minutes.</p>
                <button className="w-full rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-primary/90 transition hover:scale-105 active:scale-95">
                  I'm Safe (Check-in)
                </button>
              </div>
            </div>
          </AnimatedCard>
        </div>

        <div className="space-y-6">
          {/* Recent Reports */}
          <AnimatedCard className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-secondary dark:text-white">My Reports</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your latest reports</p>
              </div>
              <Link to="/reports" className="text-sm font-semibold text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { id: '283', status: 'pending', date: 'Today, 10:42 AM' },
                { id: '194', status: 'reviewed', date: 'Yesterday, 2:15 PM' },
                { id: '042', status: 'resolved', date: 'Oct 12, 2023' }
              ].map((report) => (
                <div key={report.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60 transition hover:shadow-md">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-secondary dark:text-white">Report #{report.id}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{report.date}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    report.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300' :
                    report.status === 'reviewed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300' :
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                  }`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Activity Feed */}
          <AnimatedCard className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-xl font-bold text-secondary dark:text-white">Activity Feed</h2>
            </div>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-6 mt-6 pb-2">
              {[
                { title: 'Report #283 Submitted', detail: 'You filed a new incident report', time: '10:42 AM', icon: FileText, color: 'bg-primary text-white' },
                { title: 'Safety timer started', detail: 'Check-in window set for 60 minutes', time: '1 hour ago', icon: Clock3, color: 'bg-accent text-white' },
                { title: 'Resource viewed', detail: 'You read "Safety Planning Guide"', time: 'Yesterday', icon: ShieldAlert, color: 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="relative pl-6">
                    <div className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center ${item.color}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-secondary dark:text-white">{item.title}</p>
                      <span className="text-xs font-medium text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}

export default SurvivorDashboard;
