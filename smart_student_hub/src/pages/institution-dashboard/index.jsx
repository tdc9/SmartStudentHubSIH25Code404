import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import KPICard from './components/KPICard';
import StudentTable from './components/StudentTable';
import PendingApprovals from './components/PendingApprovals';
import ComplianceTracker from './components/ComplianceTracker';
import BulkUploadPanel from './components/BulkUploadPanel';
import Button from '../../components/ui/Button';
import Modal, { ModalBody, ModalFooter } from '../../components/ui/Modal';

const InstitutionDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Mock data for KPI cards
  const kpiData = [
    {
      title: "Total Students",
      value: "2,847",
      subtitle: "Enrolled students",
      trend: "up",
      trendValue: "+12%",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Pending Approvals",
      value: "23",
      subtitle: "Awaiting review",
      trend: "down",
      trendValue: "-8%",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Accreditation",
      value: "87%",
      subtitle: "Compliance score",
      trend: "up",
      trendValue: "+5%",
      icon: "Shield",
      color: "success"
    },
    {
      title: "Active Faculty",
      value: "156",
      subtitle: "Teaching staff",
      trend: "up",
      trendValue: "+3%",
      icon: "GraduationCap",
      color: "primary"
    }
  ];

  // Mock student data
  const studentsData = [
    {
      id: 1,
      name: "Arjun Sharma",
      email: "arjun.sharma@student.edu",
      department: "computer-science",
      departmentName: "Computer Science",
      status: "active",
      lastActivity: "Portfolio updated",
      lastActivityTime: "2 hours ago",
      enrollmentDate: "2023-08-15",
      achievements: 12,
      gpa: 8.7
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@student.edu",
      department: "mechanical",
      departmentName: "Mechanical Engineering",
      status: "pending",
      lastActivity: "Certificate submitted",
      lastActivityTime: "5 hours ago",
      enrollmentDate: "2023-08-15",
      achievements: 8,
      gpa: 8.2
    },
    {
      id: 3,
      name: "Rahul Kumar",
      email: "rahul.kumar@student.edu",
      department: "electrical",
      departmentName: "Electrical Engineering",
      status: "active",
      lastActivity: "Achievement added",
      lastActivityTime: "1 day ago",
      enrollmentDate: "2023-08-15",
      achievements: 15,
      gpa: 9.1
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha.gupta@student.edu",
      department: "civil",
      departmentName: "Civil Engineering",
      status: "inactive",
      lastActivity: "Login",
      lastActivityTime: "1 week ago",
      enrollmentDate: "2023-08-15",
      achievements: 5,
      gpa: 7.8
    },
    {
      id: 5,
      name: "Vikash Singh",
      email: "vikash.singh@student.edu",
      department: "electronics",
      departmentName: "Electronics & Communication",
      status: "active",
      lastActivity: "Project submitted",
      lastActivityTime: "3 hours ago",
      enrollmentDate: "2023-08-15",
      achievements: 10,
      gpa: 8.5
    }
  ];

  // Mock pending approvals data
  const pendingApprovalsData = [
    {
      id: 1,
      title: "Hackathon Winner Certificate",
      studentName: "Arjun Sharma",
      department: "Computer Science",
      type: "achievement",
      priority: "high",
      description: "First place in National Coding Championship 2024. Certificate and trophy photos attached for verification.",
      submittedAt: "2024-12-10T10:30:00Z",
      attachments: ["certificate.pdf", "trophy_photo.jpg"]
    },
    {
      id: 2,
      title: "Research Paper Publication",
      studentName: "Priya Patel",
      department: "Mechanical Engineering",
      type: "publication",
      priority: "medium",
      description: "Published research paper on \'Sustainable Manufacturing Processes\' in International Journal of Engineering.",
      submittedAt: "2024-12-10T08:15:00Z",
      attachments: ["research_paper.pdf", "journal_acceptance.pdf"]
    },
    {
      id: 3,
      title: "Internship Completion",
      studentName: "Rahul Kumar",
      department: "Electrical Engineering",
      type: "internship",
      priority: "low",
      description: "Completed 3-month internship at Tesla India. Internship certificate and evaluation report submitted.",
      submittedAt: "2024-12-09T16:45:00Z",
      attachments: ["internship_certificate.pdf", "evaluation_report.pdf"]
    }
  ];

  // Mock compliance data
  const complianceData = {
    overallProgress: 87,
    categories: [
      {
        id: 1,
        name: "NAAC Accreditation",
        description: "National Assessment and Accreditation Council requirements",
        status: "in-progress",
        completedItems: 28,
        totalItems: 35,
        deadline: "2024-12-31T23:59:59Z"
      },
      {
        id: 2,
        name: "NIRF Ranking",
        description: "National Institutional Ranking Framework submission",
        status: "completed",
        completedItems: 42,
        totalItems: 42,
        deadline: null
      },
      {
        id: 3,
        name: "AICTE Compliance",
        description: "All India Council for Technical Education requirements",
        status: "pending",
        completedItems: 15,
        totalItems: 25,
        deadline: "2024-12-20T23:59:59Z"
      },
      {
        id: 4,
        name: "UGC Guidelines",
        description: "University Grants Commission compliance",
        status: "overdue",
        completedItems: 8,
        totalItems: 20,
        deadline: "2024-12-05T23:59:59Z"
      }
    ]
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleKPIClick = (kpiTitle) => {
    console.log('KPI clicked:', kpiTitle);
    // Navigate to detailed view based on KPI
    switch (kpiTitle) {
      case 'Total Students': setSelectedView('students');
        break;
      case 'Pending Approvals': setSelectedView('approvals');
        break;
      case 'Accreditation': setSelectedView('compliance');
        break;
      default:
        break;
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsStudentModalOpen(true);
  };

  const handleBulkAction = (action, studentIds) => {
    console.log('Bulk action:', action, 'for students:', studentIds);
    // Implement bulk actions like email, export, etc.
  };

  const handleApprovalAction = (approvalId, action) => {
    console.log(`${action} approval:`, approvalId);
    // Implement approval/rejection logic
  };

  const handleViewApprovalDetails = (approval) => {
    console.log('View approval details:', approval);
    // Open detailed approval modal
  };

  const handleComplianceAction = (category, action) => {
    console.log(`${action} compliance category:`, category);
    // Handle compliance actions
  };

  const handleBulkUpload = (file, validationResults) => {
    console.log('Bulk upload:', file, validationResults);
    // Process bulk upload
  };

  const handleDownloadTemplate = () => {
    console.log('Download template');
    // Download CSV template
  };

  const renderMainContent = () => {
    switch (selectedView) {
      case 'students':
        return (
          <div className="space-y-6">
            <StudentTable
              students={studentsData}
              onStudentClick={handleStudentClick}
              onBulkAction={handleBulkAction}
            />
            <BulkUploadPanel
              onUpload={handleBulkUpload}
              onDownloadTemplate={handleDownloadTemplate}
            />
          </div>
        );
      case 'approvals':
        return (
          <PendingApprovals
            approvals={pendingApprovalsData}
            onApprove={(id) => handleApprovalAction(id, 'approve')}
            onReject={(id) => handleApprovalAction(id, 'reject')}
            onViewDetails={handleViewApprovalDetails}
          />
        );
      case 'compliance':
        return (
          <ComplianceTracker
            complianceData={complianceData}
            onViewDetails={(category) => handleComplianceAction(category, 'view')}
            onUpdateCompliance={(category) => handleComplianceAction(category, 'update')}
          />
        );
      default:
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {kpiData?.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi?.title}
                  value={kpi?.value}
                  subtitle={kpi?.subtitle}
                  trend={kpi?.trend}
                  trendValue={kpi?.trendValue}
                  icon={kpi?.icon}
                  color={kpi?.color}
                  onClick={() => handleKPIClick(kpi?.title)}
                />
              ))}
            </div>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Student Management - Takes 2 columns */}
              <div className="xl:col-span-2">
                <StudentTable
                  students={studentsData}
                  onStudentClick={handleStudentClick}
                  onBulkAction={handleBulkAction}
                />
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                <PendingApprovals
                  approvals={pendingApprovalsData}
                  onApprove={(id) => handleApprovalAction(id, 'approve')}
                  onReject={(id) => handleApprovalAction(id, 'reject')}
                  onViewDetails={handleViewApprovalDetails}
                />
              </div>
            </div>
            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ComplianceTracker
                complianceData={complianceData}
                onViewDetails={(category) => handleComplianceAction(category, 'view')}
                onUpdateCompliance={(category) => handleComplianceAction(category, 'update')}
              />
              <BulkUploadPanel
                onUpload={handleBulkUpload}
                onDownloadTemplate={handleDownloadTemplate}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        userRole="institution"
      />
      <div className="lg:ml-60">
        <Header
          onMenuToggle={handleSidebarToggle}
          isMenuOpen={isSidebarOpen}
          userRole="institution"
        />
        
        <main className="pt-16 p-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb userRole="institution" />
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant={selectedView === 'overview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('overview')}
              >
                Overview
              </Button>
              <Button
                variant={selectedView === 'students' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('students')}
              >
                Students
              </Button>
              <Button
                variant={selectedView === 'approvals' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('approvals')}
              >
                Approvals
              </Button>
              <Button
                variant={selectedView === 'compliance' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('compliance')}
              >
                Compliance
              </Button>
            </div>

            {renderMainContent()}
          </div>
        </main>
      </div>
      {/* Student Details Modal */}
      <Modal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        title="Student Details"
        size="lg"
      >
        {selectedStudent && (
          <ModalBody>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-primary-foreground">
                    {selectedStudent?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{selectedStudent?.name}</h3>
                  <p className="text-muted-foreground">{selectedStudent?.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedStudent?.departmentName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">GPA</p>
                  <p className="text-2xl font-bold text-foreground">{selectedStudent?.gpa}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold text-foreground">{selectedStudent?.achievements}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Recent Activity</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedStudent?.lastActivity} • {selectedStudent?.lastActivityTime}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Enrollment Details</h4>
                <p className="text-sm text-muted-foreground">
                  Enrolled on {new Date(selectedStudent.enrollmentDate)?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </ModalBody>
        )}
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsStudentModalOpen(false)}>
            Close
          </Button>
          <Button onClick={() => console.log('View full profile:', selectedStudent?.id)}>
            View Full Profile
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InstitutionDashboard;