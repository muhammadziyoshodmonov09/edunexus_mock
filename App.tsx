import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import StudentDashboard from './pages/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import StudentPaidCourses from './pages/student/StudentPaidCourses'; // New
import StudentCourseView from './pages/student/StudentCourseView';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentGrades from './pages/student/StudentGrades';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherCourseManager from './pages/teacher/TeacherCourseManager';
import TeacherGrading from './pages/teacher/TeacherGrading';
import TeacherStudents from './pages/teacher/TeacherStudents';
import DirectorDashboard from './pages/DirectorDashboard';
import DirectorTeachers from './pages/director/DirectorTeachers';
import DirectorStudents from './pages/director/DirectorStudents';
import DirectorAnalytics from './pages/director/DirectorAnalytics';
import DirectorSettings from './pages/director/DirectorSettings';
import AdminDashboard from './pages/AdminDashboard';
import AdminSchools from './pages/admin/AdminSchools';
import AdminUsers from './pages/admin/AdminUsers';
import ParentDashboard from './pages/ParentDashboard'; // New
import { User, UserRole } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRole?: UserRole; // Optional: if undefined, any authenticated user is allowed
  user: User | null;
}

const ProtectedRoute = ({ children, allowedRole, user }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />;
  
  // If allowedRole is specified, enforce it. Admin bypasses all checks.
  if (allowedRole && user.role !== allowedRole && user.role !== UserRole.ADMIN && allowedRole !== UserRole.ADMIN) {
     return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Separate component to handle Location and Animation
const AnimatedRoutes: React.FC<{ user: User | null, handleLogin: (u: User) => void }> = ({ user, handleLogin }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/features" element={<Features />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        
        {/* Universal Profile Route */}
        <Route path="/profile" element={
          <ProtectedRoute user={user}>
            <Profile user={user!} />
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/student/*" element={
          <ProtectedRoute allowedRole={UserRole.STUDENT} user={user}>
             <Routes>
                <Route path="/" element={<StudentDashboard user={user!} />} />
                <Route path="/courses" element={<StudentCourses user={user!} />} />
                <Route path="/premium" element={<StudentPaidCourses user={user!} />} />
                <Route path="/courses/:courseId" element={<StudentCourseView />} />
                <Route path="/assignments" element={<StudentAssignments />} />
                <Route path="/grades" element={<StudentGrades user={user!} />} />
             </Routes>
          </ProtectedRoute>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher/*" element={
          <ProtectedRoute allowedRole={UserRole.TEACHER} user={user}>
             <Routes>
               <Route path="/" element={<TeacherDashboard user={user!} />} />
               <Route path="/courses" element={<TeacherCourses user={user!} />} />
               <Route path="/courses/:courseId" element={<TeacherCourseManager />} />
               <Route path="/grading" element={<TeacherGrading />} />
               <Route path="/students" element={<TeacherStudents />} />
               <Route path="/reports" element={<div className="p-4 text-center text-slate-500">Class Reports (In Progress)</div>} />
             </Routes>
          </ProtectedRoute>
        } />

        {/* Director Routes */}
        <Route path="/director/*" element={
          <ProtectedRoute allowedRole={UserRole.DIRECTOR} user={user}>
             <Routes>
               <Route path="/" element={<DirectorDashboard user={user!} />} />
               <Route path="/teachers" element={<DirectorTeachers />} />
               <Route path="/students" element={<DirectorStudents />} />
               <Route path="/analytics" element={<DirectorAnalytics />} />
               <Route path="/settings" element={<DirectorSettings user={user!} />} />
             </Routes>
          </ProtectedRoute>
        } />

         {/* Admin Routes */}
         <Route path="/admin/*" element={
          <ProtectedRoute allowedRole={UserRole.ADMIN} user={user}>
             <Routes>
               <Route path="/" element={<AdminDashboard />} />
               <Route path="/schools" element={<AdminSchools />} />
               <Route path="/users" element={<AdminUsers />} />
             </Routes>
          </ProtectedRoute>
        } />

        {/* Parent Routes */}
        <Route path="/parent/*" element={
          <ProtectedRoute allowedRole={UserRole.PARENT} user={user}>
             <Routes>
               <Route path="/" element={<ParentDashboard user={user!} />} />
               <Route path="/children" element={<div className="p-8">Farzandlar tafsilotlari (Tez orada)</div>} />
             </Routes>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <LanguageProvider>
      <HashRouter>
        <Layout user={user} onLogout={handleLogout}>
          <AnimatedRoutes user={user} handleLogin={handleLogin} />
        </Layout>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;