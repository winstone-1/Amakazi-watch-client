import { motion } from 'framer-motion';
import { BellRing, ChevronRight, ShieldCheck, Sparkles, Activity, Clock3, FileText, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import GlassCard from '../components/common/GlassCard';

function Dashboard() {
  const { darkMode } = useTheme();

  const stats = [
    { label: 'Reports', value: '1,247', helper: '+18% this month', tone: 'text-primary' },
    { label: 'Active cases', value: '89', helper: '12 need follow-up', tone: 'text-accent' },
    { label: 'Response rate', value: '94%', helper: 'Within 2 hours', tone: 'text-secondary dark:text-white' },
  ];

  const quickActions = [
    { title: 'File a report', description: 'Capture an incident safely', icon: FileText, path: '/reports' },
    { title: 'Access safety tools', description: 'Timer, risk check, escape plan', icon: ShieldCheck, path: '/safety' },
    { title: 'Review activity', description: 'See recent updates and alerts', icon: Activity, path: '/scorecards' },
  ];

  const timeline = [
    { title: 'New resource added', detail: 'Safe shelter directory refreshed for Nairobi', time: '10 min ago' },
    { title: 'Safety timer started', detail: 'Check-in window set for 30 minutes', time: '1 hour ago' },
    { title: 'Organization response', detail: 'Caseworker replied to your latest report', time: 'Today' },
  ];

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Welcome back
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Your safety dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Stay informed, take action quickly, and access trusted support resources from one protected space.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/80 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/30 dark:text-emerald-300">
            Role badge: Survivor Support
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <GlassCard className="p-5">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className={`mt-2 text-3xl font-black ${stat.tone}`}>{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.helper}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Quick actions</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Move from insight to support in a moment</p>
            </div>
            <button className="rounded-full border border-slate-200 bg-white/70 p-2 text-slate-500 transition hover:text-primary dark:border-white/10 dark:bg-slate-800/70">
              <BellRing className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.title} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg dark:border-white/10 dark:bg-slate-800/70">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-secondary dark:text-white">{action.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{action.description}</p>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Recent activity</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your latest updates at a glance</p>
            </div>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Clock3 className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-3">
            {timeline.map((item) => (
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
    </div>
  );
}

export default Dashboard;
