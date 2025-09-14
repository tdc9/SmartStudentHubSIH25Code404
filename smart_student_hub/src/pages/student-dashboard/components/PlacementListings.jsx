import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlacementListings = () => {
  const placements = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer Intern",
      location: "Mountain View, CA",
      type: "Internship",
      salary: "$8,000/month",
      deadline: "2025-01-20",
      skillMatch: 92,
      requiredSkills: ["React", "JavaScript", "Python", "Data Structures"],
      matchedSkills: ["React", "JavaScript", "Python"],
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Frontend Developer",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$120,000/year",
      deadline: "2025-01-25",
      skillMatch: 88,
      requiredSkills: ["React", "TypeScript", "Azure", "Node.js"],
      matchedSkills: ["React", "TypeScript"],
      logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 3,
      company: "Amazon",
      position: "Cloud Solutions Architect",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$135,000/year",
      deadline: "2025-02-01",
      skillMatch: 76,
      requiredSkills: ["AWS", "Python", "Docker", "Kubernetes"],
      matchedSkills: ["AWS", "Python"],
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&crop=center"
    }
  ];

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10';
    if (percentage >= 75) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Expired';
    if (diffDays === 1) return '1 day left';
    if (diffDays <= 7) return `${diffDays} days left`;
    
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Placement Opportunities</h2>
        <Button variant="outline" size="sm" iconName="Search" iconPosition="left">
          Browse All
        </Button>
      </div>
      <div className="space-y-4 mb-6">
        {placements?.map((placement) => (
          <div key={placement?.id} className="p-4 border border-border rounded-xl hover:border-accent/20 transition-all duration-200 cursor-pointer micro-interaction">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg overflow-hidden">
                <img 
                  src={placement?.logo} 
                  alt={`${placement?.company} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-medium text-foreground text-sm mb-1">{placement?.position}</h3>
                    <p className="text-sm text-muted-foreground">{placement?.company}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(placement?.skillMatch)}`}>
                    {placement?.skillMatch}% match
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    <span>{placement?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Briefcase" size={12} />
                    <span>{placement?.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="DollarSign" size={12} />
                    <span>{placement?.salary}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {placement?.requiredSkills?.map((skill) => {
                    const isMatched = placement?.matchedSkills?.includes(skill);
                    return (
                      <span 
                        key={skill} 
                        className={`text-xs px-2 py-1 rounded-full ${
                          isMatched 
                            ? 'bg-success/10 text-success border border-success/20' :'bg-muted/20 text-muted-foreground'
                        }`}
                      >
                        {skill}
                        {isMatched && <Icon name="Check" size={10} className="inline ml-1" />}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Deadline: {formatDeadline(placement?.deadline)}
                  </span>
                  <Button variant="outline" size="sm">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Button variant="ghost" fullWidth iconName="Target" iconPosition="left">
          Skill Recommendations
        </Button>
        <Button variant="outline" fullWidth iconName="Bell" iconPosition="left">
          Set Job Alerts
        </Button>
      </div>
    </div>
  );
};

export default PlacementListings;