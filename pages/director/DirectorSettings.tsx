import React, { useState } from 'react';
import { User, School } from '../../types';
import { AUDIT_LOGS, INVOICES, SCHOOLS } from '../../services/mockData';
import { Settings, CreditCard, Shield, Download, Upload, CheckCircle, AlertTriangle } from 'lucide-react';

const DirectorSettings: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'billing' | 'audit'>('general');
  
  // Mock finding current school
  const currentSchool = SCHOOLS.find(s => s.id === user.schoolId);
  
  const schoolAuditLogs = AUDIT_LOGS.filter(log => log.schoolId === user.schoolId);
  const schoolInvoices = INVOICES.filter(inv => inv.schoolId === user.schoolId);

  if (!currentSchool) return <div>School not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">School Settings</h1>
           <p className="text-slate-500">Manage configuration, billing and security.</p>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Settings className="w-4 h-4" /> General
        </button>
        <button 
          onClick={() => setActiveTab('billing')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'billing' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <CreditCard className="w-4 h-4" /> Billing & Plan
        </button>
        <button 
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'audit' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Shield className="w-4 h-4" /> Audit Logs
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
        
        {/* General Settings */}
        {activeTab === 'general' && (
           <div className="p-8 max-w-2xl">
              <div className="flex items-start gap-8 mb-8">
                 <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 relative group cursor-pointer hover:border-indigo-400">
                    <img src={currentSchool.logo} className="w-full h-full object-cover rounded-lg opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 rounded-lg transition-opacity">
                       <Upload className="w-6 h-6 text-white" />
                    </div>
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg">School Identity</h3>
                    <p className="text-sm text-slate-500 mb-4">This logo and name will be visible to all students and teachers.</p>
                    <div className="grid grid-cols-1 gap-4">
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">School Name</label>
                          <input type="text" defaultValue={currentSchool.name} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">School Contact Email</label>
                          <input type="email" defaultValue={`admin@${currentSchool.name.toLowerCase().replace(/\s/g, '')}.edu`} className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                       </div>
                    </div>
                 </div>
              </div>
              <div className="border-t border-slate-100 pt-6">
                 <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">Save Changes</button>
              </div>
           </div>
        )}

        {/* Billing */}
        {activeTab === 'billing' && (
           <div className="p-8">
              <div className="flex items-start justify-between mb-8 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl text-white">
                 <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Current Plan</p>
                    <h3 className="text-3xl font-bold mb-2">{currentSchool.plan} Plan</h3>
                    <p className="text-slate-300 text-sm">Next billing date: December 1, 2026</p>
                 </div>
                 <div className="text-right">
                    <p className="text-3xl font-bold mb-2">$2,500<span className="text-lg text-slate-400 font-normal">/mo</span></p>
                    <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50">Upgrade Plan</button>
                 </div>
              </div>

              <h3 className="font-bold text-slate-900 mb-4">Invoice History</h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                       <tr>
                          <th className="px-6 py-3">Invoice ID</th>
                          <th className="px-6 py-3">Date</th>
                          <th className="px-6 py-3">Amount</th>
                          <th className="px-6 py-3">Plan</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3 text-right">Download</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {schoolInvoices.map(inv => (
                          <tr key={inv.id} className="hover:bg-slate-50">
                             <td className="px-6 py-3 font-mono text-slate-600">{inv.id}</td>
                             <td className="px-6 py-3">{inv.date}</td>
                             <td className="px-6 py-3 font-medium">${inv.amount.toLocaleString()}</td>
                             <td className="px-6 py-3">{inv.plan}</td>
                             <td className="px-6 py-3">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700">
                                   <CheckCircle className="w-3 h-3" /> PAID
                                </span>
                             </td>
                             <td className="px-6 py-3 text-right">
                                <button className="text-indigo-600 hover:text-indigo-800"><Download className="w-4 h-4" /></button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}

        {/* Audit Logs */}
        {activeTab === 'audit' && (
           <div className="p-0">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                 <h3 className="font-bold text-slate-700">Activity Log</h3>
                 <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-medium hover:bg-slate-50">Export CSV</button>
                 </div>
              </div>
              <table className="w-full text-left text-sm">
                 <thead className="text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                       <th className="px-6 py-3">Timestamp</th>
                       <th className="px-6 py-3">User</th>
                       <th className="px-6 py-3">Action</th>
                       <th className="px-6 py-3">Target</th>
                       <th className="px-6 py-3">Type</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {schoolAuditLogs.map(log => (
                       <tr key={log.id} className="hover:bg-slate-50">
                          <td className="px-6 py-3 text-slate-500 font-mono text-xs">{log.timestamp}</td>
                          <td className="px-6 py-3 font-medium text-slate-900">{log.actorName}</td>
                          <td className="px-6 py-3">{log.action}</td>
                          <td className="px-6 py-3 text-slate-600">{log.target}</td>
                          <td className="px-6 py-3">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                log.type === 'SECURITY' ? 'bg-red-100 text-red-700' :
                                log.type === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                                'bg-blue-100 text-blue-700'
                             }`}>
                                {log.type}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
              <div className="p-4 text-center border-t border-slate-200 text-xs text-slate-400">
                 Showing last {schoolAuditLogs.length} events. Logs are retained for 90 days.
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default DirectorSettings;