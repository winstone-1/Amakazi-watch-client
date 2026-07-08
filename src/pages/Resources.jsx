import React from "react";
import { motion } from 'framer-motion';
import { Download, BookOpen, Shield, Scale, Heart, Video, FileText, Phone } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const categories = [
  {
    title: 'Safety Planning',
    icon: Shield,
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    resources: [
      { name: 'Personal Safety Plan Template', type: 'PDF', size: '245 KB', description: 'Step-by-step template to plan your safety at home and in public.' },
      { name: 'Emergency Escape Checklist', type: 'PDF', size: '112 KB', description: 'What to pack, where to go, and who to call in an emergency.' },
      { name: 'Safety Contact Card', type: 'PDF', size: '80 KB', description: 'Printable card with emergency numbers and contact information.' },
    ],
  },
  {
    title: 'Legal Rights',
    icon: Scale,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    resources: [
      { name: 'Know Your Rights – Kenya GBV Laws', type: 'PDF', size: '420 KB', description: 'Plain-language summary of the Protection Against Domestic Violence Act and Sexual Offences Act.' },
      { name: 'How to Apply for a Protection Order', type: 'PDF', size: '180 KB', description: 'Step-by-step guide with sample forms.' },
      { name: 'Police Statement Guide', type: 'PDF', size: '150 KB', description: 'How to give a statement and what to expect from the process.' },
    ],
  },
  {
    title: 'Self-Care & Healing',
    icon: Heart,
    color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    resources: [
      { name: 'Trauma Recovery Guide', type: 'PDF', size: '310 KB', description: 'Understanding trauma responses and evidence-based coping strategies.' },
      { name: 'Mindfulness Exercises for Survivors', type: 'PDF', size: '220 KB', description: 'Breathing exercises and grounding techniques.' },
      { name: 'Support for Children Affected by GBV', type: 'PDF', size: '280 KB', description: 'How to talk to children and help them process difficult events.' },
    ],
  },
  {
    title: 'Education & Awareness',
    icon: BookOpen,
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    resources: [
      { name: 'Understanding Gender-Based Violence', type: 'PDF', size: '350 KB', description: 'Types, warning signs, and community prevention strategies.' },
      { name: 'Bystander Intervention Guide', type: 'PDF', size: '190 KB', description: 'How to safely help when you witness GBV.' },
      { name: 'Community Awareness Toolkit', type: 'PDF', size: '500 KB', description: 'Materials for community leaders and teachers.' },
    ],
  },
  {
    title: 'Video Tutorials',
    icon: Video,
    color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    resources: [
      { name: 'How to File a Report on AmakaziWatch', type: 'VIDEO', size: '5 min', description: 'Step-by-step walkthrough of the reporting process.' },
      { name: 'Using the Safety Timer', type: 'VIDEO', size: '3 min', description: 'Setting up and activating the safety check-in timer.' },
      { name: 'Connecting with Peer Support', type: 'VIDEO', size: '4 min', description: 'Finding and starting a peer support session.' },
    ],
  },
  {
    title: 'Emergency Contacts',
    icon: Phone,
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    resources: [
      { name: 'Kenya Emergency Numbers', type: 'PDF', size: '75 KB', description: 'National and county-level emergency and support numbers.' },
      { name: 'GBV Service Directory – Nairobi', type: 'PDF', size: '290 KB', description: 'Comprehensive list of shelters, clinics, and legal aid in Nairobi.' },
      { name: 'GBV Service Directory – Mombasa', type: 'PDF', size: '220 KB', description: 'Comprehensive list of shelters, clinics, and legal aid in Mombasa.' },
    ],
  },
];

function Resources() {
  return (
    <div className="space-y-6">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <FileText className="h-4 w-4" />
          Resource Library
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Resources & Downloads</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Free guides, toolkits, and video tutorials to keep you informed and safe.</p>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`rounded-2xl p-2.5 ${cat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-secondary dark:text-white">{cat.title}</h2>
                </div>
                <div className="space-y-3">
                  {cat.resources.map(res => (
                    <div key={res.name} className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-secondary dark:text-white truncate">{res.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{res.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-slate-400">{res.size}</span>
                        <button
                          className="rounded-lg border border-slate-200/70 bg-white/70 p-1.5 text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition dark:border-white/10 dark:bg-slate-700/50"
                          aria-label={`Download ${res.name}`}
                          title={`Download ${res.name}`}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <GlassCard className="p-6 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Can't find what you need?{' '}
          <a href="mailto:resources@amakaziwatch.ke" className="text-primary font-semibold hover:underline">
            Request a resource
          </a>
        </p>
      </GlassCard>
    </div>
  );
}

export default Resources;
