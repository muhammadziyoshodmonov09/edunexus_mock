import React, { useState, useEffect } from 'react';
import { User, Course, Lesson, Assignment } from '../types';
import { COURSES, LESSONS, ASSIGNMENTS, EVENTS } from '../services/mockData';
import { Play, Clock, Calendar, CheckCircle, Flame, ArrowRight, BookOpen, Star, Zap, BrainCircuit, Swords, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  
  // Time-aware greeting logic
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Xayrli tong');
    else if (hour < 18) setGreeting('Xayrli kun');
    else setGreeting('Xayrli oqshom');
  }, []);

  // Get active course and next lesson
  const activeCourse = COURSES.find(c => c.progress > 0 && c.progress < 100) || COURSES[0];
  const nextLesson = LESSONS.find(l => l.courseId === activeCourse.id && !l.isCompleted) || LESSONS[0];

  // Upcoming tasks
  const upcomingTasks = ASSIGNMENTS.filter(a => a.status === 'PENDING').slice(0, 3);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Section: Greeting & Quick Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl shadow-indigo-500/30"
      >
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-2"
               >
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/10">
                     <Flame className="w-3 h-3 text-orange-400 fill-orange-400" /> 12 Kunlik Strike
                  </span>
               </motion.div>
               <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                  {greeting}, {user.name.split(' ')[0]}! 👋
               </h1>
               <p className="text-indigo-100 text-lg max-w-lg">
                  Bugungi kun uchun 3 ta dars va 1 ta vazifa rejalashtirilgan. Tayyormisiz?
               </p>
            </div>
            
            {/* Progress Circle Widget */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-4">
               <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90">
                     <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/20" />
                     <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * 75) / 100} className="text-yellow-400" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">75%</div>
               </div>
               <div>
                  <p className="text-xs font-bold text-indigo-200 uppercase">Haftalik Maqsad</p>
                  <p className="text-lg font-bold">Ajoyib natija!</p>
               </div>
            </div>
         </div>
      </motion.div>

      {/* --- INNOVATION HUB (ARENA & GARDEN) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* AI Arena Card */}
         <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/student/arena')}
            className="cursor-pointer rounded-[2rem] p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 relative overflow-hidden group shadow-xl"
         >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/20 rounded-full blur-[50px] group-hover:bg-red-500/30 transition-colors"></div>
            
            <div className="relative z-10 flex justify-between items-start">
               <div>
                  <div className="flex items-center gap-2 mb-2 text-red-400 font-bold text-xs uppercase tracking-widest">
                     <Swords className="w-4 h-4" /> AI Debate
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Buyuklar Arenasi</h3>
                  <p className="text-slate-400 text-sm max-w-[200px]">Eynshteyn, Navoiy va Stiv Jobs bilan jonli bahs.</p>
               </div>
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-red-500 group-hover:border-red-500 transition-colors">
                  <ArrowRight className="w-6 h-6" />
               </div>
            </div>
         </motion.div>

         {/* Focus Garden Card */}
         <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/student/focus')}
            className="cursor-pointer rounded-[2rem] p-6 bg-[#F0FDF4] border border-emerald-200 relative overflow-hidden group shadow-xl"
         >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-[50px]"></div>
            
            <div className="relative z-10 flex justify-between items-start">
               <div>
                  <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                     <Leaf className="w-4 h-4" /> Zen Mode
                  </div>
                  <h3 className="text-2xl font-black text-emerald-900 mb-2">Diqqat Bog'i</h3>
                  <p className="text-emerald-700/70 text-sm max-w-[200px]">Pomodoro texnikasi orqali daraxt o'stiring.</p>
               </div>
               <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <ArrowRight className="w-6 h-6" />
               </div>
            </div>
         </motion.div>
      </div>

      {/* --- DREAMSCAPE ENTRY BANNER (EXISTING) --- */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.1 }}
         onClick={() => navigate('/student/dreamscape')}
         className="bg-[#020617] rounded-[2.5rem] p-1 border border-slate-800 cursor-pointer group hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
      >
         <div className="bg-slate-900 rounded-[2.3rem] p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute -left-20 top-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] group-hover:bg-cyan-500/30 transition-colors"></div>
            <div className="absolute -right-20 bottom-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] group-hover:bg-purple-500/30 transition-colors"></div>

            <div className="relative z-10 text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-cyan-300 text-xs font-bold mb-3 uppercase tracking-widest backdrop-blur-md">
                  <BrainCircuit className="w-3 h-3" /> New Feature
               </div>
               <h2 className="text-3xl font-black text-white mb-2">Dreamscape <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">OS</span></h2>
               <p className="text-slate-400 max-w-md text-sm md:text-base">
                  O'z iqtidor DNKngizni kashf qiling va sun'iy intellekt yordamida kelajakdagi kasbingizni ko'ring.
               </p>
            </div>

            <div className="relative z-10 flex items-center justify-center">
               <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm shadow-lg group-hover:scale-105 transition-transform flex items-center gap-2">
                  Kirish <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* 2. Main Content: Resume Learning & Agenda */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* Resume Learning Card (Netflix Style) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.1 }}
               className="group relative h-64 rounded-[2rem] overflow-hidden shadow-xl cursor-pointer"
               onClick={() => navigate(`/student/courses/${activeCourse.id}`)}
            >
               <img src={activeCourse.thumbnail} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
               
               <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                  <div>
                     <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Davom ettirish
                     </p>
                     <h2 className="text-3xl font-bold text-white mb-2">{activeCourse.title}</h2>
                     <p className="text-slate-300 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {nextLesson.title}
                     </p>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg group-hover:scale-110 transition-transform">
                     <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
               </div>
               {/* Progress bar at bottom */}
               <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20">
                  <div className="h-full bg-indigo-500" style={{ width: `${activeCourse.progress}%` }}></div>
               </div>
            </motion.div>

            {/* Daily Agenda */}
            <div>
               <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" /> Bugungi Kun Tartibi
               </h3>
               <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4">
                  {[
                     { time: '09:00', title: 'Matematika', type: 'Dars', status: 'done' },
                     { time: '11:00', title: 'Ingliz tili', type: 'Zoom', status: 'live' },
                     { time: '14:00', title: 'Fizika', type: 'Topshiriq', status: 'upcoming' },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center gap-4 group">
                        <div className="w-16 text-right text-sm font-bold text-slate-400">{item.time}</div>
                        <div className="relative flex flex-col items-center">
                           <div className={`w-3 h-3 rounded-full border-2 border-white ring-1 ${
                              item.status === 'done' ? 'bg-emerald-500 ring-emerald-200' :
                              item.status === 'live' ? 'bg-red-500 ring-red-200 animate-pulse' :
                              'bg-slate-300 ring-slate-100'
                           }`}></div>
                           {i !== 2 && <div className="w-0.5 h-10 bg-slate-100 mt-1"></div>}
                        </div>
                        <div className={`flex-1 p-3 rounded-xl flex justify-between items-center transition-all ${
                           item.status === 'live' ? 'bg-red-50 border border-red-100' : 'bg-slate-50 group-hover:bg-indigo-50'
                        }`}>
                           <div>
                              <h4 className="font-bold text-slate-800">{item.title}</h4>
                              <p className="text-xs text-slate-500">{item.type}</p>
                           </div>
                           {item.status === 'live' && (
                              <button className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm">
                                 Qo'shilish
                              </button>
                           )}
                           {item.status === 'done' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* 3. Right Sidebar: Quick Tasks & Leaderboard Mini */}
         <div className="space-y-8">
            {/* Assignments Widget */}
            <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900">Vazifalar</h3>
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg text-xs font-bold">{upcomingTasks.length} ta</span>
               </div>
               <div className="space-y-3">
                  {upcomingTasks.map(task => (
                     <div key={task.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">{task.dueDate}</span>
                           <Clock className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{task.title}</h4>
                        <div className="mt-3 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                           <div className="bg-orange-400 h-full w-2/3 rounded-full"></div>
                        </div>
                     </div>
                  ))}
               </div>
               <button onClick={() => navigate('/student/assignments')} className="w-full mt-4 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                  Barchasini ko'rish
               </button>
            </div>

            {/* Motivation Widget */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 text-white/20 rotate-12">
                  <Star className="w-32 h-32 fill-current" />
               </div>
               <h3 className="font-black text-2xl mb-1">Top 3%</h3>
               <p className="text-white/90 text-sm font-medium mb-4">Siz maktabdagi eng faol o'quvchilar qatoridasiz!</p>
               <button onClick={() => navigate('/student/gamification')} className="relative z-10 bg-white text-orange-600 px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform">
                  Reytingni ko'rish
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudentDashboard;