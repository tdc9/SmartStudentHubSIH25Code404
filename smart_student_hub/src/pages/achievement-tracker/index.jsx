import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Button from "../../components/ui/Button";

import AchievementFilters from "./components/AchievementFilters";
import AchievementTable from "./components/AchievementTable";
import AddAchievementModal from "./components/AddAchievementModal";
import AchievementDetailsModal from "./components/AchievementDetailsModal";
import ProgressSidebar from "./components/ProgressSidebar";

import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const AchievementTracker = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState(null); // ✅ logged-in student info

  const token = localStorage.getItem("token") || Cookies.get("token");

  // Fetch logged-in student details
  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudent(res.data); // API should return { id, name, email, role, avatar }
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };

  // Fetch achievements
  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/achievements`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAchievements(res.data || []);
      setFilteredAchievements(res.data || []);
    } catch (err) {
      console.error("Error fetching achievements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStudent();
      fetchAchievements();
    }
  }, []);

  // Filters
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    let filtered = achievements;

    if (newFilters?.type) {
      filtered = filtered.filter((a) => a?.type === newFilters.type);
    }
    if (newFilters?.status) {
      filtered = filtered.filter((a) => a?.status === newFilters.status);
    }
    if (newFilters?.dateFrom) {
      filtered = filtered.filter(
        (a) => new Date(a.date) >= new Date(newFilters.dateFrom)
      );
    }
    if (newFilters?.dateTo) {
      filtered = filtered.filter(
        (a) => new Date(a.date) <= new Date(newFilters.dateTo + "T23:59:59")
      );
    }
    if (newFilters?.searchTerm) {
      const searchLower = newFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title?.toLowerCase().includes(searchLower) ||
          a.description?.toLowerCase().includes(searchLower) ||
          a.issuingAuthority?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredAchievements(filtered);
  };

  // Add or update achievement
  const handleAddAchievement = async (achievementData) => {
    try {
      if (selectedAchievement) {
        // Update existing
        const res = await axios.put(
          `${API_BASE}/achievements/${selectedAchievement._id}`,
          achievementData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAchievements((prev) =>
          prev.map((a) =>
            a._id === selectedAchievement._id ? res.data : a
          )
        );
      } else {
        // Create new
        const res = await axios.post(`${API_BASE}/achievements`, achievementData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAchievements((prev) => [res.data, ...prev]);
      }
      handleFiltersChange(filters);
    } catch (err) {
      console.error("Error saving achievement:", err);
    }
  };

  // Delete
  const handleDeleteAchievement = async (achievement) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;
    try {
      await axios.delete(`${API_BASE}/achievements/${achievement._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAchievements((prev) => prev.filter((a) => a._id !== achievement._id));
      handleFiltersChange(filters);
    } catch (err) {
      console.error("Error deleting achievement:", err);
    }
  };

  // View & Edit
  const handleViewDetails = (achievement) => {
    setSelectedAchievement(achievement);
    setIsDetailsModalOpen(true);
  };

  const handleEditAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole={student?.role || "student"}
        student={student}
        studentName={student?.name || "Student"}
      />
      <div className="lg:ml-60">
        <Header
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen}
          userRole={student?.role || "student"}
          student={student}
          studentName={student?.name || "Student"}
        />

        <main className="pt-16">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <Breadcrumb userRole={student?.role || "student"} />

              {/* Page Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Achievement Tracker
                  </h1>
                  <p className="text-muted-foreground">
                    Submit, track, and manage your academic and extracurricular achievements
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setSelectedAchievement(null);
                    setIsAddModalOpen(true);
                  }}
                  iconName="Plus"
                  iconPosition="left"
                  className="lg:shrink-0"
                >
                  Add New Achievement
                </Button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="xl:col-span-3 space-y-6">
                  <AchievementFilters
                    onFiltersChange={handleFiltersChange}
                    totalCount={filteredAchievements?.length}
                  />

                  <AchievementTable
                    achievements={filteredAchievements}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditAchievement}
                    onDelete={handleDeleteAchievement}
                    loading={loading}
                  />
                </div>

                {/* Progress Sidebar */}
                <div className="xl:col-span-1">
                  <ProgressSidebar achievements={achievements} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AddAchievementModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedAchievement(null);
        }}
        onSubmit={handleAddAchievement}
        achievement={selectedAchievement}
      />
      <AchievementDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedAchievement(null);
        }}
        achievement={selectedAchievement}
        onEdit={handleEditAchievement}
      />
    </div>
  );
};

export default AchievementTracker;
