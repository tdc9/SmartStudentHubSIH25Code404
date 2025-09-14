import React from 'react';
import Icon from '../../../components/AppIcon';

const TeamCreditsSection = () => {
  return (
    <div className="mt-16 mb-8">
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Users" size={40} color="white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            PROJECT MADE BY TEAM CODE 404
          </h2>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-primary mb-2">Leadership Team</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="Crown" size={18} color="var(--color-primary)" />
                    <span className="font-semibold text-foreground">JAYESH GAUR</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Team Leader</p>
                  
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <Icon name="Star" size={18} color="var(--color-secondary)" />
                    <span className="font-semibold text-foreground">ADARSH UPADHYAY</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Co-Leader</p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-secondary mb-2">Team Members</h3>
                <div className="space-y-2">
                  {['NISHA', 'ADITI', 'SHIPRA BHARTI', 'ADITYA PRATAP SINGH']?.map((name, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2">
                      <Icon name="User" size={16} color="var(--color-accent)" />
                      <span className="font-medium text-foreground">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-card/30 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
            <Icon name="Code" size={20} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Smart Student Hub Platform</span>
            <Icon name="Sparkles" size={16} color="var(--color-secondary)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCreditsSection;