
import React from 'react';
import { motion } from 'framer-motion';

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
  if (!isVisible || !options || options.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6"
    >
      <h3 className="text-lg font-medium mb-4">I found these potential solutions:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option, index) => (
          <motion.div
            key={option.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
            className={`relative border rounded-xl p-5 cursor-pointer transition-all ${
              selectedPath === option.key
                ? 'border-[#0076CE] bg-[#F5F9FF] shadow-sm'
                : 'border-gray-200 hover:border-[#0076CE]/50 hover:bg-gray-50'
            }`}
            onClick={() => onSelectPath(option.key)}
          >
            <div className="absolute top-3 right-3 flex items-center">
              <span className={`text-xs font-medium ${
                option.confidence >= 90 ? 'text-green-600' : 'text-amber-600'
              }`}>
                {option.confidence}% match
              </span>
            </div>
            
            <div className="flex items-start">
              <span className="text-2xl mr-2">{option.icon}</span>
              <div>
                <h4 className="font-medium">{option.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
            </div>
            
            {option.detail && (
              <div className="mt-3 bg-gray-50 border border-gray-100 rounded-md px-3 py-2 text-xs text-gray-700">
                {option.detail}
              </div>
            )}
            
            <div className="mt-3 text-xs text-gray-500">
              Based on {option.sources} sources
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResolutionOptions;
