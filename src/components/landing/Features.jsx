import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus2, Search, HeartHandshake, BookOpen } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export const Features = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      title: t('reportNow'),
      desc: t('reportNowDesc'),
      icon: <FilePlus2 className="w-6 h-6 text-white" />,
      actionText: t('reportNow'),
      action: () => navigate('/reports'),
      bgColor: 'bg-brand-primary/95 hover:bg-brand-primary',
      textColor: 'text-white',
      descColor: 'text-white/80',
      iconBg: 'bg-white/20'
    },
    {
      title: t('findHelp'),
      desc: t('findHelpDesc'),
      icon: <Search className="w-6 h-6 text-brand-primary" />,
      actionText: t('browseResources'),
      action: () => navigate('/organisations'),
      bgColor: 'bg-white/80 hover:bg-white border border-brand-peach/40 shadow-sm',
      textColor: 'text-brand-dark',
      descColor: 'text-brand-muted',
      iconBg: 'bg-brand-primary/10'
    },
    {
      title: t('peerSupport'),
      desc: 'Connect with verified survivors or professional counselors anonymously.',
      icon: <HeartHandshake className="w-6 h-6 text-brand-primary" />,
      actionText: 'Connect Now',
      action: () => navigate('/peer-support'),
      bgColor: 'bg-white/80 hover:bg-white border border-brand-peach/40 shadow-sm',
      textColor: 'text-brand-dark',
      descColor: 'text-brand-muted',
      iconBg: 'bg-brand-primary/10'
    },
    {
      title: t('safetyGuides'),
      desc: 'Learn methods of self-defense, safety planning, and digital footprint management.',
      icon: <BookOpen className="w-6 h-6 text-brand-primary" />,
      actionText: 'Learn More',
      action: () => navigate('/education'),
      bgColor: 'bg-white/80 hover:bg-white border border-brand-peach/40 shadow-sm',
      textColor: 'text-brand-dark',
      descColor: 'text-brand-muted',
      iconBg: 'bg-brand-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {features.map((item, idx) => (
        <div
          key={idx}
          onClick={item.action}
          className={`group rounded-2xl p-6 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 transition-all duration-300 ${item.bgColor}`}
        >
          <div className="space-y-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
              {item.icon}
            </div>
            <div>
              <h3 className={`text-lg font-bold ${item.textColor}`}>{item.title}</h3>
              <p className={`text-xs mt-1.5 leading-relaxed ${item.descColor}`}>{item.desc}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
            <span>{item.actionText}</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
