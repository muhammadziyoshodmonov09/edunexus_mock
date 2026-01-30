import React, { useState } from 'react';
import { User, Course, Lesson, Assignment } from '../types';
import { COURSES, LESSONS, ASSIGNMENTS } from '../services/mockData';
import { StatCard, PerformanceChart } from '../components/Widgets';
import { PlayCircle, FileText, CheckCircle, Clock, Sparkles, ArrowRight, BrainCircuit, Star } from 'lucide-react';
import { askTutor } from '../services/geminiService';
import { motion } from 'framer-motion';

const StudentDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorResponse, setTutorResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Filter data for this student (mock logic)
  const myCourses = COURSES.filter(c => c.schoolId === user.schoolId);
  const pendingAssignments = ASSIGNMENTS.filter(a => a.status === 'PENDING');

  const stats = [
    { label: 'O\'rtacha Baho', value: '88%', trend: 'up' as const, change: '+2%' },
    { label: 'Tugatilgan Darslar', value: '12', trend: 'up' as const, change: '+4' },
    { label: 'Kutilayotgan Topshiriqlar', value: pendingAssignments.length, trend: 'neutral' as const },
  ];

  const handleAskTutor = async () => {
    if (!tutorQuery.trim()) return;
    setIsThinking(true);
    const context = selectedLesson ? selectedLesson.title : "General Studies";
    const answer = await askTutor(tutorQuery, context);
    setTutorResponse(answer);
    setIsThinking(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center bg-gradient-to-r from-indigo-500/10 to-transparent p-6 rounded-3xl border border-indigo-100/20 backdrop-blur-sm">
        <div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Salom, {user.name} 👋</h1>
           <p className="text-slate-500 font-semibold text-lg">Bugungi o'quv rejangiz tayyor.</p>
        </div>
        <div className="flex gap-2">
           <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 rounded-2xl text-xs font-black shadow-lg shadow-amber-500/20 flex items-center gap-2"
           >
             <Star className="w-4 h-4 fill-amber-900" />
             OLTIN DARAJA
           </motion.div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => <StatCard key={i} metric={s} />)}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Courses & Lessons */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[2rem]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Mening Kurslarim</h2>
              <button className="text-indigo-600 text-sm font-bold hover:bg-white hover:shadow-sm px-4 py-2 rounded-xl transition-all">Barchasini Ko'rish</button>
            </div>
            <div className="space-y-4">
              {myCourses.map(course => (
                <motion.div 
                  whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.6)' }}
                  whileTap={{ scale: 0.99 }}
                  key={course.id} 
                  className="group bg-white/40 border border-white/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-5"
                >
                  <img src={course.thumbnail} alt={course.title} className="w-24 h-16 object-cover rounded-xl shadow-sm" />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-lg">{course.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1 bg-slate-200/50 rounded-full h-2.5 overflow-hidden">
                        <div className="premium-gradient h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-black text-slate-600">{course.progress}%</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:shadow-lg transition-all">
                     <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[2rem]">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Oxirgi Darslar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LESSONS.slice(0, 4).map(lesson => (
                <motion.div 
                  whileHover={{ y: -5, borderColor: '#6366f1' }}
                  key={lesson.id} 
                  onClick={() => { setSelectedLesson(lesson); setTutorResponse(''); }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    selectedLesson?.id === lesson.id 
                      ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl' 
                      : 'bg-white/40 border-white/60 hover:bg-white/80 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl shadow-sm ${lesson.type === 'VIDEO' ? 'bg-indigo-100 text-indigo-600' : lesson.type === 'TEXT' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {lesson.type === 'VIDEO' && <PlayCircle className="w-5 h-5" />}
                      {lesson.type === 'TEXT' && <FileText className="w-5 h-5" />}
                      {lesson.type === 'QUIZ' && <CheckCircle className="w-5 h-5" />}
                    </div>
                    {lesson.isCompleted && <div className="bg-emerald-100 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-emerald-600" /></div>}
                  </div>
                  <h4 className="font-bold text-slate-900 line-clamp-1 mb-2 text-lg">{lesson.title}</h4>
                  <p className="text-xs font-semibold text-slate-500 line-clamp-2">{lesson.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: AI Tutor & Assignments */}
        <div className="space-y-8">
          {/* AI Tutor - Updated visual */}
          <motion.div 
            variants={itemVariants} 
            className="rounded-[2.5rem] p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/30"
          >
             <div className="bg-[#0f172a] rounded-[2.3rem] p-6 h-full relative overflow-hidden">
                {/* Glowing Orbs inside AI Card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/40 rounded-full blur-[50px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/40 rounded-full blur-[50px] animate-pulse delay-1000"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg">
                      <BrainCircuit className="w-6 h-6 text-indigo-300" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">AI Repetitor</h2>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <p className="text-xs text-indigo-200 font-medium">Online</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedLesson ? (
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-indigo-200 bg-white/5 p-3 rounded-xl border border-white/5 uppercase tracking-wider">
                        Mavzu: <span className="text-white">{selectedLesson.title}</span>
                      </p>
                      
                      <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 min-h-[150px] max-h-80 overflow-y-auto border border-white/10 shadow-inner custom-scrollbar">
                        {tutorResponse ? (
                           <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-sm leading-relaxed text-indigo-50">{tutorResponse}</motion.p>
                        ) : (
                           <div className="flex flex-col items-center justify-center h-full text-indigo-300/50 gap-2">
                              <Sparkles className="w-6 h-6" />
                              <p className="text-xs text-center">Savollaringizni bering...</p>
                           </div>
                        )}
                      </div>

                      <div className="flex gap-2 relative">
                        <input 
                          type="text" 
                          value={tutorQuery}
                          onChange={(e) => setTutorQuery(e.target.value)}
                          placeholder="Savol yozing..."
                          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-white/30 focus:outline-none focus:bg-white/20 text-white transition-all shadow-inner"
                          onKeyDown={(e) => e.key === 'Enter' && handleAskTutor()}
                        />
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          onClick={handleAskTutor}
                          disabled={isThinking}
                          className="bg-indigo-500 hover:bg-indigo-400 text-white p-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/40"
                        >
                          {isThinking ? <span className="animate-spin block">↻</span> : <ArrowRight className="w-5 h-5" />}
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                      <p className="text-sm font-medium text-indigo-200">Mavzu tanlang</p>
                    </div>
                  )}
                </div>
             </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[2rem]">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Muddati Yaqin</h2>
            <div className="space-y-4">
              {pendingAssignments.map(assign => (
                <motion.div 
                  whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.8)' }}
                  key={assign.id} 
                  className="flex items-start gap-4 p-4 bg-white/40 border border-white/50 rounded-2xl shadow-sm transition-all cursor-pointer group"
                >
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{assign.title}</h4>
                    <p className="text-xs font-bold text-slate-500 mt-1 bg-slate-100 inline-block px-2 py-0.5 rounded-md">Muddat: {assign.dueDate}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;