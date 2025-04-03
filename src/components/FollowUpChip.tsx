
import React from 'react';
import { motion } from 'framer-motion';

interface FollowUpChipProps {
  text: string;
  onClick: () => void;
  delay?: number;
  isActive?: boolean;
}

const FollowUpChip: React.FC<FollowUpChipProps> = ({ 
  text, 
  onClick, 
  delay = 0,
  isActive = false
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`${
        isActive 
          ? "bg-blue-100 text-blue-800" 
          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
      } rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
    >
      {text}
    </motion.button>
  );
};

export default FollowUpChip;
