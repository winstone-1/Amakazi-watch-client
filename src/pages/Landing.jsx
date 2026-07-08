import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Shield, Users, Phone, ArrowRight, Lock, HeartHandshake,
  Sparkles, Heart, Flower2, Star, CheckCircle, BookOpen, Scale,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import GlassCard from '../components/common/GlassCard';
import PublicNav from '../components/common/PublicNav';
import Footer from '../components/common/Footer';
import { staggerContainer, fadeInUp, floatAnimation, floatAnimationSlow, pulseRed, rotateAnimation } from '../utils/animations';

// Count-up hook
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ label, value, color, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const count = useCountUp(num, 1600, inView);
  return (
    <motion.div ref={ref} variants={fadeInUp}>
      <GlassCard className="p-5 text-center">
        <p className={`text-3xl font-black ${color}`}>{prefix}{count.toLocaleString()}{suffix}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </GlassCard>
    </motion.div>
  );
}

// Floating decorative SVG elements
function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Shield - top left */}
      <motion.div animate={floatAnimation} className="absolute left-[5%] top-[12%] opacity-20 dark:opacity-10">
        <Shield className="h-16 w-16 text-primary" />
      </motion.div>
      {/* Heart - top right */}
      <motion.div animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 0.8 } }} className="absolute right-[8%] top-[18%] opacity-25 dark:opacity-10">
        <Heart className="h-12 w-12 text-rose-400 fill-rose-300" />
      </motion.div>
      {/* Flower - bottom left */}
      <motion.div animate={rotateAnimation} className="absolute left-[3%] bottom-[20%] opacity-15 dark:opacity-8">
        <Flower2 className="h-20 w-20 text-primary" />
      </motion.div>
      {/* Star - right mid */}
      <motion.div animate={{ scale: [1, 1.18, 1], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 } }} className="absolute right-[12%] top-[50%] opacity-20 dark:opacity-10">
        <Star className="h-10 w-10 text-amber-400 fill-amber-300" />
      </motion.div>
      {/* Small shield - bottom right */}
      <motion.div animate={floatAnimationSlow} className="absolute right-[5%] bottom-[15%] opacity-15 dark:opacity-8">
        <Shield className="h-10 w-10 text-emerald-400" />
      </motion.div>
    </div>
  );
}

