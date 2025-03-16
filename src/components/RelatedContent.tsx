
import React from 'react';
import { motion } from 'framer-motion';
import { File, PlayCircle, Link2, ArrowRight } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

export interface RelatedContentItem {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link';
  description: string;
  url: string;
  date?: string;
  source?: string;
}

interface RelatedContentProps {
  items: RelatedContentItem[];
  isVisible: boolean;
}

const RelatedContent: React.FC<RelatedContentProps> = ({ items, isVisible }) => {
  if (!isVisible || items.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <File size={20} className="text-blue-500" />;
      case 'video':
        return <PlayCircle size={20} className="text-red-500" />;
      case 'link':
        return <Link2 size={20} className="text-purple-500" />;
      default:
        return <File size={20} className="text-gray-500" />;
    }
  };

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.5}>
      <div className="rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-black mb-4">Related Content</h2>
        <p className="text-gray-600 mb-6">Explore these resources to learn more about this topic</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
              onClick={() => window.open(item.url, '_blank')}
            >
              <div className="flex items-center mb-3">
                {getIcon(item.type)}
                <span className="ml-2 text-xs uppercase font-semibold text-gray-500">
                  {item.type}
                </span>
              </div>

              <h3 className="font-medium text-black mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              
              {item.source && (
                <div className="text-xs text-gray-500 mb-3">
                  Source: {item.source}
                </div>
              )}
              
              <div className="flex items-center text-blue-600 text-sm font-medium">
                View resource <ArrowRight size={14} className="ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default RelatedContent;
