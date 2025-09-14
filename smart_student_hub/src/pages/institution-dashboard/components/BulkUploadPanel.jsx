import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkUploadPanel = ({ onUpload, onDownloadTemplate }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [validationResults, setValidationResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];

    if (!allowedTypes?.includes(file?.type)) {
      setUploadStatus('error');
      setValidationResults({
        errors: ['Please upload a valid CSV or Excel file'],
        warnings: [],
        validRows: 0,
        totalRows: 0
      });
      return;
    }

    if (file?.size > 10 * 1024 * 1024) { // 10MB limit
      setUploadStatus('error');
      setValidationResults({
        errors: ['File size must be less than 10MB'],
        warnings: [],
        validRows: 0,
        totalRows: 0
      });
      return;
    }

    setUploadedFile(file);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Simulate validation results
          setTimeout(() => {
            setUploadStatus('success');
            setValidationResults({
              errors: ['Row 15: Missing email address', 'Row 23: Invalid department code'],
              warnings: ['Row 8: Phone number format inconsistent', 'Row 12: Duplicate student ID'],
              validRows: 145,
              totalRows: 150
            });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleUploadConfirm = () => {
    if (uploadedFile && validationResults) {
      onUpload(uploadedFile, validationResults);
      // Reset state
      setUploadedFile(null);
      setUploadStatus('idle');
      setUploadProgress(0);
      setValidationResults(null);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setValidationResults(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Bulk Upload</h3>
            <p className="text-sm text-muted-foreground">
              Import student data from CSV or Excel files
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={onDownloadTemplate}
          >
            Download Template
          </Button>
        </div>
      </div>
      <div className="p-6">
        {uploadStatus === 'idle' && (
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive 
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              Drop your file here, or browse
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Supports CSV, XLS, XLSX files up to 10MB
            </p>
            <Button
              variant="outline"
              iconName="FolderOpen"
              onClick={() => fileInputRef?.current?.click()}
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        )}

        {uploadStatus === 'uploading' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="w-16 h-16 border-4 border-muted rounded-full"></div>
              <div 
                className="absolute top-0 left-0 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"
              ></div>
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              Uploading and validating...
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {uploadedFile?.name}
            </p>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
          </div>
        )}

        {uploadStatus === 'success' && validationResults && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <Icon name="CheckCircle" size={24} className="text-green-500" />
              <div>
                <h4 className="font-medium text-foreground">File uploaded successfully</h4>
                <p className="text-sm text-muted-foreground">
                  {validationResults?.validRows} of {validationResults?.totalRows} rows are valid
                </p>
              </div>
            </div>

            {validationResults?.errors?.length > 0 && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertCircle" size={20} className="text-red-500" />
                  <h5 className="font-medium text-foreground">Errors ({validationResults?.errors?.length})</h5>
                </div>
                <ul className="space-y-1">
                  {validationResults?.errors?.map((error, index) => (
                    <li key={index} className="text-sm text-red-500">• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {validationResults?.warnings?.length > 0 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertTriangle" size={20} className="text-amber-500" />
                  <h5 className="font-medium text-foreground">Warnings ({validationResults?.warnings?.length})</h5>
                </div>
                <ul className="space-y-1">
                  {validationResults?.warnings?.map((warning, index) => (
                    <li key={index} className="text-sm text-amber-500">• {warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button
                variant="default"
                iconName="Check"
                onClick={handleUploadConfirm}
                disabled={validationResults?.validRows === 0}
              >
                Import {validationResults?.validRows} Students
              </Button>
              <Button
                variant="outline"
                iconName="X"
                onClick={handleReset}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {uploadStatus === 'error' && validationResults && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <Icon name="AlertCircle" size={24} className="text-red-500" />
              <div>
                <h4 className="font-medium text-foreground">Upload failed</h4>
                <p className="text-sm text-muted-foreground">
                  Please fix the following issues and try again
                </p>
              </div>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <ul className="space-y-1">
                {validationResults?.errors?.map((error, index) => (
                  <li key={index} className="text-sm text-red-500">• {error}</li>
                ))}
              </ul>
            </div>

            <Button
              variant="outline"
              iconName="RotateCcw"
              onClick={handleReset}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-3">Upload Guidelines</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
              <span>Use the provided template for best results</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
              <span>Ensure all required fields are filled</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
              <span>Maximum file size: 10MB</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
              <span>Supported formats: CSV, XLS, XLSX</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadPanel;