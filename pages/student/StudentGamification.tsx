import React, { useState } from 'react';
import { User } from '../../types';
import { ShoppingBag, Star, Trophy, Target, Gift, Lock, Zap, Crown, Shield, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentGamification: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'store' | 'inventory' | 'achievements'>('store');
  const [userCoins, setUserCoins] = useState(2450);
  const [userLevel, setUserLevel] = useState(5);
  const [userXP, setUserXP] = useState(75); // 75% to next level

  // Mock Store Data
  const storeItems = [
    { id: 1, name: "Neon Avatar Ramka", price: 500, icon: <div className="w-12 h-12 rounded-full border-4 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] bg-slate-800"></div>, category: "FRAME", owned: false },
    { id: 2, name: "Oltin Laqab", price: 1200, icon: <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600">KING</span>, category: "TITLE", owned: false },
    { id: 3, name: "Dark Mode Pro", price: 800, icon: <Palette className="w-8 h-8 text-purple-500" />, category: "THEME", owned: true },
    { id: 4, name: "Sirli Sandiq", price: 300, icon: <Gift className="w-8 h-8 text-pink-500 animate-bounce" />, category: "LOOTBOX", owned: false },
    { id: 5, name: "Double XP (1 soat)", price: 600, icon: <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />, category: "BOOST", owned: false },
    { id: 6, name: "Afsonaviy Qalqon", price: 5000, icon: <Shield className="w-8 h-8 text-emerald-500" />, category: "BADGE", owned: false },
  ];

  // Mock Achievements
  const achievements = [
    { id: 1, title: "Birinchi Qadam", desc: "Ilk darsni yakunladingiz", progress: 100, total: 100, claimed: true, reward: 50 },
    { id: 2, title: "Kitob Qurt", desc: "10 ta darsni o'qib chiqish", progress: 8, total: 10, claimed: false, reward: 200 },
    { id: 3, title: "Matematika Dahosi", desc: "Barcha testlardan 100% olish", progress: 2, total: 5, claimed: false, reward: 500 },
  ];

  const handleBuy = (price: number) => {
    if (userCoins >= price) {
      setUserCoins(prev => prev - price);
      alert("Sotib olindi! 🎉");
    } else {
      alert("Mablag' yetarli emas! 😢");
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Profile Stats */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-[80px]"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
               <div className="w-24 h-24 rounded-full border-4 border-yellow-400 p-1 bg-slate-800 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                  <img src={user.avatarUrl} className="w-full h-full rounded-full object-cover" />
               </div>
               <div className="absolute -bottom-3 -right-3 bg-red-500 text-white font-black text-xs px-2 py-1 rounded-lg border-2 border-slate-900">
                  LVL {userLevel}
               </div>
            </div>
            
            <div className="flex-1 text-center md:text-left w-full">
               <h1 className="text-3xl font-black mb-2">{user.name}</h1>
               <div className="w-full bg-slate-700/50 rounded-full h-4 mb-2 overflow-hidden border border-white/10">
                  <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: `${userXP}%` }} 
                     className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                  ></motion.div>
               </div>
               <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>{userXP} / 100 XP</span>
                  <span>Keyingi darajaga: {100 - userXP} XP</span>
               </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-white/10 min-w-[180px]">
               <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/1198/1198322.png" className="w-8 h-8 drop-shadow-md" alt="coin" />
               </div>
               <div>
                  <p className="text-xs text-yellow-200 font-bold uppercase">Balans</p>
                  <p className="text-2xl font-black text-yellow-400">{userCoins.toLocaleString()}</p>
               </div>
            </div>
         </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
         <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex gap-2">
            {['store', 'achievements', 'inventory'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                     activeTab === tab 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
               >
                  {tab === 'store' && <ShoppingBag className="w-4 h-4" />}
                  {tab === 'achievements' && <Trophy className="w-4 h-4" />}
                  {tab === 'inventory' && <Lock className="w-4 h-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
               </button>
            ))}
         </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
         <AnimatePresence mode="wait">
            {activeTab === 'store' && (
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
               >
                  {storeItems.map((item) => (
                     <div key={item.id} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all group flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-slate-50 rounded-t-[2rem] z-0"></div>
                        <div className="relative z-10 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                           {item.icon}
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h3>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded mb-4 uppercase tracking-wide">{item.category}</span>
                        
                        <button 
                           onClick={() => !item.owned && handleBuy(item.price)}
                           disabled={item.owned}
                           className={`mt-auto w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                              item.owned 
                                 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                 : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-95'
                           }`}
                        >
                           {item.owned ? (
                              <>Sotib Olingan</>
                           ) : (
                              <>
                                 <img src="https://cdn-icons-png.flaticon.com/512/1198/1198322.png" className="w-4 h-4" />
                                 {item.price}
                              </>
                           )}
                        </button>
                     </div>
                  ))}
               </motion.div>
            )}

            {activeTab === 'achievements' && (
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 max-w-3xl mx-auto"
               >
                  {achievements.map((ach) => (
                     <div key={ach.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${ach.progress === ach.total ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-400'}`}>
                           <Trophy className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between mb-1">
                              <h3 className="font-bold text-slate-900">{ach.title}</h3>
                              <span className="text-xs font-bold text-slate-500">{ach.progress}/{ach.total}</span>
                           </div>
                           <p className="text-xs text-slate-500 mb-3">{ach.desc}</p>
                           <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-1000 ${ach.progress === ach.total ? 'bg-yellow-500' : 'bg-indigo-500'}`} style={{ width: `${(ach.progress / ach.total) * 100}%` }}></div>
                           </div>
                        </div>
                        <button 
                           disabled={ach.claimed || ach.progress < ach.total}
                           className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                              ach.claimed 
                                 ? 'bg-emerald-100 text-emerald-700' 
                                 : ach.progress < ach.total 
                                    ? 'bg-slate-100 text-slate-400' 
                                    : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-lg shadow-yellow-400/30 animate-pulse'
                           }`}
                        >
                           {ach.claimed ? 'Qabul Qilindi' : `+${ach.reward} Coin`}
                        </button>
                     </div>
                  ))}
               </motion.div>
            )}

            {activeTab === 'inventory' && (
               <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                     <Lock className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700">Inventarizatsiya</h3>
                  <p className="text-slate-500">Sizda hozircha faqat asosiy buyumlar mavjud.</p>
               </div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentGamification;