import React, { useState } from 'react';
import { User } from '../../types';
import { Check, X, Clock, Mail, MoreHorizontal, Send, Users, LayoutGrid, List } from 'lucide-react';
import { CommunicationAPI } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherStudents: React.FC = () => {
  const [viewMode, setViewMode] = useState<'LIST' | 'GRID'>('GRID');
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Mock student list with seat positions for Visual Classroom
  const [students, setStudents] = useState(Array.from({ length: 12 }, (_, i) => ({
    id: `st${i}`,
    name: ['Aziz Rahimov', 'Malika Karimova', 'Jasur Aliyev', 'Dono Sobirova', 'Bobur Tursunov', 'Laylo Usmonova', 'Sardor Qodirov', 'Zarina Yusupova', 'Timur Valiyev', 'Nigora T.', 'Davron K.', 'Sevara M.'][i],
    email: `student${i}@school.edu`,
    attendanceRate: 85 + Math.floor(Math.random() * 15),
    lastGrade: 70 + Math.floor(Math.random() * 30),
    status: 'Present' as 'Present' | 'Absent' | 'Late',
    seat: i // seat index
  })));

  const handleSendAnnouncement = async () => {
    if (!message) return;
    setIsSending(true);
    await CommunicationAPI.sendAnnouncement('s1', message, ['Class 10A']);
    setIsSending(false);
    setShowAnnouncement(false);
    setMessage('');
    alert('E\'lon muvaffaqiyatli yuborildi!');
  };

  const toggleAttendance = (id: string) => {
     setStudents(prev => prev.map(s => {
        if (s.id !== id) return s;
        const nextStatus = s.status === 'Present' ? 'Absent' : s.status === 'Absent' ? 'Late' : 'Present';
        return { ...s, status: nextStatus };
     }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sinf Jurnali</h1>
          <p className="text-slate-500">Talabalar davomati va faolligini boshqaring.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
           <button 
             onClick={() => setViewMode('LIST')}
             className={`p-2 rounded-lg transition-all ${viewMode === 'LIST' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
           >
              <List className="w-5 h-5" />
           </button>
           <button 
             onClick={() => setViewMode('GRID')}
             className={`p-2 rounded-lg transition-all ${viewMode === 'GRID' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
           >
              <LayoutGrid className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
         <div className="flex gap-2">
            <button 
               onClick={() => setShowAnnouncement(true)}
               className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
            >
               <Mail className="w-4 h-4" /> E'lon Yuborish
            </button>
         </div>
         <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
            Jami: {students.length} o'quvchi
         </div>
      </div>

      {viewMode === 'GRID' ? (
         <div className="bg-slate-200/50 p-8 rounded-[2rem] border-2 border-dashed border-slate-300 relative min-h-[500px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-8 py-2 rounded-b-xl text-xs font-bold uppercase tracking-widest shadow-lg">
               Doska
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
               <AnimatePresence>
               {students.map((student) => (
                  <motion.div 
                     layout
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     key={student.id}
                     onClick={() => toggleAttendance(student.id)}
                     className={`relative bg-white p-4 rounded-2xl border-b-4 cursor-pointer transition-all hover:-translate-y-1 active:translate-y-0 select-none group ${
                        student.status === 'Present' ? 'border-emerald-500 shadow-emerald-500/10' :
                        student.status === 'Absent' ? 'border-red-500 shadow-red-500/10' :
                        'border-amber-500 shadow-amber-500/10'
                     } shadow-xl`}
                  >
                     <div className="flex justify-between items-start mb-3">
                        <div className={`w-3 h-3 rounded-full ${
                           student.status === 'Present' ? 'bg-emerald-500' :
                           student.status === 'Absent' ? 'bg-red-500' : 'bg-amber-500'
                        } animate-pulse`}></div>
                        <div className="text-[10px] font-bold text-slate-400">#{student.seat + 1}</div>
                     </div>
                     <div className="text-center mb-2">
                        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full mb-2 overflow-hidden border-2 border-white shadow-sm">
                           <img src={`https://ui-avatars.com/api/?name=${student.name}&background=random`} alt={student.name} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm">{student.name}</h3>
                        <p className="text-[10px] text-slate-500 font-medium bg-slate-50 inline-block px-2 rounded mt-1">{student.attendanceRate}% Davomat</p>
                     </div>
                     <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                           {student.status === 'Present' ? 'Yo\'q qilish' : student.status === 'Absent' ? 'Kechikdi' : 'Bor qilish'}
                        </span>
                     </div>
                  </motion.div>
               ))}
               </AnimatePresence>
            </div>
            
            <div className="mt-8 flex justify-center gap-6">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Bor
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div> Yo'q
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div> Kechikdi
               </div>
            </div>
         </div>
      ) : (
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
           <table className="w-full text-left text-sm">
             <thead className="text-slate-500 font-medium border-b border-slate-200 bg-slate-50">
               <tr>
                 <th className="px-6 py-4">Talaba</th>
                 <th className="px-6 py-4">Bugungi Holat</th>
                 <th className="px-6 py-4">Reyting</th>
                 <th className="px-6 py-4 text-right">Amallar</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {students.map((student) => (
                 <tr key={student.id} className="hover:bg-slate-50">
                   <td className="px-6 py-4 font-semibold text-slate-900">{student.name}</td>
                   <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        student.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                        student.status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                     }`}>
                        {student.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 font-bold text-slate-700">{student.lastGrade} Ball</td>
                   <td className="px-6 py-4 text-right">
                      <button onClick={() => toggleAttendance(student.id)} className="text-indigo-600 font-bold text-xs hover:underline">O'zgartirish</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncement && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                 <Users className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="font-bold text-slate-900">E'lon Yuborish</h3>
                 <p className="text-xs text-slate-500">Sinf guruhiga xabar yuborish.</p>
              </div>
            </div>
            <div className="p-6">
               <label className="block text-sm font-medium text-slate-700 mb-2">Xabar</label>
               <textarea 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none h-32 resize-none"
                  placeholder="masalan: Ertaga soat 9:00 dagi imtihonni unutmang!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
               />
            </div>
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowAnnouncement(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">Bekor qilish</button>
              <button 
                onClick={handleSendAnnouncement} 
                disabled={isSending || !message}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50"
              >
                 {isSending ? 'Yuborilmoqda...' : 'Hozir Yuborish'}
                 <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherStudents;