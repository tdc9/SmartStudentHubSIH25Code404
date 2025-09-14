import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressSidebar = ({ achievements = [] }) => {
  const totalAchievements = achievements?.length;
  const approvedAchievements = achievements?.filter(a => a?.status === 'approved')?.length;
  const pendingAchievements = achievements?.filter(a => a?.status === 'pending')?.length;
  const rejectedAchievements = achievements?.filter(a => a?.status === 'rejected')?.length;
  const needsRevisionAchievements = achievements?.filter(a => a?.status === 'needs_revision')?.length;

  const completionPercentage = totalAchievements > 0 ? Math.round((approvedAchievements / totalAchievements) * 100) : 0;

  const categoryStats = achievements?.reduce((acc, achievement) => {
    if (achievement?.status === 'approved') {
      acc[achievement.category] = (acc?.[achievement?.category] || 0) + 1;
    }
    return acc;
  }, {});

  const getCategoryLabel = (category) => {
    const categoryMap = {
      academic: 'Academic',
      research: 'Research',
      extracurricular: 'Extracurricular',
      sports: 'Sports',
      leadership: 'Leadership',
      technical: 'Technical',
      internship: 'Internship',
      certification: 'Certification'
    };
    return categoryMap?.[category] || category;
  };

  const portfolioGoals = [
    { category: 'academic', target: 3, current: categoryStats?.academic || 0 },
    { category: 'technical', target: 2, current: categoryStats?.technical || 0 },
    { category: 'extracurricular', target: 2, current: categoryStats?.extracurricular || 0 },
    { category: 'leadership', target: 1, current: categoryStats?.leadership || 0 }
  ];

  const overallProgress = portfolioGoals?.reduce((acc, goal) => {
    return acc + Math.min(goal?.current / goal?.target, 1);
  }, 0) / portfolioGoals?.length * 100;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Portfolio Progress</h3>
            <p className="text-sm text-muted-foreground">Overall completion</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Completion</span>
              <span className="text-sm font-medium text-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent rounded-full h-2 transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-lg font-semibold text-foreground">{approvedAchievements}</p>
              <p className="text-xs text-muted-foreground">Approved</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-lg font-semibold text-foreground">{totalAchievements}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
      </div>
      {/* Status Overview */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Status Overview</h3>
            <p className="text-sm text-muted-foreground">Current submissions</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Approved</span>
            </div>
            <span className="text-sm font-medium text-foreground">{approvedAchievements}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
            <span className="text-sm font-medium text-foreground">{pendingAchievements}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Needs Revision</span>
            </div>
            <span className="text-sm font-medium text-foreground">{needsRevisionAchievements}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Rejected</span>
            </div>
            <span className="text-sm font-medium text-foreground">{rejectedAchievements}</span>
          </div>
        </div>
      </div>
      {/* Portfolio Goals */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Trophy" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Portfolio Goals</h3>
            <p className="text-sm text-muted-foreground">Recommended targets</p>
          </div>
        </div>

        <div className="space-y-4">
          {portfolioGoals?.map((goal) => {
            const progress = Math.min((goal?.current / goal?.target) * 100, 100);
            const isComplete = goal?.current >= goal?.target;
            
            return (
              <div key={goal?.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {getCategoryLabel(goal?.category)}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-foreground">
                      {goal?.current}/{goal?.target}
                    </span>
                    {isComplete && (
                      <Icon name="CheckCircle" size={14} className="text-green-500" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={`rounded-full h-1.5 transition-all duration-300 ${
                      isComplete ? 'bg-green-500' : 'bg-accent'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Common tasks</p>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            iconName="FileText"
            iconPosition="left"
            onClick={() => window.open('/student-portfolio', '_blank')}
          >
            View Portfolio
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            iconPosition="left"
            onClick={() => console.log('Download portfolio PDF')}
          >
            Download PDF
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Share"
            iconPosition="left"
            onClick={() => console.log('Share portfolio')}
          >
            Share Portfolio
          </Button>
        </div>
      </div>
      {/* Tips */}
      <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="font-semibold text-foreground">Pro Tip</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Upload clear, high-quality documents as proof. Include certificates, screenshots, 
          or official letters to increase approval chances.
        </p>
      </div>
    </div>
  );
};

export default ProgressSidebar;