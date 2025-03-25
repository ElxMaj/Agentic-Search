
import React from 'react';
import { motion } from 'framer-motion';
import { ConversationItem } from '../types';

export interface ConversationThreadProps {
  items: ConversationItem[];
  activeItemId: string;
  onItemClick: (id: string) => void;
}

const ConversationThread: React.FC<ConversationThreadProps> = ({ items, activeItemId, onItemClick }) => {
  if (!items || items.length <= 1) {
    return null;
  }

  // Exclude the active item, as it's displayed in the main content area
  const inactiveItems = items.filter(item => !item.isActive);
  
  if (inactiveItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8 border-b border-gray-200 pb-6"
    >
      <h3 className="text-sm font-medium text-gray-700 mb-3">Previous questions:</h3>
      <div className="space-y-2">
        {inactiveItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => onItemClick(item.id)}
          >
            <p className="text-sm font-medium">{item.query}</p>
            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
              {typeof item.answer === 'string' 
                ? item.answer.replace(/<[^>]*>/g, '') // Strip HTML if answer is string
                : 'View answer'}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConversationThread;
