
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
  if (!isVisible || options.length === 0) {
    return null;
  }

  // Default content for Teams Application Issues if options are missing descriptions
  const getTeamsApplicationPathDefault = (key: string) => {
    if (key === "application") {
      return {
        description: "Resolves Teams webcam issues by addressing cache corruption and application-level problems",
        detail: "84% success rate for webcam detection issues. Targets Teams' internal configuration."
      };
    }
    if (key === "permissions") {
      return {
        description: "Addresses Teams camera access by fixing Windows and application permissions settings",
        detail: "92% success rate for permission-related issues. Most secure and non-invasive approach."
      };
    }
    if (key === "connection") {
      return {
        description: "Resolves hardware connectivity issues between your webcam and computer",
        detail: "68% success rate for physical connection problems. Best for intermittent camera detection."
      };
    }
    if (key === "drivers") {
      return {
        description: "Updates and repairs webcam drivers to ensure compatibility with Teams",
        detail: "79% success rate for driver-related issues. Most technical but thorough solution."
      };
    }
    return { description: "", detail: "" };
  };

  // Function to ensure options have proper content, adding defaults if needed
  const getEnhancedOption = (option: ResolutionPathOption) => {
    const teamDefaults = getTeamsApplicationPathDefault(option.key);
    
    return {
      ...option,
      description: option.description || teamDefaults.description || `Best approach for resolving ${option.name} related issues`,
      detail: option.detail || teamDefaults.detail || `Recommended based on analysis of similar cases and our knowledge base.`
    };
  };

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
          {options.map((option) => {
            const enhancedOption = getEnhancedOption(option);
            return (
              <div 
                key={enhancedOption.key}
                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer h-full flex flex-col ${
                  selectedPath === enhancedOption.key 
                    ? 'border-[#0076CE] bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => onSelectPath(enhancedOption.key)}
              >
                <div className="flex items-start mb-auto">
                  <div className="text-2xl mr-3">{enhancedOption.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black mb-1">{enhancedOption.name}</h3>
                    <p className="text-gray-600 text-sm">{enhancedOption.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center mb-2">
                    <ThumbsUp size={16} className={`${getConfidenceColor(enhancedOption.confidence)} mr-2`} />
                    <span className={`text-sm ${getConfidenceColor(enhancedOption.confidence)}`}>
                      {enhancedOption.confidence}% Confidence
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Info size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{enhancedOption.sources} Sources</span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{enhancedOption.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ResolutionOptions;
