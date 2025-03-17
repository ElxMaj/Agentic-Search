
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

interface Entity {
  text: string;
  type: string;
}

interface InterpretationStep {
  description: string;
  entities: Entity[];
}

interface QueryInterpretationProps {
  steps: InterpretationStep[];
  isVisible: boolean;
  isThinking?: boolean;
}

const QueryInterpretation: React.FC<QueryInterpretationProps> = ({ 
  steps, 
  isVisible,
  isThinking = false
}) => {
  if (!isVisible) {
    return null;
  }

  if (isThinking) {
    return (
      <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.2}>
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
            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-80">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeLinecap="round" />
            </svg>
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
  }
  
  if (!steps.length) {
    return null;
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.2}>
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Zap className="text-[#0076CE] mr-2" size={20} />
          <h2 className="text-black font-semibold text-lg">Here's how I understood your query:</h2>
        </div>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="flex"
            >
              <div className="mr-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#0076CE]/10 flex items-center justify-center text-[#0076CE] font-medium">
                  {index + 1}
                </div>
              </div>
              <div className="pt-1">
                <p className="text-black text-md" dangerouslySetInnerHTML={{ __html: step.description }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default QueryInterpretation;
