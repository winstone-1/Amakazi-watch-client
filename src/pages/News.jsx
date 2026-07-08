import React from "react";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Bell, Calendar, Tag, ArrowRight, CheckCircle } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import PublicNav from '../components/common/PublicNav';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';

const newsItems = [
  {
    id: 1,
    type: 'Platform Update',
    title: 'AmakaziWatch v2.0 Launches with New Safety Features',
    date: 'May 15, 2025',
    summary: 'We\'ve launched major improvements including the AI-powered Safety Risk Assessment, enhanced Peer Support matching, and offline mode for areas with limited connectivity.',
    color: 'from-primary/10 to-orange-500/5',
  },
  {
    id: 2,
    type: 'Partnership',
    title: 'New Partnership with Kenya National Police Service',
    date: 'May 5, 2025',
    summary: 'AmakaziWatch has signed an MOU with the Kenya National Police Service to streamline report referrals and improve police response times to GBV incidents.',
    color: 'from-blue-500/10 to-sky-500/5',
  },
  {
    id: 3,
    type: 'Award',
    title: 'AmakaziWatch Wins Digital Impact Africa Award 2025',
    date: 'April 28, 2025',
    summary: 'We are proud to have been recognized as the most impactful digital platform for GBV prevention in East Africa at the Digital Impact Africa Summit.',
    color: 'from-amber-500/10 to-yellow-500/5',
  },
  {
    id: 4,
    type: 'Event',
    title: 'First Annual GBV Prevention Summit — Nairobi, June 14–15',
    date: 'April 20, 2025',
    summary: 'Join us for two days of panels, workshops, and networking with policymakers, NGO leaders, tech innovators, and survivors. Registration is open.',
    color: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    id: 5,
    type: 'Press Release',
    title: 'AmakaziWatch Reaches 50,000 Registered Users',
    date: 'April 10, 2025',
    summary: 'We have surpassed 50,000 registered users, with representation from all 47 counties. This milestone reflects the urgent need for accessible GBV support tools.',
    color: 'from-violet-500/10 to-purple-500/5',
  },
  {
    id: 6,
    type: 'Platform Update',
    title: 'Multilingual Support: AmakaziWatch Now Available in Swahili',
    date: 'March 25, 2025',
    summary: 'Full Swahili language support is now available across the platform, making AmakaziWatch accessible to millions of Kenyans who prefer to interact in Swahili.',
    color: 'from-rose-500/10 to-pink-500/5',
  },
];

const eventTypes = ['All', 'Platform Update', 'Partnership', 'Award', 'Event', 'Press Release'];

function News() {
  const { darkMode } = useTheme();
  const [activeType, setActiveType] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = activeType === 'All' ? newsItems : newsItems.filter(n => n.type === activeType);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
        <PublicNav />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Newspaper className="h-4 w-4" />
          Newsroom
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Latest News</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Platform updates, partnerships, events, and press releases from AmakaziWatch.</p>
      </GlassCard>

      <div className="flex flex-wrap gap-2">
        {eventTypes.map(t => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeType === t ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-[24px] bg-gradient-to-br ${item.color} border border-white/70 dark:border-white/10 p-6`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <Tag className="h-3 w-3" />
                    {item.type}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <h2 className="font-bold text-secondary dark:text-white mb-2">{item.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.summary}</p>
              </div>
              <button className="flex-shrink-0 flex items-center gap-1.5 rounded-full border border-slate-200/70 dark:border-white/10 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition">
                Read More <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <h2 className="font-bold text-secondary dark:text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              Stay Updated
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Subscribe to our newsletter for monthly updates.</p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-semibold">Subscribed!</span>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubscribed(true); }} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white w-52"
              />
              <button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </GlassCard>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default News;
