import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const navigate = useNavigate();


  const handleGetStarted = (role) => {
  const roleRoutes = {
    student: "/student-dashboard",
    institution: "/institution-dashboard",
    government: "/government-dashboard",
  };

  const path = roleRoutes[role.toLowerCase()]; // in case role is "Student" with caps

  if (path) {
    navigate(path, { state: { selectedRole: role } });
  } else {
    console.error("Unknown role:", role);
  }
};


  const roleOptions = [
    {
      role: 'student',
      title: 'Student Portal',
      description: 'Track achievements, build portfolios, and connect with mentors',
      icon: 'User',
      color: 'emerald',
      features: ['Achievement Tracking', 'Portfolio Builder', 'Mentorship System', 'Certificate Vault']
    },
    {
      role: 'institution',
      title: 'Institution Admin',
      description: 'Manage students, generate reports, and ensure compliance',
      icon: 'Building2',
      color: 'blue',
      features: ['Student Management', 'Compliance Reports', 'Bulk Operations', 'Analytics Dashboard']
    },
    {
      role: 'government',
      title: 'Government Officer',
      description: 'Monitor institutions, verify compliance, and generate insights',
      icon: 'Shield',
      color: 'purple',
      features: ['Institution Oversight', 'Audit Management', 'Compliance Monitoring', 'Policy Distribution']
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        text: 'text-emerald-400',
        button: 'bg-emerald-500 hover:bg-emerald-600',
        hover: 'hover:border-emerald-500/40'
      },
      blue: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        text: 'text-blue-400',
        button: 'bg-blue-500 hover:bg-blue-600',
        hover: 'hover:border-blue-500/40'
      },
      purple: {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        text: 'text-purple-400',
        button: 'bg-purple-500 hover:bg-purple-600',
        hover: 'hover:border-purple-500/40'
      }
    };
    return colorMap?.[color] || colorMap?.emerald;
  };

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-6">
            <Icon name="Rocket" size={24} color="var(--color-emerald-400)" />
            <span className="text-emerald-400 font-semibold">Get Started Today</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 block">
              Your Educational Journey?
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Join thousands of students, institutions, and government bodies already using 
            Smart Student Hub to streamline educational administration and achieve excellence.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="Users" size={20} color="var(--color-emerald-400)" />
              <span>10,000+ Active Users</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="Building2" size={20} color="var(--color-blue-400)" />
              <span>500+ Institutions</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Icon name="Award" size={20} color="var(--color-purple-400)" />
              <span>98% Satisfaction Rate</span>
            </div>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {roleOptions?.map((option) => {
            const colors = getColorClasses(option?.color);
            return (
              <div
                key={option?.role}
                className={`group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl ${colors?.border} ${colors?.hover}`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${colors?.bg} ${colors?.border} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={option?.icon} size={28} color={`var(--color-${option?.color}-400)`} />
                </div>
                {/* Content */}
                <h3 className={`text-2xl font-bold mb-3 group-hover:${colors?.text} transition-colors duration-300 text-white`}>
                  {option?.title}
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {option?.description}
                </p>
                {/* Features */}
                <div className="space-y-2 mb-8">
                  {option?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${colors?.bg}`}>
                        <Icon name="Check" size={12} color={`var(--color-${option?.color}-400)`} />
                      </div>
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {/* CTA Button */}
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handleGetStarted(option?.role)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className={`w-full ${colors?.button} text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  Access {option?.title}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-3xl p-12 border border-slate-600 backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-white mb-4">
            Need Help Getting Started?
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you set up your account and get the most 
            out of the Smart Student Hub platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="border-2 border-slate-500 text-slate-300 hover:bg-slate-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Contact Support
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="PlayCircle"
              iconPosition="left"
              className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;