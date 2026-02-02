import React, { useState } from 'react';
import { Package, DollarSign, Users, Search, Plus, Filter, Monitor, PenTool, CheckCircle, AlertTriangle, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const DirectorManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'payroll'>('inventory');

  // Mock Inventory Data
  const inventory = [
    { id: 1, name: "Dell Optiplex 3080", category: "IT", status: "Good", location: "Lab 201", value: "$650" },
    { id: 2, name: "Student Desk (Double)", category: "Furniture", status: "Repair", location: "Class 10A", value: "$120" },
    { id: 3, name: "Projector Epson X5", category: "AV", status: "Good", location: "Meeting Hall", value: "$450" },
    { id: 4, name: "Whiteboard (Magnetic)", category: "Furniture", status: "Good", location: "Class 10B", value: "$80" },
    { id: 5, name: "Printer HP LaserJet", category: "IT", status: "Broken", location: "Staff Room", value: "$200" },
  ];

  // Mock Payroll Data
  const payroll = [
    { id: 101, name: "Janob Smit", role: "O'qituvchi", base: 800, bonus: 150, status: "Paid", date: "25 Nov" },
    { id: 102, name: "Xonim Jonson", role: "O'qituvchi", base: 850, bonus: 50, status: "Pending", date: "25 Nov" },
    { id: 103, name: "Alisher T.", role: "Qorovul", base: 400, bonus: 20, status: "Paid", date: "25 Nov" },
    { id: 104, name: "Malika K.", role: "Kutubxonachi", base: 500, bonus: 0, status: "Pending", date: "25 Nov" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
            <h1 className="text-3xl font-black text-slate-900">Resurs Boshqaruvi (ERP)</h1>
            <p className="text-slate-500 font-medium">Maktab mulki va moliyaviy hisob-kitoblar.</p>
         </div>
         <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm flex gap-2">
            <button 
               onClick={() => setActiveTab('inventory')}
               className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'inventory' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
               <Package className="w-4 h-4" /> Inventar
            </button>
            <button 
               onClick={() => setActiveTab('payroll')}
               className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'payroll' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
               <DollarSign className="w-4 h-4" /> Oylik Maosh
            </button>
         </div>
      </div>

      {activeTab === 'inventory' ? (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Inventory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-blue-900 font-bold mb-1">Jami Qiymat</h3>
                  <p className="text-2xl font-black text-blue-600">$45,200</p>
               </div>
               <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <h3 className="text-emerald-900 font-bold mb-1">Yaxshi Holatda</h3>
                  <p className="text-2xl font-black text-emerald-600">85%</p>
               </div>
               <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <h3 className="text-orange-900 font-bold mb-1">Ta'mir Talab</h3>
                  <p className="text-2xl font-black text-orange-600">12 ta</p>
               </div>
               <button className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
                  <Plus className="w-8 h-8" />
                  <span className="font-bold text-sm">Yangi Jihoz</span>
               </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <div className="relative w-64">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input type="text" placeholder="Qidirish..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-indigo-600"><Filter className="w-4 h-4" /> Filter</button>
               </div>
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-bold">
                     <tr>
                        <th className="px-6 py-4">Nom</th>
                        <th className="px-6 py-4">Kategoriya</th>
                        <th className="px-6 py-4">Joylashuv</th>
                        <th className="px-6 py-4">Holat</th>
                        <th className="px-6 py-4">Qiymat</th>
                        <th className="px-6 py-4 text-right">Amallar</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {inventory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                           <td className="px-6 py-4">
                              <span className="flex items-center gap-2">
                                 {item.category === 'IT' && <Monitor className="w-4 h-4 text-blue-500" />}
                                 {item.category === 'Furniture' && <PenTool className="w-4 h-4 text-orange-500" />}
                                 {item.category}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-slate-500">{item.location}</td>
                           <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                 item.status === 'Good' ? 'bg-emerald-100 text-emerald-700' :
                                 item.status === 'Repair' ? 'bg-orange-100 text-orange-700' :
                                 'bg-red-100 text-red-700'
                              }`}>
                                 {item.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 font-mono font-medium">{item.value}</td>
                           <td className="px-6 py-4 text-right">
                              <button className="text-slate-400 hover:text-indigo-600 font-bold text-xs">Tahrirlash</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </motion.div>
      ) : (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-white">
               <div>
                  <h2 className="text-2xl font-black text-slate-900">Noyabr Oyi Hisoboti</h2>
                  <p className="text-slate-500 font-medium">Umumiy to'lanadigan summa: <span className="text-emerald-600 font-black">$4,250</span></p>
               </div>
               <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Barchasini To'lash
               </button>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-4">Xodim</th>
                        <th className="px-6 py-4">Lavozim</th>
                        <th className="px-6 py-4">Asosiy Oylik</th>
                        <th className="px-6 py-4 text-emerald-600">Bonus (KPI)</th>
                        <th className="px-6 py-4">Jami</th>
                        <th className="px-6 py-4">Holat</th>
                        <th className="px-6 py-4 text-right">Hujjat</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {payroll.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-bold text-slate-900">{p.name}</td>
                           <td className="px-6 py-4 text-slate-500">{p.role}</td>
                           <td className="px-6 py-4 font-mono">${p.base}</td>
                           <td className="px-6 py-4 font-mono text-emerald-600 font-bold">+${p.bonus}</td>
                           <td className="px-6 py-4 font-mono font-black text-slate-800">${p.base + p.bonus}</td>
                           <td className="px-6 py-4">
                              {p.status === 'Paid' ? (
                                 <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded w-fit">
                                    <CheckCircle className="w-3 h-3" /> To'landi
                                 </span>
                              ) : (
                                 <span className="flex items-center gap-1 text-orange-600 font-bold text-xs bg-orange-50 px-2 py-1 rounded w-fit">
                                    <AlertTriangle className="w-3 h-3" /> Kutilmoqda
                                 </span>
                              )}
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg">
                                 <Download className="w-4 h-4" />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </motion.div>
      )}
    </div>
  );
};

export default DirectorManagement;