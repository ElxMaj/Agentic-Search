
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
      <div className="bg-[#0076CE] rounded-lg p-3 pr-5 inline-flex items-center shadow-md">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 3.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="mr-2 text-white"
        >
          <Loader size={20} className="opacity-90" />
        </motion.div>
        <div className="flex items-center">
          <span className="text-white font-medium ml-1">Thinking...</span>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="ml-1"
          >
            <span className="text-white">•••</span>
          </motion.div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ThinkingAnimation;
