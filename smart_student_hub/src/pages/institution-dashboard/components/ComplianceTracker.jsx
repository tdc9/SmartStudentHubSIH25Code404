import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceTracker = ({ complianceData, onViewDetails, onUpdateCompliance }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      case 'overdue':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in-progress':
        return 'text-blue-500';
      case 'pending':
        return 'text-amber-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const formatDeadline = (date) => {
    const deadline = new Date(date);
    const now = new Date();
    const diffInDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days overdue`;
    if (diffInDays === 0) return 'Due today';
    if (diffInDays === 1) return 'Due tomorrow';
    return `${diffInDays} days left`;
  };

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Compliance Tracker</h3>
            <p className="text-sm text-muted-foreground">
              Accreditation & regulatory compliance status
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => console.log('Export compliance report')}
          >
            Export Report
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Compliance</span>
            <span className="text-sm font-medium text-foreground">
              {complianceData?.overallProgress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(complianceData?.overallProgress)}`}
              style={{ width: `${complianceData?.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Compliance Categories */}
        <div className="space-y-4">
          {complianceData?.categories?.map((category) => (
            <div key={category?.id} className="border border-border rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-muted/50 ${getStatusColor(category?.status)}`}>
                    <Icon name={getStatusIcon(category?.status)} size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{category?.name}</h4>
                    <p className="text-sm text-muted-foreground">{category?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {category?.completedItems}/{category?.totalItems}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((category?.completedItems / category?.totalItems) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor((category?.completedItems / category?.totalItems) * 100)}`}
                      style={{ width: `${(category?.completedItems / category?.totalItems) * 100}%` }}
                    />
                  </div>
                </div>
                {category?.deadline && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    new Date(category.deadline) < new Date() 
                      ? 'bg-red-500/10 text-red-500' :'bg-amber-500/10 text-amber-500'
                  }`}>
                    {formatDeadline(category?.deadline)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onViewDetails(category)}
                >
                  View Details
                </Button>
                {category?.status !== 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onUpdateCompliance(category)}
                  >
                    Update
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              iconName="FileText"
              onClick={() => console.log('Generate NAAC report')}
            >
              Generate NAAC Report
            </Button>
            <Button
              variant="outline"
              iconName="BarChart3"
              onClick={() => console.log('Generate NIRF report')}
            >
              Generate NIRF Report
            </Button>
            <Button
              variant="outline"
              iconName="Shield"
              onClick={() => console.log('Generate AICTE report')}
            >
              Generate AICTE Report
            </Button>
            <Button
              variant="outline"
              iconName="Calendar"
              onClick={() => console.log('Schedule audit')}
            >
              Schedule Audit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTracker;