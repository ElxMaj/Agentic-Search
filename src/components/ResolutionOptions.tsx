
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircleQuestion, 
  ThumbsUp, 
  Info, 
  ExternalLink, 
  BatteryFull, 
  Wifi, 
  Monitor, 
  Clock, 
  Camera,
  Cpu,
  Zap,
  Wrench,
  Settings,
  HardDrive
} from 'lucide-react';
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
      key: "power-management",
      name: "Advanced Power Management",
      icon: "🔋",
      description: "Optimize Dell-specific battery settings for maximum efficiency.",
      confidence: 96,
      sources: 8,
      detail: "Tune power profiles and internal battery thresholds for optimal battery life.",
      links: [
        {
          text: "Dell Power Manager Guide",
          url: "https://www.dell.com/support/kbdoc/en-us/000131081/power-manager-power-settings-in-windows"
        }
      ]
    },
    {
      key: "app-control",
      name: "Application Energy Control",
      icon: "⚡",
      description: "Identify and manage high-drain applications and system processes.",
      confidence: 93,
      sources: 7,
      detail: "Profile and limit resource usage of battery-consuming background applications.",
      links: [
        {
          text: "Battery Usage by App",
          url: "ms-settings:battery"
        }
      ]
    },
    {
      key: "battery-health",
      name: "Battery Longevity Strategy",
      icon: "📊",
      description: "Dell battery calibration and maintenance procedures for extended lifespan.",
      confidence: 91,
      sources: 9,
      detail: "Implement charge thresholds and custom cycling to maximize battery health.",
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
      key: "signal-optimization",
      name: "Signal Path Optimization",
      icon: "📡",
      description: "Analyze and enhance wireless signal pathways and environmental factors.",
      confidence: 94,
      sources: 9,
      detail: "Map signal strengths and optimize router placement for consistent coverage.",
      links: [
        {
          text: "Wi-Fi Analyzer Tool",
          url: "https://play.google.com/store/apps/details?id=com.farproc.wifi.analyzer"
        }
      ]
    },
    {
      key: "network-reconfiguration",
      name: "Network Infrastructure Reconfiguration",
      icon: "🔄",
      description: "Reconfigure network settings to eliminate interference and channel congestion.",
      confidence: 89,
      sources: 7,
      detail: "Implement optimal channel selection and QoS prioritization for stable connections.",
      links: [
        {
          text: "Router Channel Management Guide",
          url: "https://www.netgear.com/support/product/nighthawk-app.aspx"
        }
      ]
    },
    {
      key: "connection-hardening",
      name: "Connection Reliability Hardening",
      icon: "🛡️",
      description: "Implement advanced wireless adapter settings and firmware updates.",
      confidence: 92,
      sources: 8,
      detail: "Optimize adapter power management and implement connection persistence protocols.",
      links: [
        {
          text: "Advanced Adapter Settings",
          url: "ms-settings:network-status"
        }
      ]
    }
  ];

  // Custom options for Dell graphics performance scenario
  const graphicsPerformanceOptions = [
    {
      key: "driver-ecosystem",
      name: "Graphics Driver Ecosystem",
      icon: "🖥️",
      description: "Comprehensive driver management for optimal Dell graphics performance.",
      confidence: 95,
      sources: 12,
      detail: "Implement a custom driver selection and validation process for your specific Dell model.",
      links: [
        {
          text: "Dell Graphics Command Center",
          url: "https://www.dell.com/support/home/en-us/drivers/driversdetails?driverid=f53rr"
        }
      ]
    },
    {
      key: "thermal-optimization",
      name: "Thermal Performance Balancing",
      icon: "❄️",
      description: "Optimize cooling and thermal management for sustained graphics performance.",
      confidence: 93,
      sources: 10,
      detail: "Implement advanced cooling solutions and thermal profile management specific to Dell systems.",
      links: [
        {
          text: "Dell Power Thermal Management",
          url: "https://www.dell.com/support/kbdoc/en-us/000132240/dell-power-manager-thermal-management"
        }
      ]
    },
    {
      key: "resource-allocation",
      name: "System Resource Allocation",
      icon: "🧠",
      description: "Optimize system resource distribution for graphics-intensive workloads.",
      confidence: 89,
      sources: 7,
      detail: "Configure memory allocation, pagefile settings, and process priorities for graphics tasks.",
      links: [
        {
          text: "Dell Performance Guide",
          url: "https://www.dell.com/support/kbdoc/en-us/000178000/dell-command-power-manager"
        }
      ]
    }
  ];

  // Custom options for Computer slow scenario
  const computerSlowOptions = [
    {
      key: "system-optimization",
      name: "System Process Optimization",
      icon: "⚙️",
      description: "Comprehensive system service and process management for improved responsiveness.",
      confidence: 97,
      sources: 14,
      detail: "Identify and reconfigure resource-intensive system processes for optimal performance.",
      links: [
        {
          text: "Advanced System Configuration",
          url: "ms-settings:systeminfo"
        }
      ]
    },
    {
      key: "storage-management",
      name: "Advanced Storage Architecture",
      icon: "💾",
      description: "Implement enterprise-level storage optimization techniques for faster performance.",
      confidence: 92,
      sources: 9,
      detail: "Restructure file systems, implement indexing strategies, and optimize storage I/O operations.",
      links: [
        {
          text: "Storage Sense Settings",
          url: "ms-settings:storagesense"
        }
      ]
    },
    {
      key: "memory-enhancement",
      name: "Memory Utilization Enhancement",
      icon: "🚀",
      description: "Advanced memory management and allocation strategies for smoother multitasking.",
      confidence: 90,
      sources: 11,
      detail: "Implement custom paging files, memory compression, and application memory priorities.",
      links: [
        {
          text: "Windows Memory Diagnostics",
          url: "ms-settings:windowsupdate-history"
        }
      ]
    }
  ];

  // Custom options for Webcam issue scenario
  const webcamIssueOptions = [
    {
      key: "hardware-diagnostics",
      name: "Camera Hardware Diagnostics",
      icon: "🔍",
      description: "Comprehensive webcam hardware troubleshooting and diagnostics workflow.",
      confidence: 96,
      sources: 13,
      detail: "Implement a systematic approach to isolate hardware vs. software camera issues.",
      links: [
        {
          text: "Logitech Diagnostic Tool",
          url: "https://support.logi.com/hc/en-us/articles/360023307914"
        }
      ]
    },
    {
      key: "driver-configuration",
      name: "Advanced Driver Architecture",
      icon: "⚙️",
      description: "Optimize webcam driver configuration and software integration.",
      confidence: 94,
      sources: 10,
      detail: "Implement custom driver parameters and software compatibility settings.",
      links: [
        {
          text: "Device Manager",
          url: "ms-settings:devicemanager"
        }
      ]
    },
    {
      key: "application-integration",
      name: "Multi-Application Compatibility",
      icon: "🔄",
      description: "Ensure seamless webcam functionality across all communication platforms.",
      confidence: 91,
      sources: 8,
      detail: "Configure application-specific camera permissions and integration settings.",
      links: [
        {
          text: "Camera Privacy Settings",
          url: "ms-settings:privacy-webcam"
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
  let headerClass = "bg-gray-50";
  
  if (isBatteryQuery) {
    displayOptions = batteryDrainOptions;
    headerText = "Here are proven strategies to maximize your Dell laptop's battery life.";
    headerIcon = <BatteryFull className="text-[#538234] mr-2" size={20} />;
    headerClass = "bg-green-50";
  } else if (isWifiQuery) {
    displayOptions = wifiUnstableOptions;
    headerText = "Here are advanced solutions to stabilize your WiFi connection permanently.";
    headerIcon = <Wifi className="text-[#445bc5] mr-2" size={20} />;
    headerClass = "bg-blue-50";
  } else if (isGraphicsQuery) {
    displayOptions = graphicsPerformanceOptions;
    headerText = "Here are professional-grade techniques to enhance your Dell's graphics capabilities.";
    headerIcon = <Monitor className="text-[#F97316] mr-2" size={20} />;
    headerClass = "bg-orange-50";
  } else if (isComputerSlowQuery) {
    displayOptions = computerSlowOptions;
    headerText = "Here are comprehensive approaches to restore your computer's performance and speed.";
    headerIcon = <Clock className="text-[#9B6C14] mr-2" size={20} />;
    headerClass = "bg-amber-50";
  } else if (isWebcamQuery) {
    displayOptions = webcamIssueOptions;
    headerText = "Here are specialized solutions to resolve complex webcam connectivity issues.";
    headerIcon = <Camera className="text-[#E43D59] mr-2" size={20} />;
    headerClass = "bg-red-50";
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8">
      <div className={`rounded-xl border border-gray-200 p-6 mb-6 ${headerClass}`}>
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
