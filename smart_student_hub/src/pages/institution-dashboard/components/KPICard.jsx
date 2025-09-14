import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, subtitle, trend, trendValue, icon, color = 'primary', onClick }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-muted-foreground';
  };

  return (
    <div 
      className={`bg-card border border-border rounded-2xl p-6 card-shadow micro-interaction ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color === 'primary' ? 'bg-primary/10' : color === 'success' ? 'bg-green-500/10' : color === 'warning' ? 'bg-amber-500/10' : 'bg-red-500/10'}`}>
          <Icon 
            name={icon} 
            size={24} 
            color={color === 'primary' ? 'var(--color-primary)' : color === 'success' ? '#10b981' : color === 'warning' ? '#d97706' : '#dc2626'} 
          />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Icon name={getTrendIcon()} size={16} className={getTrendColor()} />
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trendValue}
          </span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;