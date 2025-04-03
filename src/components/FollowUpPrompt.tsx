
import React from 'react';
import { motion } from 'framer-motion';
import FollowUpChip from './FollowUpChip';
import AnimatedTransition from './AnimatedTransition';

interface FollowUpPromptProps {
  followUps: string[];
  onFollowUpClick: (text: string) => void;
  isVisible: boolean;
  selectedFollowUp?: string | null;
}

const FollowUpPrompt: React.FC<FollowUpPromptProps> = ({ 
  followUps, 
  onFollowUpClick, 
  isVisible,
  selectedFollowUp 
}) => {
  if (!isVisible || followUps.length === 0) {
    return null;
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.6}>
      <div className="rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-lg font-semibold text-black mb-4">Follow-up questions</h2>
        <div className="flex flex-wrap gap-3">
          {followUps.map((text, index) => (
            <FollowUpChip 
              key={index} 
              text={text} 
              onClick={() => onFollowUpClick(text)} 
              delay={0.1 * index}
              isActive={selectedFollowUp === text}
            />
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default FollowUpPrompt;
