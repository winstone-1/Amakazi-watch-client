import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'For individuals getting started safely.',
    features: ['Basic reporting', 'Safety timer', 'Community resources'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '5,000',
    description: 'Advanced support for regular use and follow-up.',
    features: ['Priority support', 'Unlimited reports', 'Advanced analytics'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '20,000',
    description: 'For organizations managing multiple cases and teams.',
    features: ['Team workspaces', 'API access', 'Dedicated onboarding'],
    highlight: false,
  },
];

function Subscriptions() {
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Crown className="h-4 w-4" />
              Membership plans
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Choose the support level that fits your journey</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">Flexible access to safety tools, reporting, and trusted support services with secure payment options.</p>
          </div>
          <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/80 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/30">
            Current plan: <span className="ml-1 text-secondary dark:text-white">{selectedPlan}</span>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 xl:grid-cols-3">
        {plans.map((plan) => (
          <motion.div key={plan.name} whileHover={{ y: -6, scale: 1.01 }}>
            <GlassCard className={`h-full p-6 ${plan.highlight ? 'ring-2 ring-primary/30' : ''}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-secondary dark:text-white">{plan.name}</h2>
                {plan.highlight && <Sparkles className="h-5 w-5 text-primary" />}
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-black text-secondary dark:text-white">KES {plan.price}</span>
                {plan.price !== '0' && <span className="pb-1 text-sm text-slate-500 dark:text-slate-400">/month</span>}
              </div>
              <ul className="mt-5 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Check className="h-4 w-4 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setSelectedPlan(plan.name);
                  setShowModal(true);
                }}
                className={`mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold transition hover:scale-[1.02] ${plan.highlight ? 'bg-primary text-white' : 'border border-slate-200/70 bg-white/70 text-slate-700 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200'}`}
              >
                {plan.name === 'Free' ? 'Stay on Free' : plan.name === selectedPlan ? 'Current Plan' : 'Upgrade'}
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/70 text-slate-500 dark:border-white/10 dark:text-slate-400">
                <th className="pb-3 font-semibold">Feature</th>
                <th className="pb-3 font-semibold">Free</th>
                <th className="pb-3 font-semibold">Pro</th>
                <th className="pb-3 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Live safety tools', 'Yes', 'Yes', 'Yes'],
                ['Priority support', 'No', 'Yes', 'Yes'],
                ['Advanced analytics', 'No', 'Yes', 'Yes'],
                ['Team access', 'No', 'No', 'Yes'],
              ].map(([feature, free, pro, enterprise]) => (
                <tr key={feature} className="border-b border-slate-200/70 text-slate-600 dark:border-white/10 dark:text-slate-300">
                  <td className="py-3 font-medium">{feature}</td>
                  <td className="py-3">{free}</td>
                  <td className="py-3">{pro}</td>
                  <td className="py-3">{enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {showModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-[28px] border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-800/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Secure payment</p>
                <h3 className="text-xl font-semibold text-secondary dark:text-white">Upgrade to {selectedPlan}</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="rounded-full bg-slate-100 px-3 py-2 text-sm">Close</button>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-900/40">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <CreditCard className="h-4 w-4 text-primary" />
                Choose payment method
              </div>
              <div className="mt-3 flex gap-3">
                <button className="flex-1 rounded-full border border-slate-200/70 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200">M-Pesa</button>
                <button className="flex-1 rounded-full border border-slate-200/70 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200">Paystack</button>
              </div>
            </div>
            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-white transition hover:scale-[1.02]">
              Proceed <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
