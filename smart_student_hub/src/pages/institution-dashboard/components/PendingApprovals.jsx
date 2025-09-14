import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingApprovals = ({ approvals, onApprove, onReject, onViewDetails }) => {
  const getSubmissionIcon = (type) => {
    const iconMap = {
      'achievement': 'Trophy',
      'certificate': 'Award',
      'project': 'Code',
      'internship': 'Briefcase',
      'publication': 'BookOpen',
      'competition': 'Target'
    };
    return iconMap?.[type] || 'FileText';
  };

  const getSubmissionColor = (type) => {
    const colorMap = {
      'achievement': 'text-amber-500',
      'certificate': 'text-green-500',
      'project': 'text-blue-500',
      'internship': 'text-purple-500',
      'publication': 'text-indigo-500',
      'competition': 'text-red-500'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-red-500/10 text-red-500', label: 'High' },
      medium: { color: 'bg-amber-500/10 text-amber-500', label: 'Medium' },
      low: { color: 'bg-green-500/10 text-green-500', label: 'Low' }
    };

    const config = priorityConfig?.[priority] || priorityConfig?.medium;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const submissionDate = new Date(date);
    const diffInHours = Math.floor((now - submissionDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return submissionDate?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Pending Approvals</h3>
            <p className="text-sm text-muted-foreground">
              {approvals?.length} submissions awaiting review
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            onClick={() => console.log('Open filters')}
          >
            Filter
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {approvals?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">All caught up!</p>
            <p className="text-muted-foreground">No pending approvals at the moment</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {approvals?.map((approval) => (
              <div key={approval?.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-muted/50 ${getSubmissionColor(approval?.type)}`}>
                    <Icon name={getSubmissionIcon(approval?.type)} size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-medium text-foreground truncate">
                          {approval?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          by {approval?.studentName} • {approval?.department}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {getPriorityBadge(approval?.priority)}
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(approval?.submittedAt)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {approval?.description}
                    </p>
                    
                    {approval?.attachments && approval?.attachments?.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {approval?.attachments?.length} attachment{approval?.attachments?.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Check"
                        onClick={() => onApprove(approval?.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="X"
                        onClick={() => onReject(approval?.id)}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewDetails(approval)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {approvals?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => console.log('View all approvals')}
          >
            View All Pending Approvals
          </Button>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;