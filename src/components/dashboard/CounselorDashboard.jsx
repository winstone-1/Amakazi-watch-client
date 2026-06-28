import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Clock3, CheckCircle, AlertTriangle, Sparkles, CalendarDays, Star } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getPeerSessions } from '../../api/peer';
import { useToast } from '../../context/ToastContext';

function CounselorDashboard() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({ active: 0, pending: 0, completed: 0 });
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const sessionsData = await getPeerSessions();
      setSessions(sessionsData.results || sessionsData || []);
      setStats({
        active: sessionsData.active || 0,
        pending: sessionsData.pending || 0,
        completed: sessionsData.completed || 0,
      });
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setLoading(false);
    }
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    success(isAvailable ? 'You are now offline' : 'You are now online');
  };

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
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Counselor Dashboard
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Support Sessions</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Manage your peer support sessions and provide compassionate care to those in need.
            </p>
          </div>
          <button
            onClick={toggleAvailability}
            className={`rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition ${
              isAvailable
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-slate-400 text-white hover:bg-slate-500'
            }`}
          >
            {isAvailable ? 'Online' : 'Offline'}
          </button>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Active Sessions</p>
            <p className="mt-2 text-3xl font-black text-primary">{stats.active}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Currently in progress</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending Requests</p>
            <p className="mt-2 text-3xl font-black text-accent">{stats.pending}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Awaiting response</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Completed This Week</p>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats.completed}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sessions finished</p>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Active Sessions</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage your ongoing support sessions</p>
            </div>
            <Link to="/peer-support" className="text-sm font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {sessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-secondary dark:text-white">Session #{session.id}</p>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                      Active
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{session.started_at || 'Started recently'}</p>
                </div>
              </div>
            ))}
            {sessions.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active sessions</p>
                <Link to="/peer-support" className="text-sm font-semibold text-primary hover:underline">
                  Start a new session
                </Link>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-secondary dark:text-white">Session History</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your recent completed sessions</p>
          </div>
          <div className="space-y-3">
            {[
              { id: 'Session #2847', user: 'Jane D.', rating: 5, date: 'Today' },
              { id: 'Session #2846', user: 'Mary K.', rating: 4, date: 'Yesterday' },
              { id: 'Session #2845', user: 'Grace M.', rating: 5, date: '2 days ago' },
            ].map((session) => (
              <div key={session.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                <div className="mt-1 rounded-full bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-secondary dark:text-white">{session.id}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{session.user} • {session.date}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-semibold">{session.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary dark:text-white">This Week's Schedule</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your upcoming availability and sessions</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { day: 'Monday', hours: '8 AM - 6 PM', sessions: 4 },
            { day: 'Tuesday', hours: '8 AM - 6 PM', sessions: 5 },
            { day: 'Wednesday', hours: '8 AM - 6 PM', sessions: 3 },
          ].map((day) => (
            <div key={day.day} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-800/50">
              <p className="font-semibold text-secondary dark:text-white">{day.day}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{day.hours}</p>
              <p className="mt-2 text-sm font-semibold text-primary">{day.sessions} sessions</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export default CounselorDashboard;
