// Shared Framer Motion animation variants for AmakaziWatch

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const slideInBottom = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.0 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.18 } },
};

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const pageTransition = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

// Float animation for hero elements (use as animate prop with repeat)
export const floatAnimation = {
  y: [0, -14, 0],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
};

export const floatAnimationSlow = {
  y: [0, -8, 0],
  transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
};

export const rotateAnimation = {
  rotate: [0, 360],
  transition: { duration: 20, repeat: Infinity, ease: 'linear' },
};

export const pulseAnimation = {
  scale: [1, 1.08, 1],
  transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
};

export const pulseRed = {
  scale: [1, 1.12, 1],
  opacity: [1, 0.8, 1],
  transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
};

// Hover/tap variants for buttons
export const buttonHover = { scale: 1.04, transition: { duration: 0.15 } };
export const buttonTap = { scale: 0.96 };

// Card hover
export const cardHover = {
  y: -4,
  scale: 1.01,
  boxShadow: '0 25px 60px -20px rgba(255,107,53,0.22)',
  transition: { duration: 0.2 },
};
