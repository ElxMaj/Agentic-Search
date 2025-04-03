
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Info, Cpu, ExternalLink, Download, Settings, TrendingUp, AlertTriangle, HardDrive, Activity, MemoryStick, X, Monitor, Rocket, LucideCheck, BatteryFull, Clock, Database } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import SourcesList from './SourcesList';
import { Source } from '../data/mockData';
import { 
  createExternalLink, 
  formatContentSection, 
  createStatusBadge, 
  createProTip, 
  createWarningBox, 
  createSuccessBox,
  formatList,
  formatKeyboardShortcut
} from '../lib/utils';

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

// Format all content with a consistent, digestible style similar to webcam troubleshooting
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
  let headerDescription = "Follow these steps to resolve your issue.";
  
  if (query.toLowerCase().includes('error') || content.toLowerCase().includes('error')) {
    headerTitle = "Error Resolution";
    headerColor = "red";
    headerDescription = "Follow these steps to fix the error and get back on track.";
  } else if (query.toLowerCase().includes('setup') || content.toLowerCase().includes('setup')) {
    headerTitle = "Setup Guide";
    headerColor = "green";
    headerDescription = "Complete setup with these step-by-step instructions.";
  } else if (query.toLowerCase().includes('connect') || content.toLowerCase().includes('connect')) {
    headerTitle = "Connection Troubleshooting";
    headerColor = "purple";
    headerDescription = "Follow these steps to establish a stable connection.";
  } else if (query.toLowerCase().includes('install') || content.toLowerCase().includes('install')) {
    headerTitle = "Installation Guide";
    headerColor = "emerald";
    headerDescription = "Complete the installation with these steps.";
  } else if (query.toLowerCase().includes('optimize') || content.toLowerCase().includes('optimize')) {
    headerTitle = "Optimization Guide";
    headerColor = "indigo";
    headerDescription = "Enhance performance with these optimization steps.";
  }
  
  // Convert regular content into formatted sections
  const sections = content.split('\n\n').filter(section => section.trim() !== '');
  
  // Create the colored header section
  let formattedHTML = `
    <div class="space-y-4">
      <div class="bg-${headerColor}-50 border-l-4 border-${headerColor}-500 p-4 rounded-r">
        <h3 class="font-bold text-lg text-${headerColor}-800">${headerTitle}</h3>
        <p class="text-${headerColor}-700 mb-2">${headerDescription}</p>
      </div>
  `;
  
  // Add the main white container with step-by-step solution
  formattedHTML += `
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
      <ol class="list-decimal pl-5 space-y-2">
  `;
  
  // Process each section into list items
  sections.forEach((section, index) => {
    // Extract any links and format them properly
    const processedSection = processContentWithLinks(section);
    
    // Format section content into list items
    let stepContent = processedSection;
    
    // Handle bullet points within steps
    if (section.includes('- ')) {
      const mainContent = section.split('- ')[0];
      const bulletPoints = section.split('- ').slice(1).filter(point => point.trim() !== '');
      stepContent = `${mainContent}
        <ul class="list-disc pl-5 space-y-2 mt-2">
          ${bulletPoints.map(point => `<li>${point.trim()}</li>`).join('')}
        </ul>`;
    }
    
    // Add the step to the list
    formattedHTML += `<li>${stepContent}</li>`;
  });
  
  // Close the ordered list and white container
  formattedHTML += `
      </ol>
    </div>
  `;
  
  // Add a pro tip if appropriate
  if (sections.length > 1) {
    let tipContent = "Bookmark this solution for future reference. Many users find these steps helpful for similar issues.";
    
    if (query.toLowerCase().includes('browser') || content.toLowerCase().includes('browser')) {
      tipContent = "Try an alternative browser if you continue to experience issues.";
    } else if (query.toLowerCase().includes('device') || content.toLowerCase().includes('device')) {
      tipContent = "Remember to restart your device after making these changes for best results.";
    }
    
    formattedHTML += createProTip(tipContent);
  }
  
  // Add a warning if relevant keywords are found
  if (content.toLowerCase().includes('caution') || 
      content.toLowerCase().includes('warning') || 
      content.toLowerCase().includes('important')) {
    formattedHTML += createWarningBox("Take your time with these steps and make sure to follow them in order for best results.");
  }
  
  formattedHTML += `</div>`;
  
  return formattedHTML;
};

