import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactTable = () => {
  const supportTeam = [
    {
      id: 1,
      name: "Adarsh Upadhyay",
      phone: "7232961080",
      email: "adarshupadhyay27504@gmail.com"
    },
    {
      id: 2,
      name: "Jayesh Gaur",
      phone: "9411410181",
      email: "jayeshgaur46@gmail.com"
    },
    {
      id: 3,
      name: "Nisha",
      phone: "7427002762",
      email: "chaudharynisha7070@gmail.com"
    },
    {
      id: 4,
      name: "Aditi",
      phone: "6387277686",
      email: "yadavaditi.9415@gmail.com"
    },
    {
      id: 5,
      name: "Shipra Bharti",
      phone: "7985428653",
      email: "shiprakhushi8@gmail.com"
    },
    {
      id: 6,
      name: "Aditya Pratap Singh",
      phone: "8052378245",
      email: "adityarajput2007@gmail.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden rounded-xl glass-surface"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Name</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} />
                    <span>Phone</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} />
                    <span>Email</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {supportTeam?.map((member) => (
                <motion.tr
                  key={member?.id}
                  variants={rowVariants}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon name="User" size={16} color="white" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {member?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={16} className="text-muted-foreground" />
                      <a
                        href={`tel:${member?.phone}`}
                        className="text-sm text-accent hover:text-accent/80 transition-colors duration-200"
                      >
                        {member?.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <a
                        href={`mailto:${member?.email}`}
                        className="text-sm text-accent hover:text-accent/80 transition-colors duration-200"
                      >
                        {member?.email}
                      </a>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
      {/* Mobile Table with Horizontal Scroll */}
      <div className="md:hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto glass-surface rounded-xl"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={14} />
                    <span>Name</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={14} />
                    <span>Phone</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={14} />
                    <span>Email</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {supportTeam?.map((member) => (
                <motion.tr
                  key={member?.id}
                  variants={rowVariants}
                  className="border-b border-white/5"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={12} color="white" />
                      </div>
                      <span className="text-sm font-medium text-foreground whitespace-nowrap">
                        {member?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={14} className="text-muted-foreground flex-shrink-0" />
                      <a
                        href={`tel:${member?.phone}`}
                        className="text-sm text-accent hover:text-accent/80 transition-colors duration-200 whitespace-nowrap"
                      >
                        {member?.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={14} className="text-muted-foreground flex-shrink-0" />
                      <a
                        href={`mailto:${member?.email}`}
                        className="text-sm text-accent hover:text-accent/80 transition-colors duration-200 whitespace-nowrap"
                      >
                        {member?.email}
                      </a>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactTable;