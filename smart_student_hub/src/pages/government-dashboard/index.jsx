import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import KPICard from './components/KPICard';
import InstitutionOverviewTable from './components/InstitutionOverviewTable';
import ComparativeAnalytics from './components/ComparativeAnalytics';
import PriorityQueue from './components/PriorityQueue';
import QuickFilters from './components/QuickFilters';

const GovernmentDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ status: 'all', region: 'all', type: 'all' });

  // KPI data with real-time simulation
  const kpiData = [
    {
      title: "Registered Institutions",
      value: "58",
      subtitle: "Active educational institutions",
      icon: "School",
      trend: "up",
      trendValue: "+3 this month",
      variant: "primary"
    },
    {
      title: "Compliance Percentage",
      value: "89.0%",
      subtitle: "System-wide compliance rate",
      icon: "Shield",
      trend: "up",
      trendValue: "+2.5%",
      variant: "success"
    },
    {
      title: "Pending Reviews",
      value: "16",
      subtitle: "Awaiting government approval",
      icon: "Clock",
      trend: "down",
      trendValue: "-4 today",
      variant: "warning"
    },
    {
      title: "Academic Cycle Status",
      value: "Q3 2024",
      subtitle: "Current assessment period",
      icon: "Calendar",
      trend: "neutral",
      trendValue: "On schedule",
      variant: "secondary"
    }
  ];

  const handleSidebarToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters applied:', newFilters);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Header */}
      <Header 
        portal="government"
        onSidebarToggle={handleSidebarToggle}
        isSidebarCollapsed={sidebarCollapsed}
      />
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar
          portal="government"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleSidebarCollapse}
          isMobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Page Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Government Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor institutional compliance and manage accreditation processes across the education system
              </p>
            </motion.div>

            {/* KPI Cards */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {kpiData?.map((kpi, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <KPICard {...kpi} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Filters */}
            <motion.div variants={itemVariants}>
              <QuickFilters onFilterChange={handleFilterChange} />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Institution Overview */}
              <motion.div variants={itemVariants} className="xl:col-span-2">
                <InstitutionOverviewTable />
              </motion.div>

              {/* Right Column - Priority Queue */}
              <motion.div variants={itemVariants}>
                <PriorityQueue />
              </motion.div>
            </div>

            {/* Analytics Section */}
            <motion.div variants={itemVariants}>
              <ComparativeAnalytics />
            </motion.div>

            {/* Footer Stats */}
            <motion.div variants={itemVariants} className="mt-12">
              <div className="glass-card rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">2.3M</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">1,247</p>
                    <p className="text-sm text-muted-foreground">Faculty Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-warning">342</p>
                    <p className="text-sm text-muted-foreground">Programs Offered</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">98.5%</p>
                    <p className="text-sm text-muted-foreground">System Uptime</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default GovernmentDashboard;