import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Course } from '../../types';
import { COURSES } from '../../services/mockData';
import { Plus, BookOpen, Users, Clock } from 'lucide-react';

const TeacherCourses: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  const myCourses = COURSES.filter(c => c.teacherId === user.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kurs Boshqaruvchisi</h1>
          <p className="text-slate-500">O'qitish fanlaringizni yarating, tahrirlang va tashkil qiling.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Yangi Kurs Yaratish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map(course => (
          <div 
            key={course.id} 
            className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col"
            onClick={() => navigate(`/teacher/courses/${course.id}`)}
          >
            <div className="relative h-40 bg-slate-200">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-700">
                10-Sinf
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{course.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-slate-500 text-sm">
                 <div className="flex items-center gap-1.5">
                   <BookOpen className="w-4 h-4" />
                   <span>{course.totalLessons || 0} Dars</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Users className="w-4 h-4" />
                   <span>24 Talaba</span>
                 </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New */}
        <button className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-all group h-full min-h-[300px]">
           <div className="w-16 h-16 bg-white rounded-full border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
             <Plus className="w-8 h-8 text-slate-400 group-hover:text-indigo-600" />
           </div>
           <h3 className="text-lg font-semibold text-slate-700 group-hover:text-indigo-700">Yana Fan Qo'shish</h3>
           <p className="text-sm text-slate-400">Matematika, Fizika, Tarix va boshqalar.</p>
        </button>
      </div>
    </div>
  );
};

export default TeacherCourses;
