
// Mock data for Coveo DeepResolution prototype

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

// Mock data for specific scenarios
export const mockQueries: MockQueryData[] = [
  {
    query: "Improve Dell graphics performance",
    interpretation: {
      steps: [
        {
          description: "I identified <strong>Dell</strong> as your device manufacturer and <strong>graphics performance</strong> as your goal.",
          entities: [
            { text: "Dell", type: "MANUFACTURER" },
            { text: "graphics performance", type: "GOAL" }
          ]
        },
        {
          description: "I'm focusing on solutions for improving graphics performance on Dell computers.",
          entities: [
            { text: "solutions", type: "INTENT" },
            { text: "Dell computers", type: "DEVICE" }
          ]
        }
      ]
    },
    resolutionPaths: {
      "software": {
        name: "Software Optimization",
        icon: "💻",
        steps: [
          {
            id: "sw-step1",
            title: "Graphics Driver Update",
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
            excerpt: "The NVIDIA Driver 535.98 is recommended for all Dell XPS systems with dedicated graphics for optimal performance."
          },
          {
            type: "knowledge-base",
            title: "Dell Support: Optimizing Graphics Performance",
            date: "Updated Dec 2022",
            metadata: "Knowledge Base",
            confidence: 95,
            excerpt: "Regular driver updates can resolve many common performance issues and improve compatibility with the latest games and applications."
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
            excerpt: "Most Dell XPS and Alienware systems support graphics card upgrades, while Dell Inspiron desktops may have power supply limitations."
          },
          {
            type: "community",
            title: "Dell Community Forums: Graphics Upgrades",
            date: "Thread from Jan 2023",
            metadata: "Community Resources",
            confidence: 85,
            excerpt: "Users report successful graphics upgrades in Dell XPS 8950 systems with cards up to NVIDIA RTX 3070 without power supply upgrades."
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
            confidence: 94,
            excerpt: "Dell systems with high-performance graphics cards may require additional cooling to prevent thermal throttling during intensive tasks."
          },
          {
            type: "community",
            title: "Dell Community: Performance Optimization Guide",
            date: "Thread from Nov 2022",
            metadata: "Community Guide",
            confidence: 88,
            excerpt: "Many users report 15-20% performance improvements after addressing thermal issues and updating power management settings."
          }
        ]
      }
    }
  },
  {
    query: "Logitech webcam setup",
    interpretation: {
      steps: [
        {
          description: "I identified <strong>Logitech</strong> as the device brand and <strong>webcam</strong> as the device type.",
          entities: [
            { text: "Logitech", type: "BRAND" },
            { text: "webcam", type: "DEVICE_TYPE" }
          ]
        },
        {
          description: "I'm focusing on setup procedures for Logitech webcam devices.",
          entities: [
            { text: "setup", type: "INTENT" },
            { text: "Logitech webcam", type: "DEVICE" }
          ]
        }
      ]
    },
    resolutionPaths: {
      "setup": {
        name: "Initial Setup",
        icon: "🔌",
        steps: [
          {
            id: "setup-step1",
            title: "Logitech Webcam Setup",
            description: "Let's get your Logitech webcam up and running.",
            options: [
              { id: "setup-opt1", text: "I need to set up a new webcam", nextStepId: "setup-step2" },
              { id: "setup-opt2", text: "My webcam was working but stopped", nextStepId: "setup-step3" },
              { id: "setup-opt3", text: "I want to optimize webcam settings", nextStepId: "setup-step4" }
            ]
          },
          {
            id: "setup-step2",
            title: "New Webcam Setup",
            description: "Let's set up your new Logitech webcam for the first time.",
            options: [
              { id: "setup-opt4", text: "USB webcam setup", nextStepId: "setup-step5" },
              { id: "setup-opt5", text: "Wireless webcam setup", nextStepId: "setup-step6" }
            ]
          },
          {
            id: "setup-step3",
            title: "Troubleshooting Non-Working Webcam",
            description: "Let's troubleshoot why your previously working Logitech webcam stopped functioning.",
            options: [
              { id: "setup-opt6", text: "Check connection issues", nextStepId: "setup-step7" },
              { id: "setup-opt7", text: "Check software/driver issues", nextStepId: "setup-step8" },
              { id: "setup-opt8", text: "Check privacy settings", nextStepId: "setup-step9" }
            ]
          },
          {
            id: "setup-step4",
            title: "Optimizing Webcam Settings",
            description: "Let's optimize your Logitech webcam settings for the best experience.",
            options: [
              { id: "setup-opt9", text: "Video quality optimization", nextStepId: "setup-step10" },
              { id: "setup-opt10", text: "Audio settings optimization", nextStepId: "setup-step11" },
              { id: "setup-opt11", text: "Advanced features configuration", nextStepId: "setup-step12" }
            ]
          },
          {
            id: "setup-step5",
            title: "USB Webcam First-Time Setup",
            description: "Here's how to set up your USB Logitech webcam for the first time:",
            options: []
          },
          {
            id: "setup-step6",
            title: "Wireless Webcam Setup",
            description: "Here's how to set up your wireless Logitech webcam:",
            options: []
          },
          {
            id: "setup-step7",
            title: "Connection Troubleshooting",
            description: "Here's how to resolve connection issues with your Logitech webcam:",
            options: []
          },
          {
            id: "setup-step8",
            title: "Software & Driver Troubleshooting",
            description: "Here's how to resolve software and driver issues with your Logitech webcam:",
            options: []
          },
          {
            id: "setup-step9",
            title: "Privacy Settings Check",
            description: "Here's how to check if privacy settings are blocking your Logitech webcam:",
            options: []
          },
          {
            id: "setup-step10",
            title: "Video Quality Optimization",
            description: "Here's how to optimize the video quality settings of your Logitech webcam:",
            options: []
          },
          {
            id: "setup-step11",
            title: "Audio Settings Optimization",
            description: "Here's how to optimize the audio settings of your Logitech webcam:",
            options: []
          },
          {
            id: "setup-step12",
            title: "Advanced Features Configuration",
            description: "Here's how to configure advanced features of your Logitech webcam:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Logitech Support: Webcam Setup Guide",
            date: "Updated Jan 2023",
            metadata: "Official Documentation",
            confidence: 98,
            excerpt: "For optimal performance, install Logitech G HUB software after connecting your webcam to access advanced settings and features."
          },
          {
            type: "knowledge-base",
            title: "Logitech Webcam Troubleshooting FAQ",
            date: "Updated Mar 2023",
            metadata: "Support Knowledge Base",
            confidence: 95,
            excerpt: "If your webcam isn't detected, first try connecting it to a different USB port, preferably a USB 3.0 port directly on your computer rather than through a hub."
          }
        ]
      },
      "comparison": {
        name: "Product Comparison",
        icon: "🔍",
        steps: [
          {
            id: "compare-step1",
            title: "Logitech Webcam Comparison",
            description: "Let's compare different Logitech webcam models to find the right one for your needs.",
            options: [
              { id: "compare-opt1", text: "Compare by price range", nextStepId: "compare-step2" },
              { id: "compare-opt2", text: "Compare by key features", nextStepId: "compare-step3" },
              { id: "compare-opt3", text: "Compare by use case", nextStepId: "compare-step4" }
            ]
          },
          {
            id: "compare-step2",
            title: "Price Range Comparison",
            description: "Let's compare Logitech webcams by different price tiers.",
            options: [
              { id: "compare-opt4", text: "Budget options (Under $50)", nextStepId: "compare-step5" },
              { id: "compare-opt5", text: "Mid-range options ($50-$100)", nextStepId: "compare-step6" },
              { id: "compare-opt6", text: "Premium options ($100+)", nextStepId: "compare-step7" }
            ]
          },
          {
            id: "compare-step3",
            title: "Feature Comparison",
            description: "Let's compare Logitech webcams by key features that matter to you.",
            options: [
              { id: "compare-opt7", text: "Resolution & frame rate", nextStepId: "compare-step8" },
              { id: "compare-opt8", text: "Microphone quality", nextStepId: "compare-step9" },
              { id: "compare-opt9", text: "Advanced features (auto-focus, lighting)", nextStepId: "compare-step10" }
            ]
          },
          {
            id: "compare-step4",
            title: "Use Case Comparison",
            description: "Let's compare Logitech webcams based on different use cases.",
            options: [
              { id: "compare-opt10", text: "Video conferencing & remote work", nextStepId: "compare-step11" },
              { id: "compare-opt11", text: "Content creation & streaming", nextStepId: "compare-step12" },
              { id: "compare-opt12", text: "Security & monitoring", nextStepId: "compare-step13" }
            ]
          },
          {
            id: "compare-step5",
            title: "Budget Webcam Options",
            description: "Here are the best budget Logitech webcam options under $50:",
            options: []
          },
          {
            id: "compare-step6",
            title: "Mid-Range Webcam Options",
            description: "Here are the best mid-range Logitech webcam options between $50-$100:",
            options: []
          },
          {
            id: "compare-step7",
            title: "Premium Webcam Options",
            description: "Here are the best premium Logitech webcam options over $100:",
            options: []
          },
          {
            id: "compare-step8",
            title: "Resolution & Frame Rate Comparison",
            description: "Here's how Logitech webcams compare in terms of resolution and frame rate:",
            options: []
          },
          {
            id: "compare-step9",
            title: "Microphone Quality Comparison",
            description: "Here's how Logitech webcams compare in terms of microphone quality:",
            options: []
          },
          {
            id: "compare-step10",
            title: "Advanced Features Comparison",
            description: "Here's how Logitech webcams compare in terms of advanced features:",
            options: []
          },
          {
            id: "compare-step11",
            title: "Best Webcams for Video Conferencing",
            description: "Here are the best Logitech webcams for video conferencing and remote work:",
            options: []
          },
          {
            id: "compare-step12",
            title: "Best Webcams for Content Creation",
            description: "Here are the best Logitech webcams for content creation and streaming:",
            options: []
          },
          {
            id: "compare-step13",
            title: "Best Webcams for Security",
            description: "Here are the best Logitech webcams for security and monitoring:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Logitech Product Comparison Guide",
            date: "Updated Feb 2023",
            metadata: "Official Documentation",
            confidence: 97,
            excerpt: "The Logitech C920s offers the best balance of price and performance for most users, with 1080p/30fps video, dual microphones, and a privacy shutter."
          },
          {
            type: "community",
            title: "r/Logitech: Webcam Recommendations 2023",
            date: "Thread from Jan 2023",
            metadata: "Community Recommendations",
            confidence: 85,
            excerpt: "For streamers, the Logitech StreamCam consistently gets recommended for its 1080p/60fps capability and USB-C connection."
          }
        ]
      },
      "troubleshooting": {
        name: "Troubleshooting",
        icon: "🔧",
        steps: [
          {
            id: "trouble-step1",
            title: "Logitech Webcam Troubleshooting",
            description: "Let's resolve common issues with your Logitech webcam.",
            options: [
              { id: "trouble-opt1", text: "Webcam not detected", nextStepId: "trouble-step2" },
              { id: "trouble-opt2", text: "Poor video quality", nextStepId: "trouble-step3" },
              { id: "trouble-opt3", text: "Audio issues", nextStepId: "trouble-step4" },
              { id: "trouble-opt4", text: "Software/driver problems", nextStepId: "trouble-step5" }
            ]
          },
          {
            id: "trouble-step2",
            title: "Webcam Not Detected",
            description: "Let's troubleshoot why your computer isn't detecting your Logitech webcam.",
            options: [
              { id: "trouble-opt5", text: "Check hardware connections", nextStepId: "trouble-step6" },
              { id: "trouble-opt6", text: "Check device manager", nextStepId: "trouble-step7" },
              { id: "trouble-opt7", text: "Check privacy settings", nextStepId: "trouble-step8" }
            ]
          },
          {
            id: "trouble-step3",
            title: "Poor Video Quality",
            description: "Let's troubleshoot poor video quality issues with your Logitech webcam.",
            options: [
              { id: "trouble-opt8", text: "Lighting issues", nextStepId: "trouble-step9" },
              { id: "trouble-opt9", text: "Resolution settings", nextStepId: "trouble-step10" },
              { id: "trouble-opt10", text: "Bandwidth/performance issues", nextStepId: "trouble-step11" }
            ]
          },
          {
            id: "trouble-step4",
            title: "Audio Issues",
            description: "Let's troubleshoot audio problems with your Logitech webcam.",
            options: [
              { id: "trouble-opt11", text: "Microphone not detected", nextStepId: "trouble-step12" },
              { id: "trouble-opt12", text: "Poor audio quality", nextStepId: "trouble-step13" },
              { id: "trouble-opt13", text: "Background noise issues", nextStepId: "trouble-step14" }
            ]
          },
          {
            id: "trouble-step5",
            title: "Software & Driver Issues",
            description: "Let's resolve software and driver problems with your Logitech webcam.",
            options: [
              { id: "trouble-opt14", text: "Update drivers", nextStepId: "trouble-step15" },
              { id: "trouble-opt15", text: "Reinstall Logitech software", nextStepId: "trouble-step16" },
              { id: "trouble-opt16", text: "Software conflicts", nextStepId: "trouble-step17" }
            ]
          },
          {
            id: "trouble-step6",
            title: "Hardware Connection Troubleshooting",
            description: "Here's how to check and resolve hardware connection issues with your Logitech webcam:",
            options: []
          },
          {
            id: "trouble-step7",
            title: "Device Manager Troubleshooting",
            description: "Here's how to use Device Manager to resolve detection issues with your Logitech webcam:",
            options: []
          },
          {
            id: "trouble-step8",
            title: "Privacy Settings Troubleshooting",
            description: "Here's how to check and adjust privacy settings that might be blocking your Logitech webcam:",
            options: []
          },
          {
            id: "trouble-step9",
            title: "Lighting Optimization",
            description: "Here's how to improve lighting for better video quality with your Logitech webcam:",
            options: []
          },
          {
            id: "trouble-step10",
            title: "Resolution Settings Optimization",
            description: "Here's how to adjust resolution settings for better video quality with your Logitech webcam:",
            options: []
          },
          {
            id: "trouble-step11",
            title: "Bandwidth & Performance Optimization",
            description: "Here's how to address bandwidth and performance issues affecting your Logitech webcam quality:",
            options: []
          },
          {
            id: "trouble-step12",
            title: "Microphone Detection Troubleshooting",
            description: "Here's how to resolve issues with your Logitech webcam's microphone not being detected:",
            options: []
          },
          {
            id: "trouble-step13",
            title: "Audio Quality Optimization",
            description: "Here's how to improve the audio quality of your Logitech webcam:",
            options: []
          },
          {
            id: "trouble-step14",
            title: "Background Noise Reduction",
            description: "Here's how to reduce background noise when using your Logitech webcam's microphone:",
            options: []
          },
          {
            id: "trouble-step15",
            title: "Driver Update Guide",
            description: "Here's how to update the drivers for your Logitech webcam:",
            options: []
          },
          {
            id: "trouble-step16",
            title: "Software Reinstallation",
            description: "Here's how to properly reinstall Logitech webcam software:",
            options: []
          },
          {
            id: "trouble-step17",
            title: "Software Conflict Resolution",
            description: "Here's how to identify and resolve software conflicts affecting your Logitech webcam:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Logitech Support: Webcam Troubleshooting Guide",
            date: "Updated Apr 2023",
            metadata: "Official Documentation",
            confidence: 96,
            excerpt: "If your webcam isn't working in specific applications, check the application's settings to ensure it has permission to access your camera."
          },
          {
            type: "community",
            title: "Logitech Community Forums: Common Webcam Fixes",
            date: "Thread from Feb 2023",
            metadata: "Community Solutions",
            confidence: 89,
            excerpt: "Many users resolved detection issues by uninstalling all webcam drivers, disconnecting the device, restarting, and then reconnecting."
          }
        ]
      }
    }
  }
];

// Additional suggested queries for the search box
export const suggestedQueries = [
  "How to improve Dell graphics performance?",
  "Set up Logitech webcam for video conferencing",
  "Troubleshoot slow application loading",
  "Compare Logitech webcam models",
  "Optimize CPU usage on my Dell",
  "Fix webcam not detected in Zoom"
];
