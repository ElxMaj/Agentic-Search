
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedTransition from '../components/AnimatedTransition';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const Restart: React.FC = () => {
  const handleRestart = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimatedTransition variant="fadeIn" className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Restart Application</h1>
              <p className="text-xl text-medium-gray max-w-3xl mx-auto mb-12">
                Click the button below to restart the application and start a fresh session.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="inline-flex items-center px-6 py-3 bg-deep-blue text-white rounded-md font-medium transition-all hover:bg-deep-blue/90 focus-ring"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Restart Application
              </motion.button>
            </AnimatedTransition>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Restart;
