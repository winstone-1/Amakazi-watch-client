import React from "react";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock3, Play, CheckCircle, Sparkles, AlertTriangle, Phone } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { useToast } from '../../context/ToastContext';
import { startSafetyTimer, checkInTimer, getActiveTimer } from '../../api/safety';

const DURATIONS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
];

function CircleTimer({ pct, timeLeft, isActive }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - pct / 100);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="140" height="140" className="rotate-[-90deg]">
        <circle cx="70" cy="70" r={r} strokeWidth="8" className="stroke-slate-100 dark:stroke-slate-700 fill-none" />
        <motion.circle
          cx="70" cy="70" r={r} strokeWidth="8"
          className="fill-none stroke-primary"
          strokeLinecap="round"
          strokeDasharray={circ}
          animate={{ strokeDashoffset: dash }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-black text-secondary dark:text-white leading-none">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{isActive ? 'remaining' : 'select time'}</p>
      </div>
    </div>
  );
}

function SafetyTimer() {
  const { success, error } = useToast();
  const [duration, setDuration] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // in seconds
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef(null);
  const totalSeconds = duration * 60;
  const pct = isActive ? Math.round(((totalSeconds - timeLeft) / totalSeconds) * 100) : 0;

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const startTimer = async () => {
    setIsLoading(true);
    try {
      await startSafetyTimer({ duration_seconds: duration * 60 });
      setIsActive(true);
      setTimeLeft(duration * 60);
      success('Safety timer started! Check in before it expires.');

      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            error('Timer expired! Your emergency contacts have been notified.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      // Run timer locally if backend unavailable
      setIsActive(true);
      setTimeLeft(duration * 60);
      success('Safety timer started (local mode).');
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { clearInterval(intervalRef.current); setIsActive(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await checkInTimer();
    } catch { /* ignore */ }
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeLeft(duration * 60);
    success('✅ Check-in successful! You are safe.');
  };

  const handleDurationChange = (val) => {
    if (isActive) return;
    setDuration(val);
    setTimeLeft(val * 60);
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Sparkles className="h-4 w-4" />
          Safety Hub
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Safety Timer</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Set a check-in window. If you don't check in, your emergency contacts are automatically alerted.
        </p>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassCard className="p-8 flex flex-col items-center gap-6">
          <CircleTimer pct={pct} timeLeft={timeLeft} isActive={isActive} />

          {!isActive && (
            <div className="w-full">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3 text-center">Select duration</p>
              <div className="flex flex-wrap justify-center gap-2">
                {DURATIONS.map(d => (
                  <button
                    key={d.value}
                    onClick={() => handleDurationChange(d.value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      duration === d.value
                        ? 'bg-primary text-white shadow'
                        : 'bg-white/70 text-slate-600 hover:bg-orange-50 hover:text-primary dark:bg-slate-800/70 dark:text-slate-300'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.button
                key="start"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={startTimer}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
              >
                <Play className="h-5 w-5" />
                {isLoading ? 'Starting…' : 'Start Timer'}
              </motion.button>
            ) : (
              <motion.button
                key="checkin"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleCheckIn}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 font-semibold text-white shadow-lg hover:bg-emerald-600 transition"
              >
                <CheckCircle className="h-5 w-5" />
                I'm Safe — Check In
              </motion.button>
            )}
          </AnimatePresence>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5 border-amber-200/70 bg-amber-50/80 dark:border-amber-400/20 dark:bg-amber-950/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100 text-sm">How it works</p>
                <ul className="mt-2 space-y-1.5 text-xs text-amber-800 dark:text-amber-200">
                  <li>1. Set your check-in window (15 min to 2 hours)</li>
                  <li>2. Press Start before entering a risky situation</li>
                  <li>3. Check in before the timer expires</li>
                  <li>4. If you miss check-in, contacts are alerted with your last location</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 border-red-200/70 bg-red-50/80 dark:border-red-400/20 dark:bg-red-950/30">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900 dark:text-red-100 text-sm">Emergency</p>
                <p className="text-xs text-red-700 dark:text-red-300">Call 1195 immediately if you are in danger.</p>
              </div>
              <motion.a
                href="tel:1195"
                animate={{ scale: [1, 1.08, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-auto rounded-full bg-red-500 px-4 py-1.5 text-sm font-bold text-white"
              >
                1195
              </motion.a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default SafetyTimer;
