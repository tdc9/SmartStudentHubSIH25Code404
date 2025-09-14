import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const handleSubmitAchievement = () => {
    console.log('Navigate to achievement submission');
  };

  const handleUploadProof = () => {
    console.log('Navigate to proof upload');
  };

  const handleUpdateProfile = () => {
    console.log('Navigate to profile update');
  };

  const handleViewPortfolio = () => {
    console.log('Navigate to portfolio view');
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <h2 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          variant="default" 
          fullWidth 
          iconName="Plus" 
          iconPosition="left"
          onClick={handleSubmitAchievement}
          className="h-12"
        >
          Submit Achievement
        </Button>
        
        <Button 
          variant="outline" 
          fullWidth 
          iconName="Upload" 
          iconPosition="left"
          onClick={handleUploadProof}
          className="h-12"
        >
          Upload Proof
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth 
          iconName="User" 
          iconPosition="left"
          onClick={handleUpdateProfile}
          className="h-12"
        >
          Update Profile
        </Button>
        
        <Button 
          variant="ghost" 
          fullWidth 
          iconName="FileText" 
          iconPosition="left"
          onClick={handleViewPortfolio}
          className="h-12"
        >
          View Portfolio
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;