import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "Trophy",
      title: "Achievement Tracking",
      description: "Comprehensive system for recording, validating, and showcasing student achievements with automated portfolio generation.",
      color: "emerald"
    },
    {
      id: 2,
      icon: "Users",
      title: "Multi-Role Management",
      description: "Role-based access control for students, institutions, and government officers with tailored dashboards and workflows.",
      color: "blue"
    },
    {
      id: 3,
      icon: "Shield",
      title: "Compliance Monitoring",
      description: "Real-time compliance tracking with automated NAAC/NIRF/AICTE report generation and audit trail management.",
      color: "purple"
    },
    {
      id: 4,
      icon: "BarChart3",
      title: "Analytics & Insights",
      description: "Comprehensive analytics with comparative reports across college, district, state, and national levels.",
      color: "orange"
    },
    {
      id: 5,
      icon: "FileText",
      title: "Document Management",
      description: "Secure certificate vault with document verification, bulk upload capabilities, and automated workflow approvals.",
      color: "teal"
    },
    {
      id: 6,
      icon: "MessageSquare",
      title: "Communication Hub",
      description: "Integrated mentorship system with faculty-student chat, peer Q&A forums, and institutional discussion boards.",
      color: "pink"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
      pink: "bg-pink-500/10 text-pink-400 border-pink-500/20"
    };
    return colorMap?.[color] || colorMap?.emerald;
  };

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 block">
              Educational Excellence
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive tools designed to streamline educational administration, 
            enhance student engagement, and ensure regulatory compliance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${getColorClasses(feature?.color)} group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature?.icon} size={28} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                {feature?.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature?.description}
              </p>

              {/* Hover Effect Arrow */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="ArrowRight" size={20} color="var(--color-emerald-400)" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-300 mb-6">
            Ready to transform your educational institution?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
              Get Started Today
            </button>
            <button className="border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;