// Specialized formatter for Dell graphics performance content
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
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
          <ol class="list-decimal pl-5 space-y-2">
            <li>
              <span class="font-medium">Update Graphics Drivers</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Visit ${createExternalLink("https://www.dell.com/support/home", "Dell Support")}</li>
                <li>Enter your <span class="font-semibold">Service Tag</span> or detect your product</li>
                <li>Navigate to <span class="italic">Drivers & Downloads</span></li>
                <li>Filter for ${createStatusBadge("Video/Graphics Drivers", "info")}</li>
                <li>Download and install the latest version</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Optimize Power Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Right-click Start > Power Options</li>
                <li>Select <span class="font-semibold">High performance</span> or <span class="font-semibold">Ultimate performance</span></li>
                <li>Click <span class="italic">Additional power settings</span> > <span class="italic">Change plan settings</span> > <span class="italic">Change advanced power settings</span></li>
                <li>Expand <span class="font-semibold">Processor power management</span></li>
                <li>Set ${createStatusBadge("Minimum processor state", "on")} to 100% when plugged in</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Configure Graphics Control Panel</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For Intel Graphics:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click desktop > <span class="italic">Intel Graphics Settings</span></li>
                    <li>Under 3D settings, set <span class="font-semibold">Application Optimal Mode</span> to ${createStatusBadge("Performance", "info")}</li>
                  </ul>
                </li>
                <li>For NVIDIA Graphics:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click desktop > <span class="italic">NVIDIA Control Panel</span></li>
                    <li>Go to <span class="font-semibold">Manage 3D settings</span></li>
                    <li>Set <span class="italic">Power management mode</span> to ${createStatusBadge("Prefer maximum performance", "info")}</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Check for Windows Updates</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press ${formatKeyboardShortcut(["Win", "I"])} to open Settings</li>
                <li>Go to <span class="italic">Windows Update</span></li>
                <li>Click ${createStatusBadge("Check for updates", "info")}</li>
                <li>Install all available updates, including optional ones</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("Always restart your computer after driver installation, even if not prompted.")}
        
        ${createSuccessBox("For laptops with dual graphics, ensure your applications use the dedicated GPU for maximum performance.")}
      </div>
    `;
  }
  
  return content;
};

// Specialized formatter for webcam troubleshooting content
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
              <li>Open ${createExternalLink("ms-settings:privacy-webcam", "Windows camera settings")}</li>
              <li>Toggle <span class="font-medium">Camera access</span> to ${createStatusBadge("ON", "on")}</li>
              <li>Ensure Microsoft Teams is allowed in the app list</li>
              <li>Restart Teams completely after changes</li>
            </ol>
          </div>
          
          ${createProTip("Using Teams in a browser? Check browser camera permissions or try the " + createExternalLink("https://teams.microsoft.com/downloads", "desktop app") + " instead.")}
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
            <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
            <ol class="list-decimal pl-5 space-y-2">
              <li><span class="font-medium">Disconnect and reconnect</span> your webcam USB cable</li>
              <li>Try a different USB port <span class="text-sm text-gray-600">(USB 3.0 ports work best)</span></li>
              <li>Connect ${createStatusBadge("directly to computer", "warning")} — avoid USB hubs</li>
              <li>Test in ${createExternalLink("ms-cameraapp:", "Windows Camera app")} to isolate the issue</li>
            </ol>
          </div>
          
          ${createProTip("If your webcam works in other apps but not Teams, the issue is likely Teams-specific.")}
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
            <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
            <ol class="list-decimal pl-5 space-y-2">
              <li>Update webcam drivers from the ${createExternalLink("", "manufacturer's website")}</li>
              <li>In Device Manager:
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>Find your webcam under "Cameras" or "Imaging devices"</li>
                  <li>Right-click → Uninstall device</li>
                  <li>Check "Delete driver" option</li>
                  <li>Restart computer to reinstall</li>
                </ul>
              </li>
              <li>Update Teams to the ${createExternalLink("https://teams.microsoft.com/downloads", "latest version")}</li>
              <li>Clear Teams cache: 
                <div class="bg-gray-100 p-2 rounded mt-1 font-mono text-sm">
                  Close Teams and delete %AppData%\\Microsoft\\Teams\\Cache
                </div>
              </li>
            </ol>
          </div>
          
          ${createWarningBox("After updating drivers, always restart your computer before testing again.", "Important")}
        </div>
      `;
    }
  }
  
  return content;
};

// Specialized formatter for computer slowness content
const formatComputerSlowContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('slow') || 
      (content.toLowerCase().includes('slow') && content.toLowerCase().includes('computer'))) {
    return `
      <div class="space-y-4">
        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-indigo-800 flex items-center gap-2">
            <span class="text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </span>
            Computer Performance Optimization
          </h3>
          <p class="text-indigo-700 mb-2">Follow these steps to significantly improve your computer's overall performance.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
          <ol class="list-decimal pl-5 space-y-2">
            <li>
              <span class="font-medium">Remove startup programs</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press ${formatKeyboardShortcut(["Ctrl", "Shift", "Esc"])} to open Task Manager</li>
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
                <li>Consider using ${createExternalLink("https://windirstat.net/", "WinDirStat")} for deeper cleaning</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Check for malware</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open ${createExternalLink("ms-settings:windowsdefender", "Windows Security")}</li>
                <li>Run a full scan</li>
                <li>Consider using ${createExternalLink("https://www.malwarebytes.com/", "Malwarebytes")} for a second opinion</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Update your system</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Go to ${createExternalLink("ms-settings:windowsupdate", "Windows Update")}</li>
                <li>Install all available updates</li>
                <li>Check manufacturer websites for firmware updates</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createSuccessBox("Consider a hardware upgrade like adding more RAM or switching to an SSD for significant performance improvements. Learn more about " + createExternalLink("https://www.crucial.com/upgrades", "RAM and SSD upgrades") + ".")}
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
  
  // Apply specialized formatting based on content type
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

