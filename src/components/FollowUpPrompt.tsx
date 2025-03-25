
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

interface FollowUpPromptProps {
  onSubmit: (query: string) => void;
  suggestions: string[];
}

const FollowUpPrompt: React.FC<FollowUpPromptProps> = ({ onSubmit, suggestions }) => {
  const [followUpQuery, setFollowUpQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpQuery.trim()) {
      onSubmit(followUpQuery);
      setFollowUpQuery('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSubmit(suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-6 mb-8"
    >
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Still need help? Ask a follow-up or try one of these suggestions:
      </h3>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className={`flex items-center border ${
          isInputFocused ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-300'
        } rounded-md transition-all`}>
          <Search size={16} className="ml-3 text-gray-400" />
          <input
            type="text"
            value={followUpQuery}
            onChange={(e) => setFollowUpQuery(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Ask a follow-up..."
            className="flex-1 py-2 px-2 bg-transparent text-black focus:outline-none text-sm"
          />
          <button
            type="submit"
            disabled={!followUpQuery.trim()}
            className={`flex items-center justify-center h-8 w-8 mr-1 rounded-md transition-all ${
              followUpQuery.trim()
                ? 'bg-[#0076CE] text-white hover:bg-[#005DA6]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Submit follow-up question"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FollowUpPrompt;
