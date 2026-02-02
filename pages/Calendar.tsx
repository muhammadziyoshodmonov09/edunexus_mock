import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus, Filter, AlertTriangle, CheckCircle, Gift } from 'lucide-react';
import { EVENTS } from '../services/mockData';
import { CalendarEvent } from '../types';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [filter, setFilter] = useState<'ALL' | 'EXAM' | 'DEADLINE'>('ALL');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 is Sunday

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const filteredEvents = EVENTS.filter(e => filter === 'ALL' || e.type === filter);

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(e => e.date === dateStr);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'EXAM': return 'bg-red-500 shadow-red-500/50';
      case 'DEADLINE': return 'bg-orange-500 shadow-orange-500/50';
      case 'HOLIDAY': return 'bg-emerald-500 shadow-emerald-500/50';
      default: return 'bg-indigo-500 shadow-indigo-500/50';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'EXAM': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'DEADLINE': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'HOLIDAY': return <Gift className="w-4 h-4 text-emerald-600" />;
      default: return <CalendarIcon className="w-4 h-4 text-indigo-600" />;
    }
  };

  // Generate days array
  const days = [];
  // Add empty slots for previous month days
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-slate-50/50 border border-slate-100 rounded-xl m-1 opacity-50"></div>);
  }
  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const events = getEventsForDay(i);
    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString();
    const isSelected = selectedDate?.getDate() === i && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();

    days.push(
      <motion.div 
        key={i}
        whileHover={{ scale: 0.98 }}
        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), i))}
        className={`h-24 md:h-32 border rounded-2xl m-1 p-2 relative cursor-pointer transition-all flex flex-col justify-between ${
          isSelected 
            ? 'bg-indigo-50 border-indigo-500 shadow-md ring-2 ring-indigo-200' 
            : isToday 
              ? 'bg-white border-indigo-200 shadow-sm' 
              : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
        }`}
      >
        <div className="flex justify-between items-start">
          <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-700'}`}>
            {i}
          </span>
          {events.length > 0 && <span className="text-[10px] font-bold bg-slate-100 px-1.5 rounded text-slate-500 hidden md:block">{events.length} ta</span>}
        </div>
        
        <div className="space-y-1 mt-1 overflow-hidden">
          {events.map((ev) => (
            <div key={ev.id} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${getEventColor(ev.type)} shadow-sm`}></div>
              <p className="text-[10px] truncate text-slate-600 font-medium hidden md:block">{ev.title}</p>
            </div>
          ))}
          {/* Mobile dots only */}
          <div className="flex gap-1 md:hidden">
             {events.map(ev => <div key={ev.id} className={`w-1.5 h-1.5 rounded-full ${getEventColor(ev.type)}`}></div>)}
          </div>
        </div>
      </motion.div>
    );
  }

  const monthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
           <h1 className="text-3xl font-black text-slate-900">Taqvim</h1>
           <p className="text-slate-500 font-medium">O'quv jadvallari, imtihonlar va tadbirlarni rejalashtiring.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
           <button onClick={() => setFilter('ALL')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>Barchasi</button>
           <button onClick={() => setFilter('EXAM')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === 'EXAM' ? 'bg-red-500 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>Imtihonlar</button>
           <button onClick={() => setFilter('DEADLINE')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === 'DEADLINE' ? 'bg-orange-500 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>Muddatlar</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Main Calendar Grid */}
        <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col overflow-hidden">
           {/* Calendar Header */}
           <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                 <CalendarIcon className="w-6 h-6 text-indigo-600" />
                 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                 <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-600"><ChevronLeft className="w-5 h-5"/></button>
                 <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 rounded-xl text-sm font-bold text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition-all">Bugun</button>
                 <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-600"><ChevronRight className="w-5 h-5"/></button>
              </div>
           </div>

           {/* Days Header */}
           <div className="grid grid-cols-7 text-center py-3 border-b border-slate-100 bg-white">
              {['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'].map(day => (
                 <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
              ))}
           </div>

           {/* Calendar Body */}
           <div className="flex-1 overflow-y-auto p-2 bg-slate-50">
              <div className="grid grid-cols-7 h-full">
                 {days}
              </div>
           </div>
        </div>

        {/* Sidebar: Selected Day Details */}
        <div className="w-full lg:w-80 bg-white border border-slate-200 rounded-[2rem] shadow-sm p-6 overflow-y-auto">
           <h3 className="font-black text-xl text-slate-900 mb-2">
              {selectedDate ? `${selectedDate.getDate()}-${monthNames[selectedDate.getMonth()]}` : 'Kunni tanlang'}
           </h3>
           <p className="text-slate-500 text-sm mb-6">Rejalashtirilgan tadbirlar</p>

           <div className="space-y-4">
              {selectedDate && getEventsForDay(selectedDate.getDate()).length > 0 ? (
                 getEventsForDay(selectedDate.getDate()).map(ev => (
                    <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       key={ev.id} 
                       className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group"
                    >
                       <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-xl bg-white shadow-sm ${ev.type === 'EXAM' ? 'text-red-500' : 'text-indigo-500'}`}>
                             {getEventIcon(ev.type)}
                          </div>
                          <div>
                             <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{ev.title}</h4>
                             <p className="text-xs text-slate-500">{ev.description}</p>
                             <div className="flex items-center gap-2 mt-2">
                                {ev.time && (
                                   <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {ev.time}
                                   </span>
                                )}
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                   ev.type === 'EXAM' ? 'text-red-600 border-red-200 bg-red-50' : 
                                   ev.type === 'DEADLINE' ? 'text-orange-600 border-orange-200 bg-orange-50' : 
                                   'text-indigo-600 border-indigo-200 bg-indigo-50'
                                }`}>
                                   {ev.type}
                                </span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 ))
              ) : (
                 <div className="text-center py-10 opacity-50">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-medium">Bu kunda tadbirlar yo'q</p>
                 </div>
              )}
              
              <button className="w-full py-3 mt-4 border-2 border-dashed border-indigo-200 rounded-xl text-indigo-500 font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                 <Plus className="w-4 h-4" /> Tadbir Qo'shish
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;