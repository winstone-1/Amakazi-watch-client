import React from "react";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, Phone, Search, UserPlus } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const counties = ['All Counties', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Machakos', 'Kakamega', 'Kisii', 'Nyeri', 'Meru'];

const groups = [
  {
    id: 1,
    name: 'Nairobi Survivors Circle',
    county: 'Nairobi',
    location: 'Westlands Community Centre, Nairobi',
    schedule: 'Every Saturday, 10:00 AM – 12:00 PM',
    contact: 'Mary Njeri',
    phone: '0712 345 678',
    members: 24,
    type: 'In-Person',
    description: 'A safe, confidential space for women healing from domestic violence. Facilitated by a trained counselor.',
    color: 'from-rose-500/10 to-orange-500/5',
  },
  {
    id: 2,
    name: 'Mombasa Healing Hearts',
    county: 'Mombasa',
    location: 'Tudor Community Hall, Mombasa',
    schedule: 'Every Wednesday, 2:00 PM – 4:00 PM',
    contact: 'Fatuma Hassan',
    phone: '0722 456 789',
    members: 18,
    type: 'In-Person',
    description: 'Peer support group for coastal women, with sessions available in Swahili and English.',
    color: 'from-sky-500/10 to-blue-500/5',
  },
  {
    id: 3,
    name: 'Digital Sisters Kenya',
    county: 'All Counties',
    location: 'Online (Zoom)',
    schedule: 'Every Tuesday & Thursday, 7:00 PM – 8:30 PM',
    contact: 'Grace Wanjiku',
    phone: '0733 567 890',
    members: 67,
    type: 'Online',
    description: 'Virtual support group accessible from anywhere in Kenya. Ideal for women in rural areas or with mobility challenges.',
    color: 'from-violet-500/10 to-purple-500/5',
  },
  {
    id: 4,
    name: 'Kisumu Women Strong',
    county: 'Kisumu',
    location: 'Milimani Road, Kisumu',
    schedule: 'Every Monday, 9:00 AM – 11:00 AM',
    contact: 'Akinyi Atieno',
    phone: '0745 678 901',
    members: 31,
    type: 'In-Person',
    description: 'Lakeside community support group with a focus on economic empowerment alongside emotional healing.',
    color: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    id: 5,
    name: 'Nakuru Resilience Group',
    county: 'Nakuru',
    location: 'Nakuru Town, YWCA Hall',
    schedule: 'Every Friday, 3:00 PM – 5:00 PM',
    contact: 'Dr. Njeri Kamau',
    phone: '0756 789 012',
    members: 22,
    type: 'In-Person',
    description: 'Facilitated by a licensed psychologist, this group focuses on trauma recovery and rebuilding self-esteem.',
    color: 'from-amber-500/10 to-yellow-500/5',
  },
  {
    id: 6,
    name: 'Young Mothers Network',
    county: 'Nairobi',
    location: 'Kibera, St. Joseph\'s Centre',
    schedule: 'Every Sunday, 2:00 PM – 4:00 PM',
    contact: 'Ruth Waweru',
    phone: '0767 890 123',
    members: 45,
    type: 'In-Person',
    description: 'Support specifically for young mothers facing GBV, with childcare available during sessions.',
    color: 'from-pink-500/10 to-rose-500/5',
  },
];

function SupportGroups() {
  const [search, setSearch] = useState('');
  const [county, setCounty] = useState('All Counties');
  const [joinModal, setJoinModal] = useState(null);

  const filtered = groups.filter(g => {
    const matchesSearch = !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase());
    const matchesCounty = county === 'All Counties' || g.county === county || g.county === 'All Counties';
    return matchesSearch && matchesCounty;
  });

  return (
    <div className="space-y-6">
      {joinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setJoinModal(null)}>
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-[24px] p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-black text-secondary dark:text-white mb-2">Join {joinModal.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Contact the group facilitator to register:</p>
            <div className="space-y-2 mb-6">
              <p className="text-sm font-semibold text-secondary dark:text-white">{joinModal.contact}</p>
              <a href={`tel:${joinModal.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
                <Phone className="h-4 w-4" />
                {joinModal.phone}
              </a>
            </div>
            <button onClick={() => setJoinModal(null)} className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white">Close</button>
          </div>
        </div>
      )}

      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Users className="h-4 w-4" />
          Community
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Support Groups</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Find a safe space to connect with others who understand your experience.</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search groups..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/70 bg-white/80 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white text-sm"
            />
          </div>
          <select
            value={county}
            onChange={e => setCounty(e.target.value)}
            className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-2.5 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
          >
            {counties.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((group, i) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-[24px] bg-gradient-to-br ${group.color} border border-white/70 dark:border-white/10 p-6`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="font-bold text-secondary dark:text-white">{group.name}</h2>
                <span className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${group.type === 'Online' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300' : 'bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300'}`}>
                  {group.type}
                </span>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-primary">{group.members}</p>
                <p className="text-xs text-slate-400">members</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{group.description}</p>
            <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 flex-shrink-0" />{group.location}</div>
              <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 flex-shrink-0" />{group.schedule}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 flex-shrink-0" />{group.contact} · {group.phone}</div>
            </div>
            <button
              onClick={() => setJoinModal(group)}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow hover:bg-orange-600 transition"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Join Group
            </button>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <GlassCard className="p-8 text-center">
          <Users className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-slate-500 dark:text-slate-400">No groups found. Try adjusting your filters.</p>
        </GlassCard>
      )}
    </div>
  );
}

export default SupportGroups;
