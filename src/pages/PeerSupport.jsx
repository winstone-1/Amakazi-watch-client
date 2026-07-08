import React from "react";
import { Link } from 'react-router-dom';
import { Users, MessageCircle, UserPlus, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

function PeerSupport() {
  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Safe space
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Peer Support</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Connect with trained peer supporters who understand what you're going through. Confidential, compassionate, and free.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary dark:text-white">Start a Chat</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Connect with a supporter now</p>
            </div>
          </div>
          <Link
            to="/peer/chat"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
          >
            <MessageCircle className="h-5 w-5" />
            Start Chat Session
          </Link>
        </GlassCard>

        <GlassCard className="border-emerald-200/70 bg-emerald-50/80 p-6 dark:border-emerald-400/20 dark:bg-emerald-950/30">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-emerald-500/10 p-3">
              <UserPlus className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Available Supporters</h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Ready to help you now</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-emerald-200 dark:border-emerald-900 dark:bg-emerald-800" />
              ))}
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">3</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">supporters online</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-4 font-semibold text-secondary dark:text-white">What to expect</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: 'Confidential', desc: 'Your conversations are private and encrypted' },
            { title: 'Trained', desc: 'Supporters are trained in GBV response' },
            { title: 'Free', desc: 'No cost, available 24/7' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-800/50">
              <h4 className="font-semibold text-secondary dark:text-white">{item.title}</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export default PeerSupport;
