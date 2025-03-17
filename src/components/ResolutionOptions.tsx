
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, ThumbsUp, Info } from 'lucide-react';
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
  selectedPath: string;
  isVisible: boolean;
}

const ResolutionOptions: React.FC<ResolutionOptionsProps> = ({ 
  options, 
  onSelectPath, 
  selectedPath,
  isVisible
}) => {
  if (!isVisible || options.length ===
    0) {
    return null;
  }

  // Function to determine color based on confidence level
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 75) return "text-blue-500";
    if (confidence >= 60) return "text-amber-500";
    return "text-orange-500";
  };

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8">
      <div className="rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <MessageCircleQuestion className="text-[#0076CE] mr-2" size={20} />
          <h2 className="text-lg font-semibold text-black">Solution Approaches</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Here are the most effective approaches to resolve your issue, based on analysis of similar cases.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option) => (
            <div 
              key={option.key}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer h-full flex flex-col ${
                selectedPath === option.key 
                  ? 'border-[#0076CE] bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSelectPath(option.key)}
            >
              <div className="flex items-start mb-auto">
                <div className="text-2xl mr-3">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-black mb-1">{option.name}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center mb-2">
                  <ThumbsUp size={16} className={`${getConfidenceColor(option.confidence)} mr-2`} />
                  <span className={`text-sm ${getConfidenceColor(option.confidence)}`}>
                    {option.confidence}% Confidence
                  </span>
                </div>
                
                <div className="flex items-center mb-4">
                  <Info size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{option.sources} Sources</span>
                </div>
                
                <p className="text-sm text-gray-600">{option.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ResolutionOptions;
