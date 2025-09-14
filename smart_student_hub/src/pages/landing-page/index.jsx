import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TeamCreditsSection from './components/TeamCreditsSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const href = e?.target?.getAttribute('href');
      if (href && href?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Smart Student Hub - Educational Excellence Platform</title>
        <meta 
          name="description" 
          content="Streamline educational administration with Smart Student Hub. A unified platform connecting students, institutions, and government bodies for efficient data management, compliance monitoring, and academic progress tracking." 
        />
        <meta name="keywords" content="education, student management, institutional compliance, government oversight, academic tracking, portfolio management" />
        <meta name="author" content="Team Code 404" />
        <meta property="og:title" content="Smart Student Hub - Educational Excellence Platform" />
        <meta property="og:description" content="Transform educational administration with our comprehensive platform for students, institutions, and government bodies." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smart Student Hub - Educational Excellence Platform" />
        <meta name="twitter:description" content="Streamline educational administration and student achievement tracking through our unified platform." />
        <link rel="canonical" href="/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section id="features">
          <FeaturesSection />
        </section>

        {/* Team Credits Section */}
        <section id="team">
          <TeamCreditsSection />
        </section>

        {/* Trust Signals Section */}
        <TrustSignalsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Call to Action Section */}
        <CTASection />

        {/* Footer Section */}
        <FooterSection />
      </div>
    </>
  );
};

export default LandingPage;