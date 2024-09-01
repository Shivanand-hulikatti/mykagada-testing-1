import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import ExamManagementLandingPage from './components/pages/LandingPage';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Profile from './components/pages/Profile';
import DashBoard from './components/pages/DashBoard';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ExamManagementLandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN"
      clientId="YOUR_AUTH0_CLIENT_ID"
      redirectUri={window.location.origin + "/mykagada-testing-1"}
    >
      <Router basename="/mykagada-testing-1">
        <AppRoutes />
      </Router>
    </Auth0Provider>
  );
}

export default App;
