import { Link } from 'react-router-dom';
import { Shield, Heart, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Platform */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="rounded-xl bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-secondary dark:text-white">AmakaziWatch</span>
            </div>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white mt-1">Resources</h3>
            <ul className="space-y-2">
              {[
                { to: '/faq', label: 'FAQ' },
                { to: '/resources', label: 'Resources' },
                { to: '/stories', label: 'Stories' },
                { to: '/blog', label: 'Blog' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white mt-1">Legal</h3>
            <ul className="space-y-2">
              {[
                { to: '/terms', label: 'Terms of Service' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/licensing', label: 'Licensing' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Emergency */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white mt-1">Emergency</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:1195" className="text-sm font-medium text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400">Call 1195 (toll-free)</a>
              </li>
              <li>
                <Link to="/panic" className="text-sm text-red-500 transition hover:text-red-600 dark:text-red-400 font-medium">SOS Emergency Button</Link>
              </li>
              <li>
                <Link to="/get-help" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">Find Help</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Social */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white mt-1">Social</h3>
            <ul className="space-y-3">
              {[
                { icon: Twitter, label: 'Twitter/X', href: 'https://twitter.com' },
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-primary dark:text-slate-300" aria-label={s.label}>
                      <Icon className="h-4 w-4" />
                      <span>{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
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
