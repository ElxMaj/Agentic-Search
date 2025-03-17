
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Loader2, X, Laptop, Clock, Camera, Wifi, Battery } from 'lucide-react';

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
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
      setHasSearched(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Replace "Troubleshoot slow application loading" with "My computer is slow" if it's that suggestion
    const updatedSuggestion = suggestion === "Troubleshoot slow application loading" 
      ? "My computer is slow" 
      : suggestion;
      
    setQuery(updatedSuggestion);
    onSearch(updatedSuggestion);
    setHasSearched(true);
  };

  const handleClearSearch = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event propagation
    
    // Reset the component state
    setQuery('');
    setHasSearched(false);
    
    // Call onSearch with empty string to reset the application state
    onSearch('');
  };

  // Get a random example query for the placeholder
  const getRandomPlaceholder = () => {
    if (suggestedQueries.length > 0) {
      const randomIndex = Math.floor(Math.random() * suggestedQueries.length);
      return `e.g., ${suggestedQueries[randomIndex]}`;
    }
    return "e.g., How do I improve my software's performance?";
  };

  // Map of queries to their icon and background color
  const suggestionStyles: Record<string, { icon: React.ReactNode; bgColor: string; textColor: string }> = {
    "Dell graphics": { 
      icon: <Laptop size={16} />, 
      bgColor: "bg-orange-100", 
      textColor: "text-orange-800" 
    },
    "Dell battery drain": { 
      icon: <Battery size={16} />, 
      bgColor: "bg-green-100", 
      textColor: "text-green-800" 
    },
    "WiFi unstable": { 
      icon: <Wifi size={16} />, 
      bgColor: "bg-blue-100", 
      textColor: "text-blue-800" 
    },
    "My computer is slow": { 
      icon: <Clock size={16} />, 
      bgColor: "bg-yellow-100", 
      textColor: "text-amber-800" 
    },
    "Webcam issue": { 
      icon: <Camera size={16} />, 
      bgColor: "bg-red-100", 
      textColor: "text-red-800" 
    }
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
            className="flex-1 h-12 px-3 bg-transparent text-black focus:outline-none"
            disabled={isLoading}
          />
          {hasSearched && query.trim() && !isLoading ? (
            <button
              type="button" 
              onClick={handleClearSearch}
              className="flex items-center justify-center h-12 w-12 mr-1 rounded-md bg-[#D3E4FD] text-[#0076CE] hover:bg-[#B2D0F9] transition-all"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          ) : (
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
          )}
        </div>
      </motion.form>

      {suggestedQueries.length > 0 && (
        <motion.div 
          className="mt-4 flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {suggestedQueries.slice(0, 5).map((suggestion, index) => {
            const displayText = suggestion === "Troubleshoot slow application loading" ? "My computer is slow" : suggestion;
            const style = suggestionStyles[displayText] || { 
              icon: <Search size={16} />, 
              bgColor: "bg-gray-100", 
              textColor: "text-gray-800" 
            };
            
            return (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`text-sm px-4 py-2 rounded-full ${style.bgColor} ${style.textColor} font-medium hover:brightness-95 transition-all flex items-center gap-1.5`}
                disabled={isLoading}
              >
                {style.icon}
                {displayText}
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default QueryInput;
