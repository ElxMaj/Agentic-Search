
import React from 'react';
import { motion } from 'framer-motion';
import { ConversationItem } from '../types';

interface ConversationThreadProps {
  items: ConversationItem[];
  onItemClick: (itemId: string) => void;
}

const ConversationThread: React.FC<ConversationThreadProps> = ({ items, onItemClick }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-8 space-y-4"
    >
      {items.length > 1 && (
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-md font-medium text-gray-700">Previous Questions</h3>
        </div>
      )}
      
      <div className="space-y-3">
        {items.filter(item => !item.isActive).map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg cursor-pointer border ${
              item.isActive ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => onItemClick(item.id)}
          >
            <p className="font-medium text-gray-800 truncate">{item.query}</p>
            <p className="text-sm text-gray-500 mt-1 truncate" 
              dangerouslySetInnerHTML={{ 
                __html: item.answer.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' 
              }} 
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConversationThread;
