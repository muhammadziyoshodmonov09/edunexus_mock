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
import StudentPaidCourses from './pages/student/StudentPaidCourses'; 
import StudentCourseView from './pages/student/StudentCourseView';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentGrades from './pages/student/StudentGrades';
import StudentGamification from './pages/student/StudentGamification';
import StudentDreamscape from './pages/student/StudentDreamscape'; 
import StudentAiArena from './pages/student/StudentAiArena'; 
import StudentFocusGarden from './pages/student/StudentFocusGarden'; 
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherCourseManager from './pages/teacher/TeacherCourseManager';
import TeacherGrading from './pages/teacher/TeacherGrading';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherResources from './pages/teacher/TeacherResources';
import TeacherSyllabus from './pages/teacher/TeacherSyllabus'; 
import TeacherRadar from './pages/teacher/TeacherRadar'; 
import DirectorDashboard from './pages/director/DirectorDashboard';
import DirectorTeachers from './pages/director/DirectorTeachers';
import DirectorStudents from './pages/director/DirectorStudents';
import DirectorAnalytics from './pages/director/DirectorAnalytics';
import DirectorSettings from './pages/director/DirectorSettings';
import DirectorManagement from './pages/director/DirectorManagement';
import DirectorNeuroLink from './pages/director/DirectorNeuroLink';
import AdminDashboard from './pages/AdminDashboard';
import AdminSchools from './pages/admin/AdminSchools';
import AdminUsers from './pages/admin/AdminUsers';
import ParentDashboard from './pages/ParentDashboard'; 
import ParentChildView from './pages/parent/ParentChildView'; 
import Calendar from './pages/Calendar'; 
import Chat from './pages/Chat'; 
import { User, UserRole } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRole?: UserRole; 
  user: User | null;
}

const ProtectedRoute = ({ children, allowedRole, user }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRole && user.role !== allowedRole && user.role !== UserRole.ADMIN && allowedRole !== UserRole.ADMIN) {
     return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const getDashboardPath = (role: UserRole) => {
  switch (role) {
    case UserRole.STUDENT: return '/student';
    case UserRole.TEACHER: return '/teacher';
    case UserRole.DIRECTOR: return '/director';
    case UserRole.ADMIN: return '/admin';
    case UserRole.PARENT: return '/parent';
    default: return '/';
  }
};

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
        
        <Route 
          path="/login" 
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={getDashboardPath(user.role)} replace />} 
        />
        
        <Route path="/profile" element={
          <ProtectedRoute user={user}>
            <Profile user={user!} />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute user={user}>
            <Calendar />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute user={user}>
            <Chat />
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
                <Route path="/gamification" element={<StudentGamification user={user!} />} />
                <Route path="/dreamscape" element={<StudentDreamscape />} />
                <Route path="/arena" element={<StudentAiArena />} />
                <Route path="/focus" element={<StudentFocusGarden />} />
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
               <Route path="/resources" element={<TeacherResources />} />
               <Route path="/syllabus" element={<TeacherSyllabus />} />
               <Route path="/radar" element={<TeacherRadar />} />
             </Routes>
          </ProtectedRoute>
        } />

        {/* Director Routes */}
        <Route path="/director/*" element={
          <ProtectedRoute allowedRole={UserRole.DIRECTOR} user={user}>
             <Routes>
               <Route path="/" element={<DirectorDashboard user={user!} />} />
               <Route path="/management" element={<DirectorManagement />} />
               <Route path="/teachers" element={<DirectorTeachers />} />
               <Route path="/students" element={<DirectorStudents />} />
               <Route path="/analytics" element={<DirectorAnalytics />} />
               <Route path="/settings" element={<DirectorSettings user={user!} />} />
               <Route path="/neurolink" element={<DirectorNeuroLink />} />
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
               <Route path="/children" element={<div className="p-8">Farzandlar ro'yxati (Dashboardda mavjud)</div>} />
               <Route path="/child/:childId" element={<ParentChildView user={user!} />} />
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