import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard.jsx';
import CoachDashboard from './pages/CoachDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminLogin from './pages/AdminLogin';
import LinkedInCallback from './pages/LinkedInCallback';
import { AuthProvider, useAuth } from './contexts/auth/AuthContext';

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole === 'admin' && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole && allowedRole !== 'admin') {
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRole: PropTypes.oneOf(['student', 'coach', 'admin']).isRequired,
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${user.role}-dashboard`} replace /> : <LandingPage />} />
      <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coach-dashboard"
        element={
          <ProtectedRoute allowedRole="coach">
            <CoachDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;