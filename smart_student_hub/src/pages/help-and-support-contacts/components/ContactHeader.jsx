import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactHeader = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleRefresh = () => {
    window.location?.reload();
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting contact list...');
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg glow-effect">
          <Icon name="Headphones" size={32} color="white" />
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Help & Support Contacts
      </h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
        Get in touch with our dedicated support team members for immediate assistance with your queries and technical issues.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="default"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={handleRefresh}
          className="bg-white text-slate-900 hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Refresh List
        </Button>
        
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={handleExport}
          className="border-white/20 hover:border-white/30 hover:bg-white/5 hover:scale-105 transition-all duration-200"
        >
          Export Contacts
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactHeader;