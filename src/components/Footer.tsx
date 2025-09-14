
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
  ];

  return (
    <footer className="border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/assets/lightbulb-logo.svg" 
                alt="ThinkForge Logo" 
                className="w-8 h-8 object-contain" 
              />
              <span className="text-xl font-bold text-white">ThinkForge</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering students with AI-generated project ideas for skill development, hackathons, and resume building.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl glass hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex justify-end">
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/auth" className="text-gray-300 hover:text-white transition-colors">
                    Get Started
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">
            © 2025 ThinkForge. All rights reserved.
          </p>
          <p className="text-gray-300 mt-4 md:mt-0">
            Designed & Developed by <a href="https://www.linkedin.com/in/ksparth128/" target="_blank" rel="noopener noreferrer" className="text-gradient hover:underline">Parth Sharma</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
