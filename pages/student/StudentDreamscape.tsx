import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Brain, Zap, Target, Rocket, Award, Dna, Briefcase, RefreshCw, Lock, Sparkles } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const SKILL_DATA = [
  { subject: 'Mantiq (Logic)', A: 120, fullMark: 150 },
  { subject: 'Ijodkorlik (Creative)', A: 98, fullMark: 150 },
  { subject: 'Liderlik (Lead)', A: 86, fullMark: 150 },
  { subject: 'Til (Lingua)', A: 99, fullMark: 150 },
  { subject: 'Texnika (Tech)', A: 85, fullMark: 150 },
  { subject: 'Sport (Vitality)', A: 65, fullMark: 150 },
];

const CAREERS = [
  { title: "Kibernetik Arxitektor", probability: 85, color: "text-cyan-400", desc: "Shaharlarni raqamli egizaklarini loyihalash." },
  { title: "AI Psixologi", probability: 60, color: "text-purple-400", desc: "Sun'iy intellekt va inson o'rtasidagi muloqot mutaxassisi." },
  { title: "Mars Agronomi", probability: 40, color: "text-emerald-400", desc: "Qizil sayyorada oziq-ovqat yetishtirish muhandisi." },
];

const StudentDreamscape: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [activeCareer, setActiveCareer] = useState(CAREERS[0]);
  const [brainBattery, setBrainBattery] = useState(78);

  const simulateFuture = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      // Randomly change active career for demo effect
      const random = Math.floor(Math.random() * CAREERS.length);
      setActiveCareer(CAREERS[random]);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-8 rounded-[2rem] border border-slate-800 relative overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
           <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                 Dreamscape OS
              </span>
              <span className="text-xs font-mono px-2 py-1 rounded border border-white/20 bg-white/5 text-slate-400">v2.0 Beta</span>
           </h1>
           <p className="text-slate-400 mt-2 font-medium">Sizning raqamli DNK va kelajak proyeksiyangiz.</p>
        </div>
        
        <div className="flex items-center gap-6 mt-6 md:mt-0 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
           <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-widest flex items-center gap-2">
                 <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Brain Battery
              </span>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${brainBattery}%` }}
                       className={`h-full ${brainBattery > 50 ? 'bg-emerald-400' : 'bg-orange-400'}`}
                    ></motion.div>
                 </div>
                 <span className="font-mono font-bold text-emerald-400">{brainBattery}%</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
         
         {/* LEFT: TALENT DNA */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-xl flex items-center gap-2 text-cyan-100">
                     <Dna className="w-5 h-5 text-cyan-400" /> Iqtidor DNKsi
                  </h3>
                  <button className="p-2 hover:bg-white/5 rounded-full"><RefreshCw className="w-4 h-4 text-slate-500" /></button>
               </div>
               
               <div className="h-[300px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name="Siz" dataKey="A" stroke="#22d3ee" strokeWidth={3} fill="#22d3ee" fillOpacity={0.2} />
                     </RadarChart>
                  </ResponsiveContainer>
                  
                  {/* Decorative Center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
               </div>
               
               <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-400 leading-relaxed">
                     <span className="text-cyan-400 font-bold">AI Tahlili:</span> Sizda <strong>Mantiqiy</strong> va <strong>Lingvistik</strong> qobiliyatlar yuqori. Bu kelajakda "Tizim Muhandisi" yoki "Xalqaro Diplomat" bo'lish imkonini beradi.
                  </p>
               </div>
            </div>

            {/* Daily Quest */}
            <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 rounded-[2rem] p-6 relative">
               <div className="absolute top-4 right-4 text-purple-400">
                  <Target className="w-6 h-6" />
               </div>
               <h3 className="font-bold text-lg mb-1">Kunlik Missiya</h3>
               <p className="text-sm text-slate-400 mb-4">Miyangizni chiniqtirish uchun bugungi vazifa.</p>
               
               <div className="flex items-center gap-4 bg-black/20 p-3 rounded-xl border border-white/5">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-bold">1</div>
                  <div>
                     <p className="text-sm font-bold text-white">Matematika Quiz</p>
                     <p className="text-xs text-slate-500">+50 XP mukofot</p>
                  </div>
                  <button className="ml-auto px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors">
                     Boshlash
                  </button>
               </div>
            </div>
         </div>

         {/* RIGHT: FUTURE SELF SIMULATOR */}
         <div className="lg:col-span-2">
            <div className="h-full bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden">
               {/* Grid Effect */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>

               <div className="relative z-10 flex justify-between items-start mb-8">
                  <div>
                     <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                        Kelajak Simulyatori (2035)
                     </h2>
                     <p className="text-slate-400 text-sm mt-1">Hozirgi baholaringiz asosida AI bashorati.</p>
                  </div>
                  <button 
                     onClick={simulateFuture}
                     disabled={analyzing}
                     className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                  >
                     {analyzing ? (
                        <>
                           <RefreshCw className="w-4 h-4 animate-spin" /> Hisoblanmoqda...
                        </>
                     ) : (
                        <>
                           <Rocket className="w-4 h-4" /> Qayta Hisoblash
                        </>
                     )}
                  </button>
               </div>

               {/* Main Visualization */}
               <div className="flex-1 flex flex-col items-center justify-center relative">
                  <AnimatePresence mode="wait">
                     {analyzing ? (
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.8 }}
                           className="text-center"
                        >
                           <div className="w-32 h-32 relative mx-auto mb-6">
                              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-ping"></div>
                              <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <Fingerprint className="w-12 h-12 text-indigo-400 animate-pulse" />
                              </div>
                           </div>
                           <p className="text-indigo-300 font-mono text-lg">Ma'lumotlar qayta ishlanmoqda...</p>
                           <p className="text-slate-500 text-sm mt-2">Maktab davomati • Baholar • Qiziqishlar</p>
                        </motion.div>
                     ) : (
                        <motion.div 
                           key={activeCareer.title}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="text-center max-w-lg"
                        >
                           <div className="inline-block p-1 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6">
                              <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-xs font-mono text-slate-300">
                                 Ehtimollik: <span className="text-emerald-400 font-bold">{activeCareer.probability}%</span>
                              </div>
                           </div>
                           
                           <h3 className={`text-5xl md:text-6xl font-black mb-4 ${activeCareer.color} tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                              {activeCareer.title}
                           </h3>
                           
                           <p className="text-xl text-slate-300 font-light leading-relaxed mb-8">
                              "{activeCareer.desc}"
                           </p>

                           <div className="flex justify-center gap-4">
                              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 w-32">
                                 <p className="text-xs text-slate-500 uppercase font-bold mb-1">Daromad</p>
                                 <p className="text-xl font-bold text-white">$8,500<span className="text-xs text-slate-500">/oy</span></p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 w-32">
                                 <p className="text-xs text-slate-500 uppercase font-bold mb-1">Talab</p>
                                 <p className="text-xl font-bold text-emerald-400">Yuqori</p>
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               {/* Bottom Roadmap */}
               <div className="mt-8 pt-8 border-t border-white/5">
                  <h4 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2">
                     <Briefcase className="w-4 h-4" /> Karyera Yo'l Xaritasi
                  </h4>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold border-2 border-slate-900 relative z-10">
                        10
                     </div>
                     <div className="w-16 h-1 bg-indigo-600 rounded-full"></div>
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border-2 border-slate-900 text-slate-400">
                        11
                     </div>
                     <div className="w-16 h-1 bg-slate-700 rounded-full"></div>
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border-2 border-slate-900 text-slate-400">
                        IELTS
                     </div>
                     <div className="w-16 h-1 bg-slate-700 rounded-full"></div>
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold border-2 border-slate-900 text-slate-400">
                        SAT
                     </div>
                     <div className="w-16 h-1 bg-slate-700 rounded-full border-t-2 border-dashed border-slate-600 bg-transparent"></div>
                     <div className="flex-shrink-0 px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/20 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Universitet
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudentDreamscape;