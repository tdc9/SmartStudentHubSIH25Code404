import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

import ContactHeader from './components/ContactHeader';
import ContactStats from './components/ContactStats';
import ContactTable from './components/ContactTable';

const HelpAndSupportContacts = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Help & Support Contacts - Help Support Portal</title>
        <meta name="description" content="Get in touch with our dedicated support team members for immediate assistance with your queries and technical issues." />
        <meta name="keywords" content="help, support, contact, team, assistance, technical support" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-background via-slate-800 to-purple-900">
        
        
        <motion.main
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className="pt-20 pb-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <ContactHeader />
            
            <ContactStats />
            
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="glass-card p-6 md:p-8 animate-fade-in"
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Support Team Directory
                </h2>
                <p className="text-sm text-muted-foreground">
                  Contact any of our team members directly for personalized assistance
                </p>
              </div>
              
              <ContactTable />
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date()?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span>All team members are currently available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </>
  );
};

export default HelpAndSupportContacts;