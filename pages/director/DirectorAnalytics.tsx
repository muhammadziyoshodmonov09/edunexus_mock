import React from 'react';
import { PerformanceChart } from '../../components/Widgets';
import { COURSES } from '../../services/mockData';
import { Download, PieChart } from 'lucide-react';

const DirectorAnalytics: React.FC = () => {
  // Aggregate mock data from courses
  const subjectPerformance = COURSES.map(c => ({
     name: c.title.split(' ')[0], // Simpler label
     value: c.averageGrade || 0
  }));

  const gradeDistribution = [
     { name: 'A (90-100)', value: 35 },
     { name: 'B (80-89)', value: 42 },
     { name: 'C (70-79)', value: 15 },
     { name: 'D/F (<70)', value: 8 },
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Academic Analytics</h1>
           <p className="text-slate-500">Deep dive into school performance and trends.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors">
           <Download className="w-4 h-4" />
           <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Subject Performance */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Performance by Subject</h3>
            <div className="h-80">
               <PerformanceChart data={subjectPerformance} type="bar" color="#6366f1" />
            </div>
            <div className="mt-4 text-center text-sm text-slate-500">
               Average grades across all classes
            </div>
         </div>

         {/* Grade Distribution */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Grade Distribution</h3>
            <div className="h-80">
               <PerformanceChart data={gradeDistribution} type="bar" color="#10b981" />
            </div>
             <div className="mt-4 text-center text-sm text-slate-500">
               Student distribution by grade bands
            </div>
         </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Department Overview</h3>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View Details</button>
         </div>
         <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
               <tr>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Head of Dept</th>
                  <th className="px-6 py-4">Teachers</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Avg Performance</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">Mathematics</td>
                  <td className="px-6 py-4">Mr. Smith</td>
                  <td className="px-6 py-4">4</td>
                  <td className="px-6 py-4">120</td>
                  <td className="px-6 py-4"><span className="text-emerald-600 font-bold">88%</span></td>
               </tr>
               <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">Science</td>
                  <td className="px-6 py-4">Ms. Johnson</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4">95</td>
                  <td className="px-6 py-4"><span className="text-indigo-600 font-bold">82%</span></td>
               </tr>
               <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">Humanities</td>
                  <td className="px-6 py-4">Mrs. Davis</td>
                  <td className="px-6 py-4">5</td>
                  <td className="px-6 py-4">140</td>
                  <td className="px-6 py-4"><span className="text-emerald-600 font-bold">91%</span></td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default DirectorAnalytics;
