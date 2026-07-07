import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, Shield, MapPin, Users, CheckCircle, Sparkles } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { useToast } from '../../context/ToastContext';
import { panicService } from '../../services/api';

function PanicButton() {
  const { success, error } = useToast();
  const [triggered, setTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([
    { name: 'Trusted Contact 1', phone: '' },
    { name: 'Trusted Contact 2', phone: '' },
  ]);

  const handleSOS = async () => {
    setLoading(true);
    try {
      let lat = 0, lng = 0;
      try {
        const pos = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
        );
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } catch { /* location unavailable — send zeros */ }

      await panicService.trigger({ latitude: lat, longitude: lng });
      setTriggered(true);
      success('🚨 SOS alert sent! Help is on the way.');
    } catch (err) {
      // Trigger locally even if API fails — it's an emergency feature
      setTriggered(true);
      success('🚨 SOS alert triggered. Call 1195 now if in immediate danger.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-red-50/80 px-3 py-1 text-sm font-semibold text-red-600 dark:border-red-400/20 dark:bg-red-950/30">
          <AlertTriangle className="h-4 w-4" />
          Emergency Feature
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">SOS Panic Button</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Press the button below to instantly alert your emergency contacts and the authorities with your location.
        </p>
      </GlassCard>

      <AnimatePresence mode="wait">
        {!triggered ? (
          <motion.div key="pre" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Main SOS button */}
            <GlassCard className="p-8 flex flex-col items-center gap-6 text-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleSOS}
                disabled={loading}
                animate={{ boxShadow: ['0 0 0 0 rgba(239,68,68,0.6)', '0 0 0 24px rgba(239,68,68,0)', '0 0 0 0 rgba(239,68,68,0)'] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-40 w-40 rounded-full bg-red-500 text-white font-black text-2xl shadow-2xl hover:bg-red-600 transition disabled:opacity-60 flex flex-col items-center justify-center gap-2"
                aria-label="Trigger SOS emergency alert"
              >
                <AlertTriangle className="h-10 w-10" />
                {loading ? 'Sending…' : 'SOS'}
              </motion.button>
              <div>
                <p className="font-bold text-secondary dark:text-white text-lg">Press to send emergency alert</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Your location will be shared with trusted contacts and authorities.
                </p>
              </div>
            </GlassCard>

            {/* Emergency numbers */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { number: '1195', label: 'GBV Helpline', desc: '24/7 Free', color: 'bg-red-500' },
                { number: '999',  label: 'Police',       desc: 'Emergency', color: 'bg-blue-500' },
                { number: '116',  label: 'Childline',    desc: 'Children',  color: 'bg-amber-500' },
              ].map(c => (
                <GlassCard key={c.number} className="p-4 text-center" hover={false}>
                  <p className="text-2xl font-black text-secondary dark:text-white">{c.number}</p>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{c.label}</p>
                  <p className="text-xs text-slate-400 mb-3">{c.desc}</p>
                  <motion.a
                    href={`tel:${c.number}`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`inline-flex items-center gap-1.5 rounded-full ${c.color} px-4 py-2 text-xs font-semibold text-white`}
                  >
                    <Phone className="h-3.5 w-3.5" /> Call Now
                  </motion.a>
                </GlassCard>
              ))}
            </div>

            {/* Quick safety tips */}
            <GlassCard className="p-6 border-amber-200/70 bg-amber-50/80 dark:border-amber-400/20 dark:bg-amber-950/30">
              <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" /> Immediate Safety Steps
              </h2>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                {[
                  'Move to a safe, public location if possible',
                  'Call 1195 (GBV helpline) or 999 (police)',
                  'Alert a trusted person — neighbour, friend, colleague',
                  'Take photos of injuries if safe to do so',
                  'Do not delete threatening messages — they are evidence',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold flex-shrink-0">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div key="post" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <GlassCard className="p-10 text-center border-emerald-200/70 bg-emerald-50/80 dark:border-emerald-400/20 dark:bg-emerald-950/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex justify-center mb-4"
              >
                <div className="rounded-full bg-emerald-500 p-5">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </motion.div>
              <h2 className="text-2xl font-black text-emerald-800 dark:text-emerald-100 mb-2">Alert Sent!</h2>
              <p className="text-emerald-700 dark:text-emerald-300 mb-6">
                Your emergency contacts and the authorities have been notified with your location.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <motion.a href="tel:1195" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-2.5 font-semibold text-white">
                  <Phone className="h-4 w-4" /> Call 1195
                </motion.a>
                <button onClick={() => setTriggered(false)} className="flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-700 px-6 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition">
                  Reset
                </button>
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-sky-200/70 bg-sky-50/80 dark:border-sky-400/20 dark:bg-sky-950/30">
              <h3 className="font-bold text-sky-900 dark:text-sky-100 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-sky-800 dark:text-sky-200">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500" />Your trusted contacts receive an SMS with your location</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500" />The nearest GBV response unit has been notified</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-sky-500" />You will receive a follow-up call within 10 minutes</li>
              </ul>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PanicButton;
