import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryInput from '../components/QueryInput';
import QueryInterpretation from '../components/QueryInterpretation';
import ResolutionOptions from '../components/ResolutionOptions';
import AIGeneratedAnswer from '../components/AIGeneratedAnswer';
import ConversationThread from '../components/ConversationThread';
import { mockQueries, suggestedQueries, Source } from '../data/mockData';
import { generateFollowUpSuggestions } from '../utils/followUpSuggestions';
import { MockQueryData, ResolutionPathOption, ConversationItem } from '../types';

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
  const [conversationHistory, setConversationHistory] = useState<ConversationItem[]>([]);
  const [activeConversationItemId, setActiveConversationItemId] = useState<string>('');
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  const [usedSuggestions, setUsedSuggestions] = useState<string[]>([]);

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
    
    const newItemId = uuidv4();
    setActiveConversationItemId(newItemId);
    
    setIsLoading(true);
    setShowQueryInterpretation(false);
    setShowResolutionOptions(false);
    setShowAnswer(false);
    setSelectedPathKey("");
    
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
          
          // Generate follow-up suggestions based on query
          const newSuggestions = generateFollowUpSuggestions(searchQuery, usedSuggestions);
          setFollowUpSuggestions(newSuggestions);
          setUsedSuggestions(prev => [...prev, ...newSuggestions]);
          
          setIsLoading(false);
        }, 500);
      }, 1500);
    }, 1000);
  };

  const handleSelectPath = (pathKey: string) => {
    setSelectedPathKey(pathKey);
    setTimeout(() => {
      setShowAnswer(true);
      
      // Add this conversation item to history when an answer is displayed
      if (query && currentQueryData) {
        const answerContent = getAnswerContent();
        
        // Create new conversation item
        const newItem: ConversationItem = {
          id: activeConversationItemId,
          query: query,
          answer: answerContent,
          isActive: true,
        };
        
        // Update all other items to be inactive
        setConversationHistory(prev => 
          prev.map(item => ({...item, isActive: false}))
        );
        
        // Add the new item to conversation history
        setConversationHistory(prev => [...prev, newItem]);
      }
    }, 300);
  };

  const handleFollowUpSubmit = (followUpQuery: string) => {
    // Handle follow-up queries
    handleSearch(followUpQuery);
  };

  const handleConversationItemClick = (itemId: string) => {
    // Make the clicked item active
    setConversationHistory(prev => 
      prev.map(item => ({
        ...item,
        isActive: item.id === itemId
      }))
    );
    
    // Find the item
    const selectedItem = conversationHistory.find(item => item.id === itemId);
    if (selectedItem) {
      setActiveConversationItemId(itemId);
      setQuery(selectedItem.query);
      
      // You would typically reload the answer here, but since we're using mock data,
      // we'll just update the display state
      setShowAnswer(true);
      setShowQueryInterpretation(false);
      setShowResolutionOptions(false);
    }
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
          <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
