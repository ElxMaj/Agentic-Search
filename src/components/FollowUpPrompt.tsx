
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input } from './ui/input';
import FollowUpChip from './FollowUpChip';

interface FollowUpPromptProps {
  onFollowUpSubmit: (followUp: string) => void;
  currentQuery: string;
  isVisible: boolean;
}

const FollowUpPrompt: React.FC<FollowUpPromptProps> = ({ 
  onFollowUpSubmit, 
  currentQuery,
  isVisible 
}) => {
  const [followUpText, setFollowUpText] = useState('');

  if (!isVisible) return null;

  // Generate follow-up suggestions based on the current query
  const getSuggestions = (): string[] => {
    const defaultSuggestions = [
      "What else should I check?",
      "How do I fix this if that didn't work?",
      "Is there a deeper issue?"
    ];

    if (currentQuery.toLowerCase().includes('dell graphics')) {
      return [
        "How can I check if my drivers are up to date?",
        "What are the minimum requirements for gaming?",
        "Will these changes affect battery life?"
      ];
    } else if (currentQuery.toLowerCase().includes('webcam problem')) {
      return [
        "How do I update my webcam drivers?",
        "Could my antivirus be blocking it?",
        "Will this fix work for all video calls?"
      ];
    } else if (currentQuery.toLowerCase().includes('computer is slow')) {
      return [
        "What tools can I use to monitor performance?",
        "How often should I perform these fixes?",
        "Could malware be causing my slow performance?"
      ];
    }

    return defaultSuggestions;
  };

  const suggestions = getSuggestions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpText.trim()) {
      onFollowUpSubmit(followUpText.trim());
      setFollowUpText('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onFollowUpSubmit(suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50"
    >
      <h3 className="text-gray-700 font-medium mb-4">
        Still need help? Ask a follow-up or try one of these suggestions:
      </h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <Input
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            placeholder="Ask a follow-up..."
            className="rounded-r-none focus-visible:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md transition-colors"
            aria-label="Submit follow-up question"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <FollowUpChip
            key={index}
            text={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            delay={0.1 + (index * 0.1)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FollowUpPrompt;
