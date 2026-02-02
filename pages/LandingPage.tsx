import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  School, ArrowRight, BarChart3, 
  BrainCircuit, Globe, Play, Sun, Moon, Star, Atom, Calculator, Dna, Microscope, Shield, Instagram,
  GraduationCap, Users, Building2, CheckCircle2, Zap, Clock, Banknote, Link as LinkIcon, Smartphone, Video, CreditCard, LayoutGrid
} from 'lucide-react';
import { User, UserRole } from '../types';

// --- Custom Icons ---
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.863 1.09c-.292.116-.691.359-.691.756 0 .394.481.547.809.643l1.833.535c.78.228 1.488.595 2.103 1.107l.006.005c.895.748 1.522 1.77 1.773 2.92.052.237.106.52.17 1.05.023.187.047.387.072.593.037.31.076.627.116.942.067.534.134 1.065.176 1.343.032.213.197.359.395.344.2-.016.347-.184.453-.33l.008-.01c.219-.31.428-.62.628-.934l1.37-2.114a4.136 4.136 0 0 1 1.069-1.09l.668-.466c.86-.6 1.84-1.01 2.87-1.2 1.93-.35 3.36-1.57 3.8-3.47.66-2.86 1.3-5.74 1.93-8.61.16-.73-.55-1.39-1.25-1.09z" />
    <path d="M10.5 10.5l4.5-4.5" />
  </svg>
);

// --- Components ---

const Badge = ({ children, isDark }: { children?: React.ReactNode, isDark: boolean }) => (
  <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md transition-all hover:scale-105 cursor-default ${
    isDark 
      ? 'bg-white/5 border-white/10 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
      : 'bg-white/60 border-indigo-100 text-indigo-600 shadow-sm'
  }`}>
    {children}
  </div>
);

const Marquee = ({ isDark }: { isDark: boolean }) => {
  const logos = [
    "Tech Academy", "Lincoln High", "Cambridge Int.", "Oxford Prep", 
    "Stanford Online", "MIT OpenCourse", "Harvard Extension", "Yale Digital"
  ];
  return (
    <div className="w-full overflow-hidden py-4 opacity-70">
      <div className="flex animate-marquee whitespace-nowrap gap-16">
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <span key={i} className={`text-xl font-bold uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-slate-900/20'}`}>
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
};

const TiltCard = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Counter = ({ from, to }: { from: number, to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = { value: from, stop: () => {} };
    let start: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * (to - from) + from);
      node.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [from, to]);
  return <span ref={nodeRef} />;
};

