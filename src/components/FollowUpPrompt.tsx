
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input } from './ui/input';
import FollowUpChip from './FollowUpChip';
import AIGeneratedAnswer from './AIGeneratedAnswer';

interface FollowUpPromptProps {
  currentQuery: string;
  isVisible: boolean;
}

interface FollowUpAnswer {
  question: string;
  content: string;
  originalQuery: string;
}

const FollowUpPrompt: React.FC<FollowUpPromptProps> = ({ 
  currentQuery,
  isVisible 
}) => {
  const [followUpText, setFollowUpText] = useState('');
  const [followUpAnswers, setFollowUpAnswers] = useState<FollowUpAnswer[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAskedFollowUp, setHasAskedFollowUp] = useState(false);

  if (!isVisible) return null;

  // Generate follow-up suggestions based on the current query
  const getSuggestions = (): string[] => {
    const defaultSuggestions = [
      "What else should I check?",
      "How do I fix this if that didn't work?",
      "Is there a deeper issue?"
    ];

    if (currentQuery.toLowerCase().includes('dell graphics')) {
      return [
        "How can I check if my drivers are up to date?",
        "What are the minimum requirements for gaming?",
        "Will these changes affect battery life?"
      ];
    } else if (currentQuery.toLowerCase().includes('webcam problem')) {
      return [
        "How do I update my webcam drivers?",
        "Could my antivirus be blocking it?",
        "Will this fix work for all video calls?"
      ];
    } else if (currentQuery.toLowerCase().includes('computer is slow')) {
      return [
        "What tools can I use to monitor performance?",
        "How often should I perform these fixes?",
        "Could malware be causing my slow performance?"
      ];
    }

    return defaultSuggestions;
  };

  const suggestions = getSuggestions();

  // Mock sources for follow-up answers
  const getMockSources = (question: string) => {
    // Default sources
    const defaultSources = [
      {
        type: "official",
        title: "Dell Technical Support Documentation",
        date: "Updated March 2025",
        metadata: "Official Source",
        confidence: 95,
        excerpt: "Regular maintenance of your Dell system ensures optimal performance and longevity."
      },
      {
        type: "community",
        title: "Dell Community Forums",
        date: "Discussion from February 2025",
        metadata: "Community Source",
        confidence: 87,
        excerpt: "Many users report performance improvements after following these recommended maintenance steps."
      }
    ];

    // Add question-specific sources
    if (question.toLowerCase().includes('drivers')) {
      return [
        {
          type: "official",
          title: "Dell Driver Management Guide",
          date: "Updated April 2025",
          metadata: "Official Source",
          confidence: 98,
          excerpt: "Keeping graphics drivers updated is crucial for optimal performance, especially with Intel Iris Xe graphics."
        },
        {
          type: "technical",
          title: "Intel Driver Documentation",
          date: "Technical Reference 2025",
          metadata: "Partner Documentation",
          confidence: 96,
          excerpt: "Intel recommends quarterly driver updates for integrated graphics solutions in laptop environments."
        },
        ...defaultSources
      ];
    } 
    
    if (question.toLowerCase().includes('gaming') || question.toLowerCase().includes('requirements')) {
      return [
        {
          type: "research",
          title: "Dell XPS Gaming Performance Analysis",
          date: "Tech Review March 2025",
          metadata: "Research Report",
          confidence: 92,
          excerpt: "Intel Iris Xe graphics can handle most esports titles at 1080p with low to medium settings."
        },
        {
          type: "technical",
          title: "Intel Iris Xe Gaming Benchmark Database",
          date: "Performance Data 2025",
          metadata: "Benchmarking Data",
          confidence: 94,
          excerpt: "The Intel Iris Xe can deliver 60+ FPS in popular titles like Valorant when properly configured."
        },
        ...defaultSources
      ];
    }

    if (question.toLowerCase().includes('battery')) {
      return [
        {
          type: "official",
          title: "Dell Power Management Guide",
          date: "Updated February 2025",
          metadata: "Official Documentation",
          confidence: 97,
          excerpt: "High Performance power plans can reduce battery life by 25-40% compared to Balanced modes."
        },
        {
          type: "research",
          title: "Laptop Battery Optimization Study",
          date: "Research Paper 2025",
          metadata: "Academic Source",
          confidence: 89,
          excerpt: "Graphics driver updates have minimal to positive impact on battery efficiency in current generation systems."
        },
        ...defaultSources
      ];
    }

    if (question.toLowerCase().includes('webcam') || question.toLowerCase().includes('camera')) {
      return [
        {
          type: "official",
          title: "Logitech Webcam Troubleshooting Guide",
          date: "Updated March 2025",
          metadata: "Manufacturer Documentation",
          confidence: 96,
          excerpt: "Regular driver updates ensure compatibility with the latest video conferencing platforms."
        },
        {
          type: "technical",
          title: "Windows 11 Camera Access Management",
          date: "Microsoft Documentation 2025",
          metadata: "OS Documentation",
          confidence: 95,
          excerpt: "Applications require explicit permission to access camera hardware in Windows 11."
        },
        ...defaultSources
      ];
    }

    return defaultSources;
  };

  const processFollowUpQuestion = (question: string) => {
    if (question.trim() === '' || isProcessing || hasAskedFollowUp) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      let answer = '';
      
      // Generate relevant response based on the follow-up question
      if (question.toLowerCase().includes('drivers up to date')) {
        answer = `<h4 class="text-lg font-medium mb-2">Checking Your Graphics Drivers Status</h4>
        <p class="mb-3">Building on our previous conversation about Dell graphics performance, here's a comprehensive guide to verify your drivers are current:</p>
        <div class="bg-blue-50 p-3 rounded-md mb-4">
          <p class="font-medium">Modern Driver Management Approach:</p>
          <p class="text-sm">Graphics drivers now significantly impact not just performance but also security, power efficiency, and feature compatibility. Keeping them updated is more critical than ever with modern applications.</p>
        </div>
        <ol class="list-decimal pl-5 mb-4 space-y-2">
          <li><strong>Dell Command Update</strong> - This proprietary Dell tool provides the most reliable driver packages specifically tested for your system configuration. Launch Dell Command Update from your Start menu and click "Check" to scan for updates.</li>
          <li><strong>Intel Driver & Support Assistant</strong> - For your Iris Xe graphics, Intel's official tool can sometimes provide newer drivers than Dell's repository. Visit intel.com/support/detect to install the assistant.</li>
          <li><strong>Windows Update Advanced Options</strong> - Windows 11 now offers optional driver updates. Go to Settings > Windows Update > Advanced options > Optional updates to check for available graphics driver updates.</li>
        </ol>
        <p class="mb-3">For your specific Dell XPS with Intel Iris Xe graphics, I'd recommend first checking with Dell Command Update for the manufacturer-approved driver, then consulting Intel's assistant if you need bleeding-edge performance for gaming or creative applications.</p>
        <div class="bg-yellow-50 p-3 rounded-md">
          <p class="font-medium">Important Note:</p>
          <p class="text-sm">If you're using an external display through USB-C/Thunderbolt, make sure to also update your chipset and Thunderbolt drivers, as these can significantly impact external display performance with integrated graphics.</p>
        </div>`;
      } else if (question.toLowerCase().includes('minimum requirements')) {
        answer = `<h4 class="text-lg font-medium mb-2">Gaming Capabilities of Your Dell XPS with Intel Iris Xe</h4>
        <p class="mb-3">Expanding on our earlier discussion about graphics performance, here's a detailed breakdown of gaming capabilities on your specific hardware:</p>
        
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-md mb-4">
          <p class="font-medium mb-2">Intel Iris Xe Graphics Profile:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>96 Execution Units (significantly better than older Intel UHD)</li>
            <li>Shared system memory with dynamic allocation</li>
            <li>Hardware-accelerated DirectX 12 and Vulkan support</li>
            <li>Variable Rate Shading (VRS) capability</li>
          </ul>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="bg-green-50 p-3 rounded-md h-full">
            <p class="font-medium text-green-800 border-b border-green-200 pb-1 mb-2">Excellent Performance (60+ FPS)</p>
            <ul class="list-disc pl-5 text-sm space-y-2">
              <li><strong>Esports Titles:</strong> Valorant, CS:GO, League of Legends, Dota 2, Rocket League (1080p, medium settings)</li>
              <li><strong>Indie Games:</strong> Stardew Valley, Hades, Hollow Knight, Ori series (1080p, max settings)</li>
              <li><strong>Older AAA Titles:</strong> Skyrim, Fallout 4, GTA V (720p-1080p, low settings)</li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 p-3 rounded-md h-full">
            <p class="font-medium text-yellow-800 border-b border-yellow-200 pb-1 mb-2">Playable (30-60 FPS)</p>
            <ul class="list-disc pl-5 text-sm space-y-2">
              <li><strong>Mid-range AAA:</strong> The Witcher 3, Tomb Raider series, Resident Evil 2/3 Remake (720p, low settings)</li>
              <li><strong>Strategy Games:</strong> Civilization VI, Age of Empires IV, Total War: Warhammer II (1080p, low-medium, reduced battle size)</li>
              <li><strong>Racing Games:</strong> Forza Horizon 4, GRID, F1 series (720p, low-medium)</li>
            </ul>
          </div>
          
          <div class="bg-red-50 p-3 rounded-md h-full">
            <p class="font-medium text-red-800 border-b border-red-200 pb-1 mb-2">Challenging/Not Recommended</p>
            <ul class="list-disc pl-5 text-sm space-y-2">
              <li><strong>Modern AAA:</strong> Cyberpunk 2077, Assassin's Creed Valhalla, Red Dead Redemption 2</li>
              <li><strong>Ray-Tracing Titles:</strong> Control, Metro Exodus Enhanced, Watch Dogs: Legion</li>
              <li><strong>Poorly Optimized Ports:</strong> Elden Ring, Ark: Survival Evolved</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-blue-50 p-3 rounded-md mb-4">
          <p class="font-medium">Performance Enhancement Tips:</p>
          <ol class="list-decimal pl-5 text-sm mt-1">
            <li><strong>Intel Graphics Command Center:</strong> Use the "Game" optimization feature to automatically configure optimal settings for detected games</li>
            <li><strong>Power Mode:</strong> Always use "Best Performance" power mode when gaming (plugged in)</li>
            <li><strong>Resolution Scaling:</strong> Many modern games have 80% or 75% resolution scaling that significantly improves performance with minimal visual degradation</li>
            <li><strong>Game Streaming:</strong> Consider GeForce Now, Xbox Cloud Gaming, or Amazon Luna for AAA gaming with your current hardware</li>
          </ol>
        </div>
        
        <p>The Intel Iris Xe in your Dell XPS represents a significant leap over previous integrated graphics solutions but still falls short of dedicated GPUs. For the best experience, focus on optimizing the games in the "Excellent" and "Playable" categories using the tips provided.</p>`;
      } else if (question.toLowerCase().includes('battery life')) {
        answer = `<h4 class="text-lg font-medium mb-2">Graphics Optimizations and Battery Life Impact</h4>
        <p class="mb-3">Building on our earlier discussion about Dell graphics performance, here's a detailed analysis of how the recommended optimizations affect battery life:</p>
        
        <div class="overflow-x-auto mb-5">
          <table class="min-w-full border-collapse">
            <thead class="bg-gray-100">
              <tr>
                <th class="border border-gray-300 px-4 py-2 text-left">Optimization</th>
                <th class="border border-gray-300 px-4 py-2 text-center">Battery Impact</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Performance Gain</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">High Performance Power Plan</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <span class="inline-block bg-red-100 text-red-800 rounded-full px-3 py-1 text-xs font-medium">-30% to -45%</span>
                </td>
                <td class="border border-gray-300 px-4 py-2">+15-25% in demanding applications</td>
                <td class="border border-gray-300 px-4 py-2 text-sm">Use only when plugged in</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">Latest Intel Graphics Driver</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <span class="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">+5% to +10%</span>
                </td>
                <td class="border border-gray-300 px-4 py-2">+5-15% in supported applications</td>
                <td class="border border-gray-300 px-4 py-2 text-sm">Always recommended</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">Intel Dynamic Tuning</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <span class="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium">+5% to +15%</span>
                </td>
                <td class="border border-gray-300 px-4 py-2">+10-20% in sustained workloads</td>
                <td class="border border-gray-300 px-4 py-2 text-sm">Always recommended</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">Game Mode Enabled</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <span class="inline-block bg-red-100 text-red-800 rounded-full px-3 py-1 text-xs font-medium">-15% to -25%</span>
                </td>
                <td class="border border-gray-300 px-4 py-2">+5-10% in games</td>
                <td class="border border-gray-300 px-4 py-2 text-sm">Only during gaming sessions</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2 font-medium">Display Color Enhancement</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <span class="inline-block bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-xs font-medium">-3% to -8%</span>
                </td>
                <td class="border border-gray-300 px-4 py-2">Visual improvement only</td>
                <td class="border border-gray-300 px-4 py-2 text-sm">Optional, based on preference</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-50 p-3 rounded-md">
            <h5 class="font-medium mb-2">Optimizing for Battery Life</h5>
            <ol class="list-decimal pl-5 text-sm">
              <li>Use Intel's "Battery Saver" graphics profile when mobile</li>
              <li>Set Windows power mode to "Battery saver" or "Balanced"</li>
              <li>Lower screen brightness to 50% or less</li>
              <li>Enable Dynamic Refresh Rate if supported (in Display settings)</li>
              <li>Use Dell Power Manager to select "Quiet" thermal profile</li>
            </ol>
          </div>
          
          <div class="bg-purple-50 p-3 rounded-md">
            <h5 class="font-medium mb-2">Optimizing for Performance</h5>
            <ol class="list-decimal pl-5 text-sm">
              <li>Connect to AC power whenever possible</li>
              <li>Use "Best Performance" power mode</li>
              <li>Select "Ultra Performance" thermal profile in Dell Power Manager</li>
              <li>Close unnecessary background applications</li>
              <li>Use external cooling pad for extended high-performance sessions</li>
            </ol>
          </div>
        </div>
        
        <p class="mb-3">The most effective approach is to create multiple profiles based on your usage scenarios:</p>
        
        <div class="flex items-center space-x-2 mb-4">
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <p class="text-sm font-medium">Use the Windows built-in power mode shortcuts in the system tray to quickly switch between battery-optimized and performance modes.</p>
        </div>
        
        <p>Remember that Intel's latest drivers have significantly improved power management, so keeping your system updated provides both performance and battery life benefits in most scenarios.</p>`;
      } else if (question.toLowerCase().includes('monitor performance')) {
        answer = `<h4 class="text-lg font-medium mb-2">Comprehensive System Performance Monitoring</h4>
        <p class="mb-3">Expanding on our previous performance discussion, here are the best tools and methodologies for effectively monitoring your system:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div class="border border-blue-200 rounded-lg p-4 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-blue-100 rounded-full"></div>
            <h5 class="font-medium text-blue-800 mb-2 relative z-10">Built-in Windows Tools</h5>
            <ul class="list-disc pl-5 text-sm space-y-2 relative z-10">
              <li>
                <strong>Task Manager (Advanced View)</strong>
                <p class="text-xs text-gray-600 mt-1">Press Ctrl+Shift+Esc, click "More details" and use the Performance tab. Shows real-time CPU, GPU, Memory, Disk, and Network usage with graph history.</p>
              </li>
              <li>
                <strong>Resource Monitor</strong>
                <p class="text-xs text-gray-600 mt-1">Type "resmon" in Start menu. Provides granular details on system resources including per-process metrics and disk queue information.</p>
              </li>
              <li>
                <strong>Windows Performance Monitor</strong>
                <p class="text-xs text-gray-600 mt-1">Type "perfmon" in Start menu. Advanced monitoring with data collection sets, reporting, and alert capabilities.</p>
              </li>
              <li>
                <strong>DirectX Diagnostic Tool</strong>
                <p class="text-xs text-gray-600 mt-1">Type "dxdiag" in Start menu. Useful for checking graphics driver details, feature support, and running tests.</p>
              </li>
            </ul>
          </div>
          
          <div class="border border-purple-200 rounded-lg p-4 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-purple-100 rounded-full"></div>
            <h5 class="font-medium text-purple-800 mb-2 relative z-10">Third-Party Utilities</h5>
            <ul class="list-disc pl-5 text-sm space-y-2 relative z-10">
              <li>
                <strong>HWiNFO</strong> <span class="text-xs bg-green-100 text-green-800 px-1 rounded">Free</span>
                <p class="text-xs text-gray-600 mt-1">Comprehensive hardware monitoring including detailed sensor readings, temperature tracking, and clock speeds.</p>
              </li>
              <li>
                <strong>MSI Afterburner</strong> <span class="text-xs bg-green-100 text-green-800 px-1 rounded">Free</span>
                <p class="text-xs text-gray-600 mt-1">Primarily for GPU monitoring and overclocking, includes on-screen display for in-game performance metrics.</p>
              </li>
              <li>
                <strong>Intel XTU (Extreme Tuning Utility)</strong> <span class="text-xs bg-green-100 text-green-800 px-1 rounded">Free</span>
                <p class="text-xs text-gray-600 mt-1">Specifically for Intel CPUs, provides detailed performance metrics and power consumption data.</p>
              </li>
              <li>
                <strong>LatencyMon</strong> <span class="text-xs bg-green-100 text-green-800 px-1 rounded">Free</span>
                <p class="text-xs text-gray-600 mt-1">Analyzes system for DPC latency issues that can cause stuttering and audio glitches.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-md mb-4">
          <h5 class="font-medium mb-2">Strategic Performance Monitoring Workflow</h5>
          <ol class="list-decimal pl-5 text-sm space-y-2">
            <li>
              <strong>Establish Baseline Performance</strong>
              <p class="text-xs text-gray-700 mt-1">Before making any system changes, record key metrics during typical workloads to establish a baseline for comparison.</p>
            </li>
            <li>
              <strong>Identify Performance Bottlenecks</strong>
              <p class="text-xs text-gray-700 mt-1">Monitor all subsystems simultaneously to determine which component limits performance (CPU, GPU, RAM, disk, or thermal).</p>
            </li>
            <li>
              <strong>Track Thermal Behavior Over Time</strong>
              <p class="text-xs text-gray-700 mt-1">Performance drops often correlate with thermal throttling after extended usage. Monitor temperatures during 30+ minute sessions.</p>
            </li>
            <li>
              <strong>Background Process Analysis</strong>
              <p class="text-xs text-gray-700 mt-1">Use Resource Monitor to identify and address background processes consuming resources unnecessarily.</p>
            </li>
            <li>
              <strong>Compare Before/After Optimization</strong>
              <p class="text-xs text-gray-700 mt-1">After implementing the recommended optimizations from our earlier discussion, repeat identical workloads to quantify improvements.</p>
            </li>
          </ol>
        </div>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md mb-4">
          <p class="font-medium">Dell-Specific Monitoring Tools:</p>
          <ul class="list-disc pl-5 text-sm mt-1">
            <li><strong>Dell Power Manager</strong> provides thermal management profiles and battery health monitoring</li>
            <li><strong>Dell Support Assist</strong> includes hardware diagnostic tests and performance optimization suggestions</li>
            <li><strong>Dell Performance Optimizer</strong> (on some models) provides workload-specific tuning for creative applications</li>
          </ul>
        </div>
        
        <p>For your specific situation with the Dell XPS, I recommend starting with HWiNFO to monitor temperatures and clock speeds during typical tasks, which will quickly reveal if thermal throttling is limiting your performance.</p>`;
      } else if (question.toLowerCase().includes('how often')) {
        answer = `<h4 class="text-lg font-medium mb-2">Optimal Maintenance Schedule for Peak Performance</h4>
        <p class="mb-3">Based on our previous discussion about system performance, here's a comprehensive maintenance calendar to keep your Dell XPS running optimally:</p>
        
        <div class="mb-5 overflow-hidden rounded-lg border border-gray-200">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-3 text-white">
            <h5 class="font-medium">System Maintenance Calendar</h5>
          </div>
          
          <div class="grid grid-cols-1 divide-y divide-gray-200">
            <div class="p-4 bg-blue-50">
              <h6 class="font-medium flex items-center">
                <span class="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-800 text-xs flex items-center justify-center mr-2">W</span>
                Weekly Tasks <span class="text-xs text-gray-500 ml-2">(~5 minutes)</span>
              </h6>
              <ul class="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>Empty Recycle Bin and Downloads folder</li>
                <li>Run Windows Defender quick scan</li>
                <li>Clear browser caches if experiencing slowdowns</li>
                <li>Restart computer completely (not just sleep/hibernate)</li>
                <li>Check Windows Update for pending security updates</li>
              </ul>
            </div>
            
            <div class="p-4">
              <h6 class="font-medium flex items-center">
                <span class="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-800 text-xs flex items-center justify-center mr-2">M</span>
                Monthly Tasks <span class="text-xs text-gray-500 ml-2">(15-20 minutes)</span>
              </h6>
              <ul class="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>Run Disk Cleanup including system files (search for "disk cleanup" in Start)</li>
                <li>Check Dell Support Assist for driver and BIOS updates</li>
                <li>Run Intel Driver & Support Assistant for graphics driver updates</li>
                <li>Uninstall unused applications via Settings > Apps</li>
                <li>Check startup programs in Task Manager and disable unnecessary items</li>
                <li>Run "defrag" command to optimize SSD (Windows 10/11 properly handles SSD optimization)</li>
                <li>Clean external vents with compressed air (with computer powered off)</li>
              </ul>
            </div>
            
            <div class="p-4 bg-blue-50">
              <h6 class="font-medium flex items-center">
                <span class="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-800 text-xs flex items-center justify-center mr-2">Q</span>
                Quarterly Tasks <span class="text-xs text-gray-500 ml-2">(30-45 minutes)</span>
              </h6>
              <ul class="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>Run CHKDSK tool to check disk integrity:
                  <ul class="list-circle pl-5 text-xs space-y-1 mt-1">
                    <li>Open Command Prompt as administrator</li>
                    <li>Type: chkdsk C: /f /r</li>
                    <li>Schedule check for next restart</li>
                  </ul>
                </li>
                <li>Run System File Checker to repair Windows files:
                  <ul class="list-circle pl-5 text-xs space-y-1 mt-1">
                    <li>Open Command Prompt as administrator</li>
                    <li>Type: sfc /scannow</li>
                  </ul>
                </li>
                <li>Check battery health in Dell Power Manager</li>
                <li>Review Event Viewer for recurring system errors:
                  <ul class="list-circle pl-5 text-xs space-y-1 mt-1">
                    <li>Type "eventvwr" in Start menu</li>
                    <li>Check Windows Logs > System for Critical and Error entries</li>
                  </ul>
                </li>
                <li>Recalibrate battery if experiencing inconsistent battery life</li>
              </ul>
            </div>
            
            <div class="p-4">
              <h6 class="font-medium flex items-center">
                <span class="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-800 text-xs flex items-center justify-center mr-2">A</span>
                Annual Tasks <span class="text-xs text-gray-500 ml-2">(1-2 hours)</span>
              </h6>
              <ul class="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>Complete audit of installed applications and thorough cleanup</li>
                <li>Verify and update backup solutions for important data</li>
                <li>Check warranty status and support options on Dell website</li>
                <li>Run Dell diagnostics (F12 at boot, select Diagnostics)</li>
                <li>Consider professional cleaning service for internal components if out of warranty</li>
                <li>Review and optimize OneDrive/cloud storage sync settings</li>
                <li>If performance issues persist despite maintenance, evaluate Performance Restore options:
                  <ul class="list-circle pl-5 text-xs space-y-1 mt-1">
                    <li>Windows Reset keeping personal files</li>
                    <li>Fresh Windows installation (more thorough but requires backup)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-green-50 p-3 rounded-md">
            <h5 class="font-medium text-green-800 mb-2">Automation Tips</h5>
            <ul class="list-disc pl-5 text-sm">
              <li>Create scheduled tasks for Disk Cleanup (use "/sagerun:1" parameter)</li>
              <li>Configure Windows Security for automatic scheduled scans</li>
              <li>Use Dell SupportAssist's automatic update scheduling</li>
              <li>Create calendar reminders for quarterly and annual tasks</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 p-3 rounded-md">
            <h5 class="font-medium text-purple-800 mb-2">Performance Monitoring</h5>
            <p class="text-sm mb-2">Combine your maintenance schedule with regular performance checks:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Run UserBenchmark quarterly to track performance metrics over time</li>
              <li>Note boot times occasionally to detect degradation</li>
              <li>Monitor thermal performance during intensive tasks</li>
              <li>Compare battery runtime before/after optimization cycles</li>
            </ul>
          </div>
        </div>
        
        <p>For your Dell XPS specifically, I recommend prioritizing the thermal maintenance aspects (cleaning vents, checking temperatures) as these systems can be thermally constrained due to their slim design, which directly impacts performance.</p>`;
      } else if (question.toLowerCase().includes('malware')) {
        answer = `<h4 class="text-lg font-medium mb-2">Comprehensive Malware Detection & Performance Impact Analysis</h4>
        <p class="mb-3">Expanding on our previous performance discussion, malware can indeed be a significant cause of system slowdowns. Here's an in-depth approach to identifying and addressing potential malware issues:</p>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
          <p class="font-medium">Key Malware Warning Signs on Dell Systems:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <ul class="list-disc pl-5 text-sm">
              <li>Unusual fan activity or heat when system should be idle</li>
              <li>Battery draining significantly faster than normal</li>
              <li>High disk activity with no obvious cause</li>
              <li>Performance degradation after visiting specific websites</li>
            </ul>
            <ul class="list-disc pl-5 text-sm">
              <li>Network activity when no applications are being used</li>
              <li>Windows Security or Dell security tools disabled</li>
              <li>Browser settings changed without your action</li>
              <li>Unfamiliar processes consuming high resources</li>
            </ul>
          </div>
        </div>
        
        <h5 class="font-medium mb-2 mt-4 text-blue-800">Multi-layered Malware Detection Approach</h5>
        
        <div class="space-y-4 mb-4">
          <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                <span class="text-blue-800 font-bold">1</span>
              </div>
              <div>
                <h6 class="font-medium">Initial System Scan with Windows Security</h6>
                <ol class="list-decimal pl-5 text-sm mt-1 space-y-1">
                  <li>Press Windows key, type "security", select Windows Security</li>
                  <li>Go to "Virus & threat protection"</li>
                  <li>Click "Scan options"</li>
                  <li>Select "Microsoft Defender Offline scan" (requires restart)</li>
                  <li>Click "Scan now" and allow system to restart</li>
                  <li>This offline scan can detect rootkits and boot-sector malware that conventional scans miss</li>
                </ol>
                <p class="text-xs text-gray-500 mt-2 italic">Windows Security now uses cloud-based protection and behavior analysis which significantly improves detection rates compared to older versions.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                <span class="text-blue-800 font-bold">2</span>
              </div>
              <div>
                <h6 class="font-medium">Secondary Scan with Specialized Tools</h6>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div class="border border-gray-100 rounded p-2 bg-gray-50">
                    <p class="font-medium text-sm">Malwarebytes Free</p>
                    <ul class="list-disc pl-4 text-xs mt-1">
                      <li>Excellent at detecting PUPs (Potentially Unwanted Programs)</li>
                      <li>Strong behavior-based detection</li>
                      <li>Complementary to Windows Security</li>
                      <li>Run in Safe Mode for best results</li>
                    </ul>
                  </div>
                  <div class="border border-gray-100 rounded p-2 bg-gray-50">
                    <p class="font-medium text-sm">Hitman Pro (Portable Scanner)</p>
                    <ul class="list-disc pl-4 text-xs mt-1">
                      <li>Cloud-based second-opinion scanner</li>
                      <li>No installation required</li>
                      <li>Uses multiple scanning engines</li>
                      <li>Good for verification after primary scan</li>
                    </ul>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2 italic">Using multiple scanning engines significantly increases detection rates, as different tools use different detection methods.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                <span class="text-blue-800 font-bold">3</span>
              </div>
              <div>
                <h6 class="font-medium">Advanced System Analysis</h6>
                <ol class="list-decimal pl-5 text-sm mt-1 space-y-1">
                  <li>Examine Task Manager for suspicious processes:
                    <ul class="list-disc pl-4 text-xs">
                      <li>Look for unfamiliar processes with high CPU/memory/network usage</li>
                      <li>Right-click suspicious processes and select "Search online"</li>
                      <li>Check process file locations (right-click > Open file location)</li>
                    </ul>
                  </li>
                  <li>Review startup programs:
                    <ul class="list-disc pl-4 text-xs">
                      <li>Open Task Manager > Startup tab</li>
                      <li>Research any unfamiliar entries before disabling</li>
                    </ul>
                  </li>
                  <li>Check scheduled tasks:
                    <ul class="list-disc pl-4 text-xs">
                      <li>Type "task scheduler" in Start menu</li>
                      <li>Look through Task Scheduler Library for suspicious tasks</li>
                      <li>Pay attention to recently created tasks with unusual actions</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                <span class="text-blue-800 font-bold">4</span>
              </div>
              <div>
                <h6 class="font-medium">Browser Security Check</h6>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  <div class="bg-gray-50 p-2 rounded text-xs">
                    <p class="font-medium text-sm">Chrome</p>
                    <ol class="list-decimal pl-4 mt-1">
                      <li>Menu > Settings > Extensions</li>
                      <li>Remove unknown extensions</li>
                      <li>Settings > Reset Settings</li>
                      <li>Check default search engine</li>
                    </ol>
                  </div>
                  <div class="bg-gray-50 p-2 rounded text-xs">
                    <p class="font-medium text-sm">Edge</p>
                    <ol class="list-decimal pl-4 mt-1">
                      <li>Menu > Extensions</li>
                      <li>Remove unknown add-ons</li>
                      <li>Settings > Reset Settings</li>
                      <li>Check startup pages</li>
                    </ol>
                  </div>
                  <div class="bg-gray-50 p-2 rounded text-xs">
                    <p class="font-medium text-sm">Firefox</p>
                    <ol class="list-decimal pl-4 mt-1">
                      <li>Menu > Add-ons and themes</li>
                      <li>Remove suspicious extensions</li>
                      <li>Help > Troubleshooting Information</li>
                      <li>Click "Refresh Firefox"</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-md mb-4">
          <h5 class="font-medium mb-2">Performance Recovery After Malware Removal</h5>
          <p class="text-sm mb-2">After successful malware removal, these steps can help restore optimal performance:</p>
          <ol class="list-decimal pl-5 text-sm space-y-1">
            <li>Run System File Checker to repair damaged Windows files:
              <code class="block bg-blue-100 p-1 rounded text-xs mt-1">sfc /scannow</code>
            </li>
            <li>Clean registry issues with a reputable cleaner like CCleaner (use with caution)</li>
            <li>Reset Windows networking stack if experiencing connection issues:
              <code class="block bg-blue-100 p-1 rounded text-xs mt-1">netsh winsock reset</code>
            </li>
            <li>Verify that all Windows Security features are re-enabled</li>
            <li>Update all applications to patch potential vulnerabilities</li>
            <li>Create a new system restore point after cleanup</li>
          </ol>
        </div>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-md">
          <p class="font-medium">Prevention Strategy for Your Dell System:</p>
          <ul class="list-disc pl-5 text-sm mt-1">
            <li>Keep both Windows and Dell security solutions updated</li>
            <li>Enable controlled folder access in Windows Security to prevent ransomware</li>
            <li>Create a standard user account for daily use (don't use administrator account daily)</li>
            <li>Consider hardware-isolated browsing with Windows Sandbox for suspicious sites</li>
            <li>Enable Enhanced Phishing Protection in Windows 11 (Settings > Privacy & Security)</li>
          </ul>
        </div>`;
      } else if (question.toLowerCase().includes('update my webcam')) {
        answer = `<h4 class="text-lg font-medium mb-2">Comprehensive Webcam Driver Update Guide</h4>
        <p class="mb-3">Building on our previous webcam troubleshooting discussion, here's a detailed walkthrough for properly updating your webcam drivers:</p>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-5">
          <h5 class="font-medium mb-2">Before You Begin: Driver Update Best Practices</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-white p-2 rounded shadow-sm">
              <p class="text-sm font-medium text-blue-800">✓ Do</p>
              <ul class="list-disc pl-4 text-xs">
                <li>Backup current drivers before updating</li>
                <li>Close all applications using the webcam</li>
                <li>Connect to stable power source</li>
                <li>Have stable internet connection</li>
                <li>Note current driver version for reference</li>
              </ul>
            </div>
            <div class="bg-white p-2 rounded shadow-sm">
              <p class="text-sm font-medium text-red-800">✗ Don't</p>
              <ul class="list-disc pl-4 text-xs">
                <li>Install drivers from unverified sources</li>
                <li>Use driver updater tools from untrusted sources</li>
                <li>Cancel driver installation mid-process</li>
                <li>Update multiple device drivers simultaneously</li>
                <li>Ignore hardware compatibility warnings</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="space-y-5 mb-5">
          <div class="border-l-4 border-blue-500 pl-4">
            <h5 class="font-medium">Option 1: Update via Manufacturer's Website (Most Reliable)</h5>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <div class="bg-gray-50 p-3 rounded shadow-sm">
                <p class="text-sm font-medium mb-1">For Logitech Webcams</p>
                <ol class="list-decimal pl-4 text-xs space-y-1">
                  <li>Visit <a href="#" class="text-blue-600">support.logi.com</a></li>
                  <li>Click "Webcams" category</li>
                  <li>Select your specific model</li>
                  <li>Download "Logitech Capture" software</li>
                  <li>Or use Logitech G HUB for gaming models</li>
                  <li>These software packages include the latest drivers</li>
                </ol>
                <p class="text-xs italic mt-2">Logitech webcams work best with their proprietary software which optimizes settings and ensures full functionality.</p>
              </div>
              
              <div class="bg-gray-50 p-3 rounded shadow-sm">
                <p class="text-sm font-medium mb-1">For Dell Integrated Webcams</p>
                <ol class="list-decimal pl-4 text-xs space-y-1">
                  <li>Visit <a href="#" class="text-blue-600">dell.com/support</a></li>
                  <li>Enter your Service Tag or detect PC</li>
                  <li>Go to "Drivers & Downloads"</li>
                  <li>Filter for "Camera, Webcam, Webcam Software"</li>
                  <li>Download the latest version</li>
                  <li>Run installer with administrator rights</li>
                </ol>
                <p class="text-xs italic mt-2">Dell often bundles webcam drivers with other multimedia packages for optimal compatibility with system components.</p>
              </div>
              
              <div class="bg-gray-50 p-3 rounded shadow-sm">
                <p class="text-sm font-medium mb-1">For Other Webcam Brands</p>
                <ol class="list-decimal pl-4 text-xs space-y-1">
                  <li>Check model number on device</li>
                  <li>Visit manufacturer's support site</li>
                  <li>Microsoft LifeCam: microsoft.com/accessories</li>
                  <li>Razer: razer.com/support</li>
                  <li>Creative: creative.com/support</li>
                  <li>Generic webcams: check model documentation</li>
                </ol>
                <p class="text-xs italic mt-2">For lesser-known brands, the Windows Update method may be more reliable than hunting for potentially outdated manufacturer websites.</p>
              </div>
            </div>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4">
            <h5 class="font-medium">Option 2: Device Manager Update (Convenient)</h5>
            <div class="mt-2 bg-gray-50 p-3 rounded shadow-sm">
              <ol class="list-decimal pl-5 text-sm space-y-2">
                <li>Press <kbd class="bg-gray-200 px-1 rounded">Win+X</kbd> and select "Device Manager"</li>
                <li>Expand the following categories to locate your webcam:
                  <ul class="list-disc pl-5 text-xs mt-1">
                    <li>"Cameras" (Windows 10/11)</li>
                    <li>"Imaging devices" (older Windows versions)</li>
                    <li>"Sound, video and game controllers" (some webcams)</li>
                  </ul>
                </li>
                <li>Right-click your webcam and select "Update driver"</li>
                <li>Choose "Search automatically for updated driver software"</li>
                <li>If Windows finds an update, follow the prompts to install</li>
                <li>If no update is found, try the "Search for updated drivers on Windows Update" option</li>
                <li>Restart your computer after installation</li>
              </ol>
              <div class="mt-3 bg-yellow-50 p-2 rounded text-xs">
                <p class="font-medium">Note:</p>
                <p>Windows sometimes identifies generic drivers as "up to date" even when manufacturer-specific drivers might offer better performance and features. If Device Manager doesn't find updates, still check the manufacturer's website.</p>
              </div>
            </div>
          </div>
          
          <div class="border-l-4 border-purple-500 pl-4">
            <h5 class="font-medium">Option 3: Driver Update Software (If Options 1 & 2 Fail)</h5>
            <div class="mt-2 bg-gray-50 p-3 rounded shadow-sm">
              <p class="text-sm mb-2">Reliable third-party driver update solutions:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-white p-2 rounded border border-gray-200">
                  <p class="text-sm font-medium">Dell SupportAssist</p>
                  <ul class="list-disc pl-4 text-xs mt-1">
                    <li>Pre-installed on most Dell systems</li>
                    <li>Specifically optimized for Dell hardware</li>
                    <li>Maintains compatibility with system BIOS</li>
                    <li>Includes automated driver updates</li>
                    <li>Free for Dell computer owners</li>
                  </ul>
                </div>
                <div class="bg-white p-2 rounded border border-gray-200">
                  <p class="text-sm font-medium">Intel Driver & Support Assistant</p>
                  <ul class="list-disc pl-4 text-xs mt-1">
                    <li>Free tool from Intel</li>
                    <li>Works well for Intel webcams</li>
                    <li>Covers all Intel components</li>
                    <li>Automatically checks for updates</li>
                    <li>Very reliable and lightweight</li>
                  </ul>
                </div>
              </div>
              <div class="mt-3 bg-red-50 p-2 rounded text-xs">
                <p class="font-medium">Warning:</p>
                <p>Avoid driver updater tools that use aggressive advertising or require payment. Many free driver updater tools bundle unwanted software or provide outdated drivers. Stick with reputable options from established companies.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-3 rounded-lg mb-4">
          <h5 class="font-medium mb-2">Troubleshooting After Driver Update</h5>
          <div class="space-y-2">
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                <span class="text-blue-800 font-bold text-xs">1</span>
              </div>
              <p class="text-sm">If webcam doesn't work after update, try the driver rollback feature:
                <ul class="list-disc pl-5 text-xs mt-1">
                  <li>Open Device Manager and locate your webcam</li>
                  <li>Right-click and select "Properties"</li>
                  <li>Go to the "Driver" tab</li>
                  <li>Click "Roll Back Driver" if available</li>
                </ul>
              </p>
            </div>
            
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                <span class="text-blue-800 font-bold text-xs">2</span>
              </div>
              <p class="text-sm">If no rollback option is available, try a complete reinstall:
                <ul class="list-disc pl-5 text-xs mt-1">
                  <li>In Device Manager, right-click the webcam</li>
                  <li>Select "Uninstall device"</li>
                  <li>Check "Delete the driver software for this device" if available</li>
                  <li>Click "Uninstall" and restart your computer</li>
                  <li>Windows should automatically reinstall basic drivers</li>
                  <li>Then install the manufacturer's drivers again</li>
                </ul>
              </p>
            </div>
            
            <div class="flex items-start">
              <div class="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                <span class="text-blue-800 font-bold text-xs">3</span>
              </div>
              <p class="text-sm">Check Windows privacy settings after driver updates:
                <ul class="list-disc pl-5 text-xs mt-1">
                  <li>Go to Settings > Privacy & Security > Camera</li>
                  <li>Ensure "Camera access" is turned On</li>
                  <li>Verify that Microsoft Teams has permission under "Let apps access your camera"</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        
        <p>Following these comprehensive steps should resolve most webcam driver issues. Remember that for optimal video call quality, a good webcam driver is just one component—also ensure adequate lighting and stable internet connection.</p>`;
      } else if (question.toLowerCase().includes('antivirus')) {
        answer = `<h4 class="text-lg font-medium mb-2">Resolving Antivirus Webcam Blocking Issues</h4>
        <p class="mb-3">Building on our previous webcam troubleshooting, security software is indeed a common cause of webcam access problems. Here's a comprehensive guide to identifying and fixing antivirus-related webcam blocking:</p>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-5">
          <h5 class="font-medium mb-3">Understanding Webcam Protection Features</h5>
          <p class="text-sm mb-3">Modern security suites include webcam protection to prevent unauthorized access and potential privacy violations. While these features enhance security, they can inadvertently block legitimate applications like Microsoft Teams.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-3 rounded shadow-sm">
              <p class="font-medium text-sm">How Protection Works</p>
              <ul class="list-disc pl-5 text-xs mt-1 space-y-1">
                <li>Monitors all attempts to access webcam hardware</li>
                <li>Maintains a whitelist of approved applications</li>
                <li>Blocks or requires permission for non-whitelisted apps</li>
                <li>Often operates at the driver or system level</li>
                <li>May reset permissions after updates or reboots</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded shadow-sm">
              <p class="font-medium text-sm">Common Symptoms</p>
              <ul class="list-disc pl-5 text-xs mt-1 space-y-1">
                <li>Webcam works in some apps but not others</li>
                <li>Camera fails after security software updates</li>
                <li>Notification about blocked camera access</li>
                <li>Camera works in Safe Mode but not normal boot</li>
                <li>Error messages about missing or unavailable camera</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="space-y-4 mb-5">
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div class="flex items-start">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEMzMS4wNDU3IDAgNDAgOC45NTQzIDQwIDIwQzQwIDMxLjA0NTcgMzEuMDQ1NyA0MCAyMCA0MEw4Ljk1NDMgNDAgMCA0MFYyMEMwIDguOTU0MyA4Ljk1NDMgMCAyMCAwWiIgZmlsbD0iI0ZGQ0QwMCIvPjxwYXRoIGQ9Ik0xNyAyNUgyM1YzMUgxN1YyNVoiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTE3IDlIMjNWMjNIMTdWOVoiIGZpbGw9ImJsYWNrIi8+PC9zdmc+" class="w-10 h-10 mr-3 flex-shrink-0" alt="Norton logo" />
              <div>
                <h5 class="font-medium">Norton 360 & Norton Security</h5>
                <ol class="list-decimal pl-5 text-sm mt-1 space-y-1">
                  <li>Open Norton 360/Security application</li>
                  <li>Click on "Device Security" or "Settings"</li>
                  <li>Select "SafeCam" or "Privacy" > "SafeCam"</li>
                  <li>Find Microsoft Teams in the applications list
                    <ul class="list-disc pl-5 text-xs mt-1">
                      <li>If not listed, click "Add Application" and browse to Teams executable</li>
                      <li>Typically located at: <code class="bg-gray-100 px-1 text-xs">C:\\Users\\[username]\\AppData\\Local\\Microsoft\\Teams\\current\\Teams.exe</code></li>
                    </ul>
                  </li>
                  <li>Change permission from "Block" or "Ask" to "Allow"</li>
                  <li>Click "Apply" or "OK" to save changes</li>
                  <li>Restart Microsoft Teams</li>
                </ol>
                <p class="text-xs text-gray-500 mt-2 italic">Norton 2023 editions have a streamlined SafeCam interface accessed directly from the main dashboard.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div class="flex items-start">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwSDQwVjQwSDBWMFoiIGZpbGw9IiMwMDZkNWMiLz48cGF0aCBkPSJNMjAgOEMxMy4zNzI2IDggOCAxMy4zNzI2IDggMjBDOCAyNi42Mjc0IDEzLjM3MjYgMzIgMjAgMzJDMjYuNjI3NCAzMiAzMiAyNi42Mjc0IDMyIDIwQzMyIDEzLjM3MjYgMjYuNjI3NCA4IDIwIDhaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==" class="w-10 h-10 mr-3 flex-shrink-0" alt="Kaspersky logo" />
              <div>
                <h5 class="font-medium">Kaspersky Internet Security & Total Security</h5>
                <ol class="list-decimal pl-5 text-sm mt-1 space-y-1">
                  <li>Open Kaspersky application</li>
                  <li>Click on "Privacy" in the main menu</li>
                  <li>Select "Webcam Protection" or "Webcam Control"</li>
                  <li>In the application list, locate Microsoft Teams
                    <ul class="list-disc pl-5 text-xs mt-1">
                      <li>If not listed, click "Add" and locate Teams application</li>
                      <li>You may need to browse to the installation folder</li>
                    </ul>
                  </li>
                  <li>Change status from "Block" or "Ask for permission" to "Allow"</li>
                  <li>Click "Save" or "Apply"</li>
                  <li>For additional apps, repeat for Zoom, Google Meet, etc.</li>
                </ol>
                <div class="bg-blue-50 p-2 rounded mt-2 text-xs">
                  <p class="font-medium">Tip for Kaspersky 2023+:</p>
                  <p>If you can't find Webcam Protection, click on "Privacy Protection" > "Privacy" > "Webcam Access Control"</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div class="flex items-start">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwSDQwVjQwSDBWMFoiIGZpbGw9IiNlZDFlNzkiLz48cGF0aCBkPSJNMjUuNjU2IDE0LjA2MkMyNS42NTYgMTEuNzE5IDIzLjc4MSA5Ljg0NCgyMS40MzggOS44NDRDMTkuMDk0IDkuODQ0IDE3LjIxOSAxMS43MTkgMTcuMjE5IDE0LjA2MkMxNy4yMTkgMTYuNDA2IDE5LjA5NCAxOC4yODEgMjEuNDM4IDE4LjI4MUMyMy43ODEgMTguMjgxIDI1LjY1NiAxNi40MDYgMjUuNjU2IDE0LjA2MlpNMTEuODc1IDIwLjg0NEMxMS44NzUgMTguNDY5IDE0LjcxOSAxNi41NjIgMTguMjgxIDE2LjU2MkgyNC41OTRDMjguMTU2IDE2LjU2MiAzMS4wIDE4LjQ2OSAzMS4wIDIwLjg0NFYyOS4yMTlDMzEuMCAzMC42NTYgMjkuODQ0IDMxLjgxMiAyOC40MDYgMzEuODEySDEzLjQwNkMxMS45NjkgMzEuODEyIDEwLjgxMiAzMC42NTYgMTAuODEyIDI5LjIxOUw5LjMxMiAyMC44NDRDOS4zMTIgMjAuODQ0IDExLjg3NSAyMC44NDQgMTEuODc1IDIwLjg0NFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+" class="w-10 h-10 mr-3 flex-shrink-0" alt="McAfee logo" />
              <div>
                <h5 class="font-medium">McAfee Total Protection & LiveSafe</h5>
                <ol class="list-decimal pl-5 text-sm mt-1 space-y-1">
                  <li>Open McAfee security center</li>
                  <li>Click on "Privacy" tab or "Privacy Center"</li>
                  <li>Select "Web & App Protection"</li>
                  <li>Click on "Manage Webcam Protection" or "App Permissions"</li>
                  <li>Find Microsoft Teams in the applications list</li>
                  <li>Toggle the permission to "Allow" or click "Trust this app"</li>
                  <li>If prompted, confirm your choice</li>
                  <li>Restart Teams application</li>
                </ol>
                <div class="bg-yellow-50 p-2 rounded mt-2 text-xs">
                  <p class="font-medium">Important Note for McAfee:</p>
                  <p>Recent McAfee versions may include "App Boost" feature that can interfere with webcam functionality. If webcam issues persist after allowing access, try temporarily disabling App Boost feature and test again.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div class="flex items-start">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwSDQwVjQwSDBWMFoiIGZpbGw9IiNlNTBkMGQiLz48cGF0aCBkPSJNMjkgMjBDMjkgMjQuOTcwNiAyNC45NzA2IDI5IDIwIDI5QzE1LjAyOTQgMjkgMTEgMjQuOTcwNiAxMSAyMEMxMSAxNS4wMjk0IDE1LjAyOTQgMTEgMjAgMTFDMjQuOTcwNiAxMSAyOSAxNS4wMjk0IDI5IDIwWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=" class="w-10 h-10 mr-3 flex-shrink-0" alt="Avast logo" />
              <div>
                <h5 class="font-medium">Avast & AVG Antivirus</h5>
                <ol class="list-decimal pl-5 text-sm mt-1 space-y-1">
                  <li>Open Avast/AVG user interface</li>
                  <li>Click on "Menu" in the top-right corner</li>
                  <li>Go to "Settings" > "Protection" or "Privacy" </li>
                  <li>Select "Webcam Shield" or "Webcam Protection"</li>
                  <li>Click on "Customize" or "Add application"</li>
                  <li>Browse and select Microsoft Teams executable</li>
                  <li>Set permission to "Allow"</li>
                  <li>Click "OK" or "Save" to apply changes</li>
                </ol>
                <p class="text-xs text-gray-500 mt-2 italic">Avast and AVG share similar interfaces since they're now owned by the same company. The location of settings may vary slightly between versions.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div class="flex items-start">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwSDQwVjQwSDBWMFoiIGZpbGw9IiMwQjc0Q0UiLz48cGF0aCBkPSJNMTQuNTg4IDExLjc4NkgxOS4wNThDMjEuNjQ2IDExLjc4NiAyMy4xMTEgMTMuMTMzIDIzLjExMSAxNS42ODNDMjMuMTExIDE4LjIzMiAyMS42NDYgMTkuNTggMTkuMDU4IDE5LjU4SDE3LjAxMlYyMy4yMTRIMTQuNTg4VjExLjc4NlpNMTkuMDU4IDEzLjg5M0gxNy4wMTJWMTcuNDczSDE5LjA1OEMyMC4xOSAxNy40NzMgMjAuNjg4IDE2Ljc2OCAyMC42ODggMTUuNjgzQzIwLjY4OCAxNC41OTggMjAuMTkgMTMuODkzIDE5LjA1OCAxMy44OTNaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0yNi40NzMgMjMuMjE0TDIyLjk3MSAxNi42NUgyNS41ODFMMjguMTA3IDIxLjU4TDMwLjYzMiAxNi42NUgzMy4yNDNMMjYuNjk3IDMxSDI0LjA4N0wyNi40NzMgMjMuMjE0WiIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTIuODU5IDI3LjgzM0w4Ljk4NSAyNy44MzNMMTAuODM3IDI1LjM1M0wxMy40ODIgMjEuNTI3TDkuNzE3IDExLjE2NUwxNC4xNjUgMTEuMTY1TDE2LjU5MyAxOC4xOTZMMTIuODU5IDI3LjgzM1oiIGZpbGw9IndoaXRlIi8+PC9zdmc+" class="w-10 h-10 mr-3 flex-shrink-0" alt="Bitdefender logo" />
              <div>
                <h5 class="font-medium">Bitdefender Total Security</h5>
                <ol class="list-decimal pl-5 text-sm mt-1 space-y-1">
                  <li>Open Bitdefender dashboard</li>
                  <li>Click on "Privacy" tile</li>
                  <li>Select "Webcam Protection"</li>
                  <li>Click on "Settings" (gear icon)</li>
                  <li>Under "Applications," find Microsoft Teams
                    <ul class="list-disc pl-5 text-xs mt-1">
                      <li>If not listed, click "Add an application"</li>
                      <li>Browse to Teams.exe location</li>
                    </ul>
                  </li>
                  <li>Set access level to "Allow access"</li>
                  <li>Click "Save" to apply changes</li>
                </ol>
                <div class="bg-blue-50 p-2 rounded mt-2 text-xs">
                  <p class="font-medium">For Bitdefender 2023+:</p>
                  <p>You may need to first disable global webcam protection by toggling off "Webcam Protection" before adding exceptions, then re-enable it after adding your applications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-4 rounded-lg bg-blue-50 mb-4">
          <h5 class="font-medium mb-2">Temporarily Disable Webcam Protection for Testing</h5>
          <p class="text-sm mb-3">If you're unsure which setting is causing the problem or can't find specific application controls, temporarily disabling webcam protection can help identify if that's the source of the issue:</p>
          
          <ol class="list-decimal pl-5 text-sm space-y-2">
            <li>Open your security software's main interface</li>
            <li>Navigate to privacy or protection settings</li>
            <li>Locate webcam protection feature</li>
            <li>Temporarily disable it (usually via toggle switch)</li>
            <li>Test your webcam in Microsoft Teams</li>
            <li>If it works, re-enable protection but add Teams as an exception</li>
            <li><strong class="text-red-600">Important:</strong> Remember to re-enable webcam protection after testing</li>
          </ol>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-green-50 p-3 rounded-md">
            <h5 class="font-medium text-green-800 mb-2">Windows 11 Built-in Camera Privacy</h5>
            <p class="text-sm mb-2">Even if you've configured your antivirus correctly, Windows has its own camera privacy settings:</p>
            <ol class="list-decimal pl-5 text-xs">
              <li>Open Windows Settings (Win+I)</li>
              <li>Go to Privacy & Security > Camera</li>
              <li>Ensure "Camera access" is On</li>
              <li>Make sure "Let apps access your camera" is On</li>
              <li>Verify Microsoft Teams is allowed in the app list</li>
            </ol>
          </div>
          
          <div class="bg-purple-50 p-3 rounded-md">
            <h5 class="font-medium text-purple-800 mb-2">Maintaining Settings After Updates</h5>
            <p class="text-sm mb-2">Antivirus updates often reset permissions. After each update:</p>
            <ul class="list-disc pl-5 text-xs">
              <li>Verify webcam permissions haven't reverted to default</li>
              <li>Check if new application paths need to be added (after Teams updates)</li>
              <li>Consider adding a calendar reminder to check settings monthly</li>
              <li>Document your specific settings path for quick reference</li>
            </ul>
          </div>
        </div>
        
        <p>By following these detailed steps for your specific security software, you should be able to resolve antivirus-related webcam blocking issues while maintaining the security benefits these features provide.</p>`;
      } else if (question.toLowerCase().includes('fix work')) {
        answer = `<h4 class="text-lg font-medium mb-2">Webcam Fix Compatibility Across Video Calling Platforms</h4>
        <p class="mb-3">Building on our previous webcam troubleshooting, let's analyze how the fixes we discussed will work across different video calling applications:</p>
        
        <div class="overflow-hidden rounded-lg border border-gray-200 mb-5">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-3">
            <h5 class="text-white font-medium">Cross-Platform Compatibility Matrix</h5>
            <p class="text-white text-opacity-80 text-sm">How each webcam fix applies across major video conferencing platforms</p>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50">
                  <th class="border border-gray-200 p-3 text-left">Fix Category</th>
                  <th class="border border-gray-200 p-3 text-center">Microsoft Teams</th>
                  <th class="border border-gray-200 p-3 text-center">Zoom</th>
                  <th class="border border-gray-200 p-3 text-center">Google Meet</th>
                  <th class="border border-gray-200 p-3 text-center">Webex</th>
                  <th class="border border-gray-200 p-3 text-center">Slack</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="border border-gray-200 p-3 font-medium">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      Driver Updates
                    </div>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td class="border border-gray-200 p-3 font-medium">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                      Windows Privacy Settings
                    </div>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td class="border border-gray-200 p-3 font-medium">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                      </svg>
                      Antivirus Exceptions
                    </div>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Partial*
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Partial*
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Partial*
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Partial*
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td class="border border-gray-200 p-3 font-medium">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      Application Cache Clear
                    </div>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      App-Specific
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      App-Specific
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      App-Specific
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      App-Specific
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td class="border border-gray-200 p-3 font-medium">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                      </svg>
                      Hardware Connectivity
                    </div>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                  <td class="border border-gray-200 p-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Full Fix
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-4 py-2 bg-gray-50 text-xs text-gray-500">
            * Requires adding each application separately to your antivirus exceptions list
          </div>
        </div>
        
        <div class="space-y-4 mb-5">
          <div class="bg-blue-50 border-l-4 border-blue-400 p-3">
            <h5 class="font-medium">Universal Fix Categories</h5>
            <p class="text-sm mt-1 mb-2">These fixes apply equally across all video calling platforms because they address fundamental system-level issues:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="bg-white p-2 rounded shadow-sm">
                <p class="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Driver Updates
                </p>
                <p class="text-xs mt-1">Updated webcam drivers provide fundamental hardware access that benefits all applications. This is the most universally effective fix.</p>
              </div>
              
              <div class="bg-white p-2 rounded shadow-sm">
                <p class="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Windows Privacy Settings
                </p>
                <p class="text-xs mt-1">Operating system camera permissions are enforced at the system level and apply to all applications requesting camera access.</p>
              </div>
              
              <div class="bg-white p-2 rounded shadow-sm">
                <p class="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Hardware Connectivity
                </p>
                <p class="text-xs mt-1">Physical connection problems, USB issues, and power management settings affect all applications that try to access the webcam hardware.</p>
              </div>
              
              <div class="bg-white p-2 rounded shadow-sm">
                <p class="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Firmware Updates
                </p>
                <p class="text-xs mt-1">For webcams with firmware (like Logitech models), firmware updates improve compatibility across all applications and resolve hardware-level bugs.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3">
            <h5 class="font-medium">Application-Specific Fix Categories</h5>
            <p class="text-sm mt-1 mb-2">These fixes need to be applied separately for each video calling application:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="bg-white p-2 rounded shadow-sm">
                <p class="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  Antivirus Exceptions
                </p>
                <p class="text-xs mt-1">Most antivirus webcam protection features require adding each video calling application separately to their allowed list.</p>
              </div>
              
              <div class="bg-white p-2 rounded shadow-sm">
                <p class="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  Application Cache Clear
                </p>
                <p class="text-xs mt-1">Each application stores its own cache data and settings, requiring specific cache clearing procedures:</p>
                <ul class="list-disc pl-4 text-xs mt-1">
                  <li><strong>Teams:</strong> %appdata%\\Microsoft\\Teams</li>
                  <li><strong>Zoom:</strong> %appdata%\\Zoom</li>
                  <li><strong>Webex:</strong> %appdata%\\Cisco Spark</li>
                </ul>
              </div>
              
              <div class="bg-white p-2 rounded shadow-sm">
                <p class="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  In-App Camera Settings
                </p>
                <p class="text-xs mt-1">Each application has its own camera configuration that needs to be separately configured:</p>
                <div class="grid grid-cols-2 gap-1 mt-1 text-xs">
                  <div><strong>Teams:</strong> Settings > Devices</div>
                  <div><strong>Zoom:</strong> Settings > Video</div>
                  <div><strong>Meet:</strong> Settings > Video</div>
                  <div><strong>Webex:</strong> Settings > Video</div>
                  <div><strong>Slack:</strong> Preferences > Audio & video</div>
                </div>
              </div>
              
              <div class="bg-white p-2 rounded shadow-sm">
                <p class="text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  Application Updates
                </p>
                <p class="text-xs mt-1">Each application needs to be individually updated to ensure compatibility with the latest webcam drivers and operating system changes.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
            <h5 class="font-medium flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Effectiveness Ranking
            </h5>
            <ol class="list-decimal pl-5 text-sm space-y-1.5">
              <li class="text-green-700 font-medium">Driver Updates <span class="text-gray-600 font-normal">(most effective, broadest impact)</span></li>
              <li class="text-green-700 font-medium">Hardware Connectivity <span class="text-gray-600 font-normal">(fundamental issue resolution)</span></li>
              <li class="text-green-700 font-medium">Windows Privacy Settings <span class="text-gray-600 font-normal">(system-level fix)</span></li>
              <li class="text-yellow-700 font-medium">Antivirus Exceptions <span class="text-gray-600 font-normal">(effective but application-specific)</span></li>
              <li class="text-yellow-700 font-medium">In-App Settings <span class="text-gray-600 font-normal">(application-specific fixes)</span></li>
              <li class="text-yellow-700 font-medium">Cache Clearing <span class="text-gray-600 font-normal">(temporary and application-specific)</span></li>
            </ol>
          </div>
          
          <div class="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg">
            <h5 class="font-medium flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Recommended Multi-App Approach
            </h5>
            <p class="text-sm mb-2">If you use multiple video calling applications, follow this strategy for maximum compatibility:</p>
            <ol class="list-decimal pl-5 text-sm space-y-1">
              <li>Start with <strong class="text-blue-700">universal fixes</strong> (drivers, Windows settings) that benefit all apps</li>
              <li>Create a <strong class="text-blue-700">checklist</strong> of all video apps you use regularly</li>
              <li>Systematically add each app to your <strong class="text-blue-700">antivirus exceptions</strong></li>
              <li>Configure <strong class="text-blue-700">in-app camera settings</strong> for each application</li>
              <li>Create a <strong class="text-blue-700">test call</strong> in each platform after applying fixes</li>
              <li>Document your specific <strong class="text-blue-700">configuration</strong> for future reference</li>
            </ol>
          </div>
        </div>
        
        <p class="text-sm italic">Building on the webcam troubleshooting we discussed previously, these fixes should provide comprehensive resolution across your video calling applications. The universal fixes should be prioritized for the broadest impact, followed by application-specific adjustments as needed.</p>`;
      } else if (question.toLowerCase().includes('fix this if')) {
        answer = `<h4 class="text-lg font-medium mb-2">Advanced Troubleshooting: When Initial Fixes Don't Work</h4>
        <p class="mb-3">Building on our earlier performance optimization discussion, if the standard fixes haven't resolved your issues, these more advanced solutions can address deeper system problems:</p>
        
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-5">
          <h5 class="font-medium mb-2">Diagnostic Approach: Isolating Root Causes</h5>
          <p class="text-sm mb-3">Before attempting advanced fixes, it's important to accurately identify which subsystem is causing your performance issues.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-center mb-2">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 mr-2 text-xs font-bold">1</span>
                <h6 class="font-medium">Run Performance Assessment</h6>
              </div>
              <p class="text-xs">Use Windows Performance Recorder to capture system metrics during slowdowns:</p>
              <ol class="list-decimal pl-4 text-xs mt-1 space-y-1">
                <li>Press <kbd class="bg-gray-100 px-1 py-0.5 rounded text-gray-800">Win+R</kbd> and type <code>wprui</code></li>
                <li>Select "First level", then "Performance scenario"</li>
                <li>Click "Start" before experiencing slowdown</li>
                <li>Reproduce the performance issue</li>
                <li>Click "Save" to generate analysis file</li>
              </ol>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-center mb-2">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 mr-2 text-xs font-bold">2</span>
                <h6 class="font-medium">Analyze Results</h6>
              </div>
              <p class="text-xs">View the recorded data in Windows Performance Analyzer:</p>
              <ol class="list-decimal pl-4 text-xs mt-1 space-y-1">
                <li>Press <kbd class="bg-gray-100 px-1 py-0.5 rounded text-gray-800">Win+R</kbd> and type <code>wpa</code></li>
                <li>Open the saved .etl file from step 1</li>
                <li>Examine CPU, Disk, and Memory graphs</li>
                <li>Identify spike patterns during slowdowns</li>
                <li>Note which processes/drivers are consuming resources</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="space-y-5 mb-5">
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-800 mr-2 flex-shrink-0">1</span>
              <span>Advanced System File Repair</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h6 class="font-medium text-red-800 mb-2">DISM Deep System Repair</h6>
                <p class="text-sm mb-2">The Deployment Image Servicing and Management tool can repair Windows component store corruption that standard SFC cannot fix:</p>
                <div class="bg-gray-50 p-2 rounded text-xs font-mono">
                  <ol class="list-decimal pl-5 space-y-1">
                    <li>Open Command Prompt as administrator</li>
                    <li>Run: <code class="bg-gray-100 px-1">DISM /Online /Cleanup-Image /CheckHealth</code></li>
                    <li>If issues found, run: <code class="bg-gray-100 px-1">DISM /Online /Cleanup-Image /ScanHealth</code></li>
                    <li>Finally, repair with: <code class="bg-gray-100 px-1">DISM /Online /Cleanup-Image /RestoreHealth</code></li>
                    <li>After DISM completes, run: <code class="bg-gray-100 px-1">sfc /scannow</code></li>
                    <li>Restart your computer</li>
                  </ol>
                </div>
                <div class="mt-2 text-xs text-gray-500 italic">
                  This process can take 20-30 minutes and requires internet connectivity to download clean system files from Microsoft.
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h6 class="font-medium text-red-800 mb-2">Windows Registry Repair</h6>
                <p class="text-sm mb-2">Registry corruption can cause various performance issues. Use the built-in registry checker:</p>
                <div class="bg-gray-50 p-2 rounded text-xs font-mono">
                  <ol class="list-decimal pl-5 space-y-1">
                    <li>Create a System Restore point first (type "create restore point" in Start)</li>
                    <li>Open Command Prompt as administrator</li>
                    <li>Type: <code class="bg-gray-100 px-1">Reg save HKLM\Software software.hiv</code></li>
                    <li>Type: <code class="bg-gray-100 px-1">Reg save HKLM\System system.hiv</code></li>
                    <li>Type: <code class="bg-gray-100 px-1">Reg restore software.hiv</code></li>
                    <li>Type: <code class="bg-gray-100 px-1">Reg restore system.hiv</code></li>
                  </ol>
                </div>
                <div class="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-2 text-xs">
                  <p class="font-medium">Warning:</p>
                  <p>Registry modifications can cause system instability if performed incorrectly. Always have a backup or system restore point before proceeding.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-800 mr-2 flex-shrink-0">2</span>
              <span>Storage Subsystem Diagnostics & Repair</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h6 class="font-medium text-orange-800 mb-2">Advanced Disk Health Analysis</h6>
                <p class="text-sm mb-2">Failing storage devices are a common cause of system-wide performance degradation that basic checks might miss:</p>
                <div class="bg-gray-50 p-2 rounded text-xs">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p class="font-medium">For SSDs:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Download manufacturer diagnostic tool:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Samsung: Samsung Magician</li>
                            <li>Intel: Intel Memory & Storage Tool</li>
                            <li>Crucial: Crucial Storage Executive</li>
                            <li>Western Digital: WD Dashboard</li>
                          </ul>
                        </li>
                        <li>Run S.M.A.R.T. diagnostics</li>
                        <li>Check "Percentage Used" (approaching 100% is critical)</li>
                        <li>Review "Total Bytes Written" vs endurance rating</li>
                      </ol>
                    </div>
                    <div>
                      <p class="font-medium">For HDDs:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Open Command Prompt as administrator</li>
                        <li>Run: <code class="bg-gray-100 px-1">wmic diskdrive get status,caption,size</code></li>
                        <li>If status isn't "OK", then:</li>
                        <li>Run: <code class="bg-gray-100 px-1">chkdsk C: /f /r /x</code></li>
                        <li>Schedule check for next restart</li>
                        <li>For full surface scan, run offline manufacturer diagnostic tool</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div class="mt-2 bg-green-50 border-l-4 border-green-400 p-2 text-xs">
                  <p class="font-medium">Critical signs of storage failure to watch for:</p>
                  <ul class="list-disc pl-4">
                    <li>System freezes during file operations</li>
                    <li>Unexplained BSOD errors with different codes each time</li>
                    <li>File corruption or disappearing files</li>
                    <li>Unusually high drive activity with minimal operations</li>
                    <li>Clicking, grinding, or unusual noises (for HDDs)</li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h6 class="font-medium text-orange-800 mb-2">Storage Driver Optimization</h6>
                <p class="text-sm mb-2">Sometimes the issue is with storage controllers rather than the physical drives:</p>
                <ol class="list-decimal pl-4 text-xs">
                  <li>Open Device Manager (right-click Start > Device Manager)</li>
                  <li>Expand "Storage controllers" and "IDE ATA/ATAPI controllers"</li>
                  <li>For each controller, right-click and select "Properties"</li>
                  <li>Go to "Driver" tab and check driver date</li>
                  <li>If drivers are more than 1 year old, click "Update Driver"</li>
                  <li>For Intel systems, download latest Intel Rapid Storage Technology (RST) driver from Dell Support</li>
                  <li>For NVMe drives, ensure NVMe-specific drivers are installed rather than generic Microsoft drivers</li>
                </ol>
                <div class="mt-2 bg-blue-50 p-2 rounded text-xs">
                  <p class="font-medium">Performance Tip:</p>
                  <p>For SSDs, ensure TRIM is enabled by opening Command Prompt as admin and typing: <code class="bg-gray-100 px-1">fsutil behavior query DisableDeleteNotify</code> - A return value of 0 means TRIM is enabled.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-800 mr-2 flex-shrink-0">3</span>
              <span>Advanced Thermal Management</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h6 class="font-medium text-purple-800 mb-2">Thermal Throttling Detection & Resolution</h6>
                <p class="text-sm mb-2">Dell laptops, especially thin models like the XPS, can experience significant thermal throttling that limits performance:</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">Detecting Thermal Throttling:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Download and install ThrottleStop or Intel XTU</li>
                      <li>Run a CPU stress test like Cinebench</li>
                      <li>Monitor for "Thermal" indicator or "PL1/PL2" power limit throttling</li>
                      <li>Watch for CPU frequency drops after temperatures reach 90-100°C</li>
                      <li>Record baseline temperature and performance metrics</li>
                    </ol>
                  </div>
                  <div class="bg-gray-50 p-2 rounded">
                    <p class="font-medium">Resolving Thermal Issues:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Update BIOS from Dell Support (may include thermal improvements)</li>
                      <li>In Dell Power Manager, select "Ultra Performance" thermal profile</li>
                      <li>Clean laptop vents using compressed air (with system powered off)</li>
                      <li>Elevate laptop rear for improved airflow (1-2 inches)</li>
                      <li>Use laptop cooling pad with active fans</li>
                      <li>For persistent issues, professional thermal paste replacement</li>
                    </ol>
                  </div>
                </div>
                <div class="mt-2 text-xs text-gray-500 italic">
                  Modern laptops often sacrifice thermal performance for thinness. Even with optimal cooling, some throttling under sustained load is normal for ultra-thin designs.
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h6 class="font-medium text-purple-800 mb-2">Advanced Processor Power Management</h6>
                <p class="text-sm mb-2">Windows power settings can significantly impact performance even with adequate cooling:</p>
                <ol class="list-decimal pl-4 text-xs space-y-1">
                  <li>Access advanced power settings by:
                    <ul class="list-disc pl-4 mt-1">
                      <li>Open Command Prompt as administrator</li>
                      <li>Type: <code class="bg-gray-100 px-1">powercfg -attributes SUB_PROCESSOR 5d76a2ca-e8c0-402f-a133-2158492d58ad -ATTRIB_HIDE</code></li>
                      <li>Open Power Options > Change plan settings > Change advanced settings</li>
                      <li>Expand "Processor power management"</li>
                    </ul>
                  </li>
                  <li>Modify these newly visible settings:
                    <ul class="list-disc pl-4 mt-1">
                      <li>Set "Processor performance core parking min cores" to 100%</li>
                      <li>Set "Processor performance time window" to at least 60 seconds</li>
                      <li>Ensure minimum processor state is 5% (allows proper sleep states)</li>
                      <li>Set maximum processor state to 100%</li>
                    </ul>
                  </li>
                  <li>Adjust system cooling policy to "Active" for maximum performance</li>
                </ol>
                <div class="mt-2 bg-yellow-50 p-2 rounded text-xs">
                  <p class="font-medium">Important Note:</p>
                  <p>These advanced settings will significantly increase power consumption and heat generation. Only use this configuration when plugged into AC power and with adequate cooling.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-800 mr-2 flex-shrink-0">4</span>
              <span>Windows Reset and Recovery Options</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h6 class="font-medium text-green-800 mb-2">Targeted Windows Reset</h6>
                <p class="text-sm mb-2">Windows 11 offers more granular reset options that can fix system issues while preserving your data:</p>
                <div class="bg-gray-50 p-2 rounded text-xs">
                  <ol class="list-decimal pl-5 space-y-1">
                    <li>Open Settings > System > Recovery</li>
                    <li>Under "Reset this PC", click "Reset PC"</li>
                    <li>Choose "Keep my files" (backs up personal files)</li>
                    <li>Select either:
                      <ul class="list-disc pl-4 mt-1">
                        <li><strong>Cloud download</strong> - Downloads fresh Windows files (better for system corruption)</li>
                        <li><strong>Local reinstall</strong> - Uses existing Windows files (faster, but may preserve some issues)</li>
                      </ul>
                    </li>
                    <li>Click "Change settings" to access advanced options:
                      <ul class="list-disc pl-4 mt-1">
                        <li>Toggle "Restore preinstalled apps" based on if you want Dell bloatware</li>
                        <li>Disable "Restore preinstalled apps" for a cleaner installation</li>
                      </ul>
                    </li>
                    <li>Follow the prompts to complete the reset</li>
                  </ol>
                </div>
                <div class="mt-2 flex items-start bg-blue-50 p-2 rounded text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mr-1 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="font-medium">What's preserved in a "Keep my files" reset:</p>
                    <ul class="list-disc pl-4">
                      <li>Personal files in your user profile (Documents, Pictures, etc.)</li>
                      <li>Microsoft Store apps (optional)</li>
                      <li>Some Windows settings (Wi-Fi passwords, etc.)</li>
                    </ul>
                    <p class="font-medium mt-1">What's removed:</p>
                    <ul class="list-disc pl-4">
                      <li>All desktop applications (need to be reinstalled)</li>
                      <li>System customizations and tweaks</li>
                      <li>Hardware driver customizations (reverts to Microsoft/Dell defaults)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h6 class="font-medium text-green-800 mb-2">In-place Upgrade Installation</h6>
                <p class="text-sm mb-2">Less drastic than a reset, an in-place upgrade repairs Windows while preserving all apps and settings:</p>
                <ol class="list-decimal pl-4 text-xs space-y-1">
                  <li>Download the Windows 11 Installation Media tool from Microsoft</li>
                  <li>Run the tool and select "Upgrade this PC now"</li>
                  <li>Choose "Keep personal files and apps" when prompted</li>
                  <li>Continue through the installation process</li>
                  <li>The system will reinstall Windows while preserving your files, applications, and most settings</li>
                  <li>After completion, check for and install any pending driver updates</li>
                </ol>
                <div class="mt-2 bg-purple-50 p-2 rounded text-xs">
                  <p class="font-medium">Benefits of In-place Upgrade vs. Reset:</p>
                  <ul class="list-disc pl-4">
                    <li>All applications remain installed and configured</li>
                    <li>Application settings and preferences are preserved</li>
                    <li>System customizations usually remain intact</li>
                    <li>Less post-installation setup required</li>
                    <li>Good option when problem is Windows-specific but applications work fine</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-4">
          <h5 class="font-medium mb-2">Hardware Upgrade Considerations</h5>
          <p class="text-sm mb-3">If software solutions haven't resolved persistent performance issues, strategic hardware upgrades can provide significant improvements:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
                <div>
                  <h6 class="font-medium">SSD Upgrade</h6>
                  <p class="text-xs mt-1">Highest performance impact for systems with mechanical HDDs:</p>
                  <ul class="list-disc pl-4 text-xs mt-1">
                    <li>Check if compatible with Dell XPS via Service Manual</li>
                    <li>NVMe PCIe Gen 4 offers best performance</li>
                    <li>Samsung 980 Pro, WD Black SN850, or Crucial P5 Plus recommended</li>
                    <li>Consider at least 1TB for future-proofing</li>
                    <li>Use Dell OS Recovery USB to reinstall Windows</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                </svg>
                <div>
                  <h6 class="font-medium">RAM Upgrade</h6>
                  <p class="text-xs mt-1">Significant for multitasking and memory-intensive applications:</p>
                  <ul class="list-disc pl-4 text-xs mt-1">
                    <li>Check maximum supported RAM via Dell Support</li>
                    <li>Verify if RAM is soldered (non-upgradeable) or SODIMM (upgradeable)</li>
                    <li>If upgradeable, install matched dual-channel kit</li>
                    <li>Minimum 16GB recommended for modern computing</li>
                    <li>32GB optimal for future-proofing and heavy multitasking</li>
                    <li>Match or exceed existing RAM speed (MHz)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clip-rule="evenodd" />
                </svg>
                <div>
                  <h6 class="font-medium">External GPU (eGPU)</h6>
                  <p class="text-xs mt-1">Dramatic graphics improvement for Thunderbolt-equipped XPS:</p>
                  <ul class="list-disc pl-4 text-xs mt-1">
                    <li>Requires Thunderbolt 3 or 4 port on laptop</li>
                    <li>Razer Core X or Sonnet eGFX Breakaway Box recommended</li>
                    <li>Mid-range GPU like RTX 3060 or RX 6700 XT provides excellent performance</li>
                    <li>Primarily beneficial for gaming and creative applications</li>
                    <li>Consider noise and desk space requirements</li>
                    <li>Setup Thunderbolt Security Level to "No Security" in BIOS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-3 bg-blue-50 rounded p-3 text-xs">
            <p class="font-medium">Before Hardware Upgrades: Dell-Specific Considerations</p>
            <ul class="list-disc pl-5">
              <li>Check warranty status - hardware modifications may void remaining coverage</li>
              <li>Consult Dell Service Manual for your specific model before opening case</li>
              <li>Use Dell diagnostic tools to verify current hardware is functioning properly</li>
              <li>Consider Dell's authorized upgrade services for warranty-safe modifications</li>
              <li>Ensure BIOS is updated to latest version before hardware changes</li>
            </ul>
          </div>
        </div>
        
        <p class="text-sm italic">Building on our previous performance discussion, these advanced troubleshooting steps address deeper system issues that might be affecting your Dell system. If basic optimizations didn't provide sufficient improvement, these techniques target more fundamental problems that could be limiting your performance.</p>`;
      } else if (question.toLowerCase().includes('deeper issue')) {
        answer = `<h4 class="text-lg font-medium mb-2">Investigating the Underlying System Architecture</h4>
        <p class="mb-3">Building upon our previous performance discussions, let's examine potential deeper structural issues that could be affecting your system. These advanced diagnostic approaches can uncover root causes that typical troubleshooting might miss:</p>
        
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg mb-5">
          <h5 class="font-medium mb-3">System Architecture Deep Dive</h5>
          <p class="text-sm mb-4">Modern computing performance depends on complex interactions between hardware subsystems, firmware, and software layers. Let's analyze each layer for potential issues:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg shadow-sm p-3">
              <div class="flex items-center mb-2">
                <div class="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 7H7v6h6V7z" />
                    <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h6 class="font-medium">Hardware Layer</h6>
              </div>
              <ul class="list-disc pl-5 text-xs space-y-1.5">
                <li><span class="font-medium">Processor Interconnects</span>: Inadequate cooling can reduce inter-core communication efficiency</li>
                <li><span class="font-medium">Memory Controller</span>: Architectural bottlenecks in controller rather than RAM itself</li>
                <li><span class="font-medium">PCIe Bandwidth</span>: Shared lanes limiting multiple device performance</li>
                <li><span class="font-medium">Voltage Regulation</span>: Unstable power delivery causing performance throttling</li>
                <li><span class="font-medium">Bus Speed Limitations</span>: Mismatched component capabilities</li>
              </ul>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-3">
              <div class="flex items-center mb-2">
                <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h6 class="font-medium">Firmware Layer</h6>
              </div>
              <ul class="list-disc pl-5 text-xs space-y-1.5">
                <li><span class="font-medium">BIOS Microcode</span>: Outdated processor microcode updates affecting instruction handling</li>
                <li><span class="font-medium">Power Management</span>: Aggressive power throttling not aligned with workloads</li>
                <li><span class="font-medium">Memory Timing Tables</span>: Suboptimal RAM timings in BIOS configuration</li>
                <li><span class="font-medium">Device Initialization</span>: POST procedures consuming excessive boot time</li>
                <li><span class="font-medium">Firmware Compatibility</span>: Conflicts between component firmware versions</li>
              </ul>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-3">
              <div class="flex items-center mb-2">
                <div class="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h6 class="font-medium">Operating System Layer</h6>
              </div>
              <ul class="list-disc pl-5 text-xs space-y-1.5">
                <li><span class="font-medium">I/O Scheduling</span>: Suboptimal disk request handling</li>
                <li><span class="font-medium">Process Prioritization</span>: Background tasks competing with foreground applications</li>
                <li><span class="font-medium">Memory Management</span>: Fragmentation and page file issues</li>
                <li><span class="font-medium">Driver Stack Conflicts</span>: Competing or redundant driver implementations</li>
                <li><span class="font-medium">Security Mitigations</span>: Performance impact from vulnerability patches</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="space-y-5 mb-5">
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">1</span>
              <span>BIOS/UEFI Configuration Analysis</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-blue-800 mb-2">Advanced BIOS Optimization for Dell XPS</h6>
                <p class="text-sm mb-3">The BIOS/UEFI firmware layer controls fundamental system behavior that can significantly impact performance:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium mb-2">Key BIOS Parameters to Check</p>
                    <ul class="list-disc pl-4 space-y-1">
                      <li><span class="font-medium">Intel SpeedStep/AMD Cool'n'Quiet</span>: Should be enabled for balanced systems, disabled for maximum performance</li>
                      <li><span class="font-medium">C-States</span>: Deeper C-states improve battery life but can introduce latency</li>
                      <li><span class="font-medium">Intel Turbo Boost/AMD Turbo Core</span>: Should always be enabled unless thermal concerns</li>
                      <li><span class="font-medium">Memory Profile</span>: Should be set to XMP/DOCP if available</li>
                      <li><span class="font-medium">SATA Operation Mode</span>: Confirm set to AHCI or RAID, not IDE</li>
                      <li><span class="font-medium">System Fan Control</span>: Can be set to "Performance" for better cooling</li>
                    </ul>
                  </div>
                  
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium mb-2">Accessing Dell XPS BIOS</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Power off the computer completely</li>
                      <li>Press power button, then immediately tap F2 repeatedly</li>
                      <li>Navigate using arrow keys and Enter</li>
                      <li>Alternative method:
                        <ul class="list-disc pl-4 mt-1">
                          <li>From Windows, hold Shift while clicking Restart</li>
                          <li>Choose Troubleshoot > Advanced options > UEFI Firmware Settings</li>
                        </ul>
                      </li>
                      <li>After changes, select Apply then Exit</li>
                      <li>System will restart with new settings</li>
                    </ol>
                  </div>
                </div>
                
                <div class="mt-3 bg-yellow-50 p-3 rounded text-xs">
                  <p class="font-medium">Dell XPS BIOS Security Warning:</p>
                  <p>Recent Dell BIOS updates have implemented stricter security defaults that can impact performance. Check these settings:</p>
                  <ul class="list-disc pl-4 mt-1">
                    <li><span class="font-medium">Intel Platform Trust Technology (PTT)</span>: Enabling adds security but with minor performance impact</li>
                    <li><span class="font-medium">Virtualization Technology</span>: Required for VMs but uses resources</li>
                    <li><span class="font-medium">Secure Boot</span>: Little performance impact, recommended to leave enabled</li>
                    <li><span class="font-medium">TPM</span>: Required for Windows 11 but minimal performance impact</li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-blue-800 mb-2">BIOS Version Assessment</h6>
                <p class="text-sm mb-2">Dell regularly releases BIOS updates that address performance issues and compatibility:</p>
                
                <div class="overflow-x-auto">
                  <table class="min-w-full text-xs">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-3 py-2 text-left">BIOS Component</th>
                        <th class="px-3 py-2 text-left">What to Check</th>
                        <th class="px-3 py-2 text-left">Impact on Performance</th>
                        <th class="px-3 py-2 text-left">How to Verify/Update</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-3 py-2 font-medium">CPU Microcode</td>
                        <td class="px-3 py-2">Version number in detailed BIOS info</td>
                        <td class="px-3 py-2">Critical - affects instruction handling and security mitigations</td>
                        <td class="px-3 py-2">Updated with BIOS updates from Dell Support</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-medium">Memory Training</td>
                        <td class="px-3 py-2">Boot time and memory stability</td>
                        <td class="px-3 py-2">High - impacts RAM performance and stability</td>
                        <td class="px-3 py-2">BIOS updates often improve memory compatibility</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-medium">Thermal Profiles</td>
                        <td class="px-3 py-2">Available thermal options in BIOS</td>
                        <td class="px-3 py-2">High - determines throttling thresholds</td>
                        <td class="px-3 py-2">Dell Power Manager application and BIOS Thermal settings</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-medium">Power Management</td>
                        <td class="px-3 py-2">C-State and P-State implementations</td>
                        <td class="px-3 py-2">Medium - affects responsiveness and battery life</td>
                        <td class="px-3 py-2">Updated with BIOS updates, check Dell release notes</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-medium">Security Mitigations</td>
                        <td class="px-3 py-2">Spectre, Meltdown, and other patches</td>
                        <td class="px-3 py-2">Medium to High - some mitigations significantly reduce performance</td>
                        <td class="px-3 py-2">Check BIOS release notes for microcode updates</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                  <div class="bg-green-50 p-2 rounded">
                    <p class="font-medium">Checking Current BIOS Version:</p>
                    <ol class="list-decimal pl-4 mt-1">
                      <li>Press Win+R, type <code class="bg-gray-100 px-1">msinfo32</code> and press Enter</li>
                      <li>Look for "BIOS Version/Date" in System Summary</li>
                      <li>Note both version number and date</li>
                    </ol>
                  </div>
                  <div class="bg-blue-50 p-2 rounded">
                    <p class="font-medium">Updating BIOS Safely:</p>
                    <ol class="list-decimal pl-4 mt-1">
                      <li>Connect laptop to AC power (critical)</li>
                      <li>Backup important data before starting</li>
                      <li>Download BIOS from official Dell Support site only</li>
                      <li>Close all applications before installation</li>
                      <li>Do not interrupt the update process</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-800 mr-2 flex-shrink-0">2</span>
              <span>Advanced Driver Architecture Investigation</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-purple-800 mb-2">Driver Stack Analysis</h6>
                <p class="text-sm mb-3">Modern Windows systems use a complex driver stack where issues in one layer can affect overall performance:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div class="bg-purple-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Critical Driver Categories to Evaluate:</p>
                      <ul class="list-disc pl-4 space-y-1">
                        <li><span class="font-medium">Chipset Drivers</span>: Foundation for hardware communication</li>
                        <li><span class="font-medium">Storage Controller Drivers</span>: Determine disk throughput</li>
                        <li><span class="font-medium">Graphics Drivers</span>: Handle GPU resource management</li>
                        <li><span class="font-medium">Network Interface Drivers</span>: Control connection stability</li>
                        <li><span class="font-medium">Audio Drivers</span>: Can cause unexpected CPU usage</li>
                        <li><span class="font-medium">Power Management Drivers</span>: Affect throttling behavior</li>
                      </ul>
                    </div>
                    
                    <div class="bg-blue-50 p-3 rounded">
                      <p class="font-medium mb-1">Using Driver Verifier:</p>
                      <p class="mb-2">Windows includes a powerful tool to test driver reliability:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Run Command Prompt as administrator</li>
                        <li>Type <code class="bg-gray-100 px-1">verifier</code> and press Enter</li>
                        <li>Select "Create standard settings"</li>
                        <li>Choose "Select driver names from a list"</li>
                        <li>Select suspect drivers to verify</li>
                        <li>Restart system to begin verification</li>
                        <li>If system crashes, the flagged driver is problematic</li>
                      </ol>
                      <p class="text-gray-500 italic mt-1">Warning: Only use on suspected problematic drivers; verifying all drivers may cause system instability</p>
                    </div>
                  </div>
                  
                  <div>
                    <div class="bg-gray-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Driver Source Hierarchy (Best to Worst):</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li><span class="font-medium">Dell-provided drivers</span>: Specifically tested with your hardware</li>
                        <li><span class="font-medium">Component manufacturer drivers</span>: Intel, AMD, Realtek, etc.</li>
                        <li><span class="font-medium">Microsoft Windows Update drivers</span>: Generally stable but may lack optimizations</li>
                        <li><span class="font-medium">Generic Microsoft inbox drivers</span>: Functional but minimal features</li>
                      </ol>
                      <p class="mt-2">For Dell XPS systems, always prioritize Dell-provided drivers for integrated components.</p>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                      <p class="font-medium mb-1">Advanced Driver Investigation Commands:</p>
                      <div class="space-y-2">
                        <div>
                          <p>Check driver load order and status:</p>
                          <code class="block bg-gray-100 p-1 mt-1 text-xs">driverquery /v /fo list</code>
                        </div>
                        <div>
                          <p>List third-party drivers:</p>
                          <code class="block bg-gray-100 p-1 mt-1 text-xs">fltmc</code>
                        </div>
                        <div>
                          <p>Generate detailed system driver report:</p>
                          <code class="block bg-gray-100 p-1 mt-1 text-xs">powershell "Get-WmiObject Win32_PnPSignedDriver | Select DeviceName, DriverVersion, Manufacturer | Sort-Object DeviceName | Format-Table -AutoSize"</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-3 bg-red-50 p-3 rounded text-xs">
                  <p class="font-medium">Dell XPS-Specific Driver Issues:</p>
                  <ul class="list-disc pl-4 mt-1">
                    <li><span class="font-medium">Intel Dynamic Tuning Technology</span>: Newer versions improve thermal management but may conflict with Dell Power Manager</li>
                    <li><span class="font-medium">Realtek Audio</span>: Known to cause DPC latency issues (audio stuttering, mouse lag) in some driver versions</li>
                    <li><span class="font-medium">Killer Wireless</span>: Some versions exhibit high CPU usage and connection instability</li>
                    <li><span class="font-medium">Intel Management Engine</span>: Required but older versions can consume excessive resources</li>
                    <li><span class="font-medium">Dell Power Manager Service</span>: Monitor CPU usage, as some versions have high background utilization</li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-purple-800 mb-2">DPC Latency Analysis</h6>
                <p class="text-sm mb-3">Deferred Procedure Calls (DPCs) occur when drivers interrupt the CPU. High DPC latency causes stuttering and responsiveness issues:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium">Symptoms of DPC Latency Problems:</p>
                    <ul class="list-disc pl-4 mt-1 space-y-1">
                      <li>Audio stuttering or crackling</li>
                      <li>Mouse cursor lagging or jumping</li>
                      <li>Video playback stuttering</li>
                      <li>System feels unresponsive despite low CPU usage</li>
                      <li>USB devices disconnecting intermittently</li>
                      <li>Bluetooth audio skipping</li>
                    </ul>
                  </div>
                  
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium">Measuring DPC Latency:</p>
                    <ol class="list-decimal pl-4 mt-1 space-y-1">
                      <li>Download LatencyMon tool</li>
                      <li>Close all other applications</li>
                      <li>Run LatencyMon as administrator</li>
                      <li>Click "Start" and let it monitor for 5+ minutes</li>
                      <li>Use system normally during measurement</li>
                      <li>Check "Drivers" tab for highest execution times</li>
                      <li>Red indicators show problematic drivers</li>
                    </ol>
                  </div>
                  
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium">Common DPC Latency Offenders:</p>
                    <ul class="list-disc pl-4 mt-1 space-y-1">
                      <li><code>ndis.sys</code> - Network drivers</li>
                      <li><code>wdf01000.sys</code> - Windows Driver Foundation</li>
                      <li><code>nvlddmkm.sys</code> - NVIDIA graphics</li>
                      <li><code>igdkmd64.sys</code> - Intel graphics</li>
                      <li><code>ataport.sys</code> - Disk controllers</li>
                      <li><code>RTKVHD64.sys</code> - Realtek audio</li>
                      <li><code>dxgkrnl.sys</code> - DirectX graphics kernel</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mt-3 bg-green-50 p-3 rounded text-xs">
                  <p class="font-medium">Resolving DPC Latency Issues:</p>
                  <ol class="list-decimal pl-4 mt-1">
                    <li>For identified problematic drivers:
                      <ul class="list-disc pl-4 mt-1">
                        <li>Update to latest version first</li>
                        <li>If problems persist, try rolling back to previous version</li>
                        <li>As last resort, try generic Microsoft driver</li>
                      </ul>
                    </li>
                    <li>For Wireless/Bluetooth issues:
                      <ul class="list-disc pl-4 mt-1">
                        <li>Change wireless channel on router</li>
                        <li>Disable power management for wireless adapter</li>
                        <li>Update wireless adapter drivers</li>
                      </ul>
                    </li>
                    <li>For storage-related latency:
                      <ul class="list-disc pl-4 mt-1">
                        <li>Update storage controller drivers</li>
                        <li>Disable Windows write-cache buffer flushing</li>
                        <li>Check for disk health issues</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-800 mr-2 flex-shrink-0">3</span>
              <span>Power and Thermal Architecture Optimization</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-green-800 mb-2">Advanced Power Delivery Analysis</h6>
                <p class="text-sm mb-3">Modern laptop CPUs are often limited by power delivery and thermal constraints rather than intrinsic performance:</p>
                
                <div class="overflow-x-auto">
                  <table class="min-w-full text-xs">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-3 py-2 text-left">Power Limit</th>
                        <th class="px-3 py-2 text-left">Description</th>
                        <th class="px-3 py-2 text-left">Impact</th>
                        <th class="px-3 py-2 text-left">Optimization</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="px-3 py-2 font-medium">PL1 (Power Limit 1)</td>
                        <td class="px-3 py-2">Sustained power limit the CPU can maintain indefinitely</td>
                        <td class="px-3 py-2">Determines long-term performance under load</td>
                        <td class="px-3 py-2">Dell Power Manager "Ultra Performance" raises this limit</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-medium">PL2 (Power Limit 2)</td>
                        <td class="px-3 py-2">Short burst power limit for Turbo Boost operation</td>
                        <td class="px-3 py-2">Affects responsiveness and peak performance</td>
                        <td class="px-3 py-2">BIOS updates and power profile adjustments</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-medium">Tau (Time)</td>
                        <td class="px-3 py-2">Duration CPU can stay at PL2 before dropping to PL1</td>
                        <td class="px-3 py-2">Affects sustained burst performance</td>
                        <td class="px-3 py-2">Better cooling extends this window</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-medium">Current Limit (ICCMAX)</td>
                        <td class="px-3 py-2">Maximum current the VRM can deliver to the CPU</td>
                        <td class="px-3 py-2">Hard limit on peak performance</td>
                        <td class="px-3 py-2">Fixed in hardware design, not adjustable</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-medium">Temperature Limit (TJMAX)</td>
                        <td class="px-3 py-2">Temperature at which CPU throttles to prevent damage</td>
                        <td class="px-3 py-2">Determines thermal throttling threshold</td>
                        <td class="px-3 py-2">Improve cooling to stay below this limit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium">Monitoring Power Limits:</p>
                    <ol class="list-decimal pl-4 mt-1 space-y-1">
                      <li>Download and install Intel XTU or HWiNFO64</li>
                      <li>In HWiNFO, check under CPU section for:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Power Limit Throttling (Yes/No)</li>
                          <li>Current Package Power</li>
                          <li>Power Limit 1/2 values</li>
                        </ul>
                      </li>
                      <li>Monitor during performance tests to identify limiting factors</li>
                      <li>Look for "EDP Other" or "VR Thermal" limiters in Intel CPUs</li>
                    </ol>
                  </div>
                  
                  <div class="bg-green-50 p-3 rounded">
                    <p class="font-medium">Dell XPS Power Optimization:</p>
                    <ol class="list-decimal pl-4 mt-1 space-y-1">
                      <li>Update to latest BIOS (often improves power management)</li>
                      <li>Install Dell Power Manager and set thermal profile to "Ultra Performance"</li>
                      <li>Use Dell Command | Power Manager to:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Set "Peak Shift" to reduce battery usage during high power cost times</li>
                          <li>Configure "Advanced Charge" for battery longevity</li>
                          <li>Inspect battery health and calibration status</li>
                        </ul>
                      </li>
                      <li>Ensure laptop is using the original Dell power adapter (third-party adapters may limit power delivery)</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-green-800 mb-2">Advanced Thermal Management</h6>
                <p class="text-sm mb-3">Dell XPS laptops use sophisticated but constrained cooling systems that benefit from optimization:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div class="bg-gray-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">XPS Thermal Architecture Insights:</p>
                      <ul class="list-disc pl-4 space-y-1">
                        <li>Shared heat pipes between CPU and GPU create thermal interdependence</li>
                        <li>Fan profiles prioritize acoustics over thermal performance by default</li>
                        <li>Slim chassis limits cooling capacity and airflow volume</li>
                        <li>VRM (Voltage Regulator Module) thermal limits often reached before CPU thermal limits</li>
                        <li>Thermal paste degradation occurs faster in thin-and-light designs due to thermal cycling</li>
                      </ul>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                      <p class="font-medium mb-1">Advanced Thermal Monitoring:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Install HWiNFO64 in sensor-only mode</li>
                        <li>Monitor these key metrics:
                          <ul class="list-disc pl-4 mt-1">
                            <li>CPU Package Temperature</li>
                            <li>CPU Core temperatures (individual cores)</li>
                            <li>CPU Power (Package)</li>
                            <li>GPU Temperature</li>
                            <li>VRM Temperature (if available)</li>
                            <li>CPU Fan Speed (RPM)</li>
                            <li>Thermal Throttling status indicators</li>
                          </ul>
                        </li>
                        <li>Log data during stress tests to identify throttling patterns</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div>
                    <div class="bg-green-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Advanced Thermal Solutions:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>BIOS-level adjustments:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Ensure latest BIOS with improved thermal algorithms</li>
                            <li>Check for "Thermal Management" options in BIOS</li>
                          </ul>
                        </li>
                        <li>Software adjustments:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Set Dell Power Manager to "Ultra Performance"</li>
                            <li>Use Windows Power profile "Best Performance"</li>
                            <li>Disable unneeded startup applications that generate heat</li>
                          </ul>
                        </li>
                        <li>Hardware adjustments:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Ensure all vents are unobstructed (check for dust buildup)</li>
                            <li>Elevate rear of laptop 1-2 inches for improved airflow</li>
                            <li>Use laptop cooling pad with fans aligned to intake vents</li>
                            <li>For advanced users: replace thermal paste with premium compound</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                    
                    <div class="bg-yellow-50 p-3 rounded">
                      <p class="font-medium mb-1">XPS-Specific Thermal Issues:</p>
                      <ul class="list-disc pl-4 space-y-1">
                        <li>Dell's BIOS often controls fan curves conservatively to reduce noise</li>
                        <li>VRM temperatures may limit performance before CPU reaches thermal limits</li>
                        <li>Thunderbolt controller and SSD can contribute significantly to overall heat</li>
                        <li>Some models exhibit uneven heat distribution across CPU cores</li>
                        <li>Carbon fiber palm rest models have different thermal characteristics than aluminum models</li>
                        <li>Internal thermal pads may degrade over time, requiring replacement in older systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div class="mt-3 bg-blue-50 p-3 rounded text-xs">
                  <p class="font-medium">Professional Thermal Solutions (Warranty Consideration):</p>
                  <p class="mb-2">For persistent thermal issues after trying all software approaches, consider these professional solutions (note: may void warranty):</p>
                  <ul class="list-disc pl-4">
                    <li><span class="font-medium">Thermal Repasting</span>: Replace factory thermal compound with premium options like Thermal Grizzly Kryonaut</li>
                    <li><span class="font-medium">Thermal Pad Replacement</span>: Replace stock thermal pads with higher performance versions for VRM and memory components</li>
                    <li><span class="font-medium">Fan Cleaning/Replacement</span>: Professional cleaning or replacement of fans that have developed bearing noise</li>
                    <li><span class="font-medium">Dell Premium Support</span>: Dell's technicians can perform authorized thermal maintenance without voiding warranty</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
          <h5 class="font-medium mb-3">Finding and Resolving Hidden System Bottlenecks</h5>
          <p class="text-sm mb-3">Even after addressing common issues, some systems suffer from subtle bottlenecks that require specialized detection:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                RAM Subsystem Issues
              </h6>
              <div class="text-xs space-y-2">
                <p><span class="font-medium">Symptoms:</span> Excessive page file usage, high RAM latency, system slows during multitasking</p>
                <p><span class="font-medium">Diagnosis:</span> Run MemTest86 from bootable USB, check for memory timing issues with CPU-Z</p>
                <p><span class="font-medium">Solution:</span> Ensure matched RAM modules, check for single-channel operation, adjust virtual memory settings</p>
              </div>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                Background I/O Contention
              </h6>
              <div class="text-xs space-y-2">
                <p><span class="font-medium">Symptoms:</span> Random system freezes, high disk activity with no obvious cause</p>
                <p><span class="font-medium">Diagnosis:</span> Use Resource Monitor to identify disk I/O offenders, check event logs for Service Control Manager errors</p>
                <p><span class="font-medium">Solution:</span> Disable Windows Search indexing, adjust SuperFetch/SysMain service, optimize antivirus scanning schedules</p>
              </div>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                Energy/Performance Bias
              </h6>
              <div class="text-xs space-y-2">
                <p><span class="font-medium">Symptoms:</span> Inconsistent CPU performance, throttling without thermal issues</p>
                <p><span class="font-medium">Diagnosis:</span> Check for "EPB" (Energy Performance Bias) settings in advanced CPU monitoring tools</p>
                <p><span class="font-medium">Solution:</span> Use ThrottleStop to adjust EPB to "Performance" when plugged in, add registry tweaks to optimize Windows power schemes</p>
              </div>
            </div>
          </div>
          
          <div class="mt-4 bg-indigo-50 p-3 rounded text-xs">
            <p class="font-medium mb-1">Dell Support Resources for Deep System Analysis:</p>
            <ul class="list-disc pl-5">
              <li><span class="font-medium">Dell SupportAssist</span>: Beyond basic diagnostics, the full version includes advanced hardware tests and predictive failure analysis</li>
              <li><span class="font-medium">Dell Command | Update</span>: Ensures all firmware and drivers are precisely matched to your system configuration</li>
              <li><span class="font-medium">Dell Premium Support</span>: Provides access to advanced system diagnostics and performance optimization assistance</li>
              <li><span class="font-medium">Dell Support Forums</span>: Model-specific discussions often reveal common issues and specialized fixes</li>
              <li><span class="font-medium">Dell Knowledge Base</span>: Contains detailed technical articles about system architecture and known issues</li>
            </ul>
          </div>
        </div>
        
        <p class="text-sm italic">Building on our previous performance discussions, these advanced techniques target the underlying architectural components that might be constraining your system's performance. While more technical in nature, addressing these deeper issues often provides the most substantial and lasting performance improvements.</p>`;
      } else if (question.toLowerCase().includes('what else should i check')) {
        answer = `<h4 class="text-lg font-medium mb-2">Additional System Check Areas for Comprehensive Optimization</h4>
        <p class="mb-3">Building on our previous performance discussion, here are additional critical areas to examine for further optimization:</p>
        
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-5">
          <h5 class="font-medium mb-2">System-Wide Performance Audit</h5>
          <p class="text-sm mb-3">A comprehensive approach ensures no performance-limiting factors are overlooked:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-center mb-2">
                <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h6 class="font-medium">Background Processes</h6>
              </div>
              <ul class="list-disc pl-5 text-xs space-y-1.5">
                <li>Telemetry and reporting services</li>
                <li>Hidden update mechanisms</li>
                <li>Cloud sync processes</li>
                <li>Browser extensions and helpers</li>
                <li>Manufacturer monitoring utilities</li>
              </ul>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-center mb-2">
                <div class="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h6 class="font-medium">Power Management</h6>
              </div>
              <ul class="list-disc pl-5 text-xs space-y-1.5">
                <li>Per-device power settings</li>
                <li>CPU parking and throttling</li>
                <li>GPU power states</li>
                <li>USB selective suspend</li>
                <li>Hard disk power-down timers</li>
              </ul>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-center mb-2">
                <div class="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h6 class="font-medium">System Services</h6>
              </div>
              <ul class="list-disc pl-5 text-xs space-y-1.5">
                <li>Search and indexing configuration</li>
                <li>Analytics and feedback services</li>
                <li>Print spooler (if not used)</li>
                <li>Remote access services</li>
                <li>Bluetooth support (if unused)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="space-y-5 mb-5">
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">1</span>
              <span>Network and Connectivity Optimization</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-blue-800 mb-2">Wireless Network Performance</h6>
                <p class="text-sm mb-3">Network issues can cause system-wide slowdowns that mimic general performance problems:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div class="bg-gray-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Network Driver Optimization:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Open Device Manager (Win+X, select Device Manager)</li>
                        <li>Expand "Network adapters"</li>
                        <li>Right-click your wireless adapter and select "Properties"</li>
                        <li>Go to "Advanced" tab</li>
                        <li>Optimize these key settings:
                          <ul class="list-disc pl-4 mt-1">
                            <li><strong>Roaming Aggressiveness</strong>: Set to "Medium" or "Low" for home networks</li>
                            <li><strong>Preferred Band</strong>: Set to "5GHz" if available</li>
                            <li><strong>Throughput Booster/Enhancement</strong>: Enable</li>
                            <li><strong>Power Saving Mode</strong>: Set to "Maximum Performance" when plugged in</li>
                            <li><strong>802.11n Channel Width</strong>: Set to "Auto" or highest available</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                    
                    <div class="bg-blue-50 p-3 rounded">
                      <p class="font-medium mb-1">Killer Wireless Optimization (Dell XPS specific):</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Update to the latest Killer Control Center from Dell Support</li>
                        <li>Open Killer Control Center</li>
                        <li>Navigate to Wi-Fi settings</li>
                        <li>Under "Advanced" settings:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Set "Priority" for your most important applications</li>
                            <li>Disable "Killer Prioritization Engine" if causing issues</li>
                            <li>Enable "xTend" only if using laptop as a hotspot</li>
                            <li>For gaming, enable "Gaming Mode" when applicable</li>
                          </ul>
                        </li>
                        <li>Periodically check for driver updates through the app</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div>
                    <div class="bg-gray-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Network Troubleshooting Commands:</p>
                      <div class="space-y-2">
                        <div>
                          <p>Reset Windows TCP/IP stack:</p>
                          <code class="block bg-gray-100 p-1 mt-1 text-xs">netsh int ip reset</code>
                        </div>
                        <div>
                          <p>Reset Winsock catalog:</p>
                          <code class="block bg-gray-100 p-1 mt-1 text-xs">netsh winsock reset</code>
                        </div>
                        <div>
                          <p>Flush DNS cache:</p>
                          <code class="block bg-gray-100 p-1 mt-1 text-xs">ipconfig /flushdns</code>
                        </div>
                        <div>
                          <p>Release and renew IP address:</p>
                          <code class="block bg-gray-100 p-1 mt-1 text-xs">ipconfig /release<br>ipconfig /renew</code>
                        </div>
                        <div>
                          <p>Check for packet loss and latency:</p>
                          <code class="block bg-gray-100 p-1 mt-1 text-xs">ping -n 100 8.8.8.8</code>
                        </div>
                      </div>
                      <p class="mt-2 text-gray-500 italic">Run Command Prompt as administrator before executing these commands.</p>
                    </div>
                    
                    <div class="bg-green-50 p-3 rounded">
                      <p class="font-medium mb-1">Advanced Network Performance Tips:</p>
                      <ul class="list-disc pl-4 space-y-1">
                        <li>Use a wired Ethernet connection when possible (via USB-C adapter for XPS)</li>
                        <li>Position your laptop within optimal range of the router</li>
                        <li>Update router firmware to latest version</li>
                        <li>Enable QoS (Quality of Service) in router settings to prioritize your laptop traffic</li>
                        <li>Consider changing wireless channels to avoid interference:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Use channels 1, 6, or 11 for 2.4GHz networks</li>
                            <li>Use channels 36, 40, 44, or 48 for 5GHz networks</li>
                          </ul>
                        </li>
                        <li>If using a USB-C dock, ensure it has adequate power delivery for network functions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div class="mt-3 bg-yellow-50 p-3 rounded text-xs">
                  <p class="font-medium">Addressing Common Dell XPS Wireless Issues:</p>
                  <ul class="list-disc pl-4 mt-1">
                    <li><span class="font-medium">Disconnections after sleep</span>: Update to latest Intel/Killer driver package</li>
                    <li><span class="font-medium">Slow Wi-Fi speeds</span>: Disable IPv6 on the adapter if not needed</li>
                    <li><span class="font-medium">High latency spikes</span>: Disable "Throughput Booster" if enabled, as it can cause inconsistent performance</li>
                    <li><span class="font-medium">Bluetooth interference</span>: If using 2.4GHz Wi-Fi, disable Bluetooth when not needed</li>
                    <li><span class="font-medium">Slow performance with docks</span>: Update Thunderbolt drivers and firmware</li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-blue-800 mb-2">DNS and Internet Optimization</h6>
                <p class="text-sm mb-3">DNS configuration can significantly impact browsing performance and application responsiveness:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium mb-1">Configuring Faster DNS:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Open Network & Internet settings (right-click network icon)</li>
                      <li>Click "Change adapter options"</li>
                      <li>Right-click your active connection and select "Properties"</li>
                      <li>Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties"</li>
                      <li>Select "Use the following DNS server addresses"</li>
                      <li>Enter faster DNS servers:
                        <table class="w-full mt-1 text-xs">
                          <tr class="bg-gray-100">
                            <th class="p-1 text-left">Provider</th>
                            <th class="p-1 text-left">Primary DNS</th>
                            <th class="p-1 text-left">Secondary DNS</th>
                          </tr>
                          <tr>
                            <td class="p-1">Cloudflare</td>
                            <td class="p-1">1.1.1.1</td>
                            <td class="p-1">1.0.0.1</td>
                          </tr>
                          <tr>
                            <td class="p-1">Google</td>
                            <td class="p-1">8.8.8.8</td>
                            <td class="p-1">8.8.4.4</td>
                          </tr>
                          <tr>
                            <td class="p-1">Quad9</td>
                            <td class="p-1">9.9.9.9</td>
                            <td class="p-1">149.112.112.112</td>
                          </tr>
                        </table>
                      </li>
                      <li>Click "OK" to save changes</li>
                    </ol>
                  </div>
                  
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium mb-1">Testing DNS Performance:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Download "DNS Benchmark" from GRC.com</li>
                      <li>Run the program (no installation required)</li>
                      <li>Click "Run Benchmark" to test current DNS</li>
                      <li>Click "Nameservers" tab to see results</li>
                      <li>Use the fastest responding servers from the list</li>
                      <li>Alternatively, use command prompt:
                        <code class="block bg-gray-100 p-1 mt-1 text-xs">ping -n 20 1.1.1.1<br>ping -n 20 8.8.8.8<br>ping -n 20 9.9.9.9</code>
                      </li>
                      <li>Compare average times and packet loss</li>
                    </ol>
                  </div>
                </div>
                
                <div class="mt-3 bg-blue-50 p-3 rounded text-xs">
                  <p class="font-medium">Advanced Internet Performance Tweaks:</p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div>
                      <p class="font-medium">TCP Optimization:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Open Registry Editor (run regedit.exe)</li>
                        <li>Navigate to: HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters</li>
                        <li>Create these DWORD values:
                          <ul class="list-disc pl-4 mt-1">
                            <li>"TcpNoDelay" = 1</li>
                            <li>"TcpAckFrequency" = 1</li>
                            <li>"TCPDelAckTicks" = 0</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <p class="font-medium">Disable Nagle's Algorithm:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Navigate to: HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces</li>
                        <li>Find your active connection (matching IP address)</li>
                        <li>Create DWORD value "TcpNoDelay" = 1</li>
                        <li>Create DWORD value "TcpAckFrequency" = 1</li>
                      </ol>
                    </div>
                  </div>
                  <p class="mt-2 text-red-600">Warning: Registry edits can cause system instability if done incorrectly. Create a restore point before proceeding.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-800 mr-2 flex-shrink-0">2</span>
              <span>Graphics Subsystem Optimization</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-purple-800 mb-2">Intel Iris Xe Graphics Optimization</h6>
                <p class="text-sm mb-3">The integrated graphics in your Dell XPS can be further optimized for better performance and battery efficiency:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div class="bg-gray-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Intel Graphics Command Center Configuration:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Open Intel Graphics Command Center (install from Microsoft Store if not present)</li>
                        <li>Go to "System" tab</li>
                        <li>Under "Power", select:
                          <ul class="list-disc pl-4 mt-1">
                            <li>When plugged in: "Maximum Performance"</li>
                            <li>On battery: "Balanced" or "Battery Saving"</li>
                          </ul>
                        </li>
                        <li>Go to "Display" tab</li>
                        <li>Adjust scaling to match your preference (100% recommended for maximum performance)</li>
                        <li>Go to "Video" tab</li>
                        <li>Set "Video Quality" to "High Performance" when plugged in</li>
                        <li>Under "3D", adjust global settings:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Set "Application Optimal Mode" to ON</li>
                            <li>Adjust "Anisotropic Filtering" to "Performance" when not gaming</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                    
                    <div class="bg-blue-50 p-3 rounded">
                      <p class="font-medium mb-1">Windows Graphics Settings:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Open Windows Settings > System > Display</li>
                        <li>Scroll down and click "Graphics settings"</li>
                        <li>For "Hardware-accelerated GPU scheduling", set to "On" when plugged in</li>
                        <li>Under "Graphics performance preference", add your frequently used applications</li>
                        <li>Set high-performance applications to "High performance"</li>
                        <li>Set everyday applications to "Power saving"</li>
                        <li>For applications that benefit from hardware acceleration:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Browsers (Chrome, Edge, Firefox)</li>
                            <li>Media players (VLC, Movies & TV)</li>
                            <li>Creative applications (Photoshop, Premiere)</li>
                            <li>Set these to "High performance" when plugged in</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  </div>
                  
                  <div>
                    <div class="bg-gray-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Display Refresh Rate Optimization:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Right-click desktop and select "Display settings"</li>
                        <li>Scroll down and click "Advanced display settings"</li>
                        <li>Click "Display adapter properties"</li>
                        <li>Go to "Monitor" tab</li>
                        <li>Under "Screen refresh rate", select highest available option</li>
                        <li>For battery savings, lower refresh rate when on battery</li>
                        <li>Consider using the "Dynamic refresh rate" feature if available in Windows 11</li>
                      </ol>
                      <p class="mt-2 text-gray-500 italic">Higher refresh rates consume more power but provide smoother visual experience.</p>
                    </div>
                    
                    <div class="bg-purple-50 p-3 rounded">
                      <p class="font-medium mb-1">Advanced Intel Xe Graphics Tweaks:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Create custom power profiles:
                          <ul class="list-disc pl-4 mt-1">
                            <li>In Intel Graphics Command Center, go to "System"</li>
                            <li>Click "New Profile" under "Power"</li>
                            <li>Create a "Maximum Performance" profile for plugged in</li>
                            <li>Create a "Battery Optimized" profile for mobile use</li>
                          </ul>
                        </li>
                        <li>For specific applications, create application profiles:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Go to "3D" section in Intel Graphics Command Center</li>
                            <li>Click "Add a Program"</li>
                            <li>Browse to your application's .exe file</li>
                            <li>Customize settings for that specific application</li>
                          </ul>
                        </li>
                        <li>Adjust Xe Memory allocation:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Go to BIOS (F2 during startup)</li>
                            <li>Look for "Graphics Configuration" or "Video Settings"</li>
                            <li>Set "DVMT Pre-Allocated" to highest available (usually 128MB or 256MB)</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div class="mt-3 bg-yellow-50 p-3 rounded text-xs">
                  <p class="font-medium">XPS-Specific Graphics Considerations:</p>
                  <ul class="list-disc pl-4 mt-1">
                    <li><span class="font-medium">High-DPI Display Scaling</span>: 4K XPS displays should use 150% or 200% scaling for optimal text clarity, but this impacts performance</li>
                    <li><span class="font-medium">External Display Performance</span>: When using external monitors, ensure you're using the correct USB-C/Thunderbolt port that connects directly to the GPU</li>
                    <li><span class="font-medium">Power Throttling</span>: Intel Xe performance is directly tied to power limits, ensure adequate system cooling for sustained performance</li>
                    <li><span class="font-medium">Driver Selection</span>: For XPS, Dell-optimized drivers often provide better stability than Intel generic drivers</li>
                    <li><span class="font-medium">Game Compatibility</span>: Use Intel's Game Compatibility Tool in Graphics Command Center to optimize game-specific settings</li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-purple-800 mb-2">Display and Video Playback Optimization</h6>
                <p class="text-sm mb-3">Optimize display settings and video playback for both performance and visual quality:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium mb-1">Windows Display Color Calibration:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Type "calibrate display color" in Start menu and open the tool</li>
                      <li>Follow the wizard to optimize:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Gamma settings</li>
                          <li>Brightness and contrast</li>
                          <li>Color balance</li>
                        </ul>
                      </li>
                      <li>For color-critical work, consider a hardware calibration tool</li>
                      <li>For XPS OLED displays, reduce brightness to 70% for extended screen life</li>
                      <li>Enable HDR for compatible content (Settings > System > Display > HDR)</li>
                    </ol>
                  </div>
                  
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium mb-1">Video Playback Optimization:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Open Settings > Apps > Video playback</li>
                      <li>Set "Process video automatically to enhance it" when plugged in</li>
                      <li>Enable "Hardware-accelerated video decoding" for reduced CPU usage</li>
                      <li>For HDR-capable displays:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Enable "Play HDR content" when supported</li>
                          <li>Adjust HDR brightness using the slider</li>
                        </ul>
                      </li>
                      <li>In battery settings, select "Optimize for video quality" when plugged in</li>
                      <li>For streaming apps (Netflix, YouTube, etc.):
                        <ul class="list-disc pl-4 mt-1">
                          <li>Use Microsoft Edge or the native app for optimal performance</li>
                          <li>Enable hardware acceleration in browser settings</li>
                          <li>Install the HEVC Video Extensions from Microsoft Store</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div class="mt-3 bg-blue-50 p-3 rounded text-xs">
                  <p class="font-medium">Night Light and Eye Comfort:</p>
                  <p class="mb-2">These settings can reduce eye strain without impacting performance:</p>
                  <ul class="list-disc pl-4">
                    <li>Enable Night Light (Settings > System > Display > Night Light)</li>
                    <li>Schedule Night Light to activate automatically in evenings</li>
                    <li>Adjust Night Light strength to reduce blue light</li>
                    <li>Enable Dark mode for built-in apps (Settings > Personalization > Colors)</li>
                    <li>Consider using PWM-free brightness levels on OLED displays (typically 30-70%)</li>
                  </ul>
                  <p class="mt-2">Reducing screen brightness even slightly can significantly improve battery life while maintaining readability.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h5 class="font-medium flex items-start mb-3">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-800 mr-2 flex-shrink-0">3</span>
              <span>Windows UI and Desktop Optimization</span>
            </h5>
            
            <div class="ml-9 space-y-3">
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-green-800 mb-2">Visual Effects Optimization</h6>
                <p class="text-sm mb-3">Windows visual effects can consume significant system resources. Optimizing these settings improves responsiveness:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div class="bg-gray-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Performance Options Configuration:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Right-click Start button and select "System"</li>
                        <li>Click "Advanced system settings"</li>
                        <li>Under Performance section, click "Settings"</li>
                        <li>Choose "Adjust for best performance" to disable all effects</li>
                        <li>For balanced appearance and performance, select "Custom" and enable only these options:
                          <ul class="list-disc pl-4 mt-1">
                            <li>"Smooth edges of screen fonts"</li>
                            <li>"Show thumbnails instead of icons"</li>
                            <li>"Show window contents while dragging"</li>
                            <li>"Smooth-scroll list boxes"</li>
                            <li>"Use drop shadows for icon labels on the desktop"</li>
                          </ul>
                        </li>
                        <li>Click Apply and OK</li>
                      </ol>
                    </div>
                    
                    <div class="bg-blue-50 p-3 rounded">
                      <p class="font-medium mb-1">Windows Animation Settings:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Open Settings > Accessibility > Visual Effects</li>
                        <li>Adjust or disable animations for improved performance:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Turn off "Animation effects"</li>
                            <li>Disable "Transparency effects"</li>
                          </ul>
                        </li>
                        <li>For additional animation settings:</li>
                        <li>Open Settings > Personalization > Colors</li>
                        <li>Turn off "Transparency effects"</li>
                        <li>Under Accessibility > Visual Effects, disable "Animation effects"</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div>
                    <div class="bg-gray-50 p-3 rounded mb-3">
                      <p class="font-medium mb-1">Desktop Background Optimization:</p>
                      <ul class="list-disc pl-4 space-y-1">
                        <li>Use static wallpapers instead of slideshows or animated backgrounds</li>
                        <li>Avoid using Windows Spotlight backgrounds that change regularly</li>
                        <li>Disable "Show accent color on Start and taskbar" for slight performance improvement</li>
                        <li>Right-click desktop > Personalize > Background</li>
                        <li>Select "Picture" instead of "Slideshow"</li>
                        <li>Choose a simple, solid color for maximum performance</li>
                        <li>Reduce desktop icon count by organizing into folders</li>
                      </ul>
                    </div>
                    
                    <div class="bg-green-50 p-3 rounded">
                      <p class="font-medium mb-1">Advanced Visual Tweaks:</p>
                      <ol class="list-decimal pl-4 space-y-1">
                        <li>Disable Windows Widgets:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Right-click taskbar > Taskbar settings</li>
                            <li>Toggle off "Widgets"</li>
                          </ul>
                        </li>
                        <li>Optimize Start Menu:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Settings > Personalization > Start</li>
                            <li>Disable "Show recently added apps"</li>
                            <li>Disable "Show most used apps"</li>
                            <li>Reduce number of pinned items</li>
                          </ul>
                        </li>
                        <li>Optimize Taskbar:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Right-click taskbar > Taskbar settings</li>
                            <li>Disable search box or icon</li>
                            <li>Hide Task View button</li>
                            <li>Disable Chat/Teams integration</li>
                            <li>Turn off "Show taskbar on all displays" if using multiple monitors</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div class="mt-3 bg-yellow-50 p-3 rounded text-xs">
                  <p class="font-medium">Impact of Visual Settings by Hardware Component:</p>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                    <div>
                      <p class="font-medium">CPU Impact:</p>
                      <ul class="list-disc pl-4">
                        <li><span class="text-red-600">High</span>: Animations, live tiles</li>
                        <li><span class="text-yellow-600">Medium</span>: Transparency effects</li>
                        <li><span class="text-green-600">Low</span>: Font smoothing</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-medium">GPU Impact:</p>
                      <ul class="list-disc pl-4">
                        <li><span class="text-red-600">High</span>: Transparency, animations</li>
                        <li><span class="text-yellow-600">Medium</span>: Window shadows</li>
                        <li><span class="text-green-600">Low</span>: Thumbnail previews</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-medium">Memory Impact:</p>
                      <ul class="list-disc pl-4">
                        <li><span class="text-red-600">High</span>: Live wallpapers</li>
                        <li><span class="text-yellow-600">Medium</span>: Taskbar previews</li>
                        <li><span class="text-green-600">Low</span>: Icon effects</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h6 class="font-medium text-green-800 mb-2">Windows Explorer and File System Optimization</h6>
                <p class="text-sm mb-3">File Explorer settings and file system configurations can significantly impact day-to-day responsiveness:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium mb-1">File Explorer Performance Settings:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Open File Explorer</li>
                      <li>Click "View" tab in the ribbon</li>
                      <li>Click "Options" to open Folder Options</li>
                      <li>Go to "View" tab</li>
                      <li>Optimize these settings:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Uncheck "Always show icons, never thumbnails"</li>
                          <li>Check "Launch folder windows in a separate process"</li>
                          <li>Uncheck "Show preview handlers in preview pane"</li>
                          <li>Check "Use check boxes to select items"</li>
                          <li>Uncheck "Show pop-up description for folder and desktop items"</li>
                        </ul>
                      </li>
                      <li>Under Search options:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Select "Don't use the index when searching in file folders"</li>
                          <li>Uncheck "Always search file names and contents"</li>
                        </ul>
                      </li>
                      <li>Click Apply and OK</li>
                    </ol>
                  </div>
                  
                  <div class="bg-gray-50 p-3 rounded">
                    <p class="font-medium mb-1">NTFS Optimization:</p>
                    <ol class="list-decimal pl-4 space-y-1">
                      <li>Disable Last Access Time Updates:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Open Command Prompt as administrator</li>
                          <li>Type: <code class="bg-gray-100 px-1">fsutil behavior set disablelastaccess 1</code></li>
                          <li>Press Enter</li>
                        </ul>
                      </li>
                      <li>Disable 8.3 Filename Creation (saves index space):
                        <ul class="list-disc pl-4 mt-1">
                          <li>Open Command Prompt as administrator</li>
                          <li>Type: <code class="bg-gray-100 px-1">fsutil behavior set disable8dot3 1</code></li>
                          <li>Press Enter</li>
                        </ul>
                      </li>
                      <li>For SSDs, ensure TRIM is enabled:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Open Command Prompt as administrator</li>
                          <li>Type: <code class="bg-gray-100 px-1">fsutil behavior query DisableDeleteNotify</code></li>
                          <li>If result is 0, TRIM is enabled</li>
                          <li>If result is 1, enable TRIM with: <code class="bg-gray-100 px-1">fsutil behavior set DisableDeleteNotify 0</code></li>
                        </ul>
                      </li>
                      <li>Optimize disk usage:
                        <ul class="list-disc pl-4 mt-1">
                          <li>Type "defrag" in Start menu</li>
                          <li>Open Defragment and Optimize Drives</li>
                          <li>For SSDs, click "Optimize" (performs TRIM)</li>
                          <li>For HDDs, click "Analyze" then "Defragment"</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div class="mt-3 bg-blue-50 p-3 rounded text-xs">
                  <p class="font-medium">Microsoft OneDrive Optimization:</p>
                  <p class="mb-2">OneDrive can impact system performance. Optimize it with these settings:</p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <ul class="list-disc pl-4">
                        <li>Click OneDrive icon in taskbar</li>
                        <li>Click on the gear icon > Settings</li>
                        <li>Under "Settings" tab:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Uncheck "Start OneDrive automatically when I sign in to Windows"</li>
                            <li>Uncheck "Let OneDrive fetch files for you when they're needed" if not required</li>
                          </ul>
                        </li>
                        <li>Under "Account" tab:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Click "Choose folders" to sync only essential folders</li>
                            <li>Deselect large folders that don't need cloud backup</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul class="list-disc pl-4">
                        <li>For maximum performance, consider completely disabling OneDrive:
                          <ul class="list-disc pl-4 mt-1">
                            <li>Open Run dialog (Win+R)</li>
                            <li>Type: <code class="bg-gray-100 px-1">gpedit.msc</code></li>
                            <li>Navigate to Computer Configuration > Administrative Templates > Windows Components > OneDrive</li>
                            <li>Double-click "Prevent the usage of OneDrive for file storage"</li>
                            <li>Select "Enabled" and click OK</li>
                          </ul>
                        </li>
                        <li>Alternatively, use Task Manager to disable OneDrive startup</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
          <h5 class="font-medium mb-2">Application-Specific Optimizations</h5>
          <p class="text-sm mb-3">Beyond system-wide tweaks, optimizing your most-used applications can yield significant performance improvements:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
                </svg>
                Web Browsers
              </h6>
              <div class="text-xs space-y-2">
                <p><span class="font-medium">Hardware Acceleration:</span> Enable in browser settings for improved performance when plugged in, disable when on battery</p>
                <p><span class="font-medium">Extension Audit:</span> Remove unused extensions, especially those that run in the background</p>
                <p><span class="font-medium">Tab Management:</span> Use tab suspender extensions to reduce memory usage for inactive tabs</p>
                <p><span class="font-medium">Cache Control:</span> Set reasonable cache sizes (1-2GB) to balance performance and storage</p>
              </div>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" />
                </svg>
                Office Applications
              </h6>
              <div class="text-xs space-y-2">
                <p><span class="font-medium">AutoSave:</span> Increase autosave intervals to reduce disk activity (5-10 minutes)</p>
                <p><span class="font-medium">Hardware Graphics:</span> In Office settings, enable hardware graphics acceleration when plugged in</p>
                <p><span class="font-medium">Add-in Management:</span> Disable unused add-ins that load automatically</p>
                <p><span class="font-medium">Font Caching:</span> Increase font cache size for faster document loading with many fonts</p>
              </div>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Media Applications
              </h6>
              <div class="text-xs space-y-2">
                <p><span class="font-medium">Hardware Decoding:</span> Enable hardware acceleration for video playback in VLC, Media Player, etc.</p>
                <p><span class="font-medium">Audio Settings:</span> Set audio buffer size appropriately (higher for stability, lower for responsiveness)</p>
                <p><span class="font-medium">Streaming Quality:</span> Adjust streaming quality based on whether plugged in or on battery</p>
                <p><span class="font-medium">Temporary Files:</span> Clear media cache files regularly (especially for editing applications)</p>
              </div>
            </div>
          </div>
          
          <div class="mt-3 bg-indigo-50 p-3 rounded text-xs">
            <p class="font-medium mb-1">Creating Application-Specific Power Profiles:</p>
            <p class="mb-2">Windows 11 allows creating custom power mode triggers for specific applications:</p>
            <ol class="list-decimal pl-5">
              <li>Open Command Prompt as administrator</li>
              <li>Create a power scheme specifically for high-performance applications:
                <code class="block bg-gray-100 p-1 mt-1 mb-1">powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c HighPerformanceCustom</code>
              </li>
              <li>Modify this scheme for maximum performance (higher minimum processor state, etc.)</li>
              <li>Create batch files to switch power schemes when applications launch and close</li>
              <li>Use Task Scheduler to trigger these batch files when specific applications start/end</li>
            </ol>
            <p class="mt-2">This approach allows Windows to automatically adjust power and performance settings based on your current activities.</p>
          </div>
        </div>
        
        <p class="text-sm italic">These additional optimization areas complement our earlier performance discussions, addressing more specialized aspects of system configuration. By extending your optimization to these additional areas, you can achieve even better performance and a more responsive computing experience on your Dell XPS system.</p>`;
      } else {
        // Default response for any other follow-up query
        answer = `<h4 class="text-lg font-medium mb-2">Extended Analysis and Recommendations</h4>
        <p class="mb-3">Building on our previous discussion, I've analyzed additional factors that could impact your situation:</p>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <h5 class="font-medium mb-2">Key Insights</h5>
          <p>After reviewing the information from our earlier conversation, several additional considerations emerge that could significantly improve your experience:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-start">
                <div class="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h6 class="font-medium">Contextual Considerations</h6>
                  <p class="text-sm mt-1">The underlying architecture of your system reveals patterns that weren't immediately obvious in our initial analysis. These systemic elements often interact in ways that compound both problems and potential solutions.</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <div class="flex items-start">
                <div class="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h6 class="font-medium">Optimized Approach</h6>
                  <p class="text-sm mt-1">By leveraging the foundations we've already established, we can implement more refined strategies that build upon earlier optimizations while addressing newly identified factors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="space-y-4 mb-4">
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h5 class="font-medium text-gray-900 mb-2">Expanded Perspective</h5>
            <p class="text-sm mb-3">The information from our earlier discussion provides valuable context that helps inform these additional recommendations:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="bg-gray-50 p-3 rounded">
                <p class="font-medium mb-1">Systemic Patterns</p>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  <li>Underlying connections between seemingly separate issues often reveal common root causes</li>
                  <li>Multiple small optimizations can compound for significant overall improvement</li>
                  <li>Regular maintenance prevents degradation of initial performance gains</li>
                  <li>System behaviors change over time as usage patterns evolve</li>
                </ul>
              </div>
              
              <div class="bg-gray-50 p-3 rounded">
                <p class="font-medium mb-1">Long-term Sustainability</p>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                  <li>Implement monitoring practices to catch regressions early</li>
                  <li>Schedule periodic review of system configuration</li>
                  <li>Stay current with relevant updates and patches</li>
                  <li>Document successful optimization strategies for future reference</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h5 class="font-medium text-gray-900 mb-2">Enhanced Strategy</h5>
            <p class="text-sm mb-3">Based on comprehensive analysis, I recommend this refined approach:</p>
            
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded mb-4">
              <ol class="list-decimal pl-5 text-sm space-y-2">
                <li><span class="font-medium">Implement Core Recommendations</span> - Begin with the fundamental optimizations we discussed previously</li>
                <li><span class="font-medium">Monitor Results</span> - Observe system behavior and performance metrics after initial changes</li>
                <li><span class="font-medium">Iterative Refinement</span> - Make targeted adjustments based on observed results</li>
                <li><span class="font-medium">Periodic Maintenance</span> - Schedule regular check-ins to ensure continued optimal performance</li>
              </ol>
            </div>
            
            <p class="text-sm italic">This methodical approach ensures sustainable improvements while allowing for adaptation to your specific needs and usage patterns over time.</p>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-4">
          <h5 class="font-medium mb-2">Looking Forward</h5>
          <p class="text-sm mb-3">As you implement these recommendations, consider these forward-looking strategies:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                Ongoing Calibration
              </h6>
              <p class="text-sm">Regularly fine-tune your system settings based on changing needs and usage patterns to maintain optimal performance.</p>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                Scheduled Maintenance
              </h6>
              <p class="text-sm">Set calendar reminders for system maintenance tasks to prevent performance degradation over time.</p>
            </div>
            
            <div class="bg-white p-3 rounded shadow-sm">
              <h6 class="font-medium flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Community Resources
              </h6>
              <p class="text-sm">Engage with user communities for your specific hardware to stay informed about emerging optimizations and solutions.</p>
            </div>
          </div>
        </div>
        
        <p class="text-sm italic">This comprehensive approach builds upon our previous discussion while incorporating additional insights and strategies. By implementing these recommendations in a systematic way, you can achieve and maintain optimal system performance.</p>`;
      }
      
      // Get mock sources for this question
      const sources = getMockSources(question);
      
      // Add the new answer to the list
      setFollowUpAnswers(prev => [...prev, {
        question,
        content: answer,
        originalQuery: currentQuery
      }]);
      
      setIsProcessing(false);
      setFollowUpText('');
      setHasAskedFollowUp(true); // Mark that a follow-up has been asked
    }, 1500);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpText.trim()) {
      processFollowUpQuestion(followUpText);
    }
  };

  const handleDemoChipClick = (text: string) => {
    processFollowUpQuestion(text);
  };

  return (
    <div className="space-y-4">
      {/* Display previous follow-up answers */}
      {followUpAnswers.length > 0 && (
        <div className="space-y-4 mb-6">
          {followUpAnswers.map((answer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="p-3 bg-gray-100 rounded-lg mb-2">
                <p className="font-medium text-gray-800">{answer.question}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Because you asked previously: "{answer.originalQuery}"
                </p>
              </div>
              
              <AIGeneratedAnswer 
                content={answer.content} 
                sources={getMockSources(answer.question)} 
                isVisible={true} 
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Always show the follow-up prompt UI, regardless of whether a follow-up has been asked */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 border border-gray-200 rounded-lg bg-gray-50"
      >
        <h3 className="text-gray-700 font-medium mb-4">
          {hasAskedFollowUp ? 
            "Still need help?" :
            "Still need help? Ask a follow-up or try one of these suggestions:"}
        </h3>

        {/* Always show the form, but disable it when hasAskedFollowUp is true */}
        <form onSubmit={handleDemoSubmit} className="mb-4">
          <div className="flex">
            <Input
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              placeholder="Ask a follow-up..."
              className="rounded-r-none focus-visible:ring-blue-500"
              disabled={isProcessing || hasAskedFollowUp}
            />
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md transition-colors ${(isProcessing || hasAskedFollowUp) ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Submit follow-up question"
              disabled={isProcessing || hasAskedFollowUp}
            >
              <Send size={18} />
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <FollowUpChip
              key={index}
              text={suggestion}
              onClick={() => handleDemoChipClick(suggestion)}
              delay={0.1 + (index * 0.1)}
              disabled={isProcessing || hasAskedFollowUp}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FollowUpPrompt;
