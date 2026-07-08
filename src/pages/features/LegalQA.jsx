import React from "react";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Send, User, Bot, Sparkles, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { useToast } from '../../context/ToastContext';
import { askLegalQuestion } from '../../api/legal';

const QUICK_QUESTIONS = [
  'What is the Protection Against Domestic Violence Act?',
  'How do I get a protection order in Kenya?',
  'What are my rights under the Sexual Offences Act?',
  'Can I report anonymously to the police?',
  'What evidence do I need for a domestic violence case?',
];

function LegalQA() {
  const { error } = useToast();
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I\'m the AmakaziWatch Legal Bot. I can help you understand your rights under Kenyan law. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const question = text || input.trim();
    if (!question) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setLoading(true);

    try {
      const data = await askLegalQuestion(question);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: data.answer || data.response || 'I found some relevant information.',
        law: data.law || data.reference,
      }]);
    } catch {
      // Fallback answer for demo
      const answers = {
        'protection order': 'Under the Protection Against Domestic Violence Act (2015), you can apply for a Protection Order at any Magistrate\'s Court free of charge. The court can issue an emergency order on the same day. You will need to fill Form 1 and provide a sworn statement.',
        'sexual offences': 'The Sexual Offences Act (2006) criminalises rape, defilement, sexual assault, and harassment. Victims have the right to free medical examination and a post-rape care kit (P3 form) from any public hospital.',
        'default': 'Based on Kenyan law, you have the right to report GBV incidents to the nearest police station. The police are required to take your statement and provide you with an OB number. For immediate legal assistance, you can also contact FIDA Kenya at 0800 720 999 (free).',
      };
      const key = Object.keys(answers).find(k => question.toLowerCase().includes(k)) || 'default';
      setMessages(prev => [...prev, { role: 'bot', text: answers[key] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Sparkles className="h-4 w-4" />
          AI-Powered
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Legal Rights Bot</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Ask questions about Kenyan GBV laws, your rights, and how to access legal aid — available 24/7.
        </p>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Chat */}
        <GlassCard className="p-0 overflow-hidden flex flex-col" style={{ height: '520px' }}>
          <div className="border-b border-slate-200/70 dark:border-white/10 px-5 py-3 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Scale className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-secondary dark:text-white text-sm">Legal Bot</p>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="flex-shrink-0 rounded-full bg-primary/10 p-1.5 self-end">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? '' : ''}`}>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.law && (
                      <p className="mt-1.5 text-xs text-primary font-medium px-1">📚 {msg.law}</p>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="flex-shrink-0 rounded-full bg-slate-200 dark:bg-slate-600 p-1.5 self-end">
                      <User className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="flex-shrink-0 rounded-full bg-primary/10 p-1.5 self-end">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-slate-100 dark:bg-slate-700 px-4 py-3 flex gap-1">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <motion.div key={i} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: d }} className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-slate-200/70 dark:border-white/10 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask about your legal rights…"
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200/70 bg-white/80 px-4 py-2.5 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
            />
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="rounded-xl bg-primary p-2.5 text-white hover:bg-orange-600 transition disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </GlassCard>

        {/* Quick questions */}
        <div className="space-y-4">
          <GlassCard className="p-5">
            <p className="font-semibold text-secondary dark:text-white text-sm mb-3">Quick Questions</p>
            <div className="space-y-2">
              {QUICK_QUESTIONS.map(q => (
                <button key={q} onClick={() => sendMessage(q)} className="w-full flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/60 px-3 py-2.5 text-left text-xs text-slate-600 hover:border-primary/30 hover:text-primary transition dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300">
                  <ArrowRight className="h-3 w-3 flex-shrink-0 text-primary" />
                  {q}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5 border-amber-200/70 bg-amber-50/80 dark:border-amber-400/20 dark:bg-amber-950/30">
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              <strong>Note:</strong> This bot provides general legal information only. For personal legal advice, contact FIDA Kenya: <a href="tel:0800720999" className="underline font-bold">0800 720 999</a> (free).
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default LegalQA;
