import React, { useState } from 'react';
import { SCHOOLS } from '../../services/mockData';
import { School } from '../../types';
import { Search, Plus, Building2, MoreHorizontal, Power, Edit, Trash2 } from 'lucide-react';

const AdminSchools: React.FC = () => {
  const [schools, setSchools] = useState<School[]>(SCHOOLS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredSchools = schools.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (id: string) => {
    setSchools(schools.map(s => 
      s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : s
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this school? This cannot be undone.")) {
      setSchools(schools.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">School Management</h1>
           <p className="text-slate-500">Create, configure and manage client schools.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
           <Plus className="w-4 h-4" />
           <span>Add New School</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex gap-4">
           <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                 type="text" 
                 placeholder="Search schools..." 
                 className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">School Name</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Users</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {filteredSchools.map(school => (
                <tr key={school.id} className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <img src={school.logo} alt={school.name} className="w-10 h-10 rounded-lg bg-slate-100 object-cover" />
                         <div>
                            <p className="font-semibold text-slate-900">{school.name}</p>
                            <p className="text-xs text-slate-500">ID: {school.id}</p>
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold tracking-wide ${
                        school.plan === 'ENTERPRISE' ? 'bg-purple-100 text-purple-700' : 
                        school.plan === 'PRO' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {school.plan}
                      </span>
                   </td>
                   <td className="px-6 py-4">
                      <div className="text-slate-900 font-medium">{school.studentCount + school.teacherCount}</div>
                      <div className="text-xs text-slate-500">{(school.studentCount).toLocaleString()} Students</div>
                   </td>
                   <td className="px-6 py-4 text-slate-600">{school.joinedDate}</td>
                   <td className="px-6 py-4">
                      <button 
                        onClick={() => handleStatusToggle(school.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          school.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {school.status}
                      </button>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                         <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Edit School">
                            <Edit className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => handleStatusToggle(school.id)}
                           className={`p-2 rounded-lg ${school.status === 'ACTIVE' ? 'text-slate-400 hover:text-red-600 hover:bg-red-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                           title={school.status === 'ACTIVE' ? "Deactivate" : "Activate"}
                         >
                            <Power className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => handleDelete(school.id)}
                           className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" 
                           title="Delete School"
                         >
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                   </td>
                </tr>
             ))}
          </tbody>
        </table>
      </div>

      {/* Add School Modal (Simulated) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                 <h3 className="font-bold text-slate-900">Add New School</h3>
                 <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">×</button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">School Name</label>
                    <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Springfield High" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subscription Plan</label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
                       <option value="BASIC">Basic</option>
                       <option value="PRO">Pro</option>
                       <option value="ENTERPRISE">Enterprise</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
                    <input type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="admin@school.edu" />
                 </div>
              </div>
              <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                 <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">Cancel</button>
                 <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Create School</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchools;
