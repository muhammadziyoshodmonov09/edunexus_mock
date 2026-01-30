import React, { useState } from 'react';
import { USERS, COURSES } from '../../services/mockData';
import { UserRole } from '../../types';
import { UserAPI } from '../../services/api';
import { Mail, Trash2, Edit, MoreHorizontal, UserPlus, Search, Send } from 'lucide-react';

const DirectorTeachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  
  // Filter for teachers in the current school (mocked as s1)
  const teachers = USERS.filter(u => u.role === UserRole.TEACHER && u.schoolId === 's1' && u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getTeacherStats = (teacherId: string) => {
     const courses = COURSES.filter(c => c.teacherId === teacherId);
     return {
        courses: courses.length,
        students: 25 * courses.length, // Mock calculation
        avgRating: 4.8 // Mock rating
     };
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setIsInviting(true);
    await UserAPI.invite(inviteEmail, 'TEACHER', 's1');
    setIsInviting(false);
    setShowInviteModal(false);
    setInviteEmail('');
    alert('Taklifnoma muvaffaqiyatli yuborildi!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">O'qituvchilarni Boshqarish</h1>
           <p className="text-slate-500">O'qituvchi hisoblarini, tayinlovlarni va ruxsatlarni boshqaring.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
           <UserPlus className="w-4 h-4" />
           <span>O'qituvchini Taklif Qilish</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex gap-4">
           <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                 type="text" 
                 placeholder="O'qituvchilarni qidirish..." 
                 className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">O'qituvchi</th>
              <th className="px-6 py-4">Kafedra / Fanlar</th>
              <th className="px-6 py-4">Yuklama</th>
              <th className="px-6 py-4">Oxirgi Faollik</th>
              <th className="px-6 py-4">Holat</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {teachers.map(teacher => {
                const stats = getTeacherStats(teacher.id);
                const subjects = COURSES.filter(c => c.teacherId === teacher.id).map(c => c.title).join(', ');
                
                return (
                   <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <img src={teacher.avatarUrl} alt={teacher.name} className="w-10 h-10 rounded-full bg-slate-200 object-cover" />
                            <div>
                               <p className="font-semibold text-slate-900">{teacher.name}</p>
                               <p className="text-xs text-slate-500">{teacher.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <p className="text-slate-900 font-medium truncate max-w-[200px]">{subjects || 'Umumiy'}</p>
                      </td>
                      <td className="px-6 py-4">
                         <div className="text-xs text-slate-600">
                            <span className="font-semibold">{stats.courses}</span> Sinf
                         </div>
                         <div className="text-xs text-slate-500">
                            ~{stats.students} Talaba
                         </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{teacher.lastActive || 'N/A'}</td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            Faol
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                               <Mail className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                               <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                      </td>
                   </tr>
                );
             })}
          </tbody>
        </table>
        {teachers.length === 0 && (
           <div className="p-12 text-center text-slate-500">
              Qidiruv bo'yicha o'qituvchilar topilmadi.
           </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="p-5 border-b border-slate-200">
                 <h3 className="font-bold text-slate-900">Yangi O'qituvchini Taklif Qilish</h3>
                 <p className="text-xs text-slate-500">Yangi o'qituvchiga kirish emailini yuboring.</p>
              </div>
              <div className="p-6">
                 <label className="block text-sm font-medium text-slate-700 mb-2">O'qituvchi Emaili</label>
                 <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="teacher@school.edu"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                 </div>
              </div>
              <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                 <button onClick={() => setShowInviteModal(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">Bekor qilish</button>
                 <button 
                   onClick={handleInvite} 
                   disabled={isInviting || !inviteEmail}
                   className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50"
                 >
                    {isInviting ? 'Yuborilmoqda...' : 'Taklifnoma Yuborish'}
                    <Send className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DirectorTeachers;
