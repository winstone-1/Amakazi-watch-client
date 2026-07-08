import React from "react";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, FileText, Building2, AlertTriangle, CheckCircle, Sparkles, Trash2, UserCheck } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import SkeletonCard from '../components/common/SkeletonCard';
import { getAdminUsers, getAdminReports, getAdminOrganisations, deleteAdminUser, updateAdminUserRole, verifyAdminOrganisation, updateAdminReportStatus } from '../api/admin';
import { useToast } from '../context/ToastContext';

const tabs = ['Overview', 'Users', 'Reports', 'Organisations'];

function Admin() {
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [orgs, setOrgs] = useState([]);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [u, r, o] = await Promise.all([getAdminUsers(), getAdminReports(), getAdminOrganisations()]);
      setUsers(u.results || u || []);
      setReports(r.results || r || []);
      setOrgs(o.results || o || []);
    } catch { /* show empty states */ }
    finally { setLoading(false); }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteAdminUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      success('User deleted');
    } catch { error('Failed to delete user'); }
  };

  const handleVerifyOrg = async (id, status) => {
    try {
      await verifyAdminOrganisation(id, status);
      setOrgs(prev => prev.map(o => o.id === id ? { ...o, is_verified: status === 'approved' } : o));
      success(`Organisation ${status}`);
    } catch { error('Failed to update organisation'); }
  };

  const handleUpdateReport = async (id, status) => {
    try {
      await updateAdminReportStatus(id, status);
      setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      success('Report updated');
    } catch { error('Failed to update report'); }
  };

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Reports', value: reports.length, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-500/10' },
    { label: 'Organisations', value: orgs.length, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
    { label: 'Pending Verifications', value: orgs.filter(o => !o.is_verified).length, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Sparkles className="h-4 w-4" />
          Admin Only
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Admin Panel</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Manage users, reports, and organisation verifications.</p>
      </GlassCard>

      {/* Tab nav */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-4">
          {[1,2,3,4].map(i => <SkeletonCard key={i} lines={2} />)}
        </div>
      ) : (
        <>
          {activeTab === 'Overview' && (
            <>
              <div className="grid gap-4 md:grid-cols-4">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <GlassCard className="p-5">
                        <div className={`inline-flex rounded-2xl p-2 mb-3 ${s.bg}`}>
                          <Icon className={`h-5 w-5 ${s.color}`} />
                        </div>
                        <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
              <div className="grid gap-6 xl:grid-cols-2">
                <GlassCard className="p-6">
                  <h2 className="font-bold text-secondary dark:text-white mb-4">Recent Users</h2>
                  <div className="space-y-3">
                    {users.slice(0, 5).map(u => (
                      <div key={u.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                        <div className="rounded-full bg-primary/10 p-2 text-primary"><Users className="h-4 w-4" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-secondary dark:text-white truncate">{u.username}</p>
                          <p className="text-xs text-slate-400 truncate">{u.email}</p>
                        </div>
                        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950/30 dark:text-sky-300 capitalize flex-shrink-0">{u.role || 'survivor'}</span>
                      </div>
                    ))}
                    {users.length === 0 && <p className="text-sm text-slate-400 text-center py-4">No users yet</p>}
                  </div>
                </GlassCard>
                <GlassCard className="p-6">
                  <h2 className="font-bold text-secondary dark:text-white mb-4">Pending Org Verifications</h2>
                  <div className="space-y-3">
                    {orgs.filter(o => !o.is_verified).slice(0, 5).map(o => (
                      <div key={o.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                        <div className="rounded-full bg-amber-500/10 p-2 text-amber-600"><Building2 className="h-4 w-4" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-secondary dark:text-white truncate">{o.name}</p>
                          <p className="text-xs text-slate-400">{o.county}</p>
                        </div>
                        <button onClick={() => handleVerifyOrg(o.id, 'approved')} className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-600 transition">Approve</button>
                      </div>
                    ))}
                    {orgs.filter(o => !o.is_verified).length === 0 && (
                      <div className="text-center py-4">
                        <CheckCircle className="h-8 w-8 mx-auto text-emerald-400 mb-2" />
                        <p className="text-sm text-slate-400">All organisations verified</p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </div>
            </>
          )}

          {activeTab === 'Users' && (
            <GlassCard className="p-6">
              <h2 className="font-bold text-secondary dark:text-white mb-4">All Users ({users.length})</h2>
              <div className="space-y-3">
                {users.map(u => (
                  <div key={u.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                    <div className="rounded-full bg-primary/10 p-2 text-primary"><Users className="h-4 w-4" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-secondary dark:text-white">{u.username}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                    <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950/30 dark:text-sky-300 capitalize">{u.role || 'survivor'}</span>
                    <button onClick={() => handleDeleteUser(u.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition" aria-label="Delete user">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {users.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No users found</p>}
              </div>
            </GlassCard>
          )}

          {activeTab === 'Reports' && (
            <GlassCard className="p-6">
              <h2 className="font-bold text-secondary dark:text-white mb-4">All Reports ({reports.length})</h2>
              <div className="space-y-3">
                {reports.map(r => (
                  <div key={r.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                    <div className="rounded-full bg-amber-500/10 p-2 text-amber-600"><FileText className="h-4 w-4" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-secondary dark:text-white">Report #{r.id}</p>
                      <p className="text-xs text-slate-400">{r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recently'}</p>
                    </div>
                    <select
                      value={r.status || 'pending'}
                      onChange={e => handleUpdateReport(r.id, e.target.value)}
                      className="rounded-xl border border-slate-200/70 bg-white/80 px-2.5 py-1.5 text-xs outline-none dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_review">In Review</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                ))}
                {reports.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No reports found</p>}
              </div>
            </GlassCard>
          )}

          {activeTab === 'Organisations' && (
            <GlassCard className="p-6">
              <h2 className="font-bold text-secondary dark:text-white mb-4">All Organisations ({orgs.length})</h2>
              <div className="space-y-3">
                {orgs.map(o => (
                  <div key={o.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                    <div className="rounded-full bg-violet-500/10 p-2 text-violet-600"><Building2 className="h-4 w-4" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-secondary dark:text-white">{o.name}</p>
                      <p className="text-xs text-slate-400">{o.county}</p>
                    </div>
                    {o.is_verified ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">Verified</span>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => handleVerifyOrg(o.id, 'approved')} className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-600 transition">Approve</button>
                        <button onClick={() => handleVerifyOrg(o.id, 'rejected')} className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-600 transition">Reject</button>
                      </div>
                    )}
                  </div>
                ))}
                {orgs.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No organisations found</p>}
              </div>
            </GlassCard>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
