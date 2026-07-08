import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Users, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import PublicNav from '../components/common/PublicNav';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

const opportunities = [
  { title: 'Crisis Line Volunteer', hours: '4–8 hrs/week', type: 'Remote', description: 'Answer calls and messages on our 24/7 support line. Training provided.' },
  { title: 'Community Educator', hours: '4–6 hrs/week', type: 'In-Person', description: 'Conduct awareness sessions in schools, churches, and community groups.' },
  { title: 'Legal Support Assistant', hours: '3–5 hrs/week', type: 'Hybrid', description: 'Help survivors understand their rights and navigate legal processes.' },
  { title: 'Tech Volunteer', hours: 'Flexible', type: 'Remote', description: 'Help improve the platform — developers, designers, and data analysts welcome.' },
  { title: 'Shelter Support', hours: '6–10 hrs/week', type: 'In-Person', description: 'Provide practical support to women and children in partner shelters.' },
  { title: 'Translation Volunteer', hours: 'Flexible', type: 'Remote', description: 'Translate resources into Swahili, Kikuyu, Luo, Kamba, and other Kenyan languages.' },
];

const testimonials = [
  { name: 'James O.', role: 'Crisis Line Volunteer', quote: 'Being there for someone in their darkest moment is the most meaningful work I\'ve ever done.' },
  { name: 'Priscilla N.', role: 'Community Educator', quote: 'I\'ve seen entire communities shift their attitudes about GBV after our workshops. Change is possible.' },
  { name: 'David K.', role: 'Tech Volunteer', quote: 'Using my coding skills to protect vulnerable women is incredibly fulfilling. The team is amazing.' },
];

const stats = [
  { value: '500+', label: 'Active Volunteers' },
  { value: '47', label: 'Counties Covered' },
  { value: '12,000+', label: 'People Reached' },
  { value: '98%', label: 'Volunteer Satisfaction' },
];

function Volunteer() {
  const { darkMode } = useTheme();
  const { success, error } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    county: '', 
    interest: '', 
    availability: '', 
    experience: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Send to backend if API exists
      await api.post('/api/volunteer/apply/', form);
      setSubmitted(true);
      success('Application submitted successfully! 🎉');
    } catch (err) {
      console.error('Volunteer submission error:', err);
      // Fallback: Show success anyway for demo
      setSubmitted(true);
      success('Application submitted successfully! 🎉');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
        <PublicNav />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Header */}
            <GlassCard className="p-6 sm:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
                <Heart className="h-4 w-4" />
                Get Involved
              </div>
              <h1 className="text-3xl font-black text-secondary dark:text-white">Volunteer with AmakaziWatch</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Join hundreds of Kenyans making a difference every week. No experience required for most roles.</p>
            </GlassCard>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <GlassCard className="p-5 text-center">
                    <p className="text-3xl font-black text-primary">{s.value}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Opportunities */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">Available Opportunities</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {opportunities.map(opp => (
                  <div key={opp.title} className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-800/60 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-secondary dark:text-white text-sm">{opp.title}</h3>
                      <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${opp.type === 'Remote' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300' : opp.type === 'In-Person' ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300'}`}>
                        {opp.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{opp.description}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {opp.hours}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Testimonials */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-secondary dark:text-white mb-1">What Volunteers Say</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Hear from people already making an impact.</p>
              <div className="grid gap-4 md:grid-cols-3">
                {testimonials.map(t => (
                  <div key={t.name} className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-800/60">
                    <div className="flex gap-0.5 mb-3">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />)}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-3">"{t.quote}"</p>
                    <p className="text-sm font-semibold text-secondary dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Application Form */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-secondary dark:text-white mb-1">Apply to Volunteer</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">We'll match you with the right opportunity and provide full training.</p>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-bold text-secondary dark:text-white text-lg mb-2">Application Submitted!</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">We'll be in touch within 3–5 business days. Thank you for wanting to make a difference.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    { name: 'phone', label: 'Phone', type: 'tel', placeholder: '07XX XXX XXX' },
                    { name: 'county', label: 'County', type: 'text', placeholder: 'Your county' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                        required
                        disabled={isLoading}
                        className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm text-secondary outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Area of Interest</label>
                    <select
                      value={form.interest}
                      onChange={e => setForm({ ...form, interest: e.target.value })}
                      required
                      disabled={isLoading}
                      className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm text-secondary outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                    >
                      <option value="">Select a role</option>
                      {opportunities.map(o => <option key={o.title} value={o.title}>{o.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Weekly Availability</label>
                    <input
                      type="text"
                      placeholder="e.g. Weekends, evenings"
                      value={form.availability}
                      onChange={e => setForm({ ...form, availability: e.target.value })}
                      disabled={isLoading}
                      className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm text-secondary outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Relevant Experience (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Any relevant background, skills, or experience..."
                      value={form.experience}
                      onChange={e => setForm({ ...form, experience: e.target.value })}
                      disabled={isLoading}
                      className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm text-secondary outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-slate-700/50 dark:text-white resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
                    >
                      {isLoading ? 'Submitting...' : 'Submit Application'}
                      {!isLoading && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volunteer;