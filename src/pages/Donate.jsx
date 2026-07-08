import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, CheckCircle, Lock } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import PublicNav from '../components/common/PublicNav';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { initiateMpesaDonation, initiatePaystackDonation } from '../api/donations';

const tiers = [
  { amount: 500,   label: 'KES 500',    impact: 'Emergency food supplies for one survivor for a week.',   color: 'border-sky-300 dark:border-sky-700' },
  { amount: 1000,  label: 'KES 1,000',  impact: 'Transport for a survivor to reach a safe shelter.',      color: 'border-emerald-300 dark:border-emerald-700' },
  { amount: 5000,  label: 'KES 5,000',  impact: 'Fund 5 peer support counseling sessions.',               color: 'border-primary dark:border-orange-500', featured: true },
  { amount: 10000, label: 'KES 10,000', impact: 'Sponsor a 3-month community education campaign.',        color: 'border-violet-300 dark:border-violet-700' },
];

const donors = ['Anonymous', 'Sarah W.', 'John M.', 'Tech Kenya', 'Anonymous', 'Grace N.', 'BuildFund', 'Anonymous'];

const impacts = [
  { value: '3,200+',   label: 'Survivors Supported' },
  { value: '150+',     label: 'Organizations Funded' },
  { value: 'KES 8.2M', label: 'Raised This Year' },
  { value: '47',       label: 'Counties Reached' },
];

function Donate() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [selectedTier, setSelectedTier] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [method, setMethod] = useState('mpesa');
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [phone, setPhone] = useState('');

  const finalAmount = customAmount ? parseInt(customAmount) : selectedTier;

  const handleDonate = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      if (method === 'mpesa') {
        await initiateMpesaDonation(phone, finalAmount);
        setSubmitted(true);
        success('M-Pesa payment prompt sent to your phone!');
      } else {
        const data = await initiatePaystackDonation(finalAmount);
        if (data.authorization_url) {
          window.location.href = data.authorization_url;
        } else {
          throw new Error('No authorization URL returned');
        }
      }
    } catch (err) {
      error('Payment initialization failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
        <PublicNav />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-6">

          {/* Hero */}
          <GlassCard className="p-6 sm:p-8">
            <div className="mb-3 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
                <Heart className="h-4 w-4" />
                Support Our Mission
              </div>
              <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md dark:bg-slate-800 dark:text-slate-400">DEMO MODE</span>
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Make a Donation</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Every contribution helps protect women and girls across Kenya. 100% of donations go directly to survivor support.
            </p>
          </GlassCard>

          {/* Impact stats */}
          <div className="grid gap-4 md:grid-cols-4">
            {impacts.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="p-5 text-center">
                  <p className="text-2xl font-black text-primary">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Donation form + sidebar */}
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassCard className="p-6">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-black text-secondary dark:text-white mb-2">Thank You!</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-2">
                    Your donation of <strong>KES {finalAmount.toLocaleString()}</strong> is being processed.
                  </p>
                  {phone && <p className="text-sm text-slate-400">You will receive a confirmation on {phone}.</p>}
                  <button
                    onClick={() => { setSubmitted(false); setCustomAmount(''); setPhone(''); }}
                    className="mt-6 rounded-full border border-slate-200/70 px-5 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition"
                  >
                    Make Another Donation
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">Choose an Amount</h2>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {tiers.map(tier => (
                      <button
                        key={tier.amount}
                        onClick={() => { setSelectedTier(tier.amount); setCustomAmount(''); }}
                        className={`rounded-2xl border-2 p-4 text-left transition ${
                          selectedTier === tier.amount && !customAmount
                            ? 'border-primary bg-primary/5'
                            : tier.color + ' bg-white/60 dark:bg-slate-800/60 hover:border-primary/50'
                        } ${tier.featured ? 'ring-2 ring-primary/30' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black text-secondary dark:text-white">{tier.label}</span>
                          {tier.featured && <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">Popular</span>}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{tier.impact}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Or enter a custom amount (KES)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2500"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      min="100"
                      className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-secondary dark:text-white mb-3">Payment Method</h2>
                  <div className="flex gap-3 mb-4">
                    {['mpesa', 'card'].map(m => (
                      <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold transition ${
                          method === m
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-slate-200/70 dark:border-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {m === 'mpesa' ? 'M-Pesa' : 'Card'}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleDonate} className="space-y-4">
                    {method === 'mpesa' ? (
                      <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                          M-Pesa Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="07XX XXX XXX"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                          className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                        />
                        <p className="mt-1 text-xs text-slate-400">You will receive an M-Pesa prompt to complete the payment.</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                        Secure card payment via Paystack. You will be redirected to complete your payment.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={!finalAmount || finalAmount < 100 || processing}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
                    >
                      {processing ? (
                         <>
                           <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                           Processing...
                         </>
                      ) : (
                         <>
                           <Heart className="h-4 w-4" />
                           Donate KES {finalAmount ? finalAmount.toLocaleString() : '—'}
                         </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </GlassCard>

            {/* Sidebar */}
            <div className="space-y-4">
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-semibold text-secondary dark:text-white text-sm">Secure & Transparent</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  All donations are processed securely. We publish quarterly financial reports showing exactly how funds are used.
                </p>
              </GlassCard>

              <GlassCard className="p-5">
                <h3 className="font-semibold text-secondary dark:text-white text-sm mb-3">Recent Donors</h3>
                <div className="flex flex-wrap gap-2">
                  {donors.map((d, i) => (
                    <span key={i} className="rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300">
                      {d}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <h3 className="font-semibold text-secondary dark:text-white text-sm mb-3">Other Ways to Give</h3>
                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <p>🏦 Bank Transfer: Equity Bank, A/C 0123456789, AmakaziWatch Trust</p>
                  <p>🤝 Corporate Partnerships:{' '}
                    <a href="mailto:partnerships@amakaziwatch.ke" className="text-primary hover:underline">
                      partnerships@amakaziwatch.ke
                    </a>
                  </p>
                  <p>📦 In-Kind: Contact us about donating goods or services.</p>
                </div>
              </GlassCard>
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Donate;
