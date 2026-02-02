import React, { useState } from 'react';
import { ASSIGNMENTS, COURSES } from '../../services/mockData';
import { Clock, FileText, CheckCircle, Upload, AlertCircle, MoreHorizontal, ArrowRight, Plus, Calendar, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Modern Kanban Column
const KanbanColumn: React.FC<{ 
  title: string; 
  count: number; 
  color: string; 
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, count, color, children, icon }) => (
  <div className="flex-1 min-w-[300px] flex flex-col h-full bg-slate-50/50 rounded-3xl p-4 border border-slate-100 shadow-inner">
    <div className={`flex items-center justify-between mb-4 px-2`}>
       <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-black text-slate-700 tracking-tight">{title}</h3>
       </div>
       <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${color} bg-white border border-slate-100`}>{count}</span>
    </div>
    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1 pb-4">
       {children}
    </div>
  </div>
);

const StudentAssignments: React.FC = () => {
  const [tasks, setTasks] = useState(ASSIGNMENTS.map(a => ({...a, status: a.status === 'GRADED' ? 'DONE' : a.status === 'SUBMITTED' ? 'REVIEW' : 'TODO'})));
  const [isDragOver, setIsDragOver] = useState(false);

  const moveTask = (id: string, newStatus: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const columns = {
    TODO: tasks.filter(t => t.status === 'TODO'),
    REVIEW: tasks.filter(t => t.status === 'REVIEW'),
    DONE: tasks.filter(t => t.status === 'DONE'),
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-black text-slate-900">Vazifalar Doskasi</h1>
            <p className="text-slate-500 font-medium">Barcha topshiriqlarni bir joyda boshqaring.</p>
         </div>
         <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold flex items-center gap-2">
               <Grid className="w-4 h-4" /> Doska
            </button>
            <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-bold flex items-center gap-2">
               <Calendar className="w-4 h-4" /> Taqvim
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 h-full min-w-[900px]">
          {/* TODO COLUMN */}
          <KanbanColumn 
            title="Bajarilishi Kerak" 
            count={columns.TODO.length} 
            color="text-slate-600"
            icon={<div className="w-2 h-2 rounded-full bg-slate-400"></div>}
          >
             <AnimatePresence>
               {columns.TODO.map(task => {
                 const course = COURSES.find(c => c.id === task.courseId);
                 return (
                   <motion.div
                     layoutId={task.id}
                     key={task.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden"
                   >
                      <div className="absolute top-0 left-0 w-1 h-full bg-orange-400 rounded-l-2xl"></div>
                      <div className="flex justify-between items-start mb-3">
                         <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded border border-indigo-100 line-clamp-1 max-w-[50%]">{course?.title}</span>
                         <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                            <Clock className="w-3 h-3" /> {task.dueDate}
                         </div>
                      </div>
                      <h4 className="font-bold text-slate-800 mb-2 leading-snug text-sm">{task.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">{task.description}</p>
                      
                      <button 
                        onClick={() => moveTask(task.id, 'REVIEW')}
                        className="w-full py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600"
                      >
                         <Upload className="w-3 h-3" /> Fayl Yuklash
                      </button>
                   </motion.div>
                 );
               })}
             </AnimatePresence>
             {columns.TODO.length === 0 && (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-white/50">
                   <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">🌴</div>
                   <p className="text-slate-400 text-sm font-bold">Vazifalar yo'q. Dam oling!</p>
                </div>
             )}
          </KanbanColumn>

          {/* IN REVIEW COLUMN */}
          <KanbanColumn 
            title="Tekshirilmoqda" 
            count={columns.REVIEW.length} 
            color="text-indigo-600"
            icon={<div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>}
          >
             <AnimatePresence>
               {columns.REVIEW.map(task => (
                   <motion.div
                     layoutId={task.id}
                     key={task.id}
                     className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden"
                   >
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                         <Clock className="w-16 h-16 text-indigo-600" />
                      </div>
                      <h4 className="font-bold text-slate-800 mb-2 text-sm relative z-10">{task.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50 p-2.5 rounded-xl font-medium relative z-10">
                         <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                         O'qituvchi tekshirmoqda...
                      </div>
                      <button onClick={() => moveTask(task.id, 'DONE')} className="text-[10px] text-slate-300 hover:text-indigo-500 w-full text-right mt-2 relative z-10">
                         (Demo: Baholash)
                      </button>
                   </motion.div>
               ))}
             </AnimatePresence>
          </KanbanColumn>

          {/* DONE COLUMN */}
          <KanbanColumn 
            title="Baholandi" 
            count={columns.DONE.length} 
            color="text-emerald-600"
            icon={<div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
          >
             <AnimatePresence>
               {columns.DONE.map(task => (
                   <motion.div
                     layoutId={task.id}
                     key={task.id}
                     className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative group hover:shadow-md transition-all"
                   >
                      <div className="flex justify-between items-start mb-3">
                         <h4 className="font-bold text-slate-800 text-sm opacity-70 line-through decoration-slate-300">{task.title}</h4>
                         <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                      </div>
                      <div className="flex justify-between items-center bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                         <span className="text-xs text-emerald-800 font-bold">Natija:</span>
                         <span className="text-lg font-black text-emerald-600">{task.grade || 95}<span className="text-xs font-medium text-emerald-400">/{task.maxGrade}</span></span>
                      </div>
                   </motion.div>
               ))}
             </AnimatePresence>
          </KanbanColumn>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;