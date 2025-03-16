
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedTransition from '../components/AnimatedTransition';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Users, Workflow } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedTransition variant="fadeIn" className="text-center">
              <div className="chip mb-4">About Us</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl text-medium-gray max-w-3xl mx-auto mb-12">
                We're revolutionizing support systems through context-aware AI that puts users first, making complex issues simple to resolve.
              </p>
            </AnimatedTransition>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="chip mb-2">Our Story</div>
                <h2 className="text-3xl font-bold mb-4">Why We Built DeepResolution</h2>
                <p className="text-medium-gray mb-4">
                  DeepResolution was born out of the frustration with traditional support systems that often lead users through confusing, impersonal troubleshooting paths.
                </p>
                <p className="text-medium-gray mb-4">
                  We envisioned an AI system that truly understands context, remembers your journey, and guides you through the most efficient resolution path—just like a human expert would.
                </p>
                <p className="text-medium-gray">
                  Our team of AI specialists and UX researchers have crafted a support system that adapts to your needs, learns from interactions, and delivers transparent, effective solutions.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-light-blue overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/5 to-deep-blue/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-deep-blue rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-3xl">DR</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 px-6 bg-soft-gray">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="chip mb-2">Our Values</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
              <p className="text-medium-gray max-w-2xl mx-auto">
                These core principles guide how we develop our technology and serve our users.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Users className="text-deep-blue" size={24} />,
                  title: "User-Centered Design",
                  description: "We put users first in every design decision, ensuring our technology adapts to human needs, not the other way around."
                },
                {
                  icon: <CheckCircle2 className="text-deep-blue" size={24} />,
                  title: "Transparency",
                  description: "We believe AI should be transparent about its reasoning, so users understand and trust the resolution process."
                },
                {
                  icon: <Workflow className="text-deep-blue" size={24} />,
                  title: "Contextual Intelligence",
                  description: "Our systems understand not just what users ask, but why they're asking and what they've tried before."
                },
                {
                  icon: <FileText className="text-deep-blue" size={24} />,
                  title: "Continuous Learning",
                  description: "We're committed to constantly improving our AI through real user interactions and feedback."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6"
                >
                  <div className="w-12 h-12 rounded-md bg-light-blue flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-medium-gray">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-panel p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Experience DeepResolution?</h2>
              <p className="text-medium-gray max-w-2xl mx-auto mb-8">
                Try our AI-powered support system today and see how context-aware assistance can transform your experience.
              </p>
              <a 
                href="/#query" 
                className="inline-flex px-6 py-3 bg-deep-blue text-white rounded-md font-medium transition-all hover:bg-deep-blue/90 focus-ring"
              >
                Try It Now
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
