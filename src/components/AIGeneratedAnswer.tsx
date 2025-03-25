
import React from 'react';
import { motion } from 'framer-motion';
import { Source } from '../data/mockData';
import FoldableSources from './FoldableSources';
import FollowUpPrompt from './FollowUpPrompt';

interface AIGeneratedAnswerProps {
  content: string;
  sources: Source[];
  isVisible: boolean;
  followUpSuggestions?: string[];
  onFollowUpSubmit?: (query: string) => void;
}

const AIGeneratedAnswer: React.FC<AIGeneratedAnswerProps> = ({ 
  content, 
  sources, 
  isVisible,
  followUpSuggestions = [],
  onFollowUpSubmit
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-6"
    >
      <div 
        className="prose prose-sm prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <FoldableSources sources={sources} />
      
      {onFollowUpSubmit && (
        <FollowUpPrompt 
          onSubmit={onFollowUpSubmit} 
          suggestions={followUpSuggestions}
        />
      )}
    </motion.div>
  );
};

export default AIGeneratedAnswer;
