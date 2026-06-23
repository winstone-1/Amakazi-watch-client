import React from 'react';
import { useTranslation } from '../../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-white/40 backdrop-blur-md p-1 rounded-full border border-white/60 text-xs">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full font-medium transition-all ${
          language === 'en'
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-brand-dark hover:bg-brand-peach/30'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('sw')}
        className={`px-3 py-1 rounded-full font-medium transition-all ${
          language === 'sw'
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-brand-dark hover:bg-brand-peach/30'
        }`}
      >
        Swahili
      </button>
    </div>
  );
};
export default LanguageSwitcher;
