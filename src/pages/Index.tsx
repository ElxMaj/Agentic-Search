
import React, { useState, useEffect } from 'react';
import { mockQueries, suggestedQueries, FollowUpAnswer } from '@/data/mockData';
import Header from '@/components/Header';
import QueryInput from '@/components/QueryInput';
import QueryInterpretation from '@/components/QueryInterpretation';
import ResolutionPath from '@/components/ResolutionPath';
import RelatedContent from '@/components/RelatedContent';
import Footer from '@/components/Footer';
import ThinkingAnimation from '@/components/ThinkingAnimation';
import FollowUpChip from '@/components/FollowUpChip';
import FollowUpAnswerComponent from '@/components/FollowUpAnswer';
import { motion } from 'framer-motion';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activePath, setActivePath] = useState('');
  
  // New state for follow-up questions
  const [activeFollowUp, setActiveFollowUp] = useState<string | null>(null);
  
  // Find the active query from mockQueries
  const activeQuery = mockQueries.find(q => 
    q.query.toLowerCase() === searchQuery.toLowerCase() || 
    q.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Extract follow-up answers if available
  const followUpAnswers = activeQuery?.followUpAnswers || [];
  
  // Find the active follow-up answer
  const activeFollowUpAnswer = activeFollowUp 
    ? followUpAnswers.find(f => f.id === activeFollowUp) 
    : null;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setShowResults(false);
    setActiveFollowUp(null); // Reset active follow-up when searching
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      
      // Find matching query
      const matchingQuery = mockQueries.find(q => 
        q.query.toLowerCase() === query.toLowerCase() || 
        q.query.toLowerCase().includes(query.toLowerCase())
      );
      
      if (matchingQuery) {
        setShowResults(true);
        
        // Set initial active path
        const paths = Object.keys(matchingQuery.resolutionPaths);
        if (paths.length > 0) {
          setActivePath(paths[0]);
        }
      }
    }, 2000);
  };

  const handleFollowUpClick = (followUpId: string) => {
    // Toggle follow-up selection
    setActiveFollowUp(activeFollowUp === followUpId ? null : followUpId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <QueryInput 
            onSearch={handleSearch} 
            suggestedQueries={suggestedQueries} 
          />
          
          {isSearching && !showResults && (
            <div className="mt-8">
              <ThinkingAnimation />
            </div>
          )}
          
          {showResults && activeQuery && (
            <div className="mt-8">
              <QueryInterpretation steps={activeQuery.interpretation.steps} />
              
              {activeQuery.followUpAnswers && activeQuery.followUpAnswers.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Follow-up questions</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeQuery.followUpAnswers.map((followUp, index) => (
                      <FollowUpChip
                        key={followUp.id}
                        text={followUp.question}
                        onClick={() => handleFollowUpClick(followUp.id)}
                        delay={index * 0.1}
                        isActive={activeFollowUp === followUp.id}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {activeFollowUpAnswer ? (
                <FollowUpAnswerComponent
                  content={activeFollowUpAnswer.answer}
                  sources={activeFollowUpAnswer.sources}
                />
              ) : (
                <ResolutionPath
                  activePath={activePath}
                  onPathChange={setActivePath}
                  data={activeQuery.resolutionPaths}
                />
              )}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <RelatedContent />
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
