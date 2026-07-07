import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Car, Phone, Package, CheckCircle, Sparkles, Download, ArrowRight, RotateCcw } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { useToast } from '../../context/ToastContext';
import { safetyService } from '../../services/api';

const COUNTIES = ['Nairobi', 'Kisumu', 'Mombasa', 'Eldoret', 'Nakuru', 'Machakos', 'Kakamega', 'Kisii', 'Nyeri', 'Meru'];

const DEFAULT_PLAN = (county, hasChildren) => ({
  safe_locations: [
    `Nearest police station in ${county}`,
    'Home of a trusted family member',
    'Local shelter or women\'s refuge',
    hasChildren ? 'School — let teachers know if children are at risk' : null,
  ].filter(Boolean),
  transportation_plan: 'Use public transport (matatu) or a trusted taxi app (Bolt/Uber). Avoid sharing your destination with the abuser. Keep emergency fare stored separately.',
  emergency_bag: [
    'National ID / Passport',
    'Birth certificates (yours and children\'s)',
    'Phone charger and airtime',
    'Cash (minimum KES 2,000)',
    'Prescription medication (5-day supply)',
    'Change of clothes',
    'Important documents copies',
  ],
  emergency_contacts: [
    { name: 'GBV Helpline', number: '1195' },
    { name: 'Police',       number: '999 / 112' },
    { name: 'Childline',    number: '116' },
  ],
  safety_tips: [
    'Memorise the address and number of your safe location',
    'Leave when the abuser is absent or distracted',
    'Do not announce your plan to leave in advance',
    'Keep a small bag ready in an accessible location',
    `Contact FIDA Kenya (0800 720 999) for free legal advice in ${county}`,
  ],
});

function EscapePlan() {
  const { success, error } = useToast();
  const [form, setForm] = useState({ county: 'Nairobi', has_children: false, living_with_abuser: true });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const data = await safetyService.escapePlan(form);
      setPlan(data);
      success('Your personalised escape plan is ready.');
    } catch {
      // Use local default plan if API fails
      setPlan(DEFAULT_PLAN(form.county, form.has_children));
      success('Escape plan generated (offline mode).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Sparkles className="h-4 w-4" />
          Safety Hub
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Escape Plan Generator</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Answer a few questions and we'll create a personalised safety plan tailored to your situation.
        </p>
      </GlassCard>

      <AnimatePresence mode="wait">
        {!plan ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GlassCard className="p-6">
              <h2 className="font-bold text-secondary dark:text-white mb-5">Your Situation</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Your County</label>
                  <select
                    value={form.county}
                    onChange={e => setForm({ ...form, county: e.target.value })}
                    className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-2.5 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                  >
                    {COUNTIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {[
                  { key: 'has_children', label: 'I have children who may be at risk' },
                  { key: 'living_with_abuser', label: 'I currently live with the abuser' },
                ].map(f => (
                  <label key={f.key} className="flex items-center gap-3 cursor-pointer select-none rounded-xl border border-slate-200/70 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-slate-800/60 hover:border-primary/30 transition">
                    <input
                      type="checkbox"
                      checked={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.checked })}
                      className="h-4 w-4 accent-primary rounded"
                    />
                    <span className="text-sm font-medium text-secondary dark:text-white">{f.label}</span>
                  </label>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={generatePlan}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
                >
                  {loading ? 'Generating…' : 'Generate My Escape Plan'}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div key="plan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/30 px-3 py-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Plan Ready for {form.county}</span>
              </div>
              <button onClick={() => setPlan(null)} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition">
                <RotateCcw className="h-4 w-4" /> Regenerate
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Safe locations */}
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Home className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-secondary dark:text-white text-sm">Safe Locations</h3>
                </div>
                <ul className="space-y-2">
                  {(plan.safe_locations || []).map((loc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {loc}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Emergency bag */}
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-secondary dark:text-white text-sm">Emergency Bag Checklist</h3>
                </div>
                <ul className="space-y-2">
                  {(plan.emergency_bag || []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="h-4 w-4 text-sky-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Transport */}
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Car className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-secondary dark:text-white text-sm">Transportation Plan</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{plan.transportation_plan}</p>
              </GlassCard>

              {/* Emergency contacts */}
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <h3 className="font-bold text-secondary dark:text-white text-sm">Emergency Contacts</h3>
                </div>
                <div className="space-y-2">
                  {(plan.emergency_contacts || []).map((c, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl bg-slate-50/80 dark:bg-slate-800/50 px-3 py-2">
                      <span className="text-sm font-medium text-secondary dark:text-white">{c.name}</span>
                      <a href={`tel:${c.number.split('/')[0].trim()}`} className="text-sm font-bold text-red-500 hover:underline">{c.number}</a>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Safety tips */}
            <GlassCard className="p-5 border-amber-200/70 bg-amber-50/80 dark:border-amber-400/20 dark:bg-amber-950/30">
              <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Safety Tips
              </h3>
              <ul className="space-y-2">
                {(plan.safety_tips || []).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-bold flex-shrink-0">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <p className="text-center text-xs text-slate-400">
              This plan is stored only on your device. Print or save it somewhere safe.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EscapePlan;
