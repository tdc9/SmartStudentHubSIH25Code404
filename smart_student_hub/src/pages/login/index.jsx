import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import ContactSection from './components/ContactSection';
import TermsSection from './components/TermsSection';
import SignUpModal from './components/SignUpModal';
import SecurityPlatformSection from './components/SecurityPlatformSection';
import Footer from './components/Footer';

const StudentPortalLogin = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleLoginSuccess = () => {
    // Navigate to dashboard or show success message
    console.log('Login successful - redirecting to dashboard');
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      {/* Main Content */}
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with Login Form */}
          <section className="mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Login Form */}
              <div className="order-2 lg:order-1">
                <LoginForm 
                  onSignUpClick={handleSignUpClick}
                  onLoginSuccess={handleLoginSuccess}
                />
              </div>
              
              {/* Contact Information */}
              <div className="order-1 lg:order-2">
                <ContactSection />
              </div>
            </div>
          </section>

          {/* Terms & Conditions Section */}
          <section className="mb-12">
            <TermsSection />
          </section>

          {/* Security and Platform Overview Section */}
          <section className="mb-8">
            <SecurityPlatformSection />
          </section>
        </div>
      </main>
      {/* Footer */}
      <Footer />
      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={isSignUpModalOpen}
        onClose={handleCloseSignUpModal}
      />
      {/* Background Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-accent/10 to-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-secondary/5 to-accent/5 blur-2xl"
        />
      </div>
    </div>
  );
};

export default StudentPortalLogin;