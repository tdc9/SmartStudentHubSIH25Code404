import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ 
  filters, 
  onFiltersChange, 
  totalRecords, 
  filteredRecords,
  onBulkUpload,
  onExport 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' }
  ];

  const yearOptions = [
    { value: '', label: 'All Years' },
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ];

  const courseOptions = [
    { value: '', label: 'All Courses' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'under-review', label: 'Under Review' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onFiltersChange({ ...filters, search: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      department: '',
      year: '',
      course: '',
      status: '',
      search: ''
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="glass-card p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Student Records</h2>
          <p className="text-sm text-muted-foreground">
            Showing {filteredRecords?.toLocaleString()} of {totalRecords?.toLocaleString()} records
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkUpload}
            iconName="Upload"
            iconPosition="left"
            iconSize={16}
          >
            Bulk Upload
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export Data
          </Button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search by student name, ID, or achievement..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-md"
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
          placeholder="Select department"
        />

        <Select
          label="Academic Year"
          options={yearOptions}
          value={filters?.year}
          onChange={(value) => handleFilterChange('year', value)}
          placeholder="Select year"
        />

        <Select
          label="Course Type"
          options={courseOptions}
          value={filters?.course}
          onChange={(value) => handleFilterChange('course', value)}
          placeholder="Select course"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Select status"
        />
      </div>
      {/* Filter Actions */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Active filters applied</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;