
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Source } from '../data/mockData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FoldableSourcesProps {
  sources: Source[];
}

const FoldableSources: React.FC<FoldableSourcesProps> = ({ sources }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mt-6 border-t border-gray-100 pt-4"
    >
      <CollapsibleTrigger className="flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors w-full">
        <div className="flex items-center">
          {isOpen ? (
            <ChevronUp size={16} className="mr-2" />
          ) : (
            <ChevronDown size={16} className="mr-2" />
          )}
          Sources used ({sources.length})
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sources.map((source, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                    className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{source.title}</h4>
                          
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock size={12} className="mr-1" />
                            <span>{source.date}</span>
                          </div>
                          
                          {source.metadata && (
                            <div className="text-xs text-gray-600 mt-1">{source.metadata}</div>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="Open source in new tab"
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                    
                    {source.excerpt && (
                      <p className="text-xs text-gray-700 mt-2 ml-6 line-clamp-2">{source.excerpt}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FoldableSources;
