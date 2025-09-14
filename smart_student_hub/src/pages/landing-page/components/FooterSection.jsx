import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const footerLinks = {
    product: [
      { label: 'Student Portal', path: '/student-dashboard', state: { selectedRole: 'student' } },
      { label: 'Institution Admin', path: '/institution-dashboard', state: { selectedRole: 'institution' } },
      { label: 'Government Officer', path: '/government-dashboard', state: { selectedRole: 'government' } },
      { label: 'Features', path: '#features' }
    ],
    company: [
      { label: 'About Us', path: '#about' },
      { label: 'Team', path: '#team' },
      { label: 'Careers', path: '#careers' },
      { label: 'Contact', path: '#contact' }
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Documentation', path: '#docs' },
      { label: 'API Reference', path: '#api' },
      { label: 'System Status', path: '#status' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '#privacy' },
      { label: 'Terms of Service', path: '#terms' },
      { label: 'Cookie Policy', path: '#cookies' },
      { label: 'GDPR Compliance', path: '#gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#twitter' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#linkedin' },
    { name: 'GitHub', icon: 'Github', url: '#github' },
    { name: 'YouTube', icon: 'Youtube', url: '#youtube' }
  ];

  const handleLinkClick = (link) => {
    if (link?.path?.startsWith('#')) {
      // Handle anchor links or external links
      console.log('Navigate to:', link?.path);
    } else {
      navigate(link?.path, link?.state ? { state: link?.state } : {});
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon name="GraduationCap" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Smart Student Hub</h3>
                  <p className="text-emerald-400 text-sm">Educational Excellence Platform</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
                Streamlining educational administration through innovative technology. 
                Connecting students, institutions, and government bodies for a better future.
              </p>

              {/* Team Credit */}
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Users" size={16} color="var(--color-emerald-400)" />
                  <span className="text-emerald-400 font-semibold text-sm">Team Code 404</span>
                </div>
                <p className="text-slate-300 text-sm">
                  Developed by Jayesh Gaur, Adarsh Upadhyay, Nisha, Aditi, Shipra Bharti, and Aditya Pratap Singh
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-110"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} color="var(--color-slate-300)" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                {footerLinks?.product?.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks?.company?.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks?.support?.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>

              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                {footerLinks?.legal?.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-slate-300 text-sm">
                Get the latest updates on new features and educational insights.
              </p>
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Icon name="Send" size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>© {currentYear} Smart Student Hub. All rights reserved.</span>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={14} color="var(--color-emerald-400)" />
                <span>SSL Secured</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>Made with</span>
              <Icon name="Heart" size={14} color="var(--color-red-400)" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;