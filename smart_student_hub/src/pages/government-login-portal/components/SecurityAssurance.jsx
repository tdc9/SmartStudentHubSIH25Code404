import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecurityAssurance = () => {
  const securityFeatures = [
    {
      id: 1,
      icon: 'Shield',
      title: 'SSL Encryption',
      description: 'End-to-end encrypted data transmission for maximum security'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Multi-layer authentication system with AICTE verification'
    },
    {
      id: 3,
      icon: 'Eye',
      title: 'Privacy Protection',
      description: 'Your institutional data is protected with advanced privacy measures'
    },
    {
      id: 4,
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Government-certified platform with official AICTE integration'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Security Assurance
        </h2>
        <p className="text-muted-foreground">
          Your institutional data is protected with enterprise-grade security
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityFeatures?.map((feature) => (
          <motion.div
            key={feature?.id}
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
            className="glassmorphic-card p-6 text-center group cursor-pointer glow-effect"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/20 backdrop-blur-sm group-hover:bg-primary/30 transition-colors duration-300">
              <Icon 
                name={feature?.icon} 
                size={24} 
                className="text-primary group-hover:text-white transition-colors duration-300" 
              />
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {feature?.title}
            </h3>
            
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {feature?.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SecurityAssurance;