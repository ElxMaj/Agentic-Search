
import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Info, ArrowRight } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

export interface ResolutionPathOption {
  key: string;
  name: string;
  icon: string;
  description: string;
  confidence: number;
  sources: number;
  detail: string;
}

interface ResolutionOptionsProps {
  options: ResolutionPathOption[];
  onSelectPath: (pathKey: string) => void;
  selectedPath?: string;
  isVisible: boolean;
}

const ResolutionOptions: React.FC<ResolutionOptionsProps> = ({ 
  options, 
  onSelectPath, 
  selectedPath,
  isVisible 
}) => {
  if (!isVisible || !options.length) {
    return null;
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.3}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-black mb-1">I found multiple relevant topics. What are you looking for?</h2>
        <p className="text-gray-600">Select the option that best matches your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option, index) => (
          <motion.div
            key={option.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (index * 0.1) }}
            className={`border rounded-lg p-5 cursor-pointer transition-all ${
              selectedPath === option.key 
                ? 'border-[#0076CE] ring-1 ring-[#0076CE] bg-white'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
            onClick={() => onSelectPath(option.key)}
          >
            <h3 className="font-semibold text-black mb-1">{option.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{option.description}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <ThumbsUp size={16} className="text-[#0076CE] mr-1" />
                <span className="text-sm text-gray-700">{option.confidence}% Confidence</span>
              </div>
              <div className="flex items-center">
                <Info size={16} className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">{option.sources} Sources</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
              {option.detail}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedTransition>
  );
};

export default ResolutionOptions;
