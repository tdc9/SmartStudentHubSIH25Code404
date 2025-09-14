import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentDataTable = ({ 
  students, 
  selectedStudents, 
  onSelectionChange, 
  onApprove, 
  onReject, 
  onSort,
  sortConfig 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = students?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(students?.length / itemsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = paginatedStudents?.map(student => student?.id);
      onSelectionChange([...new Set([...selectedStudents, ...allIds])]);
    } else {
      const currentPageIds = paginatedStudents?.map(student => student?.id);
      onSelectionChange(selectedStudents?.filter(id => !currentPageIds?.includes(id)));
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      onSelectionChange([...selectedStudents, studentId]);
    } else {
      onSelectionChange(selectedStudents?.filter(id => id !== studentId));
    }
  };

  const isAllSelected = paginatedStudents?.length > 0 && 
    paginatedStudents?.every(student => selectedStudents?.includes(student?.id));

  const isIndeterminate = paginatedStudents?.some(student => selectedStudents?.includes(student?.id)) && !isAllSelected;

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'bg-warning/20 text-warning', icon: 'Clock' },
      'approved': { color: 'bg-success/20 text-success', icon: 'CheckCircle' },
      'rejected': { color: 'bg-error/20 text-error', icon: 'XCircle' },
      'under-review': { color: 'bg-accent/20 text-accent', icon: 'Eye' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)?.replace('-', ' ')}
      </span>
    );
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="glass-card">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Student Achievement Records</h3>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages} • {students?.length} total records
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="w-12 px-6 py-4 text-left">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/10 transition-colors"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <span>Student Name</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/10 transition-colors"
                onClick={() => onSort('department')}
              >
                <div className="flex items-center space-x-2">
                  <span>Department</span>
                  {getSortIcon('department')}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Course</th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/10 transition-colors"
                onClick={() => onSort('year')}
              >
                <div className="flex items-center space-x-2">
                  <span>Year</span>
                  {getSortIcon('year')}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Achievement</th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/10 transition-colors"
                onClick={() => onSort('submissionDate')}
              >
                <div className="flex items-center space-x-2">
                  <span>Submitted</span>
                  {getSortIcon('submissionDate')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/10 transition-colors"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center space-x-2">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedStudents?.map((student) => (
              <tr key={student?.id} className="hover:bg-muted/5 transition-colors">
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => handleSelectStudent(student?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{student?.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {student?.studentId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{student?.department}</td>
                <td className="px-6 py-4 text-sm text-foreground">{student?.course}</td>
                <td className="px-6 py-4 text-sm text-foreground">{student?.year}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{student?.achievementType}</div>
                  <div className="text-xs text-muted-foreground">{student?.achievementTitle}</div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {formatDate(student?.submissionDate)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(student?.status)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {student?.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onApprove(student?.id)}
                          iconName="Check"
                          iconPosition="left"
                          iconSize={14}
                          className="text-success hover:text-success hover:bg-success/10"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onReject(student?.id)}
                          iconName="X"
                          iconPosition="left"
                          iconSize={14}
                          className="text-error hover:text-error hover:bg-error/10"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                    >
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, students?.length)} of {students?.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={14}
          >
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={14}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDataTable;