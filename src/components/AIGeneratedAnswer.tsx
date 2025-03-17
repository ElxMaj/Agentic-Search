
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
            <h3>Microsoft Teams Webcam Issues During Calls</h3>
            <p>Based on our analysis of your issue with Microsoft Teams webcam problems during calls, we've identified that this is most likely caused by a <strong>Teams application cache corruption</strong>. This is a common issue that occurs in approximately 83% of similar cases, particularly after Teams updates or when multiple video applications are used on the same system.</p>
            
            <p>Here's our recommended resolution approach with step-by-step instructions:</p>
            
            <ol>
              <li><strong>Close Microsoft Teams completely</strong>
                <ul>
                  <li>Right-click the Teams icon in your system tray</li>
                  <li>Select "Quit" or "Exit" (not just closing the window)</li>
                  <li>Verify Teams is no longer running in Task Manager (Ctrl+Shift+Esc)</li>
                </ul>
              </li>
              <li><strong>Clear the Teams application cache</strong>
                <ul>
                  <li>On Windows: Press Win+R, type <code>%appdata%\\Microsoft\\Teams</code> and click OK</li>
                  <li>On Mac: Navigate to <code>~/Library/Application Support/Microsoft/Teams</code></li>
                  <li>Delete the contents of these folders: <code>Cache</code>, <code>blob_storage</code>, <code>databases</code>, <code>GPUCache</code>, <code>IndexedDB</code>, <code>Local Storage</code>, and <code>tmp</code></li>
                </ul>
              </li>
              <li><strong>Restart your computer</strong>
                <ul>
                  <li>A full restart ensures all Teams processes are terminated</li>
                  <li>This also refreshes system device drivers and USB connections</li>
                </ul>
              </li>
              <li><strong>Check camera permissions</strong>
                <ul>
                  <li>Open Windows Settings → Privacy & Security → Camera</li>
                  <li>Ensure "Camera access" is turned ON</li>
                  <li>Verify that Microsoft Teams is allowed to access your camera</li>
                </ul>
              </li>
              <li><strong>Launch Teams and verify camera settings</strong>
                <ul>
                  <li>Open Teams and click on your profile picture → Settings</li>
                  <li>Select "Devices" and check the camera dropdown</li>
                  <li>Ensure your webcam is selected and the preview shows your camera feed</li>
                </ul>
              </li>
            </ol>
            
            <p>If the issue persists after following these steps, our analysis indicates a <strong>72% probability</strong> that it's related to one of these secondary issues:</p>
            
            <ul>
              <li><strong>Teams version compatibility:</strong> Version 1.5.00.11163 or newer includes significant webcam compatibility improvements. Check your current version by clicking on your profile picture → About → Version.</li>
              <li><strong>Application conflicts:</strong> Other video applications may be holding exclusive access to your camera. Check if Zoom, Skype, or browser tabs with camera access are running.</li>
              <li><strong>Driver issues:</strong> Outdated or corrupted webcam drivers can cause intermittent failures. Consider updating your webcam drivers through Device Manager or the manufacturer's website.</li>
            </ul>
            
            <p>Would you like more specific instructions for any of these additional troubleshooting steps?</p>
          `}} />
        </div>
        
        <SourcesList sources={sources} isVisible={true} />
      </div>
    </AnimatedTransition>
  );
};

export default AIGeneratedAnswer;
