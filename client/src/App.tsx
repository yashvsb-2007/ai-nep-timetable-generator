import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './components/Layout/MainLayout';

import { Login } from './pages/Auth/Login';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { AdminDashboard } from './pages/Dashboard/AdminDashboard';
import { HODDashboard } from './pages/Dashboard/HODDashboard';
import { FacultyDashboard } from './pages/Dashboard/FacultyDashboard';
import { StudentDashboard } from './pages/Dashboard/StudentDashboard';
import { TimetableStudio } from './pages/Timetable/TimetableStudio';
import { NEPCreditBasket } from './pages/NEP/NEPCreditBasket';
import { MasterManagement } from './pages/College/MasterManagement';
import { ReportsModule } from './pages/Reports/ReportsModule';
import { SystemSettings } from './pages/Admin/SystemSettings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <MainLayout>{children}</MainLayout>;
};

const RootRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  switch (user?.role) {
    case 'COLLEGE_ADMIN': return <Navigate to="/dashboard/admin" replace />;
    case 'DEPT_ADMIN':
    case 'HOD': return <Navigate to="/dashboard/hod" replace />;
    case 'FACULTY': return <Navigate to="/dashboard/faculty" replace />;
    case 'STUDENT': return <Navigate to="/dashboard/student" replace />;
    default: return <Navigate to="/dashboard/admin" replace />;
  }
};

export const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/" element={<RootRedirect />} />

      <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/hod" element={<ProtectedRoute><HODDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/faculty" element={<ProtectedRoute><FacultyDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />

      <Route path="/timetable-studio" element={<ProtectedRoute><TimetableStudio /></ProtectedRoute>} />
      <Route path="/nep-basket" element={<ProtectedRoute><NEPCreditBasket /></ProtectedRoute>} />
      <Route path="/master-management" element={<ProtectedRoute><MasterManagement /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportsModule /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
