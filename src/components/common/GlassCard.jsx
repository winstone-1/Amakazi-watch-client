import React from "react";
import { motion } from 'framer-motion';

function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, scale: 1.01, boxShadow: '0 25px 60px -20px rgba(255, 107, 53, 0.28)' } : undefined}
      transition={{ duration: 0.2 }}
      className={`rounded-[24px] border border-white/70 bg-white/70 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.24)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-800/70 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
