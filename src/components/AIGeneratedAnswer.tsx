
import React from 'react';
import { motion } from 'framer-motion';
import SourcesList from './SourcesList';
import { Source } from '../types';

interface AIGeneratedAnswerProps {
  content: string;
  sources: Source[];
  isVisible: boolean;
}

const AIGeneratedAnswer: React.FC<AIGeneratedAnswerProps> = ({ content, sources, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg p-6 mt-5 w-full shadow-sm"
    >
      <div 
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <SourcesList sources={sources} isVisible={isVisible} />
    </motion.div>
  );
};

export default AIGeneratedAnswer;
