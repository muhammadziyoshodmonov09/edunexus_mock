import React, { useState } from 'react';
import { User } from '../../types';
import { Check, X, Clock, Mail, MoreHorizontal, Send, Users } from 'lucide-react';
import { CommunicationAPI } from '../../services/api';

const TeacherStudents: React.FC = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Mock student list for a class
  const students = Array.from({ length: 8 }, (_, i) => ({
    id: `st${i}`,
    name: ['Alex Johnson', 'Sam Smith', 'Jordan Lee', 'Casey West', 'Jamie Doe', 'Riley Reid', 'Taylor Swift', 'Morgan Free'][i],
    email: `student${i}@school.edu`,
    attendanceRate: 85 + Math.floor(Math.random() * 15),
    lastGrade: 70 + Math.floor(Math.random() * 30),
    status: Math.random() > 0.8 ? 'Absent' : 'Present'
  }));

  const handleSendAnnouncement = async () => {
    if (!message) return;
    setIsSending(true);
    await CommunicationAPI.sendAnnouncement('s1', message, ['Class 10A']);
    setIsSending(false);
    setShowAnnouncement(false);
    setMessage('');
    alert('E\'lon muvaffaqiyatli yuborildi!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sinf Ro'yxati</h1>
          <p className="text-slate-500">Talabalarni boshqarish va davomatni olish.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
             CSV Eksport
           </button>
           <button 
             onClick={() => setShowAnnouncement(true)}
             className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2"
           >
             <Mail className="w-4 h-4" /> E'lon Yuborish
           </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
           <h3 className="font-bold text-slate-800">Davomat: {new Date().toLocaleDateString()}</h3>
           <button className="text-sm text-indigo-600 font-medium hover:underline">Hammasini Bor Deb Belgilash</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Talaba</th>
              <th className="px-6 py-4">Bugungi Holat</th>
              <th className="px-6 py-4">Davomat Darajasi</th>
              <th className="px-6 py-4">Oxirgi Natija</th>
              <th className="px-6 py-4 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    <button className={`p-1.5 rounded ${student.status === 'Present' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500' : 'bg-slate-100 text-slate-400 hover:bg-emerald-50'}`} title="Bor">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className={`p-1.5 rounded ${student.status === 'Absent' ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'bg-slate-100 text-slate-400 hover:bg-red-50'}`} title="Yo'q">
                      <X className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded bg-slate-100 text-slate-400 hover:bg-orange-50 hover:text-orange-600" title="Kechikdi">
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                     <span className="font-medium text-slate-700">{student.attendanceRate}%</span>
                     <div className="w-16 bg-slate-200 rounded-full h-1">
                        <div className={`h-1 rounded-full ${student.attendanceRate > 90 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${student.attendanceRate}%` }}></div>
                     </div>
                   </div>
                </td>
                <td className="px-6 py-4">
                   <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                     student.lastGrade >= 90 ? 'bg-emerald-100 text-emerald-700' : 
                     student.lastGrade >= 75 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                   }`}>
                     Oxirgi Baho: {student.lastGrade}%
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <button className="p-2 text-slate-400 hover:text-indigo-600">
                      <Mail className="w-4 h-4" />
                   </button>
                   <button className="p-2 text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-4 h-4" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                 <p className="text-xs text-slate-500">Ushbu sinfdagi barcha 24 talabani xabardor qilish.</p>
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
