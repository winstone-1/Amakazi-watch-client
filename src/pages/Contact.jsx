import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Facebook, Twitter, Linkedin } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import PublicNav from '../components/common/PublicNav';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';

const emergencyContacts = [
  { label: 'National GBV Helpline', number: '1195', note: 'Free, 24/7', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  { label: 'Kenya Police', number: '999 / 112', note: 'Emergency', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { label: 'Childline Kenya', number: '116', note: 'Children at risk', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { label: 'Befrienders Kenya', number: '0722 178 177', note: 'Mental health crisis', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
];

const offices = [
  { city: 'Nairobi (HQ)', address: 'AmakaziWatch, 4th Floor, ABC Place, Waiyaki Way', hours: 'Mon–Fri: 8 AM – 6 PM' },
  { city: 'Mombasa', address: 'Nyali Centre, Mombasa', hours: 'Mon–Fri: 8 AM – 5 PM' },
  { city: 'Kisumu', address: 'Mega Plaza, Oginga Odinga Street', hours: 'Mon–Fri: 8 AM – 5 PM' },
];

function Contact() {
  const { darkMode } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
        <PublicNav />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Mail className="h-4 w-4" />
          Contact Us
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Get in Touch</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">We're here to help. Reach out with questions, feedback, or partnership inquiries.</p>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="font-bold text-secondary dark:text-white mb-3 flex items-center gap-2">
          <Phone className="h-4 w-4 text-red-500" />
          Emergency Contacts
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">If you or someone you know is in immediate danger, call one of these numbers now.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyContacts.map(ec => (
            <a
              key={ec.label}
              href={`tel:${ec.number.split('/')[0].trim()}`}
              className={`flex flex-col rounded-2xl ${ec.color.split(' ')[0]} border border-white/70 dark:border-white/10 p-4 hover:-translate-y-0.5 transition`}
            >
              <span className={`text-xs font-semibold mb-1 ${ec.color.split(' ').slice(1).join(' ')}`}>{ec.note}</span>
              <span className="text-xl font-black text-secondary dark:text-white">{ec.number}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ec.label}</span>
            </a>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">Send a Message</h2>
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-secondary dark:text-white mb-2">Message Sent!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">We typically respond within 1–2 business days.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-4 rounded-full border border-slate-200/70 px-5 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Your name" className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="your@email.com" className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Subject</label>
                <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required placeholder="How can we help?" className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Message</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5} placeholder="Tell us more..." className="w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white resize-none" />
              </div>
              <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50">
                <Send className="h-4 w-4" />
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <h3 className="font-semibold text-secondary dark:text-white mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email Us
            </h3>
            <div className="space-y-2 text-sm">
              <a href="mailto:support@amakaziwatch.ke" className="block text-primary hover:underline">support@amakaziwatch.ke</a>
              <a href="mailto:partnerships@amakaziwatch.ke" className="block text-slate-500 dark:text-slate-400 hover:text-primary transition">partnerships@amakaziwatch.ke</a>
              <a href="mailto:media@amakaziwatch.ke" className="block text-slate-500 dark:text-slate-400 hover:text-primary transition">media@amakaziwatch.ke</a>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="font-semibold text-secondary dark:text-white mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Our Offices
            </h3>
            <div className="space-y-3">
              {offices.map(o => (
                <div key={o.city} className="border-b border-slate-100 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-secondary dark:text-white">{o.city}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{o.address}</p>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    {o.hours}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="font-semibold text-secondary dark:text-white mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200/70 bg-white/60 p-2.5 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition dark:border-white/10 dark:bg-slate-700/50 dark:text-slate-300" aria-label={s.label}>
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </GlassCard>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
}

export default Contact;
