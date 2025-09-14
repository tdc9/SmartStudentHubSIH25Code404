import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending Review',
          icon: 'Clock',
          className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        };
      case 'approved':
        return {
          label: 'Approved',
          icon: 'CheckCircle',
          className: 'bg-green-500/10 text-green-400 border-green-500/20'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          icon: 'XCircle',
          className: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
      case 'needs_revision':
        return {
          label: 'Needs Revision',
          icon: 'AlertCircle',
          className: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
        };
      default:
        return {
          label: 'Unknown',
          icon: 'HelpCircle',
          className: 'bg-muted text-muted-foreground border-border'
        };
    }
  };

  const config = getStatusConfig();
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  const iconSize = size === 'sm' ? 14 : 16;

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full border font-medium
      ${sizeClasses} ${config?.className}
    `}>
      <Icon name={config?.icon} size={iconSize} />
      {config?.label}
    </span>
  );
};

export default StatusBadge;