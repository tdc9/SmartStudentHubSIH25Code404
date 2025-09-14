import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Multi-factor authentication for government officers'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'Your personal information is never shared'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by educational institutions nationwide'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Your Security is Our Priority
        </h3>
        <p className="text-muted-foreground">
          Smart Student Hub employs industry-leading security measures
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="bg-card/50 border border-border rounded-xl p-6 text-center hover:bg-card/70 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon 
                name={feature?.icon} 
                size={24} 
                color="var(--color-accent)" 
              />
            </div>
            <h4 className="font-medium text-foreground mb-2">
              {feature?.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-8 space-x-6">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="text-sm text-muted-foreground">ISO 27001 Certified</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} color="var(--color-success)" />
          <span className="text-sm text-muted-foreground">GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-sm text-muted-foreground">SOC 2 Type II</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;