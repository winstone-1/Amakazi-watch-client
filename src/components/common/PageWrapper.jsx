import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Wrap any page with this component to get smooth enter transitions and consistent layout.
 * Usage: <PageWrapper title="Dashboard" icon={Home} breadcrumbs={[{label: 'Dashboard', path: '/dashboard'}]}><YourPageContent /></PageWrapper>
 */
function PageWrapper({ children, className = '', title, icon: Icon, breadcrumbs }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
      className={`glass-card p-6 min-h-[calc(100vh-140px)] ${className}`}
    >
      {(title || breadcrumbs) && (
        <div className="mb-6 space-y-4">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
              <Link to="/" className="hover:text-primary transition-colors flex items-center">
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path || index} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-2" />
                  {crumb.path ? (
                    <Link to={crumb.path} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-800 dark:text-slate-200">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}
          {title && (
            <div className="flex items-center gap-3 border-b border-slate-200/70 pb-4 dark:border-white/10">
              {Icon && (
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              )}
              <h1 className="text-2xl font-bold text-secondary dark:text-white">{title}</h1>
            </div>
          )}
        </div>
      )}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}

export default PageWrapper;
