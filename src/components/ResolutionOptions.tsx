
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, ThumbsUp, Info, ExternalLink, BatteryFull, Wifi, Monitor, Activity, Cpu, HardDrive } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

export interface ResolutionPathOption {
  key: string;
  name: string;
  icon: string;
  description: string;
  confidence: number;
  sources: number;
  detail: string;
  links?: {
    text: string;
    url: string;
  }[];
}

interface ResolutionOptionsProps {
  options: ResolutionPathOption[];
  onSelectPath: (pathKey: string) => void;
  selectedPath: string;
  isVisible: boolean;
}

const ResolutionOptions: React.FC<ResolutionOptionsProps> = ({ 
  options, 
  onSelectPath, 
  selectedPath,
  isVisible
}) => {
  if (!isVisible || options.length === 0) {
    return null;
  }

  // Get query from URL to check for specific query types
  const urlParams = new URLSearchParams(window.location.search);
  const currentQuery = urlParams.get('q') || '';
  
  // Specific query type checks
  const isBatteryQuery = currentQuery.toLowerCase().includes('battery') && 
                         (currentQuery.toLowerCase().includes('drain') || 
                          currentQuery.toLowerCase().includes('life') || 
                          currentQuery.toLowerCase().includes('dying'));
                          
  const isWifiQuery = currentQuery.toLowerCase().includes('wifi') ||
                      currentQuery.toLowerCase().includes('wi-fi') ||
                      currentQuery.toLowerCase().includes('wireless') ||
                      currentQuery.toLowerCase().includes('unstable');
                      
  const isDellGraphicsQuery = currentQuery.toLowerCase().includes('dell') && 
                             currentQuery.toLowerCase().includes('graphics');
                             
  const isComputerSlowQuery = currentQuery.toLowerCase().includes('computer') && 
                             currentQuery.toLowerCase().includes('slow');
                            
  const isWebcamQuery = currentQuery.toLowerCase().includes('webcam') ||
                        currentQuery.toLowerCase().includes('camera');

  // Custom options for Dell battery drain scenario
  const batteryDrainOptions = [
    {
      key: "power-settings",
      name: "Power Settings Optimization",
      icon: "⚡",
      description: "Optimize Dell power settings and Windows power management for maximum battery efficiency.",
      confidence: 96,
      sources: 8,
      detail: "Configure Dell Power Manager and Windows power settings for optimal battery life.",
      links: [
        {
          text: "Dell Power Manager Guide",
          url: "https://www.dell.com/support/kbdoc/en-us/000131081/power-manager-power-settings-in-windows"
        }
      ]
    },
    {
      key: "background-apps",
      name: "Background Application Management",
      icon: "🔍",
      description: "Identify and control battery-draining background processes and applications.",
      confidence: 91,
      sources: 6,
      detail: "Manage startup apps and background processes to reduce unnecessary battery drain.",
      links: [
        {
          text: "Battery Usage by App",
          url: "ms-settings:battery"
        }
      ]
    },
    {
      key: "hardware-calibration",
      name: "Battery Maintenance",
      icon: "🔋",
      description: "Dell-specific battery calibration and hardware optimization techniques.",
      confidence: 88,
      sources: 5,
      detail: "Proper battery maintenance and calibration procedures for Dell laptops.",
      links: [
        {
          text: "Dell Battery Calibration Guide",
          url: "https://www.dell.com/support/kbdoc/en-us/000130881/resetting-the-battery-on-a-dell-laptop"
        }
      ]
    }
  ];

  // Custom options for Wifi unstable scenario
  const wifiUnstableOptions = [
    {
      key: "driver-update",
      name: "Driver & Firmware Update",
      icon: "📡",
      description: "Update wireless adapter drivers and router firmware to fix compatibility issues.",
      confidence: 94,
      sources: 9,
      detail: "Latest drivers often include fixes for connectivity and stability issues.",
      links: [
        {
          text: "Dell Network Drivers",
          url: "https://www.dell.com/support/home/en-us/drivers/driversdetails?driverid=57fcj"
        }
      ]
    },
    {
      key: "wireless-optimization",
      name: "Wireless Environment Optimization",
      icon: "📶",
      description: "Analyze and optimize wireless signal environment and router configuration.",
      confidence: 89,
      sources: 7,
      detail: "Adjust wireless channel, band settings, and router positioning for optimal signal.",
      links: [
        {
          text: "Dell Wireless Troubleshooting",
          url: "https://www.dell.com/support/kbdoc/en-us/000132223/how-to-troubleshoot-wireless-network-connectivity-issues"
        }
      ]
    },
    {
      key: "adapter-settings",
      name: "Adapter Configuration",
      icon: "⚙️",
      description: "Optimize wireless adapter power settings and advanced properties.",
      confidence: 92,
      sources: 8,
      detail: "Configure wireless adapter for reliability over power efficiency.",
      links: [
        {
          text: "Windows Network Settings",
          url: "ms-settings:network-status"
        }
      ]
    }
  ];

  // Custom options for Dell graphics performance scenario
  const dellGraphicsOptions = [
    {
      key: "driver-update",
      name: "Driver Optimization",
      icon: "💻",
      description: "Install the latest Dell-optimized graphics drivers for your specific model.",
      confidence: 97,
      sources: 12,
      detail: "Official Dell graphics drivers ensure maximum compatibility and performance.",
      links: [
        {
          text: "Dell Graphics Drivers",
          url: "https://www.dell.com/support/home/en-us/product-support/product/dell-update-service/drivers"
        }
      ]
    },
    {
      key: "hardware-settings",
      name: "Hardware Acceleration Settings",
      icon: "🔧",
      description: "Fine-tune hardware-specific settings for optimal graphics performance.",
      confidence: 92,
      sources: 8,
      detail: "Configure GPU settings to prioritize performance over power efficiency.",
      links: [
        {
          text: "Dell Performance Guide",
          url: "https://www.dell.com/support/kbdoc/en-us/000139305/how-to-improve-computer-performance-with-dell-performance-guide"
        }
      ]
    },
    {
      key: "software-optimization",
      name: "Software Environment Tuning",
      icon: "🚀",
      description: "Optimize Windows settings and background processes for graphics-intensive applications.",
      confidence: 88,
      sources: 7,
      detail: "Adjust Windows settings to prioritize graphical processing and performance.",
      links: [
        {
          text: "Graphics Optimization Guide",
          url: "https://www.dell.com/support/kbdoc/en-us/000130095/how-to-improve-video-playback-performance-on-your-dell-computer"
        }
      ]
    }
  ];

  // Custom options for Computer Slow scenario
  const computerSlowOptions = [
    {
      key: "startup-optimization",
      name: "Startup & System Optimization",
      icon: "⏱️",
      description: "Streamline startup processes and optimize system configuration for faster performance.",
      confidence: 94,
      sources: 11,
      detail: "Eliminate unnecessary startup items and optimize Windows settings for speed.",
      links: [
        {
          text: "Windows Performance Guide",
          url: "https://support.microsoft.com/en-us/windows/tips-to-improve-pc-performance-in-windows-b3b3ef5b-5953-fb6a-2528-4bbed82fba96"
        }
      ]
    },
    {
      key: "memory-management",
      name: "Memory & Resource Management",
      icon: "📊",
      description: "Optimize RAM usage and system resources to eliminate performance bottlenecks.",
      confidence: 90,
      sources: 8,
      detail: "Improve how your system allocates and manages memory and processing resources.",
      links: [
        {
          text: "Windows Memory Diagnostics",
          url: "ms-settings:troubleshoot"
        }
      ]
    },
    {
      key: "storage-optimization",
      name: "Storage Performance Tuning",
      icon: "💾",
      description: "Optimize disk usage, clear system clutter, and improve storage performance.",
      confidence: 89,
      sources: 9,
      detail: "Eliminate disk bottlenecks and improve overall system responsiveness.",
      links: [
        {
          text: "Disk Cleanup Utility",
          url: "ms-settings:storagesense"
        }
      ]
    }
  ];

  // Custom options for Webcam/Camera issues
  const webcamOptions = [
    {
      key: "driver-updates",
      name: "Driver & Firmware Solutions",
      icon: "📷",
      description: "Update or reinstall camera drivers to resolve compatibility and detection issues.",
      confidence: 95,
      sources: 10,
      detail: "Most webcam problems are resolved with proper driver management.",
      links: [
        {
          text: "Device Manager",
          url: "devmgmt.msc"
        }
      ]
    },
    {
      key: "permission-settings",
      name: "Privacy & Permission Settings",
      icon: "🔒",
      description: "Adjust Windows privacy settings and application permissions for your camera.",
      confidence: 93,
      sources: 8,
      detail: "Ensure proper permissions are set for applications to access your camera.",
      links: [
        {
          text: "Camera Privacy Settings",
          url: "ms-settings:privacy-webcam"
        }
      ]
    },
    {
      key: "hardware-troubleshooting",
      name: "Hardware Connection Checks",
      icon: "🔌",
      description: "Verify physical connections and hardware functionality for external cameras.",
      confidence: 87,
      sources: 7,
      detail: "Diagnose physical and connection-related issues with your webcam.",
      links: [
        {
          text: "Hardware Troubleshooter",
          url: "ms-settings:troubleshoot"
        }
      ]
    }
  ];

  // Function to determine color based on confidence level
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 75) return "text-blue-500";
    if (confidence >= 60) return "text-amber-500";
    return "text-orange-500";
  };

  // Use appropriate options based on query type
  let displayOptions = options;
  let headerText = "Here are the most effective approaches to resolve your issue, based on analysis of similar cases.";
  let headerIcon = <MessageCircleQuestion className="text-[#0076CE] mr-2" size={20} />;
  
  if (isBatteryQuery) {
    displayOptions = batteryDrainOptions;
    headerText = "Here are the most effective approaches to extend your Dell laptop's battery life.";
    headerIcon = <BatteryFull className="text-[#538234] mr-2" size={20} />;
  } else if (isWifiQuery) {
    displayOptions = wifiUnstableOptions;
    headerText = "Here are the most effective approaches to resolve your WiFi connectivity issues.";
    headerIcon = <Wifi className="text-[#445bc5] mr-2" size={20} />;
  } else if (isDellGraphicsQuery) {
    displayOptions = dellGraphicsOptions;
    headerText = "Here are the most effective approaches to improve your Dell graphics performance.";
    headerIcon = <Monitor className="text-[#0076CE] mr-2" size={20} />;
  } else if (isComputerSlowQuery) {
    displayOptions = computerSlowOptions;
    headerText = "Here are the most effective approaches to improve your computer's performance.";
    headerIcon = <Activity className="text-[#d97706] mr-2" size={20} />;
  } else if (isWebcamQuery) {
    displayOptions = webcamOptions;
    headerText = "Here are the most effective approaches to resolve your webcam issues.";
    headerIcon = <Cpu className="text-[#10b981] mr-2" size={20} />;
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8">
      <div className="rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          {headerIcon}
          <h2 className="text-lg font-semibold text-black">Solution Approaches</h2>
        </div>
        
        <p className="text-gray-600 mb-6">{headerText}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayOptions.map((option) => (
            <div 
              key={option.key}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer h-full flex flex-col ${
                selectedPath === option.key 
                  ? 'border-[#0076CE] bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSelectPath(option.key)}
            >
              <div className="flex items-start mb-auto">
                <div className="text-2xl mr-3">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-black mb-1">{option.name}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center mb-2">
                  <ThumbsUp size={16} className={`${getConfidenceColor(option.confidence)} mr-2`} />
                  <span className={`text-sm ${getConfidenceColor(option.confidence)}`}>
                    {option.confidence}% Confidence
                  </span>
                </div>
                
                <div className="flex items-center mb-2">
                  <Info size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{option.sources} Sources</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{option.detail}</p>
                
                {option.links && option.links.length > 0 && (
                  <div className="mt-2">
                    {option.links.map((link, index) => (
                      <a 
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} className="mr-1" />
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ResolutionOptions;
