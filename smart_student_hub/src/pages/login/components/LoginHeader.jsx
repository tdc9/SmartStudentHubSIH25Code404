import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-card/50 border-b border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/landing-page')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="var(--color-primary-foreground)" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart Student Hub</h1>
              <p className="text-xs text-muted-foreground">Educational Management Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Home
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="HelpCircle" size={16} />
              <span>Need help?</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;