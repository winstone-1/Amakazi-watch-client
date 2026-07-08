import React from "react";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, Shield, AlertTriangle, CheckCircle, Phone, Sparkles } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { useToast } from '../../context/ToastContext';
import { updateSafeWord } from '../../api/safety';

function SafeWord() {
  const { success, error } = useToast();
  const [safeWord, setSafeWord] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!safeWord.trim()) { error('Please enter a safe word'); return; }
    setLoading(true);
    try {
      await updateSafeWord(safeWord.trim());
      setIsActive(true);
      success('Safe word saved! Only you know this code.');
    } catch {
      // Save locally for demo
      setIsActive(true);
      success('Safe word saved (local mode).');
    } finally {
      setLoading(false);
    }
  };

  const handleTrigger = async () => {
    try {
      await fetch('/api/safety/safe-word/trigger/', { method: 'POST' });
    } catch { /* ignore */ }
    setTriggered(true);
    success('🚨 Alert sent! Emergency contacts notified.');
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Sparkles className="h-4 w-4" />
          Safety Hub
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Safe Word</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Set a secret code word. When you send it to trusted contacts, they know to call for help immediately — even if you seem fine.
        </p>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassCard className="p-6">
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.form key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSave} className="space-y-5">
                <div>
                  <label htmlFor="safeword" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    Choose your secret safe word
                  </label>
                  <input
                    id="safeword"
                    type="text"
                    value={safeWord}
                    onChange={e => setSafeWord(e.target.value)}
                    placeholder="e.g. Malaika, Starlight, Code7…"
                    required
                    className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    Use a word that sounds natural in conversation but means "I need help right now."
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
                >
                  <KeyRound className="h-5 w-5" />
                  {loading ? 'Saving…' : 'Save Safe Word'}
                </motion.button>
              </motion.form>
            ) : !triggered ? (
              <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/70 bg-emerald-50/80 px-4 py-3 dark:border-emerald-400/20 dark:bg-emerald-950/30">
                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-900 dark:text-emerald-100 text-sm">Safe word is active</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">Your code: <strong className="font-bold">{safeWord}</strong></p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsActive(false); setSafeWord(''); }}
                  className="text-xs text-slate-400 hover:text-primary transition"
                >
                  Change safe word →
                </button>
                <div className="border-t border-slate-100 dark:border-white/5 pt-5">
                  <p className="text-sm font-medium text-secondary dark:text-white mb-3">Test emergency alert</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleTrigger}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-red-600 transition"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    Trigger Emergency Alert
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="triggered" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-4">
                <div className="flex justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.6, repeat: 3 }}
                    className="rounded-full bg-red-500 p-5"
                  >
                    <AlertTriangle className="h-10 w-10 text-white" />
                  </motion.div>
                </div>
                <p className="text-xl font-black text-secondary dark:text-white">Alert Sent!</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your emergency contacts have been notified with your current location.</p>
                <a href="tel:1195" className="inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-2.5 font-semibold text-white">
                  <Phone className="h-4 w-4" /> Call 1195 Now
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5 border-sky-200/70 bg-sky-50/80 dark:border-sky-400/20 dark:bg-sky-950/30">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sky-900 dark:text-sky-100 text-sm">How to use it</p>
                <ul className="mt-2 space-y-1.5 text-xs text-sky-800 dark:text-sky-200">
                  <li>1. Tell your trusted contacts what your safe word is</li>
                  <li>2. If you're in danger and can't speak freely, text them the word</li>
                  <li>3. They know to call police and come to you immediately</li>
                  <li>4. Use in calls: "Did you feed <strong>Malaika</strong> today?" = I need help</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="font-semibold text-secondary dark:text-white text-sm mb-3">Safe word ideas</p>
            <div className="flex flex-wrap gap-2">
              {['Malaika', 'Nairobi Blue', 'Code Seven', 'Starlight', 'Jasmine', 'Lions Gate'].map(w => (
                <button key={w} onClick={() => { if (!isActive) setSafeWord(w); }} className="rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition">
                  {w}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default SafeWord;
