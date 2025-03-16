
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-soft-gray border-t border-border py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-deep-blue rounded-md flex items-center justify-center">
                <span className="text-white font-semibold text-sm">DR</span>
              </div>
              <span className="font-semibold text-lg text-foreground">DeepResolution</span>
            </div>
            <p className="mt-4 text-medium-gray text-sm leading-relaxed">
              Context-aware, transparent AI that guides users more effectively through resolution paths.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-medium-gray hover:text-deep-blue transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="#" className="text-medium-gray hover:text-deep-blue transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-medium-gray hover:text-deep-blue transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-medium-gray hover:text-deep-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-medium-gray hover:text-deep-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#query" className="text-sm text-medium-gray hover:text-deep-blue transition-colors">
                  Try It Now
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-medium-gray hover:text-deep-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-medium-gray hover:text-deep-blue transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-medium-gray hover:text-deep-blue transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-medium-gray text-center">
            &copy; {currentYear} DeepResolution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
