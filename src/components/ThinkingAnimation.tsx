
import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

interface ThinkingAnimationProps {
  isVisible: boolean;
}

const ThinkingAnimation: React.FC<ThinkingAnimationProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-6" delay={0.1}>
      <div className="bg-slate-800 rounded-lg p-3 pr-5 inline-flex items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="mr-2 text-white"
        >
          <Loader size={20} className="opacity-80" />
        </motion.div>
        <div className="flex items-center">
          <span className="text-white font-medium ml-1">Thinking...</span>
          <motion.div
            animate={{ rotate: [0, 90] }}
            transition={{ 
              duration: 0.3, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            className="ml-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ThinkingAnimation;
