
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Source } from '../data/mockData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SourcesListProps {
  sources: Source[];
  isVisible: boolean;
}

const SourcesList: React.FC<SourcesListProps> = ({ sources, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isVisible || !sources || sources.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6"
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-gray-700 font-medium p-2 rounded-md hover:bg-gray-100 transition-colors">
          <span>Sources used ({sources.length})</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="border border-gray-200 rounded-lg p-4 relative"
              >
                <div className="flex items-start mb-2">
                  <CheckCircle2 size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <h4 className="font-medium text-black">{source.title}</h4>
                  <a href="#" className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors" aria-label="Open external link">
                    <ExternalLink size={16} />
                  </a>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-2 ml-6">
                  <span className="mr-2 text-xs bg-gray-100 px-1.5 py-0.5 rounded">{source.type}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{source.date}</span>
                </div>
                
                {source.excerpt && (
                  <p className="text-sm text-gray-700 mt-2 ml-6">{source.excerpt}</p>
                )}
              </motion.div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default SourcesList;
