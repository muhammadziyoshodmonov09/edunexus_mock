import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Leaf, Award, RotateCcw, Volume2, VolumeX, TreePine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds

const StudentFocusGarden: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [plantStage, setPlantStage] = useState(0); // 0 to 4
  const [isMuted, setIsMuted] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Audio refs (Using base64 or online URLs for simplicity in this demo environment)
  // In a real app, use local assets.
  const ambienceRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: any = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleComplete();
    }

    // Calculate Plant Stage based on progress
    const progress = 1 - (timeLeft / FOCUS_TIME);
    if (progress < 0.2) setPlantStage(0);
    else if (progress < 0.4) setPlantStage(1);
    else if (progress < 0.6) setPlantStage(2);
    else if (progress < 0.8) setPlantStage(3);
    else setPlantStage(4);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(FOCUS_TIME);
    setPlantStage(0);
    setShowSuccess(false);
  };

  const handleComplete = () => {
    setCompletedSessions(prev => prev + 1);
    setShowSuccess(true);
    // Play success sound logic here
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Plant SVGs based on stage
  const renderPlant = () => {
    const variants = {
       hidden: { scale: 0, opacity: 0 },
       visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.5 } }
    };

    switch(plantStage) {
       case 0: return (
          <motion.div variants={variants} initial="hidden" animate="visible" className="text-emerald-800">
             <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-8"/><path d="M12 18a4 4 0 0 1 4-4"/><path d="M12 22a2 2 0 0 1-2-2"/></svg>
          </motion.div>
       );
       case 1: return (
          <motion.div variants={variants} initial="hidden" animate="visible" className="text-emerald-600">
             <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-12"/><path d="M12 18a6 6 0 0 1 6-6"/><path d="M12 14a4 4 0 0 0-4-4"/><path d="M12 22a4 4 0 0 1-4-4"/></svg>
          </motion.div>
       );
       case 2: return (
          <motion.div variants={variants} initial="hidden" animate="visible" className="text-emerald-500">
             <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-14"/><path d="M12 18a8 8 0 0 1 8-8"/><path d="M12 14a6 6 0 0 0-6-6"/><path d="M12 22a4 4 0 0 1-4-4"/><path d="M12 8l2-2"/><path d="M12 8l-2-2"/></svg>
          </motion.div>
       );
       case 3: return (
          <motion.div variants={variants} initial="hidden" animate="visible" className="text-emerald-400">
             <svg width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-16"/><path d="M12 18a10 10 0 0 1 10-10"/><path d="M12 14a8 8 0 0 0-8-8"/><path d="M12 6a4 4 0 0 1 4-4"/><path d="M12 6a4 4 0 0 0-4-4"/><path d="M16 10l2-2"/><path d="M8 10l-2-2"/></svg>
          </motion.div>
       );
       case 4: return (
          <motion.div variants={variants} initial="hidden" animate="visible" className="text-emerald-300 drop-shadow-[0_0_15px_rgba(110,231,183,0.5)]">
             {/* Full Tree Icon for completion */}
             <TreePine width="300" height="300" strokeWidth="1" />
          </motion.div>
       );
       default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-slate-800 p-4 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
         <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-300 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-200 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
         {/* Header */}
         <div className="flex justify-between items-center mb-12">
            <button onClick={() => navigate('/student')} className="p-2 bg-white/50 backdrop-blur rounded-xl hover:bg-white transition-colors">
               <RotateCcw className="w-5 h-5 text-slate-500" />
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur rounded-full">
               <Award className="w-4 h-4 text-amber-500" />
               <span className="font-bold text-sm text-slate-600">{completedSessions} Daraxt Ekildi</span>
            </div>
            <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-white/50 backdrop-blur rounded-xl hover:bg-white transition-colors">
               {isMuted ? <VolumeX className="w-5 h-5 text-slate-500" /> : <Volume2 className="w-5 h-5 text-slate-500" />}
            </button>
         </div>

         {/* Main Garden Area */}
         <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 shadow-2xl relative flex flex-col items-center justify-between min-h-[500px]">
            {/* Plant Stage */}
            <div className="flex-1 flex items-center justify-center w-full relative">
               {showSuccess ? (
                  <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                     <h2 className="text-3xl font-black text-emerald-600 mb-2">Ajoyib!</h2>
                     <p className="text-slate-500 mb-4">Siz diqqatni muvaffaqiyatli jamladingiz.</p>
                     <div className="text-emerald-500 animate-bounce mx-auto w-fit">
                        <Award className="w-16 h-16" />
                     </div>
                  </motion.div>
               ) : (
                  renderPlant()
               )}
            </div>

            {/* Timer Display */}
            <div className="text-center mb-8 relative z-10">
               <motion.div 
                  key={timeLeft}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="text-7xl font-black text-slate-800 tracking-tighter"
               >
                  {formatTime(timeLeft)}
               </motion.div>
               <p className="text-slate-500 font-medium mt-2">{isActive ? "O'sib bormoqda..." : "Diqqatni jamlash vaqti"}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 relative z-10">
               {!showSuccess ? (
                  <>
                     <button 
                        onClick={toggleTimer}
                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 ${
                           isActive ? 'bg-amber-100 text-amber-600' : 'bg-emerald-600 text-white shadow-emerald-500/30'
                        }`}
                     >
                        {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                     </button>
                     {isActive && (
                        <button 
                           onClick={resetTimer}
                           className="p-4 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                           <Square className="w-6 h-6 fill-current" />
                        </button>
                     )}
                  </>
               ) : (
                  <button 
                     onClick={resetTimer}
                     className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2"
                  >
                     <Leaf className="w-5 h-5" /> Yangi Daraxt Ekish
                  </button>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudentFocusGarden;