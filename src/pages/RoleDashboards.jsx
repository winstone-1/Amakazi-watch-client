import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Clock3, FileText, HeartHandshake, ShieldCheck, Users, BarChart3, FlaskConical, Building2, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const dashboardConfig = {
  survivor: {
    title: 'Survivor dashboard',
    subtitle: 'Support, clarity, and safe next steps.',
    cards: [
      { title: 'Report now', description: 'Log a new incident securely', icon: FileText },
      { title: 'Find help', description: 'Locate trusted support nearby', icon: HeartHandshake },
      { title: 'Safety tools', description: 'Use timer, safe word, and escape plan', icon: ShieldCheck },
      { title: 'Document vault', description: 'Store sensitive evidence safely', icon: FlaskConical },
    ],
    reports: [
      { title: 'Incident report #1042', status: 'Pending', time: '12 mins ago' },
      { title: 'Safety check-in', status: 'Reviewed', time: '1 hour ago' },
      { title: 'Evidence uploaded', status: 'Resolved', time: 'Today' },
    ],
  },
  counselor: {
    title: 'Counselor dashboard',
    subtitle: 'Manage sessions and client care with calm focus.',
    cards: [
      { title: 'Active sessions', value: '8', icon: Users },
      { title: 'Pending requests', value: '3', icon: AlertTriangle },
      { title: 'Availability', value: 'Online', icon: Clock3 },
      { title: 'Completed this week', value: '14', icon: ShieldCheck },
    ],
  },
  org: {
    title: 'Organisation dashboard',
    subtitle: 'Track resources, referrals, and community impact.',
    cards: [
      { title: 'Beds available', value: '12', icon: Building2 },
      { title: 'Legal slots', value: '4', icon: FileText },
      { title: 'Counselors on shift', value: '6', icon: Users },
      { title: 'Pending referrals', value: '9', icon: AlertTriangle },
    ],
  },
  county: {
    title: 'County official dashboard',
    subtitle: 'Monitor county-level response and reporting health.',
    cards: [
      { title: 'County rank', value: '#2', icon: BarChart3 },
      { title: 'Reports this month', value: '143', icon: FileText },
      { title: 'Avg response time', value: '1.8 hrs', icon: Clock3 },
      { title: 'Conviction rate', value: '67%', icon: ShieldCheck },
    ],
  },
  admin: {
    title: 'Admin dashboard',
    subtitle: 'Oversight, moderation, and system health.',
    cards: [
      { title: 'Users', value: '2,840', icon: Users },
      { title: 'Reports', value: '6,120', icon: FileText },
      { title: 'Organisations', value: '189', icon: Building2 },
      { title: 'Pending moderation', value: '24', icon: AlertTriangle },
    ],
  },
};

function RoleDashboards() {
  const location = useLocation();
  const role = useMemo(() => {
    const path = location.pathname;
    if (path.includes('/dashboard/counselor')) return 'counselor';
    if (path.includes('/dashboard/org')) return 'org';
    if (path.includes('/dashboard/county')) return 'county';
    if (path.includes('/dashboard/admin')) return 'admin';
    return 'survivor';
  }, [location.pathname]);

  const config = dashboardConfig[role];

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Role-based experience
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">{config.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{config.subtitle}</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {config.cards.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <GlassCard className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.title}</p>
                  <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-2xl font-black text-secondary dark:text-white">{item.value || 'Go to action'}</p>
                {item.description && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {role === 'survivor' && (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <GlassCard className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary dark:text-white">Recent reports</h2>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Live</span>
            </div>
            <div className="space-y-3">
              {config.reports.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
                  <div>
                    <p className="font-semibold text-secondary dark:text-white">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.time}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300' : item.status === 'Reviewed' ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary dark:text-white">Activity feed</h2>
              <div className="rounded-2xl bg-accent/10 p-2 text-accent">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-3">
              {['Safety timer started', 'Support request sent', 'Document saved to vault'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

export default RoleDashboards;
