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
  const [showResolutionOptions, setShowResolutionOptions] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQueryData, setCurrentQueryData] = useState<MockQueryData | null>(null);
  const [selectedPathKey, setSelectedPathKey] = useState<string>("");
  const [resolutionOptions, setResolutionOptions] = useState<ResolutionPathOption[]>([]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setShowQueryInterpretation(false);
    setShowResolutionOptions(false);
    setShowAnswer(false);
    setTimeout(() => {
      const matchedQuery = mockQueries.find(q => searchQuery.toLowerCase().includes(q.query.toLowerCase())) || mockQueries[0];
      setCurrentQueryData(matchedQuery);
      setTimeout(() => {
        setShowQueryInterpretation(true);
        setTimeout(() => {
          const options: ResolutionPathOption[] = Object.entries(matchedQuery.resolutionPaths).map(([key, path]) => {
            let pathDetail = "";
            let confidence = 0;
            let sourceCount = 0;
            if (key === "software") {
              confidence = 92;
              sourceCount = 245;
              pathDetail = "Current drivers detected as outdated by 3 months";
            } else if (key === "hardware") {
              confidence = 88;
              sourceCount = 189;
              pathDetail = "External GPU options and new models available";
            } else if (key === "diagnostics") {
              confidence = 85;
              sourceCount = 156;
              pathDetail = "Settings optimization for your most-used apps";
            } else if (key === "setup") {
              confidence = 94;
              sourceCount = 212;
              pathDetail = "Step-by-step setup instructions for common scenarios";
            } else if (key === "comparison") {
              confidence = 91;
              sourceCount = 178;
              pathDetail = "Compare models based on your specific needs";
            } else if (key === "troubleshooting") {
              confidence = 89;
              sourceCount = 201;
              pathDetail = "Solutions for common issues with detailed steps";
            } else if (key === "diskOptimization") {
              confidence = 94;
              sourceCount = 237;
              pathDetail = "Storage performance analysis and optimization";
            } else if (key === "startupOptimization") {
              confidence = 91;
              sourceCount = 184;
              pathDetail = "Identify and disable unnecessary startup items";
            } else if (key === "memoryManagement") {
              confidence = 89;
              sourceCount = 176;
              pathDetail = "Free up and optimize RAM usage";
            }
            return {
              key,
              name: path.name,
              icon: path.icon,
              description: key === "software" ? "Free software and driver updates" : key === "hardware" ? "Recommended upgrades for better performance" : key === "diagnostics" ? "App-specific performance tips" : key === "setup" ? "First-time setup guide" : key === "comparison" ? "Find the right model for your needs" : key === "troubleshooting" ? "Resolve common webcam issues" : key === "diskOptimization" ? "Optimize storage performance" : key === "startupOptimization" ? "Streamline system startup" : key === "memoryManagement" ? "Improve RAM utilization" : "Improve system performance",
              confidence,
              sources: sourceCount,
              detail: pathDetail
            };
          });
          setResolutionOptions(options);
          setShowResolutionOptions(true);
          setIsLoading(false);
        }, 500);
      }, 1000);
    }, 1500);
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
        <li><strong>Update NVIDIA Graphics Driver</strong> - Your current driver is 3 months out of date. The latest version (535.98) includes specific optimizations for your hardware.</li>
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
    } else if (selectedPathKey === "setup") {
      return `<h3 class="text-lg font-medium mb-3">Logitech Webcam: Complete Setup Guide</h3>
      
      <p class="mb-3">I've prepared a comprehensive setup guide for your Logitech webcam based on the most reliable information available:</p>
      
      <div class="bg-blue-100 p-3 rounded-md mb-4">
        <p class="font-medium">Before you begin:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>Unbox your webcam and remove all packaging materials</li>
          <li>For optimal performance, prepare to connect directly to a USB 3.0 port (blue port)</li>
          <li>Close any applications that might use the camera</li>
        </ul>
      </div>
      
      <h4 class="font-medium mt-4 mb-2">Step-by-Step Setup:</h4>
      
      <div class="space-y-4 mb-4">
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Physical Connection</p>
            <p>Connect your Logitech webcam to an available USB port on your computer. If possible, use a USB 3.0 port (blue connector) for optimal performance and avoid using USB hubs.</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Driver Installation</p>
            <p>Wait for automatic driver installation, which typically takes 30-60 seconds. For optimal functionality, download and install Logitech G HUB software from the <a href="#" class="text-blue-600 underline">official Logitech website</a>.</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Configure Settings</p>
            <p>Open Logitech G HUB software to access advanced features:</p>
            <ul class="list-disc pl-5 mt-1">
              <li>Adjust video resolution (recommended: 1080p for meetings)</li>
              <li>Configure field of view</li>
              <li>Enable/disable auto-focus</li>
              <li>Adjust brightness, contrast, and color settings</li>
            </ul>
          </div>
        </div>
        
        <div class="flex items-start">
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
          <div>
            <p class="font-medium">Test Video Conference</p>
            <p>Open your preferred video conferencing application (Zoom, Teams, Google Meet) and select your Logitech webcam as the video source in the settings menu.</p>
          </div>
        </div>
      </div>
      
      <p class="mb-3">For video conferencing optimization, consider these additional settings:</p>
      <ul class="list-disc pl-5 mb-4">
        <li>Enable background noise cancellation for clearer audio</li>
        <li>Position the webcam slightly above eye level for the most flattering angle</li>
        <li>Ensure proper lighting from the front rather than behind you</li>
      </ul>`;
    } else if (selectedPathKey === "comparison") {
      return `<h3 class="text-lg font-medium mb-3">Logitech Webcam: Product Comparison Guide</h3>
      
      <p class="mb-3">Based on your query, I've analyzed the current Logitech webcam lineup to help you find the right model for your video conferencing needs:</p>
      
      <div class="space-y-6 mb-5">
        <div class="border rounded-md p-3">
          <h4 class="font-medium text-blue-700">Entry Level: Logitech C920s HD Pro</h4>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p class="text-sm font-medium">Price Range:</p>
              <p>$60-70</p>
            </div>
            <div>
              <p class="text-sm font-medium">Resolution:</p>
              <p>1080p/30fps</p>
            </div>
            <div>
              <p class="text-sm font-medium">Key Features:</p>
              <ul class="list-disc pl-4 text-sm">
                <li>Dual microphones</li>
                <li>Privacy shutter</li>
                <li>Automatic light correction</li>
              </ul>
            </div>
            <div>
              <p class="text-sm font-medium">Best For:</p>
              <p>Regular video calls, general use</p>
            </div>
          </div>
        </div>
        
        <div class="border rounded-md p-3">
          <h4 class="font-medium text-blue-700">Mid-Range: Logitech C922 Pro Stream</h4>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p class="text-sm font-medium">Price Range:</p>
              <p>$80-100</p>
            </div>
            <div>
              <p class="text-sm font-medium">Resolution:</p>
              <p>1080p/30fps or 720p/60fps</p>
            </div>
            <div>
              <p class="text-sm font-medium">Key Features:</p>
              <ul class="list-disc pl-4 text-sm">
                <li>Background replacement</li>
                <li>Superior low-light performance</li>
                <li>Stereo audio</li>
              </ul>
            </div>
            <div>
              <p class="text-sm font-medium">Best For:</p>
              <p>Frequent meetings, basic content creation</p>
            </div>
          </div>
        </div>
        
        <div class="border rounded-md p-3 bg-blue-50">
          <h4 class="font-medium text-blue-700">Premium: Logitech StreamCam</h4>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p class="text-sm font-medium">Price Range:</p>
              <p>$150-170</p>
            </div>
            <div>
              <p class="text-sm font-medium">Resolution:</p>
              <p>1080p/60fps</p>
            </div>
            <div>
              <p class="text-sm font-medium">Key Features:</p>
              <ul class="list-disc pl-4 text-sm">
                <li>USB-C connection</li>
                <li>Smart auto-focus and framing</li>
                <li>Vertical video option</li>
              </ul>
            </div>
            <div>
              <p class="text-sm font-medium">Best For:</p>
              <p>Professional video conferencing, content creation</p>
            </div>
          </div>
          <div class="mt-2 text-sm bg-green-100 p-2 rounded-md">
            <p class="font-medium">Recommended for your needs based on analysis of similar user profiles</p>
          </div>
        </div>
      </div>
      
      <p>For professional video conferencing, the StreamCam offers the best balance of quality and features, with superior color accuracy and frame rate that creates a more professional appearance in meetings.</p>`;
    } else if (selectedPathKey === "troubleshooting") {
      return `<h3 class="text-lg font-medium mb-3">Logitech Webcam: Troubleshooting Guide</h3>
      
      <p class="mb-3">Based on diagnostic information and common issues, I've created this troubleshooting guide for Logitech webcam problems:</p>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
        <p class="font-medium">Before advanced troubleshooting:</p>
        <p>Try these quick fixes that resolve 70% of webcam issues:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>Disconnect and reconnect the webcam</li>
          <li>Try a different USB port (preferably USB 3.0)</li>
          <li>Restart your computer</li>
          <li>Check if the webcam is being used by another application</li>
        </ul>
      </div>
      
      <div class="space-y-5 mb-4">
        <div>
          <h4 class="font-medium text-blue-700 mb-2">Issue: Webcam Not Detected</h4>
          <div class="pl-4 border-l-2 border-gray-300">
            <p class="font-medium mb-1">Potential causes:</p>
            <ul class="list-disc pl-5 mb-2">
              <li>Hardware connection problems</li>
              <li>Driver issues</li>
              <li>Privacy settings blocking access</li>
            </ul>
            
            <p class="font-medium mb-1">Solution steps:</p>
            <ol class="list-decimal pl-5">
              <li class="mb-1">Check Device Manager to see if the webcam appears:
                <ul class="list-disc pl-5 mt-1 text-sm">
                  <li>Press Win+X and select "Device Manager"</li>
                  <li>Look under "Cameras" or "Imaging devices"</li>
                  <li>If you see a yellow exclamation mark, right-click and select "Update driver"</li>
                </ul>
              </li>
              <li class="mb-1">Check Windows privacy settings:
                <ul class="list-disc pl-5 mt-1 text-sm">
                  <li>Go to Settings > Privacy & Security > Camera</li>
                  <li>Ensure "Camera access" is turned on</li>
                  <li>Make sure your apps have permission to access the camera</li>
                </ul>
              </li>
              <li class="mb-1">Reinstall Logitech software:
                <ul class="list-disc pl-5 mt-1 text-sm">
                  <li>Uninstall current Logitech software (Control Panel > Programs)</li>
                  <li>Download fresh copy from Logitech's official website</li>
                  <li>Install and restart your system</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
        
        <div>
          <h4 class="font-medium text-blue-700 mb-2">Issue: Poor Video Quality</h4>
          <div class="pl-4 border-l-2 border-gray-300">
            <p class="font-medium mb-1">Potential causes:</p>
            <ul class="list-disc pl-5 mb-2">
              <li>Insufficient lighting</li>
              <li>Incorrect resolution settings</li>
              <li>Bandwidth limitations</li>
            </ul>
            
            <p class="font-medium mb-1">Solution steps:</p>
            <ol class="list-decimal pl-5">
              <li class="mb-1">Optimize lighting conditions:
                <ul class="list-disc pl-5 mt-1 text-sm">
                  <li>Position light sources in front of you, not behind</li>
                  <li>Avoid mixing different light temperatures (warm/cool)</li>
                  <li>Consider a ring light for optimal video quality</li>
                </ul>
              </li>
              <li class="mb-1">Adjust camera settings in Logitech G HUB:
                <ul class="list-disc pl-5 mt-1 text-sm">
                  <li>Increase brightness and contrast</li>
                  <li>Enable RightLight feature if available</li>
                  <li>Manually focus if auto-focus is causing issues</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      <p>If these solutions don't resolve your issue, Logitech offers comprehensive support through their <a href="#" class="text-blue-600 underline">support website</a> or by contacting their customer service.</p>`;
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
            <div class="bg-white p-2 rounded-md text-sm border border-gray-200">
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

  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex flex-col items-center py-10 px-6 pt-24">
        <div className="max-w-7xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-8 text-neutral-900">
            Ask anything
          </h1>
          
          <section className="w-full flex flex-col items-center">
            <QueryInput onSearch={handleSearch} isLoading={isLoading} suggestedQueries={suggestedQueries} />
            
            {currentQueryData && showQueryInterpretation && <div className="w-full max-w-5xl mx-auto mt-8">
                <QueryInterpretation steps={currentQueryData.interpretation.steps} isVisible={showQueryInterpretation} />
                
                {showResolutionOptions && <ResolutionOptions options={resolutionOptions} onSelectPath={handleSelectPath} selectedPath={selectedPathKey} isVisible={showResolutionOptions} />}
                
                {showAnswer && selectedPathKey && <AIGeneratedAnswer content={getAnswerContent()} sources={getSelectedPathSources()} isVisible={showAnswer} />}
              </div>}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>;
};

export default Index;
