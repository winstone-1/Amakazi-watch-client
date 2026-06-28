import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Filter, Users, Building2, UserCheck, Plus } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const categories = [
  { id: 'all', label: 'All Stories' },
  { id: 'survivor', label: 'Survivor', icon: Heart },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'counselor', label: 'Counselor', icon: UserCheck },
];

const stories = [
  {
    id: 1,
    category: 'survivor',
    name: 'Wanjiru M.',
    county: 'Nairobi',
    title: 'Finding My Voice Again',
    excerpt: 'After years of silence, I finally found the courage to report through AmakaziWatch. Within 48 hours, I was connected to a shelter and a legal advocate.',
    detail: 'The platform made it easy to report without fear. The anonymous option gave me the courage to take the first step. The organization I was matched with provided shelter, counseling, and legal support. Six months later, I have a protection order and I am rebuilding my life.',
    stars: 5,
    date: 'March 2025',
    color: 'from-rose-500/20 to-orange-500/10',
  },
  {
    id: 2,
    category: 'survivor',
    name: 'Akinyi D.',
    county: 'Kisumu',
    title: 'The Safety Timer Saved My Life',
    excerpt: 'I set the safety timer before a meeting I was unsure about. When I missed check-in, my contacts called the police. The response was immediate.',
    detail: 'I had a gut feeling something was wrong. I set the safety timer for 2 hours. When I couldn\'t check in, my cousin received an alert with my location. The police arrived within 20 minutes. AmakaziWatch gave me a safety net I didn\'t know I needed.',
    stars: 5,
    date: 'January 2025',
    color: 'from-sky-500/20 to-blue-500/10',
  },
  {
    id: 3,
    category: 'organization',
    name: 'Hope Center Mombasa',
    county: 'Mombasa',
    title: '200+ Cases Managed Through the Platform',
    excerpt: 'Since joining AmakaziWatch, our case management efficiency increased by 40%. The case matching feature ensures survivors reach us faster.',
    detail: 'Before AmakaziWatch, referrals came through scattered channels. Now, the platform automatically matches cases to our available resources. Our response time dropped from 72 hours to under 24 hours. We have helped over 200 women in the past year alone.',
    stars: 5,
    date: 'February 2025',
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    id: 4,
    category: 'counselor',
    name: 'Dr. Njeri K.',
    county: 'Nakuru',
    title: 'Reaching Clients Who Never Had Access Before',
    excerpt: 'The peer support feature connects me with clients in remote areas who could never afford in-person sessions. Technology is closing the gap.',
    detail: 'I work with survivors in rural Nakuru. Many cannot travel to Nakuru Town. Through AmakaziWatch\'s peer support, I can hold secure sessions from my clinic while they connect from a phone. The impact on remote communities has been remarkable.',
    stars: 5,
    date: 'April 2025',
    color: 'from-violet-500/20 to-purple-500/10',
  },
  {
    id: 5,
    category: 'survivor',
    name: 'Fatuma A.',
    county: 'Garissa',
    title: 'Legal Rights I Never Knew I Had',
    excerpt: 'The Legal Bot explained my rights in plain Swahili. I learned I could apply for a free protection order. The court granted it the same day.',
    detail: 'I had no money for a lawyer. The Legal Bot walked me through the Protection Against Domestic Violence Act step by step. It helped me draft my statement. I went to the court alone but prepared. The order was granted by afternoon.',
    stars: 5,
    date: 'March 2025',
    color: 'from-amber-500/20 to-yellow-500/10',
  },
];

function StoryCard({ story, onExpand }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[24px] bg-gradient-to-br ${story.color} border border-white/70 dark:border-white/10 p-6 cursor-pointer hover:-translate-y-1 transition-transform duration-200`}
      onClick={() => onExpand(story)}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-bold text-secondary dark:text-white">{story.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{story.name} · {story.county} · {story.date}</p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: story.stars }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          ))}
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{story.excerpt}</p>
      <button className="mt-4 text-xs font-semibold text-primary hover:underline">Read full story →</button>
    </motion.div>
  );
}

function Stories() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered = activeCategory === 'all' ? stories : stories.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-6">
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setExpanded(null)}>
          <div className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-[24px] p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <p className="text-xs text-slate-400 mb-1">{expanded.name} · {expanded.county} · {expanded.date}</p>
            <h2 className="text-xl font-black text-secondary dark:text-white mb-4">{expanded.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{expanded.detail}</p>
            <button onClick={() => setExpanded(null)} className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">Close</button>
          </div>
        </div>
      )}

      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Heart className="h-4 w-4" />
          Community
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Success Stories</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Real stories of courage, recovery, and impact. Names and details changed to protect privacy.</p>
      </GlassCard>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === cat.id ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(story => (
          <StoryCard key={story.id} story={story} onExpand={setExpanded} />
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <h2 className="font-bold text-secondary dark:text-white">Share Your Story</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your experience could inspire someone else to take action. All stories are anonymized.</p>
          </div>
          <a
            href="mailto:stories@amakaziwatch.ke?subject=My Story"
            className="flex-shrink-0 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition"
          >
            <Plus className="h-4 w-4" />
            Share Your Story
          </a>
        </div>
      </GlassCard>
    </div>
  );
}

export default Stories;
