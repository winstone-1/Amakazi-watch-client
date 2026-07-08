import React from "react";
import { Link } from 'react-router-dom';
import { Scale, MessageCircle, BookOpen, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

function LegalBot() {
  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered
            </div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">Legal Rights Bot</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Ask questions about Kenyan GBV laws and your legal rights.</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-3">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-secondary dark:text-white">Ask a Legal Question</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Get instant answers about GBV laws in Kenya</p>
          </div>
        </div>
        <Link
          to="/legal/ask"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600 sm:w-auto"
        >
          <MessageCircle className="h-5 w-5" />
          Start Asking Questions
        </Link>
      </GlassCard>

      <GlassCard className="border-sky-200/70 bg-sky-50/80 p-6 dark:border-sky-400/20 dark:bg-sky-950/30">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-sky-500/10 p-3">
            <BookOpen className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sky-900 dark:text-sky-100">Common Topics</h3>
            <p className="text-sm text-sky-700 dark:text-sky-300">Frequently asked legal questions</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'Protection Against Domestic Violence Act',
            'Sexual Offences Act',
            'Marriage Act (Matrimonial Property)',
            'Children\'s Act',
            'Evidence Collection Guidelines',
            'Court Procedures',
          ].map((topic) => (
            <div key={topic} className="flex items-center gap-2 rounded-xl border border-sky-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-sky-900 dark:border-white/10 dark:bg-sky-900/30 dark:text-sky-100">
              <Scale className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              {topic}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export default LegalBot;
