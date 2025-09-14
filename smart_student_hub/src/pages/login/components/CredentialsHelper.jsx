import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCredentials = [
    {
      role: 'Student',
      email: 'student@smartstudent.com',
      password: 'student123',
      description: 'Access student dashboard, achievement tracker, and portfolio'
    },
    {
      role: 'Institution Admin',
      email: 'admin@institution.edu',
      password: 'admin123',
      description: 'Manage students, approvals, and institutional compliance'
    },
    {
      role: 'Government Officer',
      email: 'officer@gov.in',
      password: 'gov123',
      mfa: '123456',
      description: 'Oversight, compliance monitoring, and institutional verification'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <Button
        variant="outline"
        fullWidth
        onClick={() => setIsExpanded(!isExpanded)}
        iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
        iconPosition="right"
      >
        Demo Credentials
      </Button>
      {isExpanded && (
        <div className="mt-4 bg-muted/20 border border-border rounded-xl p-4 space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Info" size={16} color="var(--color-accent)" />
            <span className="text-sm font-medium text-foreground">Test Account Credentials</span>
          </div>

          {mockCredentials?.map((cred, index) => (
            <div key={index} className="bg-card rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} color="var(--color-accent)" />
                <span className="font-medium text-sm text-foreground">{cred?.role}</span>
              </div>
              
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={12} />
                  <span className="font-mono">{cred?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={12} />
                  <span className="font-mono">{cred?.password}</span>
                </div>
                {cred?.mfa && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={12} />
                    <span className="font-mono">MFA: {cred?.mfa}</span>
                  </div>
                )}
                <p className="text-xs mt-1 opacity-80">{cred?.description}</p>
              </div>
            </div>
          ))}

          <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
            <Icon name="AlertTriangle" size={12} className="inline mr-1" />
            For demonstration purposes only
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;