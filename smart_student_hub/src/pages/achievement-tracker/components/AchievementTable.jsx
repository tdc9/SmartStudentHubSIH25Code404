import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const AchievementTable = ({ achievements, onViewDetails, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'submissionDate', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAchievements = [...achievements]?.sort((a, b) => {
    if (sortConfig?.key === 'submissionDate') {
      const dateA = new Date(a.submissionDate);
      const dateB = new Date(b.submissionDate);
      return sortConfig?.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortConfig?.key === 'title') {
      return sortConfig?.direction === 'asc' 
        ? a?.title?.localeCompare(b?.title)
        : b?.title?.localeCompare(a?.title);
    }
    
    if (sortConfig?.key === 'category') {
      return sortConfig?.direction === 'asc'
        ? a?.category?.localeCompare(b?.category)
        : b?.category?.localeCompare(a?.category);
    }
    
    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const getActionButtons = (achievement) => {
    const buttons = [];
    
    switch (achievement?.status) {
      case 'pending':
        buttons?.push(
          <Button
            key="view"
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(achievement)}
            iconName="Eye"
            iconPosition="left"
          >
            View
          </Button>
        );
        break;
        
      case 'approved':
        buttons?.push(
          <Button
            key="view"
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(achievement)}
            iconName="Eye"
            iconPosition="left"
          >
            View
          </Button>
        );
        break;
        
      case 'rejected':
        buttons?.push(
          <Button
            key="feedback"
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(achievement)}
            iconName="MessageSquare"
            iconPosition="left"
          >
            View Feedback
          </Button>,
          <Button
            key="resubmit"
            variant="default"
            size="sm"
            onClick={() => onEdit(achievement)}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Resubmit
          </Button>
        );
        break;
        
      case 'needs_revision':
        buttons?.push(
          <Button
            key="feedback"
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(achievement)}
            iconName="MessageSquare"
            iconPosition="left"
          >
            View Feedback
          </Button>,
          <Button
            key="upload"
            variant="default"
            size="sm"
            onClick={() => onEdit(achievement)}
            iconName="Upload"
            iconPosition="left"
          >
            Upload Proof
          </Button>
        );
        break;
        
      default:
        buttons?.push(
          <Button
            key="view"
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(achievement)}
            iconName="Eye"
            iconPosition="left"
          >
            View
          </Button>
        );
    }
    
    return buttons;
  };

  if (achievements?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <Icon name="Trophy" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Achievements Found</h3>
        <p className="text-muted-foreground mb-4">
          Start building your portfolio by adding your first achievement.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors"
                >
                  Achievement Title
                  <Icon name={getSortIcon('title')} size={16} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors"
                >
                  Category
                  <Icon name={getSortIcon('category')} size={16} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('submissionDate')}
                  className="flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors"
                >
                  Submission Date
                  <Icon name={getSortIcon('submissionDate')} size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-semibold text-foreground">Status</th>
              <th className="text-left p-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAchievements?.map((achievement) => (
              <tr key={achievement?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div>
                    <h4 className="font-medium text-foreground">{achievement?.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {achievement?.description}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {getCategoryLabel(achievement?.category)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(achievement?.submissionDate)}
                  </span>
                </td>
                <td className="p-4">
                  <StatusBadge status={achievement?.status} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getActionButtons(achievement)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedAchievements?.map((achievement) => (
          <div key={achievement?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{achievement?.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {getCategoryLabel(achievement?.category)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Submitted: {formatDate(achievement?.submissionDate)}
                </p>
              </div>
              <StatusBadge status={achievement?.status} size="sm" />
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {achievement?.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {getActionButtons(achievement)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTable;