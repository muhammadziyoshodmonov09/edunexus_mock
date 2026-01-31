import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { USERS } from '../services/mockData';
import { AuthAPI } from '../services/api';
import { School, ArrowRight, UserPlus, KeyRound, ChevronLeft, CheckCircle2, Sparkles, User as UserIcon, Lock } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'LOGIN' | 'REGISTER' | 'FORGOT'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle Mouse Move for Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    });
  };

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex bg-white font-['Plus_Jakarta_Sans'] overflow-hidden" onMouseMove={handleMouseMove}>
      
      {/* Left Section - Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 xl:px-24 relative z-10 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-8 left-8 sm:left-16 xl:left-24 flex items-center gap-2.5 cursor-pointer"
          onClick={() => window.location.href = '/'}
        >
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <School className="text-white w-6 h-6" />
           </div>
           <span className="text-2xl font-extrabold text-slate-900 tracking-tight">EduNexus</span>
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
                          <div className="relative group">
                              <input required type={label.includes('Parol') ? 'password' : 'text'} className="w-full pl-4 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-800 placeholder:font-normal group-hover:bg-slate-100" />
                          </div>
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
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 shadow-sm border border-indigo-100">
                    <KeyRound className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Parolni Tiklash</h2>
                  <p className="text-slate-500 mb-8 font-medium">Email manzilingizga tiklash havolasini yuboramiz.</p>
                  <form className="space-y-6" onSubmit={handleForgot}>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Email Manzil</label>
                      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-800" placeholder="aziza@maktab.uz" />
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
                <div className="mb-8">
                   <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Xush kelibsiz</h2>
                   <p className="text-slate-500 font-medium text-lg">Platformaga kirish uchun ma'lumotlaringizni kiriting.</p>
                </div>
                
                {/* Quick Login - Enhanced */}
                <div className="mb-8 p-1 bg-slate-50 border border-slate-200 rounded-2xl">
                   <div className="grid grid-cols-2 gap-1">
                     {USERS.slice(0, 4).map((user) => (
                       <button
                         key={user.id}
                         onClick={() => onLogin(user)}
                         className="text-left px-3 py-2.5 bg-white border border-transparent hover:border-slate-200 rounded-xl hover:shadow-md transition-all group relative overflow-hidden"
                       >
                         <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-500 transition-colors relative z-10">{user.role}</span>
                         <span className="block text-xs font-bold text-slate-700 truncate relative z-10">{user.name}</span>
                         <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                       </button>
                     ))}
                   </div>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Email Manzil</label>
                      <div className="relative">
                         <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                         <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-800 placeholder-slate-400" placeholder="email@school.edu" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5 ml-1">
                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Parol</label>
                         <button type="button" onClick={() => setView('FORGOT')} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline">Parolni unutdingizmi?</button>
                      </div>
                      <div className="relative">
                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                         <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-800 placeholder-slate-400" placeholder="••••••••" />
                      </div>
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
      </div>

      {/* Right Section - Interactive Visual */}
      <div className="hidden lg:flex w-[55%] bg-[#0F172A] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        {/* Moving Blobs based on mouse */}
        <motion.div 
          animate={{ x: mousePosition.x * 20, y: mousePosition.y * 20 }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-[120px] opacity-40"
        />
        <motion.div 
          animate={{ x: mousePosition.x * -30, y: mousePosition.y * -30 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full blur-[120px] opacity-40"
        />
        
        {/* Glass Card 3D Effect */}
        <motion.div 
          style={{ 
             rotateX: (mousePosition.y - 0.5) * -10,
             rotateY: (mousePosition.x - 0.5) * 10,
          }}
          className="relative z-10 w-full max-w-lg p-10 perspective-1000"
        >
           <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
             {/* Shine Effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

             <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-4">
                   {[1,2,3,4].map(i => (
                      <motion.img 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        key={i} 
                        src={`https://picsum.photos/100?random=${i}`} 
                        className="w-12 h-12 rounded-full border-2 border-slate-900 object-cover" 
                      />
                   ))}
                   <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      +2k
                   </div>
                </div>
                <div className="text-white">
                   <p className="text-sm font-medium opacity-80">Jamoaga qo'shiling</p>
                   <p className="font-bold text-lg">Yangi davr ta'limi</p>
                </div>
             </div>

             <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
               "Maktab boshqaruvini <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">keyingi bosqichga</span> olib chiqing."
             </h2>
             
             <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="flex-1">
                   <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                      ></motion.div>
                   </div>
                   <div className="flex justify-between mt-2 text-xs text-indigo-200 font-medium">
                      <span>Samaradorlik</span>
                      <span>+85%</span>
                   </div>
                </div>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;