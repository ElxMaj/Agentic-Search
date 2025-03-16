
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryInput from '../components/QueryInput';
import ResolutionPath from '../components/ResolutionPath';
import { mockQueries, suggestedQueries } from '../data/mockData';

const Index: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResolutionPath, setShowResolutionPath] = useState(false);
  const [currentStepId, setCurrentStepId] = useState("");
  const [resolutionSteps, setResolutionSteps] = useState<any[]>([]);
  const [activePathKey, setActivePathKey] = useState("");
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    
    // Simulate API call with the mock data
    setTimeout(() => {
      // Find matching query or use the first one as default
      const matchedQuery = mockQueries.find(q => 
        searchQuery.toLowerCase().includes(q.query.toLowerCase())
      ) || mockQueries[0];
      
      // Get the first resolution path key
      const firstPathKey = Object.keys(matchedQuery.resolutionPaths)[0];
      setActivePathKey(firstPathKey);
      
      // Set the steps from the first path if it exists
      if (firstPathKey && matchedQuery.resolutionPaths[firstPathKey]) {
        const firstPath = matchedQuery.resolutionPaths[firstPathKey];
        if (firstPath.steps && firstPath.steps.length > 0) {
          setResolutionSteps(firstPath.steps);
          setCurrentStepId(firstPath.steps[0].id);
        }
      }
      
      setIsLoading(false);
      setShowResolutionPath(true);
    }, 1500);
  };
  
  const handleSelectOption = (optionId: string, nextStepId?: string) => {
    if (nextStepId) {
      setCurrentStepId(nextStepId);
    }
  };

  // Provide a random suggested query when component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * suggestedQueries.length);
    const placeholderQuery = suggestedQueries[randomIndex];
    // We're just updating the placeholder, not actually setting a query
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center py-10 px-6">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-8 text-deep-blue">
            Ask anything
          </h1>
          
          <section className="w-full flex flex-col items-center">
            <QueryInput 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              suggestedQueries={suggestedQueries}
            />
            
            {showResolutionPath && resolutionSteps.length > 0 && (
              <ResolutionPath
                query={query}
                steps={resolutionSteps}
                currentStepId={currentStepId}
                onSelectOption={handleSelectOption}
                isVisible={showResolutionPath}
              />
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
