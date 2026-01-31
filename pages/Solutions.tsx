import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { School, ChevronLeft, GraduationCap, Users, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

const Solutions: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'director'>('student');

  const content = {
    student: {
      title: "Talabalar Uchun",
      subtitle: "O'qish jarayonini o'yinga aylantiring",
      desc: "EduNexus talabalar uchun zerikarli darslarni qiziqarli sarguzashtga aylantiradi. Gamifikatsiya, yutuqlar va shaxsiy rivojlanish rejasi.",
      points: [
         "Shaxsiy kabinet va portfoliolar",
         "O'yinlashtirilgan reyting tizimi",
         "Onlayn kutubxona va resurslar",
         "Tengdoshlar bilan muloqot chati"
      ],
      color: "from-emerald-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
    },
    teacher: {
      title: "O'qituvchilar Uchun",
      subtitle: "Qog'ozbozlikdan ozod bo'ling",
      desc: "Dars rejalarini tuzish, jurnallarni to'ldirish va baholashni avtomatlashtiring. Vaqtingizni o'quvchilar bilan ishlashga sarflang.",
      points: [
         "AI yordamida dars rejalari",
         "Avtomatik davomat tizimi",
         "Tezkor test va viktorinalar",
         "Sinf statistikasi va tahlili"
      ],
      color: "from-indigo-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=2070"
    },
    director: {
      title: "Direktorlar Uchun",
      subtitle: "Maktabni kaftingizdek ko'ring",
      desc: "Barcha jarayonlarni yagona markazdan boshqaring. Moliya, xodimlar va ta'lim sifatini nazorat qilishning eng oson yo'li.",
      points: [
         "To'liq moliyaviy hisobotlar",
         "Xodimlar KPI tizimi",
         "Ota-onalar bilan aloqa portali",
         "Resurslar va inventar boshqaruvi"
      ],
      color: "from-blue-600 to-indigo-700",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2032"
    }
  };

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

      <div className="pt-32 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-6 tracking-tight">
               Har bir rol uchun <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">Mukammal Yechim</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
               EduNexus maktab ekotizimining barcha ishtirokchilari ehtiyojlarini inobatga olgan holda ishlab chiqilgan.
            </p>
         </div>

         {/* Tabs */}
         <div className="flex justify-center mb-16">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
               <button 
                  onClick={() => setActiveTab('student')}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'student' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}
               >
                  <GraduationCap className="w-4 h-4" /> Talabalar
               </button>
               <button 
                  onClick={() => setActiveTab('teacher')}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'teacher' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
               >
                  <Users className="w-4 h-4" /> O'qituvchilar
               </button>
               <button 
                  onClick={() => setActiveTab('director')}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'director' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
               >
                  <Building2 className="w-4 h-4" /> Rahbariyat
               </button>
            </div>
         </div>

         {/* Content Area */}
         <AnimatePresence mode="wait">
            <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4 }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
               <div className="space-y-8">
                  <div className={`inline-block px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${content[activeTab].color}`}>
                     {content[activeTab].title}
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                     {content[activeTab].subtitle}
                  </h2>
                  <p className="text-lg text-slate-500 leading-relaxed">
                     {content[activeTab].desc}
                  </p>
                  
                  <ul className="space-y-4">
                     {content[activeTab].points.map((point, i) => (
                        <motion.li 
                           key={i} 
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.1 }}
                           className="flex items-center gap-3 font-medium text-slate-700"
                        >
                           <CheckCircle2 className={`w-5 h-5 flex-shrink-0 bg-gradient-to-br ${content[activeTab].color} rounded-full text-white p-0.5`} />
                           {point}
                        </motion.li>
                     ))}
                  </ul>

                  <button 
                     onClick={() => navigate('/login')}
                     className={`mt-8 px-8 py-4 rounded-xl text-white font-bold flex items-center gap-2 transition-all hover:gap-4 bg-gradient-to-r ${content[activeTab].color} shadow-lg`}
                  >
                     Boshlash <ArrowRight className="w-5 h-5" />
                  </button>
               </div>

               <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${content[activeTab].color} rounded-[3rem] blur-3xl opacity-20 transform rotate-6`}></div>
                  <img 
                     src={content[activeTab].image} 
                     alt={content[activeTab].title} 
                     className="relative z-10 rounded-[2.5rem] shadow-2xl border-4 border-white transform hover:-rotate-2 transition-transform duration-500 object-cover w-full h-[500px]"
                  />
                  {/* Floating Elements */}
                  <motion.div 
                     animate={{ y: [0, -20, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -left-10 top-20 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
                  >
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">A+</div>
                        <div>
                           <p className="text-xs text-slate-500">O'rtacha Baho</p>
                           <p className="font-bold text-slate-900">Yuqori Natija</p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
};

export default Solutions;