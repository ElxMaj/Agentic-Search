
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
      (query.toLowerCase().includes('graphics') || query.toLowerCase().includes('performance'))) {
    return `
      <div class="space-y-6">
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-blue-800 flex items-center gap-2">
            <Monitor size={20} />
            Dell Graphics Performance Optimization
          </h3>
          <p class="text-blue-700 mb-2">Comprehensive solutions to boost your Dell system's graphics capabilities.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Graphics Performance Analysis:</h4>
          <div class="bg-blue-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Driver status: ${createStatusBadge("Outdated graphics drivers", "warning")} limiting performance</li>
              <li>System configuration: ${createStatusBadge("Sub-optimal power profile", "warning")} restricting GPU capabilities</li>
              <li>Hardware utilization: Improper GPU selection for applications</li>
              <li>Software settings: Default configurations not optimized for performance</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Performance Enhancement:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Update Dell-Specific Graphics Drivers</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Visit ${createExternalLink("https://www.dell.com/support/home", "Dell Support")} and enter your Service Tag</li>
                <li>Navigate to "Drivers & Downloads" > Filter for "Video"</li>
                <li>Download both Intel and NVIDIA/AMD drivers if applicable</li>
                <li>Uninstall current graphics drivers through:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Control Panel > Programs > Uninstall a program</li>
                    <li>Or use ${createExternalLink("https://www.guru3d.com/files-details/display-driver-uninstaller-download.html", "Display Driver Uninstaller")} for complete removal</li>
                  </ul>
                </li>
                <li>Install downloaded Dell-certified drivers</li>
                <li>Expected improvement: ${createStatusBadge("20-30% performance gain", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Configure Dell Power Management</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Right-click battery icon > Power Options</li>
                <li>Select "High performance" plan</li>
                <li>Click "Change plan settings" > "Change advanced power settings"</li>
                <li>Configure these specific settings:
                  <ul class="list-disc pl-5 mt-1">
                    <li>PCI Express > Link State Power Management: ${createStatusBadge("Off", "info")}</li>
                    <li>Processor power management > Minimum processor state: ${createStatusBadge("100%", "info")} when plugged in</li>
                    <li>Graphics settings > Graphics performance policy: ${createStatusBadge("Maximum Performance", "info")}</li>
                  </ul>
                </li>
                <li>Open ${createExternalLink("https://www.dell.com/support/home/en-us/drivers/driversdetails?driverid=j69f0", "Dell Power Manager")} > Thermal Management</li>
                <li>Select "Ultra Performance" when plugged in</li>
                <li>Expected improvement: ${createStatusBadge("15-25% performance boost", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Optimize Graphics Control Panel Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For NVIDIA GPUs:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click desktop > NVIDIA Control Panel</li>
                    <li>Manage 3D Settings > Global Settings</li>
                    <li>Power Management Mode: ${createStatusBadge("Prefer Maximum Performance", "info")}</li>
                    <li>Texture filtering - Quality: ${createStatusBadge("High performance", "info")}</li>
                    <li>Threaded optimization: ${createStatusBadge("On", "info")}</li>
                    <li>Virtual Reality pre-rendered frames: 1</li>
                  </ul>
                </li>
                <li>For AMD GPUs:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click desktop > AMD Radeon Software</li>
                    <li>Go to "Performance" tab > "Tuning"</li>
                    <li>Enable "GPU Tuning" and select "Gaming" preset</li>
                  </ul>
                </li>
                <li>For Intel Graphics:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click desktop > Intel Graphics Command Center</li>
                    <li>Go to "System" > "Power"</li>
                    <li>Select "Maximum Performance" when plugged in</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("10-20% performance increase", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Configure Application-Specific GPU Selection</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open Windows Settings > System > Display > Graphics settings</li>
                <li>Click "Browse" and locate your graphics-intensive applications</li>
                <li>Click "Options" and select ${createStatusBadge("High performance", "info")} for each app</li>
                <li>For NVIDIA systems:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Open NVIDIA Control Panel > Manage 3D Settings > Program Settings</li>
                    <li>Add your applications and set "Preferred graphics processor" to ${createStatusBadge("High-performance NVIDIA processor", "info")}</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("25-40% app-specific performance", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Optimize Windows for Graphics Performance</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Press ${formatKeyboardShortcut(["Win", "R"])}, type "sysdm.cpl", press Enter</li>
                <li>Go to Advanced tab > Performance > Settings</li>
                <li>Select "Adjust for best performance" or customize:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Uncheck "Animate windows when minimizing and maximizing"</li>
                    <li>Uncheck "Animations in the taskbar"</li>
                    <li>Uncheck "Fade or slide menus into view"</li>
                  </ul>
                </li>
                <li>Enable Hardware-accelerated GPU scheduling:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Settings > System > Display > Graphics Settings</li>
                    <li>Turn on "Hardware-accelerated GPU scheduling" (Windows 10 v2004+)</li>
                  </ul>
                </li>
                <li>Expected improvement: ${createStatusBadge("5-15% smoother performance", "success")}</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Maintain Optimal System Temperature</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For Dell laptops:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Use on hard, flat surfaces to ensure proper ventilation</li>
                    <li>Consider a cooling pad for intensive graphics workloads</li>
                    <li>Clean cooling vents regularly with compressed air</li>
                  </ul>
                </li>
                <li>For Dell desktops:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Ensure proper case airflow with clean filters</li>
                    <li>Monitor CPU/GPU temperatures with ${createExternalLink("https://www.cpuid.com/softwares/hwmonitor.html", "HWMonitor")}</li>
                    <li>Consider adding supplemental cooling for high-end GPUs</li>
                  </ul>
                </li>
                <li>Potential benefit: ${createStatusBadge("Prevents thermal throttling", "success")} and extends hardware lifespan</li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("After driver updates, a complete system restart is essential. Some settings may revert to defaults after driver installation.")}
        
        ${createSuccessBox("These optimizations can increase graphics performance by 30-50% in demanding applications and games on Dell systems.")}
        
        ${createProTip("For advanced users, GPU undervolting can further improve thermal performance, but should only be attempted with appropriate knowledge and tools.")}
      </div>
    `;
  }
  
  return content;
};

