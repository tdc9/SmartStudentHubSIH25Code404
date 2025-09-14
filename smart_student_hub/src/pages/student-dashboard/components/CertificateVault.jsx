import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CertificateVault = () => {
  const certificates = [
    {
      id: 1,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024-12-28",
      type: "certification",
      verified: true,
      recent: true,
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      title: "React Developer Certificate",
      issuer: "Meta",
      date: "2024-12-15",
      type: "course",
      verified: true,
      recent: true,
      fileSize: "1.8 MB"
    },
    {
      id: 3,
      title: "Hackathon Winner Certificate",
      issuer: "TechFest 2024",
      date: "2024-12-10",
      type: "achievement",
      verified: false,
      recent: false,
      fileSize: "3.2 MB"
    },
    {
      id: 4,
      title: "Internship Completion",
      issuer: "Tech Solutions Inc.",
      date: "2024-11-30",
      type: "internship",
      verified: true,
      recent: false,
      fileSize: "1.5 MB"
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'certification':
        return 'Award';
      case 'course':
        return 'BookOpen';
      case 'achievement':
        return 'Trophy';
      case 'internship':
        return 'Briefcase';
      default:
        return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'certification':
        return 'text-accent bg-accent/10';
      case 'course':
        return 'text-primary bg-primary/10';
      case 'achievement':
        return 'text-warning bg-warning/10';
      case 'internship':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalCertificates = certificates?.length;
  const verifiedCount = certificates?.filter(cert => cert?.verified)?.length;
  const recentCount = certificates?.filter(cert => cert?.recent)?.length;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Certificate Vault</h2>
        <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
          Upload
        </Button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/20 rounded-xl">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{totalCertificates}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-success">{verifiedCount}</div>
          <div className="text-xs text-muted-foreground">Verified</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-accent">{recentCount}</div>
          <div className="text-xs text-muted-foreground">Recent</div>
        </div>
      </div>
      {/* Recent Certificates */}
      <div className="space-y-3 mb-6">
        {certificates?.slice(0, 3)?.map((certificate) => (
          <div 
            key={certificate?.id} 
            className={`p-4 border rounded-xl transition-all duration-200 hover:border-accent/20 cursor-pointer ${
              certificate?.recent ? 'border-accent/20 bg-accent/5' : 'border-border'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(certificate?.type)}`}>
                <Icon name={getTypeIcon(certificate?.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm leading-tight">{certificate?.title}</h3>
                  <div className="flex items-center gap-1">
                    {certificate?.verified && (
                      <Icon name="CheckCircle" size={14} className="text-success" />
                    )}
                    {certificate?.recent && (
                      <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{certificate?.issuer}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(certificate?.date)}</span>
                  <span>{certificate?.fileSize}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Button variant="ghost" fullWidth iconName="FolderOpen" iconPosition="left">
          View All Certificates
        </Button>
        <Button variant="outline" fullWidth iconName="Share2" iconPosition="left">
          Share Portfolio
        </Button>
      </div>
    </div>
  );
};

export default CertificateVault;