
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Loader2, X, Laptop, Battery, Wifi, Clock, Camera } from 'lucide-react';

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

  // Get the appropriate icon and background color for a suggestion
  const getSuggestionStyle = (suggestion: string) => {
    let icon = <Laptop size={16} />;
    let bgColor = "bg-[#E6F1F8]"; // Default color
    let textColor = "text-[#0076CE]"; // Default text color
    
    if (suggestion.toLowerCase().includes("graphics") || suggestion === "How to improve Dell graphics performance?") {
      icon = <Laptop size={16} />;
      bgColor = "bg-[#E6F1F8]";
      textColor = "text-[#0076CE]";
    } else if (suggestion.toLowerCase().includes("battery") || suggestion === "Why is my Dell battery draining fast?") {
      icon = <Battery size={16} />;
      bgColor = "bg-[#E5DEFF]";
      textColor = "text-[#6941C6]";
    } else if (suggestion.toLowerCase().includes("wifi") || suggestion === "My WiFi keeps disconnecting") {
      icon = <Wifi size={16} />;
      bgColor = "bg-[#FDE1D3]";
      textColor = "text-[#C4320A]";
    } else if (suggestion.toLowerCase().includes("slow") || suggestion === "Troubleshoot slow application loading" || suggestion === "My computer is slow") {
      icon = <Clock size={16} />;
      bgColor = "bg-[#FEF7CD]";
      textColor = "text-[#854A0E]";
    } else if (suggestion.toLowerCase().includes("webcam") || suggestion === "Webcam not working after update") {
      icon = <Camera size={16} />;
      bgColor = "bg-[#F2FCE2]";
      textColor = "text-[#3F621A]";
    }
    
    return { icon, bgColor, textColor };
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
          {suggestedQueries.slice(0, 3).map((suggestion, index) => {
            const { icon, bgColor, textColor } = getSuggestionStyle(suggestion);
            const displayText = suggestion === "Troubleshoot slow application loading" ? "My computer is slow" : suggestion;
            
            return (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${bgColor} ${textColor} hover:opacity-90 transition-colors font-medium`}
                disabled={isLoading}
              >
                {icon}
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
