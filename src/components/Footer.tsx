
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-[#333357] text-white py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <span className="text-lg font-medium text-white/80">AI Search Agent</span>
            </div>
            <p className="text-sm text-white/80">
              © {currentYear} Coveo Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
