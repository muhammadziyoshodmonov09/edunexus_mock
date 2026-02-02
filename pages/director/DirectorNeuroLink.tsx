import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Activity, Zap, TrendingUp, Users, AlertTriangle, Thermometer, Wifi, Wind, Lock, ArrowRight, Play, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { GoogleGenAI } from "@google/genai";

// Mock Data specific for NeuroLink
const SENTIMENT_DATA = [
  { subject: 'Academic Stress', A: 120, fullMark: 150 },
  { subject: 'Social Happiness', A: 98, fullMark: 150 },
  { subject: 'Teacher Support', A: 86, fullMark: 150 },
  { subject: 'Facility Comfort', A: 99, fullMark: 150 },
  { subject: 'Safety Feeling', A: 85, fullMark: 150 },
  { subject: 'Food Quality', A: 65, fullMark: 150 },
];

const PREDICTION_DATA = [
  { month: 'Jan', current: 4000, simulated: 4000 },
  { month: 'Feb', current: 3000, simulated: 3200 },
  { month: 'Mar', current: 2000, simulated: 2800 },
  { month: 'Apr', current: 2780, simulated: 3900 },
  { month: 'May', current: 1890, simulated: 4500 },
  { month: 'Jun', current: 2390, simulated: 4800 },
];

