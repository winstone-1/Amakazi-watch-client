import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { motion } from 'framer-motion';
import { Activity, Filter, MapPin, Shield, Sparkles, Layers, Building2, Search } from 'lucide-react';
import { fetchHeatmapData, fetchNgoData, fetchScoreData } from '../api/heatmap';
import GlassCard from '../components/common/GlassCard';
import SkeletonCard from '../components/common/SkeletonCard';

const kenyaBounds = [
  [-4.65, 33.9],
  [4.62, 41.9],
];

const serviceOptions = ['counseling', 'legal aid', 'shelter', 'medical'];

function HeatmapLayer({ points, radius = 28, blur = 18 }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return undefined;

    const heatLayer = L.heatLayer(
      points.map((point) => [point.lat, point.lng, point.count / 10]),
      {
        radius,
        blur,
        gradient: { 0.2: '#ffe0b2', 0.5: '#ff8a3d', 0.8: '#ff5a36', 1.0: '#b42318' },
      }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, radius, blur]);

  return null;
}

function GeoBoundaryLayer({ scoreData }) {
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/openpolis/kenya-counties/master/kenya-counties.geojson')
      .then((res) => res.json())
      .then((data) => setGeojson(data))
      .catch(() => setGeojson(null));
  }, []);

  const style = (feature) => {
    const countyName = feature?.properties?.name || feature?.properties?.COUNTY_NAM || feature?.properties?.county;
    const scoreEntry = scoreData.find((item) => item.county?.toLowerCase() === countyName?.toLowerCase());
    const score = scoreEntry?.score || 55;
    const color = score >= 80 ? '#16a34a' : score >= 70 ? '#f59e0b' : score >= 60 ? '#fb923c' : '#ef4444';

    return {
      fillColor: color,
      weight: 1,
      opacity: 0.5,
      color: '#f8fafc',
      fillOpacity: 0.18,
    };
  };

  if (!geojson) return null;

  return <GeoJSON data={geojson} style={style} />;
}

