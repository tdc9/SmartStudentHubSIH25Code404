import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SecurityPlatformSection = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Multi-factor authentication for government officers'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'Your personal information is never shared'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by educational institutions nationwide'
    }
  ];

  const certifications = [
    {
      title: 'ISO 27001',
      subtitle: 'Certified'
    },
    {
      title: 'GDPR',
      subtitle: 'Compliant'
    },
    {
      title: 'SOC 2',
      subtitle: 'Type II'
    }
  ];

  const platformRoles = [
    {
      icon: 'GraduationCap',
      title: 'Students',
      description: 'Track achievements, build portfolios, and connect with mentors'
    },
    {
      icon: 'Building',
      title: 'Institutions',
      description: 'Manage students, track compliance, and generate reports'
    },
    {
      icon: 'Landmark',
      title: 'Government',
      description: 'Monitor institutions, ensure compliance, and oversee quality'
    }
  ];

  return (
    <div className="space-y-12 w-full max-w-6xl mx-auto">
      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glassmorphism-card p-8"
      >
        {/* Security Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gradient mb-3"
          >
            Your Security is Our Priority
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            Smart Student Hub employs industry-leading security measures
          </motion.p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {securityFeatures?.map((feature, index) => (
            <motion.div
              key={feature?.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                <Icon name={feature?.icon} size={24} color="white" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">{feature?.title}</h3>
              <p className="text-sm text-muted-foreground">{feature?.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {certifications?.map((cert, index) => (
            <motion.div
              key={cert?.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg px-4 py-2 border border-primary/30"
            >
              <div className="text-center">
                <p className="font-semibold text-primary">{cert?.title}</p>
                <p className="text-xs text-muted-foreground">{cert?.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {/* Multi-Role Platform Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glassmorphism-card p-8"
      >
        {/* Platform Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-3xl font-bold text-gradient mb-3"
          >
            Multi-Role Educational Platform
          </motion.h2>
        </div>

        {/* Platform Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {platformRoles?.map((role, index) => (
            <motion.div
              key={role?.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4">
                <Icon name={role?.icon} size={28} color="white" />
              </div>
              <h3 className="font-semibold text-foreground text-xl mb-3">{role?.title}</h3>
              <p className="text-muted-foreground">{role?.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center pt-6 border-t border-white/10"
        >
          <p className="text-sm text-muted-foreground">
            © 2025 Smart Student Hub. All rights reserved. | 
            <span className="text-accent"> Secure</span> • 
            <span className="text-success"> Reliable</span> • 
            <span className="text-secondary"> Trusted</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SecurityPlatformSection;