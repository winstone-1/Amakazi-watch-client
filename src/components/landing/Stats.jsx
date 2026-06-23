import React from 'react';
import { TrendingUp, Activity, MapPin } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export const Stats = () => {
  const { t } = useTranslation();

  const hotspots = [
    { name: 'Nairobi', level: 'High', count: 1840 },
    { name: 'Mombasa', level: 'High', count: 912 },
    { name: 'Kiambu', level: 'Medium', count: 684 },
    { name: 'Nakuru', level: 'Medium', count: 480 },
  ];

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/60 shadow-glass mb-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-primary/10 text-brand-primary uppercase tracking-widest">
            Live updates
          </span>
          <h2 className="text-2xl font-bold text-brand-dark mt-1">
            {t('liveSafetyInsights')}
          </h2>
        </div>
        <p className="text-xs text-brand-muted max-w-xs md:text-right">
          Real-time data visualization of reporting trends across Kenya's 47 counties.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* KPI stats */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
          <div className="bg-white/80 p-5 rounded-2xl border border-brand-peach/30 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                {t('helpLineCalls')}
              </p>
              <p className="text-3xl font-extrabold text-brand-dark mt-1">1,284</p>
              <div className="flex items-center gap-1 text-xs text-brand-success font-semibold mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12% from yesterday</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 p-5 rounded-2xl border border-brand-peach/30 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                {t('activeCases')}
              </p>
              <p className="text-3xl font-extrabold text-brand-dark mt-1">4,912</p>
              <p className="text-xs text-brand-muted mt-1.5 font-medium">Nationwide Network</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Heatmap Zones Map */}
        <div className="lg:col-span-7 bg-brand-dark text-white p-5 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden min-h-60">
          {/* Subtle background graphic */}
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-12 translate-y-12">
            <svg width="250" height="250" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
              <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="1" />
              <path d="M50 0V100M0 50H100" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-peach">
                {t('highReportZones')}
              </span>
            </div>

            <div className="space-y-3.5 max-w-sm">
              {hotspots.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.level === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                    <span className="text-sm font-semibold">{item.name} County</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/60">{item.count} reports</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      item.level === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {item.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-4 flex items-center justify-between text-[11px] text-white/50 border-t border-white/10 mt-4">
            <span>Updates hourly</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-ping"></span>
              Live Feed Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
