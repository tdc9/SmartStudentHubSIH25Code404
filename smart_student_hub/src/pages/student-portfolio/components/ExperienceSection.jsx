import React from 'react';
import Icon from '../../../components/AppIcon';

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions Pvt Ltd",
      location: "Mumbai, Maharashtra",
      type: "internship",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "completed",
      description: "Developed and maintained web applications using React.js and Node.js. Collaborated with senior developers to implement new features and optimize existing codebase for better performance.",
      responsibilities: [
        "Built responsive web components using React.js and Tailwind CSS",
        "Implemented RESTful APIs using Node.js and Express framework",
        "Optimized database queries resulting in 30% performance improvement",
        "Participated in code reviews and agile development processes",
        "Created comprehensive documentation for developed features"
      ],
      technologies: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Git"],
      achievements: [
        "Reduced page load time by 40% through code optimization",
        "Successfully delivered 5 major features ahead of schedule",
        "Received \'Outstanding Intern\' award for exceptional performance"
      ],
      supervisor: "Priya Sharma, Senior Software Engineer",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      referenceAvailable: true
    },
    {
      id: 2,
      title: "Research Assistant",
      company: "IIT Mumbai AI Research Lab",
      location: "Mumbai, Maharashtra",
      type: "research",
      startDate: "2024-01-15",
      endDate: "2024-05-30",
      status: "completed",
      description: "Assisted in cutting-edge research on machine learning applications in healthcare. Contributed to data collection, model development, and research paper preparation.",
      responsibilities: [
        "Collected and preprocessed medical datasets for ML model training",
        "Implemented machine learning algorithms using Python and TensorFlow",
        "Conducted literature review on AI applications in medical diagnosis",
        "Assisted in preparing research papers for publication",
        "Presented findings at departmental research seminars"
      ],
      technologies: ["Python", "TensorFlow", "Pandas", "NumPy", "Jupyter", "LaTeX"],
      achievements: [
        "Co-authored research paper published in International Journal",
        "Developed ML model with 85% accuracy in medical diagnosis",
        "Presented research at National AI Conference 2024"
      ],
      supervisor: "Dr. Rajesh Kumar, Professor of Computer Science",
      companyLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      referenceAvailable: true
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartupXYZ (Freelance)",
      location: "Remote",
      type: "freelance",
      startDate: "2023-09-01",
      endDate: "2023-12-31",
      status: "completed",
      description: "Developed a complete e-learning platform for a startup focusing on skill development courses. Handled both frontend and backend development independently.",
      responsibilities: [
        "Designed and developed responsive web application using MERN stack",
        "Implemented user authentication and authorization system",
        "Created admin dashboard for course and user management",
        "Integrated payment gateway for course purchases",
        "Deployed application on AWS with CI/CD pipeline"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "AWS", "Stripe API"],
      achievements: [
        "Successfully launched platform with 500+ registered users",
        "Implemented secure payment system processing $10k+ transactions",
        "Achieved 99.9% uptime with proper deployment architecture"
      ],
      supervisor: "Amit Patel, Founder & CEO",
      companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
      referenceAvailable: true
    },
    {
      id: 4,
      title: "Teaching Assistant",
      company: "IIT Mumbai - Computer Science Department",
      location: "Mumbai, Maharashtra",
      type: "part-time",
      startDate: "2023-07-01",
      endDate: "2023-11-30",
      status: "completed",
      description: "Assisted professors in teaching undergraduate courses, conducted lab sessions, and helped students with programming assignments and projects.",
      responsibilities: [
        "Conducted weekly lab sessions for Data Structures course",
        "Graded assignments and provided detailed feedback to students",
        "Held office hours to help students with programming concepts",
        "Assisted in creating course materials and programming exercises",
        "Mentored junior students in competitive programming"
      ],
      technologies: ["C++", "Java", "Python", "Data Structures", "Algorithms"],
      achievements: [
        "Improved student performance by 25% in lab assessments",
        "Developed interactive coding exercises for better learning",
        "Received excellent feedback from students and faculty"
      ],
      supervisor: "Prof. Neha Gupta, Associate Professor",
      companyLogo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop",
      referenceAvailable: true
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship': return 'bg-primary text-primary-foreground';
      case 'research': return 'bg-accent text-accent-foreground';
      case 'freelance': return 'bg-warning text-warning-foreground';
      case 'part-time': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'internship': return 'Internship';
      case 'research': return 'Research';
      case 'freelance': return 'Freelance';
      case 'part-time': return 'Part-time';
      default: return 'Experience';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    
    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    }
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  const totalExperience = experiences?.length;
  const internships = experiences?.filter(exp => exp?.type === 'internship')?.length;
  const researchExp = experiences?.filter(exp => exp?.type === 'research')?.length;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Briefcase" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Professional Experience</h2>
            <p className="text-sm text-muted-foreground">
              {totalExperience} experiences • {internships} internships • {researchExp} research
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {experiences?.map((exp, index) => (
          <div key={exp?.id} className="relative">
            {/* Timeline Line */}
            {index < experiences?.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-border" />
            )}
            
            <div className="flex gap-4">
              {/* Timeline Dot & Company Logo */}
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-primary mt-6" />
                <div className="absolute -left-4 top-12 w-11 h-11 rounded-lg overflow-hidden border-2 border-border bg-card">
                  <img 
                    src={exp?.companyLogo} 
                    alt={exp?.company}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="bg-muted/30 border border-border rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{exp?.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(exp?.type)}`}>
                          {getTypeText(exp?.type)}
                        </span>
                      </div>
                      <p className="text-foreground font-medium">{exp?.company}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          <span>{exp?.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>
                            {formatDate(exp?.startDate)} - {formatDate(exp?.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          <span>{calculateDuration(exp?.startDate, exp?.endDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {exp?.referenceAvailable && (
                      <div className="flex items-center gap-1 text-xs text-success">
                        <Icon name="CheckCircle" size={14} />
                        <span>Reference Available</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{exp?.description}</p>

                  {/* Responsibilities */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Responsibilities:</h4>
                    <div className="space-y-1">
                      {exp?.responsibilities?.map((responsibility, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="ChevronRight" size={12} className="text-muted-foreground mt-0.5" />
                          <span className="text-sm text-muted-foreground">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-1">
                      {exp?.technologies?.map((tech, idx) => (
                        <span key={idx} className="bg-accent/10 text-accent px-2 py-1 rounded-md text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Achievements:</h4>
                    <div className="space-y-1">
                      {exp?.achievements?.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Icon name="Award" size={12} className="text-success mt-0.5" />
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supervisor */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Supervisor: </span>
                      <span className="text-foreground font-medium">{exp?.supervisor}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Icon name="ExternalLink" size={16} className="text-muted-foreground cursor-pointer hover:text-foreground" />
                      <Icon name="Mail" size={16} className="text-muted-foreground cursor-pointer hover:text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Experience Summary */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="TrendingUp" size={16} className="text-accent" />
          <h4 className="font-medium text-foreground">Experience Summary</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Experience:</span>
            <span className="text-foreground font-medium ml-2">18+ months</span>
          </div>
          <div>
            <span className="text-muted-foreground">Industries:</span>
            <span className="text-foreground font-medium ml-2">Tech, Education, Research</span>
          </div>
          <div>
            <span className="text-muted-foreground">Key Skills:</span>
            <span className="text-foreground font-medium ml-2">Full Stack, ML, Research</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;