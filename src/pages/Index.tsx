import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryInput from '../components/QueryInput';
import QueryInterpretation from '../components/QueryInterpretation';
import ResolutionOptions, { ResolutionPathOption } from '../components/ResolutionOptions';
import AIGeneratedAnswer from '../components/AIGeneratedAnswer';
import { mockQueries, suggestedQueries, Source, MockQueryData } from '../data/mockData';

const Index: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQueryInterpretation, setShowQueryInterpretation] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showResolutionOptions, setShowResolutionOptions] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQueryData, setCurrentQueryData] = useState<MockQueryData | null>(null);
  const [selectedPathKey, setSelectedPathKey] = useState<string>("");
  const [resolutionOptions, setResolutionOptions] = useState<ResolutionPathOption[]>([]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setIsLoading(false);
      setShowQueryInterpretation(false);
      setShowResolutionOptions(false);
      setShowAnswer(false);
      setCurrentQueryData(null);
      setSelectedPathKey("");
      return;
    }
    
    setIsLoading(true);
    setShowQueryInterpretation(false);
    setShowResolutionOptions(false);
    setShowAnswer(false);
    
    setTimeout(() => {
      const matchedQuery = mockQueries.find(q => 
        searchQuery.toLowerCase().includes(q.query.toLowerCase())
      ) || mockQueries[0];
      
      setCurrentQueryData(matchedQuery);
      
      setIsThinking(true);
      setShowQueryInterpretation(true);
      
      setTimeout(() => {
        setIsThinking(false);
        
        setTimeout(() => {
          let options: ResolutionPathOption[] = Object.entries(matchedQuery.resolutionPaths).map(([key, path]) => {
            let detail = "";
            
            if (matchedQuery.query.includes("Webcam problem")) {
              if (key === "permissions") {
                detail = "Privacy settings might be blocking camera access";
              } else if (key === "connection") {
                detail = "Physical or USB connection issues detected";
              } else if (key === "drivers") {
                detail = "Driver conflicts or outdated software identified";
              } else if (key === "teamsConfig") {
                detail = "Teams settings and configuration problems identified";
              }
            } else if (matchedQuery.query.includes("Dell graphics")) {
              if (key === "software") {
                detail = "Current drivers detected as outdated by 3 months";
              } else if (key === "hardware") {
                detail = "External GPU options and new models available";
              } else if (key === "diagnostics") {
                detail = "Settings optimization for your most-used apps";
              }
            } else if (matchedQuery.query.includes("My computer is slow")) {
              if (key === "diskOptimization") {
                detail = "Storage performance analysis and optimization";
              } else if (key === "startupOptimization") {
                detail = "Identify and disable unnecessary startup items";
              } else if (key === "memoryManagement") {
                detail = "Free up and optimize RAM usage";
              }
            }
            
            const sources = path.sources || [];
            const sourceCount = sources.length;
            const confidence = sources.length > 0 
              ? Math.round(sources.reduce((sum, source) => sum + source.confidence, 0) / sources.length)
              : Math.floor(Math.random() * 10) + 85;
            
            let description = "";
            if (key === "permissions") {
              description = "Check and update app permissions in Windows and Teams";
            } else if (key === "connection") {
              description = "Troubleshoot physical connections and USB ports";
            } else if (key === "drivers") {
              description = "Update or reinstall webcam and USB drivers";
            } else if (key === "teamsConfig") {
              description = "Fix Teams settings, cache and configuration issues";
            } else if (key === "software") {
              description = "Free software and driver updates";
            } else if (key === "hardware") {
              description = "Recommended upgrades for better performance";
            } else if (key === "diagnostics") {
              description = "App-specific performance tips";
            } else if (key === "diskOptimization") {
              description = "Optimize storage performance and SSD settings";
            } else if (key === "startupOptimization") {
              description = "Streamline system startup and background services";
            } else if (key === "memoryManagement") {
              description = "Improve RAM utilization and application memory usage";
            } else {
              description = "Improve system performance";
            }

            return {
              key,
              name: path.name,
              icon: path.icon,
              description,
              confidence,
              sources: sourceCount > 0 ? sourceCount : Math.floor(Math.random() * 100) + 150,
              detail
            };
          });
          
          if (matchedQuery.query.includes("Webcam problem")) {
            options = options.filter(option => option.key !== "teams");
          }
          
          if (matchedQuery.query.includes("My computer is slow")) {
            options = options.filter(option => option.key !== "softwareCleanup");
          }
          
          options = options.sort((a, b) => b.confidence - a.confidence);
          
          setResolutionOptions(options);
          setShowResolutionOptions(true);
          setIsLoading(false);
        }, 500);
      }, 1500);
    }, 1000);
  };

  const handleSelectPath = (pathKey: string) => {
    setSelectedPathKey(pathKey);
    setTimeout(() => {
      setShowAnswer(true);
    }, 300);
  };

  const getAnswerContent = () => {
    if (!currentQueryData || !selectedPathKey) return "";
    const path = currentQueryData.resolutionPaths[selectedPathKey];
    if (!path) return "";
    
    if (selectedPathKey === "software") {
      return `<h3 class="text-lg font-medium mb-3">Dell Graphics Performance: Software Solutions</h3>
      
      <p class="mb-3">Based on analysis of your Dell XPS 13 system, I've identified several software optimizations that can significantly improve graphics performance:</p>
      
      <ol class="list-decimal pl-5 mb-4 space-y-2">
        <li><strong>Update Intel Iris Xe Graphics drivers</strong> - Your current driver is 3 months out of date. The latest version (535.98) includes specific optimizations for your hardware.</li>
        <li><strong>Optimize Windows Power Settings</strong> - Your system is currently using the "Balanced" power plan. Switching to "High Performance" can boost graphics processing.</li>
        <li><strong>Enable Hardware Acceleration</strong> - This setting is currently disabled in several of your applications, including Chrome and Adobe products.</li>
        <li><strong>Update Intel Dynamic Tuning</strong> - The latest version improves thermal management, preventing throttling during graphics-intensive tasks.</li>
      </ol>
      
      <p class="mb-3">These software changes can improve performance by 15-30% without any hardware upgrades.</p>
      
      <div class="bg-blue-100 p-3 rounded-md mb-4">
        <p class="font-medium">Would you like me to guide you through implementing these optimizations?</p>
      </div>`;
    } else if (selectedPathKey === "hardware") {
      return `<h3 class="text-lg font-medium mb-3">Dell Graphics Performance: Hardware Solutions</h3>
      
      <p class="mb-3">After analyzing your Dell XPS 13's configuration, I've identified these hardware upgrade options for improving graphics performance:</p>
      
      <div class="space-y-4 mb-4">
        <div class="border-l-4 border-blue-400 pl-3">
          <h4 class="font-medium">External GPU Solution</h4>
          <p>Thunderbolt eGPU enclosure with RTX 4060 graphics card</p>
          <p class="text-green-600 font-medium">+80% performance improvement</p>
          <p class="text-sm text-gray-600">Compatible with your Thunderbolt 4 port</p>
        </div>
        
        <div class="border-l-4 border-blue-400 pl-3">
          <h4 class="font-medium">New XPS Model Upgrade</h4>
          <p>XPS 15 with built-in RTX 4070 graphics</p>
          <p class="text-green-600 font-medium">+120% performance improvement</p>
          <p class="text-sm text-gray-600">Includes additional CPU and cooling improvements</p>
        </div>
        
        <div class="border-l-4 border-blue-400 pl-3">
          <h4 class="font-medium">RAM Upgrade</h4>
          <p>Increase from current 16GB to 32GB RAM</p>
          <p class="text-green-600 font-medium">+15% performance in memory-intensive applications</p>
          <p class="text-sm text-gray-600">Reduces system paging during graphics operations</p>
        </div>
      </div>
      
      <p>Your current integrated Intel Iris Xe graphics can handle basic productivity tasks, but these upgrades would significantly improve performance for gaming, 3D modeling, and video editing.</p>`;
    } else if (selectedPathKey === "diagnostics") {
      return `<h3 class="text-lg font-medium mb-3">Dell Graphics Performance: Diagnostic Analysis</h3>
      
      <p class="mb-3">I've analyzed the performance data from your system and identified these optimization opportunities for your most-used applications:</p>
      
      <div class="bg-blue-100 p-3 rounded-md mb-4">
        <p class="font-medium">System Analysis Summary:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>CPU: Operating at 76% capacity during graphics tasks</li>
          <li>RAM: 85% utilization during application launches</li>
          <li>GPU: Temperature reaching 82°C under load</li>
          <li>Storage: Read speeds below optimal range for your SSD model</li>
        </ul>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Application-Specific Recommendations:</h4>
      
      <div class="space-y-3 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Chrome Browser</p>
            <p>Disable hardware acceleration during video calls to reduce memory conflicts</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Adobe Applications</p>
            <p>Enable GPU acceleration in Performance settings for up to 40% faster rendering</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Windows Settings</p>
            <p>Set Graphics preference to "High performance" for your creative applications</p>
          </div>
        </div>
      </div>
      
      <p>Implementing these optimization settings could improve your graphics performance by up to 25% with your current hardware configuration.</p>`;
    } else if (selectedPathKey === "permissions") {
      return `<h3 class="text-lg font-medium mb-3">Teams Webcam Issues: Privacy & Permissions</h3>
      
      <p class="mb-3">After analyzing your system, I've identified that camera permission issues are likely preventing Teams from accessing your webcam:</p>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
        <p class="font-medium">System Analysis Results:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>Windows camera privacy settings: <span class="text-red-600 font-medium">Restricted</span></li>
          <li>Teams app camera permissions: <span class="text-red-600 font-medium">Not granted</span></li>
          <li>Camera functionality in other apps: <span class="text-green-600 font-medium">Working correctly</span></li>
        </ul>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Step-by-Step Resolution:</h4>
      
      <div class="space-y-4 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Check Windows Camera Privacy Settings</p>
            <ol class="list-decimal pl-5 mt-1 space-y-1 text-sm">
              <li>Press <strong>Win + I</strong> to open Windows Settings</li>
              <li>Navigate to <strong>Privacy & Security > Camera</strong></li>
              <li>Ensure <strong>Camera access</strong> is toggled <strong>On</strong></li>
              <li>Under "Let apps access your camera," toggle the switch to <strong>On</strong></li>
              <li>Scroll down to find Microsoft Teams in the app list and ensure it's toggled <strong>On</strong></li>
            </ol>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Check Teams App Permissions</p>
            <ol class="list-decimal pl-5 mt-1 space-y-1 text-sm">
              <li>Open <strong>Microsoft Teams</strong></li>
              <li>Click your <strong>profile picture</strong> in the top-right corner</li>
              <li>Select <strong>Settings</strong></li>
              <li>Go to <strong>Permissions</strong></li>
              <li>Ensure <strong>Media > Camera</strong> is set to <strong>Allowed</strong></li>
            </ol>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Reset Teams Cache (If Issues Persist)</p>
            <ol class="list-decimal pl-5 mt-1 space-y-1 text-sm">
              <li>Close Microsoft Teams completely (check Task Manager to ensure it's not running)</li>
              <li>Press <strong>Win + R</strong> to open the Run dialog</li>
              <li>Type one of these paths depending on your Teams version:
                <ul class="list-disc pl-4 mt-1">
                  <li>For personal Teams: <code>%appdata%\\Microsoft\\Teams</code></li>
                  <li>For work Teams: <code>%appdata%\\Microsoft\\Teams\\meeting-addin\\Cache</code></li>
                </ul>
              </li>
              <li>Delete all files in the Cache folder</li>
              <li>Restart Teams and test your camera</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div class="bg-blue-50 p-3 rounded-md mb-4">
        <p class="font-medium">Why This Works:</p>
        <p class="text-sm">Windows 11's enhanced security features sometimes reset app permissions after updates. The steps above ensure that Teams has the necessary permissions at both the operating system and application levels. Cache clearing resolves any corrupted permission states that may have occurred from previous sessions.</p>
      </div>`;
    } else if (selectedPathKey === "connection") {
      return `<h3 class="text-lg font-medium mb-3">Teams Webcam Issues: Connection Problems</h3>
      
      <p class="mb-3">Based on diagnostics, your webcam connection issues during Teams calls appear to be hardware-related:</p>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
        <p class="font-medium">Connection Diagnostic Results:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>USB controller status: <span class="text-yellow-600 font-medium">Intermittent issues detected</span></li>
          <li>Webcam power delivery: <span class="text-red-600 font-medium">Fluctuating (below optimal)</span></li>
          <li>USB port recognition: <span class="text-yellow-600 font-medium">Inconsistent during video calls</span></li>
        </ul>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Comprehensive Connection Troubleshooting:</h4>
      
      <div class="space-y-4 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Test Different USB Ports</p>
            <p class="mb-2 text-sm">Your current port may not be providing consistent power or data connectivity:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Connect your webcam directly to a <strong>USB 3.0 port</strong> (typically blue) on your computer instead of USB 2.0</li>
              <li>Avoid using USB hubs, extension cables, or front panel USB ports</li>
              <li>Try ports on different sides of your laptop or different areas of your desktop</li>
              <li>After connecting to a new port, wait 30 seconds for device recognition before testing</li>
            </ul>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Check for Physical Connection Issues</p>
            <p class="mb-2 text-sm">Physical hardware problems account for approximately 40% of webcam connection issues:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Inspect the USB cable for any visible damage, kinks, or bent connectors</li>
              <li>Ensure the connection is secure at both the webcam and computer ends</li>
              <li>Try gently cleaning the USB connector with compressed air or a soft brush</li>
              <li>If your webcam has a detachable cable, try replacing it with a high-quality alternative</li>
            </ul>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Update USB Controllers</p>
            <p class="mb-2 text-sm">Outdated USB controller drivers can cause intermittent connection issues:</p>
            <ol class="list-decimal pl-5 text-sm">
              <li>Press <strong>Win + X</strong> and select <strong>Device Manager</strong></li>
              <li>Expand <strong>Universal Serial Bus controllers</strong></li>
              <li>Right-click on each <strong>USB Root Hub</strong> and select <strong>Update driver</strong></li>
              <li>Choose <strong>Search automatically for updated driver software</strong></li>
              <li>Repeat for all USB controllers and hubs listed</li>
              <li>Restart your computer after all updates are complete</li>
            </ol>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
          <div>
            <p class="font-medium">Power Management Optimization</p>
            <p class="mb-2 text-sm">Windows power settings may be cutting power to your USB ports:</p>
            <ol class="list-decimal pl-5 text-sm">
              <li>Open <strong>Device Manager</strong></li>
              <li>Expand <strong>Universal Serial Bus controllers</strong></li>
              <li>Right-click each <strong>USB Root Hub</strong> and select <strong>Properties</strong></li>
              <li>Go to the <strong>Power Management</strong> tab</li>
              <li>Uncheck <strong>Allow the computer to turn off this device to save power</strong></li>
              <li>Click <strong>OK</strong> and repeat for all USB Root Hubs</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div class="bg-blue-50 p-3 rounded-md">
        <p class="font-medium">Advanced Diagnosis:</p>
        <p class="text-sm">If issues persist after trying these solutions, the problem may be with the webcam's internal components or firmware. Connect the webcam to another computer to determine if the issue follows the webcam or stays with your current system. This will help identify whether you need a firmware update or a hardware replacement.</p>
      </div>`;
    } else if (selectedPathKey === "drivers") {
      return `<h3 class="text-lg font-medium mb-3">Teams Webcam Issues: Driver & Software Solutions</h3>
      
      <p class="mb-3">Analysis of your system indicates that driver conflicts and outdated software are affecting your webcam during Teams calls:</p>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
        <p class="font-medium">Driver Diagnostic Results:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>Webcam driver status: <span class="text-red-600 font-medium">Outdated (last updated 11 months ago)</span></li>
          <li>Teams application version: <span class="text-yellow-600 font-medium">Two versions behind current release</span></li>
          <li>Driver conflicts detected: <span class="text-red-600 font-medium">Yes, with audio processing software</span></li>
        </ul>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Comprehensive Driver & Software Resolution Plan:</h4>
      
      <div class="space-y-4 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Update Webcam Drivers</p>
            <p class="mb-2 text-sm">Your current drivers are outdated and might not be fully compatible with the latest Teams updates:</p>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs mb-2">
              <p class="font-medium">Method A: Manufacturer Website (Recommended)</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Visit your webcam manufacturer's website (Logitech, Microsoft, etc.)</li>
                <li>Navigate to the Support or Downloads section</li>
                <li>Search for your specific webcam model</li>
                <li>Download the latest driver package</li>
                <li>Close all applications using the webcam before installation</li>
                <li>Run the installer and follow the prompts</li>
              </ol>
            </div>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs">
              <p class="font-medium">Method B: Device Manager</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Press <strong>Win + X</strong> and select <strong>Device Manager</strong></li>
                <li>Expand <strong>Cameras</strong> or <strong>Imaging devices</strong></li>
                <li>Right-click on your webcam and select <strong>Update driver</strong></li>
                <li>Choose <strong>Search automatically for updated driver software</strong></li>
                <li>Follow the prompts to complete the installation</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Reinstall Webcam Drivers (If Issues Persist)</p>
            <p class="mb-2 text-sm">A clean reinstallation can resolve driver conflicts and corruption:</p>
            <ol class="list-decimal pl-5 text-sm space-y-1">
              <li>Open <strong>Device Manager</strong></li>
              <li>Expand <strong>Cameras</strong> or <strong>Imaging devices</strong></li>
              <li>Right-click on your webcam and select <strong>Uninstall device</strong></li>
              <li>Check the box for <strong>Delete the driver software for this device</strong> if available</li>
              <li>Click <strong>Uninstall</strong> and confirm</li>
              <li>Disconnect the webcam from your computer</li>
              <li>Restart your computer</li>
              <li>Reconnect the webcam and wait for Windows to detect it</li>
              <li>If Windows doesn't automatically install drivers, use Method A above</li>
            </ol>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Update Microsoft Teams</p>
            <p class="mb-2 text-sm">Running an outdated Teams version can cause compatibility issues with webcam drivers:</p>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs mb-2">
              <p class="font-medium">For Teams Desktop App:</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Open Microsoft Teams</li>
                <li>Click your <strong>profile picture</strong> in the top-right corner</li>
                <li>Select <strong>Check for updates</strong></li>
                <li>If updates are available, Teams will download and install them</li>
                <li>Restart Teams when prompted</li>
              </ol>
            </div>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs">
              <p class="font-medium">Alternative Method (Complete Reinstall):</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Uninstall Teams from <strong>Control Panel > Programs > Uninstall a program</strong></li>
                <li>Delete leftover files from <code>%appdata%\\Microsoft\\Teams</code></li>
                <li>Download the latest Teams installer from Microsoft's website</li>
                <li>Install Teams and sign in to your account</li>
                <li>Configure your camera settings before joining a call</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
          <div>
            <p class="font-medium">Resolve Software Conflicts</p>
            <p class="mb-2 text-sm">Other applications may be interfering with your webcam during Teams calls:</p>
            <ul class="list-disc pl-5 text-sm">
              <li><strong>Close competing video applications</strong> (Zoom, Skype, OBS, etc.) before starting Teams</li>
              <li><strong>Temporarily disable antivirus camera scanning</strong> features during calls</li>
              <li><strong>Check for conflicting background apps</strong> using Task Manager and close unnecessary ones</li>
              <li><strong>Disable camera enhancements software</strong> that may be modifying the video stream</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="bg-blue-50 p-3 rounded-md">
        <p class="font-medium">Technical Insight:</p>
        <p class="text-sm">Modern webcams use complex DirectShow or Media Foundation frameworks that can experience conflicts between different software layers. This comprehensive approach addresses issues at all levels of the driver stack, from hardware interfacing to application integration, ensuring maximum compatibility with Teams' video processing pipeline.</p>
      </div>`;
    } else if (selectedPathKey === "teamsConfig") {
      return `<h3 class="text-lg font-medium mb-3">Teams Webcam Issues: Teams Configuration & Settings</h3>
      
      <p class="mb-3">After analyzing your Microsoft Teams setup, I've identified several configuration issues that are likely causing your webcam problems:</p>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
        <p class="font-medium">Teams Configuration Analysis:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>Teams version: <span class="text-yellow-600 font-medium">2.1.00.34160 (3 updates behind)</span></li>
          <li>Device settings status: <span class="text-red-600 font-medium">Incorrect default device selected</span></li>
          <li>Background effects: <span class="text-yellow-600 font-medium">Causing increased CPU usage (98%)</span></li>
          <li>Cache status: <span class="text-red-600 font-medium">Corrupted media cache detected</span></li>
        </ul>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Step-by-Step Configuration Fixes:</h4>
      
      <div class="space-y-4 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Verify and Reset Teams Camera Settings</p>
            <p class="mb-2 text-sm">Teams may be using incorrect device settings or configurations:</p>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs mb-2">
              <p class="font-medium">For Windows Users:</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Open Microsoft Teams</li>
                <li>Click your profile picture in the top-right and select <strong>Settings</strong></li>
                <li>Go to <strong>Devices</strong></li>
                <li>Under <strong>Camera</strong>, ensure your webcam is selected from the dropdown</li>
                <li>Check the camera preview - if it's black or frozen, click the <strong>Reset camera</strong> option</li>
                <li>Toggle <strong>Hardware acceleration</strong> off if it's currently enabled</li>
                <li>Click <strong>Apply</strong> and restart Teams</li>
              </ol>
            </div>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs">
              <p class="font-medium">For Mac Users:</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Open Microsoft Teams</li>
                <li>Click on your profile picture and select <strong>Settings</strong></li>
                <li>Select <strong>Devices</strong></li>
                <li>Under <strong>Camera</strong>, select your webcam from the dropdown</li>
                <li>If using an external webcam, ensure macOS camera permissions are granted</li>
                <li>If preview is blank, quit Teams completely (right-click Teams dock icon > Quit)</li>
                <li>Restart Teams and check settings again</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Clear Teams Cache</p>
            <p class="mb-2 text-sm">Corrupted cache files frequently cause webcam initialization problems:</p>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs mb-2">
              <p class="font-medium">For Windows Users:</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Completely exit Teams (check Task Manager to ensure it's closed)</li>
                <li>Press <strong>Win+R</strong> to open Run dialog</li>
                <li>Type <code>%appdata%\\Microsoft\\Teams</code> and click OK</li>
                <li>Delete these folders:
                  <ul class="list-disc pl-4 mt-1">
                    <li>Cache</li>
                    <li>blob_storage</li>
                    <li>databases</li>
                    <li>GPUCache</li>
                    <li>IndexedDB</li>
                    <li>Local Storage</li>
                    <li>tmp</li>
                  </ul>
                </li>
                <li>Restart your computer</li>
                <li>Open Teams and test your camera</li>
              </ol>
            </div>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs">
              <p class="font-medium">For Mac Users:</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Quit Microsoft Teams completely</li>
                <li>Open Finder and click <strong>Go</strong> in the menu bar</li>
                <li>Hold the Option key to reveal <strong>Library</strong> and click on it</li>
                <li>Navigate to <strong>Application Support > Microsoft > Teams</strong></li>
                <li>Delete the folders listed above</li>
                <li>Restart your Mac</li>
                <li>Open Teams and sign in again</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Disable Resource-Intensive Features</p>
            <p class="mb-2 text-sm">Some Teams features can consume excessive resources and affect webcam performance:</p>
            <ol class="list-decimal pl-5 text-sm space-y-1">
              <li>In Teams Settings, go to <strong>Devices</strong></li>
              <li>Disable <strong>GPU hardware acceleration</strong> if enabled</li>
              <li>Under <strong>Appearance and accessibility</strong>, disable animations</li>
              <li>During calls, avoid using background effects or use the simple blur option</li>
              <li>If problems occur in large meetings, disable incoming video for other participants</li>
            </ol>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
          <div>
            <p class="font-medium">Update or Reinstall Teams</p>
            <p class="mb-2 text-sm">Your Teams version is outdated, which could be causing compatibility issues:</p>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs mb-2">
              <p class="font-medium">Update Teams:</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>In Teams, click your profile picture</li>
                <li>Select <strong>Check for updates</strong></li>
                <li>If updates are available, let Teams install them</li>
                <li>Restart Teams when prompted</li>
              </ol>
            </div>
            
            <div class="bg-gray-100 p-2 rounded-md text-xs">
              <p class="font-medium">Reinstall Teams (if updating doesn't help):</p>
              <ol class="list-decimal pl-4 space-y-1">
                <li>Uninstall Teams from Control Panel/Settings</li>
                <li>Clear the Teams cache folders (as described above)</li>
                <li>Download the latest Teams installer from Microsoft's website</li>
                <li>Install the application</li>
                <li>Sign in with your credentials</li>
                <li>Configure camera settings before joining your first call</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-blue-50 p-3 rounded-md">
        <p class="font-medium">Technical Insight: Teams Architecture</p>
        <p class="text-sm">Microsoft Teams uses the Electron framework, which combines Chromium and Node.js. This architecture can sometimes cause conflicts with the WebRTC components that handle video. The cache-clearing steps reset the media subsystem components without affecting your user data or chat history. Recent Teams updates have improved webcam compatibility, particularly for USB devices on Windows 11.</p>
      </div>`;
    } else if (selectedPathKey === "diskOptimization") {
      return `<h3 class="text-lg font-medium mb-3">Slow Application Loading: Disk Optimization Solutions</h3>
      
      <p class="mb-3">After analyzing your system's storage performance, I've identified several optimization opportunities that can significantly improve application loading times:</p>
      
      <div class="bg-blue-100 p-3 rounded-md mb-4">
        <p class="font-medium">Storage Performance Analysis:</p>
        <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
          <div>
            <p class="font-medium">Current Read Speed:</p>
            <p>320 MB/s (45% below optimal)</p>
          </div>
          <div>
            <p class="font-medium">Current Write Speed:</p>
            <p>290 MB/s (37% below optimal)</p>
          </div>
          <div>
            <p class="font-medium">Drive Type:</p>
            <p>SATA SSD (Samsung 870 EVO)</p>
          </div>
          <div>
            <p class="font-medium">Free Space:</p>
            <p>18% (Critical - below 20% threshold)</p>
          </div>
        </div>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Recommended Optimization Steps:</h4>
      
      <div class="space-y-4 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Free Up Disk Space</p>
            <p class="mb-2">Your SSD performance is degrading due to insufficient free space. SSDs require at least 20% free space for optimal performance.</p>
            <div class="bg-white p-2 rounded-md text-xs mb-2">
              <p class="font-medium">Quick Actions:</p>
              <ul class="list-disc pl-4">
                <li>Run Disk Cleanup (found 14.3GB of temporary files)</li>
                <li>Uninstall unused applications (identified 7 rarely used apps using 22GB)</li>
                <li>Move media files to external storage</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Enable TRIM for SSD Optimization</p>
            <p class="mb-2">TRIM command optimization is currently running on a monthly schedule, which is insufficient for your usage patterns.</p>
            <div class="bg-gray-100 p-2 rounded-md text-sm">
              <p class="font-medium">Recommended Configuration:</p>
              <ol class="list-decimal pl-4">
                <li>Open Command Prompt as administrator</li>
                <li>Type: <code class="bg-gray-200 px-1">fsutil behavior query DisableDeleteNotify</code></li>
                <li>If result is 1, TRIM is disabled. Enable it with: <code class="bg-gray-200 px-1">fsutil behavior set DisableDeleteNotify 0</code></li>
                <li>Schedule weekly TRIM operations</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Optimize Virtual Memory Settings</p>
            <p class="mb-2">Your virtual memory configuration is suboptimal for your system's RAM and usage patterns.</p>
            <div class="bg-gray-100 p-2 rounded-md text-sm">
              <p class="font-medium">Optimal Configuration:</p>
              <ol class="list-decimal pl-4">
                <li>Press Win+R and type <code class="bg-gray-200 px-1">sysdm.cpl</code></li>
                <li>Go to Advanced tab > Performance > Settings > Advanced</li>
                <li>Click "Change" under Virtual Memory</li>
                <li>Set custom size: Initial size: 4096 MB, Maximum size: 8192 MB</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div class="border-t pt-3 mt-4">
        <p class="font-medium">Long-term Solution: Storage Upgrade</p>
        <p class="mb-2">For a more substantial performance improvement, consider upgrading to an NVMe SSD:</p>
        <ul class="list-disc pl-5">
          <li>Compatible NVMe upgrades for your Dell XPS: Samsung 980 Pro or WD Black SN850</li>
          <li>Expected performance improvement: 4-6x faster application loading times</li>
          <li>Cost range: $90-150 for 1TB capacity</li>
        </ul>
      </div>`;
    } else if (selectedPathKey === "startupOptimization") {
      return `<h3 class="text-lg font-medium mb-3">Slow Application Loading: Startup Optimization</h3>
      
      <p class="mb-3">I've analyzed your system's startup configuration and identified several opportunities to improve application loading performance:</p>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
        <p class="font-medium">System Startup Analysis:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>Current startup time: <strong>47 seconds</strong> (73% slower than optimal)</li>
          <li>Startup applications: <strong>24</strong> (12 unnecessary)</li>
          <li>Background services: <strong>142</strong> (38 non-essential)</li>
          <li>Delayed launch applications: <strong>0</strong> (not utilizing delayed start)</li>
        </ul>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Step-by-Step Optimization Plan:</h4>
      
      <div class="space-y-4 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Manage Startup Applications</p>
            <p class="mb-2">Disable unnecessary applications that start automatically with Windows:</p>
            <div class="bg-gray-100 p-2 rounded-md text-sm">
              <p class="font-medium">Using Task Manager:</p>
              <ol class="list-decimal pl-4">
                <li>Press Ctrl+Shift+Esc to open Task Manager</li>
                <li>Go to the "Startup" tab</li>
                <li>Disable these high-impact, non-essential items:
                  <ul class="list-disc pl-4 mt-1">
                    <li>Adobe Creative Cloud</li>
                    <li>Spotify</li>
                    <li>Steam</li>
                    <li>Discord</li>
                    <li>Skype</li>
                    <li>OneDrive (unless frequently used)</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Optimize Background Services</p>
            <p class="mb-2">Configure Windows services for better performance:</p>
            <div class="bg-gray-100 p-2 rounded-md text-sm">
              <p class="font-medium">Using Services Manager:</p>
              <ol class="list-decimal pl-4">
                <li>Press Win+R and type <code class="bg-gray-200 px-1">services.msc</code></li>
                <li>Set these services to Manual start:
                  <ul class="list-disc pl-4 mt-1">
                    <li>Print Spooler (if you don't print regularly)</li>
                    <li>Windows Search (reduces indexing overhead)</li>
                    <li>Bluetooth Support Service (if not using Bluetooth)</li>
                    <li>Connected User Experiences and Telemetry</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Address Application Conflicts</p>
            <p class="mb-2">Resolve conflicts between applications that are competing for resources:</p>
            <div class="bg-gray-100 p-2 rounded-md text-sm">
              <p class="font-medium">Identified Conflicts:</p>
              <ul class="list-disc pl-4">
                <li><strong>McAfee and Windows Defender</strong> - Multiple active antivirus solutions causing scanning conflicts</li>
                <li><strong>Multiple cloud storage services</strong> - Dropbox, Google Drive, and OneDrive all syncing at startup</li>
                <li><strong>Duplicate media services</strong> - iTunes and Windows Media Player services both running</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-green-50 p-3 rounded-md mb-4">
        <p class="font-medium text-green-700">Expected Results:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>Reduced startup time by 50-65%</li>
          <li>Faster application launch times by 25-40%</li>
          <li>Reduced background CPU usage by 15-20%</li>
          <li>More responsive system throughout work sessions</li>
        </ul>
      </div>
      
      <p>Would you like assistance implementing any of these optimizations? I can provide step-by-step guidance for your specific system configuration.</p>`;
    } else if (selectedPathKey === "memoryManagement") {
      return `<h3 class="text-lg font-medium mb-3">Slow Application Loading: Memory Optimization</h3>
      
      <p class="mb-3">After analyzing your Dell XPS system with 8GB RAM, I've identified several memory optimization opportunities to improve application loading times:</p>
      
      <div class="bg-blue-100 p-3 rounded-md mb-4">
        <p class="font-medium">Memory Usage Analysis:</p>
        <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
          <div>
            <p class="font-medium">Idle Memory Usage:</p>
            <p>3.2GB (40% of total)</p>
          </div>
          <div>
            <p class="font-medium">Peak Memory Usage:</p>
            <p>7.6GB (95% of total)</p>
          </div>
          <div>
            <p class="font-medium">Memory-Intensive Apps:</p>
            <p>Chrome, Photoshop, Outlook</p>
          </div>
          <div>
            <p class="font-medium">Page File Activity:</p>
            <p>High (indicating memory shortage)</p>
          </div>
        </div>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Memory Optimization Recommendations:</h4>
      
      <div class="space-y-4 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Optimize Current Memory Usage</p>
            <p class="mb-2">Implement these techniques to reduce memory consumption:</p>
            <div class="bg-gray-100 p-2 rounded-md text-sm">
              <p class="font-medium">Browser Optimization:</p>
              <ul class="list-disc pl-4">
                <li>Install a tab manager extension (like OneTab) to reduce Chrome's memory usage</li>
                <li>Limit extensions to essential ones only (currently using 12 extensions)</li>
                <li>Enable browser tab discarding for inactive tabs</li>
              </ul>
              
              <p class="font-medium mt-2">Application Management:</p>
              <ul class="list-disc pl-4">
                <li>Close resource-intensive applications when not in use</li>
                <li>Use lighter alternatives when possible (e.g., Photopea instead of Photoshop for simple edits)</li>
                <li>Adjust application settings to reduce memory usage:
                  <ul class="list-disc pl-4 mt-1">
                    <li>Reduce Photoshop memory allocation to 60%</li>
                    <li>Limit Outlook mail sync to 1 month</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Memory Leak Detection and Resolution</p>
            <p class="mb-2">Address memory leaks that gradually consume system resources:</p>
            <div class="bg-gray-100 p-2 rounded-md text-sm">
              <p class="font-medium">Detected Memory Leaks:</p>
              <ul class="list-disc pl-4">
                <li><strong>Microsoft Teams</strong> - Exhibits a known memory leak after running for 4+ hours</li>
                <li><strong>Windows Explorer</strong> - Memory usage increases gradually when browsing large folders</li>
              </ul>
              
              <p class="font-medium mt-2">Mitigation Strategies:</p>
              <ul class="list-disc pl-4">
                <li>Restart memory-leaking applications periodically</li>
                <li>Install latest updates that may contain fixes</li>
                <li>Use Task Manager to monitor and identify other potential memory leaks</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Hardware Upgrade Recommendations</p>
            <p class="mb-2">Based on your usage patterns, a memory upgrade would significantly improve performance:</p>
            <div class="bg-gray-100 p-2 rounded-md text-sm">
              <p class="font-medium">Compatible RAM Upgrades:</p>
              <ul class="list-disc pl-4">
                <li><strong>Recommended</strong>: Upgrade to 16GB (2x8GB) DDR4-3200 SODIMM</li>
                <li><strong>Optimal</strong>: Upgrade to 32GB (2x16GB) DDR4-3200 SODIMM</li>
              </ul>
              
              <p class="font-medium mt-2">Expected Performance Improvement:</p>
              <ul class="list-disc pl-4">
                <li>25-40% faster application loading times</li>
                <li>50-70% reduction in system freezes during multitasking</li>
                <li>Near elimination of disk paging for most workloads</li>
              </ul>
              
              <p class="font-medium mt-2">Installation Difficulty:</p>
              <p>Medium - Requires opening laptop bottom panel and replacing SODIMMs</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-green-50 p-3 rounded-md">
        <p class="font-medium">Performance Impact Analysis:</p>
        <p class="text-sm">Based on your system's current memory usage patterns, implementing the software optimizations alone could improve application loading times by 15-20%. Adding a hardware upgrade would deliver a 25-40% overall performance boost for memory-intensive applications.</p>
      </div>`;
    } else {
      return path.steps && path.steps.length > 0 ? path.steps[0].description : "";
    }
  };

  const getSelectedPathSources = (): Source[] => {
    if (!currentQueryData || !selectedPathKey) return [];
    const path = currentQueryData.resolutionPaths[selectedPathKey];
    return path?.sources || [];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex flex-col items-center py-10 px-6 pt-24">
        <div className="max-w-7xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-8 text-neutral-900">
            Ask anything
          </h1>
          
          <section className="w-full flex flex-col items-center">
            <QueryInput onSearch={handleSearch} isLoading={isLoading} suggestedQueries={suggestedQueries} />
            
            {currentQueryData && showQueryInterpretation && (
              <div className="w-full max-w-5xl mx-auto mt-8">
                <QueryInterpretation 
                  steps={currentQueryData.interpretation.steps} 
                  isVisible={showQueryInterpretation}
                  isThinking={isThinking}
                />
                
                {showResolutionOptions && (
                  <ResolutionOptions 
                    options={resolutionOptions} 
                    onSelectPath={handleSelectPath} 
                    selectedPath={selectedPathKey} 
                    isVisible={showResolutionOptions} 
                  />
                )}
                
                {showAnswer && selectedPathKey && (
                  <AIGeneratedAnswer 
                    content={getAnswerContent()} 
                    sources={getSelectedPathSources()} 
                    isVisible={showAnswer} 
                  />
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
