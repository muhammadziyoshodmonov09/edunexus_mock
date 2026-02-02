import React from 'react';
import { User, UserRole } from '../types';
import { getSchoolStats, USERS } from '../services/mockData';
import { StatCard, PerformanceChart } from '../components/Widgets';
import { Users, AlertTriangle, TrendingUp, CheckCircle, Clock, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DirectorDashboard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const schoolStats = getSchoolStats(user.schoolId);
  const attendanceData = [
    { name: '1-hafta', value: 92 }, { name: '2-hafta', value: 94 },
    { name: '3-hafta', value: 91 }, { name: '4-hafta', value: 95 }
  ];

  const pendingStudents = USERS.filter(u => u.schoolId === user.schoolId && u.role === UserRole.STUDENT && u.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Maktab Boshqaruv Markazi</h1>
           <p className="text-slate-500">Monitoring: {user.schoolId === 's1' ? 'Lincoln High' : 'Tech Academy'}</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => navigate('/director/teachers')} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              O'qituvchilarni Boshqarish
           </button>
           <button onClick={() => navigate('/director/analytics')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
              Analitikani Ko'rish
           </button>
        </div>
      </div>

      {/* --- NEUROLINK BANNER --- */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/30 cursor-pointer group"
         onClick={() => navigate('/director/neurolink')}
      >
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/30 transition-colors"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>
         
         <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-xl">
               <div className="flex items-center gap-2 mb-2 text-indigo-300 font-bold text-xs uppercase tracking-widest">
                  <BrainCircuit className="w-4 h-4 animate-pulse" />
                  Yangi • AI Boshqaruv
               </div>
               <h2 className="text-3xl font-black mb-2">EduNexus NeuroLink™ ga o'tish</h2>
               <p className="text-slate-300 font-medium">
                  Maktabingizning "Raqamli Egizagi". Sun'iy intellekt yordamida kelajakni bashorat qiling, ijtimoiy kayfiyatni o'lchang va strategik qarorlar qabul qiling.
               </p>
            </div>
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white/10 rounded-full backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
               <BrainCircuit className="w-8 h-8 text-white" />
            </div>
         </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {schoolStats.map((s, i) => <StatCard key={i} metric={s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           {/* Attendance Chart */}
           <PerformanceChart data={attendanceData} type="area" color="#10b981" />

           {/* Recent Activity / Alerts */}
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <Clock className="w-5 h-5 text-indigo-600" /> So'nggi Faoliyat
             </h3>
             <div className="space-y-4">
                <div className="flex gap-4 items-start p-3 border-b border-slate-50 last:border-0">
                   <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-4 h-4" /></div>
                   <div>
                      <p className="text-sm font-medium text-slate-900">Yangi O'qituvchi Qo'shildi</p>
                      <p className="text-xs text-slate-500">Xonim Jonson fanlar kafedrasiga qo'shildi.</p>
                      <p className="text-xs text-slate-400 mt-1">2 soat oldin</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start p-3 border-b border-slate-50 last:border-0">
                   <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle className="w-4 h-4" /></div>
                   <div>
                      <p className="text-sm font-medium text-slate-900">Baho Hisoboti Yakunlandi</p>
                      <p className="text-xs text-slate-500">10-sinflar uchun 3-chorak baholari qayta ishlandi.</p>
                      <p className="text-xs text-slate-400 mt-1">Kecha</p>
                   </div>
                </div>
                <div className="flex gap-4 items-start p-3 border-b border-slate-50 last:border-0">
                   <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><AlertTriangle className="w-4 h-4" /></div>
                   <div>
                      <p className="text-sm font-medium text-slate-900">Davomat Ogohlantirishi</p>
                      <p className="text-xs text-slate-500">9-sinf davomati bu hafta 90% dan tushib ketdi.</p>
                      <p className="text-xs text-slate-400 mt-1">2 kun oldin</p>
                   </div>
                </div>
             </div>
           </div>
        </div>
        
        <div className="space-y-6">
          {/* Action Required Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Harakat Talab Etiladi
            </h3>
            {pendingStudents > 0 ? (
               <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg mb-4">
                  <p className="text-sm font-bold text-slate-800">{pendingStudents} Yangi Talaba So'rovi</p>
                  <p className="text-xs text-slate-600 mt-1">Hisobni tasdiqlashni kutayotgan talabalar.</p>
                  <button onClick={() => navigate('/director/students')} className="mt-3 text-xs bg-amber-200 text-amber-800 px-3 py-1.5 rounded font-bold hover:bg-amber-300">
                    So'rovlarni Ko'rish
                  </button>
               </div>
            ) : (
               <div className="text-center py-6 text-slate-500 text-sm">Hammasi joyida! Kutilayotgan harakatlar yo'q.</div>
            )}
            
            <div className="border-t border-slate-100 pt-4 mt-2">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Tezkor Havolalar</h4>
               <ul className="space-y-2 text-sm">
                  <li><button className="text-indigo-600 hover:underline">Oylik Hisobotni Yuklab Olish</button></li>
                  <li><button className="text-indigo-600 hover:underline">O'quv Dasturi Standartlarini Ko'rish</button></li>
                  <li><button className="text-indigo-600 hover:underline">Xodimlarga Xabar Yuborish</button></li>
               </ul>
            </div>
          </div>

          {/* Teacher Leaderboard Mini */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-slate-900">Eng Yaxshi O'qituvchilar</h3>
             </div>
             <div className="space-y-3">
                 {[1,2,3].map((i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">TN</div>
                        <div>
                           <p className="text-sm font-medium text-slate-900">O'qituvchi {i}</p>
                           <p className="text-xs text-slate-500">Fan Kafedrasi</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold">
                        4.{9-i} <TrendingUp className="w-3 h-3" />
                     </div>
                   </div>
                 ))}
             </div>
             <button onClick={() => navigate('/director/teachers')} className="w-full mt-4 text-center text-xs font-bold text-slate-500 hover:text-indigo-600 border border-slate-200 rounded py-2 hover:bg-slate-50">
               Barcha O'qituvchilarni Ko'rish
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorDashboard;