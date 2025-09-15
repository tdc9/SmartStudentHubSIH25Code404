import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: 'MapPin',
      label: 'Address',
      value: `Chaudhary Charan Singh University\nMeerut, Uttar Pradesh 250004\nIndia`
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+91-121-2763001\n+91-121-2763002'
    },
    {
      icon: 'Mail',
      label: 'Email',
      value: 'info@ccsuniversity.ac.in\nadmissions@ccsuniversity.ac.in'
    },
    {
      icon: 'Clock',
      label: 'Office Hours',
      value: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glassmorphism-card p-6 w-full max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-bold text-foreground mb-2"
        >
          Contact Information
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-sm"
        >
          Get in touch with our academic support team
        </motion.p>
      </div>
      <div className="space-y-4">
        {contactInfo?.map((item, index) => (
          <motion.div
            key={item?.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Icon name={item?.icon} size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground mb-1">{item?.label}</h3>
              <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                {item?.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <div className="flex items-center justify-center space-x-4">
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors duration-300"
          >
            <Icon name="Facebook" size={16} className="text-primary" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors duration-300"
          >
            <Icon name="Twitter" size={16} className="text-primary" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors duration-300"
          >
            <Icon name="Linkedin" size={16} className="text-primary" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors duration-300"
          >
            <Icon name="Instagram" size={16} className="text-primary" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactSection;