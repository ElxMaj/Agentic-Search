
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QueryInput from '../components/QueryInput';
import QueryInterpretation from '../components/QueryInterpretation';
import ResolutionPath from '../components/ResolutionPath';
import ThinkingAnimation from '../components/ThinkingAnimation';
import AIGeneratedAnswer from '../components/AIGeneratedAnswer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FollowUpPrompt from '../components/FollowUpPrompt';
import RelatedContent from '../components/RelatedContent';
import { mockQueries, suggestedQueries, followUpAnswers } from '../data/mockData';
import AnimatedTransition from '../components/AnimatedTransition';
import FollowUpAnswer from '../components/FollowUpAnswer';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') || '';
  const [isSearching, setIsSearching] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [activePath, setActivePath] = useState('software');
  const [selectedFollowUp, setSelectedFollowUp] = useState<string | null>(null);

  // Find the current query data from mock data
  const currentQueryData = currentQuery 
    ? mockQueries.find(q => 
        q.query.toLowerCase().includes(currentQuery.toLowerCase()) || 
        currentQuery.toLowerCase().includes(q.query.toLowerCase())
      ) 
    : null;

  // Get follow-up answer if one is selected
  const followUpAnswer = selectedFollowUp 
    ? followUpAnswers.find(a => a.question === selectedFollowUp)
    : null;
    
  const handleSearch = (query: string) => {
    setSearchParams({ q: query });
    setIsSearching(true);
    setIsAnswering(false);
    setSelectedFollowUp(null);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setIsAnswering(true);
      
      // Simulate answer generation delay
      setTimeout(() => {
        setIsAnswering(false);
      }, 1000);
    }, 1500);
  };
  
  const handleFollowUpClick = (question: string) => {
    setSelectedFollowUp(question);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset state when query changes
  useEffect(() => {
    if (currentQuery) {
      setIsSearching(true);
      setIsAnswering(false);
      setSelectedFollowUp(null);
      
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
        setIsAnswering(true);
        
        // Simulate answer generation delay
        setTimeout(() => {
          setIsAnswering(false);
        }, 1000);
      }, 1500);
    }
  }, [currentQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 max-w-5xl">
        <QueryInput 
          onSearch={handleSearch} 
          defaultValue={currentQuery} 
          suggestedQueries={suggestedQueries}
        />
        
        {selectedFollowUp && followUpAnswer ? (
          <FollowUpAnswer 
            answer={followUpAnswer} 
            isVisible={true} 
          />
        ) : (
          <>
            {isSearching && <ThinkingAnimation text="Searching..." />}
            
            {isAnswering && <ThinkingAnimation text="Generating answer..." />}
            
            {!isSearching && !isAnswering && currentQueryData && (
              <>
                <QueryInterpretation 
                  steps={currentQueryData.interpretation.steps} 
                  isVisible={true} 
                />
                
                <ResolutionPath 
                  paths={Object.entries(currentQueryData.resolutionPaths).map(([key, path]) => ({
                    id: key,
                    name: path.name,
                    icon: path.icon
                  }))}
                  activePath={activePath}
                  onPathChange={setActivePath}
                  isVisible={true}
                />
                
                <AIGeneratedAnswer 
                  content={`Here are steps to improve your Dell graphics performance:

1. Update your graphics drivers to the latest version
2. Optimize power settings for performance
3. Adjust application-specific settings
4. Consider external graphics options if available`}
                  sources={currentQueryData.resolutionPaths[activePath]?.sources || []}
                  isVisible={true}
                />
              </>
            )}
          </>
        )}
        
        {!isSearching && !isAnswering && currentQueryData && (
          <>
            <FollowUpPrompt 
              onFollowUpClick={handleFollowUpClick}
              followUps={[
                "How can I check if my drivers are up to date?",
                "What is the best graphics card for my Dell?",
                "Will updating drivers void my warranty?"
              ]}
              isVisible={true}
              selectedFollowUp={selectedFollowUp}
            />
            
            <RelatedContent isVisible={true} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
