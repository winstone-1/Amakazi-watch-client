import { Link } from 'react-router-dom';
import { Shield, Heart, Mail, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-primary/10 p-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg font-bold text-secondary dark:text-white">AmakaziWatch</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Empowering women across Kenya with digital tools to report GBV, access support, and reclaim their safety.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-200/70 bg-slate-50/80 p-2 text-slate-600 transition hover:bg-primary hover:text-white dark:border-white/10 dark:bg-slate-700/50 dark:text-slate-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-200/70 bg-slate-50/80 p-2 text-slate-600 transition hover:bg-primary hover:text-white dark:border-white/10 dark:bg-slate-700/50 dark:text-slate-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-200/70 bg-slate-50/80 p-2 text-slate-600 transition hover:bg-primary hover:text-white dark:border-white/10 dark:bg-slate-700/50 dark:text-slate-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/get-help" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Get Help
                </Link>
              </li>
              <li>
                <Link to="/organisations" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Find Organizations
                </Link>
              </li>
              <li>
                <Link to="/scorecards" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  County Scorecards
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/education" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Education Center
                </Link>
              </li>
              <li>
                <Link to="/legal-bot" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Legal Rights
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Safety Tools
                </Link>
              </li>
              <li>
                <Link to="/peer-support" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Peer Support
                </Link>
              </li>
              <li>
                <Link to="/heatmap" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Incident Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary dark:text-white">Legal & Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-600 transition hover:text-primary dark:text-slate-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@amakaziwatch.ke"
                  className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-primary dark:text-slate-300"
                >
                  <Mail className="h-4 w-4" />
                  support@amakaziwatch.ke
                </a>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200/70 bg-emerald-50/80 px-3 py-2 dark:border-emerald-400/20 dark:bg-emerald-950/30">
              <Heart className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                24/7 Helpline: 1195
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200/70 pt-8 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} AmakaziWatch. All rights reserved.
            </p>
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
