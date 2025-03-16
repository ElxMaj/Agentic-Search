import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-[#0076CE] text-white py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <span className="text-lg font-bold">DELL</span>
              <span className="text-lg font-medium ml-1 text-white/80">DeepResolution</span>
            </div>
            <p className="text-sm text-white/80">
              © {currentYear} Dell Inc. All rights reserved.
            </p>
          </div>
          
          
        </div>
      </div>
    </footer>;
};
export default Footer;