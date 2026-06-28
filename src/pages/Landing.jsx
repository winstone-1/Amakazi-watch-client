import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, Phone, ArrowRight, ExternalLink, Sun, Moon, Sparkles, Lock, HeartHandshake, Play, Pause } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GlassCard from '../components/common/GlassCard';
import SkeletonCard from '../components/common/SkeletonCard';
import Footer from '../components/common/Footer';

function Landing() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [stats, setStats] = useState({ reports: 1247, orgs: 89, counties: 47 });
  const [loading, setLoading] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.16),_transparent_32%),linear-gradient(135deg,_#fff8ef_0%,_#fdf6ec_45%,_#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_32%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={toggleDarkMode}
            className="rounded-full border border-white/70 bg-white/80 p-2.5 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.4)] backdrop-blur-xl transition hover:scale-105 dark:border-white/10 dark:bg-slate-800/80"
          >
            {darkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-slate-600" />}
          </button>
        </div>

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="text-center lg:text-left">
              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="rounded-2xl border border-orange-200/70 bg-white/70 p-3 shadow-lg backdrop-blur-xl dark:border-orange-400/20 dark:bg-slate-800/70">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
              </div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm backdrop-blur-xl dark:border-orange-400/20 dark:bg-slate-800/70">
                <Sparkles className="h-3.5 w-3.5" />
                24/7 Digital Safety Support
              </div>
              <h1 className="mb-4 text-4xl font-black tracking-tight text-secondary dark:text-white sm:text-5xl lg:text-6xl">
                AmakaziWatch
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 lg:mx-0">
                A premium GBV awareness, reporting, and prevention platform designed for women in Kenya to access support, evidence, and safety tools with confidence.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
              >
                <button
                  onClick={() => navigate('/reports')}
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-[0_16px_35px_-18px_rgba(255,107,53,0.9)] transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  <Shield className="h-5 w-5" />
                  Report Now
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('/organisations')}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200"
                >
                  <Users className="h-5 w-5" />
                  Find Help
                </button>
              </motion.div>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 lg:justify-start">
                <button onClick={() => navigate('/about')} className="flex items-center gap-1 transition hover:text-primary">
                  About Us <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => navigate('/how-it-works')} className="flex items-center gap-1 transition hover:text-primary">
                  How It Works <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => navigate('/get-help')} className="flex items-center gap-1 transition hover:text-primary">
                  Get Help <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => navigate('/education')} className="flex items-center gap-1 transition hover:text-primary">
                  Learn More <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => navigate('/scorecards')} className="flex items-center gap-1 transition hover:text-primary">
                  View Scorecards <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <GlassCard className="relative overflow-hidden p-3 sm:p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,107,53,0.18),_transparent_32%)]" />
                <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-slate-950/90">
                  <video
                    className="h-72 w-full object-cover sm:h-80"
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onPlay={() => setVideoPlaying(true)}
                    onPause={() => setVideoPlaying(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                  <div className="absolute inset-x-0 top-0 flex justify-between p-4">
                    <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur">
                      Featured story
                    </div>
                    <button
                      onClick={() => setVideoPlaying((value) => !value)}
                      className="rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur transition hover:scale-105"
                    >
                      {videoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">Safe, supported, and heard</p>
                    <p className="mt-1 text-lg font-semibold">Hear how AmakaziWatch helps women find support and report safely.</p>
                  </div>
                </div>
                <div className="relative mt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Emergency Helpline</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Immediate support available</p>
                    </div>
                    <div className="rounded-full bg-red-500/10 p-3 text-red-500">
                      <Phone className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-red-200/70 bg-red-50/80 px-4 py-4 dark:border-red-400/20 dark:bg-red-950/30">
                    <div>
                      <p className="text-3xl font-black tracking-wide text-red-600">1195</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Toll-free national hotline</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.alert('Emergency support is available. Please call 1195 immediately if you are in danger.')}
                      className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_15px_30px_-16px_rgba(239,68,68,0.85)] transition hover:bg-red-600"
                    >
                      SOS
                    </motion.button>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/80 p-4 dark:border-emerald-400/20 dark:bg-emerald-950/30">
                      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        <Lock className="h-4 w-4" />
                        Private & Secure
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Confidential reporting tools and encrypted support paths.</p>
                    </div>
                    <div className="rounded-2xl border border-sky-200/70 bg-sky-50/80 p-4 dark:border-sky-400/20 dark:bg-sky-950/30">
                      <div className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
                        <HeartHandshake className="h-4 w-4" />
                        Guided help
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Connect to verified organisations and peer support.</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <div className="grid gap-4 sm:grid-cols-3">
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} className="min-h-[122px]" />)
                ) : (
                  [
                    { label: 'Reports filed', value: `${stats.reports}+`, color: 'text-primary' },
                    { label: 'Active organisations', value: stats.orgs, color: 'text-secondary dark:text-white' },
                    { label: 'Counties covered', value: stats.counties, color: 'text-accent' },
                  ].map((item) => (
                    <GlassCard key={item.label} className="p-4 text-center">
                      <p className={`text-2xl font-black ${item.color}`}>{item.value}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                    </GlassCard>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
