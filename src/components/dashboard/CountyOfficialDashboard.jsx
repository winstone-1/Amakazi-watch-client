import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, BarChart3, FileText, TrendingUp, Sparkles, AlertTriangle, Award, Clock3 } from 'lucide-react';
import AnimatedCard from '../common/AnimatedCard';
import { getReportStats } from '../../api/reports';
import { getOrgHotspots } from '../../api/org';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

function CountyOfficialDashboard() {
  const { user } = useAuth();
  const { error } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, response_time: 0 });
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, hotspotsData] = await Promise.all([
        getReportStats(),
        getOrgHotspots()
      ]);
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
      <AnimatedCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-primary/30 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-black">{user?.username?.[0]?.toUpperCase() || 'O'}</span>
              )}
            </div>
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-xs font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
                <Sparkles className="h-3 w-3" />
                County Official Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-secondary dark:text-white">Welcome, {user?.username || 'Official'}. Your county needs you.</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Monitor county performance, track GBV metrics, and coordinate response efforts across your region.
              </p>
            </div>
          </div>
          <button className="rounded-full border-2 border-primary/20 bg-primary/10 px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/20 hover:scale-105 active:scale-95 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Download CSV
          </button>
        </div>
      </AnimatedCard>

      <div className="grid gap-4 md:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <AnimatedCard className="p-5 h-full bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary" />
              <p className="text-sm font-bold text-primary">County Scorecard</p>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-4xl font-black text-primary">88<span className="text-xl">%</span></p>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full dark:bg-emerald-900/30">+5%</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">Rank #3 Nationally</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <AnimatedCard className="p-5 h-full">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-secondary dark:text-white" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Reports</p>
            </div>
            <p className="mt-2 text-3xl font-black text-secondary dark:text-white">{stats.total || 342}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">This month</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <AnimatedCard className="p-5 h-full">
            <div className="flex items-center gap-2 mb-2">
              <Clock3 className="h-5 w-5 text-accent" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Avg Response</p>
            </div>
            <p className="mt-2 text-3xl font-black text-accent">{stats.response_time || '18h'}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Time to first action</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <AnimatedCard className="p-5 h-full">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Conviction Rate</p>
            </div>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">42%</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Prosecuted cases</p>
          </AnimatedCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AnimatedCard className="p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-200/70 dark:border-slate-700/50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Recent Reports in County</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest incidents requiring attention</p>
            </div>
            <Link to="/reports" className="text-sm font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-700/50">
                {[
                  { id: '#4092', loc: 'Westlands, Nairobi', date: 'Oct 24, 2023', status: 'Pending' },
                  { id: '#4088', loc: 'Kibera, Nairobi', date: 'Oct 23, 2023', status: 'Investigating' },
                  { id: '#4081', loc: 'CBD, Nairobi', date: 'Oct 22, 2023', status: 'Resolved' },
                  { id: '#4075', loc: 'Langata, Nairobi', date: 'Oct 20, 2023', status: 'Resolved' },
                ].map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-semibold text-secondary dark:text-white">{row.id}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.loc}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        row.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300' :
                        row.status === 'Investigating' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300' :
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-secondary dark:text-white">Hotspot Areas</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">High-risk locations in your county</p>
          </div>
          <div className="space-y-3">
            {[
              { location: 'Kibera', incidents: 42, trend: 'up' },
              { location: 'Mathare', incidents: 28, trend: 'down' },
              { location: 'Kayole', incidents: 24, trend: 'up' },
            ].map((hotspot, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-800/60 transition hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-500/10 p-2 text-red-600 dark:text-red-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary dark:text-white">{hotspot.location}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{hotspot.incidents} incidents</p>
                  </div>
                </div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${hotspot.trend === 'up' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'}`}>
                  <TrendingUp className={`h-4 w-4 ${hotspot.trend === 'down' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      <AnimatedCard className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary dark:text-white">Trend Analysis</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Monthly report trends in your jurisdiction</p>
          </div>
        </div>
        <div className="flex items-end gap-4 h-48 mt-4 px-2">
          {[
            { month: 'Jan', count: 45 },
            { month: 'Feb', count: 52 },
            { month: 'Mar', count: 48 },
            { month: 'Apr', count: 61 },
            { month: 'May', count: 82 },
            { month: 'Jun', count: 65 },
            { month: 'Jul', count: 40 },
          ].map((data) => (
            <div key={data.month} className="flex-1 flex flex-col items-center justify-end gap-2 group h-full">
              <span className="text-sm font-bold text-secondary dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">{data.count}</span>
              <div className="w-full max-w-[40px] bg-primary/20 rounded-t-md group-hover:bg-primary transition-all duration-300 cursor-pointer relative overflow-hidden" style={{ height: `${(data.count / 100) * 100}%` }}>
                <div className="absolute bottom-0 left-0 right-0 bg-primary/30 h-1/2"></div>
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{data.month}</span>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}

export default CountyOfficialDashboard;
