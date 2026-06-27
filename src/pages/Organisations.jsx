import GlassCard from '../components/common/GlassCard';
import { Building2, MapPin, Search, Star } from 'lucide-react';

function Organisations() {
  const orgs = [
    { name: 'FIDA Kenya', type: 'Legal Aid', county: 'Nairobi', rating: 4.8 },
    { name: 'Women’s Rights Initiative', type: 'NGO', county: 'Kisumu', rating: 4.5 },
    { name: 'GBV Recovery Center', type: 'Shelter', county: 'Mombasa', rating: 4.7 },
  ];

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary dark:text-white">Organisations</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Find verified support organisations near you.</p>
            </div>
          </div>
          <div className="relative flex-1 lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search organisations..."
              className="w-full rounded-2xl border border-slate-200/70 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none ring-0 focus:border-primary dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200"
            />
          </div>
        </div>
      </GlassCard>

      <div className="space-y-4">
        {orgs.map((org) => (
          <GlassCard key={org.name} className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-semibold text-secondary dark:text-white">{org.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>{org.type}</span>
                  <span>•</span>
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{org.county}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-600 dark:bg-amber-950/30">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-semibold">{org.rating}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

export default Organisations;
