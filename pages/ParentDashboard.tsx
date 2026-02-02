import React from 'react';
import { User } from '../types';
import { USERS } from '../services/mockData';
import { Baby, CreditCard, Bell, Calendar, ArrowRight, TrendingUp, AlertCircle, CheckCircle2, Wallet, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ParentDashboard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  
  // Mock children data (In real app, fetch via ID)
  // Assuming user.childrenIds contains IDs. For mock, we'll use a hardcoded list or find by relationship logic.
  const children = [
     USERS.find(u => u.id === 'u1')!, // Aziza
     { ...USERS.find(u => u.id === 'u6')!, name: 'Ali Talaba', avatarUrl: 'https://ui-avatars.com/api/?name=Ali+Talaba&background=random' } // Mock Sibling
  ].filter(Boolean);

  const totalDue = 1200000;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-3xl font-black text-slate-900">Ota-onalar Markazi</h1>
            <p className="text-slate-500 font-medium">Farzandlaringiz ta'limi va moliyaviy holat nazorati.</p>
         </div>
         <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <Bell className="w-5 h-5" /> 3 ta yangi xabar
         </button>
      </div>

      {/* Children Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {children.map((child, i) => (
            <motion.div 
               key={child.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ y: -5 }}
               onClick={() => navigate(`/parent/child/${child.id}`)}
               className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-xl shadow-slate-200/40 cursor-pointer group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-0 group-hover:bg-indigo-100 transition-colors"></div>
               
               <div className="flex items-center gap-4 mb-6 relative z-10">
                  <img src={child.avatarUrl} alt={child.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md" />
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 leading-tight">{child.name}</h3>
                     <p className="text-xs text-slate-500 font-medium">10-A Sinf • Lincoln High</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                     <div className="flex items-center gap-1.5 mb-1">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-slate-400 uppercase">O'rtacha</span>
                     </div>
                     <span className="text-2xl font-black text-slate-800">4.8</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                     <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold text-slate-400 uppercase">Davomat</span>
                     </div>
                     <span className="text-2xl font-black text-slate-800">96%</span>
                  </div>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Faol O'quvchi</span>
                  <div className="p-2 bg-slate-100 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     <ArrowRight className="w-4 h-4" />
                  </div>
               </div>
            </motion.div>
         ))}

         {/* Add Child / Empty State */}
         <button className="border-2 border-dashed border-slate-300 rounded-[2rem] p-6 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all min-h-[280px]">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
               <Baby className="w-8 h-8 text-slate-300" />
            </div>
            <span className="font-bold">Yana farzand qo'shish</span>
            <span className="text-xs mt-1">Maktab kodi orqali</span>
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Financial Overview */}
         <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div>
                  <div className="flex items-center gap-2 mb-2 text-indigo-300 font-bold text-xs uppercase tracking-widest">
                     <Wallet className="w-4 h-4" /> Moliyaviy Holat
                  </div>
                  <h2 className="text-4xl font-black mb-1">{totalDue.toLocaleString()} UZS</h2>
                  <p className="text-slate-400 text-sm">Joriy oy uchun to'lov (Noyabr)</p>
               </div>
               
               <div className="flex gap-3">
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2">
                     <CreditCard className="w-4 h-4" /> To'lash (Click/Payme)
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors">
                     Tarix
                  </button>
               </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 text-emerald-400">
                     <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-sm font-bold">Oktabr</p>
                     <p className="text-xs text-slate-400">To'langan</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 text-emerald-400">
                     <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-sm font-bold">Sentabr</p>
                     <p className="text-xs text-slate-400">To'langan</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 opacity-50">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                     <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-sm font-bold">Avgust</p>
                     <p className="text-xs text-slate-400">Ta'til</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Alerts & Notifications */}
         <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <AlertCircle className="w-5 h-5 text-orange-500" /> Muhim Eslatmalar
            </h3>
            <div className="space-y-3">
               <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex gap-3">
                  <div className="mt-1"><Calendar className="w-4 h-4 text-orange-600" /></div>
                  <div>
                     <h4 className="font-bold text-slate-800 text-sm">Ota-onalar majlisi</h4>
                     <p className="text-xs text-slate-600 mt-1">25-Noyabr, 18:00 da maktab faollar zalida.</p>
                  </div>
               </div>
               <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-3">
                  <div className="mt-1"><TrendingUp className="w-4 h-4 text-indigo-600" /></div>
                  <div>
                     <h4 className="font-bold text-slate-800 text-sm">Chorak yakuni</h4>
                     <p className="text-xs text-slate-600 mt-1">1-chorak yakuniga 5 kun qoldi. Baholarni tekshiring.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ParentDashboard;