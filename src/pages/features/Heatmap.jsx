import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Map, TrendingUp, AlertTriangle, Sparkles, Download } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icons
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
  high: { fill: '#FF0000', radius: 20 },
  medium: { fill: '#FFD700', radius: 15 },
  low: { fill: '#00FF00', radius: 10 },
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
    <div className="space-y-6">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Incident Analysis
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Incident Heatmap</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              County-level GBV incident density and trend analysis across Kenya.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Map */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="relative h-[500px] w-full">
          <MapContainer
            center={[-1.2921, 36.8219]}
            zoom={7}
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
                    <div className="p-2">
                      <h3 className="font-bold">{point.county}</h3>
                      <p>Incidents: {point.incidents}</p>
                      <p>Level: {point.level.toUpperCase()}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 p-3 rounded-xl shadow-lg z-[1000]">
            <h4 className="text-sm font-semibold mb-2">Risk Level</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm">Low</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default Heatmap;