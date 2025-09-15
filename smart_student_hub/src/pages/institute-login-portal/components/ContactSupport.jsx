import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactSupport = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      alert('Thank you for your message. We will get back to you soon!');
      setContactForm({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'YouTube',
      icon: 'Youtube',
      url: 'https://www.youtube.com/channel/UCaicte',
      color: 'text-red-500'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: 'https://www.facebook.com/aicte',
      color: 'text-blue-500'
    },
    {
      name: 'Email',
      icon: 'Mail',
      url: 'mailto:contactus-nsws@investindia.org.in',
      color: 'text-green-500'
    }
  ];

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
          Contact & Support
        </h2>
        <p className="text-muted-foreground text-lg">
          Get assistance with your institutional portal access
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          variants={itemVariants}
          className="glassmorphic-card p-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
            <Icon name="MessageSquare" size={24} className="mr-3 text-primary" />
            Send us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={contactForm?.name}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={contactForm?.email}
              onChange={handleInputChange}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Describe your query or issue"
                value={contactForm?.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg glassmorphic border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Helpline</p>
                <p className="text-foreground font-medium">1800 102 5841</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email Support</p>
                <p className="text-foreground font-medium">contactus-nsws@investindia.org.in</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Information */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          {/* Social Media */}
          <div className="glassmorphic-card p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <Icon name="Users" size={24} className="mr-3 text-primary" />
              Connect with Us
            </h3>

            <div className="flex space-x-4 mb-6">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-lg glassmorphic border border-border hover:border-primary transition-all duration-200 glow-effect scale-hover"
                >
                  <Icon name={social?.icon} size={20} className={social?.color} />
                </a>
              ))}
            </div>

            <p className="text-muted-foreground text-sm mb-4">
              Follow us on social media for updates and announcements
            </p>

            <a
              href="https://www.aicte-india.org/grievance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium"
            >
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Click here to connect
            </a>
          </div>

          {/* Grievance Information */}
          <div className="glassmorphic-card p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Icon name="AlertCircle" size={24} className="mr-3 text-warning" />
              Grievance Redressal
            </h3>

            <p className="text-muted-foreground text-sm mb-4">
              For any grievances related to institutional registration or portal access, please use our official grievance redressal system.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Response Time: 24-48 hours</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Confidential & Secure</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={16} className="text-primary" />
                <span className="text-sm text-foreground">Official AICTE Channel</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSupport;