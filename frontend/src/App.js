import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import SOSActive from './pages/SOSActive';
import HelperResponse from './pages/HelperResponse';
import MapView from './pages/MapView';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import IncidentHistory from './pages/IncidentHistory';
import CheckInTimer from './pages/CheckInTimer';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!user.profileComplete) {
    return <Navigate to="/profile-setup" />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <NotificationProvider>
          <Router>
            <div className="App min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sos-active/:incidentId"
                  element={
                    <ProtectedRoute>
                      <SOSActive />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/helper-response/:incidentId"
                  element={
                    <ProtectedRoute>
                      <HelperResponse />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/map"
                  element={
                    <ProtectedRoute>
                      <MapView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/leaderboard"
                  element={
                    <ProtectedRoute>
                      <Leaderboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <IncidentHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/check-in"
                  element={
                    <ProtectedRoute>
                      <CheckInTimer />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Toaster position="top-center" richColors />
            </div>
          </Router>
        </NotificationProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
