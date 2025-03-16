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

// Mock data for specific scenarios
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
          description: "Identified <strong>graphics performance</strong> concerns",
          entities: [
            { text: "graphics performance", type: "ISSUE" }
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
  },
  {
    query: "Troubleshoot slow application loading",
    interpretation: {
      steps: [
        {
          description: "Identified <strong>slow application loading</strong> as the performance issue",
          entities: [
            { text: "slow application loading", type: "PERFORMANCE_ISSUE" }
          ]
        },
        {
          description: "Detected your <strong>Dell XPS</strong> system with <strong>Windows 11</strong> and <strong>8GB RAM</strong>",
          entities: [
            { text: "Dell XPS", type: "DEVICE" },
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
              { id: "disk-opt3", text: "Optimize drive settings", nextStepId: "disk-step4" }
            ]
          },
          {
            id: "disk-step2",
            title: "Disk Performance Analysis",
            description: "Let's analyze your disk performance to identify potential bottlenecks.",
            options: [
              { id: "disk-opt4", text: "Check read/write speeds", nextStepId: "disk-step5" },
              { id: "disk-opt5", text: "Check disk fragmentation", nextStepId: "disk-step6" },
              { id: "disk-opt6", text: "Analyze disk health", nextStepId: "disk-step7" }
            ]
          },
          {
            id: "disk-step3",
            title: "Disk Cleanup",
            description: "Let's free up disk space to potentially improve performance.",
            options: [
              { id: "disk-opt7", text: "Clean temporary files", nextStepId: "disk-step8" },
              { id: "disk-opt8", text: "Remove unnecessary applications", nextStepId: "disk-step9" },
              { id: "disk-opt9", text: "Clear application caches", nextStepId: "disk-step10" }
            ]
          },
          {
            id: "disk-step4",
            title: "Drive Optimization",
            description: "Let's optimize your drive settings for better performance.",
            options: [
              { id: "disk-opt10", text: "Enable TRIM (for SSDs)", nextStepId: "disk-step11" },
              { id: "disk-opt11", text: "Adjust virtual memory", nextStepId: "disk-step12" },
              { id: "disk-opt12", text: "Consider drive upgrade options", nextStepId: "disk-step13" }
            ]
          },
          {
            id: "disk-step5",
            title: "Disk Speed Analysis",
            description: "Here's how to check your disk read/write speeds:",
            options: []
          },
          {
            id: "disk-step6",
            title: "Disk Fragmentation Analysis",
            description: "Here's how to check and fix disk fragmentation:",
            options: []
          },
          {
            id: "disk-step7",
            title: "Disk Health Analysis",
            description: "Here's how to check your disk's health status:",
            options: []
          },
          {
            id: "disk-step8",
            title: "Temporary Files Cleanup",
            description: "Here's how to clean temporary files to free up disk space:",
            options: []
          },
          {
            id: "disk-step9",
            title: "Application Cleanup",
            description: "Here's how to identify and remove unnecessary applications:",
            options: []
          },
          {
            id: "disk-step10",
            title: "Cache Cleanup",
            description: "Here's how to clear application caches to improve performance:",
            options: []
          },
          {
            id: "disk-step11",
            title: "TRIM Optimization",
            description: "Here's how to ensure TRIM is enabled for your SSD:",
            options: []
          },
          {
            id: "disk-step12",
            title: "Virtual Memory Optimization",
            description: "Here's how to optimize your virtual memory settings:",
            options: []
          },
          {
            id: "disk-step13",
            title: "Storage Upgrade Options",
            description: "Here are recommended storage upgrade options for your Dell system:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Dell Storage Optimization Guide",
            date: "Updated Jan 2024",
            metadata: "Official Documentation",
            confidence: 96,
            excerpt: "SSD firmware updates and TRIM optimization can significantly improve application loading times on Dell XPS systems."
          },
          {
            type: "knowledge-base",
            title: "Windows 11 Storage Performance",
            date: "Updated Dec 2023",
            metadata: "Knowledge Base",
            confidence: 92,
            excerpt: "Windows 11 storage optimization features can reduce application loading times by up to 30% compared to default settings."
          },
          {
            type: "community",
            title: "Dell User Community: SSD Upgrades",
            date: "Thread from Mar 2024",
            metadata: "Community Discussion",
            confidence: 89,
            excerpt: "Users report 40-60% faster application loading times after upgrading from SATA to NVMe SSDs in Dell XPS systems."
          }
        ]
      },
      "startupOptimization": {
        name: "Startup Optimization",
        icon: "🚀",
        steps: [
          {
            id: "startup-step1",
            title: "Startup Optimization",
            description: "Let's optimize your system's startup configuration to improve application loading times.",
            options: [
              { id: "startup-opt1", text: "Manage startup applications", nextStepId: "startup-step2" },
              { id: "startup-opt2", text: "Optimize background services", nextStepId: "startup-step3" },
              { id: "startup-opt3", text: "Check for application conflicts", nextStepId: "startup-step4" }
            ]
          },
          {
            id: "startup-step2",
            title: "Startup Applications Management",
            description: "Let's review and optimize applications that start with your system.",
            options: [
              { id: "startup-opt4", text: "Use Task Manager to disable items", nextStepId: "startup-step5" },
              { id: "startup-opt5", text: "Use third-party startup managers", nextStepId: "startup-step6" }
            ]
          },
          {
            id: "startup-step3",
            title: "Background Services Optimization",
            description: "Let's optimize Windows services that may be impacting performance.",
            options: [
              { id: "startup-opt6", text: "Use Services Manager", nextStepId: "startup-step7" },
              { id: "startup-opt7", text: "Optimize Windows services", nextStepId: "startup-step8" }
            ]
          },
          {
            id: "startup-step4",
            title: "Application Conflict Analysis",
            description: "Let's check for applications that might be conflicting or impacting performance.",
            options: [
              { id: "startup-opt8", text: "Check for known conflicts", nextStepId: "startup-step9" },
              { id: "startup-opt9", text: "Use diagnostic tools", nextStepId: "startup-step10" }
            ]
          },
          {
            id: "startup-step5",
            title: "Task Manager Startup Management",
            description: "Here's how to use Task Manager to disable unnecessary startup items:",
            options: []
          },
          {
            id: "startup-step6",
            title: "Third-Party Startup Managers",
            description: "Here are recommended third-party tools for managing startup applications:",
            options: []
          },
          {
            id: "startup-step7",
            title: "Services Manager Optimization",
            description: "Here's how to optimize Windows services using Services Manager:",
            options: []
          },
          {
            id: "startup-step8",
            title: "Windows Services Optimization",
            description: "Here are recommended Windows services to disable or set to manual start:",
            options: []
          },
          {
            id: "startup-step9",
            title: "Known Application Conflicts",
            description: "Here's information about known application conflicts that might affect performance:",
            options: []
          },
          {
            id: "startup-step10",
            title: "Diagnostic Tools",
            description: "Here are tools to help diagnose application conflicts and performance issues:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Dell Performance Optimization Guide",
            date: "Updated Feb 2024",
            metadata: "Official Documentation",
            confidence: 95,
            excerpt: "Reducing startup items can significantly improve overall system responsiveness and application loading times."
          },
          {
            type: "knowledge-base",
            title: "Windows 11 Startup Optimization",
            date: "Updated Jan 2024",
            metadata: "Knowledge Base",
            confidence: 93,
            excerpt: "Windows 11 includes improved startup management tools that can help identify and disable unnecessary startup applications."
          },
          {
            type: "community",
            title: "Dell User Forum: Startup Optimization",
            date: "Thread from Dec 2023",
            metadata: "Community Discussion",
            confidence: 87,
            excerpt: "Users report up to 50% faster login and application startup times after disabling unnecessary startup items and services."
          }
        ]
      },
      "memoryManagement": {
        name: "Memory Optimization",
        icon: "🧠",
        steps: [
          {
            id: "memory-step1",
            title: "Memory Performance Optimization",
            description: "Let's optimize your system's memory usage to improve application loading times.",
            options: [
              { id: "memory-opt1", text: "Analyze current memory usage", nextStepId: "memory-step2" },
              { id: "memory-opt2", text: "Close unnecessary applications", nextStepId: "memory-step3" },
              { id: "memory-opt3", text: "Consider hardware upgrades", nextStepId: "memory-step4" }
            ]
          },
          {
            id: "memory-step2",
            title: "Memory Usage Analysis",
            description: "Let's analyze how your system is currently using memory to identify optimization opportunities.",
            options: [
              { id: "memory-opt4", text: "Use Resource Monitor", nextStepId: "memory-step5" },
              { id: "memory-opt5", text: "Check for memory leaks", nextStepId: "memory-step6" }
            ]
          },
          {
            id: "memory-step3",
            title: "Application Memory Management",
            description: "Let's identify and manage memory-intensive applications that might be impacting performance.",
            options: [
              { id: "memory-opt6", text: "Identify high-memory applications", nextStepId: "memory-step7" },
              { id: "memory-opt7", text: "Optimize application settings", nextStepId: "memory-step8" }
            ]
          },
          {
            id: "memory-step4",
            title: "Memory Upgrade Options",
            description: "Let's explore hardware upgrade options to improve memory performance.",
            options: [
              { id: "memory-opt8", text: "Check upgrade compatibility", nextStepId: "memory-step9" },
              { id: "memory-opt9", text: "Compare memory options", nextStepId: "memory-step10" }
            ]
          },
          {
            id: "memory-step5",
            title: "Resource Monitor Analysis",
            description: "Here's how to use Resource Monitor to analyze memory usage:",
            options: []
          },
          {
            id: "memory-step6",
            title: "Memory Leak Detection",
            description: "Here's how to identify and address potential memory leaks:",
            options: []
          },
          {
            id: "memory-step7",
            title: "High-Memory Application Management",
            description: "Here's how to identify and manage memory-intensive applications:",
            options: []
          },
          {
            id: "memory-step8",
            title: "Application Memory Optimization",
            description: "Here's how to optimize memory usage in common applications:",
            options: []
          },
          {
            id: "memory-step9",
            title: "Memory Upgrade Compatibility",
            description: "Here's how to check memory upgrade compatibility for your Dell system:",
            options: []
          },
          {
            id: "memory-step10",
            title: "Memory Upgrade Options",
            description: "Here are recommended memory upgrade options for your Dell system:",
            options: []
          }
        ],
        sources: [
          {
            type: "official",
            title: "Dell Memory Upgrade Guide",
            date: "Updated Mar 2024",
            metadata: "Official Documentation",
            confidence: 97,
            excerpt: "Upgrading from 8GB to 16GB RAM can improve application loading times by 25-40% for memory-intensive applications on Dell XPS systems."
          },
          {
            type: "knowledge-base",
            title: "Windows 11 Memory Management",
            date: "Updated Feb 2024",
            metadata: "Knowledge Base",
            confidence: 94,
            excerpt: "Windows 11's improved memory management algorithms can more efficiently allocate resources for frequently used applications."
          },
          {
            type: "official",
            title: "Dell Performance Analysis Report",
            date: "Updated Real-time data",
            metadata: "System Analysis",
            confidence: 92,
            excerpt: "Your system is currently using 85% of available memory during typical workloads, suggesting a memory upgrade would be beneficial."
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