function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const features = [
    { icon: Shield, title: 'Safe Reporting', desc: 'Report incidents anonymously with end-to-end encryption. Your identity is protected.', color: 'bg-primary/10 text-primary' },
    { icon: HeartHandshake, title: 'Peer Support', desc: 'Connect with trained supporters 24/7. You are never alone in this journey.', color: 'bg-rose-500/10 text-rose-500' },
    { icon: Scale, title: 'Legal Rights', desc: 'AI-powered legal bot explains your rights under Kenyan law in plain language.', color: 'bg-sky-500/10 text-sky-500' },
    { icon: Lock, title: 'Evidence Vault', desc: 'Store photos, documents, and voice notes in an encrypted digital vault.', color: 'bg-emerald-500/10 text-emerald-600' },
    { icon: Users, title: 'Find Organisations', desc: 'Directory of 89+ verified organisations offering shelter, legal aid, and counseling.', color: 'bg-violet-500/10 text-violet-600' },
    { icon: BookOpen, title: 'Education Centre', desc: 'Articles, videos, and guides on GBV awareness, safety planning, and recovery.', color: 'bg-amber-500/10 text-amber-600' },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div key={f.title} variants={fadeInUp} custom={i} whileHover={{ y: -4, transition: { duration: 0.18 } }}>
            <GlassCard className="p-5 h-full" hover={false}>
              <div className={`inline-flex rounded-2xl p-2.5 mb-3 ${f.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-secondary dark:text-white mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </GlassCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Landing() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.16),_transparent_32%),linear-gradient(135deg,_#fff8ef_0%,_#fdf6ec_45%,_#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_32%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">

      {/* Public nav */}
      <PublicNav />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-20">
        <FloatingElements />

        {/* Hero */}
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left copy */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-xl dark:border-orange-400/20 dark:bg-slate-800/70">
                <Sparkles className="h-3.5 w-3.5" />
                Kenya's Digital Safety Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-4 text-5xl font-black tracking-tight text-secondary dark:text-white sm:text-6xl lg:text-7xl leading-[1.08]"
            >
              Your Voice,
              <br />
              <span className="text-primary">Your Power</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mx-auto max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 lg:mx-0"
            >
              Kenya's first crowdsourced GBV awareness, reporting and prevention platform — built for women, by advocates.
            </motion.p>

            {/* CTA buttons — staggered */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              {[
                { label: 'Report Now', icon: Shield, action: () => navigate('/register'), primary: true },
                { label: 'Find Help', icon: Users, action: () => navigate('/organisations'), primary: false },
                { label: 'SOS — 1195', icon: Phone, action: () => window.location.href = 'tel:1195', danger: true },
              ].map((btn, i) => (
                <motion.button
                  key={btn.label}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={btn.action}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition ${
                    btn.danger
                      ? 'border border-red-200/70 bg-red-50/80 text-red-600 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-400'
                      : btn.primary
                        ? 'bg-primary text-white shadow-[0_16px_35px_-18px_rgba(255,107,53,0.85)] hover:bg-orange-600'
                        : 'border border-slate-200 bg-white/80 text-slate-700 shadow-sm hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200'
                  }`}
                >
                  <btn.icon className="h-4 w-4" />
                  {btn.label}
                  {btn.primary && <ArrowRight className="h-4 w-4" />}
                  {btn.danger && (
                    <motion.span
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="inline-block h-2 w-2 rounded-full bg-red-500 ml-1"
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Secondary links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 lg:justify-start"
            >
              {[
                { to: '/about', label: 'About Us' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/stories', label: 'Success Stories' },
                { to: '/donate', label: 'Support Us' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="hover:text-primary transition">
                  {link.label} →
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right — video card + emergency */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="space-y-4"
          >
            <GlassCard className="relative overflow-hidden p-3 sm:p-4" hover={false}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,107,53,0.18),_transparent_40%)]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[20px] border border-white/20 bg-slate-950/90">
                <video
                  className="h-64 w-full object-cover sm:h-72"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  autoPlay muted loop playsInline
                  aria-label="AmakaziWatch platform overview video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">Safe · Supported · Heard</p>
                  <p className="mt-1 text-base font-semibold leading-snug">Helping women across Kenya find safety and support.</p>
                </div>
              </div>

              <div className="relative mt-4">
                <div className="flex items-center justify-between rounded-2xl border border-red-200/70 bg-red-50/80 px-4 py-3.5 dark:border-red-400/20 dark:bg-red-950/30">
                  <div>
                    <p className="text-2xl font-black text-red-600 dark:text-red-400">1195</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Toll-free GBV helpline</p>
                  </div>
                  <motion.a
                    href="tel:1195"
                    animate={pulseRed}
                    whileHover={{ scale: 1.06 }}
                    className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg"
                    aria-label="Call emergency helpline 1195"
                  >
                    <Phone className="h-4 w-4" />
                    SOS
                  </motion.a>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/80 p-3.5 dark:border-emerald-400/20 dark:bg-emerald-950/30">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      <Lock className="h-3.5 w-3.5" />Private & Encrypted
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">End-to-end encrypted reporting and support.</p>
                  </div>
                  <div className="rounded-2xl border border-sky-200/70 bg-sky-50/80 p-3.5 dark:border-sky-400/20 dark:bg-sky-950/30">
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300">
                      <HeartHandshake className="h-3.5 w-3.5" />24/7 Support
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Peer supporters and counselors always available.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          <StatCard label="Reports filed" value="1247" color="text-primary" suffix="+" />
          <StatCard label="Active organisations" value="89" color="text-secondary dark:text-white" />
          <StatCard label="Counties covered" value="47" color="text-accent" />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: Shield, label: 'Government Certified' },
            { icon: Lock, label: 'Bank-Level Encryption' },
            { icon: CheckCircle, label: 'GDPR Compliant' },
          ].map(b => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur-sm dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300">
                <Icon className="h-4 w-4 text-emerald-500" />
                {b.label}
              </div>
            );
          })}
        </motion.div>

        {/* Features */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-black text-secondary dark:text-white">Everything You Need to Stay Safe</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Tools, support, and information — all in one place.</p>
          </motion.div>
          <Features />
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20"
        >
          <GlassCard className="p-8 sm:p-12 text-center" hover={false}>
            <h2 className="text-3xl font-black text-secondary dark:text-white mb-3">Ready to Make a Difference?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of women and advocates using AmakaziWatch to create a safer Kenya.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link to="/register" className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-white shadow-xl shadow-primary/25 hover:bg-orange-600 transition">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link to="/donate" className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-8 py-3.5 font-semibold text-slate-700 shadow-sm hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200 transition">
                  <Heart className="h-4 w-4 text-rose-500" /> Support Our Mission
                </Link>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <Footer />
      </div>
    </div>
  );
}

export default Landing;
