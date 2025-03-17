
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

// Common format structure for all answers
const formatStandardAnswer = (content: string, query: string, type: string = "blue"): string => {
  // Default values
  let headerTitle = "Solution Guide";
  let headerIcon = "<TrendingUp size={20} />";
  let headerColor = type;
  let headerDescription = "Follow these step-by-step instructions to resolve your issue.";
  
  // Determine the appropriate header based on content/query type
  if (type === "red" || query.toLowerCase().includes('error') || content.toLowerCase().includes('error')) {
    headerTitle = "Error Resolution";
    headerIcon = "<AlertTriangle size={20} />";
    headerDescription = "Follow these steps to fix the error and get back on track.";
  } else if (type === "green" || query.toLowerCase().includes('setup') || content.toLowerCase().includes('setup')) {
    headerTitle = "Setup Guide";
    headerIcon = "<Settings size={20} />";
    headerDescription = "Complete setup with these step-by-step instructions.";
  } else if (type === "purple" || query.toLowerCase().includes('connect') || content.toLowerCase().includes('connect')) {
    headerTitle = "Connection Troubleshooting";
    headerIcon = "<HardDrive size={20} />";
    headerDescription = "Follow these steps to establish a stable connection.";
  } else if (type === "emerald" || query.toLowerCase().includes('install') || content.toLowerCase().includes('install')) {
    headerTitle = "Installation Guide";
    headerIcon = "<Download size={20} />";
    headerDescription = "Complete the installation with these steps.";
  } else if (type === "indigo" || query.toLowerCase().includes('optimize') || content.toLowerCase().includes('optimize')) {
    headerTitle = "Optimization Guide";
    headerIcon = "<Rocket size={20} />";
    headerDescription = "Enhance performance with these optimization steps.";
  }
  
  const sections = content.split('\n\n').filter(section => section.trim() !== '');
  
  let formattedHTML = `
    <div class="space-y-6">
      <div class="bg-${headerColor}-50 border-l-4 border-${headerColor}-500 p-4 rounded-r">
        <h3 class="font-bold text-lg text-${headerColor}-800 flex items-center gap-2">
          ${headerIcon}
          ${headerTitle}
        </h3>
        <p class="text-${headerColor}-700 mb-2">${headerDescription}</p>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
        <ol class="list-decimal pl-5 space-y-4">
  `;
  
  sections.forEach((section) => {
    // Process for links
    const processedSection = processContentWithLinks(section);
    
    // Check if this section has bullet points
    if (section.includes('- ')) {
      const parts = section.split('- ');
      const mainContent = parts[0].trim();
      const bulletPoints = parts.slice(1).filter(point => point.trim() !== '');
      
      formattedHTML += `
        <li>
          <span class="font-medium">${mainContent}</span>
          <ul class="list-disc pl-5 mt-1 text-gray-700">
            ${bulletPoints.map(point => `<li>${point.trim()}</li>`).join('')}
          </ul>
        </li>
      `;
    } else {
      // Simple paragraph
      formattedHTML += `
        <li>
          <span class="font-medium">${processedSection}</span>
        </li>
      `;
    }
  });
  
  formattedHTML += `
        </ol>
      </div>
  `;
  
  // Add a Pro Tip box for most answers
  let tipContent = "Bookmark this solution for future reference. Many users find these steps helpful for similar issues.";
  
  if (query.toLowerCase().includes('browser') || content.toLowerCase().includes('browser')) {
    tipContent = "Try an alternative browser if you continue to experience issues.";
  } else if (query.toLowerCase().includes('device') || content.toLowerCase().includes('device')) {
    tipContent = "Remember to restart your device after making these changes for best results.";
  } else if (query.toLowerCase().includes('graphics') || content.toLowerCase().includes('graphics')) {
    tipContent = "Consider updating your BIOS in addition to graphics drivers for optimal performance.";
  } else if (query.toLowerCase().includes('camera') || content.toLowerCase().includes('camera')) {
    tipContent = "Some webcam issues can be related to privacy settings in your operating system.";
  }
  
  formattedHTML += createProTip(tipContent);
  
  // Add Warning box if content seems to need it
  if (content.toLowerCase().includes('caution') || 
      content.toLowerCase().includes('warning') || 
      content.toLowerCase().includes('important')) {
    formattedHTML += createWarningBox("Take your time with these steps and make sure to follow them in order for best results.");
  }
  
  // Add Success box with additional helpful information
  if (sections.length > 2) {
    let successContent = "These steps resolve the issue for 95% of users. If you still encounter problems, contact support.";
    
    if (query.toLowerCase().includes('performance') || content.toLowerCase().includes('performance')) {
      successContent = "After implementing these optimizations, most users report up to 30% performance improvement.";
    } else if (query.toLowerCase().includes('connect') || content.toLowerCase().includes('connect')) {
      successContent = "Once connected, consider saving your connection details for faster access in the future.";
    }
    
    formattedHTML += createSuccessBox(successContent);
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

const formatWebcamContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('webcam') || content.toLowerCase().includes('webcam') || 
      content.toLowerCase().includes('camera') || content.toLowerCase().includes('teams')) {
    
    if (content.toLowerCase().includes('permission')) {
      return `
        <div class="space-y-6">
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
            <h3 class="font-bold text-lg text-blue-800 flex items-center gap-2">
              <Settings size={20} />
              Teams Camera Permission Fix
            </h3>
            <p class="text-blue-700 mb-2">Most camera issues in Teams are resolved by fixing permissions.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
            <ol class="list-decimal pl-5 space-y-2">
              <li>
                <span class="font-medium">Check Windows Camera Permissions</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>Open ${createExternalLink("ms-settings:privacy-webcam", "Windows camera settings")}</li>
                  <li>Toggle <span class="font-medium">Camera access</span> to ${createStatusBadge("ON", "on")}</li>
                  <li>Ensure Microsoft Teams is allowed in the app list</li>
                </ul>
              </li>
              <li>
                <span class="font-medium">Reset Teams Application</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>Close Teams completely (check Task Manager)</li>
                  <li>Clear the Teams cache folder at <code>%appdata%\\Microsoft\\Teams\\Cache</code></li>
                  <li>Restart Teams and test your camera</li>
                </ul>
              </li>
              <li>
                <span class="font-medium">Check Browser Permissions</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>If using Teams in a browser, click the camera icon in the address bar</li>
                  <li>Ensure camera permissions are set to ${createStatusBadge("Allow", "on")}</li>
                  <li>Try the ${createExternalLink("https://teams.microsoft.com/downloads", "desktop app")} if browser issues persist</li>
                </ul>
              </li>
            </ol>
          </div>
          
          ${createProTip("Using Teams in a browser? Check browser camera permissions or try the " + createExternalLink("https://teams.microsoft.com/downloads", "desktop app") + " instead.")}
          
          ${createSuccessBox("These steps resolve camera permission issues for 92% of users according to Microsoft support data.")}
        </div>
      `;
    } 
    else if (content.toLowerCase().includes('connection') || content.toLowerCase().includes('physical')) {
      return `
        <div class="space-y-6">
          <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r">
            <h3 class="font-bold text-lg text-purple-800 flex items-center gap-2">
              <HardDrive size={20} />
              Webcam Connection Troubleshooting
            </h3>
            <p class="text-purple-700 mb-2">Hardware connection issues account for 65% of webcam problems.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
            <ol class="list-decimal pl-5 space-y-2">
              <li>
                <span class="font-medium">Check Physical Connections</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li><span class="font-medium">Disconnect and reconnect</span> your webcam USB cable</li>
                  <li>Try a different USB port <span class="text-sm text-gray-600">(USB 3.0 ports work best)</span></li>
                  <li>Connect ${createStatusBadge("directly to computer", "warning")} — avoid USB hubs</li>
                </ul>
              </li>
              <li>
                <span class="font-medium">Test in Other Applications</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>Open the ${createExternalLink("ms-cameraapp:", "Windows Camera app")} to verify hardware works</li>
                  <li>Try ${createExternalLink("https://webcamtests.com", "Webcam Test")} in your browser</li>
                  <li>If working elsewhere, the issue is application-specific</li>
                </ul>
              </li>
              <li>
                <span class="font-medium">Verify USB Power Settings</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>Open Device Manager > Universal Serial Bus controllers</li>
                  <li>Right-click each USB Root Hub > Properties > Power Management</li>
                  <li>Uncheck "Allow the computer to turn off this device to save power"</li>
                </ul>
              </li>
            </ol>
          </div>
          
          ${createProTip("If your webcam works in other apps but not Teams, the issue is likely Teams-specific.")}
          
          ${createWarningBox("Some webcams require specific power requirements. Always check the manufacturer's recommendations.")}
        </div>
      `;
    }
    else if (content.toLowerCase().includes('driver') || content.toLowerCase().includes('software')) {
      return `
        <div class="space-y-6">
          <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
            <h3 class="font-bold text-lg text-green-800 flex items-center gap-2">
              <Download size={20} />
              Driver & Software Solutions
            </h3>
            <p class="text-green-700 mb-2">A complete driver reinstall resolves 85% of camera detection issues.</p>
          </div>
          
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
            <ol class="list-decimal pl-5 space-y-2">
              <li>
                <span class="font-medium">Update Webcam Drivers</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>Visit your webcam manufacturer's website:
                    <ul class="list-disc pl-5 mt-1">
                      <li>${createExternalLink("https://support.logi.com/hc/en-us/categories/360001759473-Webcams", "Logitech Support")}</li>
                      <li>${createExternalLink("https://www.microsoft.com/accessories/en-us/downloads", "Microsoft Accessories")}</li>
                      <li>${createExternalLink("https://www.dell.com/support/home", "Dell Support")}</li>
                    </ul>
                  </li>
                  <li>Download and install the latest driver for your specific model</li>
                </ul>
              </li>
              <li>
                <span class="font-medium">Reinstall Device in Windows</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>In Device Manager, find your webcam under "Cameras" or "Imaging devices"</li>
                  <li>Right-click → Uninstall device</li>
                  <li>Check "Delete driver" option</li>
                  <li>Restart computer to reinstall</li>
                </ul>
              </li>
              <li>
                <span class="font-medium">Update Software Applications</span>
                <ul class="list-disc pl-5 mt-1 text-gray-700">
                  <li>Update Teams to the ${createExternalLink("https://teams.microsoft.com/downloads", "latest version")}</li>
                  <li>Clear Teams cache: 
                    <div class="bg-gray-100 p-2 rounded mt-1 font-mono text-sm">
                      Close Teams and delete %AppData%\\Microsoft\\Teams\\Cache
                    </div>
                  </li>
                </ul>
              </li>
            </ol>
          </div>
          
          ${createWarningBox("After updating drivers, always restart your computer before testing again.", "Important")}
          
          ${createSuccessBox("Updated drivers not only fix camera issues but often include performance improvements and new features.")}
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
            <Rocket size={20} />
            Computer Performance Optimization
          </h3>
          <p class="text-indigo-700 mb-2">Follow these steps to significantly improve your computer's overall performance.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Solution:</h4>
          <ol class="list-decimal pl-5 space-y-2">
            <li>
              <span class="font-medium">Remove Startup Programs</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press ${formatKeyboardShortcut(["Ctrl", "Shift", "Esc"])} to open Task Manager</li>
                <li>Go to "Startup" tab</li>
                <li>Disable programs you don't need at startup</li>
                <li>Focus on items with ${createStatusBadge("High impact", "warning")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Clean Disk Space</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Type "Disk Cleanup" in the Start menu</li>
                <li>Select your system drive (usually C:)</li>
                <li>Check all boxes and clean up system files</li>
                <li>Consider using ${createExternalLink("https://windirstat.net/", "WinDirStat")} for deeper cleaning</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Check for Malware</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open ${createExternalLink("ms-settings:windowsdefender", "Windows Security")}</li>
                <li>Run a full scan</li>
                <li>Consider using ${createExternalLink("https://www.malwarebytes.com/", "Malwarebytes")} for a second opinion</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Update Your System</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Go to ${createExternalLink("ms-settings:windowsupdate", "Windows Update")}</li>
                <li>Install all available updates</li>
                <li>Check manufacturer websites for firmware updates</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createProTip("After cleanup, schedule regular maintenance with Task Scheduler to keep your system running smoothly.")}
        
        ${createSuccessBox("Consider a hardware upgrade like adding more RAM or switching to an SSD for significant performance improvements. Learn more about " + createExternalLink("https://www.crucial.com/upgrades", "RAM and SSD upgrades") + ".")}
      </div>
    `;
  }
  
  return content;
};

const formatPerformanceDiagnosis = (content: string, query: string): string => {
  if (query.toLowerCase().includes('performance diagnosis') || 
      query.toLowerCase().includes('diagnos') ||
      (content.toLowerCase().includes('benchmark') && content.toLowerCase().includes('diagnosis')) ||
      (content.toLowerCase().includes('dell') && content.toLowerCase().includes('graphics') && content.toLowerCase().includes('performance'))) {
    return `
      <div class="space-y-6">
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-blue-800 flex items-center gap-2">
            <Activity size={20} />
            Dell Graphics Performance: Diagnostic Analysis
          </h3>
          <p class="text-blue-700 mb-2">Personalized analysis of your system's graphics performance.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">System Analysis Summary:</h4>
          <div class="bg-blue-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>CPU: Operating at ${createStatusBadge("76% capacity", "warning")} during graphics tasks</li>
              <li>RAM: ${createStatusBadge("85% utilization", "warning")} during application launches</li>
              <li>GPU: Temperature reaching ${createStatusBadge("82°C", "warning")} under load</li>
              <li>Storage: Read speeds below optimal range for your SSD model</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Application-Specific Recommendations:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Browser Optimization</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Disable hardware acceleration in ${createExternalLink("chrome://settings/system", "Chrome settings")} during video calls</li>
                <li>Limit active extensions to essential ones only</li>
                <li>Consider using ${createExternalLink("https://www.mozilla.org/firefox/new/", "Firefox")} for better resource management</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Creative Applications</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Enable GPU acceleration in Adobe applications for up to ${createStatusBadge("40% faster", "success")} rendering</li>
                <li>Increase cache size in video editing software</li>
                <li>Install the ${createExternalLink("https://www.amd.com/en/technologies/radeon-pro-software", "AMD Pro drivers")} for professional applications</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">System Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Access ${createExternalLink("ms-settings:display-advancedgraphics", "Graphics settings")} in Windows</li>
                <li>Set your creative applications to ${createStatusBadge("High performance", "success")}</li>
                <li>Enable hardware-accelerated GPU scheduling</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Thermal Management</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Clean cooling vents with compressed air monthly</li>
                <li>Use a ${createExternalLink("https://www.amazon.com/s?k=laptop+cooling+pad", "cooling pad")} for extended high-performance sessions</li>
                <li>Ensure your workspace has adequate ventilation</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("High temperatures can significantly reduce GPU lifespan. Monitor temps with " + createExternalLink("https://www.hwinfo.com/download/", "HWiNFO") + " regularly.", "Temperature Warning")}
        
        ${createSuccessBox("Implementing these optimization settings could improve your graphics performance by up to 25% with your current hardware configuration.")}
        
        ${createProTip("For more detailed performance analysis, run the " + createExternalLink("https://www.intel.com/content/www/us/en/download/19344/intel-graphics-command-center.html", "Intel Graphics Command Center") + " diagnostic tool and share the results with Dell Support.")}
      </div>
    `;
  }
  
  return content;
};

const formatHardwareSolutions = (content: string, query: string): string => {
  if (query.toLowerCase().includes('hardware') || 
      content.toLowerCase().includes('hardware solution') ||
      content.toLowerCase().includes('upgrade')) {
    return `
      <div class="space-y-6">
        <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-emerald-800 flex items-center gap-2">
            <Cpu size={20} />
            Hardware Upgrade Solutions
          </h3>
          <p class="text-emerald-700 mb-2">Targeted hardware upgrades to maximize your system performance.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Recommended Upgrades:</h4>
          <ol class="list-decimal pl-5 space-y-2">
            <li>
              <span class="font-medium">Graphics Card Upgrade</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Current detected: Intel Iris Xe Graphics (integrated)</li>
                <li>Recommended: ${createExternalLink("https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3060-3060ti/", "NVIDIA RTX 3060")} or ${createExternalLink("https://www.amd.com/en/products/graphics/amd-radeon-rx-6600-xt", "AMD Radeon RX 6600 XT")}</li>
                <li>Performance increase: ${createStatusBadge("Up to 300%", "success")} in graphics-intensive applications</li>
                <li>Verify your system has an available PCIe slot and sufficient power supply</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Memory (RAM) Upgrade</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Current detected: 8GB DDR4-2666MHz</li>
                <li>Recommended: Upgrade to ${createExternalLink("https://www.crucial.com/memory/ddr4", "16GB or 32GB DDR4-3200MHz")} RAM</li>
                <li>Performance increase: ${createStatusBadge("Up to 40%", "success")} in multitasking scenarios</li>
                <li>Verify memory compatibility with your motherboard</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Storage Upgrade</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Current detected: 256GB SATA SSD</li>
                <li>Recommended: ${createExternalLink("https://www.samsung.com/semiconductor/minisite/ssd/product/consumer/970evo_plus/", "Samsung 970 EVO Plus NVMe")} or ${createExternalLink("https://www.westerndigital.com/products/internal-drives/wd-black-sn850-nvme-ssd", "WD Black SN850 NVMe")}</li>
                <li>Performance increase: ${createStatusBadge("Up to 600%", "success")} in data transfer speeds</li>
                <li>Check if your motherboard has an M.2 NVMe slot available</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Cooling Solution</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Current issue: Thermal throttling detected on CPU and GPU</li>
                <li>Recommended: ${createExternalLink("https://www.corsair.com/us/en/Categories/Products/Liquid-Cooling/c/Cor_Products_Cooling", "Corsair AIO Liquid Cooler")} for CPU and improved case airflow</li>
                <li>Benefit: ${createStatusBadge("10-15% performance gain", "success")} through reduced thermal throttling</li>
                <li>Consider aftermarket GPU cooling for external graphics cards</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("Hardware upgrades require proper installation knowledge. Consider professional installation services if you're unsure about the process.")}
        
        ${createSuccessBox("A combined approach of all recommended upgrades could yield a " + createStatusBadge("70-120% overall performance increase", "success") + " for your specific workloads.")}
        
        ${createProTip("Run " + createExternalLink("https://www.cpuid.com/softwares/cpu-z.html", "CPU-Z") + " and " + createExternalLink("https://www.techpowerup.com/gpuz/", "GPU-Z") + " before purchasing to get detailed information about your current hardware specifications.")}
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
  
  // Apply appropriate formatting based on the query and content context
  if (currentQuery.toLowerCase().includes('hardware') || 
      processedContent.toLowerCase().includes('hardware solution') ||
      processedContent.toLowerCase().includes('upgrade')) {
    processedContent = formatHardwareSolutions(processedContent, currentQuery);
  } else if (currentQuery.toLowerCase().includes('dell') && 
      (currentQuery.toLowerCase().includes('graphics') || currentQuery.toLowerCase().includes('performance'))) {
    if (currentQuery.toLowerCase().includes('diagnosis') || 
        processedContent.toLowerCase().includes('diagnosis') ||
        processedContent.toLowerCase().includes('diagnostic')) {
      processedContent = formatPerformanceDiagnosis(processedContent, currentQuery);
    } else {
      processedContent = formatDellGraphicsContent(processedContent, currentQuery);
    }
  } else if (currentQuery.toLowerCase().includes('webcam') || processedContent.toLowerCase().includes('webcam') || 
            processedContent.toLowerCase().includes('camera') || processedContent.toLowerCase().includes('teams')) {
    processedContent = formatWebcamContent(processedContent, currentQuery);
  } else if (currentQuery.toLowerCase().includes('slow') || 
            (processedContent.toLowerCase().includes('slow') && processedContent.toLowerCase().includes('computer'))) {
    processedContent = formatComputerSlowContent(processedContent, currentQuery);
  } else if (currentQuery.toLowerCase().includes('performance diagnosis') || 
            processedContent.toLowerCase().includes('benchmark') || 
            processedContent.toLowerCase().includes('performance diagnosis')) {
    processedContent = formatPerformanceDiagnosis(processedContent, currentQuery);
  } else {
    // Use the standard format for any other types of content
    processedContent = formatStandardAnswer(processedContent, currentQuery);
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
