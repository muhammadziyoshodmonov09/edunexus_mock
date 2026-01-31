import React from 'react';
import { User } from '../types';
import { USERS, GRADEBOOK, ATTENDANCE, ASSIGNMENTS } from '../services/mockData';
import { StatCard, PerformanceChart } from '../components/Widgets';
import { Baby, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ParentDashboard: React.FC<{ user: User }> = ({ user }) => {
  // Mock: Get the first child of the parent
  const childId = user.childrenIds?.[0];
  const child = USERS.find(u => u.id === childId);

  if (!child) return <div className="p-8">Farzand ma'lumotlari topilmadi.</div>;

  // Mock Aggregated Data for Child
  const totalScore = GRADEBOOK.reduce((acc, curr) => acc + curr.semester1.total, 0) / GRADEBOOK.length;
  const assignmentsPending = ASSIGNMENTS.filter(a => a.status === 'PENDING').length;
  
  const stats = [
    { label: "O'rtacha Baho (100)", value: Math.round(totalScore), trend: 'up' as const, change: '+2' },
    { label: "Davomat", value: "94%", trend: 'neutral' as const },
    { label: "Topshiriqlar", value: `${assignmentsPending} ta qoldi`, trend: 'down' as const }, // down is good here contextually? maybe not visually.
  ];

  const attendanceData = [
    { name: 'Dush', value: 100 }, { name: 'Sesh', value: 100 }, 
    { name: 'Chor', value: 0 }, { name: 'Pay', value: 100 }, { name: 'Jum', value: 100 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 bg-white/50 p-6 rounded-[2rem] border border-white/60 backdrop-blur-sm">
         <div className="relative">
            <img src={child.avatarUrl} alt={child.name} className="w-16 h-16 rounded-full border-4 border-white shadow-md" />
            <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-5 h-5 rounded-full"></div>
         </div>
         <div>
            <h1 className="text-2xl font-black text-slate-900">{child.name}ni Nazorat Qilish</h1>
            <p className="text-slate-500 font-medium">Sinf: 10-A | Maktab: Lincoln High</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => <StatCard key={i} metric={s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Academic Performance */}
         <div className="glass-panel p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
               <TrendingUp className="w-6 h-6 text-indigo-600" /> Akademik Natijalar (1-Semestr)
            </h3>
            <div className="space-y-4">
               {GRADEBOOK.map(grade => (
                  <div key={grade.courseId} className="bg-white/60 rounded-xl p-4 border border-white">
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-900">{grade.courseName}</span>
                        <span className={`px-3 py-1 rounded-lg text-sm font-black ${
                           grade.semester1.total > 85 ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                           {grade.semester1.total} ball
                        </span>
                     </div>
                     <div className="w-full bg-slate-200 rounded-full h-2">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${grade.semester1.total}%` }}
                           className={`h-2 rounded-full ${grade.semester1.total > 85 ? 'bg-emerald-500' : 'bg-orange-500'}`} 
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Weekly Attendance */}
         <div className="space-y-6">
            <div className="glass-panel p-8 rounded-[2rem]">
               <h3 className="text-xl font-bold text-slate-800 mb-6">Haftalik Davomat</h3>
               <div className="h-64">
                  <PerformanceChart data={attendanceData} type="bar" color="#10b981" />
               </div>
            </div>

            {/* Notifications / Warnings */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> Muhim Eslatmalar
               </h3>
               <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                     <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-slate-800">Matematika Imtihoni</p>
                        <p className="text-xs text-slate-600">Ertaga soat 9:00 da. Farzandingiz tayyorlanishiga yordam bering.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                     <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold text-slate-800">Dars qoldirish</p>
                        <p className="text-xs text-slate-600">Chorshanba kuni Fizika darsiga kechikdi.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ParentDashboard;