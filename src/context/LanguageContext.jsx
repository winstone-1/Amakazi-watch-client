import React, { createContext, useContext } from 'react';
import { useStore } from '../store/store';
import { TRANSLATIONS } from '../utils/constants';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
export default LanguageContext;
