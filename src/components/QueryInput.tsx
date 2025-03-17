
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Loader2, X, Battery, Wifi, Monitor, Activity, Camera } from 'lucide-react';

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

  const handleBatteryDrainClick = () => {
    const batteryQuery = "Dell battery draining too fast";
    setQuery(batteryQuery);
    onSearch(batteryQuery);
    setHasSearched(true);
  };

  const handleWifiUnstableClick = () => {
    const wifiQuery = "Wifi unstable on my laptop";
    setQuery(wifiQuery);
    onSearch(wifiQuery);
    setHasSearched(true);
  };
  
  const handleDellGraphicsClick = () => {
    const graphicsQuery = "Dell graphics performance issues";
    setQuery(graphicsQuery);
    onSearch(graphicsQuery);
    setHasSearched(true);
  };
  
  const handleSlowComputerClick = () => {
    const slowQuery = "My computer is slow and unresponsive";
    setQuery(slowQuery);
    onSearch(slowQuery);
    setHasSearched(true);
  };
  
  const handleWebcamIssueClick = () => {
    const webcamQuery = "Webcam not working in Teams";
    setQuery(webcamQuery);
    onSearch(webcamQuery);
    setHasSearched(true);
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

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <motion.div 
          className="flex flex-wrap gap-2 justify-center"
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
              {suggestion === "Troubleshoot slow application loading" ? "My computer is slow" : suggestion}
            </button>
          ))}
        </motion.div>
        
        {/* Dell Battery Issue Button */}
        <motion.button
          onClick={handleBatteryDrainClick}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-[#F0F7E8] hover:bg-[#E3EDD8] text-[#538234] transition-colors"
          disabled={isLoading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Battery size={14} className="text-[#538234]" />
          Dell battery drain
        </motion.button>
        
        {/* Wifi Unstable Button */}
        <motion.button
          onClick={handleWifiUnstableClick}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-[#EEF1FB] hover:bg-[#DFE3F7] text-[#445bc5] transition-colors"
          disabled={isLoading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Wifi size={14} className="text-[#445bc5]" />
          Wifi unstable
        </motion.button>
        
        {/* Dell Graphics Button */}
        <motion.button
          onClick={handleDellGraphicsClick}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-[#E6F1F8] hover:bg-[#D1E4F1] text-[#0076CE] transition-colors"
          disabled={isLoading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Monitor size={14} className="text-[#0076CE]" />
          Dell graphics issues
        </motion.button>
        
        {/* Slow Computer Button */}
        <motion.button
          onClick={handleSlowComputerClick}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#d97706] transition-colors"
          disabled={isLoading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Activity size={14} className="text-[#d97706]" />
          Slow computer
        </motion.button>
        
        {/* Webcam Issue Button */}
        <motion.button
          onClick={handleWebcamIssueClick}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-[#D1FAE5] hover:bg-[#A7F3D0] text-[#10b981] transition-colors"
          disabled={isLoading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Camera size={14} className="text-[#10b981]" />
          Webcam issues
        </motion.button>
      </div>
    </div>
  );
};

export default QueryInput;
