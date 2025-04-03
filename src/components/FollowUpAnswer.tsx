
import React from 'react';
import { motion } from 'framer-motion';
import { Source } from '@/data/mockData';
import SourcesList from './SourcesList';

interface FollowUpAnswerProps {
  content: string;
  sources?: Source[];
}

const FollowUpAnswer: React.FC<FollowUpAnswerProps> = ({ content, sources = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-6"
    >
      <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: content }} />
      
      {sources.length > 0 && (
        <div className="mt-4">
          <SourcesList sources={sources} />
        </div>
      )}
    </motion.div>
  );
};

export default FollowUpAnswer;
