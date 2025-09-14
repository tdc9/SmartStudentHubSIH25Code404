import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Breadcrumb from "../../components/ui/Breadcrumb";
import KPICard from "./components/KPICard";
import AchievementTimeline from "./components/AchievementTimeline";
import MentorshipPanel from "./components/MentorshipPanel";
import PeerQASection from "./components/PeerQASection";
import EventCalendarWidget from "./components/EventCalendarWidget";
import CertificateVault from "./components/CertificateVault";
import PlacementListings from "./components/PlacementListings";
import QuickActions from "./components/QuickActions";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [studentName, setStudentName] = useState("Student");
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  // 🔹 Sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    window.location.href = "/login";
  };

  // 🔹 Fetch user + achievements
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token") || Cookies.get("token");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch user info
        const userRes = await axios.get(`${API_BASE}/auth/me`, { headers });
        setStudentName(userRes.data?.user?.name || "Student");

        // Fetch achievements
        const achRes = await axios.get(`${API_BASE}/achievements`, { headers });
        setAchievements(achRes.data || []);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 🔹 Add new achievement
  const handleAddAchievement = async (newAchievement) => {
    try {
      const token = localStorage.getItem("token") || Cookies.get("token");
      const res = await axios.post(`${API_BASE}/achievements`, newAchievement, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAchievements([res.data, ...achievements]); // prepend
    } catch (err) {
      console.error("Failed to add achievement:", err);
    }
  };

  // 🔹 KPI Stats
  const approved = achievements.filter((a) => a.status === "approved");
  const pending = achievements.filter((a) => a.status === "pending");
  const portfolioCompletion = achievements.length > 0
    ? Math.min(100, (approved.length / achievements.length) * 100)
    : 0;

  const kpiData = [
    {
      title: "Achievements Earned",
      value: approved.length.toString(),
      subtitle: "Total approved",
      trend: "up",
      trendValue: `+${approved.length}`,
      icon: "Trophy",
      color: "success",
    },
    {
      title: "Pending Approvals",
      value: pending.length.toString(),
      subtitle: "Awaiting review",
      trend: pending.length > 0 ? "up" : "down",
      trendValue: pending.length.toString(),
      icon: "Clock",
      color: "warning",
    },
    {
      title: "Portfolio Completion",
      value: `${portfolioCompletion.toFixed(0)}%`,
      subtitle: `${(100 - portfolioCompletion).toFixed(0)}% remaining`,
      trend: portfolioCompletion >= 50 ? "up" : "down",
      trendValue: `${portfolioCompletion.toFixed(0)}%`,
      icon: "FileText",
      color: "accent",
    },
    {
      title: "Skill Score",
      value: (approved.length * 5).toString(),
      subtitle: "Industry avg: 78",
      trend: "up",
      trendValue: `+${approved.length}`,
      icon: "Target",
      color: "primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        userRole="student"
        studentName={studentName}
      />
      <div className="lg:ml-60">
        <Header
          onMenuToggle={handleMenuToggle}
          isMenuOpen={isSidebarOpen}
          userRole="student"
          studentName={studentName}
          onSignOut={handleSignOut}
        />

        <main className="pt-16 p-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb userRole="student" />

            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Welcome back, {studentName}! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your academic journey today.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <AchievementTimeline
                  achievements={achievements}
                  onAddAchievement={handleAddAchievement}
                  loading={loading}
                />
                
              </div>
              <div>
                <MentorshipPanel />
              </div>
            </div>

            {/* Secondary Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              <PeerQASection />
              <EventCalendarWidget />
              <CertificateVault />
            </div>

            {/* Placement and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <PlacementListings />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  &copy; {new Date().getFullYear()} Smart Student Hub. All rights
                  reserved.
                </p>
                <p className="mt-1">
                  Empowering students through technology and innovation.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
