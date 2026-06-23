import React from 'react';
import { Phone, ShieldCheck, Heart } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-brand-peach/15 rounded-3xl p-8 md:p-12 border border-white/60 shadow-glass mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary uppercase tracking-wider">
            24/7 Digital Safety Space
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            {t('subtitle')}
          </h1>

          <p className="text-base md:text-lg text-brand-muted max-w-xl leading-relaxed">
            {t('slogan')}
          </p>

          {/* Highlights & Helpline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Helpline Card */}
            <div className="flex items-center gap-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white font-extrabold text-xl shadow-inner">
                1195
              </div>
              <div>
                <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">{t('emergencyHelpline')}</p>
                <p className="text-sm font-semibold text-brand-dark">National Hotline</p>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-3 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-brand-dark font-medium">
                <ShieldCheck className="w-5 h-5 text-brand-success" />
                <span>{t('confidentialReporting')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-dark font-medium">
                <Heart className="w-5 h-5 text-brand-primary" />
                <span>{t('directCoordination')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Photo */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-primary/20 to-orange-400/20 blur-xl opacity-75"></div>
          <img
            src="/community_support_hero.png"
            alt="Kenyan Community Advocates"
            className="relative rounded-2xl border-4 border-white shadow-2xl object-cover h-64 w-full md:h-80 lg:h-96 transform hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
