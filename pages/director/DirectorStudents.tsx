import React, { useState } from 'react';
import { USERS } from '../../services/mockData';
import { UserRole } from '../../types';
import { Search, Check, X, AlertCircle, MoreHorizontal, Filter } from 'lucide-react';

const DirectorStudents: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'AT_RISK'>('ALL');
  
  // Mock logic to determine if a student is "at risk" (e.g., specific ID or random)
  const isAtRisk = (id: string) => id === 'u8'; 

  const students = USERS.filter(u => {
     if (u.role !== UserRole.STUDENT || u.schoolId !== 's1') return false;
     if (filter === 'PENDING') return u.status === 'PENDING';
     if (filter === 'AT_RISK') return isAtRisk(u.id);
     return true;
  });

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
           <p className="text-slate-500">Monitor student progress and approve new accounts.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
           <button 
             onClick={() => setFilter('ALL')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === 'ALL' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-indigo-600'}`}
           >
             All Students
           </button>
           <button 
             onClick={() => setFilter('PENDING')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === 'PENDING' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-indigo-600'}`}
           >
             Pending Approval
           </button>
           <button 
             onClick={() => setFilter('AT_RISK')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === 'AT_RISK' ? 'bg-red-50 text-red-700' : 'text-slate-500 hover:text-red-600'}`}
           >
             At Risk
           </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex gap-4">
           <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                 type="text" 
                 placeholder="Search students..." 
                 className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
           </div>
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4" /> Filter Grade
           </button>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Grade Level</th>
              <th className="px-6 py-4">Performance</th>
              <th className="px-6 py-4">Attendance</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {students.map(student => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                            {student.name.charAt(0)}
                         </div>
                         <div>
                            <p className="font-semibold text-slate-900">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.email}</p>
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-4 text-slate-600">10th Grade</td>
                   <td className="px-6 py-4">
                      {isAtRisk(student.id) ? (
                         <span className="flex items-center gap-1 text-red-600 font-medium text-xs bg-red-50 px-2 py-1 rounded">
                            <AlertCircle className="w-3 h-3" /> Struggling
                         </span>
                      ) : (
                         <span className="text-emerald-600 font-bold">GPA 3.8</span>
                      )}
                   </td>
                   <td className="px-6 py-4 text-slate-600">94%</td>
                   <td className="px-6 py-4">
                      {student.status === 'PENDING' ? (
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Pending
                         </span>
                      ) : (
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            Active
                         </span>
                      )}
                   </td>
                   <td className="px-6 py-4 text-right">
                      {student.status === 'PENDING' ? (
                         <div className="flex items-center justify-end gap-2">
                            <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded hover:bg-emerald-700">
                               <Check className="w-3 h-3" /> Approve
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                               <X className="w-4 h-4" />
                            </button>
                         </div>
                      ) : (
                         <button className="text-slate-400 hover:text-indigo-600">
                            <MoreHorizontal className="w-5 h-5" />
                         </button>
                      )}
                   </td>
                </tr>
             ))}
          </tbody>
        </table>
        {students.length === 0 && (
           <div className="p-12 text-center text-slate-500">
              No students found in this category.
           </div>
        )}
      </div>
    </div>
  );
};

export default DirectorStudents;
