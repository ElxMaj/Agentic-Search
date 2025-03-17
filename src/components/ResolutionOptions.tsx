
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, ThumbsUp, Info, ExternalLink, BatteryFull, Wifi, Monitor, Clock, Camera } from 'lucide-react';
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

  // Get query from URL to check for specific query scenarios
  const urlParams = new URLSearchParams(window.location.search);
  const currentQuery = urlParams.get('q') || '';
  
  // Check for different query types
  const isBatteryQuery = currentQuery.toLowerCase().includes('battery') && 
                         (currentQuery.toLowerCase().includes('drain') || 
                          currentQuery.toLowerCase().includes('life') || 
                          currentQuery.toLowerCase().includes('dying'));
                          
  const isWifiQuery = currentQuery.toLowerCase().includes('wifi') ||
                      currentQuery.toLowerCase().includes('wi-fi') ||
                      currentQuery.toLowerCase().includes('wireless') ||
                      currentQuery.toLowerCase().includes('unstable');
                      
  const isGraphicsQuery = currentQuery.toLowerCase().includes('graphics') && 
                          currentQuery.toLowerCase().includes('dell');
                          
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
          text: "Wi-Fi Troubleshooting Guide",
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
  const graphicsPerformanceOptions = [
    {
      key: "driver-optimization",
      name: "Graphics Driver Optimization",
      icon: "🖥️",
      description: "Update and configure Dell-specific graphics drivers for optimal performance.",
      confidence: 95,
      sources: 12,
      detail: "The latest driver versions contain important performance enhancements and bug fixes.",
      links: [
        {
          text: "Dell Graphics Drivers",
          url: "https://www.dell.com/support/home/en-us/product-support/product/dell-g5-15-5590-laptop/drivers"
        }
      ]
    },
    {
      key: "performance-tuning",
      name: "Performance Profile Tuning",
      icon: "🚀",
      description: "Configure system and application settings to maximize graphics performance.",
      confidence: 93,
      sources: 10,
      detail: "Balance power and performance settings for optimal graphics capability.",
      links: [
        {
          text: "NVIDIA Control Panel Guide",
          url: "https://www.nvidia.com/en-us/geforce/guides/nvidia-control-panel-guide/"
        }
      ]
    },
    {
      key: "hardware-acceleration",
      name: "Hardware Acceleration Management",
      icon: "⚡",
      description: "Optimize hardware acceleration settings across applications and system services.",
      confidence: 89,
      sources: 7,
      detail: "Enable and configure hardware acceleration for graphics-intensive tasks.",
      links: [
        {
          text: "Intel Graphics Command Center",
          url: "https://www.intel.com/content/www/us/en/support/articles/000055848/graphics.html"
        }
      ]
    }
  ];

  // Custom options for Computer slow scenario
  const computerSlowOptions = [
    {
      key: "startup-optimization",
      name: "Startup & Background Process Optimization",
      icon: "🔄",
      description: "Identify and disable unnecessary startup items and background processes.",
      confidence: 97,
      sources: 14,
      detail: "Significantly improves boot time and overall system responsiveness.",
      links: [
        {
          text: "Windows Task Manager Guide",
          url: "https://support.microsoft.com/en-us/windows/open-task-manager-bce95b4f-e178-fce3-6bc1-a0631290730d"
        }
      ]
    },
    {
      key: "disk-cleanup",
      name: "Storage & File System Maintenance",
      icon: "💾",
      description: "Clean up unused files and optimize storage for maximum performance.",
      confidence: 92,
      sources: 9,
      detail: "Remove temporary files, optimize disk usage and ensure adequate free space.",
      links: [
        {
          text: "Disk Cleanup Tutorial",
          url: "https://support.microsoft.com/en-us/windows/disk-cleanup-in-windows-10-8a96ff42-5751-39ad-23d6-434b4d5b9a68"
        }
      ]
    },
    {
      key: "system-optimization",
      name: "System Configuration & Services",
      icon: "⚙️",
      description: "Optimize Windows services, visual effects, and system settings.",
      confidence: 90,
      sources: 11,
      detail: "Fine-tune Windows for performance rather than aesthetics.",
      links: [
        {
          text: "Windows Performance Guide",
          url: "https://support.microsoft.com/en-us/windows/improve-pc-performance-in-windows-9c5e5479-eff5-2940-611b-b07443dca6bb"
        }
      ]
    }
  ];

  // Custom options for Webcam issue scenario
  const webcamIssueOptions = [
    {
      key: "driver-software",
      name: "Driver & Software Update",
      icon: "📥",
      description: "Install the latest Logitech webcam drivers and software for compatibility.",
      confidence: 96,
      sources: 13,
      detail: "Most webcam issues are resolved with proper driver installation.",
      links: [
        {
          text: "Logitech Support",
          url: "https://support.logi.com/hc/en-us/categories/360001759473-Webcams"
        }
      ]
    },
    {
      key: "app-permissions",
      name: "Application & Privacy Settings",
      icon: "🔒",
      description: "Troubleshoot application permissions and privacy settings affecting webcam access.",
      confidence: 94,
      sources: 10,
      detail: "Windows and browser privacy settings often block webcam access.",
      links: [
        {
          text: "Windows Camera Privacy Settings",
          url: "ms-settings:privacy-webcam"
        }
      ]
    },
    {
      key: "connectivity-troubleshooting",
      name: "Connection & Hardware Testing",
      icon: "🔌",
      description: "Verify physical connections and test webcam hardware across multiple applications.",
      confidence: 91,
      sources: 8,
      detail: "Isolate whether the issue is hardware, software, or application-specific.",
      links: [
        {
          text: "Logitech Webcam Test Tool",
          url: "https://support.logi.com/hc/en-us/articles/360023237594-Logitech-Capture"
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
  } else if (isGraphicsQuery) {
    displayOptions = graphicsPerformanceOptions;
    headerText = "Here are the most effective approaches to improve your Dell's graphics performance.";
    headerIcon = <Monitor className="text-[#F97316] mr-2" size={20} />;
  } else if (isComputerSlowQuery) {
    displayOptions = computerSlowOptions;
    headerText = "Here are the most effective approaches to speed up your slow computer.";
    headerIcon = <Clock className="text-[#9B6C14] mr-2" size={20} />;
  } else if (isWebcamQuery) {
    displayOptions = webcamIssueOptions;
    headerText = "Here are the most effective approaches to fix your Logitech webcam issues.";
    headerIcon = <Camera className="text-[#E43D59] mr-2" size={20} />;
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
