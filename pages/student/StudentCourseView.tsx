import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES, LESSONS } from '../../services/mockData';
import { PlayCircle, FileText, CheckCircle, ChevronLeft, Check, Award, X, Share2, Sidebar, Maximize2, Edit3, Save, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentCourseView: React.FC = () => {
  const { courseId } = useParams();
  const course = COURSES.find(c => c.id === courseId);
  const courseLessons = LESSONS.filter(l => l.courseId === courseId);
  
  const [activeLesson, setActiveLesson] = useState(courseLessons[0] || null);
  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'resources'>('content');
  const [cinemaMode, setCinemaMode] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [note, setNote] = useState('');

  if (!course) return <div className="p-8 text-center">Course not found</div>;

  const isCourseCompleted = course.progress === 100;

  return (
    <div className={`flex flex-col h-[calc(100vh-80px)] ${cinemaMode ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* Top Navigation (Hidden in Cinema Mode) */}
      {!cinemaMode && (
         <div className="flex items-center justify-between mb-4">
            <Link to="/student/courses" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
               <ChevronLeft className="w-4 h-4" /> Kurslarga qaytish
            </Link>
            <h1 className="font-bold text-slate-900">{course.title}</h1>
            <div className="w-32"></div> {/* Spacer */}
         </div>
      )}

      <div className="flex flex-1 gap-6 overflow-hidden">
         {/* Main Content Area */}
         <div className={`flex-1 flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 ${cinemaMode ? 'rounded-none' : 'border border-slate-200'}`}>
            {/* Video Player Wrapper */}
            <div className={`relative bg-black flex items-center justify-center group ${cinemaMode ? 'h-full' : 'h-[60%]'}`}>
               {activeLesson?.type === 'VIDEO' ? (
                  <video 
                     src={activeLesson.videoUrl} 
                     controls 
                     className="w-full h-full object-contain"
                     poster={course.thumbnail}
                  />
               ) : (
                  <div className="text-white text-center">
                     <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                     <p>Bu matnli dars yoki test</p>
                  </div>
               )}
               
               {/* Cinema Mode Toggle */}
               <button 
                  onClick={() => setCinemaMode(!cinemaMode)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black"
               >
                  {cinemaMode ? <X className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
               </button>
            </div>

            {/* Lesson Tools & Content (Hidden in Cinema Mode) */}
            {!cinemaMode && (
               <div className="flex-1 flex flex-col">
                  <div className="flex border-b border-slate-200 px-6">
                     {['content', 'notes', 'resources'].map((tab) => (
                        <button 
                           key={tab}
                           onClick={() => setActiveTab(tab as any)}
                           className={`px-6 py-4 text-sm font-bold border-b-2 transition-all capitalize ${
                              activeTab === tab 
                                 ? 'border-indigo-600 text-indigo-600' 
                                 : 'border-transparent text-slate-500 hover:text-slate-800'
                           }`}
                        >
                           {tab}
                        </button>
                     ))}
                     <div className="ml-auto flex items-center">
                        {!activeLesson?.isCompleted && (
                           <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 my-2">
                              <Check className="w-3 h-3" /> Yakunlash
                           </button>
                        )}
                     </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
                     {activeTab === 'content' && (
                        <div className="prose prose-indigo max-w-none">
                           <h3 className="text-xl font-bold text-slate-900 mb-2">{activeLesson?.title}</h3>
                           <p className="text-slate-600 leading-relaxed">{activeLesson?.content}</p>
                        </div>
                     )}
                     
                     {activeTab === 'notes' && (
                        <div className="h-full flex flex-col">
                           <textarea 
                              className="flex-1 w-full p-4 bg-white border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 font-medium text-slate-700"
                              placeholder="Dars bo'yicha muhim qaydlar..."
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                           ></textarea>
                           <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
                              <Save className="w-4 h-4" /> Saqlash
                           </button>
                        </div>
                     )}

                     {activeTab === 'resources' && (
                        <div className="space-y-3">
                           {activeLesson?.attachments?.map((file, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-all group cursor-pointer">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold text-xs">PDF</div>
                                    <div>
                                       <p className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{file.name}</p>
                                       <p className="text-xs text-slate-400">2.4 MB</p>
                                    </div>
                                 </div>
                                 <Download className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                              </div>
                           ))}
                           {(!activeLesson?.attachments || activeLesson.attachments.length === 0) && (
                              <div className="text-center py-10 text-slate-400 text-sm font-medium">Fayllar mavjud emas</div>
                           )}
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>

         {/* Sidebar Navigation (Hidden in Cinema Mode) */}
         {!cinemaMode && (
            <div className="w-80 bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-sm">
               <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 mb-1">Darslar Mundarijasi</h3>
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                     <span>{course.completedLessons}/{course.totalLessons} tugatildi</span>
                     <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                     <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
               </div>
               
               <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {courseLessons.map((lesson, idx) => (
                     <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all text-left group ${
                           activeLesson?.id === lesson.id 
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                              : 'hover:bg-slate-50 text-slate-600'
                        }`}
                     >
                        <div className={`mt-0.5 ${activeLesson?.id === lesson.id ? 'text-white' : lesson.isCompleted ? 'text-emerald-500' : 'text-slate-300'}`}>
                           {lesson.isCompleted ? <CheckCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                        </div>
                        <div>
                           <p className={`text-sm font-bold leading-tight mb-1 ${activeLesson?.id === lesson.id ? 'text-white' : 'text-slate-800'}`}>
                              {idx + 1}. {lesson.title}
                           </p>
                           <p className={`text-[10px] font-medium ${activeLesson?.id === lesson.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {lesson.duration} • {lesson.type}
                           </p>
                        </div>
                     </button>
                  ))}
               </div>

               {isCourseCompleted && (
                  <div className="p-4 border-t border-slate-100">
                     <button 
                        onClick={() => setShowCertificate(true)}
                        className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                     >
                        <Award className="w-5 h-5" /> Sertifikatni Olish
                     </button>
                  </div>
               )}
            </div>
         )}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
         {showCertificate && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full relative"
               >
                  <button 
                     onClick={() => setShowCertificate(false)} 
                     className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full z-10"
                  >
                     <X className="w-5 h-5 text-slate-700" />
                  </button>

                  <div className="flex flex-col md:flex-row">
                     {/* Certificate Visual */}
                     <div className="flex-1 p-8 bg-[#fdfbf7] border-r border-slate-200 relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[400px]">
                        <div className="absolute inset-0 border-[16px] border-double border-indigo-900/10 m-4 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-[100px]"></div>
                        
                        <Award className="w-20 h-20 text-yellow-500 mb-6" />
                        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2 uppercase tracking-widest">Sertifikat</h2>
                        <p className="text-slate-500 mb-8 italic">Ushbu sertifikat tasdiqlaydiki</p>
                        
                        <h3 className="text-3xl font-bold text-indigo-900 mb-4 font-serif">Aziza Talaba</h3>
                        
                        <p className="text-slate-600 max-w-sm mx-auto leading-relaxed mb-8">
                           Muvaqqafiyatli ravishda <strong>{course.title}</strong> kursini tamomladi va barcha talablarni bajardi.
                        </p>
                        
                        <div className="flex gap-12 mt-auto pt-8 w-full px-12 justify-between">
                           <div className="text-center">
                              <div className="w-32 h-0.5 bg-slate-400 mb-2"></div>
                              <p className="text-xs font-bold text-slate-500 uppercase">Direktor Imzosi</p>
                           </div>
                           <div className="text-center">
                              <p className="text-xs font-bold text-slate-900 mb-2">25-Nov, 2026</p>
                              <div className="w-32 h-0.5 bg-slate-400 mb-2"></div>
                              <p className="text-xs font-bold text-slate-500 uppercase">Sana</p>
                           </div>
                        </div>
                     </div>

                     {/* Actions */}
                     <div className="w-full md:w-72 bg-slate-50 p-8 flex flex-col justify-center gap-4">
                        <h3 className="font-bold text-lg text-slate-900 mb-2">Tabriklaymiz! 🎉</h3>
                        <p className="text-sm text-slate-500 mb-6">Siz ushbu kursni a'lo baholarga tugatdingiz.</p>
                        
                        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg flex items-center justify-center gap-2">
                           <Download className="w-4 h-4" /> PDF Yuklash
                        </button>
                        <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 flex items-center justify-center gap-2">
                           <Share2 className="w-4 h-4" /> Ulashish
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default StudentCourseView;