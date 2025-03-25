
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Clock, HelpCircle, Zap, LifeBuoy, Wrench, Shield, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FollowUpPromptProps {
  onFollowUpSubmit: (query: string) => void;
  suggestedFollowUps?: string[];
  isLoading?: boolean;
}

const FollowUpPrompt: React.FC<FollowUpPromptProps> = ({
  onFollowUpSubmit,
  suggestedFollowUps = [
    "What else should I check?",
    "How do I fix this if that didn't work?", 
    "Is there a deeper issue?"
  ],
  isLoading = false
}) => {
  const [followUpQuery, setFollowUpQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpQuery.trim() && !isLoading) {
      onFollowUpSubmit(followUpQuery);
      setFollowUpQuery('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      onFollowUpSubmit(suggestion);
    }
  };

  // Get the appropriate icon and background color for a suggestion
  const getSuggestionStyle = (suggestion: string, index: number) => {
    const styles = [
      { icon: <HelpCircle size={16} />, bgColor: "bg-[#E6F1F8]", textColor: "text-[#0076CE]" },
      { icon: <Wrench size={16} />, bgColor: "bg-[#E5DEFF]", textColor: "text-[#6941C6]" },
      { icon: <RefreshCw size={16} />, bgColor: "bg-[#FDE1D3]", textColor: "text-[#C4320A]" }
    ];
    
    return styles[index % styles.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 mb-10 border-t border-gray-200 pt-6"
    >
      <div className="flex items-center mb-4">
        <LifeBuoy size={18} className="text-[#0076CE] mr-2" />
        <h3 className="text-gray-700 font-medium">Still need help? Ask a follow-up or try one of these suggestions:</h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={followUpQuery}
              onChange={(e) => setFollowUpQuery(e.target.value)}
              placeholder="Ask a follow-up..."
              className="pr-10 focus-visible:ring-[#0076CE] focus-visible:ring-offset-0"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!followUpQuery.trim() || isLoading}
              className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-7 w-7 rounded-md transition-colors ${
                followUpQuery.trim() && !isLoading
                  ? 'text-[#0076CE] hover:bg-[#0076CE]/10'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Submit follow-up"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Clock size={16} />
                </motion.div>
              ) : (
                <ArrowRight size={16} />
              )}
            </button>
          </div>
        </div>
      </form>

      {suggestedFollowUps.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {suggestedFollowUps.map((suggestion, index) => {
            const { icon, bgColor, textColor } = getSuggestionStyle(suggestion, index);
            
            return (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${bgColor} ${textColor} hover:opacity-90 transition-colors`}
                disabled={isLoading}
              >
                {icon}
                {suggestion}
              </button>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FollowUpPrompt;
