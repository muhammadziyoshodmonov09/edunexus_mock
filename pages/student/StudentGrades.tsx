import React, { useState } from 'react';
import { User } from '../../types';
import { GRADEBOOK } from '../../services/mockData';
import { PerformanceChart } from '../../components/Widgets';
import { Award, TrendingUp, Book, Crown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const StudentGrades: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useLanguage();
  const [semester, setSemester] = useState<'semester1' | 'semester2'>('semester1');

  // Calculate totals for charts
  const performanceData = GRADEBOOK.map(entry => ({
    name: entry.courseName,
    value: entry[semester].total
  }));

  // Mock Leaderboard Data
  const leaderboard = [
    { name: 'Aziza Talaba', points: 285, rank: 1, avatar: 'https://picsum.photos/id/101/100' },
    { name: 'Bobur Quruvchi', points: 278, rank: 2, avatar: 'https://picsum.photos/id/106/100' },
    { name: 'Dono R.', points: 270, rank: 3, avatar: 'https://picsum.photos/id/108/100' },
    { name: 'Ali V.', points: 255, rank: 4, avatar: 'https://ui-avatars.com/api/?name=Ali+V' },
    { name: 'Zara K.', points: 240, rank: 5, avatar: 'https://ui-avatars.com/api/?name=Zara+K' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
            <h1 className="text-3xl font-black text-slate-900">{t('grades')}</h1>
            <p className="text-slate-500 font-medium">100 ballik tizim bo'yicha akademik ko'rsatkichlaringiz.</p>
         </div>
         <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm">
            <button 
              onClick={() => setSemester('semester1')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${semester === 'semester1' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}
            >
              {t('semester1')}
            </button>
            <button 
              onClick={() => setSemester('semester2')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${semester === 'semester2' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}`}
            >
              {t('semester2')}
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Grade Table - 2/3 Width */}
        <motion.div 
          layout
          className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
               <Book className="w-5 h-5 text-indigo-600" /> {t('semester1')} Kundaligi
            </h2>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Max: 100 Ball</div>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-white text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-5">Fan</th>
                    <th className="px-6 py-5 text-center bg-blue-50/30 text-blue-700">{t('currentScore')}</th>
                    <th className="px-6 py-5 text-center bg-purple-50/30 text-purple-700">{t('midterm')}</th>
                    <th className="px-6 py-5 text-center bg-orange-50/30 text-orange-700">{t('final')}</th>
                    <th className="px-6 py-5 text-center bg-emerald-50/30 text-emerald-700 font-black">{t('total')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   <AnimatePresence mode="wait">
                   {GRADEBOOK.map((entry, i) => (
                     <motion.tr 
                        key={entry.courseId} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="hover:bg-slate-50 transition-colors"
                     >
                       <td className="px-6 py-5 font-bold text-slate-900">{entry.courseName}</td>
                       <td className="px-6 py-5 text-center font-semibold text-slate-600 bg-blue-50/10">{entry[semester].current}</td>
                       <td className="px-6 py-5 text-center font-semibold text-slate-600 bg-purple-50/10">{entry[semester].midterm}</td>
                       <td className="px-6 py-5 text-center font-semibold text-slate-600 bg-orange-50/10">{entry[semester].final}</td>
                       <td className="px-6 py-5 text-center bg-emerald-50/10">
                          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-sm shadow-sm ${
                             entry[semester].total >= 86 ? 'bg-emerald-100 text-emerald-700' :
                             entry[semester].total >= 71 ? 'bg-blue-100 text-blue-700' :
                             'bg-orange-100 text-orange-700'
                          }`}>
                             {entry[semester].total}
                          </span>
                       </td>
                     </motion.tr>
                   ))}
                   </AnimatePresence>
                </tbody>
             </table>
          </div>
          {semester === 'semester2' && GRADEBOOK[0].semester2.total === 0 && (
             <div className="p-12 text-center text-slate-400 font-medium">
                2-Semestr hali boshlanmagan.
             </div>
          )}
        </motion.div>

        {/* Right Column: Chart & Leaderboard */}
        <div className="space-y-8">
           {/* Chart */}
           <div className="h-64">
              <PerformanceChart data={performanceData} type="bar" color="#8b5cf6" />
           </div>

           {/* Leaderboard */}
           <motion.div 
             className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-[60px]"></div>
              
              <h3 className="font-black text-xl mb-6 flex items-center gap-2 relative z-10">
                 <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                 {t('leaderboard')}
              </h3>

              <div className="space-y-4 relative z-10">
                 {leaderboard.map((student, idx) => (
                    <div 
                       key={idx} 
                       className={`flex items-center gap-3 p-3 rounded-xl transition-transform ${
                          student.name === user.name ? 'bg-white/20 border border-white/30 scale-105 shadow-lg' : 'bg-white/5 border border-white/5'
                       }`}
                    >
                       <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-lg ${
                          idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                          idx === 1 ? 'bg-slate-300 text-slate-900' :
                          idx === 2 ? 'bg-orange-400 text-orange-900' :
                          'bg-white/10 text-white'
                       }`}>
                          {student.rank}
                       </div>
                       <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border-2 border-white/20" />
                       <div className="flex-1">
                          <p className="text-sm font-bold truncate">{student.name}</p>
                          <p className="text-[10px] opacity-70">Jami ball</p>
                       </div>
                       <div className="font-black text-emerald-400">{student.points}</div>
                    </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;