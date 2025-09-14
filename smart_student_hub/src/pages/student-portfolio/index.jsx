import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // axios instance with token interceptor

import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import Breadcrumb from "../../components/ui/Breadcrumb";
import PortfolioHeader from "./components/PortfolioHeader";
import PersonalInfoSection from "./components/PersonalInfoSection";
import AchievementsSection from "./components/AchievementsSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const StudentPortfolio = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [isPrivate, setIsPrivate] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [portfolioTheme, setPortfolioTheme] = useState("default");
  const [studentData, setStudentData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student details + achievements
  const fetchStudentData = async () => {
    try {
      setLoading(true);

      // Fetch student profile
      const res = await api.get("/auth/me");
      const user = res.data?.user;
      setStudentData(user);
      document.title = `${user?.name || "Student"}'s Portfolio - Smart Student Hub`;

      // Fetch achievements (separate model)
      const achRes = await api.get("/achievements");
      setAchievements(achRes.data?.achievements || achRes.data || []);
    } catch (err) {
      console.error("❌ Error fetching student data:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const sections = [
    { id: "personal", label: "Personal Info", icon: "User" },
    { id: "achievements", label: "Achievements", icon: "Trophy" },
    { id: "skills", label: "Skills", icon: "Code" },
    { id: "projects", label: "Projects", icon: "FolderOpen" },
    { id: "education", label: "Education", icon: "GraduationCap" },
    { id: "experience", label: "Experience", icon: "Briefcase" },
  ];

  const renderActiveSection = () => {
    if (!studentData)
      return <p className="text-muted-foreground">Loading...</p>;

    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoSection
            data={studentData}
            isEditable={true}
            onUpdate={setStudentData}
          />
        );
      case "achievements":
        return (
          <AchievementsSection
            achievements={achievements}
            studentName={studentData?.name || "Student"}
          />
        );
      case "skills":
        return <SkillsSection skills={studentData?.skills || []} />;
      case "projects":
        return <ProjectsSection projects={studentData?.projects || []} />;
      case "education":
        return <EducationSection education={studentData?.education || []} />;
      case "experience":
        return <ExperienceSection experience={studentData?.experience || []} />;
      default:
        return (
          <PersonalInfoSection
            data={studentData}
            isEditable={true}
            onUpdate={setStudentData}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-muted-foreground">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole={studentData?.role || "student"}
        student={studentData}
        studentName={studentData?.name || "Student"}
      />
      <div className="lg:ml-60">
        <Header
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen}
          userRole={studentData?.role || "student"}
          student={studentData}
          studentName={studentData?.name || "Student"}
        />

        <main className="pt-16">
          <div className="p-6">
            <Breadcrumb userRole={studentData?.role || "student"} />

            <PortfolioHeader
              studentName={studentData?.name || "Student"}
              onDownloadPDF={() => console.log("PDF Download")}
              onGenerateLink={(link) => console.log("Link:", link)}
              onTogglePrivacy={() => setIsPrivate(!isPrivate)}
              isPrivate={isPrivate}
              onCustomizeTheme={() => setShowCustomizeModal(true)}
            />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Navigation */}
              <div className="xl:col-span-1">
                <div className="bg-card border border-border rounded-2xl p-4 card-shadow sticky top-24">
                  <h3 className="font-semibold text-foreground mb-4">
                    Portfolio Sections
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                          ${
                            activeSection === section.id
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                      >
                        <Icon name={section.icon} size={16} />
                        <span>{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="xl:col-span-3">{renderActiveSection()}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentPortfolio;
