import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Lock, Languages, CalendarDays, Star, Building2, Users, BarChart3, KeyRound, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const profileConfig = {
  survivor: {
    title: 'Survivor profile',
    badge: 'Personal safety profile',
    fields: [
      { label: 'Username', value: 'testuser', icon: User },
      { label: 'Email', value: 'test@amakaziwatch.com', icon: Mail },
      { label: 'Phone', value: '+254 712 345 678', icon: Phone },
      { label: 'County', value: 'Nairobi', icon: MapPin },
    ],
    panels: [
      { title: 'Safety preferences', body: 'Quiet contact only, emergency phone on, preferred follow-up in the evening.' },
      { title: 'Language preference', body: 'English and Kiswahili support', icon: Languages },
      { title: '2FA security', body: 'Enabled for all sign-ins', icon: Lock },
    ],
  },
  counselor: {
    title: 'Counselor profile',
    badge: 'Professional support profile',
    fields: [
      { label: 'Specialization', value: 'Trauma-informed counseling', icon: Shield },
      { label: 'Experience', value: '8 years', icon: CalendarDays },
      { label: 'Certifications', value: 'GBV response, CBT', icon: Shield },
      { label: 'Availability', value: 'Mon–Fri, 8am–6pm', icon: CalendarDays },
    ],
    panels: [
      { title: 'Session stats', body: '125 total sessions • 108 completed • 17 pending', icon: BarChart3 },
      { title: 'Client ratings', body: '4.9/5 average from recent clients', icon: Star },
    ],
  },
  org: {
    title: 'Organisation profile',
    badge: 'Team and resource profile',
    fields: [
      { label: 'Organisation', value: 'Safe Haven Kenya', icon: Building2 },
      { label: 'Team members', value: '14 active staff', icon: Users },
      { label: 'Resource inventory', value: '12 beds, 4 legal slots', icon: Building2 },
      { label: 'Impact', value: '248 people helped this month', icon: BarChart3 },
    ],
    panels: [
      { title: 'Volunteer hours', body: '184 hours logged this month', icon: Users },
      { title: 'Team notes', body: 'New intake workflow is active for all referrals', icon: Shield },
    ],
  },
  county: {
    title: 'County official profile',
    badge: 'County governance profile',
    fields: [
      { label: 'County', value: 'Nairobi', icon: MapPin },
      { label: 'Performance', value: 'Top 3 response rate', icon: BarChart3 },
      { label: 'Downloads', value: 'Analytics export enabled', icon: Shield },
      { label: 'API key', value: 'Active • rotates monthly', icon: KeyRound },
    ],
    panels: [
      { title: 'Report downloads', body: 'Weekly county summary available', icon: Shield },
      { title: 'Compliance', body: 'All reporting standards up to date', icon: Shield },
    ],
  },
  admin: {
    title: 'Admin profile',
    badge: 'Platform administration profile',
    fields: [
      { label: 'System role', value: 'Platform admin', icon: Shield },
      { label: 'User management', value: 'Active oversight enabled', icon: Users },
      { label: 'Moderation queue', value: '24 items awaiting review', icon: Shield },
      { label: 'Audit access', value: 'Full logs available', icon: KeyRound },
    ],
    panels: [
      { title: 'Content moderation', body: 'Community updates reviewed twice daily', icon: Shield },
      { title: 'Audit logs', body: 'Recent security checks and admin activity tracked', icon: BarChart3 },
    ],
  },
};

function Profile() {
  const location = useLocation();
  const role = useMemo(() => {
    const path = location.pathname;
    if (path.includes('/profile/counselor')) return 'counselor';
    if (path.includes('/profile/org')) return 'org';
    if (path.includes('/profile/county')) return 'county';
    if (path.includes('/profile/admin')) return 'admin';
    return 'survivor';
  }, [location.pathname]);

  const config = profileConfig[role];

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              {config.badge}
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">{config.title}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Manage the information and preferences that matter for your role.</p>
          </div>
          <button className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:scale-[1.02] dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200">
            Edit profile
          </button>
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {config.fields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.label} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    <Icon className="h-4 w-4 text-primary" />
                    {field.label}
                  </div>
                  <p className="mt-2 text-base font-semibold text-secondary dark:text-white">{field.value}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <div className="space-y-4">
          {config.panels.map((panel, index) => {
            const Icon = panel.icon || Shield;
            return (
              <motion.div key={panel.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <GlassCard className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-secondary dark:text-white">{panel.title}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{panel.body}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
