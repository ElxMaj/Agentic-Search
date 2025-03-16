
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QueryInput from '../components/QueryInput';
import ResolutionPath from '../components/ResolutionPath';
import AnimatedTransition from '../components/AnimatedTransition';
import { ArrowDown, CheckCircle, Code, MoveRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedTransition variant="fadeIn" className="text-center">
              <div className="chip mb-4">Context-Aware Support</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-deep-blue">Deep</span>Resolution
              </h1>
              <p className="text-xl text-medium-gray max-w-3xl mx-auto mb-8">
                AI-powered support that guides users through complex issues with context-aware, transparent resolution paths.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a 
                  href="#query" 
                  className="w-full sm:w-auto px-6 py-3 bg-deep-blue text-white rounded-md font-medium transition-all hover:bg-deep-blue/90 focus-ring flex items-center justify-center"
                >
                  Try It Now
                  <ArrowDown size={16} className="ml-2" />
                </a>
                <a 
                  href="#features" 
                  className="w-full sm:w-auto px-6 py-3 border border-border rounded-md font-medium transition-all hover:bg-light-blue hover:border-deep-blue/20 focus-ring"
                >
                  Learn More
                </a>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition variant="scale" delay={0.2}>
              <div className="relative">
                <div className="p-1 rounded-xl bg-gradient-to-r from-deep-blue/10 to-deep-blue/5 shadow-medium">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <img 
                      src="/lovable-uploads/f2d620fb-7afc-49d0-bd60-9285a5150925.png" 
                      alt="DeepResolution Interface" 
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                <div className="absolute -bottom-4 md:-bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white px-4 py-2 rounded-full shadow-soft flex items-center space-x-2 text-sm font-medium text-deep-blue">
                    <span className="animate-pulse-subtle">
                      <CheckCircle size={14} className="inline-block mr-1" />
                      Context-Aware
                    </span>
                    <span className="w-1 h-1 rounded-full bg-deep-blue/30"></span>
                    <span>Transparent AI</span>
                  </div>
                </div>
              </div>
            </AnimatedTransition>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 bg-soft-gray" id="features">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="chip mb-2">Core Capabilities</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DeepResolution</h2>
              <p className="text-medium-gray max-w-2xl mx-auto">
                Our platform offers unparalleled support experiences through intelligent, context-aware AI that guides users efficiently.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="text-deep-blue" size={24} />,
                  title: "Context-Aware Guidance",
                  description: "Our AI understands the full context of your issue and provides personalized resolution paths."
                },
                {
                  icon: <Code className="text-deep-blue" size={24} />,
                  title: "Interactive Resolution",
                  description: "Engage with our system to navigate through different options and find the optimal solution."
                },
                {
                  icon: <MoveRight className="text-deep-blue" size={24} />,
                  title: "Transparent Process",
                  description: "See every step of the resolution path, with clear explanations and reasoning at each stage."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6"
                >
                  <div className="w-12 h-12 rounded-md bg-light-blue flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-medium-gray">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Query Section */}
        <section className="py-20 px-6" id="query-section">
          <QueryInput onSearch={handleSearch} isLoading={isLoading} />
          
          <ResolutionPath
            query={query}
            steps={resolutionSteps}
            currentStepId={currentStepId}
            onSelectOption={handleSelectOption}
            isVisible={showResolutionPath}
          />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