// --- ORBITAL COMPONENT ---
// This uses CSS animations to handle orbit and counter-orbit, allowing pause on hover.
const OrbitingPlanet = ({ 
  radius, 
  duration, 
  angleOffset, 
  icon: Icon, 
  color, 
  label, 
  isDark 
}: { 
  radius: number, 
  duration: number, 
  angleOffset: number, 
  icon: any, 
  color: string, 
  label: string, 
  isDark: boolean 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        // The container rotates
        animation: `spin ${duration}s linear infinite`,
        // Start from a different angle
        animationDelay: `-${(duration * angleOffset) / 360}s`,
        // Pause on hover
        animationPlayState: isHovered ? 'paused' : 'running'
      }}
    >
      {/* Laser Beam - Connects Center to Planet */}
      <div 
        className="absolute left-1/2 top-0 w-0.5 origin-bottom bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent transition-opacity duration-300"
        style={{ 
          height: '50%', // Radius
          opacity: isHovered ? 1 : 0
        }}
      >
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-500 rounded-full blur-sm"></div>
      </div>

      {/* The Planet - Positioned at 12 o'clock (top center) of the rotating container */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Counter-Rotation Container - Spins opposite to keep icon upright */}
        <div
          style={{
            animation: `spin ${duration}s linear infinite reverse`,
            animationDelay: `-${(duration * angleOffset) / 360}s`, // Must match parent delay to sync
            animationPlayState: isHovered ? 'paused' : 'running'
          }}
        >
          <div className={`relative group`}>
             <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-xl ${color} transition-transform duration-300 group-hover:scale-125 cursor-pointer z-20 relative border-2 border-white/10`}>
                <Icon className="w-7 h-7 md:w-8 md:h-8" />
             </div>
             
             {/* Tooltip */}
             <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30 shadow-xl ${isDark ? 'bg-slate-800 text-white border border-white/20' : 'bg-white text-slate-900 border border-slate-200'}`}>
                {label}
                <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isDark ? 'bg-slate-800 border-t border-l border-white/20' : 'bg-white border-t border-l border-slate-200'}`}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeRole, setActiveRole] = useState<'student' | 'teacher' | 'director'>('student');
  const [studentCount, setStudentCount] = useState(500);
  
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotateHero = useTransform(scrollY, [0, 1000], [0, 45]);

  useEffect(() => {
    if (isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleDashboardClick = () => {
    if (!user) return;
    switch (user.role) {
        case UserRole.STUDENT: navigate('/student'); break;
        case UserRole.TEACHER: navigate('/teacher'); break;
        case UserRole.DIRECTOR: navigate('/director'); break;
        case UserRole.ADMIN: navigate('/admin'); break;
        case UserRole.PARENT: navigate('/parent'); break;
        default: navigate('/');
    }
  };

  // ROI Logic
  const hoursSaved = Math.round(studentCount * 1.5); 
  const moneySaved = Math.round(studentCount * 12000); 

  const navItems = [
    { label: 'Xususiyatlar', path: '/features' },
    { label: 'Yechimlar', path: '/solutions' },
    { label: 'Narxlar', path: '/pricing' },
    { label: 'Biz Haqimizda', path: '/about' }
  ];

  const roleContent = {
    student: {
      title: "Gamifikatsiya & O'sish",
      desc: "Zerikarli darslar o'rniga qiziqarli missiyalar. XP yig'ing, ligalarda ko'tariling va kelajak kasbingizni AI yordamida aniqlang.",
      points: ["Dreamscape OS: Kelajak simulyatori", "AI Arena: Buyuklar bilan bahs", "Focus Garden: Diqqatni jamlash"],
      mockUI: (
        <div className="bg-slate-900 rounded-xl p-4 w-full h-full relative overflow-hidden border border-slate-700">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-black text-black">LVL 5</div>
              <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                 <div className="h-full w-[70%] bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                 <div className="text-xs text-slate-400">Reyting</div>
                 <div className="text-lg font-bold text-white">#3 Top</div>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                 <div className="text-xs text-slate-400">Coins</div>
                 <div className="text-lg font-bold text-yellow-400">2,450</div>
              </div>
           </div>
           <div className="mt-4 bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/30 flex items-center gap-3">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              <div className="text-xs text-indigo-200">Yangi missiya: "Kvant Fizikasi"</div>
           </div>
        </div>
      )
    },
    teacher: {
      title: "AI Assistent & Nazorat",
      desc: "Dars rejalari 5 soniyada tayyor. Sinfdagi muhitni 'Radar' orqali kuzating va o'quvchilarning bo'shliqlarini avtomatik aniqlang.",
      points: ["Neural Syllabus: Dars konstruktori", "Classroom Radar: Jonli monitoring", "AI Quiz Generator"],
      mockUI: (
        <div className="bg-white rounded-xl p-4 w-full h-full relative overflow-hidden border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Sinf Faolligi</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">85% Yuqori</span>
           </div>
           <div className="flex items-end gap-1 h-16 mb-4">
              {[40, 65, 50, 85, 60, 95, 75].map((h, i) => (
                 <div key={i} className="flex-1 bg-indigo-500 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.5 + (i * 0.1) }}></div>
              ))}
           </div>
           <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                 <Zap className="w-3 h-3 text-yellow-500" />
                 AI: "Aziz bugun chalg'iyapti, unga savol bering."
              </div>
           </div>
        </div>
      )
    },
    director: {
      title: "NeuroLink & Strategiya",
      desc: "Maktabning 'Raqamli Egizagi'. Moliyaviy oqimlar, o'qituvchilar samaradorligi va maktab obro'sini bitta ekranda boshqaring.",
      points: ["NeuroLink: 360° Nazorat", "Smart Budgeting", "Xavfsizlik Monitoringi"],
      mockUI: (
        <div className="bg-slate-50 rounded-xl p-4 w-full h-full relative overflow-hidden border border-slate-200">
           <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                 <div className="text-[10px] text-slate-400 uppercase">Daromad</div>
                 <div className="text-sm font-black text-slate-900">$45k <span className="text-emerald-500 text-[10px]">+12%</span></div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                 <div className="text-[10px] text-slate-400 uppercase">O'quvchilar</div>
                 <div className="text-sm font-black text-slate-900">1,250</div>
              </div>
           </div>
           <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-slate-700">Xavfsizlik Tizimi</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full w-[98%] bg-emerald-500"></div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 text-right">Online: 98%</div>
           </div>
        </div>
      )
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY.get() > 20 
          ? (isDarkMode ? 'bg-[#050505]/80 border-b border-white/5' : 'bg-white/80 border-b border-slate-100') 
          : 'bg-transparent border-transparent'
        } backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${isDarkMode ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white' : 'bg-white text-indigo-600'}`}>
              <School className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">EduNexus</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => navigate(item.path)}
                className={`relative group transition-colors ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isDarkMode ? 'bg-white' : 'bg-indigo-600'}`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 hover:rotate-180 ${
                isDarkMode ? 'text-yellow-400 bg-white/10' : 'text-slate-600 bg-slate-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {user ? (
               <button onClick={handleDashboardClick} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95">
                 Kabinet
               </button>
            ) : (
               <div className="flex items-center gap-3">
                 <button onClick={() => navigate('/login')} className={`hidden sm:block text-sm font-bold ${isDarkMode ? 'text-white hover:text-indigo-300' : 'text-slate-600 hover:text-indigo-600'}`}>
                   Kirish
                 </button>
                 <button 
                   onClick={() => navigate('/login')}
                   className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
                     isDarkMode 
                       ? 'bg-white text-black hover:bg-slate-200 shadow-white/10' 
                       : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
                   }`}
                 >
                   Boshlash
                 </button>
               </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-32 overflow-hidden" ref={heroRef}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div className="mb-6 inline-block">
              <Badge isDark={isDarkMode}>
                <Star className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span className="tracking-wide">Yangi Avlod Ta'lim Tizimi</span>
              </Badge>
            </motion.div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1]">
              Kelajakni <br />
              <span className="text-gradient relative">
                 Boshqaring
                 <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-500 opacity-50" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99992C18.5002 2.49992 48.5002 0.99992 91.5002 4.49992C150.5 9.49992 186 9.5 200 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              </span>
            </h1>

            <p className={`text-xl md:text-2xl mb-10 max-w-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
              Sun'iy intellekt, real vaqt tahlillari va cheksiz imkoniyatlar. EduNexus bilan maktabingizni yangi bosqichga olib chiqing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                Bepul Sinab Ko'rish 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className={`h-14 px-8 rounded-2xl font-bold text-lg border-2 transition-all flex items-center justify-center gap-2 ${
                isDarkMode 
                  ? 'border-white/20 text-white hover:bg-white/10' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}>
                <Play className="w-5 h-5 fill-current" /> Demo Video
              </button>
            </div>
          </motion.div>

          {/* RIGHT 3D ANIMATION */}
          <motion.div 
            style={{ y: y1, rotate: rotateHero }}
            className="relative hidden lg:flex items-center justify-center h-[600px]"
          >
             <div className="relative z-20 w-48 h-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(99,102,241,0.4)] animate-float">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-inner">
                   <School className="w-16 h-16 text-white" />
                </div>
             </div>

             <motion.div className="absolute w-[400px] h-[400px] border border-dashed border-indigo-300/30 rounded-full animate-spin-slow z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-lg">
                   <Atom className="w-8 h-8 text-blue-500" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-lg">
                   <Dna className="w-8 h-8 text-pink-500" />
                </div>
             </motion.div>

             <motion.div className="absolute w-[600px] h-[600px] border border-dashed border-purple-300/20 rounded-full animate-reverse-spin z-0">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-lg">
                   <Calculator className="w-8 h-8 text-orange-500" />
                </div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-lg">
                   <Microscope className="w-8 h-8 text-emerald-500" />
                </div>
             </motion.div>
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          </motion.div>
        </div>

        <div className="mt-20 border-y border-slate-200/50 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-sm">
           <Marquee isDark={isDarkMode} />
        </div>
      </section>

      {/* STATISTICS */}
      <section className={`py-12 border-b ${isDarkMode ? 'border-white/10 bg-[#0A0A0A]' : 'border-slate-200 bg-slate-50'}`}>
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
               { label: "Faol O'quvchilar", val: 54200 },
               { label: "Yuklangan Darslar", val: 125000 },
               { label: "AI Javoblari", val: 890000 },
               { label: "Hamkor Maktablar", val: 1240 }
            ].map((stat, i) => (
               <div key={i}>
                  <div className={`text-3xl md:text-4xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                     <Counter from={0} to={stat.val} />+
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                     {stat.label}
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* BENTO GRID */}
      <section className="py-32 px-6 relative">
         <div className="max-w-7xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-20"
            >
               <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Hammasi bir joyda</h2>
               <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Har bir rol uchun maxsus ishlab chiqilgan, lekin yagona ekotizimda birlashtirilgan mukammal yechim.
               </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[350px]">
               <TiltCard className={`md:col-span-2 rounded-[2.5rem] p-10 flex flex-col justify-between border transition-all overflow-hidden group ${
                   isDarkMode 
                     ? 'bg-gradient-to-br from-indigo-900/40 to-black border-white/10 hover:border-indigo-500/50' 
                     : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                 }`}>
                  <div className="relative z-10 transform transition-transform group-hover:translate-z-10">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${isDarkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}`}>
                        <BrainCircuit className="w-8 h-8" />
                     </div>
                     <h3 className="text-3xl font-bold mb-3">AI Repetitor</h3>
                     <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} max-w-md`}>
                        Gemini 3 Flash texnologiyasi asosida har bir talaba uchun 24/7 ishlaydigan shaxsiy yordamchi.
                     </p>
                  </div>
                  <div className="absolute right-[-50px] bottom-[-50px] w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/30 transition-colors"></div>
               </TiltCard>

               <TiltCard className={`rounded-[2.5rem] p-10 flex flex-col border transition-all overflow-hidden group ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-white/10 hover:border-emerald-500/50' 
                      : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                 }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${isDarkMode ? 'bg-emerald-500 text-white' : 'bg-emerald-500 text-white'}`}>
                     <BarChart3 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Chuqur Tahlil</h3>
                  <div className="flex-1 flex items-end gap-2 mt-8 h-full">
                     {[40, 70, 50, 85, 60, 95].map((h, i) => (
                        <motion.div 
                           initial={{ height: 0 }}
                           whileInView={{ height: `${h}%` }}
                           transition={{ delay: i * 0.1, duration: 0.5 }}
                           key={i} 
                           className={`flex-1 rounded-t-lg ${isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500'}`} 
                           style={{ opacity: 0.4 + (i * 0.1) }}
                        ></motion.div>
                     ))}
                  </div>
               </TiltCard>

               <TiltCard className={`rounded-[2.5rem] p-10 flex flex-col border transition-all overflow-hidden group ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-white/10 hover:border-amber-500/50' 
                      : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                 }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${isDarkMode ? 'bg-amber-500 text-white' : 'bg-amber-500 text-white'}`}>
                     <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Xavfsizlik</h3>
                  <p className={`text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                     Bank darajasidagi shifrlash va to'liq ma'lumotlar maxfiyligi.
                  </p>
               </TiltCard>

               <TiltCard className={`md:col-span-2 rounded-[2.5rem] p-10 flex flex-col justify-center border transition-all relative overflow-hidden group ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-white/10 hover:border-blue-500/50' 
                      : 'bg-slate-900 text-white border-slate-800 shadow-2xl shadow-slate-900/30'
                 }`}>
                  <div className="relative z-10 flex items-center gap-8">
                     <div className={`p-6 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-white/10'}`}>
                        <Globe className="w-12 h-12 text-blue-400 animate-spin-slow" />
                     </div>
                     <div>
                        <h3 className="text-3xl font-bold mb-2">Global Platforma</h3>
                        <p className="text-lg opacity-80">Dunyo bo'ylab 500+ maktablar ishonchi.</p>
                     </div>
                  </div>
               </TiltCard>
            </div>
         </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className={`py-24 px-6 relative border-t ${isDarkMode ? 'border-white/10 bg-[#050505]' : 'border-slate-200 bg-slate-50'}`}>
         <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-sm mb-6 border border-emerald-500/20">
                     <Calculator className="w-4 h-4" /> ROI Calculator
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Sizning Foydangizni Hisoblang</h2>
                  <p className={`text-xl mb-10 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                     EduNexus yordamida nafaqat vaqt, balki katta miqdordagi mablag'ni ham tejashingiz mumkin.
                  </p>
                  
                  <div className="space-y-8">
                     <div>
                        <div className="flex justify-between items-center mb-4">
                           <span className="font-bold text-sm uppercase tracking-wide opacity-70">O'quvchilar Soni</span>
                           <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{studentCount}</span>
                        </div>
                        <input 
                           type="range" 
                           min="50" 
                           max="5000" 
                           step="50"
                           value={studentCount}
                           onChange={(e) => setStudentCount(Number(e.target.value))}
                           className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
                        />
                        <div className="flex justify-between mt-2 text-xs font-bold opacity-50">
                           <span>50</span>
                           <span>5000</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div 
                     whileHover={{ y: -5 }}
                     className={`p-8 rounded-[2rem] border relative overflow-hidden flex flex-col justify-between h-full ${
                        isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                     }`}
                  >
                     <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                        <Clock className="w-7 h-7" />
                     </div>
                     <div>
                        <h3 className="text-4xl font-black mb-2 text-blue-600">{hoursSaved.toLocaleString()}+</h3>
                        <p className="font-bold text-lg mb-1">Soat / Oyiga</p>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tejalgan vaqt</p>
                     </div>
                  </motion.div>

                  <motion.div 
                     whileHover={{ y: -5 }}
                     className={`p-8 rounded-[2rem] border relative overflow-hidden flex flex-col justify-between h-full ${
                        isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-xl'
                     }`}
                  >
                     <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                        <Banknote className="w-7 h-7" />
                     </div>
                     <div>
                        <h3 className="text-4xl font-black mb-2 text-emerald-600">{moneySaved.toLocaleString()}</h3>
                        <p className="font-bold text-lg mb-1">UZS / Oyiga</p>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Iqtisod qilingan mablag'</p>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* SOLAR SYSTEM INTEGRATIONS */}
      <section className="py-32 px-6 relative overflow-hidden min-h-[800px] flex items-center justify-center">
         <div className="max-w-7xl mx-auto text-center w-full relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Yagona Ekotizim</h2>
            <p className={`text-xl max-w-2xl mx-auto mb-24 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
               Barcha sevimli vositalaringiz bir joyda. Sichqonchani olib boring va bog'liqlikni his qiling.
            </p>

            <div className="relative w-full h-[600px] flex items-center justify-center">
               
               {/* Center Sun */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div 
                     animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                           "0 0 40px rgba(99,102,241,0.4)",
                           "0 0 80px rgba(99,102,241,0.7)",
                           "0 0 40px rgba(99,102,241,0.4)"
                        ]
                     }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative z-20"
                  >
                     <School className="w-16 h-16 text-white animate-pulse" />
                  </motion.div>
               </div>

               {/* Ring 1: 300px width = 150px radius */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${isDarkMode ? 'border-white/10' : 'border-slate-300'}`} style={{ width: 300, height: 300 }}>
                  <OrbitingPlanet radius={150} duration={20} angleOffset={0} icon={Video} color="bg-blue-500" label="Zoom" isDark={isDarkMode} />
                  <OrbitingPlanet radius={150} duration={20} angleOffset={180} icon={TelegramIcon} color="bg-sky-500" label="Telegram" isDark={isDarkMode} />
               </div>

               {/* Ring 2: 450px width = 225px radius */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${isDarkMode ? 'border-white/10' : 'border-slate-300'}`} style={{ width: 450, height: 450 }}>
                  <OrbitingPlanet radius={225} duration={35} angleOffset={90} icon={LayoutGrid} color="bg-orange-500" label="Google" isDark={isDarkMode} />
                  <OrbitingPlanet radius={225} duration={35} angleOffset={270} icon={CreditCard} color="bg-emerald-500" label="Payme" isDark={isDarkMode} />
               </div>

               {/* Ring 3: 600px width = 300px radius */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${isDarkMode ? 'border-white/10' : 'border-slate-300'}`} style={{ width: 600, height: 600 }}>
                  <OrbitingPlanet radius={300} duration={50} angleOffset={45} icon={Smartphone} color="bg-purple-600" label="Mobile" isDark={isDarkMode} />
                  <OrbitingPlanet radius={300} duration={50} angleOffset={225} icon={LinkIcon} color="bg-slate-500" label="API" isDark={isDarkMode} />
               </div>

            </div>
         </div>
      </section>

      {/* ROLE PREVIEW */}
      <section className="py-24 px-6 relative">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black mb-6">Sizning Ropingiz Qanday?</h2>
               <div className="flex justify-center mt-8">
                  <div className={`p-1.5 rounded-2xl flex gap-2 border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                     <button onClick={() => setActiveRole('student')} className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 ${activeRole === 'student' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                        <GraduationCap className="w-4 h-4" /> O'quvchi
                     </button>
                     <button onClick={() => setActiveRole('teacher')} className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 ${activeRole === 'teacher' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                        <Users className="w-4 h-4" /> O'qituvchi
                     </button>
                     <button onClick={() => setActiveRole('director')} className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 ${activeRole === 'director' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                        <Building2 className="w-4 h-4" /> Direktor
                     </button>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <motion.div 
                  key={activeRole}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
               >
                  <h3 className="text-3xl font-bold">{roleContent[activeRole].title}</h3>
                  <p className="text-lg opacity-80">{roleContent[activeRole].desc}</p>
                  <ul className="space-y-4">
                     {roleContent[activeRole].points.map((p, i) => (
                        <li key={i} className="flex items-center gap-3 font-medium"><CheckCircle2 className="w-5 h-5 text-indigo-500" /> {p}</li>
                     ))}
                  </ul>
                  <button onClick={() => navigate('/login')} className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:opacity-90">Demoni Ko'rish</button>
               </motion.div>

               <motion.div 
                  key={`img-${activeRole}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`aspect-[4/3] rounded-[2rem] border-4 p-2 shadow-2xl ${isDarkMode ? 'bg-[#111] border-white/10' : 'bg-slate-100 border-white'}`}
               >
                  {roleContent[activeRole].mockUI}
               </motion.div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
         <div className={`max-w-5xl mx-auto rounded-[3rem] p-16 text-center relative overflow-hidden ${
            isDarkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-900' : 'bg-gradient-to-br from-indigo-600 to-purple-600'
         } text-white shadow-2xl`}>
            <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-black mb-6">Kelajakni bugun boshlang</h2>
               <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">14 kunlik bepul sinov. Kredit karta shart emas.</p>
               <button onClick={() => navigate('/login')} className="px-10 py-5 rounded-2xl font-bold text-xl bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl transition-all hover:scale-105">
                  Hoziroq Ro'yxatdan O'ting
               </button>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 px-6 border-t ${isDarkMode ? 'border-white/5 bg-[#050505]' : 'border-slate-100 bg-white'}`}>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-lg"><School className="w-5 h-5 text-indigo-600" /> EduNexus</div>
            <div className="flex gap-8 text-sm font-bold opacity-60">
               <a href="#">Xavfsizlik</a>
               <a href="#">Yordam</a>
               <a href="#">Aloqa</a>
            </div>
            <div className="text-sm font-medium opacity-50">© 2026 EduNexus Inc.</div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;