
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

  const processFollowUpQuestion = (question: string) => {
    if (question.trim() === '' || isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      let answer = '';
      
      // Generate relevant response based on the follow-up question
      if (question.toLowerCase().includes('drivers up to date')) {
        answer = `<h4 class="text-lg font-medium mb-2">Checking if Your Graphics Drivers are Up to Date</h4>
        <p class="mb-3">There are several ways to check if your Dell graphics drivers are current:</p>
        <ol class="list-decimal pl-5 mb-4 space-y-2">
          <li><strong>Dell Update Utility</strong> - The easiest method is using the Dell SupportAssist or Dell Update application that came preinstalled on your system. These tools automatically check for and install the latest drivers.</li>
          <li><strong>Device Manager</strong> - Open Device Manager by right-clicking the Start button, expand "Display adapters", right-click your graphics card and select "Update driver". Choose "Search automatically for updated driver software".</li>
          <li><strong>Manufacturer Websites</strong> - Visit Intel, NVIDIA, or AMD's website (depending on your graphics hardware) and use their driver detection tools to check for updates.</li>
        </ol>
        <p class="mb-3">For your Dell XPS with Intel Iris Xe graphics, I recommend checking both the Dell Support website and Intel's driver page, as sometimes Dell's drivers lag behind Intel's latest releases.</p>`;
      } else if (question.toLowerCase().includes('minimum requirements')) {
        answer = `<h4 class="text-lg font-medium mb-2">Minimum Requirements for Gaming on Dell XPS</h4>
        <p class="mb-3">For your Dell XPS with Intel Iris Xe integrated graphics, here are the gaming capability thresholds:</p>
        <div class="bg-blue-50 p-3 rounded-md mb-4">
          <p class="font-medium">Entry-Level Gaming (60+ FPS):</p>
          <ul class="list-disc pl-5 mt-1">
            <li>E-sports titles (League of Legends, CS:GO, Valorant) at 1080p, low-medium settings</li>
            <li>Indie games and older titles (2018 and earlier) at 1080p, medium settings</li>
            <li>Casual games and simulators at 1080p, medium settings</li>
          </ul>
        </div>
        <div class="bg-yellow-50 p-3 rounded-md mb-4">
          <p class="font-medium">Challenging but Playable (30-60 FPS):</p>
          <ul class="list-disc pl-5 mt-1">
            <li>AAA titles from 2018-2020 at 720p-900p, low settings</li>
            <li>Modern strategy and RPG games at 1080p, low settings</li>
            <li>Open world games at 720p, low settings with tweaked config files</li>
          </ul>
        </div>
        <div class="bg-red-50 p-3 rounded-md mb-4">
          <p class="font-medium">Not Recommended:</p>
          <ul class="list-disc pl-5 mt-1">
            <li>Current-gen AAA titles (2021-2025) at any settings</li>
            <li>Graphically intensive simulators at high resolutions</li>
            <li>Ray-tracing enabled games</li>
          </ul>
        </div>
        <p>For the best gaming experience on your current hardware, focus on optimizing your system using the software recommendations provided earlier, and consider cloud gaming services like GeForce Now or Xbox Cloud Gaming for more demanding titles.</p>`;
      } else if (question.toLowerCase().includes('battery life')) {
        answer = `<h4 class="text-lg font-medium mb-2">Impact of Graphics Optimizations on Battery Life</h4>
        <p class="mb-3">The graphics performance improvements I recommended will affect your battery life in the following ways:</p>
        <div class="space-y-4 mb-4">
          <div class="flex items-start">
            <div class="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">-</div>
            <div>
              <p class="font-medium">High Performance Power Plan</p>
              <p class="text-sm text-gray-600">Switching to the "High Performance" power plan could reduce battery life by 25-40%. This setting prioritizes performance over energy efficiency by preventing CPU/GPU throttling.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">~</div>
            <div>
              <p class="font-medium">Updated Graphics Drivers</p>
              <p class="text-sm text-gray-600">Newer drivers often include power efficiency improvements alongside performance enhancements. The impact is typically neutral to slightly positive (±5% battery life).</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">+</div>
            <div>
              <p class="font-medium">Intel Dynamic Tuning</p>
              <p class="text-sm text-gray-600">The latest version improves thermal management, which can actually improve battery life by 5-10% during mixed usage by optimizing power states.</p>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-3 rounded-md mb-4">
          <p class="font-medium">Recommendation for Balanced Usage:</p>
          <p class="text-sm">Create two power plans: one optimized for performance when plugged in, and another for battery life when mobile. Windows power profiles can be configured to automatically switch when you connect/disconnect the power adapter.</p>
        </div>
        
        <p>You can also use the Dell Power Manager application to create custom thermal profiles that balance performance and battery life based on your specific needs.</p>`;
      } else if (question.toLowerCase().includes('monitor performance')) {
        answer = `<h4 class="text-lg font-medium mb-2">Performance Monitoring Tools</h4>
        <p class="mb-3">Here are the best tools for monitoring your system's performance:</p>
        
        <div class="space-y-4 mb-4">
          <div class="border-l-4 border-blue-400 pl-3">
            <h5 class="font-medium">Task Manager (Built-in)</h5>
            <p class="text-sm">For basic monitoring, Windows Task Manager provides CPU, memory, disk, and GPU usage statistics. Press Ctrl+Shift+Esc to open it and click "More details" for expanded information.</p>
          </div>
          
          <div class="border-l-4 border-blue-400 pl-3">
            <h5 class="font-medium">Resource Monitor (Built-in)</h5>
            <p class="text-sm">For more detailed system resource usage, open Resource Monitor by typing "resmon" in the Start menu. It provides granular views of CPU, Memory, Disk, and Network usage.</p>
          </div>
          
          <div class="border-l-4 border-blue-400 pl-3">
            <h5 class="font-medium">HWiNFO (Free)</h5>
            <p class="text-sm">This comprehensive hardware monitoring tool provides real-time statistics on every component in your system, including temperatures, clock speeds, and power usage.</p>
          </div>
          
          <div class="border-l-4 border-blue-400 pl-3">
            <h5 class="font-medium">MSI Afterburner (Free)</h5>
            <p class="text-sm">Though primarily known for overclocking, this tool provides excellent GPU monitoring with an on-screen display that works during gaming.</p>
          </div>
          
          <div class="border-l-4 border-blue-400 pl-3">
            <h5 class="font-medium">CrystalDiskInfo (Free)</h5>
            <p class="text-sm">For monitoring your SSD/HDD health status, this tool tracks important metrics and can warn you of potential drive failures.</p>
          </div>
        </div>
        
        <div class="bg-blue-50 p-3 rounded-md">
          <p class="font-medium">Performance Monitoring Workflow:</p>
          <ol class="list-decimal pl-5 mt-1 text-sm">
            <li>Run baseline measurements with these tools before implementing optimizations</li>
            <li>Apply the recommended disk and startup optimizations from earlier</li>
            <li>Measure again to quantify improvements</li>
            <li>Set up periodic monitoring (monthly) to catch performance regressions early</li>
          </ol>
        </div>`;
      } else if (question.toLowerCase().includes('how often')) {
        answer = `<h4 class="text-lg font-medium mb-2">Optimization Maintenance Schedule</h4>
        <p class="mb-3">To keep your system running optimally, follow this maintenance schedule:</p>
        
        <div class="space-y-4 mb-4">
          <div class="bg-gray-100 p-3 rounded-md">
            <p class="font-medium">Weekly Tasks:</p>
            <ul class="list-disc pl-5 mt-1 text-sm">
              <li>Empty Recycle Bin</li>
              <li>Clear browser cache if performance issues occur</li>
              <li>Restart computer at least once (especially important for Windows updates)</li>
            </ul>
          </div>
          
          <div class="bg-gray-100 p-3 rounded-md">
            <p class="font-medium">Monthly Tasks:</p>
            <ul class="list-disc pl-5 mt-1 text-sm">
              <li>Run Disk Cleanup with system files option</li>
              <li>Check for driver updates (especially graphics drivers)</li>
              <li>Review startup items and remove newly added unnecessary programs</li>
              <li>Run a quick scan with Windows Security</li>
            </ul>
          </div>
          
          <div class="bg-gray-100 p-3 rounded-md">
            <p class="font-medium">Quarterly Tasks:</p>
            <ul class="list-disc pl-5 mt-1 text-sm">
              <li>Run CHKDSK to scan for and fix disk errors</li>
              <li>Use Disk Defragmenter to optimize drives (SSD optimization is different from traditional defragmentation)</li>
              <li>Clean physical dust from computer vents and fans if accessible</li>
              <li>Perform a comprehensive malware scan</li>
              <li>Check Windows Event Viewer for recurring errors</li>
            </ul>
          </div>
          
          <div class="bg-gray-100 p-3 rounded-md">
            <p class="font-medium">Annual Tasks:</p>
            <ul class="list-disc pl-5 mt-1 text-sm">
              <li>Comprehensive software audit - uninstall unused programs</li>
              <li>Back up important data if not doing so automatically</li>
              <li>Consider a fresh Windows installation if performance has significantly degraded</li>
              <li>Evaluate hardware upgrade needs based on usage patterns</li>
            </ul>
          </div>
        </div>
        
        <p class="mb-3">For your specific issues with slow performance, I recommend focusing on the monthly tasks initially, then establishing a regular maintenance routine using this schedule.</p>
        
        <div class="bg-blue-50 p-3 rounded-md">
          <p class="font-medium">Pro Tip:</p>
          <p class="text-sm">Create calendar reminders for these maintenance tasks to ensure they don't get overlooked. Many users see performance gradually degrade because maintenance is inconsistent.</p>
        </div>`;
      } else if (question.toLowerCase().includes('malware')) {
        answer = `<h4 class="text-lg font-medium mb-2">Malware and System Performance</h4>
        <p class="mb-3">Malware is indeed a common cause of system slowdowns. Here's how to determine if malware might be affecting your performance:</p>
        
        <div class="space-y-4 mb-4">
          <div class="flex items-start">
            <span class="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">!</span>
            <div>
              <p class="font-medium">Warning Signs of Malware</p>
              <ul class="list-disc pl-5 mt-1 text-sm">
                <li>Unexplained high CPU or memory usage when no applications are running</li>
                <li>Unexpected network activity (upload/download) when you're not using the internet</li>
                <li>Browser redirects or new toolbars/extensions you didn't install</li>
                <li>System slows dramatically after startup and improves after some time</li>
                <li>Antivirus software repeatedly turning off or failing to update</li>
                <li>Files or applications opening or closing on their own</li>
              </ul>
            </div>
          </div>
        </div>
        
        <h5 class="font-medium mt-4 mb-2">Comprehensive Malware Check:</h5>
        
        <ol class="list-decimal pl-5 mb-4 space-y-3">
          <li>
            <p class="font-medium">Run Windows Security Full Scan</p>
            <p class="text-sm">Windows has a built-in security solution that's quite effective:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Open Windows Security (type "security" in Start menu)</li>
              <li>Go to Virus & threat protection</li>
              <li>Select Scan options</li>
              <li>Choose Full scan and run it</li>
            </ul>
          </li>
          
          <li>
            <p class="font-medium">Run Secondary Scanner</p>
            <p class="text-sm">Use a free secondary scanner like Malwarebytes to catch what Windows Security might miss:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Download and install Malwarebytes Free</li>
              <li>Perform a Threat Scan</li>
              <li>Follow prompts to quarantine any detected threats</li>
            </ul>
          </li>
          
          <li>
            <p class="font-medium">Check Startup Items in Task Manager</p>
            <p class="text-sm">Look for suspicious programs in the startup tab of Task Manager:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Open Task Manager (Ctrl+Shift+Esc)</li>
              <li>Go to the Startup tab</li>
              <li>Look for unknown programs with unfamiliar names</li>
              <li>Research any suspicious entries online before disabling</li>
            </ul>
          </li>
          
          <li>
            <p class="font-medium">Check Browser Extensions</p>
            <p class="text-sm">Browser-based malware is increasingly common:</p>
            <ul class="list-disc pl-5 text-sm">
              <li>Open each browser you use</li>
              <li>Go to the extensions or add-ons section</li>
              <li>Remove any extensions you don't recognize or need</li>
            </ul>
          </li>
        </ol>
        
        <div class="bg-blue-50 p-3 rounded-md">
          <p class="font-medium">Prevention for the Future:</p>
          <ul class="list-disc pl-5 mt-1 text-sm">
            <li>Keep Windows automatically updated</li>
            <li>Download software only from official sources</li>
            <li>Be cautious when opening email attachments</li>
            <li>Consider using an ad-blocker to prevent malvertising infections</li>
            <li>Perform regular scans as part of your maintenance routine</li>
          </ul>
        </div>`;
      } else if (question.toLowerCase().includes('update my webcam')) {
        answer = `<h4 class="text-lg font-medium mb-2">Updating Webcam Drivers</h4>
        <p class="mb-3">Here's a detailed guide to update your webcam drivers properly:</p>
        
        <div class="space-y-4 mb-4">
          <div class="border-l-4 border-blue-400 pl-3">
            <h5 class="font-medium">Method 1: Manufacturer's Website (Recommended)</h5>
            <p class="text-sm mb-2">This approach ensures you get the official, optimized drivers:</p>
            <ol class="list-decimal pl-4 text-sm">
              <li>Identify your webcam model (check the physical device or Device Manager)</li>
              <li>Visit the manufacturer's support website (Logitech, Microsoft, Dell, etc.)</li>
              <li>Navigate to the Downloads or Support section</li>
              <li>Enter your webcam model number</li>
              <li>Download the latest driver package for Windows 11</li>
              <li>Close all applications that might be using the webcam</li>
              <li>Run the installer and follow the prompts</li>
              <li>Restart your computer after installation</li>
            </ol>
          </div>
          
          <div class="border-l-4 border-blue-400 pl-3">
            <h5 class="font-medium">Method 2: Device Manager</h5>
            <p class="text-sm mb-2">Windows can sometimes find updated drivers automatically:</p>
            <ol class="list-decimal pl-4 text-sm">
              <li>Right-click on the Start button and select "Device Manager"</li>
              <li>Expand "Cameras" or "Imaging devices"</li>
              <li>Right-click on your webcam and select "Update driver"</li>
              <li>Choose "Search automatically for updated driver software"</li>
              <li>Follow the prompts if Windows finds a newer version</li>
              <li>Restart your computer after installation</li>
            </ol>
            <p class="text-sm italic">Note: This method may not always find the latest drivers</p>
          </div>
          
          <div class="border-l-4 border-blue-400 pl-3">
            <h5 class="font-medium">Method 3: Driver Update Software</h5>
            <p class="text-sm mb-2">Third-party tools can help find and install drivers:</p>
            <ul class="list-disc pl-4 text-sm">
              <li>Reliable options include Driver Booster, Snappy Driver Installer, or Dell Update (for Dell computers)</li>
              <li>Install your chosen driver update software</li>
              <li>Run a scan to check for outdated drivers</li>
              <li>Select your webcam from the list of outdated drivers</li>
              <li>Use the software to download and install the update</li>
              <li>Restart your computer afterward</li>
            </ul>
            <p class="text-sm italic">Caution: Only use reputable driver update software from trusted sources</p>
          </div>
        </div>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
          <p class="font-medium">Troubleshooting After Update:</p>
          <p class="text-sm">If your webcam doesn't work properly after updating:</p>
          <ol class="list-decimal pl-5 text-sm">
            <li>Try uninstalling the device completely from Device Manager (right-click > Uninstall device)</li>
            <li>Check the "Delete the driver software for this device" option if available</li>
            <li>Restart your computer and let Windows reinstall the device</li>
            <li>If issues persist, try rolling back to the previous driver (Device Properties > Driver tab > Roll Back Driver)</li>
          </ol>
        </div>
        
        <p>Regular driver updates are especially important for webcams used with Microsoft Teams, as new Teams versions often include improvements that require updated webcam drivers for optimal compatibility.</p>`;
      } else if (question.toLowerCase().includes('antivirus')) {
        answer = `<h4 class="text-lg font-medium mb-2">Antivirus Software and Webcam Blocking</h4>
        <p class="mb-3">Many antivirus programs include privacy protection features that can block webcam access. Here's how to check if your antivirus is blocking your webcam and how to fix it:</p>
        
        <div class="space-y-4 mb-4">
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <div>
              <p class="font-medium">Common Antivirus Programs with Webcam Protection</p>
              <ul class="list-disc pl-5 text-sm">
                <li><strong>Norton 360</strong>: Features SafeCam that blocks unauthorized access</li>
                <li><strong>Kaspersky</strong>: Includes webcam protection module</li>
                <li><strong>McAfee</strong>: Has App Boost that can interfere with webcam access</li>
                <li><strong>Bitdefender</strong>: Features webcam protection shield</li>
                <li><strong>Avast/AVG</strong>: Includes webcam shield functionality</li>
                <li><strong>Windows Security</strong>: Has app permission controls for camera</li>
              </ul>
            </div>
          </div>
          
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <div>
              <p class="font-medium">Check and Configure Norton 360</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Open Norton 360 dashboard</li>
                <li>Go to Settings > SafeCam</li>
                <li>Check if Microsoft Teams is set to "Block" or "Prompt"</li>
                <li>Change setting to "Allow" for Microsoft Teams</li>
              </ol>
            </div>
          </div>
          
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <div>
              <p class="font-medium">Check and Configure Kaspersky</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Open Kaspersky</li>
                <li>Go to Privacy Protection > Webcam Protection</li>
                <li>Look for Microsoft Teams in the list</li>
                <li>Set it to "Allow" instead of "Block" or "Ask action"</li>
              </ol>
            </div>
          </div>
          
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <div>
              <p class="font-medium">Check and Configure Bitdefender</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Open Bitdefender</li>
                <li>Go to Privacy > Webcam Protection</li>
                <li>Review the list of applications with webcam access</li>
                <li>Add Microsoft Teams to the allowed list if not present</li>
              </ol>
            </div>
          </div>
          
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">5</span>
            <div>
              <p class="font-medium">Check and Configure Avast/AVG</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Open Avast/AVG</li>
                <li>Go to Privacy > Webcam Shield</li>
                <li>Click on "Customize"</li>
                <li>Ensure Microsoft Teams is in the allowed applications list</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-3 rounded-md mb-4">
          <p class="font-medium">Temporarily Disable Webcam Protection for Testing</p>
          <p class="text-sm">If you're not sure which setting is causing the problem, you can temporarily disable the webcam protection feature:</p>
          <ol class="list-decimal pl-5 text-sm">
            <li>Open your antivirus program</li>
            <li>Find the webcam protection feature</li>
            <li>Disable it temporarily</li>
            <li>Test your webcam in Teams</li>
            <li>If it works, re-enable protection but add Teams as an exception</li>
          </ol>
          <p class="text-sm italic">Note: Remember to re-enable webcam protection after testing</p>
        </div>
        
        <p>When updating antivirus software, webcam permissions may sometimes reset to default (blocking) settings. Always check these settings after antivirus updates if webcam problems reoccur.</p>`;
      } else if (question.toLowerCase().includes('fix work')) {
        answer = `<h4 class="text-lg font-medium mb-2">Will This Webcam Fix Work for All Video Calls?</h4>
        <p class="mb-3">The fixes we've discussed have varying levels of effectiveness across different video calling platforms. Here's a breakdown:</p>
        
        <div class="overflow-x-auto mb-4">
          <table class="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-2 text-left">Fix Type</th>
                <th class="border border-gray-300 p-2 text-center">Microsoft Teams</th>
                <th class="border border-gray-300 p-2 text-center">Zoom</th>
                <th class="border border-gray-300 p-2 text-center">Google Meet</th>
                <th class="border border-gray-300 p-2 text-center">Webex</th>
                <th class="border border-gray-300 p-2 text-center">Skype</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr>
                <td class="border border-gray-300 p-2 font-medium">Permission Settings</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2 font-medium">Driver Updates</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2 font-medium">Connection Fixes</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2 font-medium">Teams-Specific Cache Clear</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">❌ No effect</td>
                <td class="border border-gray-300 p-2 text-center">❌ No effect</td>
                <td class="border border-gray-300 p-2 text-center">❌ No effect</td>
                <td class="border border-gray-300 p-2 text-center">❌ No effect</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2 font-medium">Teams Settings Optimization</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">⚠️ Partial</td>
                <td class="border border-gray-300 p-2 text-center">⚠️ Partial</td>
                <td class="border border-gray-300 p-2 text-center">⚠️ Partial</td>
                <td class="border border-gray-300 p-2 text-center">⚠️ Partial</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-2 font-medium">Antivirus Exceptions</td>
                <td class="border border-gray-300 p-2 text-center">✅ Full fix</td>
                <td class="border border-gray-300 p-2 text-center">⚠️ Partial*</td>
                <td class="border border-gray-300 p-2 text-center">⚠️ Partial*</td>
                <td class="border border-gray-300 p-2 text-center">⚠️ Partial*</td>
                <td class="border border-gray-300 p-2 text-center">⚠️ Partial*</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm mb-4">* You would need to add each application to your antivirus exceptions list separately.</p>
        
        <div class="bg-blue-50 p-3 rounded-md mb-4">
          <p class="font-medium">Cross-Platform Fixes:</p>
          <p class="text-sm mb-2">These fixes apply universally to all video calling applications:</p>
          <ul class="list-disc pl-5 text-sm">
            <li><strong>Driver Updates</strong>: Updating webcam drivers fixes compatibility issues across all applications</li>
            <li><strong>Windows Camera Privacy</strong>: Enabling camera access in Windows settings affects all applications</li>
            <li><strong>Physical Connection</strong>: Fixing USB connections or hardware issues benefits all applications</li>
            <li><strong>USB Power Management</strong>: Preventing USB power saving helps all webcam software</li>
          </ul>
        </div>
        
        <div class="bg-yellow-50 p-3 rounded-md">
          <p class="font-medium">Application-Specific Settings:</p>
          <p class="text-sm mb-2">Each video calling application has its own camera settings that need to be configured separately:</p>
          <ul class="list-disc pl-5 text-sm">
            <li>In <strong>Zoom</strong>: Settings > Video > Camera</li>
            <li>In <strong>Google Meet</strong>: Before joining a meeting, click Settings (gear icon) > Video</li>
            <li>In <strong>Webex</strong>: Settings > Video > Camera</li>
            <li>In <strong>Skype</strong>: Settings > Audio & Video > Camera</li>
          </ul>
          <p class="text-sm">Check these settings in each application even after fixing the issue in Teams.</p>
        </div>`;
      } else if (question.toLowerCase().includes('fix this if')) {
        answer = `<h4 class="text-lg font-medium mb-2">Alternative Solutions If Initial Fixes Don't Work</h4>
        <p class="mb-3">If the recommended optimizations didn't resolve your performance issues, here are more advanced troubleshooting steps to consider:</p>
        
        <div class="space-y-4 mb-4">
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <div>
              <p class="font-medium">Perform System File Check</p>
              <p class="text-sm mb-2">Corrupted system files can cause persistent performance issues:</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Open Command Prompt as administrator</li>
                <li>Run <code class="bg-gray-100 px-1">sfc /scannow</code></li>
                <li>Wait for the scan to complete (may take 15-20 minutes)</li>
                <li>If issues are found, they will be automatically repaired</li>
                <li>Restart your computer</li>
              </ol>
            </div>
          </div>
          
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <div>
              <p class="font-medium">Check for Storage Device Health Issues</p>
              <p class="text-sm mb-2">Failing storage can cause severe performance degradation:</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Open Command Prompt as administrator</li>
                <li>Run <code class="bg-gray-100 px-1">wmic diskdrive get status</code> to check basic disk status</li>
                <li>For more detail, download CrystalDiskInfo to check S.M.A.R.T. status</li>
                <li>Look for any warnings or errors that indicate drive problems</li>
                <li>If drive health issues are found, back up your data immediately and consider drive replacement</li>
              </ol>
            </div>
          </div>
          
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <div>
              <p class="font-medium">Run Memory Diagnostics</p>
              <p class="text-sm mb-2">RAM issues are a common cause of performance problems and crashes:</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Search for "Windows Memory Diagnostic" in the Start menu</li>
                <li>Choose to restart now and check for problems</li>
                <li>Let the test complete (may take 15-30 minutes)</li>
                <li>Windows will restart and show results</li>
                <li>If errors are found, consider replacing the affected RAM module</li>
              </ol>
            </div>
          </div>
          
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <div>
              <p class="font-medium">Check for Thermal Throttling</p>
              <p class="text-sm mb-2">Overheating can cause severe performance drops:</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Download and install HWiNFO or Intel XTU (for Intel CPUs)</li>
                <li>Monitor CPU and GPU temperatures during normal use</li>
                <li>CPU temperatures above 90°C or GPU above 85°C indicate a cooling problem</li>
                <li>Clean cooling vents and ensure fans are working properly</li>
                <li>For laptops, consider using a cooling pad</li>
              </ol>
            </div>
          </div>
          
          <div class="flex items-start">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">5</span>
            <div>
              <p class="font-medium">Check for Background Processes with High Resource Usage</p>
              <p class="text-sm mb-2">Unknown processes may be consuming system resources:</p>
              <ol class="list-decimal pl-5 text-sm">
                <li>Press Ctrl+Shift+Esc to open Task Manager</li>
                <li>Click "More details" if you're in the simplified view</li>
                <li>Sort by CPU, Memory, Disk, or Network usage to identify high-usage processes</li>
                <li>Research any unfamiliar processes consuming significant resources</li>
                <li>For legitimate but resource-heavy processes, consider disabling them at startup</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-3 rounded-md mb-4">
          <p class="font-medium">When to Consider Hardware Upgrades:</p>
          <p class="text-sm">If all software solutions fail to resolve performance issues, you might need hardware upgrades:</p>
          <ul class="list-disc pl-5 text-sm">
            <li><strong>RAM upgrade</strong>: If your system frequently uses 80%+ of available RAM</li>
            <li><strong>SSD upgrade</strong>: If you're still using a mechanical hard drive as your system disk</li>
            <li><strong>GPU upgrade</strong>: For graphics-intensive applications and gaming</li>
            <li><strong>CPU upgrade</strong>: Only if your CPU is consistently at 100% utilization during normal tasks</li>
          </ul>
        </div>
        
        <p>Before investing in hardware upgrades, try a clean Windows installation as a last resort software solution. This eliminates all software-related issues and gives you a fresh start.</p>`;
      } else if (question.trim() !== '') {
        // Generic response for other questions
        answer = `<h4 class="text-lg font-medium mb-2">Additional Information</h4>
        <p class="mb-3">Let me provide some additional insights regarding your question about "${question}".</p>
        <div class="bg-blue-50 p-3 rounded-md mb-4">
          <p>This appears to be a specific question I don't have a pre-defined answer for. In a real implementation, this would connect to an AI service to generate a relevant response based on your question and the context of our previous conversation.</p>
        </div>
        <p>For the purposes of this prototype, I can tell you that the Dell DeepResolution system would analyze your specific query, consider the context of our discussion about ${currentQuery}, and provide a detailed answer with relevant sources, guidance, and next steps.</p>`;
      }

      // Add the answer to the followUpAnswers array
      const newAnswer = {
        question,
        content: answer,
        originalQuery: currentQuery,
      };
      
      setFollowUpAnswers(prev => [...prev, newAnswer]);
      setFollowUpText('');
      setIsProcessing(false);
    }, 1500);
  };

  const handleFollowUpInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpText.trim()) {
      processFollowUpQuestion(followUpText);
    }
  };

  const handleChipClick = (suggestion: string) => {
    processFollowUpQuestion(suggestion);
  };

  return (
    <div className="mt-8 border-t pt-6">
      {followUpAnswers.length > 0 && (
        <div className="space-y-6 mb-8">
          {followUpAnswers.map((answer, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="mb-2 text-sm text-gray-500">
                <span>Because you asked "{answer.originalQuery}"</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">{answer.question}</h3>
              <AIGeneratedAnswer content={answer.content} />
            </div>
          ))}
        </div>
      )}
      
      <h3 className="font-medium text-lg mb-3">Ask a follow-up question</h3>
      
      <div className="mb-4 flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <FollowUpChip
            key={index}
            text={suggestion}
            onClick={() => handleChipClick(suggestion)}
            delay={index * 0.1}
          />
        ))}
      </div>
      
      <form onSubmit={handleFollowUpInput} className="flex gap-2">
        <div className="flex-1">
          <Input
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            placeholder="Type your follow-up question..."
            className="w-full"
            disabled={isProcessing}
          />
        </div>
        <button
          type="submit"
          disabled={followUpText.trim() === '' || isProcessing}
          className={`p-2 rounded-full bg-blue-500 text-white ${
            followUpText.trim() === '' || isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          <Send size={18} />
        </button>
      </form>
      
      {isProcessing && (
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <div className="animate-pulse mr-2">Processing your question...</div>
        </div>
      )}
    </div>
  );
};

export default FollowUpPrompt;
