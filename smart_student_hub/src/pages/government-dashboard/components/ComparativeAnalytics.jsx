import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const ComparativeAnalytics = () => {
  const [activeChart, setActiveChart] = useState('rankings');

  const institutionRankings = [
    { name: 'Harvard', score: 98, students: 23000, compliance: 98 },
    { name: 'MIT', score: 96, students: 11500, compliance: 96 },
    { name: 'Yale', score: 94, students: 13400, compliance: 94 },
    { name: 'Stanford', score: 85, students: 17000, compliance: 85 },
    { name: 'UC Berkeley', score: 72, students: 45000, compliance: 72 }
  ];

  const performanceDistribution = [
    { range: '90-100%', count: 3, color: '#10b981' },
    { range: '80-89%', count: 1, color: '#f59e0b' },
    { range: '70-79%', count: 1, color: '#ef4444' },
    { range: '60-69%', count: 0, color: '#6b7280' }
  ];

  const trendData = [
    { month: 'Jan', compliance: 85, institutions: 45 },
    { month: 'Feb', compliance: 87, institutions: 47 },
    { month: 'Mar', compliance: 89, institutions: 48 },
    { month: 'Apr', compliance: 88, institutions: 50 },
    { month: 'May', compliance: 91, institutions: 52 },
    { month: 'Jun', compliance: 93, institutions: 53 },
    { month: 'Jul', compliance: 92, institutions: 55 },
    { month: 'Aug', compliance: 94, institutions: 56 },
    { month: 'Sep', compliance: 95, institutions: 58 }
  ];

  const chartOptions = [
    { id: 'rankings', label: 'Institution Rankings', icon: 'BarChart3' },
    { id: 'distribution', label: 'Performance Distribution', icon: 'PieChart' },
    { id: 'trends', label: 'Compliance Trends', icon: 'TrendingUp' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'rankings':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={institutionRankings} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
              <Bar 
                dataKey="score" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-secondary)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'distribution':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="count"
              >
                {performanceDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'trends':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-popover-foreground)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Comparative Analytics</h2>
          <p className="text-sm text-muted-foreground mt-1">Performance insights across institutions</p>
        </div>
        <div className="flex items-center space-x-2">
          {chartOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={activeChart === option?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveChart(option?.id)}
              iconName={option?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        {renderChart()}
      </div>
      {activeChart === 'distribution' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {performanceDistribution?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item?.color }}
              />
              <div>
                <p className="text-sm font-medium text-foreground">{item?.range}</p>
                <p className="text-xs text-muted-foreground">{item?.count} institutions</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeChart === 'rankings' && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Average compliance score: <span className="font-medium text-foreground">89.0%</span>
          </p>
        </div>
      )}
      {activeChart === 'trends' && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">+10%</p>
            <p className="text-sm text-muted-foreground">Compliance improvement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">+13</p>
            <p className="text-sm text-muted-foreground">New institutions</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparativeAnalytics;