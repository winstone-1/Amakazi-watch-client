import { Link } from 'react-router-dom';
import { Clock3, KeyRound, ShieldCheck, MapPin, PhoneCall, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

function Safety() {
  const safetyFeatures = [
    { path: '/safety/timer', icon: Clock3, label: 'Safety Timer', desc: 'Set a privacy-first check-in timer.', highlight: 'Encrypted timing' },
    { path: '/safety/safe-word', icon: KeyRound, label: 'Safe Word', desc: 'Manage a private phrase for reassurance and safe exits.', highlight: 'Confidential access' },
    { path: '/safety/risk-assessment', icon: ShieldCheck, label: 'Risk Assessment', desc: 'Evaluate your environment with a guided questionnaire.', highlight: 'Step-by-step' },
    { path: '/safety/escape-plan', icon: MapPin, label: 'Escape Plan', desc: 'Prepare a calm, practical exit strategy.', highlight: 'Ready to go' },
  ];

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Safety hub
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Protect your next move</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Access trusted safety tools designed to help you stay calm, prepared, and supported whenever you need them.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50/80 px-3 py-2 text-sm font-semibold text-red-600 dark:border-red-400/20 dark:bg-red-950/30">
            <PhoneCall className="h-4 w-4" />
            Emergency: 1195
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        {safetyFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.path} to={feature.path}>
              <GlassCard className="group h-full p-5 transition hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-secondary dark:text-white">{feature.label}</h3>
                  <span className="rounded-full border border-slate-200/70 bg-white/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-400">
                    {feature.highlight}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{feature.desc}</p>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Safety;
