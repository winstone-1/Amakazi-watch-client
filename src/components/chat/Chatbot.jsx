import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Minimize2, Maximize2, Bot, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickReplies from './QuickReplies';
import TypingIndicator from './TypingIndicator';

function Chatbot() {
  const { darkMode } = useTheme();
  const { error: showError } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('amakazi-chat-history');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 1,
        role: 'bot',
        content: 'Hello! I am AmakaziWatch AI Assistant. I can help you with legal rights, safety planning, or connect you to resources. How can I help you today?',
        timestamp: new Date().toISOString(),
      },
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('amakazi-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  const quickReplies = useMemo(() => [
    { label: 'My Legal Rights', value: 'What are my rights if I experience abuse?' },
    { label: 'Find Help', value: 'How do I find help near me?' },
    { label: 'Safety Plan', value: 'Help me create a safety plan' },
    { label: 'Report Abuse', value: 'How do I report abuse?' },
  ], []);

  const handleSend = async (customValue = input) => {
    const trimmed = customValue.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/chat/', {
        message: userMessage.content,
        history: messages.map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content })),
      });

      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: response.data.answer || response.data.message || 'I understand. Could you tell me more so I can better help you?',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      showError('The assistant is currently offline. Please try again shortly.');
      const errorMessage = {
        id: Date.now() + 1,
        role: 'bot',
        content: 'I am having trouble connecting right now. For immediate help, call 1195 or use the emergency button. ',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    const welcome = {
      id: Date.now(),
      role: 'bot',
      content: 'Hello! I am AmakaziWatch AI Assistant. I can help you with legal rights, safety planning, or connect you to resources. How can I help you today?',
      timestamp: new Date().toISOString(),
    };
    setMessages([welcome]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_18px_45px_rgba(255,107,53,0.35)] transition hover:scale-105"
        aria-label="Open AI assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 w-[92vw] max-w-[380px] sm:right-6">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        className={`overflow-hidden rounded-[28px] border border-white/70 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl ${darkMode ? 'border-white/10 bg-slate-800/90' : 'border-slate-200/80 bg-white/90'}`}
      >
        <div className={`flex items-center justify-between px-4 py-3 ${darkMode ? 'bg-slate-900/80' : 'bg-primary/95'}`}>
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">AmakaziWatch AI Assistant</p>
              <div className="flex items-center gap-2 text-[11px] text-orange-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={clearChat} className="rounded-full p-1.5 text-white/90 transition hover:bg-white/10" aria-label="Clear chat">
              <Sparkles className="h-4 w-4" />
            </button>
            <button onClick={() => setIsMinimized((value) => !value)} className="rounded-full p-1.5 text-white/90 transition hover:bg-white/10" aria-label="Minimize chat">
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 text-white/90 transition hover:bg-white/10" aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {!isMinimized && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex h-[420px] flex-col">
                <div className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(255,107,53,0.12),_transparent_30%)] p-3 dark:bg-slate-900/40">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-slate-200/70 bg-white/70 p-2 dark:border-white/10 dark:bg-slate-800/80">
                  <QuickReplies replies={quickReplies} onSelect={handleSend} />
                  <div className="px-2 pb-2 pt-1">
                    <ChatInput
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onSend={() => handleSend(input)}
                      disabled={isLoading}
                      placeholder="Ask about your rights, safety, or support..."
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Chatbot;
