
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, Cpu, HardDrive, Info, Settings, TrendingUp, Zap } from 'lucide-react';

interface FollowUpChipProps {
  text: string;
  onClick: () => void;
  delay?: number;
  icon?: string;
}

const FollowUpChip: React.FC<FollowUpChipProps> = ({ text, onClick, delay = 0, icon }) => {
  const getIcon = () => {
    switch(icon) {
      case 'settings':
        return <Settings size={14} className="mr-1" />;
      case 'cpu':
        return <Cpu size={14} className="mr-1" />;
      case 'info':
        return <Info size={14} className="mr-1" />;
      case 'zap':
        return <Zap size={14} className="mr-1" />;
      case 'check':
        return <CheckCircle2 size={14} className="mr-1" />;
      case 'trending':
        return <TrendingUp size={14} className="mr-1" />;
      case 'drive':
        return <HardDrive size={14} className="mr-1" />;
      case 'activity':
        return <Activity size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
    >
      {icon && getIcon()}
      {text}
    </motion.button>
  );
};

export default FollowUpChip;
