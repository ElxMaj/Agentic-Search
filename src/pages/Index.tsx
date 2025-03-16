
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryInput from '../components/QueryInput';
import ResolutionPath from '../components/ResolutionPath';

// Mock data for resolution paths
const mockResolutionPaths = {
  "performance": [
    {
      id: "step1",
      title: "Initial Assessment",
      description: "Let's identify what aspect of performance you'd like to improve.",
      options: [
        { id: "opt1", text: "Application loading speed", nextStepId: "step2" },
        { id: "opt2", text: "Query response time", nextStepId: "step3" },
        { id: "opt3", text: "Resource utilization", nextStepId: "step4" }
      ]
    },
    {
      id: "step2",
      title: "Application Loading Analysis",
      description: "Let's examine what's slowing down your application loading.",
      options: [
        { id: "opt4", text: "Reduce initial JavaScript payload", nextStepId: "step5" },
        { id: "opt5", text: "Optimize image loading", nextStepId: "step6" },
        { id: "opt6", text: "Implement code splitting", nextStepId: "step7" }
      ]
    },
    {
      id: "step3",
      title: "Query Performance Investigation",
      description: "Let's identify what's causing slow query responses.",
      options: [
        { id: "opt7", text: "Database indexing issues", nextStepId: "step8" },
        { id: "opt8", text: "Query complexity", nextStepId: "step9" },
        { id: "opt9", text: "Connection pooling", nextStepId: "step10" }
      ]
    },
    {
      id: "step4",
      title: "Resource Utilization Check",
      description: "Let's analyze how your resources are being used.",
      options: [
        { id: "opt10", text: "CPU usage optimization", nextStepId: "step11" },
        { id: "opt11", text: "Memory leaks", nextStepId: "step12" },
        { id: "opt12", text: "Network bandwidth", nextStepId: "step13" }
      ]
    },
    {
      id: "step5",
      title: "JavaScript Optimization",
      description: "Based on your selection, here are recommended solutions for reducing your JavaScript payload:",
      options: []
    },
    {
      id: "step6",
      title: "Image Loading Strategies",
      description: "Based on your selection, here are recommended strategies for optimizing image loading:",
      options: []
    },
    {
      id: "step7",
      title: "Code Splitting Implementation",
      description: "Here's a guide to implementing effective code splitting in your application:",
      options: []
    },
    {
      id: "step8",
      title: "Database Index Optimization",
      description: "Here are recommended approaches for optimizing your database indexes:",
      options: []
    },
    {
      id: "step9",
      title: "Query Simplification",
      description: "Here are techniques to simplify complex queries:",
      options: []
    },
    {
      id: "step10",
      title: "Connection Pool Configuration",
      description: "Here are best practices for configuring your connection pool:",
      options: []
    },
    {
      id: "step11",
      title: "CPU Usage Optimization",
      description: "Here are methods to optimize CPU usage in your application:",
      options: []
    },
    {
      id: "step12",
      title: "Memory Leak Detection",
      description: "Here's how to identify and fix memory leaks:",
      options: []
    },
    {
      id: "step13",
      title: "Network Bandwidth Optimization",
      description: "Here are strategies to optimize network bandwidth usage:",
      options: []
    }
  ]
};

const Index: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResolutionPath, setShowResolutionPath] = useState(false);
  const [currentStepId, setCurrentStepId] = useState("step1");
  const [resolutionSteps, setResolutionSteps] = useState(mockResolutionPaths.performance);
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStepId("step1");
      setShowResolutionPath(true);
    }, 1500);
  };
  
  const handleSelectOption = (optionId: string, nextStepId?: string) => {
    if (nextStepId) {
      setCurrentStepId(nextStepId);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="max-w-6xl mx-auto mt-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-deep-blue">Deep</span>Resolution
            </h1>
            <p className="text-xl text-medium-gray max-w-3xl mx-auto">
              AI-powered support that guides you through complex issues with context-aware, transparent resolution paths.
            </p>
          </div>
          
          <section className="mt-10">
            <QueryInput onSearch={handleSearch} isLoading={isLoading} />
            
            <ResolutionPath
              query={query}
              steps={resolutionSteps}
              currentStepId={currentStepId}
              onSelectOption={handleSelectOption}
              isVisible={showResolutionPath}
            />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
