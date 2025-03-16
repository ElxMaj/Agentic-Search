
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Info } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

interface Step {
  id: string;
  title: string;
  description: string;
  options?: Option[];
}

interface Option {
  id: string;
  text: string;
  nextStepId?: string;
}

interface ResolutionPathProps {
  query: string;
  steps: Step[];
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
  const currentStep = steps.find(step => step.id === currentStepId);
  
  // Find completed steps (steps that appear before the current one in the array)
  const completedSteps = steps.slice(0, steps.findIndex(step => step.id === currentStepId));
  
  // Automatically scroll to the component when a new step is shown
  useEffect(() => {
    if (isVisible && currentStep) {
      const element = document.getElementById('resolution-path');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [isVisible, currentStepId, currentStep]);

  if (!isVisible || !currentStep) return null;

  return (
    <AnimatedTransition 
      isVisible={isVisible} 
      variant="slideUp" 
      className="w-full max-w-3xl mx-auto mt-16 mb-20"
      id="resolution-path"
    >
      <div className="glass-panel p-6 md:p-8">
        <div className="mb-6">
          <div className="chip">Query</div>
          <h3 className="mt-2 text-lg font-medium">{query}</h3>
        </div>

        {/* Timeline of completed steps */}
        {completedSteps.length > 0 && (
          <div className="mb-8 border-l-2 border-deep-blue/20 pl-4 space-y-4">
            {completedSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="absolute -left-[21px] top-0 bg-white rounded-full p-0.5">
                  <CheckCircle size={16} className="text-deep-blue" />
                </div>
                <div className="text-sm text-medium-gray">
                  <span className="font-medium text-deep-blue">{step.title}</span>
                  <p className="mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Current step */}
        <div className="relative">
          {completedSteps.length > 0 && (
            <div className="absolute -left-[21px] top-0 h-full border-l-2 border-deep-blue/20"></div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="mb-2 font-medium text-foreground">{currentStep.title}</div>
            <p className="text-medium-gray">{currentStep.description}</p>
          </motion.div>

          {/* Options for current step */}
          {currentStep.options && currentStep.options.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="grid grid-cols-1 gap-3 mt-5"
            >
              {currentStep.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={() => onSelectOption(option.id, option.nextStepId)}
                  className="group flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-light-blue hover:border-deep-blue/20 transition-all text-left"
                >
                  <span className="text-foreground group-hover:text-deep-blue transition-colors">
                    {option.text}
                  </span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-deep-blue transition-colors" />
                </motion.button>
              ))}
            </motion.div>
          )}
          
          {!currentStep.options || currentStep.options.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 p-4 rounded-lg bg-light-blue border border-deep-blue/10 flex items-start gap-3"
            >
              <Info size={18} className="text-deep-blue mt-0.5" />
              <div>
                <p className="text-foreground font-medium">Resolution Complete</p>
                <p className="text-medium-gray mt-1 text-sm">
                  You've reached the end of this resolution path. If you need further assistance, please try a new query.
                </p>
                <button 
                  onClick={() => window.location.href = '#query'}
                  className="mt-4 inline-flex items-center text-sm text-deep-blue hover:text-deep-blue/80 font-medium"
                >
                  Ask another question
                  <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ResolutionPath;
