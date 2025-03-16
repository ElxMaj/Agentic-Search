
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';
import { Source } from '../data/mockData';

interface SourcesListProps {
  sources: Source[];
  isVisible: boolean;
}

const SourcesList: React.FC<SourcesListProps> = ({ sources, isVisible }) => {
  if (!isVisible || !sources || sources.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6"
    >
      <h3 className="text-gray-700 font-medium mb-4">Sources Used:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
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
  );
};

export default SourcesList;
