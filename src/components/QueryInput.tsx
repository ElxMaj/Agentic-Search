
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Loader2 } from 'lucide-react';

interface QueryInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto" id="query">
      <div className="text-center mb-6">
        <div className="chip mb-2">Interactive AI System</div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">What would you like to know?</h2>
        <p className="text-medium-gray max-w-xl mx-auto">
          Ask any support question and our AI will guide you through the most efficient resolution path.
        </p>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        className={`relative mt-8 glass-panel p-1.5 transition-all duration-300 ${
          isInputFocused ? 'shadow-medium ring-2 ring-primary/20' : ''
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center">
          <Search 
            size={18} 
            className={`ml-3 transition-colors ${
              isInputFocused ? 'text-deep-blue' : 'text-muted-foreground'
            }`} 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="e.g., How do I improve my software's performance?"
            className="flex-1 h-12 px-3 bg-transparent text-foreground focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className={`flex items-center justify-center h-12 w-12 mr-1 rounded-md transition-all ${
              query.trim() && !isLoading
                ? 'bg-deep-blue text-white hover:bg-deep-blue/90' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
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

      <motion.div 
        className="mt-4 text-sm text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Try: "What are the best practices for API optimization?" or "How to fix database connection issues?"
      </motion.div>
    </div>
  );
};

export default QueryInput;
