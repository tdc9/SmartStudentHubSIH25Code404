import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const StatisticsPanel = ({ statistics }) => {
  const departmentData = [
    { name: 'Computer Science', pending: 45, approved: 120, rejected: 8 },
    { name: 'Electrical Eng.', pending: 32, approved: 89, rejected: 5 },
    { name: 'Mechanical Eng.', pending: 28, approved: 76, rejected: 4 },
    { name: 'Civil Eng.', pending: 22, approved: 65, rejected: 3 },
    { name: 'Business Admin.', pending: 18, approved: 54, rejected: 2 }
  ];

  const statusData = [
    { name: 'Approved', value: statistics?.approved, color: '#10b981' },
    { name: 'Pending', value: statistics?.pending, color: '#f59e0b' },
    { name: 'Under Review', value: statistics?.underReview, color: '#06b6d4' },
    { name: 'Rejected', value: statistics?.rejected, color: '#ef4444' }
  ];

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-xs ${change > 0 ? 'text-success' : 'text-error'}`}>
            <Icon name={change > 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground">{value?.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={statistics?.total}
          icon="Users"
          color="bg-gradient-to-br from-primary to-primary/80"
          change={5.2}
        />
        <StatCard
          title="Pending Approvals"
          value={statistics?.pending}
          icon="Clock"
          color="bg-gradient-to-br from-warning to-warning/80"
          change={-2.1}
        />
        <StatCard
          title="Approved Records"
          value={statistics?.approved}
          icon="CheckCircle"
          color="bg-gradient-to-br from-success to-success/80"
          change={8.7}
        />
        <StatCard
          title="Rejected Records"
          value={statistics?.rejected}
          icon="XCircle"
          color="bg-gradient-to-br from-error to-error/80"
          change={-1.3}
        />
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department-wise Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Department-wise Records</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-popover-foreground)'
                  }}
                />
                <Bar dataKey="approved" fill="#10b981" name="Approved" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Status Distribution</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData?.map((entry, index) => (
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
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {statusData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{item?.name}</span>
                <span className="text-sm font-medium text-foreground">{item?.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={16}>
            Refresh
          </Button>
        </div>
        <div className="space-y-4">
          {[
            { action: 'Approved', student: 'Sarah Johnson', time: '2 minutes ago', type: 'success' },
            { action: 'Rejected', student: 'Michael Chen', time: '5 minutes ago', type: 'error' },
            { action: 'Under Review', student: 'Emily Davis', time: '12 minutes ago', type: 'warning' },
            { action: 'Approved', student: 'David Wilson', time: '18 minutes ago', type: 'success' },
            { action: 'Pending Review', student: 'Lisa Anderson', time: '25 minutes ago', type: 'info' }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/5 transition-colors">
              <div className={`w-2 h-2 rounded-full ${
                activity?.type === 'success' ? 'bg-success' :
                activity?.type === 'error' ? 'bg-error' :
                activity?.type === 'warning' ? 'bg-warning' : 'bg-accent'
              }`}></div>
              <div className="flex-1">
                <div className="text-sm text-foreground">
                  <span className="font-medium">{activity?.student}</span> record was{' '}
                  <span className={`font-medium ${
                    activity?.type === 'success' ? 'text-success' :
                    activity?.type === 'error' ? 'text-error' :
                    activity?.type === 'warning' ? 'text-warning' : 'text-accent'
                  }`}>
                    {activity?.action?.toLowerCase()}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{activity?.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;