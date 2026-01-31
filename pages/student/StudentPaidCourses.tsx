import React, { useState } from 'react';
import { User, Course } from '../../types';
import { COURSES } from '../../services/mockData';
import { ShoppingBag, Video, Globe, Book, Star, CheckCircle, Lock, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const StudentPaidCourses: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'ALL' | 'SAT' | 'IELTS' | 'IT'>('ALL');

  const paidCourses = COURSES.filter(c => c.isPaid && (filter === 'ALL' || c.category === filter));

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
            <h1 className="text-3xl font-black text-slate-900">{t('paidCourses')}</h1>
            <p className="text-slate-500 font-medium">Xalqaro sertifikatlar va IT ko'nikmalarni o'rganing.</p>
         </div>
         <div className="flex gap-2">
            {['ALL', 'IELTS', 'SAT', 'IT'].map((cat) => (
               <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
               >
                  {cat === 'ALL' ? 'Barchasi' : cat}
               </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {paidCourses.map((course, i) => (
            <motion.div 
               key={course.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col group hover:border-indigo-300 transition-all"
            >
               <div className="relative h-56">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                     <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                     Premium
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                     <span className="text-xs font-bold bg-indigo-600 px-2 py-1 rounded mb-2 inline-block">{course.category}</span>
                     <h3 className="text-2xl font-black leading-tight">{course.title}</h3>
                  </div>
               </div>

               <div className="p-6 flex-1 flex flex-col">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                     {course.description}
                  </p>

                  <div className="space-y-3 mb-8">
                     <div className="flex items-center gap-3 text-sm text-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600"><Video className="w-4 h-4" /></div>
                        <span className="font-bold">{t('liveZoom')}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle className="w-4 h-4" /></div>
                        <span>Sertifikat beriladi</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600"><Globe className="w-4 h-4" /></div>
                        <span>Xalqaro standart</span>
                     </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                     <div>
                        <span className="block text-xs text-slate-400 font-bold uppercase">{t('price')}</span>
                        <span className="text-2xl font-black text-slate-900">${course.price}</span>
                     </div>
                     {course.meetingLink ? (
                        <a 
                           href={course.meetingLink}
                           target="_blank"
                           rel="noreferrer"
                           className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
                        >
                           <MonitorPlay className="w-5 h-5" />
                           Darsga Kirish
                        </a>
                     ) : (
                        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg">
                           <ShoppingBag className="w-5 h-5" />
                           {t('buyCourse')}
                        </button>
                     )}
                  </div>
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  );
};

export default StudentPaidCourses;