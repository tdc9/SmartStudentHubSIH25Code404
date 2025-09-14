import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCalendarWidget = () => {
  const [currentDate] = useState(new Date());
  
  const events = [
    {
      id: 1,
      title: "Assignment Submission",
      subject: "Data Structures",
      date: "2025-01-12",
      time: "11:59 PM",
      type: "deadline",
      priority: "high"
    },
    {
      id: 2,
      title: "Guest Lecture: AI Ethics",
      subject: "Computer Science",
      date: "2025-01-15",
      time: "2:00 PM",
      type: "event",
      priority: "medium"
    },
    {
      id: 3,
      title: "Mid-term Examination",
      subject: "Software Engineering",
      date: "2025-01-18",
      time: "9:00 AM",
      type: "exam",
      priority: "high"
    },
    {
      id: 4,
      title: "Project Presentation",
      subject: "Machine Learning",
      date: "2025-01-20",
      time: "3:30 PM",
      type: "presentation",
      priority: "high"
    },
    {
      id: 5,
      title: "Career Fair",
      subject: "General",
      date: "2025-01-25",
      time: "10:00 AM",
      type: "event",
      priority: "medium"
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'deadline':
        return 'Clock';
      case 'exam':
        return 'FileText';
      case 'presentation':
        return 'Presentation';
      case 'event':
        return 'Calendar';
      default:
        return 'Calendar';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const upcomingEvents = events?.filter(event => new Date(event.date) >= currentDate)?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 4);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
        <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
          View Calendar
        </Button>
      </div>
      <div className="space-y-3 mb-6">
        {upcomingEvents?.map((event) => (
          <div 
            key={event?.id} 
            className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${getPriorityColor(event?.priority)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={getEventIcon(event?.type)} size={16} className="text-accent" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm mb-1">{event?.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{event?.subject}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>{event?.time}</span>
                  </div>
                  <span className="text-xs font-medium text-accent">
                    {formatDate(event?.date)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Button variant="ghost" fullWidth iconName="Plus" iconPosition="left">
          Add Event
        </Button>
        <Button variant="outline" fullWidth iconName="Bell" iconPosition="left">
          Set Reminders
        </Button>
      </div>
    </div>
  );
};

export default EventCalendarWidget;