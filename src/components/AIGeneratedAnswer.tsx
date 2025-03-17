
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Info, Cpu, ExternalLink, Download, Settings, TrendingUp, AlertTriangle, HardDrive, Activity, MemoryStick, X, Monitor, Rocket, LucideCheck, BatteryFull, Clock, Database } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import SourcesList from './SourcesList';
import { Source } from '../data/mockData';
import { createExternalLink } from '../lib/utils';

interface AIGeneratedAnswerProps {
  content: string;
  sources: Source[];
  isVisible: boolean;
}

const processContentWithLinks = (content: string): string => {
  const urlRegex = /(?<!<a[^>]*href=["'])https?:\/\/[^\s<>"']+/g;
  return content.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline flex items-center gap-1">${url}<ExternalLink size={14} /></a>`;
  });
};

// Format all content with consistent styling similar to webcam troubleshooting
const formatGeneralContent = (content: string, query: string): string => {
  // Skip if the content is already formatted with colored sections
  if (content.includes('bg-blue-50') || 
      content.includes('bg-green-50') || 
      content.includes('bg-purple-50') ||
      content.includes('bg-indigo-50') ||
      content.includes('bg-yellow-50')) {
    return content;
  }
  
  // Determine content topic and color theme
  let headerTitle = "Solution Guide";
  let headerColor = "blue";
  let headerIcon = "Info";
  let headerDescription = "Follow these steps to resolve your issue.";
  
  if (query.toLowerCase().includes('error') || content.toLowerCase().includes('error')) {
    headerTitle = "Error Resolution";
    headerColor = "red";
    headerIcon = "AlertTriangle";
    headerDescription = "Follow these steps to fix the error and get back on track.";
  } else if (query.toLowerCase().includes('setup') || content.toLowerCase().includes('setup')) {
    headerTitle = "Setup Guide";
    headerColor = "green";
    headerIcon = "Settings";
    headerDescription = "Complete setup with these step-by-step instructions.";
  } else if (query.toLowerCase().includes('connect') || content.toLowerCase().includes('connect')) {
    headerTitle = "Connection Troubleshooting";
    headerColor = "purple";
    headerIcon = "Activity";
    headerDescription = "Follow these steps to establish a stable connection.";
  } else if (query.toLowerCase().includes('install') || content.toLowerCase().includes('install')) {
    headerTitle = "Installation Guide";
    headerColor = "emerald";
    headerIcon = "Download";
    headerDescription = "Complete the installation with these steps.";
  }
  
  // Convert regular content into formatted sections
  const sections = content.split('\n\n').filter(section => section.trim() !== '');
  
  // Prepare formatted HTML
  let formattedHTML = `
    <div class="space-y-4">
      <div class="bg-${headerColor}-50 border-l-4 border-${headerColor}-500 p-4 rounded-r">
        <h3 class="font-bold text-lg text-${headerColor}-800">${headerTitle}</h3>
        <p class="text-${headerColor}-700 mb-2">${headerDescription}</p>
      </div>
  `;
  
  // Format the sections
  sections.forEach((section, index) => {
    // Create a title based on content or index
    let sectionTitle = `Step ${index + 1}`;
    
    if (section.toLowerCase().includes('first') || section.toLowerCase().includes('start')) {
      sectionTitle = "Getting Started";
    } else if (section.toLowerCase().includes('check') || section.toLowerCase().includes('verify')) {
      sectionTitle = "Verification Step";
    } else if (section.toLowerCase().includes('troubleshoot')) {
      sectionTitle = "Troubleshooting";
    } else if (section.toLowerCase().includes('update') || section.toLowerCase().includes('upgrade')) {
      sectionTitle = "Update Process";
    } else if (section.toLowerCase().includes('settings') || section.toLowerCase().includes('configure')) {
      sectionTitle = "Configuration";
    } else if (section.toLowerCase().includes('restart') || section.toLowerCase().includes('reboot')) {
      sectionTitle = "System Restart";
    }
    
    // Format section content
    let sectionContent = section;
    
    // Convert bullet points to proper list format
    if (section.includes('- ')) {
      const bulletPoints = section.split('- ').filter(point => point.trim() !== '');
      sectionContent = `<ul class="list-disc pl-5 space-y-2">${bulletPoints.map(point => `<li>${point.trim()}</li>`).join('')}</ul>`;
    }
    
    // Convert numbered points to proper list format
    else if (section.match(/\d+\.\s/)) {
      const numberPoints = section.split(/\d+\.\s/).filter(point => point.trim() !== '');
      sectionContent = `<ol class="list-decimal pl-5 space-y-2">${numberPoints.map(point => `<li>${point.trim()}</li>`).join('')}</ol>`;
    }
    
    // Add section to formatted HTML
    formattedHTML += `
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h4 class="font-semibold text-gray-800 mb-2">${sectionTitle}:</h4>
        <div class="text-gray-700">
          ${sectionContent}
        </div>
      </div>
    `;
  });
  
  // Add a tips or warnings section if relevant keywords are found
  if (content.toLowerCase().includes('caution') || 
      content.toLowerCase().includes('warning') || 
      content.toLowerCase().includes('important')) {
    formattedHTML += `
      <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm">
        <p class="text-yellow-800"><span class="font-medium">⚠️ Important:</span> Take your time with these steps and make sure to follow them in order for best results.</p>
      </div>
    `;
  }
  
  // Add a pro tip if it's a longer content piece
  if (sections.length > 2) {
    formattedHTML += `
      <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
        <p class="text-gray-700"><span class="font-medium">💡 Pro tip:</span> Bookmark this solution for future reference. Many users find these steps helpful for similar issues.</p>
      </div>
    `;
  }
  
  formattedHTML += `</div>`;
  
  return formattedHTML;
};

const formatDellGraphicsContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('dell') && 
      (content.toLowerCase().includes('graphics') || content.toLowerCase().includes('performance'))) {
    return `
      <div class="space-y-6">
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-blue-800 flex items-center gap-2">
            <TrendingUp size={20} />
            Dell Graphics Performance Optimization
          </h3>
          <p class="text-blue-700 mb-2">Follow these proven steps to boost your Dell graphics performance by up to 30%.</p>
        </div>
        
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Download size={18} />
            Step 1: Update Graphics Drivers
          </h4>
          <div class="ml-7 space-y-3">
            <p class="text-gray-700">Updated drivers often provide significant performance improvements and fix known issues.</p>
            <div class="bg-gray-50 p-3 rounded border border-gray-200">
              <ol class="list-decimal pl-5 space-y-2">
                <li>Visit ${createExternalLink("https://www.dell.com/support/home", "Dell Support")}</li>
                <li>Enter your <span class="font-semibold">Service Tag</span> or detect your product</li>
                <li>Navigate to <span class="italic">Drivers & Downloads</span></li>
                <li>Filter for <span class="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Video/Graphics Drivers</span></li>
                <li>Download and install the latest version</li>
              </ol>
            </div>
            <div class="bg-yellow-50 p-3 rounded flex items-start gap-2 border border-yellow-200">
              <AlertTriangle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
              <p class="text-yellow-800 text-sm">Always restart your computer after driver installation, even if not prompted.</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Settings size={18} />
            Step 2: Optimize Power Settings
          </h4>
          <div class="ml-7 space-y-3">
            <p class="text-gray-700">Windows power settings can limit graphics performance to save battery.</p>
            <div class="bg-gray-50 p-3 rounded border border-gray-200">
              <ol class="list-decimal pl-5 space-y-2">
                <li>Right-click Start > Power Options</li>
                <li>Select <span class="font-semibold">High performance</span> or <span class="font-semibold">Ultimate performance</span></li>
                <li>Click <span class="italic">Additional power settings</span> > <span class="italic">Change plan settings</span> > <span class="italic">Change advanced power settings</span></li>
                <li>Expand <span class="font-semibold">Processor power management</span></li>
                <li>Set <span class="bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Minimum processor state</span> to 100% when plugged in</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Cpu size={18} />
            Step 3: Configure Graphics Control Panel
          </h4>
          <div class="ml-7 space-y-3">
            <p class="text-gray-700">Tune your graphics settings for optimal performance.</p>
            <div class="bg-gray-50 p-3 rounded border border-gray-200">
              <p class="mb-2 font-medium">For Intel Graphics:</p>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Right-click desktop > <span class="italic">Intel Graphics Settings</span></li>
                <li>Under 3D settings, set <span class="font-semibold">Application Optimal Mode</span> to <span class="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Performance</span></li>
              </ol>
              
              <p class="mt-4 mb-2 font-medium">For NVIDIA Graphics:</p>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Right-click desktop > <span class="italic">NVIDIA Control Panel</span></li>
                <li>Go to <span class="font-semibold">Manage 3D settings</span></li>
                <li>Set <span class="italic">Power management mode</span> to <span class="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Prefer maximum performance</span></li>
              </ol>
            </div>
            <div class="bg-green-50 p-3 rounded flex items-start gap-2 border border-green-200">
              <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <p class="text-green-800 text-sm">For laptops with dual graphics, ensure your applications use the dedicated GPU for maximum performance.</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={18} />
            Step 4: Check for Windows Updates
          </h4>
          <div class="ml-7 space-y-3">
            <p class="text-gray-700">Windows updates often include performance enhancements and bug fixes.</p>
            <div class="bg-gray-50 p-3 rounded border border-gray-200">
              <ol class="list-decimal pl-5 space-y-2">
                <li>Press <kbd>Win</kbd>+<kbd>I</kbd> to open Settings</li>
                <li>Go to <span class="italic">Windows Update</span></li>
                <li>Click <span class="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Check for updates</span></li>
                <li>Install all available updates, including optional ones</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  return content;
};

const formatWebcamContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('webcam') || content.toLowerCase().includes('webcam') || 
      content.toLowerCase().includes('camera') || content.toLowerCase().includes('teams')) {
    
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
  
  return content;
};

const formatComputerSlowContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('slow') || 
      (content.toLowerCase().includes('slow') && content.toLowerCase().includes('computer'))) {
    return `
      <div class="space-y-6">
        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-indigo-800 flex items-center gap-2">
            <span class="text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </span>
            Computer Performance Optimization
          </h3>
          <p class="text-indigo-700 mb-2">Follow these steps to significantly improve your computer's overall performance and application load times.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Quick Performance Boosts:</h4>
          <ol class="list-decimal pl-5 space-y-3">
            <li>
              <span class="font-medium">Remove startup programs</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Esc</kbd> to open Task Manager</li>
                <li>Go to "Startup" tab</li>
                <li>Disable programs you don't need at startup</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Clean disk space</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Type "Disk Cleanup" in the Start menu</li>
                <li>Select your system drive (usually C:)</li>
                <li>Check all boxes and clean up system files</li>
                <li>Consider using <a href="https://windirstat.net/" class="text-blue-600 hover:underline inline-flex items-center">WinDirStat <ExternalLink size={12} className="ml-1" /></a> for deeper cleaning</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Check for malware</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open <a href="ms-settings:windowsdefender" class="text-blue-600 hover:underline inline-flex items-center">Windows Security <ExternalLink size={12} className="ml-1" /></a></li>
                <li>Run a full scan</li>
                <li>Consider using <a href="https://www.malwarebytes.com/" class="text-blue-600 hover:underline inline-flex items-center">Malwarebytes <ExternalLink size={12} className="ml-1" /></a> for a second opinion</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Update your system</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Go to <a href="ms-settings:windowsupdate" class="text-blue-600 hover:underline inline-flex items-center">Windows Update <ExternalLink size={12} className="ml-1" /></a></li>
                <li>Install all available updates</li>
                <li>Check manufacturer websites for firmware updates</li>
              </ul>
            </li>
          </ol>
        </div>
        
        <div class="bg-green-50 p-3 rounded-lg border border-green-200 text-sm mt-2">
          <p class="text-green-800"><span class="font-medium">💡 Pro tip:</span> Consider a hardware upgrade like adding more RAM or switching to an SSD for significant performance improvements. Learn more about <a href="https://www.crucial.com/upgrades" class="text-blue-600 hover:underline inline-flex items-center">RAM and SSD upgrades <ExternalLink size={12} className="ml-1" /></a>.</p>
        </div>
      </div>
    `;
  }
  
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

  const averageConfidence = sources.length > 0 
    ? Math.round(sources.reduce((sum, source) => sum + source.confidence, 0) / sources.length) 
    : 0;
    
  const hasGPUInfo = content.includes("Intel Iris Xe Graphics");
  
  const urlParams = new URLSearchParams(window.location.search);
  const currentQuery = urlParams.get('q') || '';
  
  let processedContent = processContentWithLinks(content);
  
  // Check for specific content types first
  if (currentQuery.toLowerCase().includes('dell') && 
      (currentQuery.toLowerCase().includes('graphics') || currentQuery.toLowerCase().includes('performance'))) {
    processedContent = formatDellGraphicsContent(processedContent, currentQuery);
  } else if (currentQuery.toLowerCase().includes('webcam') || processedContent.toLowerCase().includes('webcam') || 
            processedContent.toLowerCase().includes('camera') || processedContent.toLowerCase().includes('teams')) {
    processedContent = formatWebcamContent(processedContent, currentQuery);
  } else if (currentQuery.toLowerCase().includes('slow') || 
            (processedContent.toLowerCase().includes('slow') && processedContent.toLowerCase().includes('computer'))) {
    processedContent = formatComputerSlowContent(processedContent, currentQuery);
  } else {
    // Apply general formatting for all other content
    processedContent = formatGeneralContent(processedContent, currentQuery);
  }

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
