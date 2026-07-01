import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Calendar, Tag, ArrowRight, Share2 } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import PublicNav from '../components/common/PublicNav';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';

const categories = ['All', 'Awareness', 'Legal Updates', 'Events', 'Partnerships', 'Platform News'];

const posts = [
  {
    id: 1,
    category: 'Legal Updates',
    title: 'New Amendments to the Sexual Offences Act: What Survivors Need to Know',
    excerpt: 'Parliament passed key amendments that strengthen protections for GBV survivors and increase penalties for perpetrators. Here\'s a plain-language breakdown.',
    author: 'AmakaziWatch Legal Team',
    date: 'May 10, 2025',
    readTime: '5 min read',
    color: 'from-blue-500/10 to-sky-500/5',
  },
  {
    id: 2,
    category: 'Awareness',
    title: '16 Days of Activism: How AmakaziWatch Communities Made an Impact',
    excerpt: 'During the annual 16 Days of Activism against GBV, AmakaziWatch communities organized 47 events across 18 counties, reaching over 12,000 people.',
    author: 'Community Team',
    date: 'December 10, 2024',
    readTime: '4 min read',
    color: 'from-orange-500/10 to-amber-500/5',
  },
  {
    id: 3,
    category: 'Platform News',
    title: 'Introducing the Safety Timer: Your Always-On Safety Net',
    excerpt: 'We\'ve launched a new Safety Timer feature that automatically alerts your trusted contacts if you don\'t check in on time. Here\'s how to set it up.',
    author: 'Product Team',
    date: 'April 15, 2025',
    readTime: '3 min read',
    color: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    id: 4,
    category: 'Partnerships',
    title: 'AmakaziWatch Partners with 12 New Organizations in Western Kenya',
    excerpt: 'We are excited to announce partnerships with 12 civil society organizations covering Kakamega, Bungoma, Busia, and surrounding counties.',
    author: 'Partnerships Team',
    date: 'March 22, 2025',
    readTime: '2 min read',
    color: 'from-violet-500/10 to-purple-500/5',
  },
  {
    id: 5,
    category: 'Events',
    title: 'Join Us: GBV Prevention Summit, Nairobi — June 2025',
    excerpt: 'AmakaziWatch will be hosting its first annual GBV Prevention Summit, bringing together policymakers, NGOs, survivors, and tech innovators.',
    author: 'Events Team',
    date: 'May 1, 2025',
    readTime: '2 min read',
    color: 'from-rose-500/10 to-pink-500/5',
  },
  {
    id: 6,
    category: 'Awareness',
    title: 'Understanding Coercive Control: The Hidden Face of Domestic Violence',
    excerpt: 'Coercive control — emotional manipulation, financial abuse, and isolation — is now recognized as a form of GBV under Kenyan law. Learn the warning signs.',
    author: 'Research Team',
    date: 'February 28, 2025',
    readTime: '6 min read',
    color: 'from-amber-500/10 to-yellow-500/5',
  },
];

function Blog() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = posts.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (expanded) {
    const post = posts.find(p => p.id === expanded);
    return (
      <div className="space-y-6">
        <button onClick={() => setExpanded(null)} className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          ← Back to Blog
        </button>
        <GlassCard className={`p-8 bg-gradient-to-br ${post.color}`}>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">{post.category}</span>
          <h1 className="text-3xl font-black text-secondary dark:text-white mb-2">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{post.excerpt}</p>
          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            This is a preview. Full article content would be loaded from the backend API. The AmakaziWatch blog covers awareness campaigns, legal updates, platform news, community events, and partnership announcements — all aimed at ending GBV in Kenya.
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
        <PublicNav />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <BookOpen className="h-4 w-4" />
          Blog
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">News & Articles</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Stay informed with the latest updates, legal news, and community stories.</p>
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-lg pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/70 bg-white/80 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white text-sm"
          />
        </div>
      </GlassCard>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === cat ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-[24px] bg-gradient-to-br ${post.color} border border-white/70 dark:border-white/10 p-6 flex flex-col`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <Tag className="h-3 w-3" />
                {post.category}
              </span>
              <button className="text-slate-400 hover:text-primary transition" aria-label="Share article">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
            <h2 className="font-bold text-secondary dark:text-white text-sm leading-snug mb-2">{post.title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
              </div>
              <button
                onClick={() => setExpanded(post.id)}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Read more <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <GlassCard className="p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">No articles found.</p>
        </GlassCard>
      )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Blog;
