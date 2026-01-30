import React, { useState } from 'react';
import { User } from '../types';
import { USERS } from '../services/mockData';
import { AuthAPI } from '../services/api';
import { School, ArrowRight, UserPlus, KeyRound, ChevronLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'LOGIN' | 'REGISTER' | 'FORGOT'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        await new Promise(r => setTimeout(r, 800)); // fake delay
        onLogin(user);
      } else {
        setMessage('Noto\'g\'ri ma\'lumotlar. Demo hisoblarni sinab ko\'ring.');
      }
    } catch (err) {
      setMessage('Kirishda xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setMessage('Ro\'yxatdan o\'tish muvaffaqiyatli! Direktor tasdiqlashini kuting.');
        setTimeout(() => setView('LOGIN'), 3000);
    }, 1500);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await AuthAPI.forgotPassword(email);
    setIsLoading(false);
    setMessage('Parolni tiklash havolasi emailingizga yuborildi.');
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
      
      {/* Left Section - Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 xl:px-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-8 left-8 sm:left-16 xl:left-24 flex items-center gap-2.5"
        >
           <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <School className="text-white w-5 h-5" />
           </div>
           <span className="text-xl font-extrabold text-slate-900 tracking-tight">EduNexus</span>
        </motion.div>

        <div className="max-w-md w-full mx-auto">
          <AnimatePresence mode="wait">
            {message && (
               <motion.div 
                 initial={{ opacity: 0, y: -20, height: 0 }}
                 animate={{ opacity: 1, y: 0, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-semibold border ${message.includes('muvaffaqiyatli') ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}
               >
                 {message.includes('muvaffaqiyatli') ? <CheckCircle2 className="w-5 h-5"/> : <KeyRound className="w-5 h-5"/>}
                 {message}
               </motion.div>
            )}

            {view === 'REGISTER' ? (
               <motion.div 
                 key="register"
                 variants={formVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
               >
                  <button onClick={() => setView('LOGIN')} className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-bold mb-8 transition-colors">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/> Kirishga qaytish
                  </button>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Hisob Yaratish</h2>
                  <p className="text-slate-500 mb-8 font-medium">EduNexus bilan ta'lim sayohatingizni boshlang.</p>
                  
                  <form className="space-y-5" onSubmit={handleRegister}>
                    <div className="space-y-4">
                      {['To\'liq Ism', 'Email Manzil', 'Maktab Kodi', 'Parol'].map((label, idx) => (
                        <motion.div 
                          key={label} 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          transition={{ delay: 0.1 * idx }}
                        >
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">{label}</label>
                          <input required type={label.includes('Parol') ? 'password' : 'text'} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-800 placeholder:font-normal" />
                        </motion.div>
                      ))}
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    >
                      {isLoading ? 'Yaratilmoqda...' : 'Hisob Yaratish'}
                    </motion.button>
                  </form>
               </motion.div>
            ) : view === 'FORGOT' ? (
               <motion.div 
                 key="forgot"
                 variants={formVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
               >
                  <button onClick={() => setView('LOGIN')} className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-bold mb-8 transition-colors">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/> Kirishga qaytish
                  </button>
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Parolni Tiklash</h2>
                  <p className="text-slate-500 mb-8 font-medium">Email manzilingizga tiklash havolasini yuboramiz.</p>
                  <form className="space-y-6" onSubmit={handleForgot}>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Email Manzil</label>
                      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-800" placeholder="aziza@maktab.uz" />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 disabled:opacity-70"
                    >
                      {isLoading ? 'Yuborilmoqda...' : 'Havolani Yuborish'}
                    </motion.button>
                  </form>
               </motion.div>
            ) : (
              <motion.div 
                key="login"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Xush kelibsiz</h2>
                <p className="text-slate-500 mb-8 font-medium text-lg">Platformaga kirish uchun ma'lumotlaringizni kiriting.</p>
                
                {/* Quick Login - Enhanced */}
                <div className="mb-8 p-1 bg-slate-100/50 border border-slate-200 rounded-2xl">
                   <div className="grid grid-cols-2 gap-1">
                     {USERS.slice(0, 4).map((user) => (
                       <button
                         key={user.id}
                         onClick={() => onLogin(user)}
                         className="text-left px-3 py-2.5 bg-white border border-transparent hover:border-slate-200 rounded-xl hover:shadow-md transition-all group"
                       >
                         <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-500 transition-colors">{user.role}</span>
                         <span className="block text-xs font-bold text-slate-700 truncate">{user.name}</span>
                       </button>
                     ))}
                   </div>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Email Manzil</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-800" placeholder="email@school.edu" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5 ml-1">
                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Parol</label>
                         <button type="button" onClick={() => setView('FORGOT')} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Parolni unutdingizmi?</button>
                      </div>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-800" placeholder="••••••••" />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-70 mt-2 flex items-center justify-center gap-2"
                    >
                      {isLoading ? 'Kirilmoqda...' : (
                        <>Kirish <ArrowRight className="w-5 h-5"/></>
                      )}
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                   <p className="text-sm font-medium text-slate-500">Hisobingiz yo'qmi?</p>
                   <button onClick={() => setView('REGISTER')} className="mt-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                      Ro'yxatdan o'tish
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="absolute bottom-8 text-center w-full left-0 text-xs text-slate-400 font-medium">
          © 2024 EduNexus Platformasi. Barcha huquqlar himoyalangan.
        </div>
      </div>

      {/* Right Section - Visual */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple style easing
        className="hidden lg:flex w-[55%] bg-[#0F172A] relative overflow-hidden items-center justify-center"
      >
        {/* Abstract Shapes/Gradients */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px]"
        />
        
        {/* Glassmorphic Card Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 w-full max-w-lg p-8"
        >
           <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
             
             <div className="flex items-center gap-3 mb-6">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => <img key={i} src={`https://picsum.photos/100?random=${i}`} className="w-10 h-10 rounded-full border-2 border-slate-900" />)}
                </div>
                <div className="text-white text-xs font-medium">
                   <span className="font-bold">12k+ Talaba</span> ushbu haftada qo'shildi
                </div>
             </div>

             <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
               "EduNexus bizning o'quv dasturimiz va baholashni boshqarish usulimizni inqilob qildi."
             </h2>
             <div className="flex items-center gap-4 mt-6">
                <img src="https://picsum.photos/100?random=10" className="w-12 h-12 rounded-full border-2 border-indigo-500/50" />
                <div>
                   <p className="text-white font-bold">Sara Konnor</p>
                   <p className="text-indigo-200 text-sm">Direktor, Texnik Akademiya</p>
                </div>
             </div>

             <div className="mt-8 flex gap-2">
                <div className="h-1 w-12 bg-white rounded-full"></div>
                <div className="h-1 w-2 bg-white/20 rounded-full"></div>
                <div className="h-1 w-2 bg-white/20 rounded-full"></div>
             </div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
