import React from "react";
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

/**
 * A reusable glass-card component with Framer Motion for hover effects and staggered entrance.
 * Usage: <AnimatedCard delay={0.1}>Content</AnimatedCard>
 */
export default function AnimatedCard({ children, className = '', delay = 0, onClick }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass-card relative overflow-hidden group transition-shadow duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none z-10" />
      {children}
    </motion.div>
  );
}
