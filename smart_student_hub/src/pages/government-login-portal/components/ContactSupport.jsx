import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactSupport = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const termsVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const teamMembers = [
    'Adarsh Upadhyay',
    'Jayesh Gaur', 
    'Nisha',
    'Aditi',
    'Shipra Bharti',
    'Aditya Pratap Singh'
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Ministry of Education – Contact
        </h2>
        <p className="text-muted-foreground text-lg">
          Official contact information and support
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ministry Contact Information */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          <motion.div
            onClick={() => window.open('https://www.education.gov.in/', '_blank')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glassmorphic-card p-8 cursor-pointer hover:border-primary transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm mr-4">
                <Icon name="MapPin" size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Ministry of Education
              </h3>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p className="font-medium text-foreground mb-2">
                Department of School Education & Literacy
              </p>
              <p className="leading-relaxed">
                Shastri Bhawan, Dr Rajendra Prasad Rd, Rajpath Area, Central Secretariat
              </p>
              <p className="font-medium">
                New Delhi-110001
              </p>
            </div>

            <div className="mt-6 flex items-center text-sm text-primary hover:text-secondary transition-colors duration-200">
              <Icon name="ExternalLink" size={16} className="mr-2" />
              <span>Click to visit official website</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          <div className="glassmorphic-card p-8">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-left"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm mr-4">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Terms & Conditions
                </h3>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
              </motion.div>
            </motion.button>

            <motion.div
              initial="hidden"
              animate={isExpanded ? "visible" : "hidden"}
              variants={termsVariants}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-border space-y-4 text-sm text-muted-foreground max-h-64 overflow-y-auto custom-scrollbar">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>This portal is strictly for authorized Government Officers.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>All activities and logins are monitored and logged for security.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Unauthorized access attempts are prohibited and punishable.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Data available in the portal is confidential and must not be shared externally.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Users must ensure accuracy and integrity of any reports or approvals submitted.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>By logging in, you agree to comply with all policies set by the Ministry of Education.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-medium text-foreground mb-3 flex items-center">
                    <Icon name="Code" size={16} className="mr-2 text-primary" />
                    Development Credits
                  </p>
                  <p className="mb-3 text-primary font-medium">Team CODE 404 Members:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {teamMembers?.map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-foreground">{member}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground italic">
                    The development and design of this portal is credited to Team CODE 404.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSupport;