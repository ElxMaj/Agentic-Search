
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Info, Cpu, ExternalLink, Download, Settings, TrendingUp, AlertTriangle, HardDrive, Activity, MemoryStick, X, Monitor, Rocket, LucideCheck, BatteryFull, Clock, Database, Wifi } from 'lucide-react';
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

const formatStandardAnswer = (content: string, query: string, type: string = "blue"): string => {
  let headerTitle = "Solution Guide";
  let headerIcon = "<TrendingUp size={20} />";
  let headerColor = type;
  let headerDescription = "Follow these step-by-step instructions to resolve your issue.";
  
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
    const processedSection = processContentWithLinks(section);
    
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
  
  if (content.toLowerCase().includes('caution') || 
      content.toLowerCase().includes('warning') || 
      content.toLowerCase().includes('important')) {
    formattedHTML += createWarningBox("Take your time with these steps and make sure to follow them in order for best results.");
  }
  
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

const formatDellBatteryDrainContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('battery') && 
      (query.toLowerCase().includes('drain') || query.toLowerCase().includes('life') || 
       query.toLowerCase().includes('power') || query.toLowerCase().includes('dying'))) {
    return `
      <div class="space-y-6">
        <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-green-800 flex items-center gap-2">
            <BatteryFull size={20} />
            Dell Battery Optimization Guide
          </h3>
          <p class="text-green-700 mb-2">Extend your Dell laptop's battery life with these proven power-saving techniques.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Battery Drain Analysis:</h4>
          <div class="bg-green-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Power settings: ${createStatusBadge("Current profile sub-optimal", "warning")} for battery longevity</li>
              <li>Background processes: ${createStatusBadge("Multiple high-drain apps", "warning")} running constantly</li>
              <li>Display settings: ${createStatusBadge("Brightness level", "warning")} consuming excess power</li>
              <li>Dell-specific settings: Several battery-saving features not enabled</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Battery Optimization:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Optimize Dell Power Manager Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open ${createExternalLink("https://www.dell.com/support/home/drivers/driversdetails?driverid=jxr7w", "Dell Power Manager")} (pre-installed on most Dell systems)</li>
                <li>Select "Battery Information" > "Battery Settings"</li>
                <li>Choose ${createStatusBadge("Primarily AC Use", "info")} for maximum performance or ${createStatusBadge("Balanced", "success")} for everyday use</li>
                <li>Enable "Battery Extender" mode for critical situations</li>
                <li>Set custom thresholds:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Start charging: 50%</li>
                    <li>Stop charging: 80%</li>
                  </ul>
                </li>
                <li>Potential gain: ${createStatusBadge("15-20% longer battery life", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Adjust Windows Power Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Access ${createExternalLink("ms-settings:powersleep", "Windows Power Settings")}</li>
                <li>Select "Battery saver settings"</li>
                <li>Enable "Battery saver" automatically at ${createStatusBadge("20%", "info")}</li>
                <li>Configure "Screen timeout" to 5 minutes and "Sleep" to 15 minutes on battery</li>
                <li>Click "Additional power settings" to access Power Plan</li>
                <li>Select "Power saver" plan while on battery</li>
                <li>Click "Change plan settings" > "Change advanced power settings"</li>
                <li>Optimize:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Processor power management > Maximum processor state: ${createStatusBadge("70%", "info")} on battery</li>
                    <li>Display > Brightness: ${createStatusBadge("40%", "info")} on battery</li>
                    <li>Sleep > Hibernate after: ${createStatusBadge("30 minutes", "info")} on battery</li>
                  </ul>
                </li>
                <li>Potential gain: ${createStatusBadge("25-35% longer battery life", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Disable Background Applications</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Check ${createExternalLink("ms-settings:battery", "Battery usage by app")}</li>
                <li>Identify high-drain applications</li>
                <li>Open Task Manager with ${formatKeyboardShortcut(["Ctrl", "Shift", "Esc"])}</li>
                <li>Go to "Startup" tab and disable non-essential applications</li>
                <li>In Windows Settings > Apps > Startup, disable high-power apps</li>
                <li>Potential gain: ${createStatusBadge("15-25% longer battery life", "success")}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("If your battery depletes extremely rapidly (empty within 1 hour) or won't hold a charge at all, you may need a battery replacement. Contact Dell Support for hardware service options.")}
        
        ${createSuccessBox("Implementing these Dell-specific optimizations can improve your battery runtime by 30-60% and extend overall battery lifespan by up to 2 years.")}
        
        ${createProTip("For Dell laptops used primarily at a desk, use Dell Power Manager to enable 'Primarily AC Use' mode. This optimizes the battery charging threshold to extend its overall lifespan.")}
      </div>
    `;
  }
  
  return content;
};

const formatDellGraphicsContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('dell') && 
      (query.toLowerCase().includes('graphics') || query.toLowerCase().includes('performance'))) {
    return `
      <div class="space-y-6">
        <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-orange-800 flex items-center gap-2">
            <Monitor size={20} />
            Dell Graphics Performance Optimization
          </h3>
          <p class="text-orange-700 mb-2">Follow these proven steps to boost your Dell graphics performance by up to 30%.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Graphics Performance Analysis:</h4>
          <div class="bg-orange-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Driver status: ${createStatusBadge("Outdated drivers", "warning")} limiting performance potential</li>
              <li>Power settings: ${createStatusBadge("Balanced mode", "warning")} restricting GPU capabilities</li>
              <li>System resources: ${createStatusBadge("Suboptimal allocation", "warning")} for graphics workloads</li>
              <li>Thermal conditions: Current configuration may lead to thermal throttling</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Graphics Enhancement:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Update Graphics Drivers</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Visit ${createExternalLink("https://www.dell.com/support/home", "Dell Support")}</li>
                <li>Enter your Service Tag (found on the bottom of your laptop)</li>
                <li>Go to "Drivers & Downloads" and filter for "Video"</li>
                <li>Download and install the latest GPU driver package</li>
                <li>For NVIDIA systems, also visit ${createExternalLink("https://www.nvidia.com/Download/index.aspx", "NVIDIA's website")} for the most recent drivers</li>
                <li>For Intel graphics, try ${createExternalLink("https://www.intel.com/content/www/us/en/download-center/home.html", "Intel's driver utility")}</li>
                <li>Expected improvement: ${createStatusBadge("10-15% performance gain", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Optimize System Power Profile</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Right-click on the battery icon in taskbar > Power Options</li>
                <li>Select "High Performance" power plan (or create a custom plan)</li>
                <li>Click "Change plan settings" > "Change advanced power settings"</li>
                <li>Set "Processor power management" > "Maximum processor state" to 100%</li>
                <li>For Dell-specific options, open ${createExternalLink("https://www.dell.com/support/home/drivers/driversdetails?driverid=jxr7w", "Dell Power Manager")}</li>
                <li>Select "Thermal Management" > "Ultra Performance" when plugged in</li>
                <li>Expected improvement: ${createStatusBadge("5-10% more consistent performance", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Configure Graphics Control Panel</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For NVIDIA GPUs:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click desktop > "NVIDIA Control Panel"</li>
                    <li>Select "Manage 3D settings" > "Global Settings"</li>
                    <li>Set "Power management mode" to "Prefer maximum performance"</li>
                    <li>Set "Preferred graphics processor" to "High-performance NVIDIA processor"</li>
                    <li>Adjust "Texture filtering - Quality" to "Performance"</li>
                  </ul>
                </li>
                <li>For Intel GPUs:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click desktop > "Graphics Properties" or "Intel Graphics Settings"</li>
                    <li>Navigate to "3D" settings</li>
                    <li>Set "Performance" as priority</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("10-20% graphics performance", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Thermal Optimization</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Ensure laptop vents are clean and unobstructed</li>
                <li>Use a laptop cooling pad with fans for extended gaming/rendering sessions</li>
                <li>Apply fresh thermal paste if your Dell is more than 2 years old</li>
                <li>Adjust your environment - work in cooler areas when possible</li>
                <li>Expected improvement: ${createStatusBadge("Prevents thermal throttling", "success")}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("Always restart your computer after installing new graphics drivers to ensure they're properly initialized.")}
        
        ${createSuccessBox("These optimizations together typically yield a 20-30% improvement in graphics performance on most Dell systems with dedicated GPUs.")}
        
        ${createProTip("For gaming, create custom profiles for each demanding game in your graphics control panel to fine-tune settings specifically for that title.")}
      </div>
    `;
  }
  
  return content;
};

const formatWebcamContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('webcam') || query.toLowerCase().includes('camera')) {
    return `
      <div class="space-y-6">
        <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-red-800 flex items-center gap-2">
            <Camera size={20} />
            Webcam Troubleshooting Guide
          </h3>
          <p class="text-red-700 mb-2">Follow this comprehensive approach to resolve webcam connectivity issues.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Webcam Diagnostic Analysis:</h4>
          <div class="bg-red-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Device status: ${createStatusBadge("Connection issues", "warning")} detected</li>
              <li>Driver condition: ${createStatusBadge("Outdated or corrupted", "warning")} drivers possible</li>
              <li>Software conflicts: ${createStatusBadge("Application permission", "warning")} problems identified</li>
              <li>Hardware assessment: Potential physical connectivity issues</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Webcam Resolution:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Basic Connectivity Check</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For external webcams:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Disconnect and reconnect the USB cable</li>
                    <li>Try a different USB port (preferably USB 3.0 - blue ports)</li>
                    <li>Test with a different USB cable if available</li>
                    <li>Connect directly to computer (avoid USB hubs)</li>
                  </ul>
                </li>
                <li>For built-in webcams:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Check for physical camera switch or keyboard shortcut (often F8 or Fn+F8)</li>
                    <li>Verify webcam is not disabled in BIOS/UEFI settings</li>
                  </ul>
                </li>
                <li>Restart your computer after checking connections</li>
                <li>Expected outcome: ${createStatusBadge("Resolves 30% of webcam issues", "info")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Windows Privacy & Permission Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open ${createExternalLink("ms-settings:privacy-webcam", "Windows Camera Privacy Settings")}</li>
                <li>Ensure "Allow apps to access your camera" is turned ON</li>
                <li>Check that specific apps (like Zoom, Teams, Skype) have camera permission</li>
                <li>For browsers, check site permissions:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Chrome: Settings > Privacy and security > Site Settings > Camera</li>
                    <li>Edge: Settings > Cookies and site permissions > Camera</li>
                    <li>Firefox: Options > Privacy & Security > Permissions > Camera</li>
                  </ul>
                </li>
                <li>Expected outcome: ${createStatusBadge("Resolves 25% of webcam issues", "info")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Webcam Driver Reinstallation</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open Device Manager: Press ${formatKeyboardShortcut(["Win", "X"])} and select "Device Manager"</li>
                <li>Expand "Cameras" or "Imaging devices" category</li>
                <li>Right-click on your webcam > "Uninstall device"</li>
                <li>Check "Delete the driver software for this device" option</li>
                <li>Click "Uninstall" and restart your computer</li>
                <li>Windows should automatically reinstall the basic driver</li>
                <li>For Logitech webcams:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Download and install ${createExternalLink("https://support.logi.com/hc/en-us/articles/360024699674", "Logitech Capture")}</li>
                    <li>Download and install ${createExternalLink("https://support.logi.com/hc/en-us/articles/360025297893", "Logitech G HUB")}</li>
                    <li>Use Logitech software to update firmware if available</li>
                  </ul>
                </li>
                <li>Expected outcome: ${createStatusBadge("Resolves 35% of webcam issues", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Application-Specific Troubleshooting</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For Zoom:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Settings > Video > Camera dropdown menu to select correct device</li>
                    <li>Try "Original Ratio" option</li>
                    <li>Disable HD option temporarily</li>
                  </ul>
                </li>
                <li>For Microsoft Teams:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Profile picture > Settings > Devices > Camera dropdown</li>
                    <li>Restart Teams completely (including background processes)</li>
                    <li>Clear Teams cache: Close Teams and delete %AppData%\\Microsoft\\Teams\\Cache</li>
                  </ul>
                </li>
                <li>Test webcam in ${createExternalLink("ms-cameraapp:", "Windows Camera app")} to isolate application issues</li>
                <li>Expected outcome: ${createStatusBadge("Resolves app-specific issues", "success")}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("If your webcam light is on but no image appears, another application might be using the camera. Close all other applications that might access your webcam.")}
        
        ${createSuccessBox("These steps resolve webcam issues for over 90% of users. The most common fix is the correct combination of driver reinstallation and privacy settings adjustment.")}
        
        ${createProTip("For Logitech webcams, the Logitech G HUB software provides additional customization options like field of view, focus, and color correction that can significantly improve video quality.")}
      </div>
    `;
  }
  
  return content;
};

const formatComputerSlowContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('computer') && query.toLowerCase().includes('slow')) {
    return `
      <div class="space-y-6">
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-amber-800 flex items-center gap-2">
            <Clock size={20} />
            System Performance Restoration
          </h3>
          <p class="text-amber-700 mb-2">A comprehensive approach to revitalize your sluggish system through software optimization.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Primary Speed Bottlenecks:</h4>
          <div class="bg-amber-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Software bloat: ${createStatusBadge("Excessive startup programs", "warning")} consuming boot resources</li>
              <li>System resources: ${createStatusBadge("Background processes", "warning")} limiting available memory</li>
              <li>Storage congestion: ${createStatusBadge("Temporary files", "warning")} impacting read/write performance</li>
              <li>Operating system: Unoptimized settings affecting overall responsiveness</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Performance Recovery:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Startup Program Management</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press ${formatKeyboardShortcut(["Ctrl", "Shift", "Esc"])} to open Task Manager</li>
                <li>Select the "Startup" tab to view all auto-starting programs</li>
                <li>Right-click and disable all non-essential programs</li>
                <li>Focus on items labeled ${createStatusBadge("High impact", "warning")} first</li>
                <li>Expected improvement: ${createStatusBadge("30-45% faster boot time", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">System File Cleanup</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Access Disk Cleanup: Press ${formatKeyboardShortcut(["Win", "R"])}, type <code>cleanmgr</code>, press Enter</li>
                <li>Select your system drive (C:) and click "OK"</li>
                <li>Check all boxes, especially:</li>
                <ul class="list-disc pl-5 mt-1">
                  <li>Temporary files</li>
                  <li>Recycle Bin contents</li>
                  <li>Windows Update Cleanup</li>
                </ul>
                <li>Click "Clean up system files" for deeper cleaning options</li>
                <li>Expected improvement: ${createStatusBadge("5-15% disk performance", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Windows Visual Effects Reduction</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press ${formatKeyboardShortcut(["Win", "R"])}, type <code>sysdm.cpl</code>, press Enter</li>
                <li>Go to "Advanced" tab > Performance section > click "Settings"</li>
                <li>Select "Adjust for best performance" or customize by keeping only:
                  <ul class="list-disc pl-5 mt-1">
                    <li>"Show thumbnails instead of icons"</li>
                    <li>"Smooth edges of screen fonts"</li>
                  </ul>
                </li>
                <li>Apply and OK</li>
                <li>Expected improvement: ${createStatusBadge("15-25% UI responsiveness", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Disk Optimization</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For HDD users:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Press ${formatKeyboardShortcut(["Win", "E"])} to open File Explorer</li>
                    <li>Right-click on your system drive (C:) > Properties</li>
                    <li>Select the "Tools" tab > click "Optimize"</li>
                    <li>Select your drive and click "Optimize"</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("10-30% faster file operations", "success")}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("If your computer is more than 5 years old, hardware upgrades (adding RAM or replacing HDD with SSD) may provide the most significant performance improvement.")}
        
        ${createSuccessBox("Implementing all these optimizations typically results in 40-60% overall system performance improvement for most users.")}
        
        ${createProTip("Schedule a monthly maintenance routine using Task Scheduler to keep your system running optimally.")}
      </div>
    `;
  }
  
  return content;
};

const formatWifiUnstableContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('wifi') ||
      query.toLowerCase().includes('wi-fi') ||
      query.toLowerCase().includes('wireless') ||
      query.toLowerCase().includes('unstable')) {
    return `
      <div class="space-y-6">
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-blue-800 flex items-center gap-2">
            <Wifi size={20} />
            WiFi Stability Enhancement Guide
          </h3>
          <p class="text-blue-700 mb-2">Achieve a reliable, stable WiFi connection with these expert optimization techniques.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Connection Instability Analysis:</h4>
          <div class="bg-blue-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Signal quality: ${createStatusBadge("Interference detected", "warning")} from multiple sources</li>
              <li>Router configuration: ${createStatusBadge("Sub-optimal channel selection", "warning")} causing conflicts</li>
              <li>Network adapter: ${createStatusBadge("Power management issues", "warning")} affecting connectivity</li>
              <li>Physical environment: Signal degradation from obstacles and distance</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step WiFi Optimization:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Router Positioning & Configuration</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Optimal router placement:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Centrally located in your home/office</li>
                    <li>Elevated position (on shelf or furniture)</li>
                    <li>Away from metal objects, appliances, and thick walls</li>
                    <li>Antennas positioned vertically for best horizontal coverage</li>
                  </ul>
                </li>
                <li>Router settings optimization:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Access router admin panel (typically 192.168.1.1 or 192.168.0.1)</li>
                    <li>Update firmware to latest version</li>
                    <li>For 2.4GHz networks: Use channel 1, 6, or 11 (least congested)</li>
                    <li>For 5GHz networks: Use higher channels (149-161) if available</li>
                    <li>Enable "Auto Channel Selection" if available</li>
                    <li>Set channel width to 20MHz for 2.4GHz and 80MHz for 5GHz</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("30-50% more stable signal", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Device Network Adapter Optimization</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open Device Manager:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Press ${formatKeyboardShortcut(["Win", "X"])} and select "Device Manager"</li>
                    <li>Expand "Network adapters"</li>
                    <li>Right-click your WiFi adapter > Properties > Advanced tab</li>
                  </ul>
                </li>
                <li>Optimize these specific settings:
                  <ul class="list-disc pl-5 mt-1">
                    <li>"Power Saving Mode" or "Power Management" > Set to "Maximum Performance"</li>
                    <li>"Roaming Aggressiveness" > Set to "Medium" or "High"</li>
                    <li>"Transmit Power" > Set to "Highest" or "100%"</li>
                    <li>"Wireless Mode" > Set to highest supported standard (AC/AX)</li>
                    <li>"802.11n Channel Width" > Match to router setting</li>
                  </ul>
                </li>
                <li>Disable power-saving for network adapter:
                  <ul class="list-disc pl-5 mt-1">
                    <li>In adapter Properties > Power Management tab</li>
                    <li>Uncheck "Allow the computer to turn off this device to save power"</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("25-40% fewer disconnections", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Interference Reduction</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Identify and relocate these interference sources:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Microwave ovens (major 2.4GHz interference when operating)</li>
                    <li>Cordless phones (particularly 2.4GHz models)</li>
                    <li>Bluetooth devices operating near your router</li>
                    <li>Baby monitors and wireless security cameras</li>
                    <li>Neighboring WiFi networks (use WiFi analyzer to check)</li>
                  </ul>
                </li>
                <li>Use channel analysis tools:
                  <ul class="list-disc pl-5 mt-1">
                    <li>${createExternalLink("https://www.microsoft.com/store/productId/9NBLGGH33N0N", "WiFi Analyzer (Windows)")}</li>
                    <li>${createExternalLink("https://play.google.com/store/apps/details?id=com.farproc.wifi.analyzer", "WiFi Analyzer (Android)")}</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("20-35% signal quality", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Network Protocol Optimization</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Reset Windows network stack:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Run Command Prompt as Administrator</li>
                    <li>Execute these commands in sequence:
                      <div class="bg-gray-100 p-2 rounded mt-1 mb-1 font-mono text-sm">
                        ipconfig /release<br>
                        ipconfig /flushdns<br>
                        ipconfig /renew<br>
                        netsh winsock reset<br>
                        netsh int ip reset
                      </div>
                    </li>
                    <li>Restart your computer</li>
                  </ul>
                </li>
                <li>Optimize TCP/IP settings:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Use static IP for critical devices</li>
                    <li>Configure custom DNS servers like Google (8.8.8.8, 8.8.4.4) or Cloudflare (1.1.1.1)</li>
                    <li>Disable IPv6 if not needed (Network adapter properties)</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("15-25% more reliable connection", "success")}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("If you're in a dense apartment building or office with many competing networks, consider investing in a mesh WiFi system that can dynamically optimize connections.")}
        
        ${createSuccessBox("These optimizations together typically resolve WiFi stability issues for 85% of users, with most seeing a 50-70% reduction in disconnections.")}
        
        ${createProTip("For mission-critical work, consider using a wired Ethernet connection whenever possible, which provides more stable speeds and lower latency than WiFi.")}
      </div>
    `;
  }
  
  return content;
};

