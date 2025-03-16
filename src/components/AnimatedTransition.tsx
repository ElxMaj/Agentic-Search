
import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimationVariant = 
  | 'fadeIn' 
  | 'slideUp' 
  | 'slideRight' 
  | 'scale' 
  | 'none';

interface AnimatedTransitionProps {
  children: ReactNode;
  isVisible?: boolean;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

export const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  isVisible = true,
  variant = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
}) => {
  const getVariants = () => {
    switch (variant) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'none':
      default:
        return {
          hidden: {},
          visible: {},
        };
    }
  };

  const variants = getVariants();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedTransition;
