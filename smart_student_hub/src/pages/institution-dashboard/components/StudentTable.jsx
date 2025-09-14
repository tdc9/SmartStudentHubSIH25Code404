import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StudentTable = ({ students, onStudentClick, onBulkAction }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'electronics', label: 'Electronics & Communication' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const filteredStudents = students?.filter(student => {
    const matchesSearch = student?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         student?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesDepartment = !departmentFilter || student?.department === departmentFilter;
    const matchesStatus = !statusFilter || student?.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(filteredStudents?.map(student => student?.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents?.filter(id => id !== studentId));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-500/10 text-green-500', label: 'Active' },
      pending: { color: 'bg-amber-500/10 text-amber-500', label: 'Pending' },
      inactive: { color: 'bg-red-500/10 text-red-500', label: 'Inactive' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const sortedStudents = [...filteredStudents]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Student Management</h3>
            <p className="text-sm text-muted-foreground">
              {filteredStudents?.length} of {students?.length} students
            </p>
          </div>
          
          {selectedStudents?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedStudents?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="Mail"
                onClick={() => onBulkAction('email', selectedStudents)}
              >
                Send Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => onBulkAction('export', selectedStudents)}
              >
                Export
              </Button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={departmentOptions}
              value={departmentFilter}
              onChange={setDepartmentFilter}
              placeholder="Department"
              className="w-48"
            />
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Status"
              className="w-32"
            />
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedStudents?.length === filteredStudents?.length && filteredStudents?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="text-left p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Student</span>
                  <Icon 
                    name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </th>
              <th 
                className="text-left p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Department</span>
                  <Icon 
                    name={sortField === 'department' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Recent Activity</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Status</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents?.map((student) => (
              <tr 
                key={student?.id} 
                className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onStudentClick(student)}
              >
                <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => handleSelectStudent(student?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student?.name}</p>
                      <p className="text-sm text-muted-foreground">{student?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{student?.departmentName}</span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm text-foreground">{student?.lastActivity}</p>
                    <p className="text-xs text-muted-foreground">{student?.lastActivityTime}</p>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(student?.status)}
                </td>
                <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      onClick={() => onStudentClick(student)}
                    >
                      <span className="sr-only">View student</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Mail"
                      onClick={() => console.log('Email student:', student?.id)}
                    >
                      <span className="sr-only">Email student</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreVertical"
                      onClick={() => console.log('More actions:', student?.id)}
                    >
                      <span className="sr-only">More actions</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedStudents?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">No students found</p>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;