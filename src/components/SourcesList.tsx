
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Source } from '../types';

interface SourcesListProps {
  sources: Source[];
  isVisible: boolean;
}

const SourcesList: React.FC<SourcesListProps> = ({ sources, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible || !sources || sources.length === 0) {
    return null;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6"
    >
      <button 
        onClick={toggleExpanded}
        className="flex items-center text-gray-700 font-medium hover:text-blue-600 focus:outline-none transition-colors mb-2"
      >
        <span>Sources used ({sources.length})</span>
        {isExpanded ? (
          <ChevronUp size={18} className="ml-2" />
        ) : (
          <ChevronDown size={18} className="ml-2" />
        )}
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {sources.map((source, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index * 0.05) }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start mb-2">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <h4 className="font-medium text-black">{source.title}</h4>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2 ml-6">
                    <Clock size={14} className="mr-1" />
                    <span>{source.date}</span>
                  </div>
                  
                  {source.excerpt && (
                    <p className="text-sm text-gray-700 mt-2 ml-6">{source.excerpt}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SourcesList;
