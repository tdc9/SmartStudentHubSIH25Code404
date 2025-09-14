import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilters = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    region: 'all',
    type: 'all'
  });

  const filterOptions = {
    status: [
      { value: 'all', label: 'All Status', count: 58 },
      { value: 'compliant', label: 'Compliant', count: 42 },
      { value: 'under-review', label: 'Under Review', count: 8 },
      { value: 'action-required', label: 'Action Required', count: 8 }
    ],
    region: [
      { value: 'all', label: 'All Regions', count: 58 },
      { value: 'northeast', label: 'Northeast', count: 18 },
      { value: 'west', label: 'West', count: 15 },
      { value: 'south', label: 'South', count: 12 },
      { value: 'midwest', label: 'Midwest', count: 13 }
    ],
    type: [
      { value: 'all', label: 'All Types', count: 58 },
      { value: 'university', label: 'Universities', count: 28 },
      { value: 'college', label: 'Colleges', count: 20 },
      { value: 'institute', label: 'Institutes', count: 10 }
    ]
  };

  const handleFilterChange = (category, value) => {
    const newFilters = { ...activeFilters, [category]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = { status: 'all', region: 'all', type: 'all' };
    setActiveFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => value !== 'all')?.length;
  };

  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Quick Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} iconName="X">
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(filterOptions)?.map(([category, options]) => (
          <div key={category} className="space-y-3">
            <h4 className="text-sm font-medium text-foreground capitalize">{category}</h4>
            <div className="space-y-2">
              {options?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange(category, option?.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    activeFilters?.[category] === option?.value
                      ? 'bg-primary/20 border border-primary/30 text-primary' :'bg-muted/10 border border-transparent text-muted-foreground hover:bg-muted/20 hover:text-foreground'
                  }`}
                >
                  <span className="text-sm font-medium">{option?.label}</span>
                  <span className="text-xs px-2 py-1 bg-background/50 rounded-full">
                    {option?.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Last updated: September 13, 2024 at 6:45 PM</span>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={14}>
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;