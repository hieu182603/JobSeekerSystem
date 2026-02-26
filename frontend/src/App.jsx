
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import CVUpload from './pages/CVUpload';
import Profile from './pages/Profile';
import ApplicationsList from './pages/ApplicationsList';
import CreateApplication from './pages/CreateApplication';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/cv-upload" element={
            <ProtectedRoute>
              <CVUpload />
            </ProtectedRoute>
          } />
          <Route path="/job-application" element={
            <ProtectedRoute>
              <ApplicationsList />
            </ProtectedRoute>
          } />
           <Route path="/create" element={
            <ProtectedRoute>
              <CreateApplication />
            </ProtectedRoute>
          } />


          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

