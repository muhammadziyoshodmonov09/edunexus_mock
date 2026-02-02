import React, { useState } from 'react';
import { USERS, SCHOOLS } from '../../services/mockData';
import { User, UserRole } from '../../types';
import { Search, Filter, Shield, Lock, MoreHorizontal, Plus, X, Check, Mail, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'STUDENT',
    schoolId: 's1'
  });

  const filteredUsers = users.filter(u => {
     const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
     return matchesSearch && matchesRole;
  });

  const getSchoolName = (schoolId: string) => {
     if (schoolId === 'global') return 'Global Admin';
     return SCHOOLS.find(s => s.id === schoolId)?.name || 'Unknown School';
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const createdUser: User = {
        id: `u${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as UserRole,
        schoolId: newUser.schoolId,
        avatarUrl: `https://ui-avatars.com/api/?name=${newUser.name}&background=random`,
        status: 'ACTIVE',
        lastActive: 'Hozirgina'
      };

      setUsers([createdUser, ...users]);
      setIsSubmitting(false);
      setShowAddModal(false);
      setNewUser({ name: '', email: '', role: 'STUDENT', schoolId: 's1' });
      // Here you would typically show a success toast
    }, 1000);
  };

  return (
    <div className="space-y-6 relative">
       <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
           <h1 className="text-3xl font-black text-slate-900">Foydalanuvchilar Bazasi</h1>
           <p className="text-slate-500 font-medium">Platformadagi barcha rollar va ruxsatlarni boshqaring.</p>
         </div>
         <button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all active:scale-95"
         >
            <Plus className="w-5 h-5" />
            Yangi Foydalanuvchi
         </button>
       </div>

       <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 w-full sm:max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Ism yoki email orqali qidiring..." 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
               <select 
                  className="px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm cursor-pointer"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
               >
                  <option value="ALL">Barcha Rollar</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DIRECTOR">Direktor</option>
                  <option value="TEACHER">O'qituvchi</option>
                  <option value="STUDENT">Talaba</option>
               </select>
            </div>
         </div>

         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-white text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-xs">
               <tr>
                 <th className="px-6 py-5">Foydalanuvchi</th>
                 <th className="px-6 py-5">Roli</th>
                 <th className="px-6 py-5">Tashkilot</th>
                 <th className="px-6 py-5">Oxirgi Faollik</th>
                 <th className="px-6 py-5">Holat</th>
                 <th className="px-6 py-5 text-right">Amallar</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                <AnimatePresence>
                {filteredUsers.map(user => (
                   <motion.tr 
                      layout
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      key={user.id} 
                      className="hover:bg-slate-50 transition-colors group"
                   >
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-4">
                            <div className="relative">
                               <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full bg-slate-200 object-cover border-2 border-white shadow-sm" />
                               <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                            </div>
                            <div>
                               <p className="font-bold text-slate-900">{user.name}</p>
                               <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${
                            user.role === 'ADMIN' ? 'bg-red-50 text-red-700 border-red-100' :
                            user.role === 'DIRECTOR' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                            user.role === 'TEACHER' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                            'bg-emerald-50 text-emerald-700 border-emerald-100'
                         }`}>
                            {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
                            {user.role}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-bold text-xs">
                         {getSchoolName(user.schoolId)}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{user.lastActive || 'N/A'}</td>
                      <td className="px-6 py-4">
                         <span className={`text-xs font-bold px-2 py-1 rounded ${
                            user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 
                            user.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                         }`}>
                            {user.status || 'ACTIVE'}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-lg shadow-sm transition-all" title="Manage Permissions">
                               <Lock className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 rounded-lg shadow-sm transition-all">
                               <MoreHorizontal className="w-4 h-4" />
                            </button>
                         </div>
                      </td>
                   </motion.tr>
                ))}
                </AnimatePresence>
             </tbody>
           </table>
         </div>
         {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-8 h-8 text-slate-300" />
               </div>
               <h3 className="text-slate-900 font-bold mb-1">Foydalanuvchilar topilmadi</h3>
               <p className="text-slate-500 text-sm">Qidiruv so'zini o'zgartirib ko'ring yoki yangi foydalanuvchi qo'shing.</p>
            </div>
         )}
       </div>

       {/* Add User Modal */}
       <AnimatePresence>
         {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20"
               >
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                     <div>
                        <h2 className="text-xl font-black text-slate-900">Yangi Foydalanuvchi</h2>
                        <p className="text-sm text-slate-500 font-medium">Tizimga yangi a'zo qo'shish</p>
                     </div>
                     <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                        <X className="w-5 h-5" />
                     </button>
                  </div>
                  
                  <form onSubmit={handleAddUser} className="p-8 space-y-5">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">To'liq Ism</label>
                        <div className="relative">
                           <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                           <input 
                              required
                              type="text" 
                              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                              placeholder="Masalan: Jamshid Aliyev"
                              value={newUser.name}
                              onChange={e => setNewUser({...newUser, name: e.target.value})}
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Email Manzil</label>
                        <div className="relative">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                           <input 
                              required
                              type="email" 
                              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                              placeholder="jamshid@school.edu"
                              value={newUser.email}
                              onChange={e => setNewUser({...newUser, email: e.target.value})}
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Rol</label>
                           <select 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer"
                              value={newUser.role}
                              onChange={e => setNewUser({...newUser, role: e.target.value})}
                           >
                              <option value="STUDENT">Talaba</option>
                              <option value="TEACHER">O'qituvchi</option>
                              <option value="DIRECTOR">Direktor</option>
                              <option value="ADMIN">Admin</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Maktab</label>
                           <select 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all cursor-pointer"
                              value={newUser.schoolId}
                              onChange={e => setNewUser({...newUser, schoolId: e.target.value})}
                           >
                              {SCHOOLS.map(s => (
                                 <option key={s.id} value={s.id}>{s.name}</option>
                              ))}
                           </select>
                        </div>
                     </div>

                     <div className="pt-4 flex gap-3">
                        <button 
                           type="button"
                           onClick={() => setShowAddModal(false)}
                           className="flex-1 py-3.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                           Bekor qilish
                        </button>
                        <button 
                           type="submit"
                           disabled={isSubmitting}
                           className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
                        >
                           {isSubmitting ? (
                              <>
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                 Qo'shilmoqda...
                              </>
                           ) : (
                              <>
                                 <Check className="w-5 h-5" />
                                 Saqlash
                              </>
                           )}
                        </button>
                     </div>
                  </form>
               </motion.div>
            </div>
         )}
       </AnimatePresence>
    </div>
  );
};

export default AdminUsers;