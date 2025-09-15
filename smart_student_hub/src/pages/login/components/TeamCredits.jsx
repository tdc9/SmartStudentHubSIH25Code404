import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TeamCredits = () => {
  const teamMembers = [
    {
      name: "Arjun Sharma",
      role: "Lead Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      skills: ["React", "Node.js", "UI/UX"]
    },
    {
      name: "Priya Patel",
      role: "Frontend Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      skills: ["JavaScript", "CSS", "Animation"]
    },
    {
      name: "Rahul Kumar",
      role: "Backend Engineer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skills: ["Database", "API", "Security"]
    },
    {
      name: "Sneha Singh",
      role: "QA Engineer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      skills: ["Testing", "Automation", "Quality"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="glassmorphism-card p-6 w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="inline-flex items-center space-x-2 mb-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="Code" size={20} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-gradient">Team CODE 404</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground"
        >
          Crafting exceptional educational experiences through innovative technology
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {teamMembers?.map((member, index) => (
          <motion.div
            key={member?.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2 border-primary/30">
              <img
                src={member?.avatar}
                alt={member?.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">{member?.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{member?.role}</p>
            <div className="flex flex-wrap justify-center gap-1">
              {member?.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="text-center space-y-3"
      >
        <div className="flex items-center justify-center space-x-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors duration-300"
          >
            <Icon name="Github" size={18} />
            <span className="text-sm">Open Source</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 text-muted-foreground hover:text-success transition-colors duration-300"
          >
            <Icon name="Heart" size={18} />
            <span className="text-sm">Made with Love</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 text-muted-foreground hover:text-secondary transition-colors duration-300"
          >
            <Icon name="Zap" size={18} />
            <span className="text-sm">Powered by React</span>
          </motion.div>
        </div>
        
        <div className="pt-3 border-t border-white/10">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} Team CODE 404. All rights reserved. | 
            <span className="text-accent"> Smart Student Hub v2.1.0</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamCredits;