
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Info } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import SourcesList from './SourcesList';
import { Source } from '../data/mockData';

interface AIGeneratedAnswerProps {
  content: string;
  sources: Source[];
  isVisible: boolean;
}

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
        
        <div className="flex items-center mb-6">
          <Info size={16} className="text-blue-500 mr-2" />
          <p className="text-sm text-gray-600">Based on analysis of {sources.length} relevant sources and similar cases</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="text-black prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content || `
            <h3>Teams Application Issues with Webcam During Calls</h3>
            <p>Based on the analysis of your issue, the most likely cause is a <strong>Teams application cache problem</strong>. Microsoft Teams stores configuration data that can become corrupted over time, especially after updates or when switching between different webcam devices.</p>
            
            <p>Here's a step-by-step solution that resolves this issue in 83% of similar cases:</p>
            
            <ol>
              <li><strong>Close Microsoft Teams completely</strong>: Make sure to exit the application from the system tray (right-click the Teams icon and select "Quit").</li>
              <li><strong>Clear the Teams cache</strong>: 
                <ul>
                  <li>On Windows: Press Win+R, type <code>%appdata%\\Microsoft\\Teams</code> and delete the contents of the following folders: <code>Cache</code>, <code>blob_storage</code>, <code>databases</code>, <code>GPUCache</code>, <code>IndexedDB</code>, <code>Local Storage</code>, and <code>tmp</code>.</li>
                  <li>On Mac: Go to <code>~/Library/Application Support/Microsoft/Teams</code> and delete the same folders.</li>
                </ul>
              </li>
              <li><strong>Restart your computer</strong>: This ensures all Teams processes are terminated and system resources are refreshed.</li>
              <li><strong>Launch Teams and test your camera</strong>: Open Teams and check your camera settings before joining a call.</li>
            </ol>
            
            <p>If the issue persists after clearing the cache, there's a strong possibility (72% likelihood based on similar cases) that it's related to a conflict with another application or a recent Windows update. In this case, I recommend:</p>
            
            <ul>
              <li>Checking for Teams updates - the latest version (1.5.00.11163+) includes significant webcam compatibility improvements</li>
              <li>Temporarily disabling other video applications that might be accessing your camera</li>
              <li>Verifying Windows camera privacy settings are correctly configured for Teams</li>
            </ul>
            
            <p>Would you like me to provide more specific instructions for any of these additional troubleshooting steps?</p>
          `}} />
        </div>
        
        <SourcesList sources={sources} isVisible={true} />
      </div>
    </AnimatedTransition>
  );
};

export default AIGeneratedAnswer;
