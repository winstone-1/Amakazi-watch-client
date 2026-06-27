import GlassCard from '../components/common/GlassCard';
import { FileText, ShieldAlert, Sparkles } from 'lucide-react';

function Reports() {
  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">Reports</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage and review incident reports in a secure workspace.</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-start gap-3 rounded-2xl border border-orange-200/70 bg-orange-50/80 p-4 dark:border-orange-400/20 dark:bg-orange-950/30">
          <ShieldAlert className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold text-secondary dark:text-white">Your report feed is ready</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">The incident report experience is being polished with richer status tracking and secure follow-up actions.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default Reports;
