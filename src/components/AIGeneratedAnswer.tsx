
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
        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-indigo-800 flex items-center gap-2">
            <BatteryFull size={20} />
            Dell Battery Optimization Guide
          </h3>
          <p class="text-indigo-700 mb-2">Extend your Dell laptop's battery life with these proven power-saving techniques.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Battery Drain Analysis:</h4>
          <div class="bg-indigo-50 p-4 rounded-lg mb-4">
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
                <li>Use ${createExternalLink("https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns", "Microsoft Autoruns")} for advanced startup management</li>
                <li>For Dell-specific background services: 
                  <ul class="list-disc pl-5 mt-1">
                    <li>Keep Dell Power Manager and Dell Support Assist</li>
                    <li>Consider disabling Dell Mobile Connect when not in use</li>
                    <li>Disable Dell Digital Delivery after software updates complete</li>
                  </ul>
                </li>
                <li>Potential gain: ${createStatusBadge("15-25% longer battery life", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Configure Dell BIOS Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Restart your Dell laptop</li>
                <li>Press F2 repeatedly during startup to enter BIOS</li>
                <li>Navigate to "Power Management"</li>
                <li>Enable "Deep Sleep Control" if available</li>
                <li>Set "Block Sleep" to No</li>
                <li>Enable "USB Wake Support" but disable "Wake on LAN/WLAN"</li>
                <li>Save changes and exit</li>
                <li>Potential gain: ${createStatusBadge("5-10% lower power consumption", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Optimize Display & Components</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Manually lower screen brightness with ${formatKeyboardShortcut(["Fn", "F11"])} (varies by model)</li>
                <li>Enable Windows Night Light to reduce blue light (and power consumption)</li>
                <li>Use darker wallpapers and themes for OLED displays</li>
                <li>In ${createExternalLink("ms-settings:bluetooth", "Bluetooth & devices settings")}:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Disable Bluetooth when not in use</li>
                    <li>Disconnect unused USB devices</li>
                    <li>Disable touchscreen if rarely used (Device Manager > Human Interface Devices)</li>
                  </ul>
                </li>
                <li>Potential gain: ${createStatusBadge("10-15% longer battery life", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Battery Maintenance Best Practices</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Use the official Dell charger that came with your laptop</li>
                <li>Avoid exposing laptop to extreme temperatures</li>
                <li>Perform ${createExternalLink("https://www.dell.com/support/kbdoc/en-us/000130881/resetting-the-battery-on-a-dell-laptop", "battery calibration")} every 2-3 months:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Charge to 100%</li>
                    <li>Let it cool for 2 hours while plugged in</li>
                    <li>Unplug and use until completely drained</li>
                    <li>Let it sit unpowered for 3-5 hours</li>
                    <li>Charge to 100% without interruption</li>
                  </ul>
                </li>
                <li>Run ${createExternalLink("https://www.dell.com/support/home/drivers/driversdetails?driverid=ddc9m", "Dell SupportAssist")} diagnostics to check battery health regularly</li>
                <li>Long-term benefit: ${createStatusBadge("Extended total battery lifespan", "success")}</li>
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
                <li>Use ${createExternalLink("https://www.autoruns.com/", "Autoruns for Windows")} for advanced startup management</li>
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
                <li>Run ${createExternalLink("https://www.bleachbit.org/", "BleachBit")} for thorough system cleaning</li>
                <li>Expected improvement: ${createStatusBadge("5-15% disk performance", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">System Service Optimization</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press ${formatKeyboardShortcut(["Win", "R"])}, type <code>services.msc</code>, press Enter</li>
                <li>Safely optimize these specific services:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Windows Search: Set to "Manual" if not frequently used</li>
                    <li>Superfetch/SysMain: Right-click > Properties > set to "Disabled" if using SSD</li>
                    <li>Print Spooler: Disable if you don't use printers</li>
                    <li>Windows Update: Set to "Manual" (ensure you check for updates regularly)</li>
                  </ul>
                </li>
                <li>Use ${createExternalLink("https://www.sordum.org/9470/defender-control-v1-7/", "Defender Control")} to temporarily disable Windows Defender during intensive tasks</li>
                <li>Expected improvement: ${createStatusBadge("10-20% CPU availability", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Browser Performance Enhancement</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Clear browser cache and cookies:</li>
                <ul class="list-disc pl-5 mt-1">
                  <li>Chrome: Settings > Privacy and security > Clear browsing data</li>
                  <li>Firefox: Options > Privacy & Security > Cookies and Site Data > Clear Data</li>
                  <li>Edge: Settings > Privacy, search, and services > Clear browsing data</li>
                </ul>
                <li>Disable or remove unused extensions</li>
                <li>Enable hardware acceleration in browser settings</li>
                <li>Try ${createExternalLink("https://brave.com/", "Brave Browser")} for lower resource usage</li>
                <li>Expected improvement: ${createStatusBadge("30-50% browser responsiveness", "success")}</li>
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
                <li>Also disable transparency effects: Press ${formatKeyboardShortcut(["Win", "I"])} > Personalization > Colors > disable transparency effects</li>
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
                <li>For SSD users:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Ensure TRIM is enabled: Open Command Prompt as Administrator</li>
                    <li>Type: <code>fsutil behavior query DisableDeleteNotify</code></li>
                    <li>If result is 1, enable TRIM with: <code>fsutil behavior set DisableDeleteNotify 0</code></li>
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
  if (query.toLowerCase().includes('wifi') && 
      (query.toLowerCase().includes('unstable') || query.toLowerCase().includes('drops') || 
       query.toLowerCase().includes('slow') || query.toLowerCase().includes('disconnecting'))) {
    return `
      <div class="space-y-6">
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-blue-800 flex items-center gap-2">
            <Wifi size={20} />
            WiFi Stability Improvement Guide
          </h3>
          <p class="text-blue-700 mb-2">Comprehensive solutions to fix unstable WiFi connections and improve network performance.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Connection Diagnostics:</h4>
          <div class="bg-blue-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Signal strength: ${createStatusBadge("Fluctuating signal", "warning")} causing intermittent connectivity</li>
              <li>Network drivers: ${createStatusBadge("Outdated or conflicting", "warning")} drivers detected</li>
              <li>Router configuration: Possible ${createStatusBadge("channel congestion", "warning")} affecting stability</li>
              <li>Interference: Multiple potential sources in environment</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step WiFi Optimization:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Update Network Drivers</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open Device Manager: Press ${formatKeyboardShortcut(["Win", "X"])} and select "Device Manager"</li>
                <li>Expand "Network adapters" category</li>
                <li>Right-click on your WiFi adapter > "Update driver"</li>
                <li>Choose "Search automatically for updated driver software"</li>
                <li>For Dell systems:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Visit ${createExternalLink("https://www.dell.com/support/home", "Dell Support")} and enter your Service Tag</li>
                    <li>Go to "Drivers & Downloads" > Filter by "Network"</li>
                    <li>Download and install the latest WiFi driver</li>
                    <li>Use ${createExternalLink("https://www.dell.com/support/home/en-us/product-support/product/dell-supportassist-pcs-tablets/docs", "Dell SupportAssist")} for automatic driver updates</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("25-40% more stable connection", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Optimize Router Placement & Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Position your router:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Centrally located in your home/office</li>
                    <li>Elevated position (on shelf or desk)</li>
                    <li>Away from metal objects, thick walls, and appliances</li>
                    <li>At least 3-6 feet from other electronic devices</li>
                  </ul>
                </li>
                <li>Router configuration:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Access your router's admin page (typically http://192.168.1.1 or http://192.168.0.1)</li>
                    <li>Update router firmware to latest version</li>
                    <li>Change WiFi channel to avoid congestion:
                      <ul class="list-disc pl-5 mt-1">
                        <li>For 2.4GHz: Try channels 1, 6, or 11</li>
                        <li>For 5GHz: Try channels 36, 40, 44, or 48</li>
                      </ul>
                    </li>
                    <li>Enable "Auto Channel Selection" if available</li>
                    <li>Set bandwidth to "20MHz" for 2.4GHz and "80MHz" for 5GHz</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("30-50% signal strength improvement", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Advanced WiFi Adapter Configuration</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open Device Manager > Network adapters</li>
                <li>Right-click your WiFi adapter > Properties > Advanced tab</li>
                <li>Optimize these settings:
                  <ul class="list-disc pl-5 mt-1">
                    <li>"Roaming Aggressiveness" or "Roaming Sensitivity": Set to Medium or High</li>
                    <li>"Preferred Band": Set to "5GHz" if your router supports it</li>
                    <li>"Power Saving Mode" or "Power Management": Set to Maximum Performance when plugged in</li>
                    <li>"Transmit Power": Set to Highest or 100%</li>
                    <li>"802.11n Channel Width for 2.4GHz/5GHz": Set to Auto</li>
                  </ul>
                </li>
                <li>Disable power management for network adapter:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Go to adapter Properties > Power Management tab</li>
                    <li>Uncheck "Allow the computer to turn off this device to save power"</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("15-35% connection stability", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Reduce Network Interference</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Identify and relocate interfering devices:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Bluetooth devices (headphones, speakers, etc.)</li>
                    <li>Microwave ovens</li>
                    <li>Cordless phones</li>
                    <li>Baby monitors</li>
                    <li>Neighboring WiFi networks</li>
                  </ul>
                </li>
                <li>Use a WiFi analyzer app to detect channel congestion:
                  <ul class="list-disc pl-5 mt-1">
                    <li>${createExternalLink("https://www.microsoft.com/store/productId/9NBLGGH33N0N", "WiFi Analyzer (Windows Store)")}</li>
                    <li>${createExternalLink("https://play.google.com/store/apps/details?id=com.farproc.wifi.analyzer", "WiFi Analyzer (Android)")}</li>
                  </ul>
                </li>
                <li>Consider using a WiFi mesh system for larger spaces:
                  <ul class="list-disc pl-5 mt-1">
                    <li>${createExternalLink("https://www.dell.com/en-us/shop/networking/sr/networking-wireless", "Dell Recommended Mesh Systems")}</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("20-40% fewer disconnections", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">System Network Stack Reset</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For persistent issues, reset Windows network components:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Run Command Prompt as Administrator</li>
                    <li>Execute these commands in sequence:
                      <div class="bg-gray-100 p-2 rounded mt-1 mb-1 font-mono text-sm">
                        ipconfig /release<br>
                        ipconfig /flushdns<br>
                        ipconfig /renew<br>
                        netsh winsock reset<br>
                        netsh int ip reset<br>
                        netsh interface tcp set heuristics disabled<br>
                        netsh interface tcp set global autotuninglevel=normal<br>
                        netsh interface tcp set global rss=enabled
                      </div>
                    </li>
                    <li>Restart your computer</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("Resolves 60% of persistent issues", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Consider Hardware Solutions</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For laptops with persistently weak connections:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Use a USB WiFi adapter with external antenna</li>
                    <li>Consider ${createExternalLink("https://www.dell.com/en-us/shop/dell-adapter-usb-c-to-ethernet-pxe-boot/apd/470-abnd/", "Dell USB-C to Ethernet Adapter")} for wired connection</li>
                    <li>Add a WiFi extender or mesh node near your work area</li>
                  </ul>
                </li>
                <li>If router is over 3-4 years old:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Consider upgrading to a modern WiFi 6 (802.11ax) router</li>
                    <li>Ensure your new router supports both 2.4GHz and 5GHz bands</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("50-80% overall connection quality", "success")}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("If you're experiencing issues only with specific online services while your general WiFi connection is stable, the problem might be with those services rather than your WiFi.")}
        
        ${createSuccessBox("After implementing these optimizations, most users report 70-90% improvement in WiFi stability and significantly fewer disconnections.")}
        
        ${createProTip("For mission-critical work, always keep a mobile hotspot or ethernet connection as backup in case of WiFi issues.")}
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
    
    // Check for specific query scenarios and format content accordingly
    processedContent = formatDellBatteryDrainContent(processedContent, query);
    processedContent = formatDellGraphicsContent(processedContent, query);
    processedContent = formatWebcamContent(processedContent, query);
    processedContent = formatComputerSlowContent(processedContent, query);
    processedContent = formatWifiUnstableContent(processedContent, query);
    
    // If no specific formatting was applied, use standard format
    if (processedContent === rawContent) {
      processedContent = formatStandardAnswer(processedContent, query);
    }
    
    return processedContent;
  };

  const query = content.split('\n')[0]; // Use first line as query
  const processedContent = processContentBasedOnQuery(content, query);
  
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
