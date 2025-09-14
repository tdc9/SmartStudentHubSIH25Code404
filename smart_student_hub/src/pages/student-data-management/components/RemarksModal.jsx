import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RemarksModal = ({ 
  isOpen, 
  onClose, 
  student, 
  action, 
  onSubmit 
}) => {
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!remarks?.trim()) return;

    setIsSubmitting(true);
    await onSubmit(student?.id, action, remarks);
    setIsSubmitting(false);
    setRemarks('');
    onClose();
  };

  const handleClose = () => {
    setRemarks('');
    onClose();
  };

  const actionConfig = {
    approve: {
      title: 'Approve Achievement',
      color: 'text-success',
      icon: 'CheckCircle',
      placeholder: 'Add approval remarks (optional)...'
    },
    reject: {
      title: 'Reject Achievement',
      color: 'text-error',
      icon: 'XCircle',
      placeholder: 'Please provide reason for rejection...'
    }
  };

  const config = actionConfig?.[action] || actionConfig?.approve;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              action === 'approve' ? 'bg-success/20' : 'bg-error/20'
            }`}>
              <Icon name={config?.icon} size={20} className={config?.color} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{config?.title}</h2>
              <p className="text-sm text-muted-foreground">Student: {student?.name}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Student Info */}
          <div className="mb-6 p-4 bg-muted/10 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Department:</span>
                <div className="font-medium text-foreground">{student?.department}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Year:</span>
                <div className="font-medium text-foreground">{student?.year}</div>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Achievement:</span>
                <div className="font-medium text-foreground">{student?.achievementTitle}</div>
              </div>
            </div>
          </div>

          {/* Remarks Input */}
          <div className="mb-6">
            <Input
              label="Remarks"
              type="text"
              placeholder={config?.placeholder}
              value={remarks}
              onChange={(e) => setRemarks(e?.target?.value)}
              required={action === 'reject'}
              description={action === 'reject' ? 'Rejection reason is required' : 'Optional feedback for the student'}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={action === 'approve' ? 'default' : 'destructive'}
              loading={isSubmitting}
              iconName={config?.icon}
              iconPosition="left"
              iconSize={16}
              disabled={action === 'reject' && !remarks?.trim()}
              className={action === 'approve' ? 'bg-success hover:bg-success/90' : ''}
            >
              {action === 'approve' ? 'Approve' : 'Reject'} Achievement
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RemarksModal;