const AIGeneratedAnswer: React.FC<AIGeneratedAnswerProps> = ({ content, sources, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  const processContentBasedOnQuery = (rawContent: string, query: string): string => {
    let processedContent = rawContent;
    
    // Get query from URL to determine specific scenario
    const urlParams = new URLSearchParams(window.location.search);
    const currentQuery = urlParams.get('q') || '';
    
    // Specific query checks (using URL parameter to ensure consistency)
    if (currentQuery.toLowerCase().includes('battery') && 
        (currentQuery.toLowerCase().includes('drain') || currentQuery.toLowerCase().includes('life'))) {
      return formatDellBatteryDrainContent(processedContent, currentQuery);
    }
    
    if (currentQuery.toLowerCase().includes('dell') && currentQuery.toLowerCase().includes('graphics')) {
      return formatDellGraphicsContent(processedContent, currentQuery);
    }
    
    if (currentQuery.toLowerCase().includes('webcam') || currentQuery.toLowerCase().includes('camera')) {
      return formatWebcamContent(processedContent, currentQuery);
    }
    
    if (currentQuery.toLowerCase().includes('computer') && currentQuery.toLowerCase().includes('slow')) {
      return formatComputerSlowContent(processedContent, currentQuery);
    }
    
    if (currentQuery.toLowerCase().includes('wifi') || 
        currentQuery.toLowerCase().includes('wi-fi') || 
        currentQuery.toLowerCase().includes('wireless') || 
        currentQuery.toLowerCase().includes('unstable')) {
      return formatWifiUnstableContent(processedContent, currentQuery);
    }
    
    // If no specific match, use standard formatting
    return formatStandardAnswer(processedContent, query);
  };

  const query = content.split('\n')[0]; // Use first line as query
  
  // Get the query from the URL to ensure consistent results
  const urlParams = new URLSearchParams(window.location.search);
  const urlQuery = urlParams.get('q') || query;
  
  const processedContent = processContentBasedOnQuery(content, urlQuery);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-10 px-4 md:px-6 py-6 rounded-lg bg-white shadow-sm"
    >
      <AnimatedTransition>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </AnimatedTransition>
      
      <SourcesList sources={sources} isVisible={isVisible} />
    </motion.div>
  );
};

export default AIGeneratedAnswer;
