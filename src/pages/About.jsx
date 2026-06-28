import { motion } from 'framer-motion';
import { Shield, Heart, Users, Target, Award, Globe, ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/common/GlassCard';
import Footer from '../components/common/Footer';

function About() {
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
            <div className="rounded-2xl border border-orange-200/70 bg-white/70 p-4 shadow-lg backdrop-blur-xl dark:border-orange-400/20 dark:bg-slate-800/70">
              <Shield className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-secondary dark:text-white sm:text-5xl">
            About AmakaziWatch
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Empowering women across Kenya with digital tools to report GBV, access support, and reclaim their safety.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-secondary dark:text-white">Our Mission</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              To provide a safe, confidential, and accessible platform for women in Kenya to report gender-based violence, 
              access legal resources, connect with support organizations, and receive immediate help when in danger. 
              We believe every woman deserves to feel safe, heard, and supported.
            </p>
          </GlassCard>
        </motion.div>

        {/* Impact Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary dark:text-white">Our Impact</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Reports Filed', value: '1,247+', icon: Shield },
              { label: 'Women Helped', value: '3,892+', icon: Heart },
              { label: 'Partner Orgs', value: '89', icon: Users },
              { label: 'Counties Covered', value: '47', icon: Globe },
            ].map((stat, index) => (
              <GlassCard key={stat.label} className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-black text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary dark:text-white">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Safety First',
                description: 'Every feature is designed with survivor safety as the top priority, with emergency exits and privacy protections built-in.',
                icon: Shield,
              },
              {
                title: 'Confidentiality',
                description: 'All reports and communications are encrypted and stored securely. Your privacy is non-negotiable.',
                icon: Lock,
              },
              {
                title: 'Empowerment',
                description: 'We provide tools, knowledge, and connections to help women make informed decisions and take control of their safety.',
                icon: Award,
              },
            ].map((value) => (
              <GlassCard key={value.title} className="p-6">
                <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-secondary dark:text-white">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-16"
        >
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold text-secondary dark:text-white">Our Partners</h2>
            </div>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              We work with government agencies, NGOs, legal aid organizations, and healthcare providers across Kenya to ensure comprehensive support.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'National Gender & Equality Commission',
                'Kenya Women Lawyers Association',
                'Gender Violence Recovery Centre',
                'Coalition on Violence Against Women',
                'Federation of Women Lawyers',
                'Ministry of Public Service',
              ].map((partner) => (
                <div key={partner} className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-slate-800/50">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{partner}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-secondary dark:text-white">Join Our Mission</h2>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              Whether you need help, want to volunteer, or represent an organization, there's a place for you in the AmakaziWatch community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-600"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/organisations"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200"
              >
                Partner With Us
              </Link>
            </div>
          </GlassCard>
        </motion.div>
        <Footer />
      </div>
    </div>
  );
}

export default About;
