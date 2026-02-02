import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, GraduationCap, Users, 
  Settings, LogOut, Bell, Search, School,
  ClipboardCheck, Menu, ShoppingBag, Baby, Calendar, MessageCircle, X,
  Command, Plus, FileText, CreditCard, Gamepad2, FolderOpen, Briefcase, Zap, Coins
} from 'lucide-react';
import { User, UserRole } from '../types';
import { NOTIFICATIONS, COURSES, USERS } from '../services/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import AiVoiceAssistant from './AiVoiceAssistant';

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
  const [showCommandPalette, setShowCommandPalette] = useState(false); 
  const [commandQuery, setCommandQuery] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered commands based on query and role
  const getCommands = () => {
     const q = commandQuery.toLowerCase();
     const baseCommands = [
        { id: 'home', label: 'Bosh Sahifa', icon: LayoutDashboard, action: () => navigate(user?.role === 'STUDENT' ? '/student' : user?.role === 'TEACHER' ? '/teacher' : '/director') },
        { id: 'profile', label: 'Profil Sozlamalari', icon: Settings, action: () => navigate('/profile') },
        { id: 'calendar', label: 'Taqvim', icon: Calendar, action: () => navigate('/calendar') },
        { id: 'chat', label: 'Xabarlar', icon: MessageCircle, action: () => navigate('/chat') },
     ];

     const roleCommands = [];
     if (user?.role === 'TEACHER') {
        roleCommands.push({ id: 'new-course', label: 'Yangi Kurs Yaratish', icon: Plus, action: () => navigate('/teacher/courses') });
        roleCommands.push({ id: 'grade', label: 'Baholash', icon: ClipboardCheck, action: () => navigate('/teacher/grading') });
        roleCommands.push({ id: 'resources', label: 'Resurslar', icon: FolderOpen, action: () => navigate('/teacher/resources') });
     }
     if (user?.role === 'DIRECTOR') {
        roleCommands.push({ id: 'add-user', label: 'Foydalanuvchi Qo\'shish', icon: Users, action: () => navigate('/admin/users') });
        roleCommands.push({ id: 'finance', label: 'Moliyaviy Hisobot', icon: CreditCard, action: () => navigate('/director/analytics') });
        roleCommands.push({ id: 'erp', label: 'ERP Tizimi', icon: Briefcase, action: () => navigate('/director/management') });
     }
     if (user?.role === 'STUDENT') {
        roleCommands.push({ id: 'game', label: 'Gamification Market', icon: Gamepad2, action: () => navigate('/student/gamification') });
     }

     // Search Content Mock
     const contentResults = COURSES.map(c => ({
        id: c.id,
        label: c.title,
        icon: BookOpen,
        action: () => navigate(user?.role === 'TEACHER' ? `/teacher/courses/${c.id}` : `/student/courses/${c.id}`),
        desc: 'Kurs'
     })).filter(c => c.label.toLowerCase().includes(q));

     const all = [...baseCommands, ...roleCommands].filter(c => c.label.toLowerCase().includes(q));
     return [...all, ...contentResults];
  };

  // Scroll to top on route change
  useEffect(() => {
    if (user && mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Close mobile menu on navigate
    setIsMobileMenuOpen(false);
  }, [location.pathname, user]);

  const publicRoutes = ['/', '/features', '/solutions', '/pricing', '/about', '/login'];
  const isPublicPage = publicRoutes.includes(location.pathname);

  if (!user || isPublicPage) {
    return (
      <main className="w-full min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#050505]">
        {children}
      </main>
    );
  }

  const getNavItems = () => {
    const commonItems = [
       { label: 'Calendar', icon: Calendar, path: '/calendar' },
       { label: 'Chat', icon: MessageCircle, path: '/chat' },
    ];

    switch (user.role) {
      case UserRole.STUDENT:
        return [
          { label: t('dashboard'), icon: LayoutDashboard, path: '/student' },
          { label: t('courses'), icon: BookOpen, path: '/student/courses' },
          { label: t('gamification'), icon: Gamepad2, path: '/student/gamification' },
          { label: t('paidCourses'), icon: ShoppingBag, path: '/student/premium' },
          { label: t('grades'), icon: GraduationCap, path: '/student/grades' },
          ...commonItems
        ];
      case UserRole.TEACHER:
        return [
          { label: t('dashboard'), icon: LayoutDashboard, path: '/teacher' },
          { label: t('courses'), icon: BookOpen, path: '/teacher/courses' },
          { label: t('resources'), icon: FolderOpen, path: '/teacher/resources' },
          { label: t('gradingCenter'), icon: ClipboardCheck, path: '/teacher/grading' },
          { label: t('students'), icon: Users, path: '/teacher/students' },
          ...commonItems
        ];
      case UserRole.DIRECTOR:
        return [
          { label: t('dashboard'), icon: LayoutDashboard, path: '/director' },
          { label: t('management'), icon: Briefcase, path: '/director/management' },
          { label: t('faculty'), icon: Users, path: '/director/teachers' },
          { label: t('studentDirectory'), icon: GraduationCap, path: '/director/students' },
          { label: t('settings'), icon: Settings, path: '/director/settings' },
          ...commonItems
        ];
      case UserRole.ADMIN:
        return [
          { label: 'Stats', icon: LayoutDashboard, path: '/admin' },
          { label: 'Schools', icon: School, path: '/admin/schools' },
          { label: 'Users', icon: Users, path: '/admin/users' },
        ];
      case UserRole.PARENT:
        return [
          { label: t('parentControl'), icon: LayoutDashboard, path: '/parent' },
          { label: t('myChildren'), icon: Baby, path: '/parent/children' },
          { label: 'Profile', icon: Settings, path: '/profile' },
          ...commonItems
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen overflow-hidden relative bg-[#F8FAFC] dark:bg-[#050505]">
      
      {/* AI Voice Assistant */}
      <AiVoiceAssistant />

      {/* --- MOBILE HAMBURGER --- */}
      <div className="md:hidden fixed top-4 right-4 z-50">
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 bg-white shadow-lg rounded-xl">
            {isMobileMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
         </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
         {isMobileMenuOpen && (
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: "spring", bounce: 0, duration: 0.4 }}
               className="fixed inset-0 z-40 bg-white dark:bg-[#111] p-6 pt-20 overflow-y-auto md:hidden"
            >
               <div className="space-y-2">
                  {navItems.map(item => (
                     <NavLink 
                        key={item.path} 
                        to={item.path}
                        className={({ isActive }) => `flex items-center gap-4 p-4 rounded-2xl text-lg font-bold ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600'}`}
                     >
                        <item.icon className="w-6 h-6" />
                        {item.label}
                     </NavLink>
                  ))}
                  <button onClick={onLogout} className="flex items-center gap-4 p-4 rounded-2xl text-lg font-bold text-red-500 bg-red-50 w-full mt-8">
                     <LogOut className="w-6 h-6" /> Chiqish
                  </button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* --- DESKTOP SIDEBAR --- */}
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
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight block group-hover:text-indigo-600 transition-colors">EduNexus</span>
              <span className="text-[9px] font-black text-white tracking-widest uppercase bg-slate-900 px-2 py-0.5 rounded-full inline-block mt-1">PRO</span>
            </div>
          </div>
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3">Menu</div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/student' || item.path === '/teacher' || item.path === '/director'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
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
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto relative z-10">
           <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/50 dark:border-white/10 shadow-inner group hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => navigate('/profile')}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full p-[2px] premium-gradient group-hover:rotate-12 transition-transform duration-500">
                     <img src={user.avatarUrl} alt="User" className="w-full h-full rounded-full border-2 border-white dark:border-slate-800 object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[10px] font-bold text-indigo-500 truncate uppercase tracking-wide">{user.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogout}
                  className="w-full flex items-center justify-center p-2 bg-white/60 dark:bg-white/10 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl transition-all shadow-sm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </motion.button>
              </div>
           </div>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Desktop Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex h-20 py-0 items-center justify-between px-8 mt-6 mx-6 rounded-[1.5rem] glass-panel mb-2 border-2 border-white/40 shadow-sm"
        >
          <div className="flex items-center gap-4 max-w-2xl flex-1">
            <div 
               className="relative w-full group cursor-text" 
               onClick={() => setShowCommandPalette(true)}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <div className="w-full pl-11 pr-4 py-3 bg-slate-100/50 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 rounded-2xl text-sm font-semibold text-slate-500 dark:text-slate-400 shadow-inner flex justify-between items-center transition-all border border-transparent hover:border-indigo-200">
                 <span>{t('searchPlaceholder')}</span>
                 <div className="flex gap-1">
                    <span className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-400">Ctrl</span>
                    <span className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-400">K</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            
            {/* Student XP/Coins Widget (Visible only for Students) */}
            {user.role === UserRole.STUDENT && (
               <div className="flex items-center gap-3 mr-2 bg-slate-100/50 px-4 py-2 rounded-2xl border border-slate-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/student/gamification')}>
                     <div className="p-1 bg-yellow-100 rounded-lg text-yellow-600"><Zap className="w-3 h-3 fill-current" /></div>
                     <span>75 XP</span>
                  </div>
                  <div className="w-px h-4 bg-slate-300"></div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/student/gamification')}>
                     <div className="p-1 bg-indigo-100 rounded-lg text-indigo-600"><Coins className="w-3 h-3 fill-current" /></div>
                     <span>2,450</span>
                  </div>
               </div>
            )}

            <div className="flex bg-slate-100/50 dark:bg-white/5 p-1 rounded-full border border-white/40 dark:border-white/10">
               {['uz', 'en', 'ru'].map((lang) => (
                 <button 
                  key={lang}
                  onClick={() => setLanguage(lang as any)} 
                  className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all uppercase ${
                    language === lang 
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                 >
                   {lang}
                 </button>
               ))}
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10">
               <div className="relative cursor-pointer group" onClick={() => setShowNotifications(!showNotifications)}>
                  <div className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                     <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 transition-colors" />
                     {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#050505]"></span>
                     )}
                  </div>
               </div>
            </div>
          </div>
        </motion.header>

        {/* Content Area */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth pt-20 md:pt-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={location.pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </main>
      </div>

      {/* --- GLOBAL COMMAND PALETTE --- */}
      <AnimatePresence>
         {showCommandPalette && (
            <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
               <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowCommandPalette(false)}
               />
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 border border-slate-200 flex flex-col max-h-[60vh]"
               >
                  <div className="flex items-center gap-3 p-4 border-b border-slate-100">
                     <Command className="w-5 h-5 text-slate-400" />
                     <input 
                        autoFocus
                        type="text" 
                        placeholder="Buyruq bering yoki qidiring..." 
                        className="flex-1 text-lg outline-none placeholder-slate-400 text-slate-800 font-medium"
                        value={commandQuery}
                        onChange={(e) => setCommandQuery(e.target.value)}
                     />
                     <div className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-500">ESC</div>
                  </div>
                  <div className="overflow-y-auto p-2">
                     {getCommands().length > 0 ? (
                        getCommands().map((cmd, i) => (
                           <button 
                              key={cmd.id || i}
                              onClick={() => { cmd.action(); setShowCommandPalette(false); }}
                              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 transition-colors group"
                           >
                              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                 <cmd.icon className="w-5 h-5" />
                              </div>
                              <div className="text-left flex-1">
                                 <p className="font-bold text-sm">{cmd.label}</p>
                                 {cmd.desc && <p className="text-xs opacity-70 font-medium">{cmd.desc}</p>}
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                 <span className="text-[10px] font-bold bg-white px-2 py-1 rounded shadow-sm">Enter</span>
                              </div>
                           </button>
                        ))
                     ) : (
                        <div className="p-8 text-center text-slate-400">Natija topilmadi</div>
                     )}
                  </div>
                  <div className="p-2 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold px-4">
                     <span>EduNexus Command</span>
                     <span>v2.4</span>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Notifications Panel Overlay */}
      <AnimatePresence>
        {showNotifications && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95, x: 20 }}
             animate={{ opacity: 1, scale: 1, x: 0 }}
             exit={{ opacity: 0, scale: 0.95, x: 20 }}
             className="absolute top-24 right-8 w-80 bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 z-50 overflow-hidden"
           >
              <div className="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                 <h3 className="font-bold text-slate-900 dark:text-white">Xabarnomalar</h3>
                 <button onClick={() => setShowNotifications(false)}><X className="w-4 h-4 text-slate-400 hover:text-slate-600" /></button>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                 {NOTIFICATIONS.length > 0 ? (
                    NOTIFICATIONS.map(n => (
                       <div key={n.id} className={`p-3 rounded-xl mb-1 ${n.read ? 'opacity-50' : 'bg-indigo-50 dark:bg-indigo-900/20'}`}>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{n.message}</p>
                          <p className="text-[10px] text-slate-400 mt-2 text-right">{n.time}</p>
                       </div>
                    ))
                 ) : (
                    <div className="p-8 text-center text-slate-400 text-sm">Xabarlar yo'q</div>
                 )}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default Layout;