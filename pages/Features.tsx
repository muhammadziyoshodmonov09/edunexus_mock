import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, BarChart3, Shield, Globe, Zap, Users, 
  Layers, Lock, Sparkles, School, ChevronLeft
} from 'lucide-react';

const Features: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI Repetitor",
      desc: "Har bir o'quvchi uchun individual yondashuv. Sun'iy intellekt o'quvchining bo'shliqlarini aniqlaydi va moslashtirilgan darslarni taklif qiladi.",
      icon: BrainCircuit,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Real Vaqt Tahlili",
      desc: "O'qituvchilar va direktorlar uchun chuqur tahlillar. O'zlashtirish darajasi, davomat va faollikni real vaqtda kuzatib boring.",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Bank Darajasida Xavfsizlik",
      desc: "Ma'lumotlaringiz shifrlangan va xavfsiz saqlanadi. Bizning platforma xalqaro xavfsizlik standartlariga to'liq javob beradi.",
      icon: Shield,
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Global Integratsiya",
      desc: "Google Classroom, Zoom va boshqa mashhur vositalar bilan integratsiya. Yagona ekotizimda barcha vositalarni boshqaring.",
      icon: Globe,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Avtomatlashtirilgan Baholash",
      desc: "Testlar va topshiriqlarni avtomatik tekshirish. O'qituvchilar vaqtini tejash va inson omilini kamaytirish.",
      icon: Zap,
      color: "from-amber-400 to-yellow-500"
    },
    {
      title: "Ota-onalar Nazorati",
      desc: "Farzandingizning rivojlanishini kuzatib boring. Baholar, davomat va o'qituvchi izohlari to'g'ridan-to'g'ri telefoningizda.",
      icon: Users,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200">
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
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
         >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6 border border-indigo-100">
               <Sparkles className="w-4 h-4" />
               <span>Cheksiz Imkoniyatlar</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900">
               Platforma <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Xususiyatlari</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
               EduNexus shunchaki LMS emas. Bu ta'lim jarayonini to'liq raqamlashtiruvchi va yangi bosqichga olib chiquvchi ekotizimdir.
            </p>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group"
               >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-[4rem] transition-all group-hover:scale-150 duration-500`}></div>
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
                     <feature.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                     {feature.desc}
                  </p>
               </motion.div>
            ))}
         </div>

         {/* Interactive Demo Block */}
         <div className="mt-32 relative rounded-[3rem] overflow-hidden bg-slate-900 text-white p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10">
               <h2 className="text-4xl md:text-5xl font-bold mb-6">O'zingiz Sinab Ko'ring</h2>
               <p className="text-indigo-200 text-xl mb-10 max-w-2xl mx-auto">
                  Bizning interaktiv demo versiyamiz orqali platformaning barcha imkoniyatlarini bepul sinab ko'rishingiz mumkin.
               </p>
               <button 
                  onClick={() => navigate('/login')}
                  className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl shadow-white/10"
               >
                  Demo Versiyani Ochish
               </button>
            </div>
            {/* Abstract Shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px]"></div>
         </div>
      </div>
    </div>
  );
};

export default Features;