import React, { useState } from 'react';
import { User, Course } from '../types';
import { COURSES, getSchoolStats } from '../services/mockData';
import { StatCard, PerformanceChart } from '../components/Widgets';
import { generateLessonPlan } from '../services/geminiService';
import { Plus, Users, BookOpen, BrainCircuit, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  // Stats for teacher's classes
  const stats = [
    { label: 'Jami Talabalar', value: 142, change: '+5%', trend: 'up' as const },
    { label: 'Baholangan Ishlar', value: '45/50', change: '90%', trend: 'neutral' as const },
    { label: 'O\'rtacha Sinf Bahosi', value: '82%', change: '-1%', trend: 'down' as const },
  ];

  const chartData = [
    { name: 'Dush', value: 85 }, { name: 'Sesh', value: 88 }, { name: 'Chor', value: 82 },
    { name: 'Pay', value: 90 }, { name: 'Jum', value: 87 }
  ];

  const handleGenerate = async () => {
    if (!topic) return;
    setLoadingAi(true);
    const result = await generateLessonPlan(topic, '10-Sinf');
    setGeneratedPlan(result);
    setLoadingAi(false);
  };

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center bg-white/40 p-6 rounded-[2rem] border border-white/50 backdrop-blur-sm">
        <div>
           <h1 className="text-3xl font-black text-slate-800">O'qituvchi Boshqaruv Paneli</h1>
           <p className="text-slate-500 font-medium">Sinflaringiz va o'quv dasturlaringiz nazorati.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAiModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/30"
        >
          <BrainCircuit className="w-5 h-5" />
          <span>AI Dars Rejalashtirgich</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => <StatCard key={i} metric={s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-[2rem]">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-slate-800">Faol Kurslar</h2>
           </div>
           <div className="space-y-4">
              {COURSES.filter(c => c.teacherId === user.id).map(course => (
                 <motion.div 
                    whileHover={{ scale: 1.01, x: 5 }}
                    key={course.id} 
                    className="flex items-center gap-5 p-4 bg-white/50 border border-white/60 rounded-2xl hover:shadow-md transition-all cursor-pointer"
                 >
                    <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg">{course.title}</h3>
                      <p className="text-xs font-semibold text-slate-500 bg-slate-100 inline-block px-2 py-0.5 rounded mt-1">{course.description}</p>
                    </div>
                    <button className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-white rounded-xl transition-colors">
                      <SettingsIcon className="w-6 h-6" />
                    </button>
                 </motion.div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-2xl text-indigo-500 font-bold hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Yangi Kurs Yaratish
              </button>
           </div>
        </div>

        <PerformanceChart data={chartData} color="#8b5cf6" />
      </div>

      {/* AI Modal Overlay with AnimatePresence */}
      <AnimatePresence>
      {showAiModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-white/50"
          >
            <div className="p-8 border-b border-slate-200/50 flex justify-between items-center bg-white/40 rounded-t-[2rem]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/20">
                  <BrainCircuit className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">AI Dars Generator</h2>
                  <p className="text-sm font-semibold text-slate-500">Gemini 3 Flash texnologiyasi</p>
                </div>
              </div>
              <button onClick={() => setShowAiModal(false)} className="p-2 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 rounded-xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              {!generatedPlan ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Mavzu yoki Standart</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-semibold text-lg"
                      placeholder="masalan: Kvant Fizikasi asoslari..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  <div className="bg-indigo-50/50 border border-indigo-100 text-indigo-800 text-sm p-5 rounded-2xl flex gap-3">
                    <Sparkles className="w-5 h-5 flex-shrink-0" />
                    <p className="font-medium">AI sizga to'liq dars rejasi, vaqt taqsimoti, faoliyat turlari va uyga vazifalar ro'yxatini shakllantirib beradi.</p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none prose-indigo bg-white/50 p-6 rounded-2xl border border-white shadow-sm">
                  <pre className="whitespace-pre-wrap font-sans text-slate-700">{generatedPlan}</pre>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-200/50 bg-white/40 rounded-b-[2rem] flex justify-end gap-3">
              <button onClick={() => setShowAiModal(false)} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Bekor qilish</button>
              {!generatedPlan ? (
                 <button 
                  onClick={handleGenerate} 
                  disabled={loadingAi || !topic}
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
                >
                  {loadingAi ? 'Yaratilmoqda...' : 'Reja Yaratish'}
                  {loadingAi && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                </button>
              ) : (
                <button 
                  onClick={() => { setGeneratedPlan(''); setTopic(''); }}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 shadow-sm"
                >
                  Boshidan Boshlash
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

const SettingsIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
)

export default TeacherDashboard;