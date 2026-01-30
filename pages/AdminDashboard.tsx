import React from 'react';
import { SCHOOLS } from '../services/mockData';
import { School, UserRole } from '../types';
import { StatCard, PerformanceChart } from '../components/Widgets';
import { Building2, CreditCard, Users, TrendingUp, Trophy, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const totalRevenue = SCHOOLS.reduce((acc, s) => acc + s.revenue, 0);
  const totalStudents = SCHOOLS.reduce((acc, s) => acc + s.studentCount, 0);

  const globalStats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, trend: 'up' as const, change: '+12%' },
    { label: 'Active Schools', value: SCHOOLS.filter(s => s.status === 'ACTIVE').length, trend: 'up' as const, change: '+1' },
    { label: 'Total Students', value: totalStudents.toLocaleString(), trend: 'up' as const, change: '+5%' },
    { label: 'Platform Growth', value: '18%', trend: 'up' as const, change: '+2.5%' },
  ];

  const revenueData = [
    { name: 'Jan', value: 32000 }, { name: 'Feb', value: 35000 },
    { name: 'Mar', value: 41000 }, { name: 'Apr', value: 44000 }
  ];

  const sortedSchools = [...SCHOOLS].sort((a, b) => b.studentCount - a.studentCount);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-bold text-slate-900">Platform Overview</h1>
            <p className="text-slate-500">Super Admin Control Panel</p>
         </div>
         <div className="flex gap-2">
            <button onClick={() => navigate('/admin/schools')} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm">
               <Building2 className="w-4 h-4" /> Manage Schools
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalStats.map((s, i) => <StatCard key={i} metric={s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" /> Revenue Growth
               </h3>
            </div>
            <div className="h-72">
               <PerformanceChart data={revenueData} type="area" color="#10b981" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-slate-900 flex items-center gap-2">
                 <Trophy className="w-5 h-5 text-amber-500" /> Top Performing Schools
               </h3>
               <button className="text-sm text-indigo-600 font-medium hover:underline">View All Rankings</button>
             </div>
             <table className="w-full text-left text-sm">
               <thead className="text-slate-500 font-medium border-b border-slate-200 bg-white">
                 <tr>
                   <th className="px-6 py-4">Rank</th>
                   <th className="px-6 py-4">School</th>
                   <th className="px-6 py-4">Students</th>
                   <th className="px-6 py-4">Plan</th>
                   <th className="px-6 py-4 text-right">Revenue</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {sortedSchools.map((school, index) => (
                   <tr key={school.id} className="hover:bg-slate-50">
                     <td className="px-6 py-4 font-bold text-slate-400">#{index + 1}</td>
                     <td className="px-6 py-4 font-medium text-slate-900">{school.name}</td>
                     <td className="px-6 py-4">{school.studentCount.toLocaleString()}</td>
                     <td className="px-6 py-4">
                       <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold tracking-wide ${
                         school.plan === 'ENTERPRISE' ? 'bg-purple-100 text-purple-700' : 
                         school.plan === 'PRO' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                       }`}>
                         {school.plan}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-right font-medium text-emerald-600">${school.revenue.toLocaleString()}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Right Sidebar stats */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                 <Globe className="w-5 h-5" /> Global Reach
              </h3>
              <p className="text-indigo-100 text-sm mb-6">EduNexus is currently deployed in multiple regions.</p>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span>North America</span>
                    <span className="font-bold">65%</span>
                 </div>
                 <div className="w-full bg-indigo-800 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }}></div>
                 </div>
                 
                 <div className="flex justify-between items-center text-sm">
                    <span>Europe</span>
                    <span className="font-bold">25%</span>
                 </div>
                 <div className="w-full bg-indigo-800 rounded-full h-1.5">
                    <div className="bg-indigo-300 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                 </div>

                 <div className="flex justify-between items-center text-sm">
                    <span>Asia Pacific</span>
                    <span className="font-bold">10%</span>
                 </div>
                 <div className="w-full bg-indigo-800 rounded-full h-1.5">
                    <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-indigo-600" /> Platform Goals
             </h3>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full border-2 border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs">
                     85%
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Server Uptime</p>
                      <p className="text-xs text-slate-500">Target: 99.9%</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full border-2 border-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-xs">
                     102%
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">New Signups</p>
                      <p className="text-xs text-slate-500">Target: 500/mo</p>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
