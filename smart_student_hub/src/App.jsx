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

import NotFound from "./pages/NotFound"; // ✅ fixed import


// Protected route for logged-in users
function ProtectedRoute({ children }) {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/login" replace />;
}

// Auth route for login/register pages
function AuthRoute({ children }) {
  const token = Cookies.get("token");
  return token ? <Navigate to="/" replace /> : children;
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

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Achievements Tracker */}
        <Route
          path="/achievement-tracker"
          element={
            <ProtectedRoute>
              <AchievementsTracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-portfolio"
          element={
            <ProtectedRoute>
              <StudentPortfolio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpAndSupportContacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institution-dashboard"
          element={
            <ProtectedRoute>
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/government-dashboard"
          element={
            <ProtectedRoute>
              <GovernmentDashboard />
            </ProtectedRoute>
          }
        />
        {/* Catch-all → NotFound page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
