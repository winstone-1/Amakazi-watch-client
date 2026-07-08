import React from "react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon, Moon, Sun, Globe, Bell, Shield,
  LogOut, Download, AlertTriangle, Check, ChevronRight,
  User, Lock, Type, Palette
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

function Toggle({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${checked ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}`}
    >
      <motion.span
        layout
        className="inline-block h-5 w-5 rounded-full bg-white shadow-md"
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    </button>
  );
}

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-sm w-full rounded-[24px] bg-white dark:bg-slate-800 p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-100 dark:bg-red-950/30 p-4">
            <LogOut className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <h2 className="text-xl font-black text-center text-secondary dark:text-white mb-2">Sign Out?</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
          You'll be signed out of your AmakaziWatch account on this device.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-full border border-slate-200/70 py-2.5 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300 hover:border-slate-400 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition shadow-lg">
            Sign Out
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionHeader({ icon: Icon, title, color = 'text-primary', bg = 'bg-primary/10' }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`rounded-2xl p-2 ${bg}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <h2 className="font-bold text-secondary dark:text-white">{title}</h2>
    </div>
  );
}

function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { logout, user } = useAuth();
  const { success, error } = useToast();
  const { language, switchLanguage } = useLanguage();

  const [notifications, setNotifications] = useState({ push: true, email: true, sms: false });
  const [fontSize, setFontSize] = useState('medium');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [isUpdating2FA, setIsUpdating2FA] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === 'small' ? '14px' :
      fontSize === 'large' ? '18px' : '16px';
  }, [fontSize]);

  const handleExport = async () => {
    setExportLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      success('Data export requested! You\'ll receive an email within 24 hours.');
    } catch {
      error('Failed to request data export. Please try again later.');
    } finally {
      setExportLoading(false);
    }
  };

  const handle2FAToggle = async () => {
    if (isUpdating2FA) return;
    setIsUpdating2FA(true);
    const newValue = !twoFAEnabled;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTwoFAEnabled(newValue);
      success(newValue ? '2FA enabled' : '2FA disabled');
    } catch {
      error('Failed to update 2FA settings.');
    } finally {
      setIsUpdating2FA(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      <AnimatePresence>
        {showLogoutModal && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutModal(false)} />}
      </AnimatePresence>

      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
            <SettingsIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Settings</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your preferences and account.</p>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-4">
        <GlassCard className="p-6">
          <SectionHeader icon={Palette} title="Appearance" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5 text-yellow-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
                <div>
                  <p className="font-medium text-secondary dark:text-white text-sm">Dark Mode</p>
                  <p className="text-xs text-slate-400">{darkMode ? 'Currently dark' : 'Currently light'}</p>
                </div>
              </div>
              <Toggle checked={darkMode} onChange={toggleDarkMode} label="Toggle dark mode" />
            </div>

            <div className="border-t border-slate-100 dark:border-white/5 pt-4">
              <div className="flex items-center gap-3 mb-3">
                <Type className="h-5 w-5 text-slate-400" />
                <p className="font-medium text-secondary dark:text-white text-sm">Font Size</p>
              </div>
              <div className="flex gap-2">
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`flex-1 rounded-xl border py-2 text-sm font-medium capitalize transition ${
                      fontSize === size
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200/70 text-slate-500 hover:border-primary/30 dark:border-white/10 dark:text-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeader icon={Globe} title="Language" color="text-sky-500" bg="bg-sky-500/10" />
          <div className="flex gap-3">
            {[
              { value: 'en', label: 'English' },
              { value: 'sw', label: 'Kiswahili' }
            ].map(lang => (
              <button
                key={lang.value}
                onClick={() => {
                  switchLanguage(lang.value);
                  success(`Language changed to ${lang.label}`);
                }}
                className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition ${
                  language === lang.value
                    ? 'border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950/30 dark:text-sky-300'
                    : 'border-slate-200/70 text-slate-500 hover:border-sky-200 dark:border-white/10 dark:text-slate-400'
                }`}
              >
                {language === lang.value && <Check className="h-4 w-4 inline mr-1.5" />}
                {lang.label}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeader icon={Bell} title="Notifications" color="text-violet-500" bg="bg-violet-500/10" />
          <div className="space-y-4">
            {[
              { key: 'push', label: 'Push Notifications', desc: 'In-app alerts for safety checks and updates' },
              { key: 'email', label: 'Email Alerts', desc: 'Report updates and important messages' },
              { key: 'sms', label: 'SMS Alerts', desc: 'Critical alerts via text message' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-secondary dark:text-white text-sm">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <Toggle
                  checked={notifications[item.key]}
                  onChange={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
                  label={`Toggle ${item.label}`}
                />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeader icon={Shield} title="Security" color="text-emerald-600" bg="bg-emerald-500/10" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-secondary dark:text-white text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-slate-400">Add an extra layer of security to your account</p>
              </div>
              <Toggle checked={twoFAEnabled} onChange={handle2FAToggle} label="Toggle 2FA" />
            </div>
            <div className="border-t border-slate-100 dark:border-white/5 pt-4">
              <button className="flex items-center justify-between w-full rounded-xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-slate-800/50 hover:border-primary/30 transition group">
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-secondary dark:text-white">Change Password</p>
                    <p className="text-xs text-slate-400">Update your account password</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition" />
              </button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeader icon={Download} title="Data & Privacy" color="text-slate-500" bg="bg-slate-200/70 dark:bg-slate-700/50" />
          <button
            onClick={handleExport}
            disabled={exportLoading}
            className="flex items-center gap-3 w-full rounded-xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-slate-800/50 hover:border-primary/30 transition disabled:opacity-50"
          >
            <Download className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <div className="text-left flex-1">
              <p className="text-sm font-medium text-secondary dark:text-white">Export My Data</p>
              <p className="text-xs text-slate-400">Download all your reports and account data</p>
            </div>
            {exportLoading ? (
              <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            )}
          </button>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeader icon={User} title="Account" color="text-primary" bg="bg-primary/10" />
          <div className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-slate-800/50 mb-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
              {(user?.username || 'U')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-secondary dark:text-white text-sm">{user?.username || 'Your Account'}</p>
              <p className="text-xs text-slate-400">{user?.email || ''} · <span className="capitalize">{user?.role || 'survivor'}</span></p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-red-200/50 dark:border-red-400/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-2xl bg-red-100 dark:bg-red-950/30 p-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="font-bold text-secondary dark:text-white">Sign Out</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Signing out will end your current session on this device. Your data remains safe.
          </p>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50/80 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </GlassCard>
      </div>
    </div>
  );
}

export default Settings;
