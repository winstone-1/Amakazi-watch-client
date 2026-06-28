import { useState, useEffect } from 'react';
import { Shield, CheckCircle, Lock, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { getPrivacyPolicy, acceptPrivacyPolicy } from '../../api/privacy';
import { useToast } from '../../context/ToastContext';
import GlassCard from '../../components/common/GlassCard';

function Privacy() {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { success, error } = useToast();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      const data = await getPrivacyPolicy();
      setPolicy(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch privacy policy:', err);
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptPrivacyPolicy();
      setHasAccepted(true);
      success('Privacy policy accepted');
    } catch (err) {
      error('Failed to accept privacy policy');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading privacy policy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-primary/10 p-3">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">Privacy Policy</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Last updated: {policy?.last_updated || 'June 2024'}</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-secondary dark:text-white">Data Collection</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                We collect only the information necessary to provide our services. This includes your account details, 
                reports you submit, and communication with support organizations. All data is encrypted and stored securely.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-secondary dark:text-white">How We Use Your Data</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Your information is used solely to connect you with appropriate support services, improve our platform, 
                and ensure your safety. We never sell your data to third parties.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-secondary dark:text-white">Your Rights</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Right to access your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Right to request deletion of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Right to withdraw consent at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Right to report and anonymous reporting options</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-secondary dark:text-white">Security Measures</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                We implement industry-standard encryption, secure authentication, and regular security audits 
                to protect your information. Your safety and privacy are our top priorities.
              </p>
            </div>
          </div>
        </div>

        {user && !hasAccepted && (
          <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-white/10">
            <button
              onClick={handleAccept}
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
            >
              Accept Privacy Policy
            </button>
          </div>
        )}

        {hasAccepted && (
          <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-white/10">
            <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
              <CheckCircle className="h-4 w-4" />
              Privacy policy accepted
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

export default Privacy;
