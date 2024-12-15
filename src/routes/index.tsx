import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Pages
const Home = React.lazy(() => import('../pages/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('../pages/About').then(module => ({ default: module.About })));
const Features = React.lazy(() => import('../pages/Features').then(module => ({ default: module.Features })));
const Team = React.lazy(() => import('../pages/Team').then(module => ({ default: module.Team })));
const Login = React.lazy(() => import('../pages/Login').then(module => ({ default: module.Login })));
const Signup = React.lazy(() => import('../pages/Signup').then(module => ({ default: module.Signup })));
const Profile = React.lazy(() => import('../pages/Profile').then(module => ({ default: module.Profile })));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const EmailVerification = React.lazy(() => import('../pages/EmailVerification').then(module => ({ default: module.EmailVerification })));
const AirQuality = React.lazy(() => import('../pages/AirQuality').then(module => ({ default: module.AirQuality })));

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Routes Component
export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/air-quality" element={<AirQuality />} />

        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/email-verification" element={
          <ProtectedRoute>
            <EmailVerification />
          </ProtectedRoute>
        } />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}