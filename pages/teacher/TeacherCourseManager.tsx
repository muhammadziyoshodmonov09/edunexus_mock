import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COURSES, LESSONS, ASSIGNMENTS } from '../../services/mockData';
import { 
  ChevronLeft, Plus, PlayCircle, FileText, CheckCircle, 
  Trash2, Edit, Upload, Settings, Users, Calendar, Video, Book, HelpCircle, X, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherCourseManager: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);
  const [activeTab, setActiveTab] = useState<'lessons' | 'assignments' | 'students'>('lessons');
  
  // Local State for Real-Time Updates simulation
  const [localLessons, setLocalLessons] = useState(LESSONS.filter(l => l.courseId === courseId));
  const [isEditingLesson, setIsEditingLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: '',
    type: 'VIDEO',
    content: '',
    duration: ''
  });

  if (!course) return <div className="p-8">Course not found</div>;

  const handleAddLesson = () => {
    if (!newLesson.title) return;
    
    const createdLesson = {
      id: `l${Date.now()}`,
      courseId: courseId!,
      title: newLesson.title,
      type: newLesson.type as any,
      content: newLesson.content,
      duration: newLesson.duration || '10 min',
      isCompleted: false
    };

    setLocalLessons([...localLessons, createdLesson]);
    setIsEditingLesson(false);
    setNewLesson({ title: '', type: 'VIDEO', content: '', duration: '' });
  };

  const handleDeleteLesson = (id: string) => {
     if(confirm("Darsni o'chirib tashlamoqchimisiz?")) {
        setLocalLessons(localLessons.filter(l => l.id !== id));
     }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 bg-white/50 p-6 rounded-[2rem] backdrop-blur-sm">
        <div>
          <button onClick={() => navigate('/teacher/courses')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 mb-2 font-bold transition-colors">
            <ChevronLeft className="w-4 h-4" /> Barcha Kurslar
          </button>
          <h1 className="text-3xl font-black text-slate-900">{course.title}</h1>
          <p className="text-slate-500 font-medium">O'quv dasturi, kontent va baholashni boshqaring.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50 flex items-center gap-2 transition-all">
             <Settings className="w-4 h-4" /> Sozlamalar
          </button>
          <button className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all">
             Nashr Qilish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl inline-flex">
        <button 
          onClick={() => setActiveTab('lessons')}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'lessons' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Darslar & Kontent
        </button>
        <button 
          onClick={() => setActiveTab('assignments')}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'assignments' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Vazifalar & Testlar
        </button>
        <button 
          onClick={() => setActiveTab('students')}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'students' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Talabalar
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
               <h3 className="text-lg font-bold text-indigo-900 pl-2">O'quv Dasturi</h3>
               <button onClick={() => setIsEditingLesson(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-md transition-all active:scale-95">
                 <Plus className="w-4 h-4" /> Dars Qo'shish
               </button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
              {localLessons.map((lesson, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={lesson.id} 
                  className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-md hover:border-indigo-300 transition-all group"
                >
                  <div className="text-slate-400 font-mono text-sm w-8 font-bold opacity-50">{(idx + 1).toString().padStart(2, '0')}</div>
                  <div className={`p-3 rounded-xl flex items-center justify-center ${
                     lesson.type === 'VIDEO' ? 'bg-blue-50 text-blue-600' :
                     lesson.type === 'TEXT' ? 'bg-orange-50 text-orange-600' :
                     'bg-purple-50 text-purple-600'
                  }`}>
                    {lesson.type === 'VIDEO' && <Video className="w-6 h-6" />}
                    {lesson.type === 'TEXT' && <Book className="w-6 h-6" />}
                    {lesson.type === 'QUIZ' && <HelpCircle className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-lg">{lesson.title}</h4>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mt-1">
                       <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration || 'Belgilanmagan'}</span>
                       <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                       <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide ${
                          lesson.type === 'VIDEO' ? 'bg-blue-100 text-blue-700' : 
                          lesson.type === 'QUIZ' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                       }`}>
                         {lesson.type}
                       </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => handleDeleteLesson(lesson.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </motion.div>
              ))}
              </AnimatePresence>
              {localLessons.length === 0 && (
                 <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
                    <Book className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold mb-2">Darslar mavjud emas</p>
                    <p className="text-sm text-slate-400">Yangi dars qo'shish uchun yuqoridagi tugmani bosing.</p>
                 </div>
              )}
            </div>

            {/* Premium Add Lesson Modal */}
            <AnimatePresence>
            {isEditingLesson && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20"
                >
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
                    <h3 className="text-xl font-black text-slate-900">Yangi Dars Yaratish</h3>
                    <button onClick={() => setIsEditingLesson(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                       <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Dars Mavzusi</label>
                      <input 
                        type="text" 
                        value={newLesson.title}
                        onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:font-normal" 
                        placeholder="Masalan: Algebra asoslari" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Turi</label>
                         <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                            {['VIDEO', 'TEXT', 'QUIZ'].map((type) => (
                               <button 
                                 key={type}
                                 onClick={() => setNewLesson({...newLesson, type})}
                                 className={`py-2 rounded-lg text-xs font-bold transition-all ${newLesson.type === type ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                               >
                                  {type}
                               </button>
                            ))}
                         </div>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Davomiyligi</label>
                          <input 
                             type="text" 
                             value={newLesson.duration}
                             onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
                             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                             placeholder="masalan: 15 daqiqa"
                          />
                       </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Kontent / URL</label>
                      <textarea 
                        value={newLesson.content}
                        onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none" 
                        placeholder="Video havolasini yoki dars matnini shu yerga yozing..."
                      ></textarea>
                    </div>

                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-500 cursor-pointer transition-all bg-slate-50/50">
                       <Upload className="w-8 h-8 mb-2" />
                       <span className="text-sm font-bold">Fayllarni yuklash (PDF, DOCX)</span>
                       <span className="text-xs opacity-70 mt-1">yoki shu yerga tashlang</span>
                    </div>
                  </div>

                  <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button onClick={() => setIsEditingLesson(false)} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors">Bekor qilish</button>
                    <button onClick={handleAddLesson} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all">
                       Saqlash
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            </AnimatePresence>
          </div>
        )}

        {/* Assignments Tab Placeholder */}
        {activeTab === 'assignments' && (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-slate-200">
             <Calendar className="w-16 h-16 mx-auto text-slate-300 mb-4" />
             <h3 className="text-xl font-bold text-slate-700">Vazifalar Bo'limi</h3>
             <p className="text-slate-500">Bu qism tez orada ishga tushadi.</p>
          </div>
        )}

        {/* Students Tab Placeholder */}
        {activeTab === 'students' && (
           <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-slate-200">
             <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
             <h3 className="text-xl font-bold text-slate-700">Talabalar Ro'yxati</h3>
             <p className="text-slate-500">Bu qism tez orada ishga tushadi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourseManager;