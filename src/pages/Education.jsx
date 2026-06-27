import GlassCard from '../components/common/GlassCard';
import { BookOpen, PlayCircle, Sparkles } from 'lucide-react';

function Education() {
  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-accent/10 p-2 text-accent">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary dark:text-white">Education</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Learn practical GBV awareness and prevention guidance.</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: 'Articles', description: 'Read trusted guidance and safety education content.', icon: BookOpen },
          { title: 'Videos', description: 'Watch short awareness and recovery resources.', icon: PlayCircle },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard key={item.title} className="p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-secondary dark:text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

export default Education;
