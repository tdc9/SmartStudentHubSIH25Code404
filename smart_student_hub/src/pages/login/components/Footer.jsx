import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e?.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
  };

  const productLinks = [
    { name: 'Student Portal', href: '#' },
    { name: 'Institution Admin', href: '#' },
    { name: 'Government Officer', href: '#' },
    { name: 'Features', href: '#' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Team', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'System Status', href: '#' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR Compliance', href: '#' }
  ];

  const teamMembers = [
    'Jayesh Gaur',
    'Adarsh Upadhyay', 
    'Nisha',
    'Aditi',
    'Shipra Bharti',
    'Aditya Pratap Singh'
  ];

  return (
    <footer className="bg-black/80 backdrop-blur-xl border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="GraduationCap" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gradient">Smart Student Hub</h3>
                <p className="text-xs text-gray-400 -mt-1">Educational Excellence Platform</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Streamlining educational administration through innovative technology. 
              Connecting students, institutions, and government bodies for a better future.
            </p>
            
            {/* Team Code 404 Section */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-primary mb-3">Team Code 404</h4>
              <p className="text-xs text-gray-400 mb-2">Developed by</p>
              <div className="space-y-1">
                {teamMembers?.map((member, index) => (
                  <p key={index} className="text-sm text-gray-300">{member}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {productLinks?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link?.href} 
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link?.href} 
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link?.href} 
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 mb-6">
              {legalLinks?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link?.href} 
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Section */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-xs text-gray-400 mb-4">
                Get the latest updates on new features and educational insights.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors duration-300 text-sm font-medium"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            © 2025 Smart Student Hub. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Icon name="Shield" size={16} />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;