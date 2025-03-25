
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface FollowUpPromptProps {
  suggestions: string[];
  onFollowUpSubmit: (query: string) => void;
}

const FollowUpPrompt: React.FC<FollowUpPromptProps> = ({ suggestions, onFollowUpSubmit }) => {
  const [followUpQuery, setFollowUpQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpQuery.trim()) {
      onFollowUpSubmit(followUpQuery);
      setFollowUpQuery('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onFollowUpSubmit(suggestion);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8 border-t border-gray-200 pt-6"
    >
      <h3 className="text-md font-medium text-gray-700 mb-3">
        Still need help? Ask a follow-up or try one of these suggestions:
      </h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={followUpQuery}
            onChange={(e) => setFollowUpQuery(e.target.value)}
            placeholder="Ask a follow-up..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 p-1 rounded-full hover:bg-blue-50"
            disabled={!followUpQuery.trim()}
          >
            <MessageSquare size={20} />
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FollowUpPrompt;
