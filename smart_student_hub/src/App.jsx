import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import LoginPage from "./pages/login";
import StudentDashboard from "./pages/student-dashboard";
import AchievementsTracker from "./pages/achievement-tracker";
import StudentPortfolio from "./pages/student-portfolio";
import LandingPage from "./pages/landing-page";
import HelpAndSupportContacts from "./pages/help-and-support-contacts";
import InstitutionDashboard from "./pages/institution-dashboard";
import GovernmentDashboard from "./pages/government-dashboard";
import InstituteLoginPortal from "./pages/institute-login-portal";
import GovLoginPortal from "./pages/government-login-portal";
import StudentDataManagement from "./pages/student-data-management";

import NotFound from "./pages/NotFound";

// ✅ Auth route (redirect if already logged in)
function AuthRoute({ children }) {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (token) {
    if (role === "student") return <Navigate to="/student-dashboard" replace />;
    if (role === "faculty") return <Navigate to="/institution-dashboard" replace />;
    if (role === "government") return <Navigate to="/government-dashboard" replace />;
  }

  return children;
}

// ✅ Protected route (checks login + role)
function ProtectedRoute({ children, allowedRoles }) {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // redirect to the user's correct dashboard
    if (role === "student") return <Navigate to="/student-dashboard" replace />;
    if (role === "faculty") return <Navigate to="/institution-dashboard" replace />;
    if (role === "government") return <Navigate to="/government-dashboard" replace />;
    return <Navigate to="/" replace />; // fallback
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/institute-login"
          element={
            <AuthRoute>
              <InstituteLoginPortal />
            </AuthRoute>
          }
        />
        <Route
          path="/government-login"
          element={
            <AuthRoute>
              <GovLoginPortal />
            </AuthRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/achievement-tracker"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <AchievementsTracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-management"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <StudentDataManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-portfolio"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentPortfolio />
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes */}
        <Route
          path="/institution-dashboard"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />

        {/* Government Routes */}
        <Route
          path="/government-dashboard"
          element={
            <ProtectedRoute allowedRoles={["government"]}>
              <GovernmentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Public Help Page */}
        <Route path="/help" element={<HelpAndSupportContacts />} />

        {/* Catch-all → NotFound page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
