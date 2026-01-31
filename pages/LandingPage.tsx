import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { 
  School, ArrowRight, BarChart3, 
  BrainCircuit, Globe, Play, Sun, Moon, Star, Atom, Calculator, Dna, Microscope, Shield
} from 'lucide-react';
import { User } from '../types';

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

// Marquee Component
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

// Tilt Card Component
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

const LandingPage: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  
  // Parallax effect
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotateHero = useTransform(scrollY, [0, 1000], [0, 45]);

  useEffect(() => {
    if (isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const navItems = [
    { label: 'Xususiyatlar', path: '/features' },
    { label: 'Yechimlar', path: '/solutions' },
    { label: 'Narxlar', path: '/pricing' },
    { label: 'Biz Haqimizda', path: '/about' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY.get() > 20 
          ? (isDarkMode ? 'bg-[#050505]/70 border-b border-white/5' : 'bg-white/70 border-b border-slate-100') 
          : 'bg-transparent border-transparent'
        } backdrop-blur-lg`}>
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
               <button onClick={() => navigate('/student')} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95">
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

      {/* --- HERO SECTION REIMAGINED --- */}
      <section className="relative pt-32 pb-32 overflow-hidden" ref={heroRef}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Text Content */}
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
            
            <div className="mt-10 flex items-center gap-4 text-sm font-semibold opacity-70">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => <img key={i} src={`https://picsum.photos/50?random=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-black" />)}
               </div>
               <div>
                  <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                  <p>1200+ Maktablar tanlovi</p>
               </div>
            </div>
          </motion.div>

          {/* Right 3D Animation */}
          <motion.div 
            style={{ y: y1, rotate: rotateHero }}
            className="relative hidden lg:flex items-center justify-center h-[600px]"
          >
             {/* Central Hub */}
             <div className="relative z-20 w-48 h-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(99,102,241,0.4)] animate-float">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-inner">
                   <School className="w-16 h-16 text-white" />
                </div>
             </div>

             {/* Orbiting Elements */}
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
             
             {/* Decorative Blobs underneath */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          </motion.div>
        </div>

        {/* Marquee Section */}
        <div className="mt-20 border-y border-slate-200/50 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-sm">
           <Marquee isDark={isDarkMode} />
        </div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
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
               
               {/* Card 1: AI (Large) */}
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
                  {/* Interactive Visual */}
                  <div className="absolute right-[-50px] bottom-[-50px] w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/30 transition-colors"></div>
                  <div className="absolute right-10 bottom-10 opacity-80 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-64">
                         <div className="flex gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                         </div>
                         <div className="space-y-2">
                            <div className="h-2 bg-white/20 rounded w-3/4"></div>
                            <div className="h-2 bg-white/20 rounded w-1/2"></div>
                         </div>
                      </div>
                      <div className="bg-indigo-600 p-4 rounded-2xl border border-white/10 w-64 mt-2 ml-8 shadow-xl">
                         <div className="h-2 bg-white/40 rounded w-full mb-2"></div>
                         <div className="h-2 bg-white/40 rounded w-2/3"></div>
                      </div>
                  </div>
               </TiltCard>

               {/* Card 2: Analytics */}
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

               {/* Card 3: Security */}
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
                  <div className="mt-8 relative h-full flex items-center justify-center">
                     <div className="w-24 h-24 rounded-full border-4 border-amber-500/30 animate-ping absolute"></div>
                     <Shield className="w-16 h-16 text-amber-500 relative z-10" />
                  </div>
               </TiltCard>

               {/* Card 4: Global (Wide) */}
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
                        <h3 className={`text-3xl font-bold mb-2 ${isDarkMode ? '' : 'text-white'}`}>Global Platforma</h3>
                        <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Dunyo bo'ylab 500+ maktablar ishonchi.</p>
                     </div>
                  </div>
                  {/* Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>
                  <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
               </TiltCard>
            </div>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6 relative">
         <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.5 }}
           className={`max-w-5xl mx-auto rounded-[3rem] p-16 text-center relative overflow-hidden border ${
            isDarkMode 
               ? 'bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border-white/10' 
               : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/40'
         }`}>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10">
               <h2 className={`text-4xl md:text-6xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-white'}`}>Kelajakni bugun boshlang</h2>
               <p className={`text-xl mb-10 max-w-2xl mx-auto ${isDarkMode ? 'text-indigo-100' : 'text-indigo-100'}`}>
                  14 kunlik bepul sinov davri. Kredit karta talab qilinmaydi. Bugunoq o'quv jarayonini inqilob qiling.
               </p>
               <button 
                  onClick={() => navigate('/login')}
                  className={`px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-xl ${
                     isDarkMode 
                        ? 'bg-white text-indigo-900 hover:bg-indigo-50' 
                        : 'bg-white text-indigo-600 hover:bg-indigo-50'
                  }`}
               >
                  Hoziroq Ro'yxatdan O'ting
               </button>
            </div>
         </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`py-12 px-6 border-t ${isDarkMode ? 'border-white/5 bg-[#050505]' : 'border-slate-100 bg-white'}`}>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'}`}>
                  <School className="w-5 h-5" />
               </div>
               <span className="font-bold text-lg">EduNexus</span>
            </div>
            <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
               © 2024 EduNexus Inc. Barcha huquqlar himoyalangan.
            </div>
            <div className="flex gap-8">
               <a href="#" className={`text-sm font-bold hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Xavfsizlik</a>
               <a href="#" className={`text-sm font-bold hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Yordam</a>
               <a href="#" className={`text-sm font-bold hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Aloqa</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;