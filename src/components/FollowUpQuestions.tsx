
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, PanelRightClose, Menu } from 'lucide-react';

interface FollowUpQuestionsProps {
  currentQuery: string;
  onSubmitFollowUp: (question: string) => void;
}

const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = ({ 
  currentQuery, 
  onSubmitFollowUp 
}) => {
  const [followUpInput, setFollowUpInput] = useState('');
  const [showPredefined, setShowPredefined] = useState(true);

  // Generate predefined follow-up questions based on the current query
  const getPredefinedQuestions = () => {
    if (currentQuery.toLowerCase().includes('webcam') || currentQuery.toLowerCase().includes('camera')) {
      return [
        "How can I ensure Teams has the necessary permissions to access my camera",
        "What steps should I take if restarting Teams doesn't fix the camera issue",
        "Could outdated drivers be causing my camera problems in Teams",
        "How do I check if other apps are conflicting with Teams' camera access",
        "What should I do if my external webcam isn't recognized by Teams"
      ];
    } else if (currentQuery.toLowerCase().includes('graphic') || currentQuery.toLowerCase().includes('dell')) {
      return [
        "What are the best graphics drivers for Dell XPS",
        "How often should I update my graphics drivers",
        "Will upgrading RAM improve my graphics performance",
        "What graphics settings should I adjust for gaming",
        "How do I check if my graphics card is working properly"
      ];
    } else if (currentQuery.toLowerCase().includes('slow') || currentQuery.toLowerCase().includes('computer')) {
      return [
        "What background services can I disable to speed up my computer",
        "How do I check what's using my CPU resources",
        "Should I upgrade my SSD or RAM first for better performance",
        "How do I optimize Windows startup for better performance",
        "What software can clean up temporary files slowing down my PC"
      ];
    }
    
    // Default questions
    return [
      "How can I optimize my system performance",
      "What are the recommended driver update settings",
      "Should I consider hardware or software solutions",
      "How often should I run system diagnostics",
      "What are the best maintenance practices for my device"
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpInput.trim()) {
      onSubmitFollowUp(followUpInput);
      setFollowUpInput('');
    }
  };

  const handlePredefinedClick = (question: string) => {
    onSubmitFollowUp(question);
  };

  const predefinedQuestions = getPredefinedQuestions();

  return (
    <motion.div 
      className="mt-8 w-full bg-black text-white rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 text-lg font-medium mb-4">
          <Menu size={18} />
          <span>People also ask</span>
        </div>
        
        {showPredefined && (
          <div className="space-y-4">
            {predefinedQuestions.slice(0, 5).map((question, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-3 px-1 border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors"
                onClick={() => handlePredefinedClick(question)}
              >
                <span className="text-white">{question}</span>
                <Plus size={20} className="text-blue-400" />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 flex items-center gap-2">
        <Search size={20} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={followUpInput}
          onChange={(e) => setFollowUpInput(e.target.value)}
          placeholder="Ask follow-up"
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none py-2"
        />
      </form>
    </motion.div>
  );
};

export default FollowUpQuestions;
