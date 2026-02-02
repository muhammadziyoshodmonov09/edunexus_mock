import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { USERS } from '../services/mockData';
import { AuthAPI } from '../services/api';
import { School, ArrowRight, KeyRound, ChevronLeft, CheckCircle2, User as UserIcon, Lock, Baby, GraduationCap, Hash, BadgeCheck, Mail } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'LOGIN' | 'REGISTER' | 'FORGOT'>('LOGIN');
  const [loginMode, setLoginMode] = useState<'ACADEMIC' | 'PARENT'>('ACADEMIC');
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [extraData, setExtraData] = useState(''); // School Code or Child ID

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Motion Values for Mouse Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 2;
    const y = (clientY / height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Transforms
  const blob1X = useTransform(mouseX, [-1, 1], [-50, 50]);
  const blob1Y = useTransform(mouseY, [-1, 1], [-50, 50]);
  const blob2X = useTransform(mouseX, [-1, 1], [50, -50]);
  const blob2Y = useTransform(mouseY, [-1, 1], [50, -50]);
  const blob3X = useTransform(mouseX, [-1, 1], [-30, 30]);
  const blob3Y = useTransform(mouseY, [-1, 1], [30, -30]);
  const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);

  // Styles
  const themeColor = loginMode === 'ACADEMIC' ? 'indigo' : 'emerald';
  const textColor = loginMode === 'ACADEMIC' ? 'text-indigo-600' : 'text-emerald-600';
  const buttonColor = loginMode === 'ACADEMIC' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700';
  const shadowColor = loginMode === 'ACADEMIC' ? 'shadow-indigo-500/30' : 'shadow-emerald-500/30';

  // Filter Quick Users
  const quickUsers = USERS.filter(u => 
    loginMode === 'ACADEMIC' 
      ? u.role !== UserRole.PARENT 
      : u.role === UserRole.PARENT
  ).slice(0, 4);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        if (loginMode === 'PARENT' && user.role !== UserRole.PARENT) {
           setMessage("Bu ota-onalar uchun kirish qismi. Iltimos, akademik bo'limga o'ting.");
           setIsLoading(false);
           return;
        }
        if (loginMode === 'ACADEMIC' && user.role === UserRole.PARENT) {
           setMessage("Ota-onalar uchun maxsus bo'limga o'ting.");
           setIsLoading(false);
           return;
        }
        await new Promise(r => setTimeout(r, 800)); 
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
    
    // Simulate Registration API Call
    setTimeout(() => {
        const newUser: User = {
            id: `new_${Date.now()}`,
            name: name,
            email: email,
            role: loginMode === 'PARENT' ? UserRole.PARENT : UserRole.STUDENT,
            schoolId: 's1', // Default mock school
            avatarUrl: `https://ui-avatars.com/api/?name=${name}&background=random`,
            status: 'ACTIVE',
            lastActive: 'Hozirgina',
            childrenIds: loginMode === 'PARENT' ? ['u1'] : undefined // Mock linking to student 'u1'
        };

        setIsLoading(false);
        if (loginMode === 'PARENT') {
           setMessage('Ota-ona hisobi yaratildi! Farzandingiz muvaffaqiyatli ulandi.');
        } else {
           setMessage('Ro\'yxatdan o\'tish muvaffaqiyatli! Xush kelibsiz.');
        }
        
        // Auto Login after short delay
        setTimeout(() => {
            onLogin(newUser);
        }, 1500);
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
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div 
      className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-50 transition-colors duration-500 ${loginMode === 'PARENT' ? 'bg-[#F0FDF4]' : 'bg-[#F8FAFC]'}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div style={{ x: blob1X, y: blob1Y }} className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 ${loginMode === 'PARENT' ? 'bg-emerald-300' : 'bg-indigo-300'}`}></motion.div>
         <motion.div style={{ x: blob2X, y: blob2Y }} className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 ${loginMode === 'PARENT' ? 'bg-teal-300' : 'bg-purple-300'}`}></motion.div>
         <motion.div style={{ x: blob3X, y: blob3Y }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white rounded-full blur-[100px] opacity-60"></motion.div>
      </div>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-5xl h-[600px] bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 flex overflow-hidden"
      >
         {/* Left Side: Form */}
         <div className="flex-1 p-12 flex flex-col relative z-20">
            <div className="mb-8 flex items-center gap-2">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${buttonColor}`}>
                  <School className="w-6 h-6" />
               </div>
               <span className="font-black text-2xl tracking-tight text-slate-900">EduNexus</span>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
               <h2 className="text-3xl font-black text-slate-900 mb-2">
                  {view === 'LOGIN' ? 'Xush Kelibsiz!' : view === 'REGISTER' ? 'Ro\'yxatdan O\'tish' : 'Parolni Tiklash'}
               </h2>
               <p className="text-slate-500 mb-8 font-medium">
                  {view === 'LOGIN' ? 'Davom etish uchun hisobingizga kiring.' : view === 'REGISTER' ? 'Yangi imkoniyatlar dunyosiga qo\'shiling.' : 'Emailingizni kiriting va biz tiklash havolasini yuboramiz.'}
               </p>

               <form onSubmit={view === 'LOGIN' ? handleLogin : view === 'REGISTER' ? handleRegister : handleForgot} className="space-y-4">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={view}
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-4"
                     >
                        {view === 'REGISTER' && (
                           <div className="relative group">
                              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                              <input 
                                 type="text" 
                                 placeholder="To'liq Ism"
                                 className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                 required
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                              />
                           </div>
                        )}

                        <div className="relative group">
                           <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              {view === 'REGISTER' && loginMode === 'PARENT' ? <Baby className="w-5 h-5 text-slate-400" /> : <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />}
                           </div>
                           <input 
                              type="email" 
                              placeholder="Email Manzil"
                              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                           />
                        </div>

                        {view !== 'FORGOT' && (
                           <div className="relative group">
                              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                              <input 
                                 type="password" 
                                 placeholder="Parol"
                                 className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                 required
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                              />
                           </div>
                        )}

                        {view === 'REGISTER' && (
                           <div className="relative group">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                 {loginMode === 'PARENT' ? <Hash className="w-5 h-5 text-slate-400" /> : <School className="w-5 h-5 text-slate-400" />}
                              </div>
                              <input 
                                 type="text" 
                                 placeholder={loginMode === 'PARENT' ? "Farzand ID raqami" : "Maktab Kodi"}
                                 className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                 required={view === 'REGISTER'}
                                 value={extraData}
                                 onChange={(e) => setExtraData(e.target.value)}
                              />
                           </div>
                        )}
                     </motion.div>
                  </AnimatePresence>

                  {message && (
                     <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-bold border border-red-100 flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4" /> {message}
                     </div>
                  )}

                  <button 
                     type="submit" 
                     disabled={isLoading}
                     className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${buttonColor} ${shadowColor}`}
                  >
                     {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     ) : (
                        <>
                           {view === 'LOGIN' ? 'Kirish' : view === 'REGISTER' ? 'Ro\'yxatdan O\'tish' : 'Havolani Yuborish'}
                           <ArrowRight className="w-5 h-5" />
                        </>
                     )}
                  </button>
               </form>

               <div className="mt-6 flex items-center justify-between text-xs font-bold text-slate-500">
                  {view === 'LOGIN' ? (
                     <>
                        <button onClick={() => setView('REGISTER')} className="hover:text-indigo-600 transition-colors">Ro'yxatdan o'tish</button>
                        <button onClick={() => setView('FORGOT')} className="hover:text-indigo-600 transition-colors">Parolni unutdingizmi?</button>
                     </>
                  ) : (
                     <button onClick={() => setView('LOGIN')} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                        <ChevronLeft className="w-3 h-3" /> Ortga qaytish
                     </button>
                  )}
               </div>
            </div>
         </div>

         {/* Right Side: Visuals */}
         <div className={`hidden lg:flex flex-1 relative overflow-hidden transition-colors duration-500 flex-col items-center justify-center p-12 text-white ${
            loginMode === 'ACADEMIC' ? 'bg-[#0F172A]' : 'bg-[#064E3B]'
         }`}>
            {/* Mode Switcher */}
            <div className="absolute top-8 right-8 z-20 flex bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/10">
               <button 
                  onClick={() => setLoginMode('ACADEMIC')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${loginMode === 'ACADEMIC' ? 'bg-white text-indigo-900 shadow-md' : 'text-white/70 hover:bg-white/10'}`}
               >
                  <GraduationCap className="w-4 h-4 mb-1 mx-auto" />
                  Akademik
               </button>
               <button 
                  onClick={() => setLoginMode('PARENT')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${loginMode === 'PARENT' ? 'bg-white text-emerald-900 shadow-md' : 'text-white/70 hover:bg-white/10'}`}
               >
                  <Baby className="w-4 h-4 mb-1 mx-auto" />
                  Ota-ona
               </button>
            </div>

            {/* Quick Login */}
            <div className="w-full max-w-sm relative z-10">
               <h3 className="text-2xl font-black mb-6 text-center">Tezkor Kirish (Demo)</h3>
               <div className="grid grid-cols-1 gap-3">
                  {quickUsers.map(u => (
                     <button 
                        key={u.id}
                        onClick={() => {
                           setEmail(u.email);
                           setPassword('demo123'); // Assume demo password
                           if ((loginMode === 'PARENT' && u.role !== 'PARENT') || (loginMode === 'ACADEMIC' && u.role === 'PARENT')) {
                              setLoginMode(u.role === 'PARENT' ? 'PARENT' : 'ACADEMIC');
                           }
                        }}
                        className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95 text-left group"
                     >
                        <img src={u.avatarUrl} className="w-10 h-10 rounded-lg bg-white/10 object-cover" alt={u.name} />
                        <div>
                           <p className="font-bold text-sm text-white group-hover:text-yellow-300 transition-colors">{u.name}</p>
                           <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">{u.role}</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                           <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                     </button>
                  ))}
               </div>
            </div>

            {/* Decor */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-[80px] opacity-50 ${loginMode === 'ACADEMIC' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
         </div>
      </motion.div>
    </div>
  );
};

export default Login;