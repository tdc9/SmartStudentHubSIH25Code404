import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const skills = [
    {
      id: 1,
      name: "JavaScript",
      category: "programming",
      level: 90,
      endorsements: 12,
      verified: true,
      projects: 8,
      certifications: ["JavaScript Fundamentals - FreeCodeCamp"],
      description: "Proficient in ES6+, async/await, DOM manipulation, and modern JavaScript frameworks."
    },
    {
      id: 2,
      name: "React.js",
      category: "frontend",
      level: 85,
      endorsements: 10,
      verified: true,
      projects: 6,
      certifications: ["React Developer Certification - Meta"],
      description: "Experienced in building responsive web applications with React hooks, context API, and state management."
    },
    {
      id: 3,
      name: "Node.js",
      category: "backend",
      level: 80,
      endorsements: 8,
      verified: true,
      projects: 5,
      certifications: ["Node.js Application Development - IBM"],
      description: "Skilled in building RESTful APIs, server-side applications, and working with Express.js framework."
    },
    {
      id: 4,
      name: "Python",
      category: "programming",
      level: 88,
      endorsements: 15,
      verified: true,
      projects: 12,
      certifications: ["Python for Data Science - Coursera", "Django Web Framework - Udemy"],
      description: "Strong foundation in Python for web development, data analysis, and machine learning applications."
    },
    {
      id: 5,
      name: "Machine Learning",
      category: "ai",
      level: 75,
      endorsements: 6,
      verified: true,
      projects: 4,
      certifications: ["Machine Learning Specialization - Stanford"],
      description: "Knowledge of supervised/unsupervised learning, neural networks, and popular ML libraries."
    },
    {
      id: 6,
      name: "MongoDB",
      category: "database",
      level: 70,
      endorsements: 5,
      verified: false,
      projects: 4,
      certifications: [],
      description: "Experience with NoSQL database design, aggregation pipelines, and database optimization."
    },
    {
      id: 7,
      name: "Git & GitHub",
      category: "tools",
      level: 85,
      endorsements: 9,
      verified: true,
      projects: 15,
      certifications: ["Git Version Control - Atlassian"],
      description: "Proficient in version control, branching strategies, and collaborative development workflows."
    },
    {
      id: 8,
      name: "AWS",
      category: "cloud",
      level: 65,
      endorsements: 4,
      verified: false,
      projects: 3,
      certifications: ["AWS Cloud Practitioner - Amazon"],
      description: "Basic knowledge of cloud services, EC2, S3, and serverless architecture deployment."
    },
    {
      id: 9,
      name: "Data Structures & Algorithms",
      category: "programming",
      level: 92,
      endorsements: 18,
      verified: true,
      projects: 0,
      certifications: ["Algorithms Specialization - Stanford"],
      description: "Strong understanding of time/space complexity, sorting algorithms, and problem-solving techniques."
    },
    {
      id: 10,
      name: "UI/UX Design",
      category: "design",
      level: 60,
      endorsements: 3,
      verified: false,
      projects: 2,
      certifications: [],
      description: "Basic understanding of user interface design principles and user experience best practices."
    }
  ];

  const categories = [
    { value: 'all', label: 'All Skills', icon: 'Code' },
    { value: 'programming', label: 'Programming', icon: 'Terminal' },
    { value: 'frontend', label: 'Frontend', icon: 'Monitor' },
    { value: 'backend', label: 'Backend', icon: 'Server' },
    { value: 'database', label: 'Database', icon: 'Database' },
    { value: 'ai', label: 'AI/ML', icon: 'Brain' },
    { value: 'cloud', label: 'Cloud', icon: 'Cloud' },
    { value: 'tools', label: 'Tools', icon: 'Wrench' },
    { value: 'design', label: 'Design', icon: 'Palette' }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills?.filter(skill => skill?.category === selectedCategory);

  const getSkillLevelColor = (level) => {
    if (level >= 90) return 'bg-success';
    if (level >= 80) return 'bg-accent';
    if (level >= 70) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  const getSkillLevelText = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  const averageSkillLevel = Math.round(skills?.reduce((sum, skill) => sum + skill?.level, 0) / skills?.length);
  const totalEndorsements = skills?.reduce((sum, skill) => sum + skill?.endorsements, 0);
  const verifiedSkills = skills?.filter(skill => skill?.verified)?.length;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Code" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Skills & Competencies</h2>
            <p className="text-sm text-muted-foreground">
              {skills?.length} skills • {verifiedSkills} verified • {totalEndorsements} endorsements
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Average Level</p>
            <p className="text-2xl font-bold text-accent">{averageSkillLevel}%</p>
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <Button
            key={category?.value}
            variant={selectedCategory === category?.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category?.value)}
            iconName={category?.icon}
            iconPosition="left"
            className="text-xs"
          >
            {category?.label}
          </Button>
        ))}
      </div>
      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSkills?.map((skill) => (
          <div key={skill?.id} className="bg-muted/30 border border-border rounded-xl p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{skill?.name}</h3>
                  {skill?.verified && (
                    <Icon name="CheckCircle" size={16} className="text-success" title="Verified Skill" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {getSkillLevelText(skill?.level)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{skill?.description}</p>
                
                {/* Skill Level Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Proficiency</span>
                    <span className="text-xs font-medium text-foreground">{skill?.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getSkillLevelColor(skill?.level)}`}
                      style={{ width: `${skill?.level}%` }}
                    />
                  </div>
                </div>
                
                {/* Skill Stats */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="ThumbsUp" size={12} />
                    <span>{skill?.endorsements} endorsements</span>
                  </div>
                  
                  {skill?.projects > 0 && (
                    <div className="flex items-center gap-1">
                      <Icon name="FolderOpen" size={12} />
                      <span>{skill?.projects} projects</span>
                    </div>
                  )}
                  
                  {skill?.certifications?.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Icon name="Award" size={12} />
                      <span>{skill?.certifications?.length} certificates</span>
                    </div>
                  )}
                </div>
                
                {/* Certifications */}
                {skill?.certifications?.length > 0 && (
                  <div className="space-y-1">
                    {skill?.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Icon name="Award" size={12} className="text-accent" />
                        <span className="text-xs text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Plus"
                  iconSize={16}
                  title="Add Endorsement"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="ExternalLink"
                  iconSize={16}
                  title="View Projects"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredSkills?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Code" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No skills found in this category.</p>
        </div>
      )}
      {/* Skill Development Recommendations */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Lightbulb" size={16} className="text-accent" />
          <h4 className="font-medium text-foreground">Skill Development Recommendations</h4>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Consider adding Docker and Kubernetes to strengthen your DevOps skills</p>
          <p>• TypeScript would complement your JavaScript expertise</p>
          <p>• GraphQL could enhance your API development capabilities</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;