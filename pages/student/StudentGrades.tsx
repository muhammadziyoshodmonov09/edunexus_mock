import React from 'react';
import { User } from '../../types';
import { COURSES, ATTENDANCE, CERTIFICATES } from '../../services/mockData';
import { StatCard, PerformanceChart } from '../../components/Widgets';
import { Award, Check, X, Clock, Calendar } from 'lucide-react';

const StudentGrades: React.FC<{ user: User }> = ({ user }) => {
  // Mock grade data for chart
  const gradeTrend = [
    { name: 'Sep', value: 78 }, { name: 'Oct', value: 82 }, 
    { name: 'Nov', value: 88 }, { name: 'Dec', value: 86 }
  ];

  return (
    <div className="space-y-8">
      <div>
         <h1 className="text-2xl font-bold text-slate-900">Academic Record</h1>
         <p className="text-slate-500">Track your grades, attendance, and achievements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Subject Performance</h2>
          </div>
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
               <tr>
                 <th className="px-6 py-4">Subject</th>
                 <th className="px-6 py-4">Completed</th>
                 <th className="px-6 py-4">Attendance</th>
                 <th className="px-6 py-4 text-right">Current Grade</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {COURSES.filter(c => c.schoolId === user.schoolId).map(course => (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{course.title}</td>
                    <td className="px-6 py-4 text-slate-500">{course.completedLessons}/{course.totalLessons} Lessons</td>
                    <td className="px-6 py-4 text-slate-500">92%</td>
                    <td className="px-6 py-4 text-right">
                       <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-xs">A-</span>
                    </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>

        {/* Grade Chart */}
        <div>
           <PerformanceChart data={gradeTrend} type="line" color="#10b981" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance History */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" /> Recent Attendance
          </h2>
          <div className="space-y-4">
             {ATTENDANCE.slice(0, 5).map(att => (
               <div key={att.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                     <p className="font-medium text-slate-900">{att.courseName}</p>
                     <p className="text-xs text-slate-500">{att.date}</p>
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1 ${
                     att.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-700' :
                     att.status === 'ABSENT' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {att.status === 'PRESENT' && <Check className="w-3 h-3" />}
                    {att.status === 'ABSENT' && <X className="w-3 h-3" />}
                    {att.status === 'LATE' && <Clock className="w-3 h-3" />}
                    {att.status}
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" /> Certificates
          </h2>
          <div className="space-y-4">
            {CERTIFICATES.map(cert => (
              <div key={cert.id} className="border border-slate-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                 <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100">
                    <Award className="w-6 h-6 text-amber-600" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{cert.title}</h3>
                    <p className="text-xs text-slate-500">Issued: {cert.issueDate} • {cert.courseName}</p>
                 </div>
                 <button className="text-sm text-indigo-600 font-medium hover:underline">View</button>
              </div>
            ))}
            {CERTIFICATES.length === 0 && <p className="text-sm text-slate-500">No certificates earned yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;
