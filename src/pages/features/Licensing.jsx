import GlassCard from '../../components/common/GlassCard';
import { ShieldCheck, Book, Award } from 'lucide-react';
import PublicNav from '../../components/common/PublicNav';
import Footer from '../../components/common/Footer';
import { useTheme } from '../../context/ThemeContext';

function Licensing() {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.14),_transparent_28%),linear-gradient(135deg,_#fdf6ec_0%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.18),_transparent_28%),linear-gradient(135deg,_#1A2A3A_0%,_#16212e_100%)] transition-colors duration-300">
        <PublicNav />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-6 transition-colors duration-300">
            <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              Licensing
            </span>
            <h1 className="mt-4 text-3xl font-black text-secondary dark:text-white">AmakaziWatch Licensing</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Read our usage and distribution terms for platform content, software, and support resources.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Book className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-secondary dark:text-white">Platform Content</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            All content published on AmakaziWatch, including resources, guidelines, and support materials, is licensed for non-commercial use.
            Users may share, print, and store content for personal safety and community support.
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-secondary dark:text-white">Open APIs</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Where applicable, our public APIs are available under terms that permit responsible integration with partner organizations.
            Developers should contact the AmakaziWatch team for commercial or redistribution arrangements.
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-secondary dark:text-white">User License</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Users retain ownership of their personal data. By using AmakaziWatch, you grant the service permission to store and process your information for account management and safety workflows.
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This licensing summary is provided for clarity, but it is not a substitute for the full legal agreements governing the use of the AmakaziWatch platform.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            For questions about content reuse, distribution, or integration with support organizations, please contact support@amakaziwatch.org.
          </p>
        </div>
      </GlassCard>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Licensing;
