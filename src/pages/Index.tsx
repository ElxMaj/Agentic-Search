
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryInput from '../components/QueryInput';
import ThinkingAnimation from '../components/ThinkingAnimation';
import QueryInterpretation from '../components/QueryInterpretation';
import ResolutionOptions from '../components/ResolutionOptions';
import ResolutionPath from '../components/ResolutionPath';
import FollowUpPrompt from '../components/FollowUpPrompt';
import { mockQueries, getMockResponse } from '../data/mockData';

interface ConversationTurn {
  query: string;
  response: any;
  selectedPath?: string;
}

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);

  // Handle the initial query
  const handleSearch = async (query: string) => {
    // Reset UI state
    setSearchParams(query ? { q: query } : {});
    setIsLoading(true);
    setResult(null);
    setSelectedPath(null);
    
    // Simulate API call
    setTimeout(() => {
      if (!query.trim()) {
        setIsLoading(false);
        return;
      }
      
      const response = getMockResponse(query);
      setResult(response);
      setIsLoading(false);
      
      // Add this turn to the conversation history
      setConversationHistory([{
        query,
        response,
        selectedPath: null
      }]);
    }, 2000);
  };

  // Handle follow-up questions
  const handleFollowUp = async (followUpQuery: string) => {
    setIsLoading(true);
    
    // Simulate API call with context from previous turns
    setTimeout(() => {
      if (!followUpQuery.trim()) {
        setIsLoading(false);
        return;
      }
      
      // Simulate getting response with context
      const previousQuery = conversationHistory[conversationHistory.length - 1].query;
      const context = `Previous question: ${previousQuery}. Follow-up: ${followUpQuery}`;
      const response = getMockResponse(followUpQuery);
      
      // Add this turn to conversation history
      setConversationHistory([
        ...conversationHistory,
        {
          query: followUpQuery,
          response,
          selectedPath: null
        }
      ]);
      
      // Update UI
      setResult(response);
      setSelectedPath(null);
      setIsLoading(false);
      
      // Update URL to reflect the latest query
      setSearchParams({ q: followUpQuery });
      
      // Scroll to the top of the results
      window.scrollTo({
        top: document.getElementById('query')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 2000);
  };
  
  // Handle resolution path selection
  const handlePathSelect = (pathName: string) => {
    setSelectedPath(pathName);
    
    // Update the current conversation turn with the selected path
    if (conversationHistory.length > 0) {
      const updatedHistory = [...conversationHistory];
      updatedHistory[updatedHistory.length - 1].selectedPath = pathName;
      setConversationHistory(updatedHistory);
    }
  };
  
  // Process the initial query param on load
  useEffect(() => {
    if (queryParam && !result && !isLoading) {
      handleSearch(queryParam);
    }
  }, [queryParam]);

  // Generate dynamic follow-up suggestions based on the current query
  const getFollowUpSuggestions = (): string[] => {
    const baseFollowUps = [
      "What else should I check?",
      "How do I fix this if that didn't work?", 
      "Is there a deeper issue?"
    ];
    
    // If we have a specific context, we could customize these
    const currentQuery = conversationHistory.length > 0 ? 
      conversationHistory[conversationHistory.length - 1].query.toLowerCase() : '';
    
    if (currentQuery.includes('graphics') || currentQuery.includes('performance')) {
      return [
        "What drivers do I need?",
        "Can I optimize without upgrading hardware?",
        "What's causing the performance issues?"
      ];
    } else if (currentQuery.includes('webcam') || currentQuery.includes('camera')) {
      return [
        "What if I can't find my webcam in Device Manager?",
        "Why does my camera work in one app but not another?",
        "How do I update my webcam drivers?"
      ];
    } else if (currentQuery.includes('slow') || currentQuery.includes('speed')) {
      return [
        "What hardware upgrades would help most?",
        "Could this be a virus or malware?",
        "How do I check what's slowing down my computer?"
      ];
    }
    
    return baseFollowUps;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-10">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-black"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Dell Technical Support & Resolution Center
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Let our AI help you solve technical issues with detailed, step-by-step solutions.
            </motion.p>
          </div>
          
          {/* Search Input */}
          <QueryInput 
            onSearch={handleSearch} 
            isLoading={isLoading}
            suggestedQueries={mockQueries}
          />
          
          {/* Thinking Animation (while loading) */}
          {isLoading && <ThinkingAnimation query={queryParam || ""} />}
          
          {/* Results Section */}
          {result && !isLoading && (
            <div className="mt-12">
              {/* Query Interpretation */}
              <QueryInterpretation 
                steps={result.queryInterpretation.steps} 
                isVisible={true}
              />
              
              {/* Resolution Options */}
              <ResolutionOptions 
                paths={result.resolutionPaths} 
                onSelect={handlePathSelect}
                selectedPath={selectedPath}
                isVisible={true}
              />
              
              {/* Selected Resolution Path */}
              <ResolutionPath
                path={selectedPath 
                  ? result.resolutionPaths.find((p: any) => p.name === selectedPath) 
                  : result.resolutionPaths[0]}
                isVisible={true}
              />
              
              {/* Follow-up Prompt */}
              <FollowUpPrompt 
                onFollowUpSubmit={handleFollowUp}
                suggestedFollowUps={getFollowUpSuggestions()}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
