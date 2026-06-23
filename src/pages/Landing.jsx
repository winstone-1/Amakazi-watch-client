import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { EyeOff, LogIn } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Stats from '../components/landing/Stats';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { quickExit } from '../utils/helpers';

export const Landing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-light flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="bg-white/40 backdrop-blur-md border-b border-brand-peach/30 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-extrabold text-lg">
            A
          </div>
          <span className="font-extrabold text-xl tracking-tight text-brand-dark">
            {t('title')}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          
          <Button 
            type="primary" 
            danger 
            onClick={quickExit}
            icon={<EyeOff className="w-4 h-4" />}
            className="hidden sm:flex items-center gap-1.5 font-bold shadow-md bg-brand-primary border-none"
          >
            {t('quickExit')}
          </Button>

          <Button 
            type="default" 
            onClick={() => navigate('/login')}
            icon={<LogIn className="w-4 h-4" />}
            className="flex items-center gap-1.5 border-brand-peach/60 text-brand-dark hover:text-brand-primary"
          >
            {t('login')}
          </Button>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-8">
        <Hero />
        <Features />
        
        {/* Secondary Info Divider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/40 border border-brand-peach/20 rounded-3xl p-8 shadow-glass">
          <div className="lg:col-span-8 space-y-3">
            <h2 className="text-2xl font-bold text-brand-dark">
              {t('confidentialityPriority')}
            </h2>
            <p className="text-xs text-brand-muted leading-relaxed max-w-2xl">
              {t('confidentialityDesc')}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/register')}
              className="bg-brand-primary border-none text-white font-bold h-12 px-8 rounded-xl shadow-lg"
            >
              Get Started Securely
            </Button>
          </div>
        </div>

        <Stats />
      </main>

      {/* Footer */}
      <footer className="bg-white/40 border-t border-brand-peach/30 py-6 px-6 text-center text-xs text-brand-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 AmakaziWatch. National Gender Helpline: 1195.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-primary">Privacy Policy</a>
            <a href="#" className="hover:text-brand-primary">Accessibility</a>
            <a href="#" className="hover:text-brand-primary">Safety Tips</a>
            <a href="#" className="hover:text-brand-primary">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
