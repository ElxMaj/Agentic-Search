// Mock data for DELL DeepResolution prototype

export interface Source {
  type: 'official' | 'community' | 'knowledge-base';
  title: string;
  date: string;
  metadata: string;
  confidence: number;
  excerpt: string;
  url?: string;
}

export interface ResolutionOption {
  id: string;
  text: string;
  nextStepId?: string;
}

export interface ResolutionStep {
  id: string;
  title: string;
  description: string;
  options: ResolutionOption[];
}

export interface ResolutionPath {
  name: string;
  icon: string;
  steps: ResolutionStep[];
  sources?: Source[];
}

export interface MockQueryData {
  query: string;
  interpretation: {
    steps: {
      description: string;
      entities: {
        text: string;
        type: string;
      }[];
    }[];
  };
  resolutionPaths: Record<string, ResolutionPath>;
}

export const mockQueries: MockQueryData[] = [
  {
    query: "Improve Dell graphics performance",
    interpretation: {
      steps: [
        {
          description: "Detected <strong>Dell XPS 13</strong> from your system configuration",
          entities: [
            { text: "Dell XPS 13", type: "DEVICE" }
          ]
        },
        {
          description: "Identified <strong>Intel Iris Xe Graphics</strong> as your GPU",
          entities: [
            { text: "Intel Iris Xe Graphics", type: "HARDWARE" }
          ]
        },
        {
          description: "Found both <strong>software</strong> and <strong>hardware</strong> improvement options",
          entities: [
            { text: "software", type: "SOLUTION_TYPE" },
            { text: "hardware", type: "SOLUTION_TYPE" }
          ]
        }
      ]
    },
    resolutionPaths: {
      "software": {
        name: "Performance Optimization",
        icon: "💻",
        steps: [
          {
            id: "sw-step1",
            title: "Update Intel Iris Xe Graphics drivers",
            description: "Updating your graphics drivers is often the most effective way to improve performance.",
            options: [
              { id: "sw-opt1", text: "Check for driver updates automatically", nextStepId: "sw-step2" },
              { id: "sw-opt2", text: "Download drivers manually from Dell", nextStepId: "sw-step3" },
              { id: "sw-opt3", text: "Use third-party driver tools", nextStepId: "sw-step4" }
            ]
          },
          {
            id: "sw-step2",
            title: "Automatic Driver Updates",
            description: "Let's use Windows Update or Dell Update to find the latest drivers.",
            options: [
              { id: "sw-opt4", text: "Use Windows Update", nextStepId: "sw-step5" },
              { id: "sw-opt5", text: "Use Dell Update utility", nextStepId: "sw-step6" }
            ]
          },
          {
            id: "sw-step3",
            title: "Manual Driver Download",
            description: "Let's download the latest drivers directly from Dell's support site.",
            options: [
              { id: "sw-opt6", text: "Find my Dell model", nextStepId: "sw-step7" },
              { id: "sw-opt7", text: "Check if I have NVIDIA or AMD graphics", nextStepId: "sw-step8" }
            ]
          },
          {
            id: "sw-step4",
            title: "Third-Party Driver Tools",
            description: "Third-party tools can help identify and update outdated drivers.",
            options: [
              { id: "sw-opt8", text: "Use Dell Support Assist", nextStepId: "sw-step9" },
              { id: "sw-opt9", text: "Use manufacturer-specific tools (NVIDIA/AMD)", nextStepId: "sw-step10" }
            ]
          },
          {
            id: "sw-step5",
            title: "Windows Update for Drivers",
            description: "Here's how to check for graphics driver updates using Windows Update:",
            options: []
          },
          {
            id: "sw-step6",
            title: "Dell Update Utility",
            description: "Here's how to use the Dell Update utility to install the latest graphics drivers:",
            options: []
          },
          {
            id: "sw-step7",
            title: "Finding Your Dell Model",
            description: "Here's how to identify your exact Dell model to find the right drivers:",
            options: []
          },
          {
            id: "sw-step8",
            title: "Identifying Graphics Hardware",
            description: "Here's how to check whether your Dell has NVIDIA, AMD, or Intel graphics:",
            options: []
          },
          {
            id: "sw-step9",
            title: "Dell Support Assist",
            description: "Here's how to use Dell Support Assist to automatically find and install the best drivers:",
            options: []
          },
          {
            id: "sw-step10",
            title: "Graphics Vendor Tools",
            description: "Here's how to use NVIDIA GeForce Experience or AMD Radeon Software to keep your graphics drivers updated:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Dell Official Driver Documentation",
            date: "Updated Feb 2023",
            metadata: "Official Source",
            confidence: 98,
            excerpt: "The latest Intel Iris Xe Graphics drivers are recommended for all Dell XPS systems for optimal performance."
          },
          {
            type: "knowledge-base",
            title: "Dell Support: Optimizing Graphics Performance",
            date: "Updated Dec 2022",
            metadata: "Knowledge Base",
            confidence: 95,
            excerpt: "Regular driver updates for Intel Iris Xe Graphics can resolve many common performance issues and improve compatibility with the latest games and applications."
          },
          {
            type: "community",
            title: "Dell User Forums: Graphics Driver Optimization",
            date: "Thread from Jan 2023",
            metadata: "Community Discussion",
            confidence: 88,
            excerpt: "Users report significant performance gains after updating to the latest Intel Iris Xe Graphics drivers and optimizing power settings."
          }
        ]
      },
      "hardware": {
        name: "Hardware Solutions",
        icon: "⚙️",
        steps: [
          {
            id: "hw-step1",
            title: "Hardware Assessment",
            description: "Let's determine if hardware upgrades would help your Dell system's graphics performance.",
            options: [
              { id: "hw-opt1", text: "Check if my Dell model supports upgrades", nextStepId: "hw-step2" },
              { id: "hw-opt2", text: "Identify my current graphics hardware", nextStepId: "hw-step3" },
              { id: "hw-opt3", text: "Explore external graphics solutions", nextStepId: "hw-step4" }
            ]
          },
          {
            id: "hw-step2",
            title: "Upgrade Compatibility Check",
            description: "Let's determine if your Dell model supports hardware upgrades for graphics.",
            options: [
              { id: "hw-opt4", text: "Desktop upgrade options", nextStepId: "hw-step5" },
              { id: "hw-opt5", text: "Laptop upgrade options", nextStepId: "hw-step6" }
            ]
          },
          {
            id: "hw-step3",
            title: "Current Graphics Hardware",
            description: "Let's identify your current graphics hardware to determine upgrade paths.",
            options: [
              { id: "hw-opt6", text: "Check system information", nextStepId: "hw-step7" },
              { id: "hw-opt7", text: "Run diagnostic tools", nextStepId: "hw-step8" }
            ]
          },
          {
            id: "hw-step4",
            title: "External Graphics Solutions",
            description: "External graphics enclosures can boost graphics performance on supported Dell systems.",
            options: [
              { id: "hw-opt8", text: "Check Thunderbolt compatibility", nextStepId: "hw-step9" },
              { id: "hw-opt9", text: "Compare eGPU options", nextStepId: "hw-step10" }
            ]
          },
          {
            id: "hw-step5",
            title: "Desktop Graphics Upgrade Options",
            description: "Here are recommended graphics card upgrade options for Dell desktop systems:",
            options: []
          },
          {
            id: "hw-step6",
            title: "Laptop Graphics Options",
            description: "Most Dell laptops don't support internal graphics upgrades, but here are alternatives:",
            options: []
          },
          {
            id: "hw-step7",
            title: "Checking System Information",
            description: "Here's how to check your current graphics hardware details:",
            options: []
          },
          {
            id: "hw-step8",
            title: "Graphics Diagnostics",
            description: "Here's how to run diagnostics to assess your current graphics hardware performance:",
            options: []
          },
          {
            id: "hw-step9",
            title: "Thunderbolt Compatibility",
            description: "Here's how to check if your Dell supports external graphics via Thunderbolt:",
            options: []
          },
          {
            id: "hw-step10",
            title: "External GPU Options",
            description: "Here are recommended external graphics enclosures compatible with Dell systems:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Dell Upgrade Compatibility Guide",
            date: "Updated Mar 2023",
            metadata: "Official Documentation",
            confidence: 97,
            excerpt: "While the Intel Iris Xe Graphics in your Dell XPS 13 cannot be upgraded, external GPU options via Thunderbolt are available for demanding graphics workloads."
          },
          {
            type: "community",
            title: "Dell Community Forums: Graphics Upgrades",
            date: "Thread from Jan 2023",
            metadata: "Community Resources",
            confidence: 85,
            excerpt: "Users with Dell XPS 13 with Intel Iris Xe Graphics report 2-3x performance improvements when connecting compatible external GPUs via Thunderbolt."
          }
        ]
      },
      "diagnostics": {
        name: "Performance Diagnosis",
        icon: "🔍",
        steps: [
          {
            id: "diag-step1",
            title: "Graphics Performance Diagnosis",
            description: "Let's diagnose what might be causing graphics performance issues on your Dell system.",
            options: [
              { id: "diag-opt1", text: "Check for thermal throttling", nextStepId: "diag-step2" },
              { id: "diag-opt2", text: "Analyze system resource usage", nextStepId: "diag-step3" },
              { id: "diag-opt3", text: "Run graphics benchmarks", nextStepId: "diag-step4" }
            ]
          },
          {
            id: "diag-step2",
            title: "Thermal Analysis",
            description: "Let's check if your Dell system is experiencing thermal throttling that impacts graphics performance.",
            options: [
              { id: "diag-opt4", text: "Monitor system temperatures", nextStepId: "diag-step5" },
              { id: "diag-opt5", text: "Improve cooling solutions", nextStepId: "diag-step6" }
            ]
          },
          {
            id: "diag-step3",
            title: "Resource Usage Analysis",
            description: "Let's analyze how your system resources are being utilized during graphics-intensive tasks.",
            options: [
              { id: "diag-opt6", text: "CPU utilization", nextStepId: "diag-step7" },
              { id: "diag-opt7", text: "Memory usage", nextStepId: "diag-step8" },
              { id: "diag-opt8", text: "Storage performance", nextStepId: "diag-step9" }
            ]
          },
          {
            id: "diag-step4",
            title: "Benchmark Testing",
            description: "Let's run benchmarks to quantify your current graphics performance and identify bottlenecks.",
            options: [
              { id: "diag-opt9", text: "Run 3DMark", nextStepId: "diag-step10" },
              { id: "diag-opt10", text: "Game-specific benchmarks", nextStepId: "diag-step11" }
            ]
          },
          {
            id: "diag-step5",
            title: "Temperature Monitoring",
            description: "Here's how to monitor temperatures on your Dell system to identify thermal throttling:",
            options: []
          },
          {
            id: "diag-step6",
            title: "Cooling Improvements",
            description: "Here are recommended cooling solutions to prevent thermal throttling on your Dell system:",
            options: []
          },
          {
            id: "diag-step7",
            title: "CPU Analysis",
            description: "Here's how to analyze CPU performance and its impact on graphics performance:",
            options: []
          },
          {
            id: "diag-step8",
            title: "Memory Analysis",
            description: "Here's how to check if insufficient memory is impacting your graphics performance:",
            options: []
          },
          {
            id: "diag-step9",
            title: "Storage Performance",
            description: "Here's how to determine if storage bottlenecks are affecting your graphics performance:",
            options: []
          },
          {
            id: "diag-step10",
            title: "3DMark Benchmarks",
            description: "Here's how to run and interpret 3DMark benchmarks to assess your graphics performance:",
            options: []
          },
          {
            id: "diag-step11",
            title: "Game Benchmarks",
            description: "Here's how to run built-in benchmarks in popular games to measure real-world performance:",
            options: []
          }
        ],
        sources: [
          {
            type: "knowledge-base",
            title: "Dell Support: Performance Diagnostics",
            date: "Updated Apr 2023",
            metadata: "Knowledge Base",
            confidence: 74,
            excerpt: "Dell systems with Intel Iris Xe Graphics may benefit from thermal management optimization to prevent throttling during intensive tasks."
          },
          {
            type: "community",
            title: "Dell Community: Performance Optimization Guide",
            date: "Thread from Nov 2022",
            metadata: "Community Guide",
            confidence: 68,
            excerpt: "Many users report 15-20% performance improvements in Intel Iris Xe Graphics after addressing thermal issues and updating power management settings."
          },
          {
            type: "community",
            title: "User Benchmarks: Dell XPS Graphics",
            date: "Collected Data Oct 2022 - Mar 2023",
            metadata: "User Benchmarks",
            confidence: 73,
            excerpt: "Benchmark data shows that thermal management has the biggest impact on sustained Intel Iris Xe Graphics performance in Dell XPS laptops."
          },
          {
            type: "knowledge-base",
            title: "Graphics Performance Bottleneck Analysis",
            date: "Updated Jan 2023",
            metadata: "Technical Guide",
            confidence: 79,
            excerpt: "Systematic diagnosis can identify whether CPU, memory, or thermal constraints are limiting Intel Iris Xe Graphics performance in Dell XPS systems."
          }
        ]
      }
    }
  },
  {
    query: "Webcam problem during a Teams call",
    interpretation: {
      steps: [
        {
          description: "Detected <strong>Dell XPS 13</strong> from your system configuration",
          entities: [
            { text: "Dell XPS 13", type: "DEVICE" }
          ]
        },
        {
          description: "Identified <strong>Logitech C920 webcam</strong> as the device with issues during a <strong>Microsoft Teams</strong> call",
          entities: [
            { text: "Logitech C920 webcam", type: "DEVICE" },
            { text: "Microsoft Teams", type: "APPLICATION" }
          ]
        },
        {
          description: "Detected possible <strong>connection</strong>, <strong>permission</strong>, or <strong>driver</strong> related issues",
          entities: [
            { text: "connection", type: "ISSUE_TYPE" },
            { text: "permission", type: "ISSUE_TYPE" },
            { text: "driver", type: "ISSUE_TYPE" }
          ]
        }
      ]
    },
    resolutionPaths: {
      "permissions": {
        name: "Permission Issues",
        icon: "🔒",
        steps: [
          {
            id: "perm-step1",
            title: "Microsoft Teams Camera Permission",
            description: "Let's check if Microsoft Teams has permission to access your webcam.",
            options: [
              { id: "perm-opt1", text: "Check Windows camera privacy settings", nextStepId: "perm-step2" },
              { id: "perm-opt2", text: "Check Teams app permissions", nextStepId: "perm-step3" },
              { id: "perm-opt3", text: "Check browser permissions (for Teams Web)", nextStepId: "perm-step4" }
            ]
          },
          {
            id: "perm-step2",
            title: "Windows Camera Privacy Settings",
            description: "Let's verify your Windows camera privacy settings are correctly configured.",
            options: [
              { id: "perm-opt4", text: "Open Windows camera privacy settings", nextStepId: "perm-step5" },
              { id: "perm-opt5", text: "Check app permissions in Windows settings", nextStepId: "perm-step6" }
            ]
          },
          {
            id: "perm-step3",
            title: "Teams App Permissions",
            description: "Let's check Microsoft Teams' camera permissions in the app settings.",
            options: [
              { id: "perm-opt6", text: "Check Teams desktop app settings", nextStepId: "perm-step7" },
              { id: "perm-opt7", text: "Reset Teams cache", nextStepId: "perm-step8" }
            ]
          },
          {
            id: "perm-step4",
            title: "Browser Permissions for Teams Web",
            description: "Let's verify your browser is allowing Teams to access your camera.",
            options: [
              { id: "perm-opt8", text: "Check Chrome camera permissions", nextStepId: "perm-step9" },
              { id: "perm-opt9", text: "Check Edge camera permissions", nextStepId: "perm-step10" },
              { id: "perm-opt10", text: "Check Firefox camera permissions", nextStepId: "perm-step11" }
            ]
          },
          {
            id: "perm-step5",
            title: "Windows Camera Privacy Settings Guide",
            description: "Here's how to check and adjust your Windows camera privacy settings:",
            options: []
          },
          {
            id: "perm-step6",
            title: "Windows App Permissions Guide",
            description: "Here's how to check and manage app permissions for your camera in Windows:",
            options: []
          },
          {
            id: "perm-step7",
            title: "Teams Desktop App Settings",
            description: "Here's how to verify and adjust camera permissions in the Teams desktop app:",
            options: []
          },
          {
            id: "perm-step8",
            title: "Reset Teams Cache Guide",
            description: "Here's how to reset the Teams cache to resolve permission issues:",
            options: []
          },
          {
            id: "perm-step9",
            title: "Chrome Camera Permissions",
            description: "Here's how to check and adjust camera permissions in Google Chrome:",
            options: []
          },
          {
            id: "perm-step10",
            title: "Edge Camera Permissions",
            description: "Here's how to check and adjust camera permissions in Microsoft Edge:",
            options: []
          },
          {
            id: "perm-step11",
            title: "Firefox Camera Permissions",
            description: "Here's how to check and adjust camera permissions in Mozilla Firefox:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Microsoft Teams Camera Troubleshooting Guide",
            date: "Updated Mar 2024",
            metadata: "Microsoft Support",
            confidence: 98,
            excerpt: "Access to the camera is controlled by Windows privacy settings. Ensure that access to the camera is turned on and that Teams is allowed to use the camera."
          },
          {
            type: "knowledge-base",
            title: "Teams Web App Camera Access",
            date: "Updated Feb 2024",
            metadata: "Microsoft Knowledge Base",
            confidence: 95,
            excerpt: "For Teams web app users, camera permissions are managed by your browser and must be explicitly granted for the teams.microsoft.com domain."
          },
          {
            type: "community",
            title: "Microsoft Teams Community: Camera Permission Issues",
            date: "Thread from Jan 2024",
            metadata: "Community Solutions",
            confidence: 87,
            excerpt: "Many users have resolved camera issues by resetting the Teams app cache, which refreshes permission configurations and resolves corrupted settings."
          },
          {
            type: "knowledge-base",
            title: "Windows 11 Permission Management",
            date: "Updated Jan 2024",
            metadata: "Microsoft Documentation",
            confidence: 92,
            excerpt: "Windows 11 introduces new granular camera permission controls that may affect Teams camera access differently than on Windows 10."
          },
          {
            type: "official",
            title: "Microsoft Teams Security Features",
            date: "Updated Apr 2024",
            metadata: "Microsoft Documentation",
            confidence: 94,
            excerpt: "Recent Teams security updates require explicit camera permission grants, even for previously authorized applications."
          }
        ]
      },
      "connection": {
        name: "Connection Problems",
        icon: "🔌",
        steps: [
          {
            id: "conn-step1",
            title: "Webcam Connection Troubleshooting",
            description: "Let's troubleshoot issues with your webcam's physical connection during Teams calls.",
            options: [
              { id: "conn-opt1", text: "Check physical connections", nextStepId: "conn-step2" },
              { id: "conn-opt2", text: "Check USB port issues", nextStepId: "conn-step3" },
              { id: "conn-opt3", text: "Check if webcam is detected", nextStepId: "conn-step4" }
            ]
          },
          {
            id: "conn-step2",
            title: "Physical Connection Check",
            description: "Let's verify your webcam's physical connection is secure and functional.",
            options: [
              { id: "conn-opt4", text: "Check cable connection", nextStepId: "conn-step5" },
              { id: "conn-opt5", text: "Check for damaged cables", nextStepId: "conn-step6" }
            ]
          },
          {
            id: "conn-step3",
            title: "USB Port Troubleshooting",
            description: "Let's check if the USB port is causing connection issues with your webcam.",
            options: [
              { id: "conn-opt6", text: "Try different USB ports", nextStepId: "conn-step7" },
              { id: "conn-opt7", text: "Check USB hub issues", nextStepId: "conn-step8" }
            ]
          },
          {
            id: "conn-step4",
            title: "Device Detection Check",
            description: "Let's verify if your system is detecting the webcam correctly.",
            options: [
              { id: "conn-opt8", text: "Check Device Manager", nextStepId: "conn-step9" },
              { id: "conn-opt9", text: "Test in Camera app", nextStepId: "conn-step10" }
            ]
          },
          {
            id: "conn-step5",
            title: "Cable Connection Guide",
            description: "Here's how to verify your webcam's cable connection is secure:",
            options: []
          },
          {
            id: "conn-step6",
            title: "Cable Damage Check",
            description: "Here's how to inspect your webcam cable for damage:",
            options: []
          },
          {
            id: "conn-step7",
            title: "Different USB Ports Guide",
            description: "Here's how to test your webcam with different USB ports:",
            options: []
          },
          {
            id: "conn-step8",
            title: "USB Hub Troubleshooting",
            description: "Here's how to address issues with USB hubs affecting your webcam:",
            options: []
          },
          {
            id: "conn-step9",
            title: "Device Manager Check",
            description: "Here's how to verify webcam detection in Device Manager:",
            options: []
          },
          {
            id: "conn-step10",
            title: "Camera App Test",
            description: "Here's how to test your webcam in the Windows Camera app:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Microsoft Teams Hardware Requirements",
            date: "Updated Apr 2024",
            metadata: "Microsoft Documentation",
            confidence: 76,
            excerpt: "For reliable camera operation in Teams, use a directly connected USB port (preferably USB 3.0) rather than a USB hub, which can cause intermittent connection issues."
          },
          {
            type: "knowledge-base",
            title: "Webcam Connection Troubleshooting",
            date: "Updated Mar 2024",
            metadata: "IT Support Database",
            confidence: 64,
            excerpt: "Approximately 45% of webcam issues during video calls are resolved by simply reconnecting the device or trying a different USB port."
          },
          {
            type: "community",
            title: "Teams User Forum: Webcam Connection Issues",
            date: "Thread from Feb 2024",
            metadata: "User Discussion",
            confidence: 55,
            excerpt: "Many users have resolved intermittent webcam disconnection during Teams calls by installing the latest USB controller drivers for their system."
          }
        ]
      },
      "drivers": {
        name: "Driver & Software Issues",
        icon: "🔧",
        steps: [
          {
            id: "driver-step1",
            title: "Webcam Driver Troubleshooting",
            description: "Let's address driver and software issues affecting your webcam in Teams calls.",
            options: [
              { id: "driver-opt1", text: "Update webcam drivers", nextStepId: "driver-step2" },
              { id: "driver-opt2", text: "Reinstall webcam drivers", nextStepId: "driver-step3" },
              { id: "driver-opt3", text: "Update Teams application", nextStepId: "driver-step4" }
            ]
          },
          {
            id: "driver-step2",
            title: "Update Webcam Drivers",
            description: "Let's ensure your webcam drivers are up to date.",
            options: [
              { id: "driver-opt4", text: "Use Device Manager to update", nextStepId: "driver-step5" },
              { id: "driver-opt5", text: "Download drivers from manufacturer", nextStepId: "driver-step6" }
            ]
          },
          {
            id: "driver-step3",
            title: "Reinstall Webcam Drivers",
            description: "Let's completely reinstall your webcam drivers to resolve potential conflicts.",
            options: [
              { id: "driver-opt6", text: "Uninstall current drivers", nextStepId: "driver-step7" },
              { id: "driver-opt7", text: "Clean installation of drivers", nextStepId: "driver-step8" }
            ]
          },
          {
            id: "driver-step4",
            title: "Update Microsoft Teams",
            description: "Let's make sure your Teams application is up to date.",
            options: [
              { id: "driver-opt8", text: "Update Teams desktop app", nextStepId: "driver-step9" },
              { id: "driver-opt9", text: "Reinstall Teams application", nextStepId: "driver-step10" }
            ]
          },
          {
            id: "driver-step5",
            title: "Device Manager Driver Update",
            description: "Here's how to update your webcam drivers using Device Manager:",
            options: []
          },
          {
            id: "driver-step6",
            title: "Manufacturer Driver Download",
            description: "Here's how to download and install the latest webcam drivers from the manufacturer:",
            options: []
          },
          {
            id: "driver-step7",
            title: "Uninstall Current Drivers",
            description: "Here's how to safely uninstall your current webcam drivers:",
            options: []
          },
          {
            id: "driver-step8",
            title: "Clean Driver Installation",
            description: "Here's how to perform a clean installation of your webcam drivers:",
            options: []
          },
          {
            id: "driver-step9",
            title: "Update Teams Desktop App",
            description: "Here's how to update your Microsoft Teams desktop application:",
            options: []
          },
          {
            id: "driver-step10",
            title: "Reinstall Teams Application",
            description: "Here's how to completely reinstall Microsoft Teams:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Microsoft Teams Camera Compatibility",
            date: "Updated May 2024",
            metadata: "Microsoft Documentation",
            confidence: 87,
            excerpt: "Recent Teams updates have improved compatibility with webcam drivers, resolving many common camera detection issues reported by users."
          },
          {
            type: "knowledge-base",
            title: "Webcam Driver Management Guide",
            date: "Updated Apr 2024",
            metadata: "IT Support Knowledge Base",
            confidence: 73,
            excerpt: "For optimal performance in video conferencing applications, webcam drivers should be updated at least quarterly or whenever experiencing persistent issues."
          },
          {
            type: "community",
            title: "Microsoft Tech Community: Teams Camera Fixes",
            date: "Thread from Mar 2024",
            metadata: "Technical Discussion",
            confidence: 80,
            excerpt: "A complete reinstallation of the webcam drivers followed by a Teams cache reset has resolved camera issues for approximately 85% of affected users."
          },
          {
            type: "knowledge-base",
            title: "Common Webcam Driver Issues",
            date: "Updated Feb 2024",
            metadata: "Technical Database",
            confidence: 68,
            excerpt: "Driver conflicts between manufacturer webcam software and Teams can cause camera access issues during calls."
          },
          {
            type: "community",
            title: "Logitech Webcam Teams Compatibility",
            date: "Thread from Jan 2024",
            metadata: "User Reports",
            confidence: 71,
            excerpt: "Logitech webcam users report higher success rates when using Microsoft's basic drivers rather than Logitech's software for Teams calls."
          },
          {
            type: "official",
            title: "Windows Camera Driver Architecture",
            date: "Updated Mar 2024",
            metadata: "Microsoft Documentation",
            confidence: 82,
            excerpt: "Windows camera driver architecture changes in recent updates require application-specific permissions that can affect Teams access."
          }
        ]
      }
    }
  },
  {
    query: "Troubleshoot slow application loading",
    interpretation: {
      steps: [
        {
          description: "Detected <strong>Dell XPS 13</strong> from your system configuration",
          entities: [
            { text: "Dell XPS 13", type: "DEVICE" }
          ]
        },
        {
          description: "Identified <strong>slow application loading</strong> as the performance issue",
          entities: [
            { text: "slow application loading", type: "PERFORMANCE_ISSUE" }
          ]
        },
        {
          description: "Detected your system with <strong>Windows 11</strong> and <strong>8GB RAM</strong>",
          entities: [
            { text: "Windows 11", type: "OS" },
            { text: "8GB RAM", type: "SPECIFICATION" }
          ]
        },
        {
          description: "Found multiple optimization opportunities in <strong>storage</strong>, <strong>memory</strong>, and <strong>startup items</strong>",
          entities: [
            { text: "storage", type: "COMPONENT" },
            { text: "memory", type: "COMPONENT" },
            { text: "startup items", type: "SETTING" }
          ]
        }
      ]
    },
    resolutionPaths: {
      "diskOptimization": {
        name: "Disk Optimization",
        icon: "💽",
        steps: [
          {
            id: "disk-step1",
            title: "Storage Performance Troubleshooting",
            description: "Let's investigate how your storage might be affecting application loading times.",
            options: [
              { id: "disk-opt1", text: "Check disk performance metrics", nextStepId: "disk-step2" },
              { id: "disk-opt2", text: "Perform disk cleanup", nextStepId: "disk-step3" },
              {
