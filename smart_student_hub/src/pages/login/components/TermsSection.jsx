import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TermsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const termsContent = [
    {
      title: "Academic Integrity Policy",
      content: `All students must maintain the highest standards of academic honesty and integrity. Plagiarism, cheating, and unauthorized collaboration are strictly prohibited and may result in disciplinary action including suspension or expulsion from the institution.`
    },
    {
      title: "Data Privacy & Security",
      content: `Your personal information and academic records are protected under our comprehensive privacy policy. We use industry-standard encryption and security measures to safeguard your data. Access to your information is restricted to authorized personnel only.`
    },
    {
      title: "Portal Usage Guidelines",
      content: `This portal is intended for legitimate academic purposes only. Users are responsible for maintaining the confidentiality of their login credentials. Sharing accounts or attempting to access unauthorized areas is prohibited.`
    },
    {
      title: "Technical Support",
      content: `Technical support is available during business hours. For urgent issues outside business hours, please use the emergency contact information provided. System maintenance may occasionally require temporary service interruptions.`
    },
    {
      title: "Development Team",
      content: `This platform has been developed by Team Code 404, comprising dedicated developers: Jayesh Gaur, Adarsh Upadhyay, Nisha, Aditi, Shipra Bharti, and Aditya Pratap Singh. The team is committed to providing exceptional educational technology solutions.`
    },
    {
      title: "Compliance Requirements",
      content: `By using this portal, you agree to comply with all institutional policies, local laws, and regulations. Regular updates to terms and conditions will be communicated through official channels.`
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glassmorphism-card w-full max-w-4xl mx-auto overflow-hidden"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all duration-300"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-secondary" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-foreground">Terms & Conditions</h2>
            <p className="text-muted-foreground text-sm">
              Click to {isExpanded ? 'collapse' : 'expand'} institutional policies
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              <div className="h-px bg-white/10 mb-6"></div>
              
              {termsContent?.map((section, index) => (
                <motion.div
                  key={section?.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <h3 className="text-lg font-semibold text-foreground">{section?.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-4 border-l-2 border-white/10">
                    {section?.content}
                  </p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20"
              >
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-primary font-medium mb-1">Important Notice</h4>
                    <p className="text-muted-foreground text-sm">
                      These terms are effective as of September 15, 2025. By accessing this portal, 
                      you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center space-x-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-success/20 text-success hover:bg-success/30 transition-colors duration-300 text-sm font-medium"
                >
                  <Icon name="Download" size={16} className="inline mr-2" />
                  Download PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-300 text-sm font-medium"
                >
                  <Icon name="Mail" size={16} className="inline mr-2" />
                  Email Copy
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TermsSection;