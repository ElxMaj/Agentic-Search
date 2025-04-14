import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [{
    title: 'Home',
    path: '/'
  }];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${isScrolled ? 'bg-[#333357]/90 backdrop-blur-sm shadow-soft' : 'bg-[#333357]'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/c3380cd5-7a26-4828-a4cc-c25f5a55bfef.png" 
              alt="Coveo Logo" 
              className="h-8 object-contain aspect-square"
            />
            <span className="text-xl font-medium ml-1 text-white/90">DeepResolution</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === link.path ? 'text-white' : 'text-white/90'}`}
              >
                {link.title}
              </Link>
            ))}
          </nav>
          
          <button className="block md:hidden focus:outline-none" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -20 }} 
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-[#333357] shadow-medium py-4 px-6"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === link.path ? 'text-white' : 'text-white/90'}`} 
                onClick={closeMobileMenu}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
