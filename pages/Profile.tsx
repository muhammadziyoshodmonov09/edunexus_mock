import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Camera, Save, Lock, Mail, User as UserIcon, Shield, Building, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC<{ user: User }> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Profil ma'lumotlari muvaffaqiyatli yangilandi!");
    }, 1500);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'bg-red-100 text-red-700 border-red-200';
      case UserRole.DIRECTOR: return 'bg-purple-100 text-purple-700 border-purple-200';
      case UserRole.TEACHER: return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case UserRole.STUDENT: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profil Sozlamalari</h1>
          <p className="text-slate-500">Shaxsiy ma'lumotlaringiz va hisob xavfsizligini boshqaring.</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide flex items-center gap-2 ${getRoleBadgeColor(user.role)}`}>
          <Shield className="w-3 h-3" />
          {user.role}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Public Info */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-4 group">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover border-4 border-slate-50 group-hover:border-indigo-100 transition-colors"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-lg border-2 border-white">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-500 text-sm mb-4">{user.email}</p>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50 py-2 rounded-lg">
              <Building className="w-3 h-3" />
              <span>{user.schoolId === 'global' ? 'Global Admin' : user.schoolId === 's1' ? 'Lincoln High' : 'Tech Academy'}</span>
            </div>
          </motion.div>

          {/* Account Status */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4">Hisob Holati</h3>
             <div className="space-y-3">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">A'zo bo'lingan sana:</span>
                   <span className="font-medium text-slate-900">15 Avg, 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Oxirgi kirish:</span>
                   <span className="font-medium text-slate-900">{user.lastActive || 'Hozir'}</span>
                </div>
                <div className="pt-3 border-t border-slate-100">
                   <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      Faol
                   </span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
               <UserIcon className="w-5 h-5 text-indigo-600" />
               Asosiy Ma'lumotlar
            </h3>
            <form onSubmit={handleSave} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">To'liq Ism</label>
                     <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">Email Manzil</label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                           type="email" 
                           value={formData.email}
                           disabled
                           className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium"
                        />
                     </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                     <Lock className="w-5 h-5 text-indigo-600" />
                     Xavfsizlik
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Joriy Parol</label>
                        <input 
                           type="password" 
                           placeholder="••••••••"
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Yangi Parol</label>
                        <input 
                           type="password" 
                           placeholder="••••••••"
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                        />
                     </div>
                  </div>
               </div>

               <div className="pt-4 flex justify-end">
                  <button 
                     type="submit" 
                     disabled={isLoading}
                     className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70"
                  >
                     {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     ) : (
                        <Save className="w-4 h-4" />
                     )}
                     Saqlash
                  </button>
               </div>
            </form>
          </motion.div>

          {/* Danger Zone */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
             <h3 className="text-red-800 font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Xavfli Hudud
             </h3>
             <p className="text-sm text-red-600 mb-4">
                Hisobingizni o'chirsangiz, barcha ma'lumotlaringiz (baholar, kurslar, tarix) butunlay yo'qoladi.
             </p>
             <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors">
                Hisobni O'chirish
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;