import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, TrendingUp, AlertTriangle, Sparkles, Download } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import SkeletonCard from '../../components/common/SkeletonCard';
import { useToast } from '../../context/ToastContext';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const MOCK_HOTSPOTS = [
  { county: 'Nairobi', incidents: 187, change: '+12%', level: 'high' },
  { county: 'Mombasa', incidents: 94, change: '-3%', level: 'medium' },
  { county: 'Kisumu', incidents: 76, change: '+8%', level: 'medium' },
  { county: 'Nakuru', incidents: 63, change: '+2%', level: 'medium' },
  { county: 'Eldoret', incidents: 45, change: '-5%', level: 'low' },
  { county: 'Machakos', incidents: 38, change: '+1%', level: 'low' },
  { county: 'Kakamega', incidents: 32, change: '+4%', level: 'low' },
  { county: 'Kisii', incidents: 28, change: '-2%', level: 'low' },
];

const levelColors = {
  high: { bg: 'bg-red-500', text: 'text-red-600 dark:text-red-400', badge: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300' },
  medium: { bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300' },
  low: { bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300' },
};

function Heatmap() {
  const { error } = useToast();
  const [loading, setLoading] = useState(true);
  const [hotspots, setHotspots] = useState([]);
  const maxIncidents = Math.max(...MOCK_HOTSPOTS.map(h => h.incidents));

  useEffect(() => {
    // Try to load real data; fall back to mock
    const timer = setTimeout(() => {
      setHotspots(MOCK_HOTSPOTS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Incident Analysis
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Incident Heatmap</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              County-level GBV incident density and trend analysis across Kenya.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300">
            <Download className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </GlassCard>

      {/* Map placeholder */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="relative h-72 sm:h-96 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,107,53,0.6) 0%, transparent 35%), radial-gradient(circle at 65% 30%, rgba(255,107,53,0.4) 0%, transparent 25%), radial-gradient(circle at 50% 70%, rgba(255,107,53,0.3) 0%, transparent 20%)'
          }} />
          <div className="text-center z-10">
            <Map className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="font-semibold text-slate-500 dark:text-slate-400">Interactive map</p>
            <p className="text-sm text-slate-400">Connect Leaflet/MapBox for live map rendering</p>
          </div>
          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-slate-600 dark:text-slate-300">High risk</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-slate-600 dark:text-slate-300">Medium risk</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-slate-600 dark:text-slate-300">Low risk</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* County breakdown */}
      <GlassCard className="p-6">
        <h2 className="font-bold text-secondary dark:text-white mb-5">County Breakdown</h2>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4].map(i => <SkeletonCard key={i} lines={1} />)}
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-3">
            {hotspots.map((h, i) => {
              const colors = levelColors[h.level];
              const pct = Math.round((h.incidents / maxIncidents) * 100);
              return (
                <motion.div key={h.county} variants={fadeInUp} className="flex items-center gap-4">
                  <div className="w-24 flex-shrink-0">
                    <p className="text-sm font-semibold text-secondary dark:text-white truncate">{h.county}</p>
                    <p className={`text-xs ${h.change.startsWith('+') ? 'text-red-500' : 'text-emerald-500'}`}>
                      {h.change}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.07, ease: 'easeOut' }}
                        className={`h-full rounded-full ${colors.bg}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-bold text-secondary dark:text-white w-8 text-right">{h.incidents}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${colors.badge}`}>
                      {h.level}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </GlassCard>
    </div>
  );
}

export default Heatmap;
