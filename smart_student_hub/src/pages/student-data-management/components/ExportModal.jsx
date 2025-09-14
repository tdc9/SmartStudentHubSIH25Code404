import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ 
  isOpen, 
  onClose, 
  selectedCount, 
  totalCount, 
  onExport 
}) => {
  const [exportFormat, setExportFormat] = useState('excel');
  const [exportScope, setExportScope] = useState('selected');
  const [includeFields, setIncludeFields] = useState({
    studentInfo: true,
    achievements: true,
    status: true,
    dates: true,
    remarks: false
  });
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const formatOptions = [
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'csv', label: 'CSV (.csv)' },
    { value: 'pdf', label: 'PDF (.pdf)' }
  ];

  const scopeOptions = [
    { value: 'selected', label: `Selected Records (${selectedCount})` },
    { value: 'all', label: `All Records (${totalCount})` },
    { value: 'filtered', label: 'Current Filtered Results' }
  ];

  const handleFieldChange = (field, checked) => {
    setIncludeFields(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exportData = {
      format: exportFormat,
      scope: exportScope,
      fields: includeFields,
      timestamp: new Date()?.toISOString()
    };

    onExport(exportData);
    setIsExporting(false);
    onClose();
  };

  const getFileIcon = (format) => {
    switch (format) {
      case 'excel': return 'FileSpreadsheet';
      case 'csv': return 'FileText';
      case 'pdf': return 'FileText';
      default: return 'Download';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Export Data</h2>
              <p className="text-sm text-muted-foreground">Download student records</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
              description="Choose the file format for your export"
            />
          </div>

          {/* Export Scope */}
          <div>
            <Select
              label="Export Scope"
              options={scopeOptions}
              value={exportScope}
              onChange={setExportScope}
              description="Select which records to include"
            />
          </div>

          {/* Include Fields */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Include Fields
            </label>
            <div className="space-y-3">
              <Checkbox
                label="Student Information"
                description="Name, ID, department, course, year"
                checked={includeFields?.studentInfo}
                onChange={(e) => handleFieldChange('studentInfo', e?.target?.checked)}
              />
              <Checkbox
                label="Achievement Details"
                description="Achievement type, title, description"
                checked={includeFields?.achievements}
                onChange={(e) => handleFieldChange('achievements', e?.target?.checked)}
              />
              <Checkbox
                label="Status Information"
                description="Current status, approval status"
                checked={includeFields?.status}
                onChange={(e) => handleFieldChange('status', e?.target?.checked)}
              />
              <Checkbox
                label="Date Information"
                description="Submission date, approval date"
                checked={includeFields?.dates}
                onChange={(e) => handleFieldChange('dates', e?.target?.checked)}
              />
              <Checkbox
                label="Remarks & Comments"
                description="Approval/rejection remarks"
                checked={includeFields?.remarks}
                onChange={(e) => handleFieldChange('remarks', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Export Preview */}
          <div className="p-4 bg-muted/10 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name={getFileIcon(exportFormat)} size={20} className="text-accent" />
              <div>
                <div className="text-sm font-medium text-foreground">
                  student_records_{new Date()?.toISOString()?.split('T')?.[0]}.{exportFormat === 'excel' ? 'xlsx' : exportFormat}
                </div>
                <div className="text-xs text-muted-foreground">
                  Estimated size: ~{Math.ceil((selectedCount || totalCount) * 0.5)}KB
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {exportScope === 'selected' ? selectedCount : 
               exportScope === 'all' ? totalCount : 'Filtered'} records will be exported
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            {isExporting ? 'Exporting...' : 'Export Data'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;