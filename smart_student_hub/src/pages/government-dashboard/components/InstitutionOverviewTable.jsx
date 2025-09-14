import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InstitutionOverviewTable = () => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const institutions = [
    {
      id: 1,
      name: "Harvard University",
      type: "Private University",
      region: "Northeast",
      status: "Compliant",
      complianceScore: 98,
      lastReview: "2024-08-15",
      studentsCount: 23000,
      accreditationLevel: "Tier 1"
    },
    {
      id: 2,
      name: "Stanford University",
      type: "Private University", 
      region: "West",
      status: "Under Review",
      complianceScore: 85,
      lastReview: "2024-07-22",
      studentsCount: 17000,
      accreditationLevel: "Tier 1"
    },
    {
      id: 3,
      name: "MIT",
      type: "Private Institute",
      region: "Northeast", 
      status: "Compliant",
      complianceScore: 96,
      lastReview: "2024-09-01",
      studentsCount: 11500,
      accreditationLevel: "Tier 1"
    },
    {
      id: 4,
      name: "UC Berkeley",
      type: "Public University",
      region: "West",
      status: "Action Required",
      complianceScore: 72,
      lastReview: "2024-06-10",
      studentsCount: 45000,
      accreditationLevel: "Tier 2"
    },
    {
      id: 5,
      name: "Yale University",
      type: "Private University",
      region: "Northeast",
      status: "Compliant",
      complianceScore: 94,
      lastReview: "2024-08-28",
      studentsCount: 13400,
      accreditationLevel: "Tier 1"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant':
        return 'bg-success/20 text-success border-success/30';
      case 'Under Review':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'Action Required':
        return 'bg-error/20 text-error border-error/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getComplianceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInstitutions = [...institutions]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Institutional Overview</h2>
            <p className="text-sm text-muted-foreground mt-1">Monitor compliance status across all registered institutions</p>
          </div>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Report
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/10">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Institution</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Region</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('complianceScore')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Compliance</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Last Review</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Students</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInstitutions?.map((institution) => (
              <tr key={institution?.id} className="border-b border-border hover:bg-muted/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Icon name="School" size={20} color="white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{institution?.name}</p>
                      <p className="text-sm text-muted-foreground">{institution?.accreditationLevel}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{institution?.type}</td>
                <td className="p-4 text-sm text-muted-foreground">{institution?.region}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(institution?.status)}`}>
                    {institution?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${getComplianceColor(institution?.complianceScore)}`}>
                      {institution?.complianceScore}%
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          institution?.complianceScore >= 90 ? 'bg-success' :
                          institution?.complianceScore >= 75 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${institution?.complianceScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{institution?.lastReview}</td>
                <td className="p-4 text-sm text-muted-foreground">{institution?.studentsCount?.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="FileText">
                      Audit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstitutionOverviewTable;