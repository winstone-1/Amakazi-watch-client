import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, FileText, Building2, AlertTriangle, Sparkles, TrendingUp, CheckCircle, Clock3 } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getAdminStats, getAdminUsers, getAdminReports, getAdminOrgs } from '../../api/admin';
import { useToast } from '../../context/ToastContext';

function AdminDashboard() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total_users: 0, total_reports: 0, total_orgs: 0, pending_verifications: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [pendingOrgs, setPendingOrgs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, usersData, reportsData, orgsData] = await Promise.all([
        getAdminStats(),
        getAdminUsers(),
        getAdminReports(),
        getAdminOrgs()
      ]);
      setStats(statsData || { total_users: 0, total_reports: 0, total_orgs: 0, pending_verifications: 0 });
      setRecentUsers(usersData.results || usersData || []);
      setPendingReports(reportsData.results || reportsData || []);
      setPendingOrgs(orgsData.results || orgs || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setLoading(false);
    }
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
              Admin Dashboard
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">System Overview</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Monitor platform performance, manage users, moderate content, and oversee organization verifications.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Users</p>
            </div>
            <p className="mt-2 text-3xl font-black text-primary">{stats.total_users}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Registered accounts</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-accent" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Reports</p>
            </div>
            <p className="mt-2 text-3xl font-black text-accent">{stats.total_reports}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">All time</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Organizations</p>
            </div>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">{stats.total_orgs}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Verified & pending</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending Actions</p>
            </div>
            <p className="mt-2 text-3xl font-black text-amber-600 dark:text-amber-400">{stats.pending_verifications}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Need review</p>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Recent Users</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest registered accounts</p>
            </div>
            <Link to="/admin/users" className="text-sm font-semibold text-primary hover:underline">
              Manage Users
            </Link>
          </div>
          <div className="space-y-3">
            {recentUsers.slice(0, 4).map((user) => (
              <div key={user.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-secondary dark:text-white">{user.username || 'User'}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{user.email || 'email@example.com'}</p>
                </div>
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950/30 dark:text-sky-300 capitalize">
                  {user.role || 'survivor'}
                </span>
              </div>
            ))}
            {recentUsers.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No users registered yet</p>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Pending Reports</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Reports awaiting moderation</p>
            </div>
            <Link to="/admin/reports" className="text-sm font-semibold text-primary hover:underline">
              Review All
            </Link>
          </div>
          <div className="space-y-3">
            {pendingReports.slice(0, 3).map((report) => (
              <div key={report.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                <div className="mt-1 rounded-full bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-secondary dark:text-white">Report #{report.id}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{report.created_at || 'Submitted recently'}</p>
                </div>
              </div>
            ))}
            {pendingReports.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No pending reports</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Organization Verifications</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Organizations pending verification</p>
            </div>
          </div>
          <Link to="/admin/organisations" className="text-sm font-semibold text-primary hover:underline">
            Manage Orgs
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {pendingOrgs.slice(0, 4).map((org) => (
            <div key={org.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
              <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent">
                <Clock3 className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-secondary dark:text-white">{org.name || 'Organization Name'}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{org.county || 'Nairobi'}</p>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                Pending
              </span>
            </div>
          ))}
          {pendingOrgs.length === 0 && (
            <div className="col-span-2 text-center py-8 text-slate-500 dark:text-slate-400">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">All organizations verified</p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

export default AdminDashboard;
