
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Info, Cpu } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import SourcesList from './SourcesList';
import { Source } from '../data/mockData';

interface AIGeneratedAnswerProps {
  content: string;
  sources: Source[];
  isVisible: boolean;
}

// Function to make URLs clickable in the content
const processContentWithLinks = (content: string): string => {
  // This regex looks for URLs that aren't already wrapped in anchor tags
  const urlRegex = /(?<!<a[^>]*href=["'])https?:\/\/[^\s<>"']+/g;
  
  // Replace URLs with anchor tags
  let processedContent = content.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${url}</a>`;
  });
  
  // Make text more concise by shortening lengthy paragraphs
  // Replace long bullet points with more concise versions
  processedContent = processedContent
    // Make headings more impactful
    .replace(/<h3 class="text-lg font-medium mb-3">(.*?)<\/h3>/g, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
    // Shorten introductory paragraphs
    .replace(/<p class="mb-3">After analyzing your (.*?), I've identified (.*?)<\/p>/g, 
             '<p class="mb-2">Analysis of your $1 shows:</p>')
    .replace(/<p class="mb-3">Based on analysis of your (.*?), I've identified (.*?)<\/p>/g, 
             '<p class="mb-2">Analysis of your $1 reveals:</p>')
    // Make lists more compact
    .replace(/<ol class="list-decimal pl-5 mb-4 space-y-2">/g, 
             '<ol class="list-decimal pl-5 mb-3 space-y-1">')
    // Enhance link visibility
    .replace(/href="(.*?)"/g, 'href="$1" class="text-blue-600 font-medium hover:underline"');
  
  return processedContent;
};

const AIGeneratedAnswer: React.FC<AIGeneratedAnswerProps> = ({ 
  content,
  sources,
  isVisible
}) => {
  if (!isVisible || !content) {
    return null;
  }

  // Calculate overall confidence based on sources
  const averageConfidence = sources.length > 0 
    ? Math.round(sources.reduce((sum, source) => sum + source.confidence, 0) / sources.length) 
    : 0;
    
  // Check if content contains Intel Iris Xe Graphics
  const hasGPUInfo = content.includes("Intel Iris Xe Graphics");
  
  // Process content to add hyperlinks if not already present and make it more concise
  const processedContent = processContentWithLinks(content);

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.4}>
      <div className="rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Zap className="text-[#0076CE] mr-2" size={20} />
            <h2 className="text-lg font-semibold text-black">AI-Generated Answer</h2>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            averageConfidence >= 90 ? 'bg-green-100 text-green-800' :
            averageConfidence >= 80 ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {averageConfidence}% confidence
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center">
            <CheckCircle2 size={16} className="text-green-500 mr-1" />
            <p className="text-xs text-gray-600">Verified sources</p>
          </div>
          
          {hasGPUInfo && (
            <div className="flex items-center">
              <Cpu size={16} className="text-blue-500 mr-1" />
              <p className="text-xs text-gray-600">Optimized for Intel Iris Xe Graphics</p>
            </div>
          )}
          
          <div className="flex items-center">
            <Info size={16} className="text-blue-500 mr-1" />
            <p className="text-xs text-gray-600">{sources.length} sources analyzed</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div 
            className="text-black prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
        
        <SourcesList sources={sources} isVisible={true} />
      </div>
    </AnimatedTransition>
  );
};

export default AIGeneratedAnswer;
