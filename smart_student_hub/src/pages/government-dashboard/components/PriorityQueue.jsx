import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityQueue = () => {
  const priorityItems = [
    {
      id: 1,
      institution: "UC Berkeley",
      issue: "Compliance Documentation Missing",
      urgency: "High",
      daysOverdue: 15,
      type: "Documentation",
      assignedTo: "Sarah Johnson",
      lastUpdate: "2024-09-10"
    },
    {
      id: 2,
      institution: "Community College of Denver",
      issue: "Accreditation Renewal Due",
      urgency: "Critical",
      daysOverdue: 3,
      type: "Renewal",
      assignedTo: "Michael Chen",
      lastUpdate: "2024-09-12"
    },
    {
      id: 3,
      institution: "State University of Texas",
      issue: "Faculty Qualification Review",
      urgency: "Medium",
      daysOverdue: 8,
      type: "Review",
      assignedTo: "Emily Rodriguez",
      lastUpdate: "2024-09-08"
    },
    {
      id: 4,
      institution: "Technical Institute of California",
      issue: "Infrastructure Compliance Check",
      urgency: "High",
      daysOverdue: 12,
      type: "Inspection",
      assignedTo: "David Kim",
      lastUpdate: "2024-09-05"
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-error/20 text-error border-error/30';
      case 'High':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'Medium':
        return 'bg-accent/20 text-accent border-accent/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return 'AlertTriangle';
      case 'High':
        return 'AlertCircle';
      case 'Medium':
        return 'Clock';
      default:
        return 'Info';
    }
  };

  return (
    <div className="glass-card rounded-2xl">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Priority Queue</h2>
            <p className="text-sm text-muted-foreground mt-1">Institutions requiring immediate attention</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {priorityItems?.map((item) => (
          <div key={item?.id} className="p-6 hover:bg-muted/5 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
                  <Icon name={getUrgencyIcon(item?.urgency)} size={20} color="white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-foreground">{item?.institution}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(item?.urgency)}`}>
                      {item?.urgency}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{item?.issue}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} />
                      <span>{item?.daysOverdue} days overdue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={14} />
                      <span>Assigned to {item?.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={14} />
                      <span>Updated {item?.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="sm" iconName="Eye">
                  View
                </Button>
                <Button variant="default" size="sm" iconName="ArrowRight">
                  Take Action
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 border-t border-border bg-muted/5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {priorityItems?.length} priority items
          </p>
          <Button variant="outline" size="sm" iconName="ArrowRight">
            View All Issues
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriorityQueue;