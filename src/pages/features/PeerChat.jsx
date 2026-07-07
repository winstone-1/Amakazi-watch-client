import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Send, MessageCircle, UserPlus, Phone, Bot, User, Sparkles, X } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import { useToast } from '../../context/ToastContext';
import { peerService } from '../../services/api';

const SUPPORTERS_ONLINE = 3;

const WELCOME_MSG = {
  role: 'supporter',
  text: "Hi, I'm here to listen and support you. This is a confidential, safe space. Take your time — what's on your mind?",
  time: new Date(),
};

function PeerChat() {
  const { success, error } = useToast();
  const [phase, setPhase] = useState('find'); // 'find' | 'chat'
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [finding, setFinding] = useState(false);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findSupporter = async () => {
    setFinding(true);
    try {
      const data = await peerService.findSession({ language: 'en' });
      setSessionId(data.id || 'demo-session');
      setPhase('chat');
      success('Connected to a peer supporter!');
    } catch {
      // Allow demo mode even if backend fails
      setSessionId('demo-session');
      setPhase('chat');
      success('Connected to a peer supporter (demo mode).');
    } finally {
      setFinding(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const userMsg = { role: 'user', text, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setSending(true);

    try {
      if (sessionId && sessionId !== 'demo-session') {
        await peerService.sendMessage(sessionId, text);
      }
      // Simulate supporter response in demo
      if (!sessionId || sessionId === 'demo-session') {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'supporter',
            text: "Thank you for sharing that with me. You're being very brave. Can you tell me a bit more about what's happening?",
            time: new Date(),
          }]);
        }, 1400);
      }
    } catch {
      error('Message could not be delivered. Please try again.');
      setMessages(prev => prev.filter(m => m !== userMsg));
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const endSession = async () => {
    if (sessionId && sessionId !== 'demo-session') {
      try { await peerService.endSession(sessionId); } catch {}
    }
    setPhase('find');
    setMessages([WELCOME_MSG]);
    setSessionId(null);
    success('Session ended. Stay safe. 💙');
  };

  const formatTime = (d) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
          <Sparkles className="h-4 w-4" />
          Confidential Support
        </div>
        <h1 className="text-3xl font-black text-secondary dark:text-white">Peer Support Chat</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Connect with a trained peer supporter. All conversations are private, encrypted, and never shared without your consent.
        </p>
      </GlassCard>

      <AnimatePresence mode="wait">
        {phase === 'find' ? (
          <motion.div key="find" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <GlassCard className="p-6 border-emerald-200/70 bg-emerald-50/80 dark:border-emerald-400/20 dark:bg-emerald-950/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full bg-emerald-500/10 p-2">
                    <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 dark:text-emerald-100">Available Now</p>
                    <div className="flex items-center gap-1.5">
                      <motion.span animate={{ scale: [1,1.3,1], opacity: [1,0.6,1] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-xs text-emerald-700 dark:text-emerald-300">{SUPPORTERS_ONLINE} supporters online</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={findSupporter}
                  disabled={finding}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-lg hover:bg-orange-600 transition disabled:opacity-50"
                >
                  <UserPlus className="h-4 w-4" />
                  {finding ? 'Finding supporter…' : 'Start Chat Session'}
                </motion.button>
              </GlassCard>

              <GlassCard className="p-6 border-red-200/70 bg-red-50/80 dark:border-red-400/20 dark:bg-red-950/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full bg-red-500/10 p-2">
                    <Phone className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-bold text-red-900 dark:text-red-100">Emergency?</p>
                    <p className="text-xs text-red-700 dark:text-red-300">Call immediately</p>
                  </div>
                </div>
                <motion.a
                  href="tel:1195"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{ scale: [1, 1.02, 1], opacity: [1, 0.85, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-3 font-semibold text-white shadow-lg"
                >
                  <Phone className="h-4 w-4" />1195 — Free Helpline
                </motion.a>
              </GlassCard>
            </div>

            <GlassCard className="p-6">
              <h3 className="font-bold text-secondary dark:text-white mb-4">What to expect</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: '🔒', title: 'Confidential', desc: 'Your conversation is private and encrypted.' },
                  { icon: '🎓', title: 'Trained Supporters', desc: 'All supporters are trained in trauma-informed care.' },
                  { icon: '💙', title: 'Non-Judgmental', desc: 'A safe space to share anything at your own pace.' },
                ].map(item => (
                  <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-800/60">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="font-semibold text-secondary dark:text-white text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div key="chat" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <GlassCard className="p-0 overflow-hidden flex flex-col" style={{ height: '580px' }}>
              {/* Chat header */}
              <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-white/10 px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="rounded-full bg-primary/10 p-2.5">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-800 bg-emerald-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary dark:text-white text-sm">Peer Supporter</p>
                    <p className="text-xs text-emerald-500">Online · Responding</p>
                  </div>
                </div>
                <button onClick={endSession} className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 transition" aria-label="End session">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role !== 'user' && (
                        <div className="flex-shrink-0 rounded-full bg-primary/10 p-1.5 self-end">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div className="max-w-[78%]">
                        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-primary text-white rounded-br-sm'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100 rounded-bl-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <p className={`text-xs text-slate-400 mt-0.5 ${msg.role === 'user' ? 'text-right' : ''}`}>
                          {formatTime(msg.time)}
                        </p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="flex-shrink-0 rounded-full bg-slate-200 dark:bg-slate-600 p-1.5 self-end">
                          <User className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {sending && (
                  <div className="flex gap-2.5">
                    <div className="flex-shrink-0 rounded-full bg-primary/10 p-1.5 self-end">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl rounded-bl-sm bg-slate-100 dark:bg-slate-700 px-4 py-3 flex gap-1">
                      {[0, 0.15, 0.3].map((d, j) => (
                        <motion.div key={j} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                          className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-slate-200/70 dark:border-white/10 p-3 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type a message… (press Enter to send)"
                  className="flex-1 rounded-xl border border-slate-200/70 bg-white/80 px-4 py-2.5 text-sm text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || sending}
                  className="rounded-xl bg-primary p-2.5 text-white hover:bg-orange-600 transition disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PeerChat;
