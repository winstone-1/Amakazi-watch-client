import React from "react";
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[85%] items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bot className="h-4 w-4" />
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 shadow-sm ${
            isUser
              ? 'bg-primary text-white'
              : 'border border-slate-200/70 bg-white/80 text-slate-700 dark:border-white/10 dark:bg-slate-800/85 dark:text-slate-100'
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
          <span className={`mt-1 block text-[10px] ${isUser ? 'text-orange-100' : 'text-slate-400 dark:text-slate-500'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ChatMessage;
