
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Source } from '../data/mockData';

interface FoldableSourcesProps {
  sources: Source[];
}

const FoldableSources: React.FC<FoldableSourcesProps> = ({ sources }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span className="font-medium">Sources used ({sources.length})</span>
        {isExpanded ? (
          <ChevronUp size={16} className="ml-1" />
        ) : (
          <ChevronDown size={16} className="ml-1" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {sources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{source.title}</h4>
                  <ExternalLink size={14} className="text-blue-500 flex-shrink-0" />
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                  <span>{source.metadata || 'Article'}</span>
                  <span>{source.date}</span>
                </div>
                {source.excerpt && (
                  <p className="text-xs text-gray-700 mt-2 line-clamp-2">{source.excerpt}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoldableSources;
