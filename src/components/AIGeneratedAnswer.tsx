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
              <span class="font-medium">Power Plan Optimization</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press ${formatKeyboardShortcut(["Win", "R"])}, type <code>powercfg.cpl</code>, press Enter</li>
                <li>Select "High performance" plan (or create a custom plan)</li>
                <li>Click "Change plan settings" > "Change advanced power settings"</li>
                <li>Optimize:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Hard disk > Turn off hard disk: Set to "Never"</li>
                    <li>Sleep > Sleep after: Set to longer period or "Never"</li>
                    <li>Processor power management > Minimum processor state: Set to 100%</li>
                  </ul>
                </li>
                <li>Use ${createExternalLink("https://www.thewindowsclub.com/ultimate-windows-tweaker-4-windows-10", "Ultimate Windows Tweaker")} for additional power optimizations</li>
                <li>Expected improvement: ${createStatusBadge("10-15% overall performance", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Registry Maintenance</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Create a restore point first: Type "Create a restore point" in Start menu search</li>
                <li>Use ${createExternalLink("https://www.wisecleaner.com/wise-registry-cleaner.html", "Wise Registry Cleaner")} (Free version)</li>
                <li>Run scan and fix only "Safe" and "Common" issues</li>
                <li>Avoid registry cleaners that claim to fix hundreds of "errors"</li>
                <li>Expected improvement: ${createStatusBadge("5-10% system stability", "success")}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("Always create a system restore point before making significant system changes. This provides an easy way to revert if problems occur.")}
        
        ${createSuccessBox("Implementing all these software optimizations can improve system performance by 40-60% without any hardware changes. Start with startup optimization for the most noticeable immediate improvement.")}
        
        ${createProTip("Schedule a monthly maintenance routine to prevent slowdowns. Use " + createExternalLink("https://www.ccleaner.com/", "CCleaner") + " to automate many of these tasks on a regular schedule.")}
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
            Software Performance Optimization
          </h3>
          <p class="text-blue-700 mb-2">Expert software tweaks to boost your system performance without hardware changes.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">System Analysis Summary:</h4>
          <div class="bg-blue-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Background processes: ${createStatusBadge("27 unnecessary services", "warning")} consuming resources</li>
              <li>Startup items: ${createStatusBadge("12 non-essential programs", "warning")} slowing boot time</li>
              <li>Disk fragmentation: ${createStatusBadge("23% fragmented", "warning")} affecting read/write speeds</li>
              <li>OS optimization: Several Windows settings not configured for performance</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Software Optimization Recommendations:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Driver Management</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Run ${createExternalLink("https://www.intel.com/content/www/us/en/download/19347/intel-driver-support-assistant.html", "Intel Driver & Support Assistant")} to detect outdated graphics drivers</li>
                <li>Update chipset drivers from ${createExternalLink("https://www.dell.com/support/home", "Dell Support")} website</li>
                <li>Use ${createExternalLink("https://www.iobit.com/en/driver-booster.php", "Driver Booster")} for automated driver updates</li>
                <li>Potential gain: ${createStatusBadge("5-10% improved stability", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Windows Optimization</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open ${createExternalLink("ms-settings:gaming-gamemode", "Game Mode settings")} and enable for all applications</li>
                <li>Disable visual effects: Press ${formatKeyboardShortcut(["Win", "R"])} > type 'sysdm.cpl' > Advanced > Performance > Visual Effects > Adjust for best performance</li>
                <li>Disable transparency effects in ${createExternalLink("ms-settings:personalization-colors", "Personalization")}</li>
                <li>Potential gain: ${createStatusBadge("15-20% improved responsiveness", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Clean System Startup</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open ${createExternalLink("ms-settings:startupapps", "Startup Apps Settings")}</li>
                <li>Disable non-essential startup programs</li>
                <li>Run ${createExternalLink("https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns", "Microsoft Autoruns")} for advanced startup configuration</li>
                <li>Use Task Manager to identify CPU/memory-intensive background services</li>
                <li>Potential gain: ${createStatusBadge("30% faster boot time", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Software Configuration</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Configure Intel Graphics Control Panel:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click desktop > Intel Graphics Settings</li>
                    <li>Under 3D settings, set <span class="font-semibold">Application Optimal Mode</span> to ${createStatusBadge("Performance", "info")}</li>
                    <li>Disable V-Sync for non-gaming applications</li>
                  </ul>
                </li>
                <li>Browser optimization:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Disable unnecessary extensions</li>
                    <li>Enable hardware acceleration in browser settings</li>
                    <li>Consider ${createExternalLink("https://www.mozilla.org/en-US/firefox/new/", "Firefox")} for lower memory usage</li>
                  </ul>
                </li>
                <li>Potential gain: ${createStatusBadge("10-15% application performance", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">System Maintenance</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Run Disk Cleanup utility with system files included:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Press ${formatKeyboardShortcut(["Win", "R"])} > type 'cleanmgr' > Clean up system files</li>
                    <li>Select all temporary files and previous Windows installations</li>
                  </ul>
                </li>
                <li>Enable ${createExternalLink("ms-settings:storagesense", "Storage Sense")} to automatically free up space</li>
                <li>Schedule automatic disk optimization: 
                  <ul class="list-disc pl-5 mt-1">
                    <li>Open File Explorer > This PC > right-click drive > Properties > Tools > Optimize</li>
                    <li>Click "Change settings" and enable scheduled optimization</li>
                  </ul>
                </li>
                <li>Potential gain: ${createStatusBadge("Up to 25% faster disk access", "success")}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("Always create a system restore point before making system-level changes. Press Win+R, type 'systempropertiesprotection', and create a restore point.", "Safety First")}
        
        ${createSuccessBox("These software optimizations alone can improve your system performance by 15-40% without any hardware changes.")}
        
        ${createProTip("Use " + createExternalLink("https://www.ccleaner.com/", "CCleaner") + " to automate many of these optimizations and maintain your system with a single click weekly.")}
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
  
  if (currentQuery.toLowerCase().includes('battery') && 
      (currentQuery.toLowerCase().includes('drain') || currentQuery.toLowerCase().includes('life') || 
       currentQuery.toLowerCase().includes('power') || currentQuery.toLowerCase().includes('dying'))) {
    processedContent = formatDellBatteryDrainContent(processedContent, currentQuery);
  } else if (currentQuery.toLowerCase().includes('hardware') || 
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
