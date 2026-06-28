import { Link } from 'react-router-dom';
import { Shield, Heart, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-primary/10 p-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg font-bold text-secondary dark:text-white">AmakaziWatch</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs">
              Empowering women across Kenya with digital tools to report GBV, access support, and reclaim their safety.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200/70 bg-slate-50/80 p-2 text-slate-600 transition hover:bg-primary hover:text-white dark:border-white/10 dark:bg-slate-700/50 dark:text-slate-300" aria-label={s.label}>
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white">About</h3>
            <ul className="space-y-2">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/stories', label: 'Success Stories' },
                { to: '/news', label: 'News' },
                { to: '/blog', label: 'Blog' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contact', label: 'Contact Us' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white">Resources</h3>
            <ul className="space-y-2">
              {[
                { to: '/get-help', label: 'Get Help' },
                { to: '/resources', label: 'Downloads & Guides' },
                { to: '/support-groups', label: 'Support Groups' },
                { to: '/legal-bot', label: 'Legal Rights' },
                { to: '/education', label: 'Education Centre' },
                { to: '/report-status', label: 'Track Your Report' },
                { to: '/organisations', label: 'Find Organisations' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white">Get Involved</h3>
            <ul className="space-y-2">
              {[
                { to: '/volunteer', label: 'Volunteer' },
                { to: '/donate', label: 'Donate' },
                { to: '/scorecards', label: 'County Scorecards' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200/70 bg-emerald-50/80 px-3 py-2 dark:border-emerald-400/20 dark:bg-emerald-950/30">
              <Heart className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">24/7 Helpline: <strong>1195</strong></span>
            </div>
            <a href="mailto:support@amakaziwatch.ke" className="mt-3 flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition dark:text-slate-400">
              <Mail className="h-4 w-4" />
              support@amakaziwatch.ke
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200/70 pt-8 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-600 dark:text-slate-400">© {currentYear} AmakaziWatch. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>for women in Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
