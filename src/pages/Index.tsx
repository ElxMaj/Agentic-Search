
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryInput from '../components/QueryInput';
import QueryInterpretation from '../components/QueryInterpretation';
import ResolutionOptions, { ResolutionPathOption } from '../components/ResolutionOptions';
import AIGeneratedAnswer from '../components/AIGeneratedAnswer';
import { mockQueries, suggestedQueries, Source, MockQueryData } from '../data/mockData';

const Index: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQueryInterpretation, setShowQueryInterpretation] = useState(false);
  const [showResolutionOptions, setShowResolutionOptions] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQueryData, setCurrentQueryData] = useState<MockQueryData | null>(null);
  const [selectedPathKey, setSelectedPathKey] = useState<string>("");
  const [resolutionOptions, setResolutionOptions] = useState<ResolutionPathOption[]>([]);
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setShowQueryInterpretation(false);
    setShowResolutionOptions(false);
    setShowAnswer(false);
    
    // Simulate API call with the mock data
    setTimeout(() => {
      // Find matching query or use the first one as default
      const matchedQuery = mockQueries.find(q => 
        searchQuery.toLowerCase().includes(q.query.toLowerCase())
      ) || mockQueries[0];
      
      setCurrentQueryData(matchedQuery);
      
      // Show query interpretation
      setTimeout(() => {
        setShowQueryInterpretation(true);
        
        // After showing the interpretation, show the resolution options
        setTimeout(() => {
          // Process resolution paths into options
          const options: ResolutionPathOption[] = Object.entries(matchedQuery.resolutionPaths)
            .map(([key, path]) => {
              // Find a matching confidence and source count from the mock data
              let pathDetail = "";
              let confidence = 0;
              let sourceCount = 0;
              
              if (key === "software") {
                confidence = 92;
                sourceCount = 245;
                pathDetail = "Current drivers detected as outdated by 3 months";
              } else if (key === "hardware") {
                confidence = 88;
                sourceCount = 189;
                pathDetail = "External GPU options and new models available";
              } else if (key === "diagnostics") {
                confidence = 85;
                sourceCount = 156;
                pathDetail = "Settings optimization for your most-used apps";
              } else if (key === "setup") {
                confidence = 94;
                sourceCount = 212;
                pathDetail = "Step-by-step setup instructions for common scenarios";
              } else if (key === "comparison") {
                confidence = 91;
                sourceCount = 178;
                pathDetail = "Compare models based on your specific needs";
              } else if (key === "troubleshooting") {
                confidence = 89;
                sourceCount = 201;
                pathDetail = "Solutions for common issues with detailed steps";
              }
              
              return {
                key,
                name: path.name,
                icon: path.icon,
                description: key === "software" ? "Free software and driver updates" : 
                             key === "hardware" ? "Recommended upgrades for better performance" : 
                             "App-specific performance tips",
                confidence,
                sources: sourceCount,
                detail: pathDetail
              };
            });
          
          setResolutionOptions(options);
          setShowResolutionOptions(true);
          setIsLoading(false);
        }, 500);
      }, 1000);
    }, 1500);
  };
  
  const handleSelectPath = (pathKey: string) => {
    setSelectedPathKey(pathKey);
    
    // Show the answer for the selected path
    setTimeout(() => {
      setShowAnswer(true);
    }, 300);
  };

  // Generate artificial answer based on the selected path
  const getAnswerContent = () => {
    if (!currentQueryData || !selectedPathKey) return "";
    
    const path = currentQueryData.resolutionPaths[selectedPathKey];
    if (!path) return "";
    
    if (selectedPathKey === "software") {
      return "I've analyzed your Dell XPS 13's current configuration and found multiple ways to improve graphics performance: 1. Update NVIDIA Graphics Driver (Currently 3 months old) 2. Optimize Windows power settings for performance 3. Enable hardware acceleration in your most-used apps 4. Update Intel Dynamic Tuning Would you like me to guide you through these optimizations?";
    } else if (selectedPathKey === "hardware") {
      return "Based on your current XPS 13 configuration, here are your upgrade options: • External GPU Solution: Thunderbolt eGPU enclosure with RTX 4060 (+80% performance) • New XPS Model: XPS 15 with RTX 4070 (+120% performance) • RAM Upgrade: Increase to 32GB for better multitasking Your current integrated graphics can handle basic tasks, but these upgrades would significantly improve performance for gaming and creative work.";
    } else if (selectedPathKey === "diagnostics") {
      return "I've analyzed your most-used applications and found these optimization opportunities: • Chrome: Disable hardware acceleration in video calls • Adobe Apps: Enable GPU acceleration in Performance settings • Windows Settings: Set Graphics preference to High performance These changes could improve your graphics performance by up to 25% with your current hardware.";
    } else {
      return path.steps && path.steps.length > 0 ? path.steps[0].description : "";
    }
  };
  
  // Get sources for the selected path
  const getSelectedPathSources = (): Source[] => {
    if (!currentQueryData || !selectedPathKey) return [];
    
    const path = currentQueryData.resolutionPaths[selectedPathKey];
    return path?.sources || [];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex flex-col items-center py-10 px-6 pt-24">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-8 text-[#0076CE]">
            Ask anything
          </h1>
          
          <section className="w-full flex flex-col items-center">
            <QueryInput 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              suggestedQueries={suggestedQueries}
            />
            
            {currentQueryData && showQueryInterpretation && (
              <div className="w-full max-w-3xl mx-auto mt-8">
                <QueryInterpretation 
                  steps={currentQueryData.interpretation.steps} 
                  isVisible={showQueryInterpretation} 
                />
                
                {showResolutionOptions && (
                  <ResolutionOptions 
                    options={resolutionOptions}
                    onSelectPath={handleSelectPath}
                    selectedPath={selectedPathKey}
                    isVisible={showResolutionOptions}
                  />
                )}
                
                {showAnswer && selectedPathKey && (
                  <AIGeneratedAnswer 
                    content={getAnswerContent()}
                    sources={getSelectedPathSources()}
                    isVisible={showAnswer}
                  />
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
