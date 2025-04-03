
import React from 'react';
import FollowUpChip from './FollowUpChip';
import { motion } from 'framer-motion';

interface FollowUpPromptProps {
  parentQuery: string;
  onSelectFollowUp: (text: string) => void;
}

const FollowUpPrompt: React.FC<FollowUpPromptProps> = ({ parentQuery, onSelectFollowUp }) => {
  // Generate follow-up suggestions based on the parent query
  const getFollowUpSuggestions = (query: string): string[] => {
    if (query.toLowerCase().includes('dell') && query.toLowerCase().includes('graphics')) {
      return [
        "How do I update my graphics drivers?",
        "What graphics card is compatible with my Dell?",
        "Dell XPS graphics performance tips"
      ];
    } else if (query.toLowerCase().includes('logitech') && query.toLowerCase().includes('webcam')) {
      return [
        "Logitech webcam not detected",
        "How to improve Logitech webcam quality",
        "Best Logitech webcam settings for Zoom"
      ];
    }
    
    // Default suggestions
    return [
      "How to troubleshoot common PC issues",
      "Recommended hardware upgrades",
      "Software optimization tips"
    ];
  };

  const suggestions = getFollowUpSuggestions(parentQuery);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-6"
    >
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-700">Follow-up questions:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <FollowUpChip
            key={index}
            text={suggestion}
            onClick={() => onSelectFollowUp(suggestion)}
            delay={0.2 + (index * 0.1)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FollowUpPrompt;
