import React from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import StatusBadge from './StatusBadge';

const AchievementDetailsModal = ({ isOpen, onClose, achievement, onEdit }) => {
  if (!achievement) return null;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category) => {
    const categoryMap = {
      academic: 'Academic Excellence',
      research: 'Research & Publications',
      extracurricular: 'Extracurricular Activities',
      sports: 'Sports & Athletics',
      leadership: 'Leadership & Service',
      technical: 'Technical Skills',
      internship: 'Internships & Work Experience',
      certification: 'Certifications & Courses'
    };
    return categoryMap?.[category] || category;
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif']?.includes(extension)) return 'Image';
    if (extension === 'pdf') return 'FileText';
    if (['doc', 'docx']?.includes(extension)) return 'FileText';
    return 'File';
  };

  const handleFileDownload = (fileName) => {
    // Mock download functionality
    console.log('Downloading file:', fileName);
    // In a real app, this would trigger actual file download
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Achievement Details"
      size="lg"
    >
      <ModalBody className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {achievement?.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{getCategoryLabel(achievement?.category)}</span>
              <span>•</span>
              <span>Submitted: {formatDate(achievement?.submissionDate)}</span>
            </div>
          </div>
          <StatusBadge status={achievement?.status} />
        </div>

        {/* Achievement Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
              <p className="text-muted-foreground">{achievement?.description}</p>
            </div>

            {achievement?.achievementDate && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Achievement Date</h4>
                <p className="text-muted-foreground">{formatDate(achievement?.achievementDate)}</p>
              </div>
            )}

            {achievement?.institution && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Institution/Organization</h4>
                <p className="text-muted-foreground">{achievement?.institution}</p>
              </div>
            )}

            {achievement?.grade && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Grade/Score</h4>
                <p className="text-muted-foreground">{achievement?.grade}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Supporting Documents */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Supporting Documents</h4>
              <div className="space-y-2">
                {achievement?.files && achievement?.files?.length > 0 ? (
                  achievement?.files?.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <Icon name={getFileIcon(file?.name)} size={20} className="text-accent" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {file?.size ? `${(file?.size / 1024 / 1024)?.toFixed(2)} MB` : 'Unknown size'}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleFileDownload(file?.name)}
                        iconName="Download"
                        iconSize={16}
                      >
                        <span className="sr-only">Download file</span>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No documents uploaded</p>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Submitted</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(achievement?.submissionDate)}
                    </p>
                  </div>
                </div>
                
                {achievement?.reviewDate && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Reviewed</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(achievement?.reviewDate)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        {achievement?.feedback && (
          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Icon name="MessageSquare" size={16} />
              Reviewer Feedback
            </h4>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground">{achievement?.feedback}</p>
              {achievement?.reviewerName && (
                <p className="text-xs text-muted-foreground mt-2">
                  - {achievement?.reviewerName}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Required Section */}
        {(achievement?.status === 'rejected' || achievement?.status === 'needs_revision') && (
          <div className="border-t border-border pt-6">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="AlertCircle" size={20} className="text-orange-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-orange-400 mb-1">Action Required</h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement?.status === 'rejected' ?'This achievement was rejected. Please review the feedback and resubmit with corrections.' :'Additional documentation or revisions are needed. Please upload the required proof or make necessary changes.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {(achievement?.status === 'rejected' || achievement?.status === 'needs_revision') && (
          <Button
            onClick={() => {
              onEdit(achievement);
              onClose();
            }}
            iconName={achievement?.status === 'rejected' ? 'RefreshCw' : 'Upload'}
            iconPosition="left"
          >
            {achievement?.status === 'rejected' ? 'Resubmit' : 'Upload Proof'}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default AchievementDetailsModal;