const DirectorNeuroLink: React.FC = () => {
  const [activeSimulation, setActiveSimulation] = useState<'NONE' | 'SALARY_HIKE' | 'NEW_LAB' | 'MARKETING'>('NONE');
  const [healthScore, setHealthScore] = useState(84);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // AI Simulation Handler
  const runSimulation = async (scenario: string) => {
    setActiveSimulation(scenario as any);
    setIsAiLoading(true);
    setAiInsight(null);

    // Simulate AI processing time
    setTimeout(async () => {
        // In a real app, this would call Gemini with specific school data
        let prompt = "";
        let mockResponse = "";

        if (scenario === 'SALARY_HIKE') {
            mockResponse = "Agar o'qituvchilar maoshini 10% oshirsangiz: Qisqa muddatda xarajatlar oshadi, ammo o'qituvchilarning motivatsiyasi 40% ga ko'tarilib, 6 oy ichida ta'lim sifati va yangi o'quvchilar oqimi hisobiga daromad 15% ga o'sishi kutilmoqda.";
        } else if (scenario === 'NEW_LAB') {
            mockResponse = "Yangi IT Laboratoriyasi sarmoyasi: Dastlabki 2 oyda ROI manfiy bo'ladi. Ammo 'Tech' yo'nalishidagi kurslarga yozilish 200% ga oshadi. Brend obro'si hududda 1-o'ringa chiqadi.";
        } else {
            mockResponse = "Marketing kampaniyasi: Ijtimoiy tarmoqlardagi faollik ota-onalar ishonchini oshiradi. Sentyabr qabulida +150 yangi o'quvchi kutilmoqda.";
        }

        setAiInsight(mockResponse);
        setIsAiLoading(false);
        // Animate score change
        setHealthScore(prev => Math.min(100, prev + 5));
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-8 rounded-[2rem] border border-white/10 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/20 border border-indigo-500/50 rounded-lg">
                 <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                 EduNexus NeuroLink™
              </h1>
           </div>
           <p className="text-slate-400 text-sm max-w-xl">
              Maktabning raqamli egizagi. Sun'iy intellekt yordamida real vaqt rejimidagi monitoring va strategik simulyatsiyalar markazi.
           </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
           <div className="text-right">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Tizim Holati</div>
              <div className="flex items-center gap-2 justify-end text-emerald-400 font-bold">
                 <Activity className="w-4 h-4 animate-pulse" /> Stabil
              </div>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-right">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Health Score</div>
              <div className="text-2xl font-black text-white">{healthScore}/100</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
         
         {/* LEFT COLUMN: LIVE SENSORS & SENTIMENT */}
         <div className="space-y-6">
            {/* IoT Sensor Feed */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Wifi className="w-4 h-4" /> Live Sensorlar
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2">
                     <Thermometer className="w-6 h-6 text-orange-400" />
                     <span className="text-2xl font-bold">24°C</span>
                     <span className="text-[10px] text-slate-500">O'rtacha Harorat</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2">
                     <Wind className="w-6 h-6 text-blue-400" />
                     <span className="text-2xl font-bold">AQI 45</span>
                     <span className="text-[10px] text-slate-500">Havo Sifati (Yaxshi)</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2">
                     <Zap className="w-6 h-6 text-yellow-400" />
                     <span className="text-2xl font-bold">85%</span>
                     <span className="text-[10px] text-slate-500">Energiya Samaradorligi</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2">
                     <Lock className="w-6 h-6 text-emerald-400" />
                     <span className="text-2xl font-bold">Xavfsiz</span>
                     <span className="text-[10px] text-slate-500">Perimetr Nazorati</span>
                  </div>
               </div>
            </div>

            {/* Sentiment Radar */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 h-[350px]">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Ijtimoiy Kayfiyat (AI Tahlil)
               </h3>
               <div className="w-full h-full -mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SENTIMENT_DATA}>
                        <PolarGrid stroke="#ffffff20" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name="Maktab" dataKey="A" stroke="#818cf8" strokeWidth={3} fill="#818cf8" fillOpacity={0.3} />
                     </RadarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         {/* CENTER COLUMN: 3D MODEL / MAP PLACEHOLDER & ALERTS */}
         <div className="lg:col-span-2 space-y-6">
            {/* Simulation Deck */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/50 rounded text-xs font-bold text-indigo-300 animate-pulse">
                     AI ENGINE: ACTIVE
                  </div>
               </div>
               
               <h2 className="text-2xl font-bold mb-6">Strategik Simulyator (Time Travel)</h2>
               
               <div className="flex flex-wrap gap-4 mb-8">
                  <button 
                     onClick={() => runSimulation('SALARY_HIKE')}
                     className={`px-4 py-3 rounded-xl border font-bold text-sm transition-all flex items-center gap-2 ${activeSimulation === 'SALARY_HIKE' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                  >
                     <TrendingUp className="w-4 h-4" /> Oyliklarni Oshirish (+10%)
                  </button>
                  <button 
                     onClick={() => runSimulation('NEW_LAB')}
                     className={`px-4 py-3 rounded-xl border font-bold text-sm transition-all flex items-center gap-2 ${activeSimulation === 'NEW_LAB' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                  >
                     <Zap className="w-4 h-4" /> Yangi IT Lab
                  </button>
                  <button 
                     onClick={() => runSimulation('MARKETING')}
                     className={`px-4 py-3 rounded-xl border font-bold text-sm transition-all flex items-center gap-2 ${activeSimulation === 'MARKETING' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                  >
                     <Users className="w-4 h-4" /> Katta Marketing
                  </button>
               </div>

               <div className="h-64 w-full bg-black/20 rounded-2xl border border-white/5 p-4 relative">
                  {isAiLoading ? (
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                        <p className="text-indigo-300 font-mono text-sm">AI hisoblamoqda... (Gemini 3 Flash)</p>
                     </div>
                  ) : aiInsight ? (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                        <div className="flex-1">
                           <h4 className="text-indigo-400 font-bold mb-2 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> AI Xulosasi:</h4>
                           <p className="text-slate-300 text-sm leading-relaxed font-medium">{aiInsight}</p>
                        </div>
                        <div className="h-32 mt-4">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={PREDICTION_DATA}>
                                 <defs>
                                    <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                                       <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <Tooltip contentStyle={{background: '#1e293b', border: 'none', borderRadius: '8px'}} />
                                 <Area type="monotone" dataKey="simulated" stroke="#818cf8" strokeWidth={3} fill="url(#colorSim)" />
                                 <Area type="monotone" dataKey="current" stroke="#94a3b8" strokeDasharray="5 5" fill="transparent" />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </motion.div>
                  ) : (
                     <div className="flex items-center justify-center h-full text-slate-500 text-sm font-medium">
                        Ssenariyni tanlang va "Kelajak"ni ko'ring.
                     </div>
                  )}
               </div>
            </div>

            {/* Smart Alerts */}
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-500/20 rounded-full blur-xl"></div>
                  <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                     <AlertTriangle className="w-5 h-5" /> Diqqat Talab
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                     <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> 9-B sinf davomati 80% dan tushdi</li>
                     <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Oshxona ombori: Mahsulot kam</li>
                  </ul>
               </div>
               
               <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl"></div>
                  <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                     <TrendingUp className="w-5 h-5" /> Yutuqlar
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                     <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Fizika olimpiadasi: 3 ta medal</li>
                     <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Elektr tejamkorligi: +12%</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DirectorNeuroLink;