
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Loader2 } from 'lucide-react';

interface QueryInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  suggestedQueries?: string[];
}

const QueryInput: React.FC<QueryInputProps> = ({ 
  onSearch, 
  isLoading = false,
  suggestedQueries = []
}) => {
  const [query, setQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  // Get a random example query for the placeholder
  const getRandomPlaceholder = () => {
    if (suggestedQueries.length > 0) {
      const randomIndex = Math.floor(Math.random() * suggestedQueries.length);
      return `e.g., ${suggestedQueries[randomIndex]}`;
    }
    return "e.g., How do I improve my software's performance?";
  };

  return (
    <div className="w-full max-w-5xl mx-auto" id="query">
      <motion.form 
        onSubmit={handleSubmit}
        className={`relative mt-8 glass-panel p-1.5 transition-all duration-300 ${
          isInputFocused ? 'shadow-medium ring-2 ring-[#0076CE]/20' : ''
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center">
          <Search 
            size={18} 
            className={`ml-3 transition-colors ${
              isInputFocused ? 'text-[#0076CE]' : 'text-gray-500'
            }`} 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder={getRandomPlaceholder()}
            className="flex-1 h-12 px-3 bg-transparent text-black focus:outline-none text-center"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className={`flex items-center justify-center h-12 w-12 mr-1 rounded-md transition-all ${
              query.trim() && !isLoading
                ? 'bg-[#0076CE] text-white hover:bg-[#005DA6]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Search"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ArrowRight size={18} />
            )}
          </button>
        </div>
      </motion.form>

      {suggestedQueries.length > 0 && (
        <motion.div 
          className="mt-4 flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {suggestedQueries.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm px-3 py-1.5 rounded-full bg-[#E6F1F8] hover:bg-[#D1E4F1] text-[#0076CE] transition-colors"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default QueryInput;
