import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Course } from '../../types';
import { COURSES } from '../../services/mockData';
import { BookOpen, Clock, BarChart } from 'lucide-react';

const StudentCourses: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();
  // Filter courses for the student's school
  const myCourses = COURSES.filter(c => c.schoolId === user.schoolId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mening Kurslarim</h1>
        <p className="text-slate-500">O'quv materiallaringizga kiring va rivojlanishni kuzating.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map(course => (
          <div 
            key={course.id} 
            className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col"
            onClick={() => navigate(`/student/courses/${course.id}`)}
          >
            <div className="relative h-40 bg-slate-200">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{course.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.totalLessons || 0} Dars
                  </div>
                  <div className="flex items-center gap-1">
                     <Clock className="w-4 h-4" />
                     {course.completedLessons || 0} Tugatilgan
                  </div>
                </div>

                <div>
                   <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-indigo-700">Jarayon</span>
                      <span className="text-slate-600">{course.progress}%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
               <span className="text-xs text-slate-500 font-medium">Oxirgi faollik: 2 kun oldin</span>
               <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Davom etish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
