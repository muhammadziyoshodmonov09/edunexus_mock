import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { ArrowUp, ArrowDown, Minus, TrendingUp } from 'lucide-react';
import { StatMetric } from '../types';
import { motion } from 'framer-motion';

export const StatCard: React.FC<{ metric: StatMetric }> = ({ metric }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-panel p-6 rounded-[1.5rem] relative overflow-hidden group"
    >
      {/* Decorative Gradient Blob */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-colors"></div>

      <div className="relative z-10 flex justify-between items-start">
        <div>
           <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{metric.label}</h3>
           <div className="flex items-baseline gap-2">
             <span className="text-4xl font-black text-slate-800 tracking-tight">{metric.value}</span>
           </div>
        </div>
        <div className={`p-2.5 rounded-xl shadow-inner ${
            metric.trend === 'up' ? 'bg-emerald-100/50 text-emerald-600' : 
            metric.trend === 'down' ? 'bg-red-100/50 text-red-600' : 'bg-slate-100/50 text-slate-600'
        }`}>
            {metric.trend === 'up' && <ArrowUp className="w-5 h-5" />}
            {metric.trend === 'down' && <ArrowDown className="w-5 h-5" />}
            {metric.trend === 'neutral' && <Minus className="w-5 h-5" />}
        </div>
      </div>
      
      {metric.change && (
        <div className="relative z-10 mt-6 flex items-center">
          <span className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-lg ${
            metric.trend === 'up' ? 'text-emerald-700 bg-emerald-100' : 
            metric.trend === 'down' ? 'text-red-700 bg-red-100' : 'text-slate-600 bg-slate-100'
          }`}>
            {metric.change}
          </span>
          <span className="text-xs text-slate-400 font-semibold ml-2">o'tgan oydan</span>
        </div>
      )}
    </motion.div>
  );
};

export const PerformanceChart: React.FC<{ data: any[], type?: 'bar' | 'line' | 'area', color?: string }> = ({ data, type = 'area', color = '#6366f1' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-8 rounded-[2rem] h-[420px] flex flex-col relative"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-slate-800 font-bold text-xl">Samaradorlik Trendlari</h3>
          <p className="text-slate-500 text-xs font-semibold mt-1">Real vaqt rejimidagi ma'lumotlar</p>
        </div>
        <button className="p-3 bg-white/50 border border-white/60 rounded-xl text-indigo-600 shadow-sm hover:shadow-md hover:scale-105 transition-all">
          <TrendingUp className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                 <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="100%" stopColor={color} stopOpacity={0.3}/>
                 </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} />
              <RechartsTooltip 
                cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)', padding: '12px', fontFamily: 'Plus Jakarta Sans' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}
              />
              <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 8, 8]} barSize={36} />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} />
              <RechartsTooltip contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)' }}/>
              <Area type="monotone" dataKey="value" stroke={color} strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};