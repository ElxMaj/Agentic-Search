
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, ThumbsUp, Info, ExternalLink, BatteryFull } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

export interface ResolutionPathOption {
  key: string;
  name: string;
  icon: string;
  description: string;
  confidence: number;
  sources: number;
  detail: string;
  links?: {
    text: string;
    url: string;
  }[];
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

  // Get query from URL to check if it's a battery-related query
  const urlParams = new URLSearchParams(window.location.search);
  const currentQuery = urlParams.get('q') || '';
  const isBatteryQuery = currentQuery.toLowerCase().includes('battery') && 
                         (currentQuery.toLowerCase().includes('drain') || 
                          currentQuery.toLowerCase().includes('life') || 
                          currentQuery.toLowerCase().includes('dying'));

  // Custom options for Dell battery drain scenario
  const batteryDrainOptions = [
    {
      key: "power-settings",
      name: "Power Settings Optimization",
      icon: "⚡",
      description: "Optimize Dell power settings and Windows power management for maximum battery efficiency.",
      confidence: 96,
      sources: 8,
      detail: "Configure Dell Power Manager and Windows power settings for optimal battery life.",
      links: [
        {
          text: "Dell Power Manager Guide",
          url: "https://www.dell.com/support/kbdoc/en-us/000131081/power-manager-power-settings-in-windows"
        }
      ]
    },
    {
      key: "background-apps",
      name: "Background Application Management",
      icon: "🔍",
      description: "Identify and control battery-draining background processes and applications.",
      confidence: 91,
      sources: 6,
      detail: "Manage startup apps and background processes to reduce unnecessary battery drain.",
      links: [
        {
          text: "Battery Usage by App",
          url: "ms-settings:battery"
        }
      ]
    },
    {
      key: "hardware-calibration",
      name: "Battery Maintenance",
      icon: "🔋",
      description: "Dell-specific battery calibration and hardware optimization techniques.",
      confidence: 88,
      sources: 5,
      detail: "Proper battery maintenance and calibration procedures for Dell laptops.",
      links: [
        {
          text: "Dell Battery Calibration Guide",
          url: "https://www.dell.com/support/kbdoc/en-us/000130881/resetting-the-battery-on-a-dell-laptop"
        }
      ]
    }
  ];

  // Function to determine color based on confidence level
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 75) return "text-blue-500";
    if (confidence >= 60) return "text-amber-500";
    return "text-orange-500";
  };

  // Use battery drain options if the query is battery-related
  const displayOptions = isBatteryQuery ? batteryDrainOptions : options;

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8">
      <div className="rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <MessageCircleQuestion className="text-[#0076CE] mr-2" size={20} />
          <h2 className="text-lg font-semibold text-black">Solution Approaches</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          {isBatteryQuery 
            ? "Here are the most effective approaches to extend your Dell laptop's battery life."
            : "Here are the most effective approaches to resolve your issue, based on analysis of similar cases."}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayOptions.map((option) => (
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
                
                <div className="flex items-center mb-2">
                  <Info size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{option.sources} Sources</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{option.detail}</p>
                
                {option.links && option.links.length > 0 && (
                  <div className="mt-2">
                    {option.links.map((link, index) => (
                      <a 
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} className="mr-1" />
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ResolutionOptions;
