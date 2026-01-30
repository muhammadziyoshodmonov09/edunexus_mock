import React, { useState } from 'react';
import { USERS, SCHOOLS } from '../../services/mockData';
import { Search, Filter, Shield, Lock, MoreHorizontal } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredUsers = USERS.filter(u => {
     const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
     return matchesSearch && matchesRole;
  });

  const getSchoolName = (schoolId: string) => {
     if (schoolId === 'global') return 'Global Admin';
     return SCHOOLS.find(s => s.id === schoolId)?.name || 'Unknown School';
  };

  return (
    <div className="space-y-6">
       <div>
         <h1 className="text-2xl font-bold text-slate-900">Global User Directory</h1>
         <p className="text-slate-500">Manage user roles and permissions across the platform.</p>
       </div>

       <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Search name or email..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex gap-2">
               <select 
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
               >
                  <option value="ALL">All Roles</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DIRECTOR">Director</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="STUDENT">Student</option>
               </select>
            </div>
         </div>

         <table className="w-full text-left text-sm">
           <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
             <tr>
               <th className="px-6 py-4">User</th>
               <th className="px-6 py-4">Role</th>
               <th className="px-6 py-4">Organization</th>
               <th className="px-6 py-4">Last Active</th>
               <th className="px-6 py-4">Status</th>
               <th className="px-6 py-4 text-right">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(user => (
                 <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full bg-slate-200 object-cover" />
                          <div>
                             <p className="font-semibold text-slate-900">{user.name}</p>
                             <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide border ${
                          user.role === 'ADMIN' ? 'bg-red-50 text-red-700 border-red-100' :
                          user.role === 'DIRECTOR' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                          user.role === 'TEACHER' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                          'bg-slate-50 text-slate-600 border-slate-100'
                       }`}>
                          {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
                          {user.role}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                       {getSchoolName(user.schoolId)}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{user.lastActive || 'N/A'}</td>
                    <td className="px-6 py-4">
                       <span className={`text-xs font-bold ${
                          user.status === 'ACTIVE' ? 'text-emerald-600' : 
                          user.status === 'PENDING' ? 'text-amber-600' : 'text-red-600'
                       }`}>
                          {user.status || 'ACTIVE'}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Manage Permissions">
                             <Lock className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                             <MoreHorizontal className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                 </tr>
              ))}
           </tbody>
         </table>
       </div>
    </div>
  );
};

export default AdminUsers;
