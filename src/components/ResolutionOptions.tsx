
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleQuestion } from 'lucide-react';
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
  if (!isVisible || options.length === 0) {
    return null;
  }

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
        
        <div className="space-y-4">
          {options.map((option) => (
            <div 
              key={option.key}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedPath === option.key 
                  ? 'border-[#0076CE] bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSelectPath(option.key)}
            >
              <div className="flex items-start">
                <div className="text-2xl mr-3">{option.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-black">{option.name}</h3>
                    <div className="flex items-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        option.confidence >= 90 ? 'bg-green-100 text-green-800' :
                        option.confidence >= 80 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {option.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">{option.detail}</span>
                    <span className="text-xs text-gray-500">Based on {option.sources} sources</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ResolutionOptions;
