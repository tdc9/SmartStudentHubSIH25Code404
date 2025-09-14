import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
import NotFound from "pages/NotFound";
import InstitutionDashboard from './pages/institution-dashboard';
import LoginPage from './pages/login';
import LandingPage from './pages/landing-page';
import StudentPortfolio from './pages/student-portfolio';
import StudentDashboard from './pages/student-dashboard';
import AchievementTracker from './pages/achievement-tracker';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes - all other routes require authentication */}
        <Route path="/" element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        } />
        <Route path="/institution-dashboard" element={
          <ProtectedRoute>
            <InstitutionDashboard />
          </ProtectedRoute>
        } />
        <Route path="/landing-page" element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        } />
        <Route path="/student-portfolio" element={
          <ProtectedRoute>
            <StudentPortfolio />
          </ProtectedRoute>
        } />
        <Route path="/student-dashboard" element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/achievement-tracker" element={
          <ProtectedRoute>
            <AchievementTracker />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;