import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, ChevronLeft, Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Boshlang'ich",
      price: billingCycle === 'monthly' ? "0" : "0",
      desc: "Kichik o'quv markazlari va individual repetitorlar uchun.",
      features: [
        "50 tagacha o'quvchi",
        "Asosiy dars jadvali",
        "Oddiy baholash tizimi",
        "Email yordam"
      ],
      notIncluded: ["AI Repetitor", "Kengaytirilgan tahlil", "API integratsiyasi"],
      color: "border-slate-200",
      btnColor: "bg-slate-900 text-white hover:bg-slate-800"
    },
    {
      name: "Professional",
      price: billingCycle === 'monthly' ? "499" : "399",
      desc: "Rivojlanayotgan xususiy maktablar va litseylar uchun.",
      isPopular: true,
      features: [
        "500 tagacha o'quvchi",
        "To'liq AI integratsiyasi",
        "Kengaytirilgan hisobotlar",
        "24/7 Premium yordam",
        "Mobil ilova"
      ],
      notIncluded: ["Oqitelik (Whitelabel)", "Shaxsiy server"],
      color: "border-indigo-500 ring-4 ring-indigo-500/10",
      btnColor: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
    },
    {
      name: "Enterprise",
      price: "Kelishilgan",
      desc: "Katta maktab tarmoqlari va universitetlar uchun.",
      features: [
        "Cheksiz o'quvchilar",
        "Shaxsiy brending",
        "Maxsus serverlar",
        "API integratsiyasi",
        "Shaxsiy menejer",
        "SLA kafolati"
      ],
      notIncluded: [],
      color: "border-slate-200",
      btnColor: "bg-slate-900 text-white hover:bg-slate-800"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
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

      <div className="pt-32 px-6 max-w-7xl mx-auto text-center">
         <h1 className="text-5xl font-black mb-6 tracking-tight">Shaffof Narxlar</h1>
         <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
            Yashirin to'lovlar yo'q. Ehtiyojingizga mos rejani tanlang va ta'lim sifatini oshiring.
         </p>

         {/* Billing Toggle */}
         <div className="flex justify-center mb-16">
            <div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex relative">
               <button 
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all z-10 relative ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}
               >
                  Oylik to'lov
               </button>
               <button 
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all z-10 relative ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}
               >
                  Yillik (-20%)
               </button>
               <div 
                  className={`absolute top-1 bottom-1 w-[50%] bg-slate-900 rounded-lg transition-all duration-300 ${billingCycle === 'monthly' ? 'left-1' : 'left-[49%]'}`}
               ></div>
            </div>
         </div>

         {/* Pricing Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-[2rem] p-8 border relative ${plan.color} ${plan.isPopular ? 'shadow-2xl shadow-indigo-500/20 scale-105 z-10' : 'shadow-xl shadow-slate-200/50'}`}
               >
                  {plan.isPopular && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                        Eng Ommabop
                     </div>
                  )}

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">{plan.desc}</p>
                  
                  <div className="flex items-baseline justify-center gap-1 mb-8">
                     <span className="text-sm font-bold text-slate-400">$</span>
                     <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                     {plan.price !== 'Kelishilgan' && <span className="text-sm font-bold text-slate-400">/oy</span>}
                  </div>

                  <button 
                     onClick={() => navigate('/login')}
                     className={`w-full py-3.5 rounded-xl font-bold transition-all mb-8 ${plan.btnColor}`}
                  >
                     Tanlash
                  </button>

                  <div className="space-y-4 text-left">
                     {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                           <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                           {feat}
                        </div>
                     ))}
                     {plan.notIncluded.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-400">
                           <X className="w-5 h-5 text-slate-300 flex-shrink-0" />
                           {feat}
                        </div>
                     ))}
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Pricing;