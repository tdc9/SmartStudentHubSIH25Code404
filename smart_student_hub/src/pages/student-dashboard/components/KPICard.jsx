import React from "react";
import Icon from "../../../components/AppIcon";

const KPICard = ({ title, value, subtitle, trend, trendValue, icon, color = "accent" }) => {
  const getTrendIcon = () => {
    if (trend === "up") return "TrendingUp";
    if (trend === "down") return "TrendingDown";
    return "Minus";
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-error";
    return "text-muted-foreground";
  };

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "success":
        return "bg-success/10 text-success";
      case "warning":
        return "bg-warning/10 text-warning";
      default:
        return "bg-accent/10 text-accent";
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 card-shadow micro-interaction">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-2xl font-bold text-foreground">{value ?? "0"}</h3>
            {trendValue && (
              <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                <Icon name={getTrendIcon()} size={16} />
                <span className="text-sm font-medium">{trendValue}</span>
              </div>
            )}
          </div>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`p-3 rounded-xl ${getColorClasses()}`}>
            <Icon name={icon} size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
