import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  School, ArrowRight, Zap, Shield, BarChart3, 
  BrainCircuit, Globe, Check, Play, Layers, 
  Activity, Sun, Moon, ChevronRight, Star
} from 'lucide-react';
import { User } from '../types';

// --- Components ---

const Badge = ({ children, isDark }: { children?: React.ReactNode, isDark: boolean }) => (
  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
    isDark 
      ? 'bg-white/5 border-white/10 text-indigo-300' 
      : 'bg-indigo-50 border-indigo-100 text-indigo-600'
  }`}>
    {children}
  </div>
);

const LandingPage: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for the dashboard image
  const dashboardY = useTransform(scrollY, [0, 500], [0, -50]);
  const dashboardOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    if (isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY.get() > 20 
          ? (isDarkMode ? 'bg-[#050505]/80 border-b border-white/5' : 'bg-white/80 border-b border-slate-100') 
          : 'bg-transparent border-transparent'
        } backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'}`}>
              <School className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">EduNexus</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['Xususiyatlar', 'Yechimlar', 'Narxlar'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'text-slate-400 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-1"></div>
            {user ? (
               <button onClick={() => navigate('/student')} className="text-sm font-bold hover:text-indigo-500 transition-colors">Kabinet</button>
            ) : (
               <>
                 <button onClick={() => navigate('/login')} className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                   Kirish
                 </button>
                 <button 
                   onClick={() => navigate('/login')}
                   className={`px-4 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105 ${
                     isDarkMode 
                       ? 'bg-white text-black hover:bg-slate-200' 
                       : 'bg-slate-900 text-white hover:bg-slate-800'
                   }`}
                 >
                   Boshlash
                 </button>
               </>
            )}
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Badge isDark={isDarkMode}>
              <Star className="w-3 h-3 fill-current" />
              v2.0 Hozir jonli efirda
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Ta'lim uchun <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
               Yangi Operatsion Tizim
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Sinfxonadan tortib to direktor xonasigacha — EduNexus barcha jarayonlarni sun'iy intellekt yordamida avtomatlashtiradi.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => navigate('/login')}
              className={`h-12 px-8 rounded-full font-bold text-base flex items-center gap-2 transition-all hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'
              }`}
            >
              Bepul Sinab Ko'rish <ArrowRight className="w-4 h-4" />
            </button>
            <button className={`h-12 px-8 rounded-full font-bold text-base flex items-center gap-2 border transition-all ${
              isDarkMode 
                ? 'border-white/10 text-white hover:bg-white/10' 
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}>
              <Play className="w-4 h-4 fill-current" /> Demo Video
            </button>
          </motion.div>
        </div>

        {/* 3D Dashboard Preview */}
        <motion.div 
          style={{ y: dashboardY, opacity: dashboardOpacity }}
          className="mt-20 max-w-6xl mx-auto relative z-10 perspective-[2000px]"
        >
          <div className={`relative rounded-xl border p-2 shadow-2xl transition-all duration-500 transform rotate-x-12 ${
             isDarkMode 
               ? 'bg-white/5 border-white/10 shadow-indigo-500/10' 
               : 'bg-white border-slate-200 shadow-slate-200'
          }`}>
             {/* Fake Browser Header */}
             <div className={`h-8 border-b flex items-center px-4 gap-2 ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-slate-100 bg-slate-50'}`}>
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                </div>
                <div className={`ml-4 px-3 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? 'bg-white/5 text-slate-500' : 'bg-white text-slate-400 border border-slate-100'}`}>
                   app.edunexus.com
                </div>
             </div>
             
             {/* Dashboard Content Mockup */}
             <div className={`aspect-[16/9] w-full overflow-hidden ${isDarkMode ? 'bg-[#0B0B15]' : 'bg-slate-50'}`}>
                <div className="flex h-full">
                   {/* Sidebar */}
                   <div className={`w-60 border-r p-4 hidden md:block ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-white'}`}>
                      <div className="space-y-3 mt-4">
                         {[1,2,3,4].map(i => (
                            <div key={i} className={`h-8 w-full rounded-md ${i===1 ? (isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600') : (isDarkMode ? 'bg-white/5' : 'bg-slate-100')}`}></div>
                         ))}
                      </div>
                   </div>
                   {/* Main Content */}
                   <div className="flex-1 p-6">
                      <div className="flex gap-4 mb-6">
                         {[1,2,3].map(i => (
                            <div key={i} className={`flex-1 h-24 rounded-xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-white'}`}></div>
                         ))}
                      </div>
                      <div className={`w-full h-64 rounded-xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-white'}`}></div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Gradient Glow under dashboard */}
          <div className={`absolute -inset-4 bg-indigo-500/20 blur-3xl -z-10 rounded-[50%] opacity-40`}></div>
        </motion.div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="py-24 px-6 relative">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Hammasi bir joyda</h2>
               <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Har bir rol uchun maxsus ishlab chiqilgan, lekin yagona ekotizimda birlashtirilgan.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
               
               {/* Card 1: AI (Large) */}
               <motion.div 
                 whileHover={{ y: -5 }}
                 className={`md:col-span-2 relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between border transition-all ${
                   isDarkMode 
                     ? 'bg-gradient-to-br from-indigo-900/50 to-purple-900/20 border-white/10 hover:border-indigo-500/50' 
                     : 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10'
                 }`}
               >
                  <div className="relative z-10">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
                        <BrainCircuit className="w-6 h-6" />
                     </div>
                     <h3 className="text-2xl font-bold mb-2">AI Repetitor</h3>
                     <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} max-w-sm`}>
                        Har bir talaba uchun 24/7 ishlaydigan shaxsiy yordamchi. Dars rejalarini avtomatlashtiring.
                     </p>
                  </div>
                  {/* Abstract Visual */}
                  <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30">
                     <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path fill={isDarkMode ? "#6366f1" : "#4f46e5"} d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.5,-41.3C83.9,-27,88.5,-12.1,86.1,1.8C83.7,15.7,74.3,28.7,64.2,39.9C54.1,51.1,43.3,60.6,31.1,67.6C18.9,74.6,5.3,79.1,-7.4,77.7C-20.1,76.3,-32,69,-43.3,60.6C-54.6,52.1,-65.4,42.5,-73.4,30.3C-81.4,18.1,-86.6,3.3,-84.6,-10.4C-82.6,-24.1,-73.4,-36.7,-62.1,-45.8C-50.8,-54.9,-37.4,-60.5,-23.7,-66.9C-10,-73.3,3.9,-80.5,17.9,-80.3C31.9,-80.1,46,-72.5,45.7,-76.3Z" transform="translate(100 100)" />
                     </svg>
                  </div>
               </motion.div>

               {/* Card 2: Analytics */}
               <motion.div 
                 whileHover={{ y: -5 }}
                 className={`rounded-3xl p-8 flex flex-col border transition-all ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-white/10 hover:border-emerald-500/50' 
                      : 'bg-white border-slate-200 shadow-sm hover:shadow-lg'
                 }`}
               >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDarkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-600'}`}>
                     <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Chuqur Tahlil</h3>
                  <div className="flex-1 flex items-end gap-1 mt-4">
                     {[40, 70, 50, 85, 60, 95].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm transition-all duration-500 ${isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500'}`} style={{ height: `${h}%`, opacity: 0.5 + (i * 0.1) }}></div>
                     ))}
                  </div>
               </motion.div>

               {/* Card 3: Security */}
               <motion.div 
                 whileHover={{ y: -5 }}
                 className={`rounded-3xl p-8 flex flex-col border transition-all ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-white/10 hover:border-amber-500/50' 
                      : 'bg-white border-slate-200 shadow-sm hover:shadow-lg'
                 }`}
               >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDarkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-50 text-amber-600'}`}>
                     <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Xavfsizlik</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                     Bank darajasidagi shifrlash va to'liq ma'lumotlar maxfiyligi.
                  </p>
               </motion.div>

               {/* Card 4: Global (Wide) */}
               <motion.div 
                 whileHover={{ y: -5 }}
                 className={`md:col-span-2 rounded-3xl p-8 flex flex-col justify-center border transition-all relative overflow-hidden ${
                    isDarkMode 
                      ? 'bg-[#0A0A0A] border-white/10 hover:border-blue-500/50' 
                      : 'bg-slate-900 text-white border-slate-800 shadow-xl'
                 }`}
               >
                  <div className="relative z-10 flex items-center gap-6">
                     <div className={`p-4 rounded-full ${isDarkMode ? 'bg-blue-500/20' : 'bg-white/10'}`}>
                        <Globe className="w-8 h-8 text-blue-400 animate-pulse-slow" />
                     </div>
                     <div>
                        <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? '' : 'text-white'}`}>Global Platforma</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Dunyo bo'ylab 500+ maktablar ishonchi.</p>
                     </div>
                  </div>
                  {/* Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
         <div className={`max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden border ${
            isDarkMode 
               ? 'bg-white/5 border-white/10' 
               : 'bg-indigo-50 border-indigo-100'
         }`}>
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold mb-6">Kelajakni bugun boshlang</h2>
               <p className={`text-lg mb-8 max-w-xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  14 kunlik bepul sinov davri. Kredit karta talab qilinmaydi.
               </p>
               <button 
                  onClick={() => navigate('/login')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 ${
                     isDarkMode 
                        ? 'bg-white text-black' 
                        : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  }`}
               >
                  Hoziroq Ro'yxatdan O'ting
               </button>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`py-12 px-6 border-t ${isDarkMode ? 'border-white/5 bg-[#050505]' : 'border-slate-100 bg-white'}`}>
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'}`}>
                  <School className="w-3 h-3" />
               </div>
               <span className="font-bold">EduNexus</span>
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
               © 2024 EduNexus Inc. Barcha huquqlar himoyalangan.
            </div>
            <div className="flex gap-6">
               <a href="#" className={`text-sm hover:text-indigo-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Xavfsizlik</a>
               <a href="#" className={`text-sm hover:text-indigo-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Yordam</a>
               <a href="#" className={`text-sm hover:text-indigo-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Aloqa</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;