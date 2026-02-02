import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Course } from '../../types';
import { COURSES } from '../../services/mockData';
import { BookOpen, Clock, BarChart, Search, Filter, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentCourses: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');
  
  // Filter courses for the student's school
  const myCourses = COURSES.filter(c => c.schoolId === user.schoolId).filter(c => {
     if (filter === 'ACTIVE') return c.progress > 0 && c.progress < 100;
     if (filter === 'COMPLETED') return c.progress === 100;
     return true;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Mening Kurslarim</h1>
          <p className="text-slate-500 font-medium">Bilim olishni davom ettiring.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
           {['ALL', 'ACTIVE', 'COMPLETED'].map(f => (
              <button
                 key={f}
                 onClick={() => setFilter(f as any)}
                 className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                 {f === 'ALL' ? 'Barchasi' : f === 'ACTIVE' ? 'Jarayonda' : 'Tugatilgan'}
              </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myCourses.map((course, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={course.id} 
            className="group bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer flex flex-col overflow-hidden relative"
            onClick={() => navigate(`/student/courses/${course.id}`)}
          >
            <div className="relative h-48 overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                    <Play className="w-6 h-6 text-white fill-white" />
                 </div>
              </div>

              <div className="absolute top-4 right-4">
                 <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-900 shadow-sm">
                    {course.totalLessons} Dars
                 </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded mb-3 inline-block uppercase tracking-wide">{course.category}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium">{course.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-slate-400">Jarayon</span>
                   <span className="text-slate-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                   <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;