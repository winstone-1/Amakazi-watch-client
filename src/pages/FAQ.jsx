import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Shield, FileText, Scale, Phone } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const categories = [
  { id: 'general', label: 'General', icon: HelpCircle },
  { id: 'reporting', label: 'Reporting', icon: FileText },
  { id: 'safety', label: 'Safety', icon: Shield },
  { id: 'legal', label: 'Legal Rights', icon: Scale },
  { id: 'support', label: 'Support', icon: Phone },
];

const faqs = [
  {
    category: 'general',
    q: 'What is AmakaziWatch?',
    a: 'AmakaziWatch is a digital platform empowering women across Kenya to safely report gender-based violence (GBV), access support services, connect with counselors, and hold institutions accountable through transparent county scorecards.',
  },
  {
    category: 'general',
    q: 'Who can use AmakaziWatch?',
    a: 'Anyone can use AmakaziWatch — survivors, counselors, NGO staff, county officials, and community members. Each role has a tailored dashboard and features.',
  },
  {
    category: 'general',
    q: 'Is AmakaziWatch free to use?',
    a: 'Yes. Core features including reporting, safety tools, peer support, and the legal bot are completely free. Premium features for organizations are available through our subscription plans.',
  },
  {
    category: 'reporting',
    q: 'How do I submit a report anonymously?',
    a: 'During the report wizard, select "Anonymous Report" on the first step. Your identity will not be attached to the report. We recommend also using a VPN or private browsing for additional privacy.',
  },
  {
    category: 'reporting',
    q: 'What happens after I submit a report?',
    a: 'Your report is reviewed by a trusted organization in your county within 24–48 hours. You will receive status updates via the platform. You can also add follow-up notes using your case reference number.',
  },
  {
    category: 'reporting',
    q: 'Can I report on behalf of someone else?',
    a: 'Yes. When filing a report, choose "I am reporting on behalf of someone else." You will be asked for the incident details without needing the survivor\'s personal information.',
  },
  {
    category: 'safety',
    q: 'How does the safety timer work?',
    a: 'Set a timer before going somewhere potentially unsafe. If you don\'t check in when the timer ends, a silent alert is sent to your designated emergency contacts with your last known location.',
  },
  {
    category: 'safety',
    q: 'What is a safe word?',
    a: 'A safe word is a code you agree on with trusted contacts. If you send that word in a message, they know to call for help immediately without alerting anyone nearby.',
  },
  {
    category: 'safety',
    q: 'Is my data safe and secure?',
    a: 'Absolutely. All data is encrypted in transit and at rest. Reports are stored with minimal identifiable information. You can delete your account and all associated data at any time.',
  },
  {
    category: 'legal',
    q: 'What are my legal rights as a GBV survivor in Kenya?',
    a: 'Under the Protection Against Domestic Violence Act (2015) and the Sexual Offences Act (2006), you have the right to a Protection Order, free legal aid, police assistance, and medical examination at no cost. Our Legal Bot can guide you through specific situations.',
  },
  {
    category: 'legal',
    q: 'Can I get a protection order?',
    a: 'Yes. You can apply for a protection order at your nearest magistrate court. It is free of charge and can be issued the same day in emergency cases. Our Legal Bot can help you prepare your application.',
  },
  {
    category: 'support',
    q: 'Can I talk to someone right now?',
    a: 'Yes. Use the Peer Support feature to connect with a trained counselor. The national GBV helpline is also available 24/7 at 1195 (free from any phone).',
  },
  {
    category: 'support',
    q: 'How do I find help near me?',
    a: 'Go to Organisations on the sidebar. You can filter by county, type of service (shelter, legal, counseling, medical), and distance. The map view shows locations near you.',
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-slate-800/70 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-secondary dark:text-white text-sm">{item.q}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = faqs.filter(item => {
    const matchesSearch = !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <HelpCircle className="h-4 w-4" />
          Help Center
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Frequently Asked Questions</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Find answers to common questions about AmakaziWatch.</p>

        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-lg pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/70 bg-white/80 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white text-sm"
          />
        </div>
      </GlassCard>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === 'all' ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'}`}
        >
          All
        </button>
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === cat.id ? 'bg-primary text-white shadow' : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item, i) => <FAQItem key={i} item={item} />)
        ) : (
          <GlassCard className="p-8 text-center">
            <HelpCircle className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
            <p className="text-slate-500 dark:text-slate-400">No results found for "{search}"</p>
          </GlassCard>
        )}
      </div>

      <GlassCard className="p-6 text-center">
        <h2 className="font-bold text-secondary dark:text-white mb-2">Still have questions?</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Our team is here to help. Reach us at any time.</p>
        <a
          href="mailto:support@amakaziwatch.ke"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition"
        >
          Contact Support
        </a>
      </GlassCard>
    </div>
  );
}

export default FAQ;
