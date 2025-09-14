import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = () => {
  const trustSignals = [
    {
      id: 1,
      icon: "Shield",
      title: "SSL Encrypted",
      description: "256-bit SSL encryption protects all data transmission",
      badge: "Verified"
    },
    {
      id: 2,
      icon: "Lock",
      title: "GDPR Compliant",
      description: "Full compliance with data protection regulations",
      badge: "Certified"
    },
    {
      id: 3,
      icon: "Database",
      title: "Secure Storage",
      description: "Enterprise-grade data storage with backup redundancy",
      badge: "Protected"
    },
    {
      id: 4,
      icon: "UserCheck",
      title: "Multi-Factor Auth",
      description: "Advanced authentication for government officers",
      badge: "Enhanced"
    }
  ];

  const certifications = [
    {
      name: "ISO 27001",
      description: "Information Security Management",
      icon: "Award"
    },
    {
      name: "SOC 2 Type II",
      description: "Security & Availability Controls",
      icon: "CheckCircle"
    },
    {
      name: "FERPA Compliant",
      description: "Educational Privacy Standards",
      icon: "GraduationCap"
    },
    {
      name: "99.9% Uptime",
      description: "Guaranteed Service Availability",
      icon: "Activity"
    }
  ];

  const securityFeatures = [
    "End-to-end encryption for all communications",
    "Regular security audits and penetration testing",
    "Role-based access control with granular permissions",
    "Automated backup and disaster recovery systems",
    "Real-time monitoring and threat detection",
    "Compliance with educational data protection standards"
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-6">
            <Icon name="Shield" size={24} color="var(--color-emerald-400)" />
            <span className="text-emerald-400 font-semibold">Security & Trust</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Enterprise-Grade
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 block">
              Security Standards
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Your data security is our top priority. We implement industry-leading security measures 
            to protect sensitive educational information and ensure regulatory compliance.
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustSignals?.map((signal) => (
            <div
              key={signal?.id}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <Icon name={signal?.icon} size={24} color="var(--color-emerald-400)" />
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium">
                  {signal?.badge}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                {signal?.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {signal?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-slate-800/30 rounded-3xl p-8 border border-slate-700 mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Industry Certifications & Compliance
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={cert?.icon} size={28} color="var(--color-blue-400)" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {cert?.name}
                </h4>
                <p className="text-slate-300 text-sm">
                  {cert?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Comprehensive Security Features
            </h3>
            <div className="space-y-4">
              {securityFeatures?.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <Icon name="Check" size={14} color="var(--color-emerald-400)" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Security Visualization */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-8 border border-slate-600 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/30">
                  <Icon name="ShieldCheck" size={40} color="var(--color-emerald-400)" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Protected Platform
                </h4>
                <p className="text-slate-300 text-sm">
                  Multi-layered security architecture
                </p>
              </div>

              {/* Security Layers */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl">
                  <Icon name="Globe" size={16} color="var(--color-blue-400)" />
                  <span className="text-slate-300 text-sm">Network Security</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl">
                  <Icon name="Server" size={16} color="var(--color-purple-400)" />
                  <span className="text-slate-300 text-sm">Application Security</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl">
                  <Icon name="Database" size={16} color="var(--color-orange-400)" />
                  <span className="text-slate-300 text-sm">Data Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;