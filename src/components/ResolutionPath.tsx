
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedTransition from './AnimatedTransition';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ResolutionOption {
  id: string;
  text: string;
  nextStepId?: string;
}

interface ResolutionStep {
  id: string;
  title: string;
  description: string;
  options: ResolutionOption[];
}

interface ResolutionPathProps {
  query: string;
  steps: ResolutionStep[];
  currentStepId: string;
  onSelectOption: (optionId: string, nextStepId?: string) => void;
  isVisible: boolean;
}

const ResolutionPath: React.FC<ResolutionPathProps> = ({
  query,
  steps,
  currentStepId,
  onSelectOption,
  isVisible
}) => {
  const currentStep = useMemo(() => {
    return steps.find(step => step.id === currentStepId);
  }, [steps, currentStepId]);

  const isTerminalStep = useMemo(() => {
    return currentStep?.options?.length === 0;
  }, [currentStep]);

  if (!isVisible || !query || !currentStep) {
    return null;
  }

  return (
    <AnimatedTransition isVisible={true} variant="slideUp" className="mt-16 glass-panel p-8 rounded-xl" delay={0.3}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-[#0076CE]/10 flex items-center justify-center text-[#0076CE]">
            <ChevronRight size={16} />
          </div>
          <div className="ml-3">
            <h3 className="text-sm text-gray-600">Your query</h3>
            <p className="font-medium text-black">{query}</p>
          </div>
        </div>

        <div className="mb-8 pb-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-black">{currentStep.title}</h2>
          <p className="text-gray-700">{currentStep.description}</p>
        </div>

        {!isTerminalStep ? (
          <div className="space-y-3">
            {currentStep.options.map(option => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#0076CE]/30 hover:bg-[#F2F7FC] transition-all cursor-pointer"
                onClick={() => onSelectOption(option.id, option.nextStepId)}
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="font-medium text-black">{option.text}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-500" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-[#F2F7FC] rounded-lg"
          >
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-[#0076CE]/10 flex items-center justify-center text-[#0076CE]">
                <CheckCircle2 size={16} />
              </div>
              <p className="ml-3 font-medium text-black">Recommendation</p>
            </div>
            <p className="text-gray-700">
              Based on your selections, we recommend focusing on this area. Here are specific steps you can follow to address your performance concerns.
            </p>
          </motion.div>
        )}
      </div>
    </AnimatedTransition>
  );
};

export default ResolutionPath;
