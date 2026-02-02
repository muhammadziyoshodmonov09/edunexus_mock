import React, { useState } from 'react';
import { PerformanceChart } from '../../components/Widgets';
import { COURSES } from '../../services/mockData';
import { Download, PieChart, TrendingUp, DollarSign, Activity, Plus, X, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const DirectorAnalytics: React.FC = () => {
  // Aggregate mock data from courses
  const subjectPerformance = COURSES.map(c => ({
     name: c.title.split(' ')[0], 
     value: c.averageGrade || 0
  }));

  // State for Financial Data to allow updates
  const [financialData, setFinancialData] = useState([
     { name: 'Yan', income: 4000, expense: 2400 },
     { name: 'Fev', income: 3000, expense: 1398 },
     { name: 'Mar', income: 2000, expense: 9800 },
     { name: 'Apr', income: 2780, expense: 3908 },
     { name: 'May', income: 1890, expense: 4800 },
     { name: 'Iyun', income: 2390, expense: 3800 },
     { name: 'Iyul', income: 3490, expense: 4300 },
  ]);

  const [showTransModal, setShowTransModal] = useState(false);
  const [newTrans, setNewTrans] = useState({ type: 'INCOME', amount: '', description: '' });

  const handleAddTransaction = () => {
     if (!newTrans.amount) return;
     const amount = parseInt(newTrans.amount);
     
     // Update the last month (simulating current month update)
     const newData = [...financialData];
     const lastIdx = newData.length - 1;
     
     if (newTrans.type === 'INCOME') {
        newData[lastIdx].income += amount;
     } else {
        newData[lastIdx].expense += amount;
     }
     
     setFinancialData(newData);
     setShowTransModal(false);
     setNewTrans({ type: 'INCOME', amount: '', description: '' });
  };

  return (
    <div className="space-y-8 relative">
       <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Tahliliy Markaz</h1>
           <p className="text-slate-500">Maktabning akademik va moliyaviy ko'rsatkichlari.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setShowTransModal(true)}
             className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
           >
              <Plus className="w-4 h-4" />
              <span>Tranzaksiya</span>
           </button>
           <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              <Download className="w-4 h-4" />
              <span>Hisobot</span>
           </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
               <DollarSign className="w-5 h-5 text-emerald-600" /> Moliyaviy Oqim
            </h3>
            <div className="flex gap-4 text-sm">
               <span className="flex items-center gap-1 font-bold text-emerald-600"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Kirim</span>
               <span className="flex items-center gap-1 font-bold text-red-500"><div className="w-2 h-2 rounded-full bg-red-500"></div> Chiqim</span>
            </div>
         </div>
         <div className="h-80 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={financialData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                     <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                     </linearGradient>
                     <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                  <Area type="monotone" dataKey="expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Subject Performance */}
         <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Fanlar O'zlashtirilishi</h3>
            <div className="h-64">
               <PerformanceChart data={subjectPerformance} type="bar" color="#6366f1" />
            </div>
         </div>

         {/* Classroom Heatmap */}
         <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Activity className="w-5 h-5 text-orange-500" /> Sinf Xonalari Bandligi
            </h3>
            <div className="grid grid-cols-4 gap-3">
               {Array.from({length: 16}).map((_, i) => {
                  const usage = Math.random();
                  return (
                     <div key={i} className="aspect-square rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden bg-slate-50 transition-all hover:scale-105">
                        <div 
                           className={`absolute inset-0 opacity-80 ${
                              usage > 0.8 ? 'bg-red-500' : usage > 0.5 ? 'bg-orange-400' : 'bg-emerald-400'
                           }`}
                        ></div>
                        <span className="relative z-10 font-bold text-white text-sm">#{101 + i}</span>
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-white text-xs font-bold">{Math.round(usage * 100)}%</span>
                        </div>
                     </div>
                  )
               })}
            </div>
            <div className="flex justify-between mt-4 text-xs font-medium text-slate-500">
               <span>1-Qavat</span>
               <span className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Yuqori</span>
               <span className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full"></div> Normal</span>
            </div>
         </div>
      </div>

      {/* Transaction Modal */}
      <AnimatePresence>
      {showTransModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden"
            >
               <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-xl text-slate-900">Tranzaksiya Kiritish</h3>
                  <button onClick={() => setShowTransModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
               </div>
               <div className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4 bg-slate-100 p-1.5 rounded-xl">
                     <button 
                        onClick={() => setNewTrans({...newTrans, type: 'INCOME'})}
                        className={`py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${newTrans.type === 'INCOME' ? 'bg-white shadow text-emerald-600' : 'text-slate-500'}`}
                     >
                        <ArrowUpRight className="w-4 h-4" /> Kirim
                     </button>
                     <button 
                        onClick={() => setNewTrans({...newTrans, type: 'EXPENSE'})}
                        className={`py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${newTrans.type === 'EXPENSE' ? 'bg-white shadow text-red-600' : 'text-slate-500'}`}
                     >
                        <ArrowDownLeft className="w-4 h-4" /> Chiqim
                     </button>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Summa ($)</label>
                     <input 
                        type="number" 
                        value={newTrans.amount}
                        onChange={(e) => setNewTrans({...newTrans, amount: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-2xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder="0" 
                        autoFocus
                     />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Izoh</label>
                     <input 
                        type="text" 
                        value={newTrans.description}
                        onChange={(e) => setNewTrans({...newTrans, description: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder="Masalan: O'quv qurollari uchun" 
                     />
                  </div>

                  <button 
                     onClick={handleAddTransaction}
                     className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg transition-all active:scale-95"
                  >
                     Tasdiqlash
                  </button>
               </div>
            </motion.div>
         </div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default DirectorAnalytics;