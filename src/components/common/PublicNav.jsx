import React from "react";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sun, Moon, Menu, X, Phone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/get-help', label: 'Get Help' },
  { to: '/faq', label: 'FAQ' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

function PublicNav() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="AmakaziWatch home">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -4 }}
            className="rounded-xl bg-primary/10 p-1.5"
          >
            <Shield className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="text-lg font-bold text-secondary dark:text-white">AmakaziWatch</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 lg:flex" role="navigation" aria-label="Main navigation">
          {navLinks.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-orange-50 hover:text-primary dark:text-slate-300 dark:hover:bg-orange-900/20'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Emergency 1195 pulse button */}
          <motion.a
            href="tel:1195"
            animate={{ scale: [1, 1.06, 1], opacity: [1, 0.85, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-red-200/70 bg-red-50/80 px-3 py-1.5 text-xs font-bold text-red-600 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-400"
            aria-label="Call emergency helpline 1195"
          >
            <Phone className="h-3.5 w-3.5" />
            1195
          </motion.a>

          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleDarkMode}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode
              ? <Sun className="h-5 w-5 text-yellow-400" />
              : <Moon className="h-5 w-5" />
            }
          </motion.button>

          {/* Auth buttons */}
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              to="/login"
              className="rounded-full border border-slate-200/70 bg-white/80 px-4 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:text-primary"
            >
              Log In
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/register"
                className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-orange-600"
              >
                Register
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-slate-200/70 bg-white/80 p-2 lg:hidden dark:border-white/10 dark:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5 text-secondary dark:text-white" /> : <Menu className="h-5 w-5 text-secondary dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    aria-current={location.pathname === link.to ? 'page' : undefined}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      location.pathname === link.to
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-700 hover:bg-orange-50 hover:text-primary dark:text-slate-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
                <a
                  href="tel:1195"
                  className="flex items-center gap-1.5 rounded-full border border-red-200/70 bg-red-50/80 px-3 py-2 text-xs font-bold text-red-600 dark:border-red-400/20 dark:bg-red-950/30"
                >
                  <Phone className="h-3.5 w-3.5" /> 1195
                </a>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 rounded-xl border border-slate-200/70 py-2 text-center text-sm font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200">
                  Log In
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 rounded-xl bg-primary py-2 text-center text-sm font-semibold text-white">
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default PublicNav;
