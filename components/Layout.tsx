import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, GraduationCap, Users, 
  Settings, LogOut, Bell, Search, BarChart, School,
  FileText, ClipboardCheck, User as UserIcon, Menu, ShoppingBag, Baby
} from 'lucide-react';
import { User, UserRole } from '../types';
import { NOTIFICATIONS } from '../services/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  if (!user) {
    return (
      <main className="w-full min-h-screen relative overflow-hidden">
        {children}
      </main>
    );
  }

  const getNavItems = () => {
    switch (user.role) {
      case UserRole.STUDENT:
        return [
          { label: t('dashboard'), icon: LayoutDashboard, path: '/student' },
          { label: t('courses'), icon: BookOpen, path: '/student/courses' },
          { label: t('paidCourses'), icon: ShoppingBag, path: '/student/premium' }, // New
          { label: t('assignments'), icon: FileText, path: '/student/assignments' },
          { label: t('grades'), icon: GraduationCap, path: '/student/grades' },
        ];
      case UserRole.TEACHER:
        return [
          { label: t('dashboard'), icon: LayoutDashboard, path: '/teacher' },
          { label: t('courseManager'), icon: BookOpen, path: '/teacher/courses' },
          { label: t('gradingCenter'), icon: ClipboardCheck, path: '/teacher/grading' },
          { label: t('students'), icon: Users, path: '/teacher/students' },
        ];
      case UserRole.DIRECTOR:
        return [
          { label: t('schoolOverview'), icon: LayoutDashboard, path: '/director' },
          { label: t('faculty'), icon: Users, path: '/director/teachers' },
          { label: t('studentDirectory'), icon: GraduationCap, path: '/director/students' },
          { label: t('analytics'), icon: BarChart, path: '/director/analytics' },
          { label: t('settings'), icon: Settings, path: '/director/settings' },
        ];
      case UserRole.ADMIN:
        return [
          { label: 'Platforma Statistikasi', icon: LayoutDashboard, path: '/admin' },
          { label: 'Maktablar', icon: School, path: '/admin/schools' },
          { label: 'Foydalanuvchilar', icon: Users, path: '/admin/users' },
        ];
      case UserRole.PARENT:
        return [
          { label: t('parentControl'), icon: LayoutDashboard, path: '/parent' },
          { label: t('myChildren'), icon: Baby, path: '/parent/children' },
          { label: t('settings'), icon: Settings, path: '/profile' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* --- FLOATING GLASS SIDEBAR --- */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        className="w-72 hidden md:flex flex-col m-6 rounded-[2rem] glass-panel z-40 relative overflow-hidden border-2 border-white/50"
      >
        {/* Sidebar Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

        <div className="p-8 pb-4 relative z-10">
          <div className="flex items-center gap-3 mb-10 cursor-pointer group" onClick={() => navigate('/')}>
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <School className="text-white w-6 h-6" />
            </motion.div>
            <div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight block group-hover:text-indigo-600 transition-colors">EduNexus</span>
              <span className="text-[9px] font-black text-white tracking-widest uppercase bg-slate-900 px-2 py-0.5 rounded-full inline-block mt-1">PRO</span>
            </div>
          </div>
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3">Asosiy Menu</div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
          {getNavItems().map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/student' || item.path === '/teacher' || item.path === '/director' || item.path === '/admin' || item.path === '/parent'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 premium-gradient"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse z-10"></div>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto relative z-10">
           <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-inner group hover:bg-white/60 transition-colors">
              <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => navigate('/profile')}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full p-[2px] premium-gradient group-hover:rotate-12 transition-transform duration-500">
                     <img src={user.avatarUrl} alt="User" className="w-full h-full rounded-full border-2 border-white object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                  <p className="text-[10px] font-bold text-indigo-500 truncate uppercase tracking-wide">{user.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile')}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-white/60 hover:bg-white text-indigo-600 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Profil
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogout}
                  className="flex items-center justify-center p-2 bg-white/60 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl transition-all shadow-sm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </motion.button>
              </div>
           </div>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Floating Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-20 flex items-center justify-between px-8 mt-6 mx-6 rounded-[1.5rem] glass-panel mb-2 border-2 border-white/40 shadow-sm"
        >
          <div className="flex items-center gap-6 w-full max-w-2xl">
            <button className="md:hidden p-2 text-slate-500 hover:text-indigo-600 bg-white/50 rounded-xl">
               <Menu className="w-5 h-5" />
            </button>

            {/* Premium Global Search */}
            <div className="relative w-full group" ref={searchRef}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearch}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-11 pr-4 py-3 bg-slate-100/50 hover:bg-white/60 focus:bg-white border-none rounded-2xl text-sm font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-inner transition-all"
              />
              <AnimatePresence>
                {showSearch && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-3 glass-panel rounded-2xl p-4 z-50"
                  >
                     <div className="text-center py-4">
                        <p className="text-slate-500 text-sm font-medium">Natijalar topilmadi...</p>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher Pill */}
            <div className="hidden sm:flex bg-slate-100/50 p-1 rounded-full border border-white/40">
               {['uz', 'en', 'ru'].map((lang) => (
                 <button 
                  key={lang}
                  onClick={() => setLanguage(lang as any)} 
                  className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all uppercase ${
                    language === lang 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                  }`}
                 >
                   {lang}
                 </button>
               ))}
            </div>

            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 text-slate-500 bg-white/60 hover:bg-white border border-white/50 rounded-full transition-all shadow-sm relative group"
              >
                <Bell className="w-5 h-5 group-hover:text-indigo-600 transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-6 pb-6 pt-2 scroll-smooth custom-scrollbar">
           <motion.div
             key={location.pathname}
             initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
             animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
             exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
             transition={{ duration: 0.4, ease: "easeOut" }}
             className="max-w-7xl mx-auto py-6"
           >
              {children}
           </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;