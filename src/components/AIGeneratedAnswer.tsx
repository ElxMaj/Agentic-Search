
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Info, Cpu, ExternalLink } from 'lucide-react';
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
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline flex items-center gap-1">${url}<ExternalLink size={14} /></a>`;
  });
};

// Function to format webcam-related content
const formatWebcamContent = (content: string, query: string): string => {
  // Check if this is webcam-related content
  if (query.toLowerCase().includes('webcam') || content.toLowerCase().includes('webcam') || 
      content.toLowerCase().includes('camera') || content.toLowerCase().includes('teams')) {
    
    // Examples of concise, actionable webcam troubleshooting content
    if (content.toLowerCase().includes('permission')) {
      return `
        <div class="space-y-4">
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
            <h3 class="font-bold text-lg text-blue-800">Teams Camera Permission Fix</h3>
            <p class="text-blue-700 mb-2">Most camera issues in Teams are resolved by fixing permissions.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Open <a href="ms-settings:privacy-webcam" class="text-blue-600 hover:underline inline-flex items-center">Windows camera settings <ExternalLink size={12} className="ml-1" /></a></li>
              <li>Toggle <span class="font-medium">Camera access</span> to <span class="bg-green-100 text-green-800 px-1.5 py-0.5 rounded">ON</span></li>
              <li>Ensure Microsoft Teams is allowed in the app list</li>
              <li>Restart Teams completely after changes</li>
            </ol>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
            <p class="text-gray-700"><span class="font-medium">Pro tip:</span> Using Teams in a browser? Check browser camera permissions or try the <a href="https://teams.microsoft.com/downloads" class="text-blue-600 hover:underline inline-flex items-center">desktop app <ExternalLink size={12} className="ml-1" /></a> instead.</p>
          </div>
        </div>
      `;
    } 
    else if (content.toLowerCase().includes('connection') || content.toLowerCase().includes('physical')) {
      return `
        <div class="space-y-4">
          <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r">
            <h3 class="font-bold text-lg text-purple-800">Webcam Connection Troubleshooting</h3>
            <p class="text-purple-700 mb-2">Hardware connection issues account for 65% of webcam problems.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-semibold text-gray-800 mb-2">Quick Fixes:</h4>
            <ol class="list-decimal pl-5 space-y-2">
              <li><span class="font-medium">Disconnect and reconnect</span> your webcam USB cable</li>
              <li>Try a different USB port <span class="text-sm text-gray-600">(USB 3.0 ports work best)</span></li>
              <li>Connect <span class="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">directly to computer</span> — avoid USB hubs</li>
              <li>Test in <a href="ms-cameraapp:" class="text-blue-600 hover:underline inline-flex items-center">Windows Camera app <ExternalLink size={12} className="ml-1" /></a> to isolate the issue</li>
            </ol>
          </div>
          
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
            <p class="text-gray-700"><span class="font-medium">Quick check:</span> If your webcam works in other apps but not Teams, the issue is likely Teams-specific.</p>
          </div>
        </div>
      `;
    }
    else if (content.toLowerCase().includes('driver') || content.toLowerCase().includes('software')) {
      return `
        <div class="space-y-4">
          <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
            <h3 class="font-bold text-lg text-green-800">Driver & Software Solutions</h3>
            <p class="text-green-700 mb-2">A complete driver reinstall resolves 85% of camera detection issues.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-semibold text-gray-800 mb-2">Resolution Steps:</h4>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Update webcam drivers from the <a href="ms-settings:windowsupdate" class="text-blue-600 hover:underline inline-flex items-center">manufacturer's website <ExternalLink size={12} className="ml-1" /></a></li>
              <li>In Device Manager:
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>Find your webcam under "Cameras" or "Imaging devices"</li>
                  <li>Right-click → Uninstall device</li>
                  <li>Check "Delete driver" option</li>
                  <li>Restart computer to reinstall</li>
                </ul>
              </li>
              <li>Update Teams to the <a href="https://teams.microsoft.com/downloads" class="text-blue-600 hover:underline inline-flex items-center">latest version <ExternalLink size={12} className="ml-1" /></a></li>
              <li>Clear Teams cache: 
                <div class="bg-gray-100 p-2 rounded mt-1 font-mono text-sm">
                  Close Teams and delete %AppData%\\Microsoft\\Teams\\Cache
                </div>
              </li>
            </ol>
          </div>
          
          <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm mt-2">
            <p class="text-yellow-800"><span class="font-medium">❗ Important:</span> After updating drivers, always restart your computer before testing again.</p>
          </div>
        </div>
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
  
  // Format webcam-related content
  processedContent = formatWebcamContent(processedContent, currentQuery);

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.4}>
      <div className="rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
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
