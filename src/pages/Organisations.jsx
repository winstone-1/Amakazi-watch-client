import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Search, Star, Phone, Globe, AlertCircle, Sparkles, BookmarkPlus } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import SkeletonCard from '../components/common/SkeletonCard';
import OrganisationLogo from '../components/common/OrganisationLogo';
import { getOrganisations } from '../api/org';
import { useToast } from '../context/ToastContext';

const COUNTIES = ['All Counties', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Machakos', 'Kakamega', 'Kisii', 'Nyeri', 'Meru'];
const TYPES = ['All Types', 'Shelter', 'Legal Aid', 'Counseling', 'Medical', 'NGO'];

// Fallback data if API not available
const FALLBACK_ORGS = [
  { id: 1, name: 'FIDA Kenya', type: 'Legal Aid', county: 'Nairobi', phone: '0800 720 999', website: 'https://fidakenya.org', rating: 4.8, description: 'Free legal aid and advocacy for women and girls.' },
  { id: 2, name: "Women's Rights Initiative", type: 'NGO', county: 'Kisumu', phone: '0711 234 567', rating: 4.5, description: 'Community-based support and advocacy in Western Kenya.' },
  { id: 3, name: 'GBV Recovery Center', type: 'Shelter', county: 'Mombasa', phone: '0722 345 678', rating: 4.7, description: 'Safe shelter and psychosocial support for GBV survivors.' },
  { id: 4, name: 'Nairobi Womens Hospital', type: 'Medical', county: 'Nairobi', phone: '0800 723 253', website: 'https://nwch.co.ke', rating: 4.9, description: 'Dedicated GBV medical care and post-rape care kits.' },
  { id: 5, name: 'Nakuru GBV Response', type: 'Counseling', county: 'Nakuru', phone: '0734 456 789', rating: 4.6, description: 'Professional counseling and trauma recovery services.' },
];

function OrgCard({ org }) {
  const { success } = useToast();
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
      <GlassCard className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <OrganisationLogo logo={org.logo} name={org.name} size="sm" />
            <div>
              <h3 className="font-bold text-secondary dark:text-white">{org.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-950/30 dark:text-sky-300">{org.type}</span>
              </div>
            </div>
          </div>
          {org.rating && (
            <div className="flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 flex-shrink-0">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{org.rating}</span>
            </div>
          )}
        </div>

        {org.description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex-1">{org.description}</p>
        )}

        <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 flex-shrink-0" />{org.county}</div>
          {org.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 flex-shrink-0" />{org.phone}</div>}
          {org.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 flex-shrink-0" />
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{org.website.replace('https://', '')}</a>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          {org.phone && (
            <a href={`tel:${org.phone.replace(/\s/g, '')}`} className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600 transition">
              <Phone className="h-3.5 w-3.5" />
              Call Now
            </a>
          )}
          <button onClick={() => success('Bookmarked!')} className="flex items-center justify-center gap-1.5 rounded-full border border-slate-200/70 dark:border-white/10 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition">
            <BookmarkPlus className="h-3.5 w-3.5" />
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function Organisations() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [search, setSearch] = useState('');
  const [county, setCounty] = useState('All Counties');
  const [type, setType] = useState('All Types');

  useEffect(() => {
    const fetchOrgs = async () => {
      setLoading(true);
      try {
        const data = await getOrganisations();
        const list = data.results || data || [];
        setOrgs(list.length > 0 ? list : FALLBACK_ORGS);
      } catch {
        setOrgs(FALLBACK_ORGS);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOrgs();
  }, []);

  const filtered = orgs.filter(o => {
    const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase()) || (o.description || '').toLowerCase().includes(search.toLowerCase());
    const matchCounty = county === 'All Counties' || o.county === county;
    const matchType = type === 'All Types' || o.type === type;
    return matchSearch && matchCounty && matchType;
  });

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              {orgs.length} Organisations
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Find Support Near You</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Verified organisations offering shelter, legal aid, counseling, and medical support.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search organisations…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/70 bg-white/80 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
            />
          </div>
          <select value={county} onChange={e => setCounty(e.target.value)} className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white">
            {COUNTIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white">
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </GlassCard>

      {apiError && (
        <div className="flex items-center gap-2 rounded-2xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm text-amber-700 dark:border-amber-400/20 dark:bg-amber-950/30 dark:text-amber-300">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          Showing sample data — backend not reachable.
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} lines={3} />)}
        </div>
      ) : filtered.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <Building2 className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="font-semibold text-secondary dark:text-white mb-1">No organisations found</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters.</p>
        </GlassCard>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(org => <OrgCard key={org.id} org={org} />)}
        </div>
      )}
    </div>
  );
}

export default Organisations;
