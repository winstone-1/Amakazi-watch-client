import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

/**
 * Wrap any page with this component to get smooth enter transitions.
 * Usage: <PageWrapper><YourPageContent /></PageWrapper>
 */
function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;
