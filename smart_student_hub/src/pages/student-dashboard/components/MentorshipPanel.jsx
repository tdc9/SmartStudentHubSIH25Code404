import React from 'react';

import Button from '../../../components/ui/Button';

const MentorshipPanel = () => {
  const mentorRemarks = [
    {
      id: 1,
      mentor: "Dr. Sarah Johnson",
      subject: "Computer Science",
      remark: "Excellent progress on the machine learning project. Consider exploring deep learning frameworks for your next research.",
      date: "2025-01-09",
      priority: "high",
      read: false
    },
    {
      id: 2,
      mentor: "Prof. Michael Chen",
      subject: "Data Structures",
      remark: "Good understanding of algorithms. Focus more on time complexity analysis for upcoming assessments.",
      date: "2025-01-08",
      priority: "medium",
      read: false
    },
    {
      id: 3,
      mentor: "Dr. Emily Rodriguez",
      subject: "Software Engineering",
      remark: "Your project documentation is well-structured. Keep up the good work on the development phase.",
      date: "2025-01-07",
      priority: "low",
      read: true
    }
  ];

  const unreadCount = mentorRemarks?.filter(remark => !remark?.read)?.length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Mentorship</h2>
          {unreadCount > 0 && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
              {unreadCount} new
            </span>
          )}
        </div>
        <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
          Chat
        </Button>
      </div>
      <div className="space-y-4 mb-6">
        {mentorRemarks?.slice(0, 3)?.map((remark) => (
          <div 
            key={remark?.id} 
            className={`p-4 rounded-xl border transition-all duration-200 ${
              remark?.read ? 'border-border bg-muted/20' : 'border-accent/20 bg-accent/5'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm">{remark?.mentor}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(remark?.priority)}`}>
                    {remark?.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{remark?.subject}</p>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(remark?.date)}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{remark?.remark}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <Button variant="ghost" fullWidth iconName="Users" iconPosition="left">
          View All Mentors
        </Button>
        <Button variant="outline" fullWidth iconName="Calendar" iconPosition="left">
          Schedule Meeting
        </Button>
      </div>
    </div>
  );
};

export default MentorshipPanel;