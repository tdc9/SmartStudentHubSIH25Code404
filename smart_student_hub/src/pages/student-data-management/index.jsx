import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FilterToolbar from './components/FilterToolbar';
import StudentDataTable from './components/StudentDataTable';
import BulkActionBar from './components/BulkActionBar';
import StatisticsPanel from './components/StatisticsPanel';
import RemarksModal from './components/RemarksModal';
import ExportModal from './components/ExportModal';

const StudentDataManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filters, setFilters] = useState({
    department: '',
    year: '',
    course: '',
    status: '',
    search: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'submissionDate',
    direction: 'desc'
  });
  const [remarksModal, setRemarksModal] = useState({
    isOpen: false,
    student: null,
    action: null
  });
  const [exportModal, setExportModal] = useState({
    isOpen: false
  });

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      studentId: "CS2021001",
      department: "Computer Science",
      course: "Bachelor\'s Degree",
      year: "3rd Year",
      achievementType: "Academic Excellence",
      achievementTitle: "Dean\'s List - Fall 2024",
      submissionDate: "2024-12-10T10:30:00Z",
      status: "pending"
    },
    {
      id: 2,
      name: "Michael Chen",
      studentId: "EE2020045",
      department: "Electrical Engineering",
      course: "Master\'s Degree",
      year: "2nd Year",
      achievementType: "Research Publication",
      achievementTitle: "IoT Security Framework Paper",
      submissionDate: "2024-12-09T14:15:00Z",
      status: "approved"
    },
    {
      id: 3,
      name: "Emily Davis",
      studentId: "ME2022012",
      department: "Mechanical Engineering",
      course: "Bachelor\'s Degree",
      year: "2nd Year",
      achievementType: "Competition Winner",
      achievementTitle: "National Robotics Championship",
      submissionDate: "2024-12-08T09:45:00Z",
      status: "under-review"
    },
    {
      id: 4,
      name: "David Wilson",
      studentId: "CE2021033",
      department: "Civil Engineering",
      course: "Bachelor\'s Degree",
      year: "4th Year",
      achievementType: "Internship Completion",
      achievementTitle: "Infrastructure Development Project",
      submissionDate: "2024-12-07T16:20:00Z",
      status: "approved"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      studentId: "BA2020078",
      department: "Business Administration",
      course: "Master\'s Degree",
      year: "1st Year",
      achievementType: "Leadership Award",
      achievementTitle: "Student Council President",
      submissionDate: "2024-12-06T11:30:00Z",
      status: "rejected"
    },
    {
      id: 6,
      name: "James Rodriguez",
      studentId: "CS2022089",
      department: "Computer Science",
      course: "Bachelor\'s Degree",
      year: "1st Year",
      achievementType: "Hackathon Winner",
      achievementTitle: "AI Innovation Challenge 2024",
      submissionDate: "2024-12-05T13:45:00Z",
      status: "pending"
    },
    {
      id: 7,
      name: "Maria Garcia",
      studentId: "PH2021056",
      department: "Physics",
      course: "PhD",
      year: "3rd Year",
      achievementType: "Research Grant",
      achievementTitle: "Quantum Computing Research",
      submissionDate: "2024-12-04T08:15:00Z",
      status: "approved"
    },
    {
      id: 8,
      name: "Robert Kim",
      studentId: "CH2020034",
      department: "Chemistry",
      course: "Master\'s Degree",
      year: "2nd Year",
      achievementType: "Patent Filed",
      achievementTitle: "Green Chemistry Process",
      submissionDate: "2024-12-03T15:30:00Z",
      status: "under-review"
    },
    {
      id: 9,
      name: "Jennifer Lee",
      studentId: "MA2022067",
      department: "Mathematics",
      course: "Bachelor\'s Degree",
      year: "3rd Year",
      achievementType: "Academic Excellence",
      achievementTitle: "Mathematics Olympiad Gold",
      submissionDate: "2024-12-02T12:00:00Z",
      status: "pending"
    },
    {
      id: 10,
      name: "Thomas Brown",
      studentId: "EE2021098",
      department: "Electrical Engineering",
      course: "Bachelor\'s Degree",
      year: "4th Year",
      achievementType: "Project Excellence",
      achievementTitle: "Smart Grid Implementation",
      submissionDate: "2024-12-01T10:45:00Z",
      status: "approved"
    }
  ];

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = mockStudents?.filter(student => {
      const matchesDepartment = !filters?.department || 
        student?.department?.toLowerCase()?.includes(filters?.department?.toLowerCase());
      const matchesYear = !filters?.year || student?.year?.includes(filters?.year);
      const matchesCourse = !filters?.course || 
        student?.course?.toLowerCase()?.includes(filters?.course?.toLowerCase());
      const matchesStatus = !filters?.status || student?.status === filters?.status;
      const matchesSearch = !filters?.search || 
        student?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        student?.studentId?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        student?.achievementTitle?.toLowerCase()?.includes(filters?.search?.toLowerCase());

      return matchesDepartment && matchesYear && matchesCourse && matchesStatus && matchesSearch;
    });

    // Sort
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'submissionDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [filters, sortConfig]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = mockStudents?.length;
    const approved = mockStudents?.filter(s => s?.status === 'approved')?.length;
    const pending = mockStudents?.filter(s => s?.status === 'pending')?.length;
    const rejected = mockStudents?.filter(s => s?.status === 'rejected')?.length;
    const underReview = mockStudents?.filter(s => s?.status === 'under-review')?.length;

    return { total, approved, pending, rejected, underReview };
  }, []);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleApprove = (studentId) => {
    const student = mockStudents?.find(s => s?.id === studentId);
    setRemarksModal({
      isOpen: true,
      student,
      action: 'approve'
    });
  };

  const handleReject = (studentId) => {
    const student = mockStudents?.find(s => s?.id === studentId);
    setRemarksModal({
      isOpen: true,
      student,
      action: 'reject'
    });
  };

  const handleRemarksSubmit = async (studentId, action, remarks) => {
    // Simulate API call
    console.log(`${action} student ${studentId} with remarks: ${remarks}`);
    // In real app, update student status here
  };

  const handleBulkApprove = () => {
    console.log('Bulk approve:', selectedStudents);
    setSelectedStudents([]);
  };

  const handleBulkReject = () => {
    console.log('Bulk reject:', selectedStudents);
    setSelectedStudents([]);
  };

  const handleBulkExport = () => {
    setExportModal({ isOpen: true });
  };

  const handleExport = (exportData) => {
    console.log('Export data:', exportData);
    // Simulate file download
    const blob = new Blob(['Mock export data'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_records_${new Date()?.toISOString()?.split('T')?.[0]}.${exportData?.format}`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBulkUpload = () => {
    console.log('Bulk upload triggered');
    // Simulate file upload
    alert('Bulk upload functionality would open file picker here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Header 
        portal="institution"
        onSidebarToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <div className="flex pt-16">
        <Sidebar
          portal="institution"
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Student Data Management</h1>
              <p className="text-muted-foreground">
                Review, approve, and manage student achievement records with comprehensive filtering and bulk operations.
              </p>
            </div>

            {/* Statistics Panel */}
            <StatisticsPanel statistics={statistics} />

            {/* Filter Toolbar */}
            <FilterToolbar
              filters={filters}
              onFiltersChange={setFilters}
              totalRecords={mockStudents?.length}
              filteredRecords={filteredAndSortedStudents?.length}
              onBulkUpload={handleBulkUpload}
              onExport={() => setExportModal({ isOpen: true })}
            />

            {/* Student Data Table */}
            <StudentDataTable
              students={filteredAndSortedStudents}
              selectedStudents={selectedStudents}
              onSelectionChange={setSelectedStudents}
              onApprove={handleApprove}
              onReject={handleReject}
              onSort={handleSort}
              sortConfig={sortConfig}
            />

            {/* Bulk Action Bar */}
            <BulkActionBar
              selectedCount={selectedStudents?.length}
              onBulkApprove={handleBulkApprove}
              onBulkReject={handleBulkReject}
              onBulkExport={handleBulkExport}
              onClearSelection={() => setSelectedStudents([])}
            />

            {/* Modals */}
            <RemarksModal
              isOpen={remarksModal?.isOpen}
              onClose={() => setRemarksModal({ isOpen: false, student: null, action: null })}
              student={remarksModal?.student}
              action={remarksModal?.action}
              onSubmit={handleRemarksSubmit}
            />

            <ExportModal
              isOpen={exportModal?.isOpen}
              onClose={() => setExportModal({ isOpen: false })}
              selectedCount={selectedStudents?.length}
              totalCount={mockStudents?.length}
              onExport={handleExport}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default StudentDataManagement;