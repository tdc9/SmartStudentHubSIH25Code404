import React from 'react';
import Icon from '../../../components/AppIcon';

const EducationSection = () => {
  const education = [
    {
      id: 1,
      institution: "Indian Institute of Technology, Mumbai",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      startDate: "2021-07-01",
      endDate: "2025-05-31",
      status: "current",
      gpa: "9.2",
      maxGpa: "10.0",
      achievements: [
        "Dean\'s List for 4 consecutive semesters",
        "President of Computer Science Society",
        "Winner of Inter-IIT Tech Meet 2024"
      ],
      coursework: [
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Machine Learning",
        "Software Engineering",
        "Computer Networks",
        "Operating Systems"
      ],
      projects: [
        "Final Year Project: AI-based Medical Diagnosis System",
        "Semester Project: Distributed File System"
      ]
    },
    {
      id: 2,
      institution: "Delhi Public School, Mumbai",
      degree: "Higher Secondary Certificate",
      field: "Science (PCM + Computer Science)",
      startDate: "2019-04-01",
      endDate: "2021-03-31",
      status: "completed",
      gpa: "95.2",
      maxGpa: "100.0",
      achievements: [
        "School Topper in Computer Science",
        "National Merit Scholarship recipient",
        "Captain of School Programming Club"
      ],
      coursework: [
        "Physics",
        "Chemistry", 
        "Mathematics",
        "Computer Science",
        "English"
      ],
      projects: [
        "School Management System using Python",
        "Scientific Calculator using C++"
      ]
    },
    {
      id: 3,
      institution: "Delhi Public School, Mumbai",
      degree: "Secondary School Certificate",
      field: "General Studies",
      startDate: "2017-04-01",
      endDate: "2019-03-31",
      status: "completed",
      gpa: "92.8",
      maxGpa: "100.0",
      achievements: [
        "House Captain",
        "Best Student in Mathematics",
        "Winner of State Level Science Olympiad"
      ],
      coursework: [
        "Mathematics",
        "Science",
        "Social Studies",
        "English",
        "Hindi"
      ],
      projects: []
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "2024-09-15",
      expiryDate: "2027-09-15",
      credentialId: "AWS-CCP-2024-001234",
      verified: true,
      skills: ["Cloud Computing", "AWS Services", "Cloud Architecture"]
    },
    {
      id: 2,
      name: "Google Summer of Code 2024",
      issuer: "Google LLC",
      issueDate: "2024-09-30",
      expiryDate: null,
      credentialId: "GSOC-2024-5678",
      verified: true,
      skills: ["Open Source", "React", "Node.js"]
    },
    {
      id: 3,
      name: "Machine Learning Specialization",
      issuer: "Stanford University (Coursera)",
      issueDate: "2024-06-20",
      expiryDate: null,
      credentialId: "COURSERA-ML-9012",
      verified: true,
      skills: ["Machine Learning", "Python", "TensorFlow"]
    },
    {
      id: 4,
      name: "React Developer Certification",
      issuer: "Meta (Facebook)",
      issueDate: "2024-03-10",
      expiryDate: "2026-03-10",
      credentialId: "META-REACT-3456",
      verified: true,
      skills: ["React", "JavaScript", "Frontend Development"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'current': return 'Current';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const sixMonthsFromNow = new Date(now.getTime() + (6 * 30 * 24 * 60 * 60 * 1000));
    return expiry <= sixMonthsFromNow;
  };

  return (
    <div className="space-y-6">
      {/* Education Section */}
      <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Education</h2>
            <p className="text-sm text-muted-foreground">Academic background and qualifications</p>
          </div>
        </div>

        <div className="space-y-6">
          {education?.map((edu, index) => (
            <div key={edu?.id} className="relative">
              {/* Timeline Line */}
              {index < education?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
              )}
              
              <div className="flex gap-4">
                {/* Timeline Dot */}
                <div className={`w-3 h-3 rounded-full mt-2 ${edu?.status === 'current' ? 'bg-success' : 'bg-muted-foreground'}`} />
                
                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-muted/30 border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{edu?.institution}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(edu?.status)}`}>
                            {getStatusText(edu?.status)}
                          </span>
                        </div>
                        <p className="text-foreground font-medium">{edu?.degree}</p>
                        <p className="text-muted-foreground text-sm">{edu?.field}</p>
                        <p className="text-muted-foreground text-sm">
                          {formatDate(edu?.startDate)} - {edu?.status === 'current' ? 'Present' : formatDate(edu?.endDate)}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-success">{edu?.gpa}</div>
                        <div className="text-xs text-muted-foreground">/ {edu?.maxGpa}</div>
                      </div>
                    </div>

                    {/* Achievements */}
                    {edu?.achievements?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Achievements:</h4>
                        <div className="space-y-1">
                          {edu?.achievements?.map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Icon name="Award" size={12} className="text-accent" />
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Relevant Coursework */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Relevant Coursework:</h4>
                      <div className="flex flex-wrap gap-1">
                        {edu?.coursework?.map((course, idx) => (
                          <span key={idx} className="bg-accent/10 text-accent px-2 py-1 rounded-md text-xs">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    {edu?.projects?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Notable Projects:</h4>
                        <div className="space-y-1">
                          {edu?.projects?.map((project, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Icon name="FolderOpen" size={12} className="text-primary" />
                              <span className="text-sm text-muted-foreground">{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications Section */}
      <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Certifications</h2>
              <p className="text-sm text-muted-foreground">
                {certifications?.length} certifications • {certifications?.filter(c => c?.verified)?.length} verified
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="bg-muted/30 border border-border rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{cert?.name}</h3>
                    {cert?.verified && (
                      <Icon name="CheckCircle" size={16} className="text-success" title="Verified" />
                    )}
                    {cert?.expiryDate && isExpiringSoon(cert?.expiryDate) && (
                      <Icon name="AlertTriangle" size={16} className="text-warning" title="Expiring Soon" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{cert?.issuer}</p>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      <span>Issued: {formatDate(cert?.issueDate)}</span>
                    </div>
                    {cert?.expiryDate && (
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        <span>Expires: {formatDate(cert?.expiryDate)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Icon name="Hash" size={12} />
                      <span>ID: {cert?.credentialId}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Icon name="ExternalLink" size={16} className="text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {cert?.skills?.map((skill, idx) => (
                  <span key={idx} className="bg-accent/10 text-accent px-2 py-1 rounded-md text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;