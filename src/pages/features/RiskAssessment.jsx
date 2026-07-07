import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertCircle, CheckCircle, ArrowRight, RotateCcw, Sparkles, Phone } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { useToast } from '../../context/ToastContext';
import { safetyService } from '../../services/api';

const QUESTIONS = [
  { id: 'q1', text: 'Does your partner or abuser control your money or access to resources?', weight: 2 },
  { id: 'q2', text: 'Has there been previous physical violence (hitting, slapping, pushing)?', weight: 3 },
  { id: 'q3', text: 'Have there been threats with a weapon (knife, firearm, etc.)?', weight: 4 },
  { id: 'q4', text: 'Are your children or dependents also at risk of harm?', weight: 3 },
  { id: 'q5', text: 'Do you feel unsafe in your current home environment?', weight: 3 },
  { id: 'q6', text: 'Has the abuser threatened to harm you if you leave or report?', weight: 4 },
  { id: 'q7', text: 'Are you isolated from friends and family by the abuser?', weight: 2 },
  { id: 'q8', text: 'Has the abuse escalated in frequency or severity recently?', weight: 3 },
];

const MAX_SCORE = QUESTIONS.reduce((acc, q) => acc + q.weight, 0);

const RISK_LEVELS = {
  high:   { label: 'High Risk',    color: 'text-red-600 dark:text-red-400',    bg: 'border-red-200/70 bg-red-50/80 dark:border-red-400/20 dark:bg-red-950/30',    icon: AlertCircle },
  medium: { label: 'Medium Risk',  color: 'text-amber-600 dark:text-amber-400', bg: 'border-amber-200/70 bg-amber-50/80 dark:border-amber-400/20 dark:bg-amber-950/30', icon: AlertCircle },
  low:    { label: 'Low Risk',     color: 'text-emerald-600 dark:text-emerald-400', bg: 'border-emerald-200/70 bg-emerald-50/80 dark:border-emerald-400/20 dark:bg-emerald-950/30', icon: CheckCircle },
};

const LOCAL_PLAN = (score, total) => {
  const pct = score / total;
  if (pct >= 0.6) return {
    risk_level: 'high',
    score,
    safety_plan: 'Your situation indicates a high level of danger. Please contact the GBV helpline (1195) immediately. Consider going to a safe location today. Do not inform the abuser of your plans. Legal aid is available free of charge through FIDA Kenya.',
  };
  if (pct >= 0.35) return {
    risk_level: 'medium',
    score,
    safety_plan: 'There are concerning signs in your situation. Create a safety plan now using our Escape Plan tool. Document all incidents. Contact a trusted friend or organisation. The GBV helpline (1195) can help you think through your options confidentially.',
  };
  return {
    risk_level: 'low',
    score,
    safety_plan: 'While your immediate risk appears lower, it is important to stay alert to warning signs. Keep the helpline number (1195) saved. Stay connected with trusted people. Review your safety plan regularly.',
  };
};

function RiskAssessment() {
  const { success, error } = useToast();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const handleAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (answeredCount < QUESTIONS.length) {
      error('Please answer all questions before continuing.');
      return;
    }
    setLoading(true);
    const localScore = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] ? q.weight : 0), 0);
    try {
      const data = await safetyService.riskAssessment(answers);
      setResult(data);
      success('Risk assessment complete.');
    } catch {
      setResult(LOCAL_PLAN(localScore, MAX_SCORE));
      success('Assessment complete (offline mode).');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const level = RISK_LEVELS[result.risk_level] || RISK_LEVELS.medium;
    const Icon = level.icon;
    const pct = Math.round((result.score / MAX_SCORE) * 100);

    return (
      <div className="space-y-6 transition-colors duration-300">
        <GlassCard className="p-6 sm:p-8">
          <h1 className="text-3xl font-black text-secondary dark:text-white">Risk Assessment Result</h1>
        </GlassCard>

        <GlassCard className={`p-8 ${level.bg}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className="rounded-full p-3 bg-white/60 dark:bg-slate-800/60">
              <Icon className={`h-8 w-8 ${level.color}`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl font-black ${level.color}`}>{level.label}</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${result.risk_level === 'high' ? 'bg-red-500' : result.risk_level === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  />
                </div>
                <span className={`text-sm font-bold ${level.color}`}>{result.score || '-'}/{MAX_SCORE}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/60 dark:bg-slate-800/50 p-5">
            <h3 className="font-bold text-secondary dark:text-white mb-2">Recommended Safety Plan</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.safety_plan}</p>
          </div>
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2">
          <GlassCard className="p-5">
            <h3 className="font-semibold text-secondary dark:text-white mb-3">Next Steps</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {result.risk_level === 'high' ? [
                'Call GBV helpline: 1195',
                'Go to a safe location today',
                'Contact FIDA Kenya for free legal aid',
                'Document injuries and threats as evidence',
              ] : result.risk_level === 'medium' ? [
                'Create an escape plan now',
                'Save emergency numbers',
                'Tell a trusted person about your situation',
                'Contact a local support organisation',
              ] : [
                'Keep the helpline number (1195) saved',
                'Stay connected with trusted people',
                'Know your legal rights',
                'Review your safety plan regularly',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  {step}
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard className="p-5 border-red-200/70 bg-red-50/80 dark:border-red-400/20 dark:bg-red-950/30">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3">Emergency Numbers</h3>
            <div className="space-y-2">
              {[['GBV Helpline', '1195'], ['Police', '999'], ['Childline', '116']].map(([name, num]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-sm text-red-800 dark:text-red-200">{name}</span>
                  <a href={`tel:${num}`} className="font-bold text-red-600 dark:text-red-400 hover:underline text-sm">{num}</a>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <button onClick={() => { setResult(null); setAnswers({}); }}
          className="flex items-center gap-2 rounded-full border border-slate-200/70 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300 hover:border-primary hover:text-primary transition">
          <RotateCcw className="h-4 w-4" /> Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Sparkles className="h-4 w-4" />
          Safety Hub
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Risk Assessment</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Answer these questions honestly to get a personalised safety plan. Your answers are private and never stored on our servers.
        </p>
        {/* Progress bar */}
        {answeredCount > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{answeredCount} of {QUESTIONS.length} answered</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-primary" transition={{ duration: 0.3 }} />
            </div>
          </div>
        )}
      </GlassCard>

      <div className="space-y-3">
        {QUESTIONS.map((q, idx) => (
          <motion.div key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <GlassCard className="p-5" hover={false}>
              <p className="font-medium text-secondary dark:text-white text-sm mb-4">
                <span className="text-primary font-black mr-2">{idx + 1}.</span>
                {q.text}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAnswer(q.id, true)}
                  className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${
                    answers[q.id] === true
                      ? 'bg-red-500 text-white shadow'
                      : 'border border-slate-200/70 bg-white/60 text-slate-600 hover:border-red-300 hover:text-red-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(q.id, false)}
                  className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${
                    answers[q.id] === false
                      ? 'bg-emerald-500 text-white shadow'
                      : 'border border-slate-200/70 bg-white/60 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300'
                  }`}
                >
                  No
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        disabled={loading || answeredCount < QUESTIONS.length}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
      >
        {loading ? 'Analysing…' : `Get My Safety Assessment (${answeredCount}/${QUESTIONS.length})`}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </motion.button>
    </div>
  );
}

export default RiskAssessment;
