
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
            <p>Based on our diagnostic analysis, your Microsoft Teams webcam issue appears to be related to a combination of application cache corruption and permission conflicts, which occurs in approximately 78% of similar cases we've analyzed.</p>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
              <p class="font-medium">Technical Analysis:</p>
              <ul class="list-disc pl-5 mt-1">
                <li>Teams cache status: <span class="text-red-600 font-medium">Corrupted (affecting media initialization)</span></li>
                <li>Application permissions: <span class="text-yellow-600 font-medium">Partial conflicts detected</span></li>
                <li>System resource allocation: <span class="text-yellow-600 font-medium">Media pipeline contention</span></li>
                <li>Windows security update: <span class="text-blue-600 font-medium">Recent update changed default permissions</span></li>
              </ul>
            </div>
            
            <p>Here's our recommended step-by-step resolution procedure:</p>
            
            <div class="space-y-4 mb-4">
              <div class="flex items-start">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                <div>
                  <p class="font-medium">Clear Teams Cache (Primary Solution)</p>
                  <p class="text-sm mb-2">This resolves 82% of webcam issues by rebuilding Teams' media pipeline:</p>
                  
                  <div class="bg-gray-100 p-2 rounded-md text-xs mb-2">
                    <p class="font-medium">For Windows:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Close Teams completely (check Task Manager to ensure no Teams processes)</li>
                      <li>Press <code>Win + R</code> to open the Run dialog</li>
                      <li>Type <code>%appdata%\\Microsoft\\Teams</code> and press Enter</li>
                      <li>Delete these folders: <code>Cache</code>, <code>blob_storage</code>, <code>databases</code>, <code>GPUCache</code>, <code>IndexedDB</code>, <code>Local Storage</code>, <code>tmp</code></li>
                      <li>Restart your computer</li>
                      <li>Open Teams and test your camera</li>
                    </ol>
                  </div>
                  
                  <div class="bg-gray-100 p-2 rounded-md text-xs">
                    <p class="font-medium">For Mac:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Quit Teams completely (right-click Teams icon in dock → Quit)</li>
                      <li>Open Finder and press <code>Cmd + Shift + G</code></li>
                      <li>Type <code>~/Library/Application Support/Microsoft/Teams</code></li>
                      <li>Delete the same folders as listed in the Windows instructions</li>
                      <li>Restart your Mac</li>
                      <li>Launch Teams and test your camera</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                <div>
                  <p class="font-medium">Reset Camera Permissions</p>
                  <ol class="list-decimal pl-5 mt-1 space-y-1 text-sm">
                    <li>Open <strong>Windows Settings</strong> (Win + I)</li>
                    <li>Navigate to <strong>Privacy & Security → Camera</strong></li>
                    <li>Ensure <strong>Camera access</strong> is toggled <strong>On</strong></li>
                    <li>Under "Let apps access your camera," toggle the switch to <strong>On</strong></li>
                    <li>Find <strong>Microsoft Teams</strong> in the app list and ensure it's toggled <strong>On</strong></li>
                    <li>Restart Teams and test your camera</li>
                  </ol>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                <div>
                  <p class="font-medium">Update Microsoft Teams</p>
                  <p class="text-sm mb-2">Newer versions contain critical fixes for webcam handling:</p>
                  <ol class="list-decimal pl-5 text-sm space-y-1">
                    <li>Open Teams and click your <strong>profile picture</strong></li>
                    <li>Select <strong>Check for updates</strong></li>
                    <li>Allow any available updates to install</li>
                    <li>Restart Teams when prompted</li>
                  </ol>
                </div>
              </div>
              
              <div class="flex items-start">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                <div>
                  <p class="font-medium">Verify Teams Camera Settings</p>
                  <ol class="list-decimal pl-5 mt-1 space-y-1 text-sm">
                    <li>In Teams, click your <strong>profile picture → Settings</strong></li>
                    <li>Select <strong>Devices</strong> from the left menu</li>
                    <li>Under <strong>Camera</strong>, ensure your webcam is selected in the dropdown</li>
                    <li>Check that your webcam preview appears in the preview window</li>
                    <li>If multiple cameras are available, try selecting a different one</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <p>If the issue persists after these steps, our analysis indicates the problem may be related to one of these secondary factors:</p>
            
            <ul class="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Conflicting applications:</strong> Other video applications may be holding exclusive access to your camera. Close all other applications that might use your webcam (Zoom, Skype, browser tabs with camera access).</li>
              <li><strong>Driver issues:</strong> Your webcam driver may need updating or reinstallation. Check the manufacturer's website for the latest drivers.</li>
              <li><strong>Hardware conflicts:</strong> Try connecting your webcam to a different USB port, preferably directly to your computer rather than through a hub.</li>
            </ul>
            
            <div class="bg-blue-50 p-3 rounded-md">
              <p class="font-medium">Technical Insight:</p>
              <p class="text-sm">Teams uses the Electron framework which maintains its own media device cache separate from the operating system. When this cache becomes corrupted, it can prevent proper initialization of the webcam device. The cache clearing process forces Teams to rebuild its internal device registry and re-establish connections to system hardware through the proper media APIs.</p>
            </div>
          `}} />
        </div>
        
        <SourcesList sources={sources} isVisible={true} />
      </div>
    </AnimatedTransition>
  );
};

export default AIGeneratedAnswer;
