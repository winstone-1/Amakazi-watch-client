import React from "react";
import { useState, useEffect } from 'react';
import { FileText, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { getTerms, acceptTerms } from '../../api/privacy';
import { useToast } from '../../context/ToastContext';
import GlassCard from '../../components/common/GlassCard';

function Terms() {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { success, error } = useToast();
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [selectedLang, setSelectedLang] = useState(language || 'en');

  useEffect(() => {
    fetchTerms();
  }, [selectedLang]);

  const fetchTerms = async () => {
    try {
      const data = await getTerms(selectedLang);
      setTerms(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch terms:', err);
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptTerms();
      setHasAccepted(true);
      success('Terms of service accepted');
    } catch (err) {
      error('Failed to accept terms');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading terms of service...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary dark:text-white">Terms of Service</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">Last updated: {terms?.last_updated || 'June 2024'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedLang('en')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedLang === 'en'
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang('sw')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedLang === 'sw'
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Kiswahili
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-secondary dark:text-white">Acceptance of Terms</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              By accessing and using AmakaziWatch, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-secondary dark:text-white">User Responsibilities</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Provide accurate and truthful information when creating reports</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Respect the privacy and dignity of other users</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Use the platform only for its intended purposes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>Report any misuse or violations of these terms</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-secondary dark:text-white">Prohibited Activities</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Submitting false or malicious reports</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Harassment or abuse of other users or staff</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Attempting to compromise platform security</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Using the platform for illegal activities</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-secondary dark:text-white">Limitation of Liability</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              AmakaziWatch provides a platform for connecting users with support services but does not guarantee 
              the availability, quality, or outcome of any services provided by third-party organizations. 
              We are not liable for any damages arising from the use of our platform or third-party services.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-secondary dark:text-white">Modifications to Terms</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We reserve the right to modify these terms at any time. Continued use of the platform after 
              modifications constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>

        {user && !hasAccepted && (
          <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-white/10">
            <button
              onClick={handleAccept}
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
            >
              Accept Terms of Service
            </button>
          </div>
        )}

        {hasAccepted && (
          <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-white/10">
            <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
              <CheckCircle className="h-4 w-4" />
              Terms of service accepted
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

export default Terms;
