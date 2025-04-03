
import React from 'react';
import { motion } from 'framer-motion';
import { FollowUpAnswer as FollowUpAnswerType } from '../data/mockData';
import { Zap, CheckCircle2, Info } from 'lucide-react';
import SourcesList from './SourcesList';
import AnimatedTransition from './AnimatedTransition';

interface FollowUpAnswerProps {
  answer: FollowUpAnswerType;
  isVisible: boolean;
}

const FollowUpAnswer: React.FC<FollowUpAnswerProps> = ({ answer, isVisible }) => {
  if (!isVisible || !answer) {
    return null;
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.4}>
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{answer.question}</h2>
        <p className="text-sm text-gray-600 mb-4">Because you asked previously: "{answer.relatedToQuery}"</p>
      </div>
      
      <div className="rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Zap className="text-[#0076CE] mr-2" size={20} />
            <h2 className="text-lg font-semibold text-black">AI-Generated Answer</h2>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            answer.confidence >= 90 ? 'bg-green-100 text-green-800' :
            answer.confidence >= 80 ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {answer.confidence}% confidence
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          <CheckCircle2 size={16} className="text-green-500 mr-2" />
          <p className="text-sm text-gray-600">Generated with high confidence based on verified sources</p>
        </div>
        
        <div className="flex items-center mb-6">
          <Info size={16} className="text-blue-500 mr-2" />
          <p className="text-sm text-gray-600">Based on analysis of {answer.sources.length} relevant sources and similar cases</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div 
            className="text-black prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: answer.content }}
          />
        </div>
        
        <SourcesList sources={answer.sources} isVisible={true} />
      </div>
    </AnimatedTransition>
  );
};

export default FollowUpAnswer;
