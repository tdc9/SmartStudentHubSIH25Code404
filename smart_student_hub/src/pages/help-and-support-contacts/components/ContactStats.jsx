import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactStats = () => {
  const stats = [
    {
      id: 1,
      icon: "Users",
      label: "Support Team",
      value: "6",
      description: "Available Members",
      color: "from-primary to-blue-600"
    },
    {
      id: 2,
      icon: "Clock",
      label: "Response Time",
      value: "< 2hrs",
      description: "Average Response",
      color: "from-secondary to-purple-600"
    },
    {
      id: 3,
      icon: "CheckCircle",
      label: "Availability",
      value: "24/7",
      description: "Support Hours",
      color: "from-accent to-cyan-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
    >
      {stats?.map((stat) => (
        <motion.div
          key={stat?.id}
          variants={cardVariants}
          whileHover={{ scale: 1.05 }}
          className="glass-card p-6 text-center hover:shadow-xl transition-all duration-200"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat?.color} mb-4 shadow-lg`}>
            <Icon name={stat?.icon} size={24} color="white" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">
              {stat?.value}
            </h3>
            <p className="text-sm font-medium text-foreground">
              {stat?.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {stat?.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContactStats;