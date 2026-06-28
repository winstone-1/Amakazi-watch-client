import { motion } from 'framer-motion';
import { Phone, Shield, MapPin, Heart, AlertTriangle, ArrowRight, ExternalLink, Clock, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';
import Footer from '../components/common/Footer';

function GetHelp() {
  const emergencyContacts = [
    { number: '1195', name: 'National GBV Helpline', description: '24/7 toll-free support' },
    { number: '999', name: 'Police Emergency', description: 'Immediate police response' },
    { number: '116', name: 'Child Helpline', description: 'Support for children and minors' },
  ];

  const quickLinks = [
    { title: 'Safety Tools', path: '/safety', icon: Shield, description: 'Timer, safe word, escape plan' },
    { title: 'Find Organizations', path: '/organisations', icon: MapPin, description: 'Local support near you' },
    { title: 'Peer Support', path: '/peer-support', icon: Heart, description: 'Chat with trained supporters' },
    { title: 'Legal Help', path: '/legal-bot', icon: Scale, description: 'Know your legal rights' },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-500/10 p-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-secondary dark:text-white sm:text-5xl">
            Get Help Now
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            If you are in immediate danger, call emergency services. We're here to help you find support and stay safe.
          </p>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-full bg-red-500/10 p-3">
              <Phone className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-secondary dark:text-white">Emergency Contacts</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {emergencyContacts.map((contact) => (
              <GlassCard key={contact.number} className="p-6 border-red-200/70 dark:border-red-400/20">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-red-500/10 p-4">
                    <Phone className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <p className="text-center text-4xl font-black text-red-600">{contact.number}</p>
                <p className="mt-2 text-center font-semibold text-secondary dark:text-white">{contact.name}</p>
                <p className="mt-1 text-center text-sm text-slate-600 dark:text-slate-300">{contact.description}</p>
                <button
                  onClick={() => window.location.href = `tel:${contact.number}`}
                  className="mt-4 w-full rounded-full bg-red-500 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600"
                >
                  Call Now
                </button>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-secondary dark:text-white">Quick Access to Safety Tools</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <GlassCard className="p-6 h-full transition hover:scale-105 hover:shadow-xl">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-secondary dark:text-white">{link.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{link.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    Access <ArrowRight className="h-4 w-4" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* SOS Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <GlassCard className="border-red-200/70 bg-red-50/80 p-8 text-center dark:border-red-400/20 dark:bg-red-950/30">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-500 p-4 animate-pulse">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-red-600 dark:text-red-400">Immediate Danger?</h2>
            <p className="mb-6 text-slate-700 dark:text-slate-300">
              Use our SOS feature to alert your emergency contacts and share your location instantly.
            </p>
            <Link
              to="/panic"
              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-4 font-bold text-white shadow-xl transition hover:bg-red-600 hover:scale-105"
            >
              <AlertTriangle className="h-5 w-5" />
              Trigger SOS Alert
            </Link>
          </GlassCard>
        </motion.div>

        {/* Safety Planning Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-16"
        >
          <GlassCard className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-secondary dark:text-white">Safety Planning Resources</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: 'Create an Escape Plan',
                  description: 'Plan safe routes, identify safe locations, and prepare an emergency bag.',
                  action: 'Create Plan',
                  path: '/safety/escape-plan',
                },
                {
                  title: 'Set Up Safety Timer',
                  description: 'Set automatic check-ins. If you do not check in, your contacts are alerted.',
                  action: 'Set Timer',
                  path: '/safety/timer',
                },
                {
                  title: 'Choose a Safe Word',
                  description: 'Set a secret word that triggers an alert when sent to trusted contacts.',
                  action: 'Set Word',
                  path: '/safety/safe-word',
                },
                {
                  title: 'Secure Your Evidence',
                  description: 'Store photos, documents, and other evidence safely in our encrypted vault.',
                  action: 'Go to Vault',
                  path: '/vault',
                },
              ].map((resource) => (
                <div key={resource.title} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-800/50">
                  <h3 className="mb-2 font-semibold text-secondary dark:text-white">{resource.title}</h3>
                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{resource.description}</p>
                  <Link
                    to={resource.path}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {resource.action} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Find Help by County */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <GlassCard className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <MapPin className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-secondary dark:text-white">Find Help Near You</h2>
            </div>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              Browse our directory of verified organizations providing support services across Kenya.
            </p>
            <Link
              to="/organisations"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
            >
              <MapPin className="h-5 w-5" />
              Browse Organizations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </GlassCard>
        </motion.div>
        <Footer />
      </div>
    </div>
  );
}

export default GetHelp;