const formatWebcamContent = (content: string, query: string): string => {
  if (query.toLowerCase().includes('webcam') || content.toLowerCase().includes('webcam') || 
      content.toLowerCase().includes('camera')) {
    return `
      <div class="space-y-6">
        <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r">
          <h3 class="font-bold text-lg text-emerald-800 flex items-center gap-2">
            <Cpu size={20} />
            Complete Webcam Resolution Guide
          </h3>
          <p class="text-emerald-700 mb-2">A comprehensive approach to resolving the most common webcam issues.</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 class="font-semibold text-gray-800 mb-2">Webcam Diagnostic Results:</h4>
          <div class="bg-emerald-50 p-4 rounded-lg mb-4">
            <ul class="list-disc pl-5 space-y-2">
              <li>Driver status: ${createStatusBadge("Possible driver conflict", "warning")} detected</li>
              <li>System permissions: ${createStatusBadge("Application permissions", "warning")} require verification</li>
              <li>Hardware status: Connectivity and detection analysis needed</li>
              <li>Software integration: Multiple applications trying to access the camera</li>
            </ul>
          </div>
          
          <h4 class="font-semibold text-gray-800 mb-2">Step-by-Step Webcam Troubleshooting:</h4>
          <ol class="list-decimal pl-5 space-y-4">
            <li>
              <span class="font-medium">Verify Webcam Hardware Status</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For external webcams:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Check physical USB connection and try different USB ports</li>
                    <li>Connect ${createStatusBadge("directly to computer", "info")} instead of through a USB hub</li>
                    <li>Check for visible LED indicator on webcam when connected</li>
                    <li>Verify cable isn't damaged or stretched</li>
                  </ul>
                </li>
                <li>For built-in webcams:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Check for physical privacy shutter that might be closed</li>
                    <li>Verify webcam isn't disabled in BIOS (reboot and access BIOS settings)</li>
                    <li>Check if webcam toggle key is activated (often F8 or Fn+camera icon)</li>
                  </ul>
                </li>
                <li>Simple test: Open ${createExternalLink("ms-cameraapp:", "Windows Camera app")} to verify basic functionality</li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Update and Reset Webcam Drivers</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open Device Manager:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Press ${formatKeyboardShortcut(["Win", "X"])} and select "Device Manager"</li>
                    <li>Expand "Cameras" or "Imaging devices" category</li>
                  </ul>
                </li>
                <li>If webcam is visible:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Right-click webcam > "Update driver" > "Search automatically"</li>
                    <li>If not resolved, right-click > "Uninstall device" (check "Delete driver")</li>
                    <li>Restart computer to reinstall drivers</li>
                  </ul>
                </li>
                <li>If webcam not visible:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Scan for hardware changes (right-click on Device Manager root node)</li>
                    <li>Check "Universal Serial Bus controllers" for unknown devices</li>
                    <li>Look for devices with warning icons and update those drivers</li>
                  </ul>
                </li>
                <li>Download specific webcam drivers:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Logitech webcams: ${createExternalLink("https://support.logi.com/hc/en-us/articles/360025141394", "Logitech Support")}</li>
                    <li>Microsoft webcams: ${createExternalLink("https://support.microsoft.com/en-us/surface/download-drivers-and-firmware-for-surface-09bb2e09-2a4b-cb69-0951-078a7739e120", "Microsoft Support")}</li>
                    <li>Dell laptops: ${createExternalLink("https://www.dell.com/support/home", "Dell Support")} (enter service tag)</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Configure Windows 10/11 Privacy Settings</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Open ${createExternalLink("ms-settings:privacy-webcam", "Camera privacy settings")}</li>
                <li>Ensure "Camera access" is ${createStatusBadge("On", "on")} at system level</li>
                <li>Enable "Allow apps to access your camera"</li>
                <li>Review individual app permissions and enable for needed applications</li>
                <li>For corporate devices, check with IT if camera access is policy-restricted</li>
                <li>Additional settings to verify:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Windows Security > App & browser control > Exploit protection > Check "force randomization" isn't blocking camera</li>
                    <li>Group Policy Editor (for Pro/Enterprise): Verify no camera restrictions</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Address Application-Specific Issues</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>For Microsoft Teams:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Check settings > Devices > Camera selection</li>
                    <li>Clear Teams cache: %appdata%\\Microsoft\\Teams\\Cache</li>
                    <li>Try ${createExternalLink("https://teams.microsoft.com", "Teams web version")} to isolate app vs. hardware issue</li>
                  </ul>
                </li>
                <li>For Zoom:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Settings > Video > Camera selection</li>
                    <li>Try "Original Sound" option if video works but not audio</li>
                    <li>Check "Turn off my video when joining meeting" setting</li>
                  </ul>
                </li>
                <li>For browser-based applications:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Chrome: Settings > Privacy and security > Site settings > Camera</li>
                    <li>Edge: Settings > Cookies and site permissions > Camera</li>
                    <li>Firefox: Options > Privacy & Security > Permissions > Camera</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Resolve Resource Conflicts</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Close applications that might be using the webcam:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Check Task Manager for camera-using apps or processes</li>
                    <li>Common conflicts: Skype, Teams, Discord, OBS Studio, Camera apps</li>
                  </ul>
                </li>
                <li>Verify antivirus/security software isn't blocking camera:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Temporarily disable third-party security software</li>
                    <li>Check security software settings for webcam protections</li>
                  </ul>
                </li>
                <li>Use this PowerShell command to restart camera service:
                  <div class="bg-gray-100 p-2 rounded mt-1 font-mono text-sm">
                    Stop-Service -Force -Name "FrameServer" ; Start-Service -Name "FrameServer"
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <span class="font-medium">Advanced Troubleshooting Options</span>
              <ul class="list-disc pl-5 mt-1 text-gray-700">
                <li>Run Windows Troubleshooter:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Settings > Update & Security > Troubleshoot > Additional troubleshooters</li>
                    <li>Select "Hardware and Devices" troubleshooter</li>
                  </ul>
                </li>
                <li>Check Windows Event Viewer for camera errors:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Open Event Viewer > Windows Logs > System</li>
                    <li>Filter for "Error" level events related to camera or imaging devices</li>
                  </ul>
                </li>
                <li>Reset camera component at system level:
                  <div class="bg-gray-100 p-2 rounded mt-1 font-mono text-sm">
                    Get-AppxPackage -AllUsers Microsoft.WindowsCamera | Reset-AppxPackage
                  </div>
                </li>
                <li>For persistent issues, consider:
                  <ul class="list-disc pl-5 mt-1">
                    <li>Windows System Restore to previous functional state</li>
                    <li>BIOS update from device manufacturer</li>
                    <li>Windows update to latest feature version</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ol>
        </div>
        
        ${createWarningBox("Never download camera drivers from unofficial sources as they may contain malware. Always use manufacturer websites.")}
        
        ${createSuccessBox("These comprehensive steps resolve over 90% of all webcam-related issues without requiring hardware replacement.")}
        
        ${createProTip("If your webcam works in some applications but not others, the issue is almost certainly app permissions or software conflicts rather than hardware failure.")}
      </div>
    `;
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
            <Activity size={20} />
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
    const isBatteryQuery = query.toLowerCase().includes('battery') && 
                          (query.toLowerCase().includes('drain') || 
                          query.toLowerCase().includes('life'));
                          
    const isWifiQuery = query.toLowerCase().includes('wifi') ||
                       query.toLowerCase().includes('wi-fi') ||
                       query.toLowerCase().includes('wireless') ||
                       query.toLowerCase().includes('unstable');
                       
    const isDellGraphicsQuery = query.toLowerCase().includes('dell') && 
                              query.toLowerCase().includes('graphics');
                              
    const isComputerSlowQuery = query.toLowerCase().includes('computer') && 
                               query.toLowerCase().includes('slow');
                               
    const isWebcamQuery = query.toLowerCase().includes('webcam') ||
                         query.toLowerCase().includes('camera');
    
    // Apply appropriate formatting based on query type
    if (isBatteryQuery) {
      processedContent = formatDellBatteryDrainContent(processedContent, query);
    } else if (isWifiQuery) {
      processedContent = formatWifiUnstableContent(processedContent, query);
    } else if (isDellGraphicsQuery) {
      processedContent = formatDellGraphicsContent(processedContent, query);
    } else if (isComputerSlowQuery) {
      processedContent = formatComputerSlowContent(processedContent, query);
    } else if (isWebcamQuery) {
      processedContent = formatWebcamContent(processedContent, query);
    } else {
      // Default formatting for other query types
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
