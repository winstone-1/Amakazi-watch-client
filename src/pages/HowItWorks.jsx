import { motion } from 'framer-motion';
import { Shield, Users, FileText, Phone, ArrowRight, CheckCircle, Clock, Lock, Heart, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';
import PublicNav from '../components/common/PublicNav';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';

function HowItWorks() {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
      <PublicNav />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-black tracking-tight text-secondary dark:text-white sm:text-5xl">
            How It Works
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Simple steps to get help, report incidents, and access support resources.
          </p>
        </motion.div>

        {/* For Survivors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-secondary dark:text-white">For Survivors</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Create Your Account',
                description: 'Sign up securely with your email. Your information is encrypted and never shared without your consent.',
                icon: Lock,
              },
              {
                step: '2',
                title: 'Report an Incident',
                description: 'Fill out a confidential report form with details about the incident. You can attach evidence securely.',
                icon: FileText,
              },
              {
                step: '3',
                title: 'Get Connected',
                description: 'We match you with verified organizations, legal aid, and peer support based on your location and needs.',
                icon: Users,
              },
            ].map((item) => (
              <GlassCard key={item.step} className="p-6 relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  {item.step}
                </div>
                <div className="mb-3 rounded-full bg-primary/10 p-2 w-fit">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-secondary dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* For Organizations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-secondary dark:text-white">For Organizations</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Register Your Organization',
                description: 'Create an organization profile with your services, location, and contact information.',
                icon: Shield,
              },
              {
                step: '2',
                title: 'Update Your Inventory',
                description: 'List available resources like shelter beds, counseling slots, legal aid capacity, and more.',
                icon: CheckCircle,
              },
              {
                step: '3',
                title: 'Receive & Respond',
                description: 'Get matched with survivors who need your services. Manage cases and track your impact.',
                icon: Clock,
              },
            ].map((item) => (
              <GlassCard key={item.step} className="p-6 relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  {item.step}
                </div>
                <div className="mb-3 rounded-full bg-primary/10 p-2 w-fit">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-secondary dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Safety Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <GlassCard className="p-8">
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-secondary dark:text-white">Safety Features</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Safety Timer with check-in system',
                'Safe Word emergency trigger',
                'Risk Assessment tools',
                'Escape Plan generator',
                'Document Vault for evidence',
                'Emergency Exit button',
                'Anonymous reporting option',
                'Encrypted peer support chat',
                'Legal rights information',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-slate-800/50">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: 'Is my information kept confidential?',
                answer: 'Yes, all your information is encrypted and stored securely. We never share your data without your explicit consent, except in emergency situations where required by law.',
              },
              {
                question: 'Can I report anonymously?',
                answer: 'Yes, you can choose to submit an anonymous report. However, providing contact information helps us connect you with support services.',
              },
              {
                question: 'How quickly will I get help after reporting?',
                answer: 'Our system matches you with available organizations within minutes. Emergency contacts are available 24/7 through our SOS feature.',
              },
              {
                question: 'Is there a cost to use AmakaziWatch?',
                answer: 'Basic features are free for all users. Organizations can subscribe to premium plans for advanced case management and analytics.',
              },
            ].map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="mb-2 font-semibold text-secondary dark:text-white">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-secondary dark:text-white">Ready to Get Started?</h2>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              Join thousands of women and organizations already using AmakaziWatch to make Kenya safer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
              >
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/get-help"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200"
              >
                <Phone className="h-4 w-4" />
                Get Help Now
              </Link>
            </div>
          </GlassCard>
        </motion.div>
        <Footer />
      </div>
    </div>
    </div>
  );
}

export default HowItWorks;
