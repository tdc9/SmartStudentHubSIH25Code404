import React, { useState } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AddAchievementModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    achievementDate: '',
    institution: '',
    grade: '',
    files: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const categoryOptions = [
    { value: 'academic', label: 'Academic Excellence' },
    { value: 'research', label: 'Research & Publications' },
    { value: 'extracurricular', label: 'Extracurricular Activities' },
    { value: 'sports', label: 'Sports & Athletics' },
    { value: 'leadership', label: 'Leadership & Service' },
    { value: 'technical', label: 'Technical Skills' },
    { value: 'internship', label: 'Internships & Work Experience' },
    { value: 'certification', label: 'Certifications & Courses' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (files) => {
    const validFiles = Array.from(files)?.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes?.includes(file?.type)) {
        alert(`${file?.name} is not a supported file type. Please upload images, PDFs, or Word documents.`);
        return false;
      }
      
      if (file?.size > maxSize) {
        alert(`${file?.name} is too large. Please upload files smaller than 10MB.`);
        return false;
      }
      
      return true;
    });

    setFormData(prev => ({
      ...prev,
      files: [...prev?.files, ...validFiles]?.slice(0, 5) // Max 5 files
    }));
  };

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
      handleFileUpload(e?.dataTransfer?.files);
    }
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev?.files?.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) newErrors.title = 'Achievement title is required';
    if (!formData?.category) newErrors.category = 'Category is required';
    if (!formData?.description?.trim()) newErrors.description = 'Description is required';
    if (!formData?.achievementDate) newErrors.achievementDate = 'Achievement date is required';
    if (formData?.files?.length === 0) newErrors.files = 'At least one supporting document is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const achievementData = {
        ...formData,
        id: Date.now()?.toString(),
        submissionDate: new Date()?.toISOString(),
        status: 'pending',
        feedback: null
      };
      
      await onSubmit(achievementData);
      handleClose();
    } catch (error) {
      console.error('Error submitting achievement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      achievementDate: '',
      institution: '',
      grade: '',
      files: []
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('image')) return 'Image';
    if (fileType?.includes('pdf')) return 'FileText';
    if (fileType?.includes('word')) return 'FileText';
    return 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Achievement"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <ModalBody className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Achievement Title"
              type="text"
              placeholder="e.g., Dean's List Fall 2024"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              required
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              placeholder="Select category"
              error={errors?.category}
              required
            />
          </div>

          <Input
            label="Description"
            type="text"
            placeholder="Provide details about your achievement..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            error={errors?.description}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Achievement Date"
              type="date"
              value={formData?.achievementDate}
              onChange={(e) => handleInputChange('achievementDate', e?.target?.value)}
              error={errors?.achievementDate}
              required
            />

            <Input
              label="Institution/Organization"
              type="text"
              placeholder="e.g., University Name"
              value={formData?.institution}
              onChange={(e) => handleInputChange('institution', e?.target?.value)}
            />

            <Input
              label="Grade/Score (Optional)"
              type="text"
              placeholder="e.g., A+, 95%, 3.8 GPA"
              value={formData?.grade}
              onChange={(e) => handleInputChange('grade', e?.target?.value)}
            />
          </div>

          {/* File Upload Section */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Supporting Documents *
            </label>
            <div
              className={`
                border-2 border-dashed rounded-lg p-6 text-center transition-colors
                ${dragActive 
                  ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                }
                ${errors?.files ? 'border-red-500' : ''}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-foreground font-medium mb-1">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports: Images, PDFs, Word documents (Max 10MB each, up to 5 files)
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e?.target?.files)}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                iconName="Plus"
                iconPosition="left"
              >
                Choose Files
              </Button>
            </div>
            {errors?.files && (
              <p className="text-sm text-red-400 mt-1">{errors?.files}</p>
            )}
          </div>

          {/* Uploaded Files */}
          {formData?.files?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Uploaded Files ({formData?.files?.length}/5)
              </h4>
              <div className="space-y-2">
                {formData?.files?.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                  >
                    <Icon name={getFileIcon(file?.type)} size={20} className="text-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file?.size)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      iconName="X"
                      iconSize={16}
                    >
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
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
            loading={isSubmitting}
            iconName="Plus"
            iconPosition="left"
          >
            Add Achievement
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddAchievementModal;