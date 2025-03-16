
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

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-deep-blue rounded-md flex items-center justify-center">
            <span className="text-white font-semibold text-sm">DR</span>
          </div>
          <span className="font-semibold text-lg text-foreground">DeepResolution</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-deep-blue focus-ring ${
                location.pathname === link.path ? 'text-deep-blue' : 'text-medium-gray'
              }`}
            >
              {link.title}
            </Link>
          ))}
          <a 
            href="#query" 
            className="px-4 py-2 bg-deep-blue text-white rounded-md text-sm font-medium transition-all hover:bg-deep-blue/90 focus-ring"
          >
            Try It Now
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus-ring text-medium-gray hover:text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-x-0 top-[72px] bg-white shadow-medium p-6 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-2 text-sm font-medium transition-colors hover:text-deep-blue ${
                location.pathname === link.path ? 'text-deep-blue' : 'text-medium-gray'
              }`}
              onClick={closeMobileMenu}
            >
              {link.title}
            </Link>
          ))}
          <a 
            href="#query" 
            className="block w-full py-2 mt-4 bg-deep-blue text-white rounded-md text-center text-sm font-medium transition-all hover:bg-deep-blue/90"
            onClick={closeMobileMenu}
          >
            Try It Now
          </a>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