function HeatmapPage() {
  const [view, setView] = useState('combined');
  const [countyFilter, setCountyFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [heatmapData, setHeatmapData] = useState([]);
  const [ngoData, setNgoData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCounty, setSelectedCounty] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [heatmap, ngos, scores] = await Promise.all([fetchHeatmapData(), fetchNgoData(), fetchScoreData()]);
        setHeatmapData(heatmap);
        setNgoData(ngos);
        setScoreData(scores);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const counties = useMemo(() => [
    ...new Set(heatmapData.map((item) => item.county).filter(Boolean)),
  ], [heatmapData]);

  const filteredNgos = useMemo(() => {
    return ngoData.filter((org) => {
      const countyMatch = !countyFilter || org.county?.toLowerCase().includes(countyFilter.toLowerCase());
      const serviceMatch = serviceFilter === 'all' || org.services?.some((service) => service.toLowerCase() === serviceFilter.toLowerCase());
      return countyMatch && serviceMatch;
    });
  }, [ngoData, countyFilter, serviceFilter]);

  const heatmapPoints = useMemo(() => {
    return heatmapData.filter((point) => {
      const countyMatch = !countyFilter || point.county?.toLowerCase().includes(countyFilter.toLowerCase());
      return countyMatch;
    });
  }, [heatmapData, countyFilter]);

  const stats = useMemo(() => ({
    reports: heatmapData.reduce((sum, item) => sum + (item.count || 0), 0),
    ngos: filteredNgos.length,
    counties: new Set(heatmapData.map((item) => item.county)).size,
  }), [heatmapData, filteredNgos]);

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Incident intelligence
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Kenya incident heatmap</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Explore report density, NGO reach, and county-level insight layers across Kenya with a glassy, mobile-friendly map workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['combined', 'heatmap', 'ngos'].map((option) => (
              <button
                key={option}
                onClick={() => setView(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  view === option ? 'bg-primary text-white shadow-lg' : 'border border-slate-200/70 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300'
                }`}
              >
                {option === 'combined' ? 'Combined' : option === 'heatmap' ? 'Report Heatmap' : 'NGO Locations'}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="overflow-hidden p-3 sm:p-4">
          {loading ? (
            <div className="flex h-[62vh] items-center justify-center rounded-[24px] border border-slate-200/70 bg-white/50 p-6 dark:border-white/10 dark:bg-slate-900/60">
              <SkeletonCard className="w-full max-w-md" lines={5} />
            </div>
          ) : (
            <div className="relative h-[62vh] min-h-[420px] overflow-hidden rounded-[24px] border border-white/70 bg-slate-100 dark:border-white/10 dark:bg-slate-900/60">
              <div className="absolute left-3 top-3 z-[1000] flex flex-wrap gap-2 rounded-2xl border border-white/70 bg-white/80 p-2 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/80">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                  <Filter className="h-4 w-4" />
                  Controls
                </div>
                <select
                  value={countyFilter}
                  onChange={(event) => setCountyFilter(event.target.value)}
                  className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-2 text-sm text-slate-600 outline-none dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300"
                >
                  <option value="">All counties</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
                <select
                  value={serviceFilter}
                  onChange={(event) => setServiceFilter(event.target.value)}
                  className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-2 text-sm text-slate-600 outline-none dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300"
                >
                  <option value="all">All services</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <MapContainer center={[-1.286389, 36.817223]} zoom={7} minZoom={6} maxBounds={kenyaBounds} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoBoundaryLayer scoreData={scoreData} />
                {(view === 'combined' || view === 'heatmap') && <HeatmapLayer points={heatmapPoints} />}
                {(view === 'combined' || view === 'ngos') && (
                  <MarkerClusterGroup chunkedLoading>
                    {filteredNgos.map((org) => (
                      <CircleMarker key={org.id} center={[org.lat, org.lng]} radius={8} pathOptions={{ color: '#ff6b35', fillColor: '#27ae60', fillOpacity: 0.95, weight: 2 }}>
                        <Popup>
                          <div className="space-y-1 text-sm">
                            <p className="font-semibold text-secondary">{org.name}</p>
                            <p className="text-slate-600">{org.county}</p>
                            <p className="text-slate-600">Services: {org.services.join(', ')}</p>
                            <p className="text-slate-600">Contact: {org.contact}</p>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MarkerClusterGroup>
                )}
              </MapContainer>

              <div className="absolute bottom-3 left-3 z-[1000] rounded-2xl border border-white/70 bg-white/80 p-3 text-sm shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/80">
                <p className="mb-2 font-semibold text-secondary dark:text-white">Legend</p>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-[#ffe0b2]" /> Low
                  <span className="h-3 w-3 rounded-full bg-[#ff8a3d]" /> Medium
                  <span className="h-3 w-3 rounded-full bg-[#ff5a36]" /> High
                  <span className="h-3 w-3 rounded-full bg-[#b42318]" /> Critical
                </div>
              </div>
            </div>
          )}
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary dark:text-white">Live summary</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Updated from the mapped data source</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-slate-800/70">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Reports</p>
                <p className="mt-1 text-xl font-black text-primary">{stats.reports}</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-slate-800/70">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">NGOs</p>
                <p className="mt-1 text-xl font-black text-accent">{stats.ngos}</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-slate-800/70">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Counties</p>
                <p className="mt-1 text-xl font-black text-secondary dark:text-white">{stats.counties}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-accent/10 p-2 text-accent">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary dark:text-white">Filtered NGOs</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Support organisations matching your controls</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {filteredNgos.length ? filteredNgos.map((org) => (
                <div key={org.id} className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-slate-800/70">
                  <p className="font-semibold text-secondary dark:text-white">{org.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{org.county} • {org.services.join(', ')}</p>
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-slate-300/70 p-3 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  No organisations match the current filter selection.
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default HeatmapPage;
