import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, ChevronLeft, Globe, Users, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Faol Maktablar", value: "1,200+", icon: School },
    { label: "Talabalar", value: "500k+", icon: Users },
    { label: "Davlatlar", value: "15+", icon: Globe },
    { label: "Reyting", value: "4.9/5", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
               <School className="w-8 h-8 text-indigo-600" />
               <span className="font-bold text-xl">EduNexus</span>
            </div>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
               <ChevronLeft className="w-4 h-4" /> Bosh Sahifa
            </button>
         </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
         >
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
               Ta'limni <span className="text-indigo-600">Inqilob</span> Qilish
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-20 leading-relaxed">
               EduNexus missiyasi — texnologiyalar orqali har bir bola uchun sifatli ta'lim olish imkoniyatini yaratish. Biz ta'lim jarayonini oson, shaffof va samarali qilamiz.
            </p>
         </motion.div>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {stats.map((stat, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-slate-50 rounded-[2rem] hover:bg-indigo-50 transition-colors group"
               >
                  <stat.icon className="w-10 h-10 mx-auto mb-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <h3 className="text-4xl font-black text-slate-900 mb-2">{stat.value}</h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
               </motion.div>
            ))}
         </div>

         {/* Story Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-left mb-32">
            <div className="relative">
               <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] rotate-3 opacity-10"></div>
               <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" 
                  alt="Team" 
                  className="relative z-10 rounded-[2.5rem] shadow-2xl"
               />
            </div>
            <div>
               <h2 className="text-3xl font-bold mb-6 text-slate-900">Bizning Tariximiz</h2>
               <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  2022-yilda bir guruh pedagoglar va dasturchilar tomonidan asos solingan EduNexus, kichik bir startapdan xalqaro platformaga aylandi. Biz o'qituvchilarning kundalik muammolarini tushungan holda, ularga yechim topishni o'z oldimizga maqsad qilib qo'ydik.
               </p>
               <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Bugungi kunda bizning jamoamizda 50 dan ortiq mutaxassislar — sobiq o'qituvchilar, ma'lumotlar tahlilchilari va dizaynerlar faoliyat yuritmoqda.
               </p>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                     <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                     <p className="font-bold text-slate-900">Sevgi bilan yaratilgan</p>
                     <p className="text-sm text-slate-500">Toshkent, O'zbekiston</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default About;