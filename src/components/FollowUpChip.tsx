
import React from 'react';
import { motion } from 'framer-motion';

interface FollowUpChipProps {
  text: string;
  onClick: () => void;
  delay?: number;
  disabled?: boolean;
}

const FollowUpChip: React.FC<FollowUpChipProps> = ({ text, onClick, delay = 0, disabled = false }) => {
  // Skip rendering this specific chip
  if (text === "How can I check if my drivers are up to date?") {
    return null;
  }
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      disabled={disabled}
      className={`bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {text}
    </motion.button>
  );
};

export default FollowUpChip;
