
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
}

const QueryInterpretation: React.FC<QueryInterpretationProps> = ({ steps, isVisible }) => {
  if (!isVisible || !steps.length) {
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
