import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import FollowUpChip from './FollowUpChip';
import { Source } from '../data/mockData';
import SourcesList from './SourcesList';

interface FollowUpPromptProps {
  onSelectFollowUp: (text: string) => void;
  parentQuery: string;
}

const FollowUpPrompt: React.FC<FollowUpPromptProps> = ({ onSelectFollowUp, parentQuery }) => {
  const [selectedFollowUp, setSelectedFollowUp] = useState<string | null>(null);
  const [showSources, setShowSources] = useState(false);
  
  const getFollowUpQuestions = (): string[] => {
    if (parentQuery.toLowerCase().includes("dell") && parentQuery.toLowerCase().includes("graphics")) {
      return [
        "How do I update Intel Iris Xe Graphics drivers?",
        "What are the best external GPU options for Dell XPS?",
        "Will upgrading RAM improve graphics performance?",
        "How can I optimize my power settings for better graphics?",
        "What games can Intel Iris Xe Graphics run well?"
      ];
    } else if (parentQuery.toLowerCase().includes("webcam") && parentQuery.toLowerCase().includes("teams")) {
      return [
        "How do I check my webcam in Device Manager?",
        "Why does my webcam work in other apps but not Teams?",
        "How do I update my Logitech webcam drivers?",
        "How can I grant Teams permission to use my webcam?",
        "Why is my webcam image grainy in Teams calls?"
      ];
    } else if (parentQuery.toLowerCase().includes("slow") && parentQuery.toLowerCase().includes("application")) {
      return [
        "How can I identify resource-heavy applications?",
        "What startup items should I disable for better performance?",
        "Is my SSD running optimally?",
        "Will adding more RAM help with application loading?",
        "How do I check for malware slowing down my system?"
      ];
    } else {
      return [
        "How can I optimize my Dell system performance?",
        "What are common issues with Dell laptops?",
        "Tell me about Dell warranty services",
        "How do I update all my Dell drivers automatically?",
        "What Dell diagnostics tools are available?"
      ];
    }
  };

  const getMockSources = (): Source[] => {
    if (selectedFollowUp?.toLowerCase().includes("drivers")) {
      return [
        {
          type: "official" as const,
          title: "Dell Driver Support Center",
          date: "Updated Monthly",
          metadata: "Official Documentation",
          confidence: 97,
          excerpt: "Regular driver updates are critical for maintaining optimal performance and compatibility with the latest software."
        },
        {
          type: "community" as const,
          title: "Dell Community Forums: Driver Update Guide",
          date: "Thread from Apr 2024",
          metadata: "User Discussion",
          confidence: 84,
          excerpt: "Many users report significant performance improvements after updating graphics drivers using Dell Update utility."
        }
      ];
    } else if (selectedFollowUp?.toLowerCase().includes("gpu") || selectedFollowUp?.toLowerCase().includes("graphics")) {
      return [
        {
          type: "official" as const,
          title: "Dell External Graphics Solutions Guide",
          date: "Updated Mar 2024",
          metadata: "Official Documentation",
          confidence: 95,
          excerpt: "Thunderbolt-enabled Dell systems can support external GPUs with minimal configuration for significantly improved graphics performance."
        },
        {
          type: "knowledge-base" as const,
          title: "External GPU Compatibility Matrix",
          date: "Updated Feb 2024",
          metadata: "Technical Guide",
          confidence: 92,
          excerpt: "Dell XPS laptops with Thunderbolt 3 or 4 ports support most eGPU enclosures, with NVIDIA RTX series GPUs providing the best balance of performance and compatibility."
        }
      ];
    } else if (selectedFollowUp?.toLowerCase().includes("webcam") || selectedFollowUp?.toLowerCase().includes("camera")) {
      return [
        {
          type: "official" as const,
          title: "Microsoft Teams Camera Troubleshooting",
          date: "Updated Jan 2024",
          metadata: "Official Guide",
          confidence: 98,
          excerpt: "Camera permissions must be explicitly granted to Teams in both Windows settings and within the application itself."
        },
        {
          type: "community" as const,
          title: "Common Webcam Issues in Video Conferencing",
          date: "Updated Mar 2024",
          metadata: "User Forum",
          confidence: 87,
          excerpt: "Approximately 65% of Teams webcam issues are resolved by completely restarting the application after disconnecting and reconnecting the camera."
        }
      ];
    } else if (selectedFollowUp?.toLowerCase().includes("ram") || selectedFollowUp?.toLowerCase().includes("memory")) {
      return [
        {
          type: "official" as const,
          title: "Dell Memory Upgrade Guide",
          date: "Updated Dec 2023",
          metadata: "Official Documentation",
          confidence: 96,
          excerpt: "Upgrading RAM improves multitasking capabilities and can significantly reduce application loading times by allowing more data to remain in memory."
        },
        {
          type: "knowledge-base" as const,
          title: "Memory Impact on Graphics Performance",
          date: "Updated Feb 2024",
          metadata: "Technical Analysis",
          confidence: 88,
          excerpt: "Systems with integrated graphics like Intel Iris Xe benefit substantially from additional RAM, as graphics and system memory are shared."
        }
      ];
    } else {
      return [
        {
          type: "official" as const,
          title: "Dell Support Documentation",
          date: "Updated Apr 2024",
          metadata: "Official Resources",
          confidence: 94,
          excerpt: "Dell provides comprehensive support resources for all system optimization and troubleshooting needs through the Support Assist application."
        },
        {
          type: "community" as const,
          title: "Dell User Community",
          date: "Active Community",
          metadata: "User Forums",
          confidence: 82,
          excerpt: "The Dell community forums contain solutions for over 95% of common Dell system issues, often with multiple resolution approaches."
        }
      ];
    }
  };

  const followUpQuestions = getFollowUpQuestions();
  
  const handleSelectFollowUp = (question: string) => {
    setSelectedFollowUp(question);
    setShowSources(true);
    onSelectFollowUp(question);
  };

  useEffect(() => {
    setSelectedFollowUp(null);
    setShowSources(false);
  }, [parentQuery]);

  return (
    <div className="mt-6">
      {!selectedFollowUp ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <Sparkles size={16} className="mr-2 text-blue-500" />
            Follow-up questions you might have
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {followUpQuestions.map((question, index) => (
              <FollowUpChip
                key={index}
                text={question}
                onClick={() => handleSelectFollowUp(question)}
                delay={0.2 + (index * 0.1)}
                disabled={false}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center mb-4">
            <button 
              onClick={() => {
                setSelectedFollowUp(null);
                setShowSources(false);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              <ChevronRight size={16} className="mr-1 transform rotate-180" />
              Back to follow-up questions
            </button>
          </div>
          
          <h3 className="text-lg font-medium text-gray-800">{selectedFollowUp}</h3>
          
          <div className="prose prose-blue max-w-none">
            <p>
              This is where the answer to the follow-up question would appear. The actual implementation would retrieve real data based on the user's follow-up question and context from their original query.
            </p>
            <p>
              For this prototype, we're showing sample content that would relate to "{selectedFollowUp}" as a follow-up to your original query about "{parentQuery}".
            </p>
          </div>
          
          <SourcesList sources={getMockSources()} isVisible={showSources} />
        </motion.div>
      )}
    </div>
  );
};

export default FollowUpPrompt;
