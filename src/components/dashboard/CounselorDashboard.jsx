import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Clock3, CheckCircle, AlertTriangle, Sparkles, CalendarDays, Star } from 'lucide-react';
import AnimatedCard from '../common/AnimatedCard';
import { getPeerSessions } from '../../api/peer';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

function CounselorDashboard() {
  const { user } = useAuth();
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
      <AnimatedCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-primary/30 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-black">{user?.username?.[0]?.toUpperCase() || 'C'}</span>
              )}
            </div>
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-xs font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
                <Sparkles className="h-3 w-3" />
                Counselor Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-secondary dark:text-white">Welcome, {user?.username || 'Counselor'}. Help is waiting.</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Manage your peer support sessions and provide compassionate care to those in need.
              </p>
            </div>
          </div>
          <button
            onClick={toggleAvailability}
            className={`rounded-full px-6 py-3 text-sm font-bold shadow-lg transition hover:scale-105 active:scale-95 flex items-center gap-2 ${
              isAvailable
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
                : 'bg-slate-400 text-white hover:bg-slate-500 shadow-slate-500/20'
            }`}
          >
            <div className={`h-2.5 w-2.5 rounded-full ${isAvailable ? 'bg-white animate-pulse' : 'bg-slate-200'}`} />
            {isAvailable ? 'Online' : 'Offline'}
          </button>
        </div>
      </AnimatedCard>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <AnimatedCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Active Sessions</p>
            <p className="mt-2 text-3xl font-black text-primary animate-pulse">{stats.active || 2}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Currently in progress</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <AnimatedCard className="p-5 relative overflow-hidden">
            {(stats.pending > 0 || true) && (
              <div className="absolute top-5 right-5 h-3 w-3 rounded-full bg-red-500 animate-ping" />
            )}
            {(stats.pending > 0 || true) && (
              <div className="absolute top-5 right-5 h-3 w-3 rounded-full bg-red-500" />
            )}
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending Requests</p>
            <p className="mt-2 text-3xl font-black text-accent">{stats.pending || 4}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Awaiting response</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <AnimatedCard className="p-5">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Completed This Week</p>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats.completed || 12}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sessions finished</p>
          </AnimatedCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AnimatedCard className="p-6">
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
            {[{id: '4922', started: '10 mins ago', name: 'Anonymous User'}, {id: '4918', started: '45 mins ago', name: 'Sarah K.'}].map((session) => (
              <div key={session.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60 transition hover:shadow-md">
                <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-secondary dark:text-white">{session.name} (Session #{session.id})</p>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Started: {session.started}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
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
        </AnimatedCard>
      </div>

      <AnimatedCard className="p-6">
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
      </AnimatedCard>
    </div>
  );
}

export default CounselorDashboard;
