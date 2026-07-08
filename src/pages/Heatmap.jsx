import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Sparkles, Download } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import SkeletonCard from '../components/common/SkeletonCard';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MOCK_HOTSPOTS = [
  { lat: -1.2921, lng: 36.8219, county: 'Nairobi', incidents: 187, level: 'high' },
  { lat: -4.0435, lng: 39.6682, county: 'Mombasa', incidents: 94, level: 'medium' },
  { lat: -0.1022, lng: 34.7617, county: 'Kisumu', incidents: 76, level: 'medium' },
  { lat: -0.3031, lng: 36.0800, county: 'Nakuru', incidents: 63, level: 'medium' },
  { lat: 0.5143, lng: 35.2698, county: 'Eldoret', incidents: 45, level: 'low' },
  { lat: -1.5166, lng: 37.2634, county: 'Machakos', incidents: 38, level: 'low' },
  { lat: 0.2827, lng: 34.7519, county: 'Kakamega', incidents: 32, level: 'low' },
  { lat: -0.6773, lng: 34.7660, county: 'Kisii', incidents: 28, level: 'low' },
];

const levelColors = {
  high: { fill: '#FF0000', radius: 22 },
  medium: { fill: '#FFD700', radius: 16 },
  low: { fill: '#00CC00', radius: 10 },
};

const levelLabels = {
  high: '🔴 High',
  medium: '🟡 Medium',
  low: '🟢 Low',
};

function Heatmap() {
  const [loading, setLoading] = useState(true);
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setHotspots(MOCK_HOTSPOTS);
      setLoading(false);
    }, 800);
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

      {/* Map */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="relative h-[500px] w-full">
          <MapContainer
            center={[-1.2921, 36.8219]}
            zoom={6}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hotspots.map((point, index) => {
              const colors = levelColors[point.level];
              return (
                <CircleMarker
                  key={index}
                  center={[point.lat, point.lng]}
                  radius={colors.radius}
                  fillColor={colors.fill}
                  color="#FFFFFF"
                  weight={2}
                  opacity={0.8}
                  fillOpacity={0.6}
                >
                  <Popup>
                    <div className="p-2 min-w-[150px]">
                      <h3 className="font-bold text-lg">{point.county}</h3>
                      <p className="text-sm">Incidents: <strong>{point.incidents}</strong></p>
                      <p className="text-sm">Level: {levelLabels[point.level]}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-800/95 p-3 rounded-xl shadow-lg z-[1000] border border-slate-200/70 dark:border-white/10">
            <h4 className="text-sm font-semibold mb-2 text-secondary dark:text-white">Risk Level</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">Low</span>
              </div>
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
          <div className="space-y-3">
            {hotspots.map((h, i) => {
              const colors = levelColors[h.level];
              const pct = Math.round((h.incidents / hotspots[0].incidents) * 100);
              return (
                <motion.div
                  key={h.county}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-24 flex-shrink-0">
                    <p className="text-sm font-semibold text-secondary dark:text-white truncate">{h.county}</p>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.07, ease: 'easeOut' }}
                        className={`h-full rounded-full ${h.level === 'high' ? 'bg-red-500' : h.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-bold text-secondary dark:text-white w-8 text-right">{h.incidents}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                      h.level === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300' :
                      h.level === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300'
                    }`}>
                      {h.level}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </GlassCard>
    </div>
  );
}

export default Heatmap;
