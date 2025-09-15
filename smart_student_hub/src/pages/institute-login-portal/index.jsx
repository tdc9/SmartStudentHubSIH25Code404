import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import LoginCard from './components/LoginCard';
import SecurityAssurance from './components/SecurityAssurance';
import ContactSupport from './components/ContactSupport';
import Footer from './components/Footer';

const InstituteLoginPortal = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Institute Login Portal - AICTE Secure Access</title>
        <meta name="description" content="Secure login portal for educational institutions to access AICTE integrated dashboards. Government certified platform with SSL encryption." />
        <meta name="keywords" content="AICTE, institute login, educational portal, government login, secure access" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="/institute-login-portal" />
      </Helmet>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen bg-gradient-to-br from-background to-gradient-end"
      >
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
          }} />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section with Login */}
          <section className="min-h-screen flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Welcome Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center lg:text-left space-y-6"
                >
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                      Welcome to
                      <span className="block text-primary">Institute Portal</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-lg">
                      Secure access to your institutional dashboard through AICTE's integrated authentication system.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-muted-foreground">Government Certified Platform</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span className="text-muted-foreground">SSL Encrypted Connection</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <span className="text-muted-foreground">24/7 Technical Support</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Login Card */}
                <div className="flex justify-center lg:justify-end">
                  <LoginCard />
                </div>
              </div>
            </div>
          </section>

          {/* Security Assurance Section */}
          <section className="py-16 px-4">
            <SecurityAssurance />
          </section>

          {/* Contact & Support Section */}
          <section className="py-16 px-4">
            <ContactSupport />
          </section>

          {/* Footer */}
          <Footer />
        </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/5 rounded-full blur-xl"
          />
        </div>
      </motion.div>
    </>
  );
};

export default InstituteLoginPortal;