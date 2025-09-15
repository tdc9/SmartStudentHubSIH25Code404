import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const trustIndicators = [
    {
      icon: 'Shield',
      text: 'Government Certified'
    },
    {
      icon: 'Lock',
      text: 'SSL Secured'
    },
    {
      icon: 'CheckCircle',
      text: 'Ministry Verified'
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="w-full mt-16 py-8 border-t border-border/50"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
          {trustIndicators?.map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
              className="flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <Icon name={indicator?.icon} size={16} className="text-primary" />
              <span>{indicator?.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Copyright and Links */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://www.education.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://www.education.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms & Conditions
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://www.education.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              Accessibility
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            <a
              href="https://www.education.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              <p>
                © {currentYear} Smart Student Hub – Government Portal | Built by Team CODE 404
              </p>
            </a>
            <p className="mt-1">
              Government of India | Ministry of Education
            </p>
          </div>

          {/* Security Notice */}
          <div className="glassmorphic rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground text-left">
                <p className="font-medium text-foreground mb-1">Security Notice:</p>
                <p>
                  This is a secure government portal. All activities are monitored and logged. 
                  Unauthorized access attempts are prohibited and will be reported to appropriate authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;