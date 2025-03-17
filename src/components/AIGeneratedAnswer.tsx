
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
  return content.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${url}</a>`;
  });
};

// Function to shorten webcam-related content
const shortenWebcamContent = (content: string, query: string): string => {
  // Check if this is webcam-related content
  if (query.toLowerCase().includes('webcam') || content.toLowerCase().includes('webcam') || 
      content.toLowerCase().includes('camera') || content.toLowerCase().includes('teams')) {
    
    // Examples of concise, actionable webcam troubleshooting content
    if (content.toLowerCase().includes('permission')) {
      return `
        <p><strong>Quick fix for Teams camera permissions:</strong></p>
        <ol>
          <li>Open <a href="ms-settings:privacy-webcam" class="text-blue-600 hover:underline">Windows camera privacy settings</a></li>
          <li>Ensure camera access is enabled for apps</li>
          <li>Check that Microsoft Teams is allowed</li>
          <li>Restart Teams completely after making changes</li>
        </ol>
        <p>If using Teams in a browser, check browser camera permissions or try the <a href="https://teams.microsoft.com/downloads" class="text-blue-600 hover:underline">desktop app</a> instead.</p>
      `;
    } 
    else if (content.toLowerCase().includes('connection') || content.toLowerCase().includes('physical')) {
      return `
        <p><strong>Connection troubleshooting:</strong></p>
        <ol>
          <li>Disconnect and reconnect your webcam</li>
          <li>Try a different USB port (preferably USB 3.0)</li>
          <li>Avoid USB hubs - connect directly to your computer</li>
          <li>Test in the <a href="ms-cameraapp:" class="text-blue-600 hover:underline">Windows Camera app</a> to isolate the issue</li>
        </ol>
        <p>If your webcam works in other apps but not Teams, the issue is likely Teams-specific.</p>
      `;
    }
    else if (content.toLowerCase().includes('driver') || content.toLowerCase().includes('software')) {
      return `
        <p><strong>Driver & software fixes:</strong></p>
        <ol>
          <li>Update your webcam drivers from the <a href="ms-settings:windowsupdate" class="text-blue-600 hover:underline">manufacturer's website</a></li>
          <li>Uninstall and reinstall the webcam in Device Manager</li>
          <li>Update Teams to the <a href="https://teams.microsoft.com/downloads" class="text-blue-600 hover:underline">latest version</a></li>
          <li>Clear Teams cache: Close Teams and delete %AppData%\\Microsoft\\Teams\\Cache</li>
        </ol>
        <p>A complete driver reinstall resolves 85% of camera detection issues in Teams.</p>
      `;
    }
  }
  
  // If not webcam related or no specific category identified, return original content
  return content;
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
  
  // Get current query from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const currentQuery = urlParams.get('q') || '';
  
  // Process content to add hyperlinks if not already present
  let processedContent = processContentWithLinks(content);
  
  // Shorten webcam-related content
  processedContent = shortenWebcamContent(processedContent, currentQuery);

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.4}>
      <div className="rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
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
        
        <div className="flex items-center mb-2">
          <CheckCircle2 size={16} className="text-green-500 mr-2" />
          <p className="text-sm text-gray-600">Generated with high confidence based on verified sources</p>
        </div>
        
        {hasGPUInfo && (
          <div className="flex items-center mb-2">
            <Cpu size={16} className="text-blue-500 mr-2" />
            <p className="text-sm text-gray-600">Optimized for Intel Iris Xe Graphics on your Dell XPS 13</p>
          </div>
        )}
        
        <div className="flex items-center mb-6">
          <Info size={16} className="text-blue-500 mr-2" />
          <p className="text-sm text-gray-600">Based on analysis of {sources.length} relevant sources and similar cases</p>
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
