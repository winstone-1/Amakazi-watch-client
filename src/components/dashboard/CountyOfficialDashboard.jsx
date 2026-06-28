import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, BarChart3, FileText, TrendingUp, Sparkles, AlertTriangle, Award, Clock3 } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getScorecardRankings } from '../../api/scorecard';
import { getReportsStats } from '../../api/reports';
import { getOrgHotspots } from '../../api/org';
import { useToast } from '../../context/ToastContext';

function CountyOfficialDashboard() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, response_time: 0 });
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [rankingsData, statsData, hotspotsData] = await Promise.all([
        getScorecardRankings(),
        getReportsStats(),
        getOrgHotspots()
      ]);
      setRankings(rankingsData.results || rankingsData || []);
      setStats(statsData || { total: 0, pending: 0, response_time: 0 });
      setHotspots(hotspotsData.results || hotspotsData || []);
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
              County Official Dashboard
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">County Overview</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Monitor county performance, track GBV metrics, and coordinate response efforts across your region.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Reports</p>
            </div>
            <p className="mt-2 text-3xl font-black text-primary">{stats.total}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">This month</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock3 className="h-5 w-5 text-accent" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Avg Response Time</p>
            </div>
            <p className="mt-2 text-3xl font-black text-accent">{stats.response_time || '24h'}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">To first response</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">County Rank</p>
            </div>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">#3</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">National ranking</p>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">County Scorecard</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Performance metrics and rankings</p>
            </div>
            <Link to="/scorecards" className="text-sm font-semibold text-primary hover:underline">
              View Details
            </Link>
          </div>
          <div className="space-y-3">
            {rankings.slice(0, 3).map((county) => (
              <div key={county.id} className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-secondary dark:text-white">{county.county || 'Nairobi'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${county.score || 85}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-primary">{county.score || 85}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-secondary dark:text-white">Hotspot Areas</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">High-risk locations in your county</p>
          </div>
          <div className="space-y-3">
            {hotspots.slice(0, 3).map((hotspot) => (
              <div key={hotspot.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                <div className="mt-1 rounded-full bg-red-500/10 p-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-secondary dark:text-white">{hotspot.location || 'Downtown'}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{hotspot.incidents || 12} incidents this month</p>
                </div>
              </div>
            ))}
            {hotspots.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hotspots identified</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary dark:text-white">Trend Analysis</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Monthly report trends</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { month: 'Jan', count: 45 },
            { month: 'Feb', count: 52 },
            { month: 'Mar', count: 48 },
            { month: 'Apr', count: 61 },
          ].map((data) => (
            <div key={data.month} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 text-center dark:border-white/10 dark:bg-slate-800/50">
              <p className="font-semibold text-secondary dark:text-white">{data.month}</p>
              <p className="mt-2 text-2xl font-black text-primary">{data.count}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">reports</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export default CountyOfficialDashboard;
