import React from 'react';

import Button from '../../../components/ui/Button';

const BulkActionBar = ({ 
  selectedCount, 
  onBulkApprove, 
  onBulkReject, 
  onBulkExport, 
  onClearSelection 
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-card px-6 py-4 shadow-2xl border border-border/50">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">{selectedCount}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCount} record{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-border"></div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={onBulkApprove}
              iconName="Check"
              iconPosition="left"
              iconSize={14}
              className="bg-success hover:bg-success/90"
            >
              Approve All
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkReject}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="border-error text-error hover:bg-error/10"
            >
              Reject All
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export Selected
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;