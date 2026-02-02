import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, AlertTriangle, ArrowLeft, Brain, Battery, Signal, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STUDENTS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `O'quvchi ${i + 1}`,
  engagement: Math.random() * 100,
  battery: Math.floor(Math.random() * 60) + 40,
  status: Math.random() > 0.8 ? 'DISTRACTED' : 'FOCUSED',
}));

const TeacherRadar: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents(prev => prev.map(s => ({
        ...s,
        engagement: Math.max(0, Math.min(100, s.engagement + (Math.random() - 0.5) * 10)),
        status: Math.random() > 0.9 ? (s.status === 'FOCUSED' ? 'DISTRACTED' : 'FOCUSED') : s.status
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const averageEngagement = Math.round(students.reduce((acc, s) => acc + s.engagement, 0) / students.length);
  const distractedCount = students.filter(s => s.status === 'DISTRACTED').length;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 relative overflow-hidden flex flex-col h-screen">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
      
      {/* Radar Sweep Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-indigo-500/10 pointer-events-none">
         <div className="w-full h-full rounded-full animate-spin-slow bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-50"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
         <div className="flex items-center gap-4">
            <button onClick={() => navigate('/teacher')} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
               <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
               <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <Signal className="w-6 h-6 text-emerald-400 animate-pulse" />
                  Classroom Pulse Radar
               </h1>
               <p className="text-slate-400 text-sm">Real vaqt rejimidagi sinf energiyasi</p>
            </div>
         </div>
         
         <div className="flex gap-4">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-3 px-6 text-center">
               <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Sinf Energiyasi</div>
               <div className={`text-2xl font-black ${averageEngagement > 70 ? 'text-emerald-400' : 'text-orange-400'}`}>{averageEngagement}%</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-3 px-6 text-center">
               <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Diqqat</div>
               <div className="text-2xl font-black text-white flex items-center justify-center gap-2">
                  {students.length - distractedCount} <span className="text-xs text-slate-500 font-normal">/ {students.length}</span>
               </div>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 overflow-hidden relative z-10">
         
         {/* CLASSROOM MAP */}
         <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 px-6 py-2 rounded-xl border border-white/5 text-xs font-bold uppercase tracking-widest text-slate-300">
               Doska / Ekran
            </div>
            
            <div className="grid grid-cols-5 gap-6 mt-12 h-full content-center justify-items-center">
               {students.map((student) => (
                  <motion.div
                     layout
                     key={student.id}
                     onClick={() => setSelectedStudent(student)}
                     className={`relative w-24 h-24 rounded-2xl border-2 cursor-pointer transition-all hover:scale-110 flex flex-col items-center justify-center p-2 group ${
                        selectedStudent?.id === student.id 
                           ? 'bg-indigo-600/80 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.5)] z-20' 
                           : student.status === 'DISTRACTED'
                              ? 'bg-red-900/40 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                              : 'bg-slate-800/60 border-slate-700 hover:border-indigo-500/50'
                     }`}
                  >
                     <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs mb-2 ${
                           student.status === 'DISTRACTED' ? 'bg-red-500 text-white' : 'bg-slate-600 text-slate-200'
                        }`}>
                           {student.id + 1}
                        </div>
                        {student.status === 'DISTRACTED' && (
                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                        )}
                     </div>
                     <p className="text-[10px] font-bold text-center leading-tight truncate w-full">{student.name}</p>
                     
                     {/* Mini Bar */}
                     <div className="w-full bg-black/50 h-1 rounded-full mt-2 overflow-hidden">
                        <div 
                           className={`h-full transition-all duration-1000 ${student.engagement > 70 ? 'bg-emerald-400' : student.engagement > 40 ? 'bg-yellow-400' : 'bg-red-400'}`} 
                           style={{ width: `${student.engagement}%` }}
                        ></div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* SIDEBAR STATS */}
         <div className="w-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col">
            {selectedStudent ? (
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={selectedStudent.id}
                  className="space-y-6"
               >
                  <div className="text-center">
                     <div className="w-24 h-24 mx-auto bg-slate-700 rounded-full mb-4 border-4 border-slate-600 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${selectedStudent.name}&background=random`} alt="" className="w-full h-full" />
                     </div>
                     <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                        selectedStudent.status === 'FOCUSED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400 animate-pulse'
                     }`}>
                        {selectedStudent.status === 'FOCUSED' ? 'Diqqat Jamlangan' : 'Chalg\'igan'}
                     </span>
                  </div>

                  <div className="space-y-4">
                     <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                        <div className="flex justify-between text-sm mb-2">
                           <span className="text-slate-400 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> Engagement</span>
                           <span className="font-bold">{Math.round(selectedStudent.engagement)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                           <div className="bg-yellow-400 h-full transition-all duration-500" style={{ width: `${selectedStudent.engagement}%` }}></div>
                        </div>
                     </div>

                     <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                        <div className="flex justify-between text-sm mb-2">
                           <span className="text-slate-400 flex items-center gap-2"><Battery className="w-4 h-4 text-emerald-400" /> Energiya</span>
                           <span className="font-bold">{selectedStudent.battery}%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                           <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${selectedStudent.battery}%` }}></div>
                        </div>
                     </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                     <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase">AI Tavsiyasi</h3>
                     <p className="text-sm text-slate-300 leading-relaxed bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/30">
                        {selectedStudent.status === 'DISTRACTED' 
                           ? `${selectedStudent.name} 5 daqiqadan beri faol emas. Unga osonroq savol berib, darsga qaytaring.` 
                           : `${selectedStudent.name} bugun juda faol. Uni "Guruh sardori" qilib tayinlashni o'ylab ko'ring.`}
                     </p>
                  </div>
               </motion.div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center opacity-50">
                  <UserCheck className="w-16 h-16 mb-4" />
                  <p>O'quvchi haqida ma'lumot olish uchun ustiga bosing</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default TeacherRadar;