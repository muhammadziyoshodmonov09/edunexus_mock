import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { USERS, GRADEBOOK, COURSES } from '../../services/mockData';
import { ChevronLeft, BrainCircuit, BookOpen, Clock, Activity, Star, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PerformanceChart } from '../../components/Widgets';
import { GoogleGenAI } from "@google/genai";

const ParentChildView: React.FC<{ user: User }> = ({ user }) => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'grades' | 'attendance' | 'schedule'>('grades');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Mock fetching child data
  const child = USERS.find(u => u.id === childId) || USERS.find(u => u.id === 'u1'); // Fallback to u1 for demo
  
  // Calculate stats
  const grades = GRADEBOOK;
  const avgScore = Math.round(grades.reduce((acc, g) => acc + g.semester1.total, 0) / grades.length);
  
  // AI Insight Generator
  const generateAiInsight = async () => {
     setIsAiLoading(true);
     // Simulate AI call
     setTimeout(() => {
        setAiAnalysis(`Aziza uchun AI tahlili:
        
1. Kuchli tomonlari: Matematika va Tarix fanlaridan o'zlashtirish juda yuqori (95%+). Mantiqiy fikrlash qobiliyati rivojlangan.
2. E'tibor talab joylari: Fizika fanidan biroz pasayish kuzatildi. Uyga vazifalarni bajarishda ko'proq amaliy mashg'ulot kerak.
3. Tavsiya: Fizika bo'yicha "Khan Academy" videolari yoki qo'shimcha laboratoriya mashg'ulotlari foydali bo'ladi.`);
        setIsAiLoading(false);
     }, 2000);
  };

  if (!child) return <div>Child not found</div>;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Navigation */}
      <button onClick={() => navigate('/parent')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors">
         <ChevronLeft className="w-5 h-5" /> Boshqaruv Paneliga qaytish
      </button>

      {/* Child Profile Header */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
               <img src={child.avatarUrl} alt={child.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
               <div className="absolute bottom-2 right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
               <h1 className="text-4xl font-black text-slate-900 mb-2">{child.name}</h1>
               <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">10-A Sinf</span>
                  <span className="px-3 py-1 bg-indigo-50 rounded-lg text-xs font-bold text-indigo-600 border border-indigo-100">ID: {child.id.toUpperCase()}</span>
               </div>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-8">
                  <div>
                     <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">O'rtacha Baho</p>
                     <p className="text-2xl font-black text-slate-900">{avgScore}</p>
                  </div>
                  <div>
                     <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Reyting</p>
                     <p className="text-2xl font-black text-slate-900">#3</p>
                  </div>
                  <div>
                     <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Davomat</p>
                     <p className="text-2xl font-black text-emerald-600">96%</p>
                  </div>
               </div>
            </div>

            <div className="w-full md:w-auto">
               <button 
                  onClick={generateAiInsight}
                  disabled={isAiLoading}
                  className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
               >
                  <BrainCircuit className="w-5 h-5" />
                  {isAiLoading ? 'Tahlil qilinmoqda...' : 'AI Tahlilini Olish'}
               </button>
            </div>
         </div>

         {/* AI Insight Box */}
         <AnimatePresence>
            {aiAnalysis && (
               <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 relative"
               >
                  <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-3 py-1 rounded-full border border-indigo-100 text-xs font-bold text-indigo-600 shadow-sm flex items-center gap-2">
                     <BrainCircuit className="w-3 h-3" /> Gemini Insight
                  </div>
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                     {aiAnalysis}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Main Content Tabs */}
      <div>
         <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button 
               onClick={() => setActiveTab('grades')}
               className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'grades' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
               <BookOpen className="w-4 h-4" /> Baholar Jurnali
            </button>
            <button 
               onClick={() => setActiveTab('attendance')}
               className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'attendance' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
               <Clock className="w-4 h-4" /> Davomat
            </button>
            <button 
               onClick={() => setActiveTab('schedule')}
               className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'schedule' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
               <Activity className="w-4 h-4" /> Dars Jadvali
            </button>
         </div>

         {activeTab === 'grades' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                     <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                        <tr>
                           <th className="px-6 py-4">Fan</th>
                           <th className="px-6 py-4 text-center">Joriy</th>
                           <th className="px-6 py-4 text-center">Oraliq</th>
                           <th className="px-6 py-4 text-center">Yakuniy</th>
                           <th className="px-6 py-4 text-center">Jami</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {grades.map((g) => (
                           <tr key={g.courseId} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900">{g.courseName}</td>
                              <td className="px-6 py-4 text-center text-slate-600">{g.semester1.current}</td>
                              <td className="px-6 py-4 text-center text-slate-600">{g.semester1.midterm}</td>
                              <td className="px-6 py-4 text-center text-slate-600">{g.semester1.final}</td>
                              <td className="px-6 py-4 text-center">
                                 <span className={`px-3 py-1 rounded-lg font-black ${
                                    g.semester1.total > 85 ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                                 }`}>
                                    {g.semester1.total}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               
               <div className="space-y-6">
                  <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-900 mb-4">O'zlashtirish Dinamikasi</h3>
                     <div className="h-48">
                        <PerformanceChart 
                           data={grades.map(g => ({ name: g.courseName.slice(0,3), value: g.semester1.total }))} 
                           type="area" 
                           color="#6366f1" 
                        />
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden">
                     <Star className="absolute -right-4 -bottom-4 w-32 h-32 text-white/20 rotate-12" />
                     <h3 className="font-black text-xl mb-1">Top 3%</h3>
                     <p className="text-white/90 text-sm font-medium mb-4">Aziza sinfdagi eng faol o'quvchilar qatorida!</p>
                  </div>
               </div>
            </div>
         )}

         {activeTab === 'attendance' && (
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 text-center text-slate-500">
               <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
               <p>Davomat tarixi tez orada yuklanadi.</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default ParentChildView;