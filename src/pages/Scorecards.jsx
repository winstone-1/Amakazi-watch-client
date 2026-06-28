import { BarChart3, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';

function Scorecards() {
  const counties = [
    { name: 'Nairobi', score: 92, rank: 1, change: '+5%' },
    { name: 'Kisumu', score: 85, rank: 2, change: '+3%' },
    { name: 'Mombasa', score: 78, rank: 3, change: '-1%' },
    { name: 'Nakuru', score: 75, rank: 4, change: '+2%' },
    { name: 'Eldoret', score: 71, rank: 5, change: '+4%' },
  ];

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">County Scorecards</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Performance rankings and metrics for all counties.</p>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-3">
        {counties.map((county, i) => (
          <GlassCard key={county.name} className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold ${
                  i === 0 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400' :
                  i === 1 ? 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-300' :
                  i === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400' :
                  'bg-slate-50 text-slate-500 dark:bg-slate-800/30 dark:text-slate-400'
                }`}>
                  #{county.rank}
                </div>
                <div>
                  <h3 className="font-semibold text-secondary dark:text-white">{county.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <TrendingUp className={`h-3.5 w-3.5 ${county.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`} />
                    <span className={county.change.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
                      {county.change} this month
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-32 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${county.score}%` }} />
                  </div>
                  <span className="text-lg font-bold text-secondary dark:text-white">{county.score}%</span>
                </div>
                <Link
                  to={`/scorecard/${county.name.toLowerCase()}`}
                  className="rounded-full border border-slate-200/70 bg-white/70 p-2 text-slate-500 transition hover:bg-primary hover:text-white dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-400"
                  aria-label={`View ${county.name} scorecard`}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default Scorecards;
