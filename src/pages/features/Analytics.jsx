import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, FileText, Download, Sparkles } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { staggerContainer, fadeInUp } from '../../utils/animations';

// Monthly report data (mock — replace with API data when available)
const MONTHLY_DATA = [
  { month: 'Jan', reports: 45, resolved: 38, response: 22 },
  { month: 'Feb', reports: 52, resolved: 44, response: 19 },
  { month: 'Mar', reports: 48, resolved: 40, response: 21 },
  { month: 'Apr', reports: 61, resolved: 50, response: 17 },
  { month: 'May', reports: 82, resolved: 65, response: 14 },
  { month: 'Jun', reports: 65, resolved: 58, response: 18 },
  { month: 'Jul', reports: 40, resolved: 36, response: 20 },
];

const ABUSE_TYPES = [
  { label: 'Physical Violence', pct: 38, color: 'bg-red-500' },
  { label: 'Sexual Violence',   pct: 24, color: 'bg-orange-500' },
  { label: 'Psychological',     pct: 20, color: 'bg-amber-500' },
  { label: 'Economic Abuse',    pct: 12, color: 'bg-primary' },
  { label: 'Other',             pct: 6,  color: 'bg-slate-400' },
];

const COUNTY_SCORES = [
  { county: 'Nairobi',   score: 88, rank: 1 },
  { county: 'Kisumu',    score: 81, rank: 2 },
  { county: 'Mombasa',   score: 76, rank: 3 },
  { county: 'Nakuru',    score: 72, rank: 4 },
  { county: 'Eldoret',   score: 68, rank: 5 },
];

const maxReports = Math.max(...MONTHLY_DATA.map(d => d.reports));

import { Bar } from 'react-chartjs-2';
import '../../components/common/ChartSetup';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#fff',
      bodyColor: '#cbd5e1',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { color: '#94a3b8', font: { size: 12, weight: '500' } },
    },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.1)', drawBorder: false },
      ticks: { color: '#94a3b8', font: { size: 12 } },
      beginAtZero: true,
    },
  },
};

const getChartData = (data) => ({
  labels: data.map(d => d.month),
  datasets: [
    {
      label: 'Resolved',
      data: data.map(d => d.resolved),
      backgroundColor: '#f97316', // primary
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
    {
      label: 'Filed',
      data: data.map(d => d.reports),
      backgroundColor: 'rgba(249, 115, 22, 0.2)', // primary/20
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
  ],
});

function Analytics() {
  const [period, setPeriod] = useState('7m');

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Data Analytics
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Platform Analytics</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Real-time insights into GBV reporting trends, county performance, and response metrics.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['7m', '3m', '1m'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${period === p ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'}`}
              >
                {p === '7m' ? '7 Months' : p === '3m' ? '3 Months' : '1 Month'}
              </button>
            ))}
            <button className="flex items-center gap-1.5 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300">
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Summary stats */}
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Total Reports',    value: '393',  sub: 'All time',       color: 'text-primary',                       icon: FileText  },
          { label: 'Resolved',         value: '331',  sub: '84% resolution', color: 'text-emerald-600 dark:text-emerald-400', icon: TrendingUp },
          { label: 'Avg Response',     value: '18h',  sub: 'Time to action', color: 'text-accent',                        icon: BarChart3 },
          { label: 'Active Users',     value: '1,2k', sub: 'This month',     color: 'text-secondary dark:text-white',     icon: Users     },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} variants={fadeInUp}>
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${s.color}`} />
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-xs text-slate-400">{s.sub}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bar chart */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-secondary dark:text-white">Monthly Report Trend</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Reports filed (light) vs resolved (dark) per month
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-primary/20" />
              Filed
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-primary" />
              Resolved
            </div>
          </div>
        </div>
        <div className="h-64 mt-4">
          <Bar options={chartOptions} data={getChartData(MONTHLY_DATA)} />
        </div>
      </GlassCard>

      {/* Abuse types + County scores */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="font-bold text-secondary dark:text-white mb-5">Abuse Type Breakdown</h2>
          <div className="space-y-4">
            {ABUSE_TYPES.map((t, i) => (
              <div key={t.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-secondary dark:text-white">{t.label}</span>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{t.pct}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${t.pct}%` }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                    className={`h-full rounded-full ${t.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-bold text-secondary dark:text-white mb-5">County Performance Scores</h2>
          <div className="space-y-3">
            {COUNTY_SCORES.map((c, i) => (
              <motion.div
                key={c.county}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4"
              >
                <div className={`h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full font-black text-sm ${
                  i === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  i === 1 ? 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300' :
                  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                }`}>
                  #{c.rank}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-secondary dark:text-white">{c.county}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.score}%` }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <span className="text-xs font-bold text-primary w-8 text-right">{c.score}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default Analytics;
