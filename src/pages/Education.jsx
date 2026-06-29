import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, Clock3, Tag, Sparkles, ArrowRight, Search } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const categories = ['All', 'Awareness', 'Legal Rights', 'Safety', 'Recovery', 'Prevention'];

const articles = [
  { id: 1, category: 'Legal Rights', title: 'Understanding the Protection Against Domestic Violence Act', readTime: '6 min', excerpt: 'A plain-language guide to your rights under Kenyan law, including how to apply for a protection order at no cost.', color: 'from-blue-500/10 to-sky-500/5' },
  { id: 2, category: 'Safety', title: 'Building Your Personal Safety Plan', readTime: '8 min', excerpt: 'Step-by-step guidance for creating an emergency escape plan, safe contacts, and an "emergency bag" for quick departures.', color: 'from-primary/10 to-orange-500/5' },
  { id: 3, category: 'Awareness', title: 'Recognising the Warning Signs of an Abusive Relationship', readTime: '5 min', excerpt: 'Emotional, financial, and physical control tactics — learn to identify early warning signs and patterns of coercive behaviour.', color: 'from-rose-500/10 to-pink-500/5' },
  { id: 4, category: 'Recovery', title: 'Healing After Trauma: What to Expect', readTime: '7 min', excerpt: 'Understanding trauma responses, the stages of recovery, and evidence-based strategies that support long-term healing.', color: 'from-emerald-500/10 to-teal-500/5' },
  { id: 5, category: 'Prevention', title: 'How Communities Can End GBV', readTime: '6 min', excerpt: 'Practical tools for community leaders, teachers, and bystanders to challenge harmful norms and prevent gender-based violence.', color: 'from-violet-500/10 to-purple-500/5' },
  { id: 6, category: 'Legal Rights', title: 'Sexual Offences Act: What Survivors Need to Know', readTime: '9 min', excerpt: 'Key provisions of Kenya\'s Sexual Offences Act including evidence requirements, court procedures, and victim protections.', color: 'from-amber-500/10 to-yellow-500/5' },
];

const videos = [
  { id: 1, title: 'Using the Safety Timer Feature', duration: '3:24', category: 'Safety', color: 'from-primary/15 to-orange-500/10' },
  { id: 2, title: 'How to File a Report Anonymously', duration: '4:12', category: 'Awareness', color: 'from-sky-500/15 to-blue-500/10' },
  { id: 3, title: 'Your Legal Rights in Under 5 Minutes', duration: '4:58', category: 'Legal Rights', color: 'from-emerald-500/15 to-teal-500/10' },
];

function Education() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (expanded) {
    const article = articles.find(a => a.id === expanded);
    return (
      <div className="space-y-6">
        <button onClick={() => setExpanded(null)} className="text-sm font-semibold text-primary hover:underline">← Back to Education</button>
        <GlassCard className={`p-8 bg-gradient-to-br ${article.color}`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">
            <Tag className="h-3 w-3" />{article.category}
          </span>
          <h1 className="text-2xl font-black text-secondary dark:text-white mb-2">{article.title}</h1>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Clock3 className="h-4 w-4" />{article.readTime} read
          </div>
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-4">{article.excerpt}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Full article content would be loaded from the backend API. This education centre provides evidence-based, Kenya-specific content on GBV awareness, legal rights, safety planning, and recovery.
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Sparkles className="h-4 w-4" />
          Education Centre
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Learn & Stay Informed</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Evidence-based articles and videos on GBV awareness, legal rights, and safety.</p>
        <div className="mt-6 relative max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/70 bg-white/80 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
          />
        </div>
      </GlassCard>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === cat ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Videos row */}
      {(activeCategory === 'All' || videos.some(v => v.category === activeCategory)) && (
        <div>
          <h2 className="font-bold text-secondary dark:text-white mb-3">Featured Videos</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {videos.filter(v => activeCategory === 'All' || v.category === activeCategory).map((video, i) => (
              <motion.button
                key={video.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-[24px] bg-gradient-to-br ${video.color} border border-white/70 dark:border-white/10 p-5 text-left group hover:-translate-y-0.5 transition`}
              >
                <div className="flex items-center justify-center h-24 mb-3 rounded-2xl bg-slate-900/10 dark:bg-white/5 relative overflow-hidden">
                  <PlayCircle className="h-12 w-12 text-white drop-shadow-lg group-hover:scale-110 transition" />
                </div>
                <p className="font-semibold text-secondary dark:text-white text-sm">{video.title}</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                  <Clock3 className="h-3 w-3" />{video.duration}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Articles */}
      <div>
        <h2 className="font-bold text-secondary dark:text-white mb-3">Articles</h2>
        {filtered.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <BookOpen className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
            <p className="text-slate-500 dark:text-slate-400">No articles found.</p>
          </GlassCard>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className={`rounded-[24px] bg-gradient-to-br ${article.color} border border-white/70 dark:border-white/10 p-6 flex flex-col cursor-pointer hover:-translate-y-0.5 transition`}
                onClick={() => setExpanded(article.id)}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <Tag className="h-3 w-3" />{article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock3 className="h-3 w-3" />{article.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-secondary dark:text-white text-sm leading-snug mb-2 flex-1">{article.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{article.excerpt}</p>
                <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline self-start">
                  Read Article <ArrowRight className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Education;
