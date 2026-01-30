import React, { useState } from 'react';
import { ASSIGNMENTS, COURSES } from '../../services/mockData';
import { Clock, FileText, CheckCircle, Upload, AlertCircle } from 'lucide-react';

const StudentAssignments: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SUBMITTED' | 'GRADED'>('ALL');
  
  const filteredAssignments = ASSIGNMENTS.filter(a => {
    if (filter === 'ALL') return true;
    return a.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'SUBMITTED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'GRADED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-2xl font-bold text-slate-900">Topshiriqlar</h1>
            <p className="text-slate-500">Uy vazifalari va loyihalarni topshirishni boshqaring.</p>
         </div>
         <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
           {['HAMMASI', 'KUTILMOQDA', 'TOPSHIRILGAN', 'BAHOLANGAN'].map((label, index) => {
             const key = ['ALL', 'PENDING', 'SUBMITTED', 'GRADED'][index];
             return (
               <button
                 key={key}
                 onClick={() => setFilter(key as any)}
                 className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${filter === key ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-indigo-600'}`}
               >
                 {label}
               </button>
             );
           })}
         </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredAssignments.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredAssignments.map(assign => {
              const course = COURSES.find(c => c.id === assign.courseId);
              return (
                <div key={assign.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(assign.status)}`}>
                         {assign.status}
                       </span>
                       <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                         {course?.title}
                       </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{assign.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{assign.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                         <Clock className="w-4 h-4 text-slate-400" />
                         <span>Muddat: {assign.dueDate}</span>
                      </div>
                      {assign.grade !== undefined && (
                        <div className="flex items-center gap-1 text-emerald-600 font-bold">
                           <CheckCircle className="w-4 h-4" />
                           <span>Baho: {assign.grade}/{assign.maxGrade}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    {assign.status === 'PENDING' ? (
                       <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors">
                          <Upload className="w-4 h-4" /> Ishni Topshirish
                       </button>
                    ) : assign.status === 'GRADED' ? (
                       <button className="px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-white hover:border-slate-400 transition-colors">
                          Fikr-mulohazani Ko'rish
                       </button>
                    ) : (
                       <button className="px-5 py-2.5 border border-slate-300 text-slate-400 font-medium rounded-lg cursor-not-allowed">
                          Qayta Ishlanmoqda
                       </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Topshiriqlar topilmadi</h3>
            <p className="text-slate-500">Ushbu toifada siz hamma ishni bajarib bo'lgansiz!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignments;
