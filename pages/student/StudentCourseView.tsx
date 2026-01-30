import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES, LESSONS } from '../../services/mockData';
import { PlayCircle, FileText, CheckCircle, Download, ChevronLeft, Check, Lock } from 'lucide-react';

const StudentCourseView: React.FC = () => {
  const { courseId } = useParams();
  const course = COURSES.find(c => c.id === courseId);
  const courseLessons = LESSONS.filter(l => l.courseId === courseId);
  
  const [activeLesson, setActiveLesson] = useState(courseLessons[0] || null);
  const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'quiz'>('content');

  if (!course) return <div className="p-8 text-center">Course not found</div>;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6">
      {/* Sidebar: Lesson Navigation */}
      <div className="w-full lg:w-80 flex-shrink-0 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <Link to="/student/courses" className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-3">
            <ChevronLeft className="w-4 h-4" /> Back to Courses
          </Link>
          <h2 className="font-bold text-slate-900 truncate" title={course.title}>{course.title}</h2>
          <div className="mt-2 text-xs text-slate-500 font-medium">
             {course.completedLessons} / {course.totalLessons} Lessons Completed
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
             <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {courseLessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => { setActiveLesson(lesson); setActiveTab(lesson.type === 'QUIZ' ? 'quiz' : 'content'); }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                activeLesson?.id === lesson.id 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                  : 'hover:bg-slate-50 text-slate-700 border border-transparent'
              }`}
            >
              <div className="flex-shrink-0">
                 {lesson.isCompleted ? (
                   <CheckCircle className="w-5 h-5 text-emerald-500" />
                 ) : lesson.type === 'VIDEO' ? (
                   <PlayCircle className={`w-5 h-5 ${activeLesson?.id === lesson.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                 ) : lesson.type === 'QUIZ' ? (
                   <CheckCircle className={`w-5 h-5 ${activeLesson?.id === lesson.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                 ) : (
                   <FileText className={`w-5 h-5 ${activeLesson?.id === lesson.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                 )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{idx + 1}. {lesson.title}</p>
                <p className="text-xs opacity-70 truncate">{lesson.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {activeLesson ? (
          <>
            {/* Top Toolbar */}
            <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
              <h1 className="font-bold text-slate-900 truncate">{activeLesson.title}</h1>
              <div className="flex items-center gap-3">
                 {!activeLesson.isCompleted && (
                   <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">
                     <Check className="w-4 h-4" /> Mark Complete
                   </button>
                 )}
              </div>
            </div>

            {/* Content Display */}
            <div className="flex-1 overflow-y-auto bg-slate-50">
               {activeLesson.type === 'VIDEO' && (
                 <div className="w-full bg-black aspect-video relative">
                    <video 
                      src={activeLesson.videoUrl} 
                      controls 
                      className="w-full h-full"
                      poster={course.thumbnail}
                    />
                 </div>
               )}

               <div className="max-w-4xl mx-auto p-8">
                 {/* Tabs */}
                 <div className="flex border-b border-slate-200 mb-6">
                    <button 
                      onClick={() => setActiveTab('content')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                      Lesson Content
                    </button>
                    {activeLesson.attachments && activeLesson.attachments.length > 0 && (
                      <button 
                        onClick={() => setActiveTab('resources')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'resources' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                      >
                        Resources
                      </button>
                    )}
                    {activeLesson.type === 'QUIZ' && (
                       <button 
                       onClick={() => setActiveTab('quiz')}
                       className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'quiz' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                     >
                       Take Quiz
                     </button>
                    )}
                 </div>

                 {activeTab === 'content' && (
                   <div className="prose prose-indigo max-w-none">
                     <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
                     <p className="text-slate-700 whitespace-pre-wrap">{activeLesson.content}</p>
                   </div>
                 )}

                 {activeTab === 'resources' && (
                   <div className="space-y-3">
                     <h3 className="text-lg font-bold text-slate-900 mb-4">Downloadable Materials</h3>
                     {activeLesson.attachments?.map((file, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 font-bold text-xs">
                               {file.type}
                            </div>
                            <div>
                               <p className="font-medium text-slate-900">{file.name}</p>
                               <p className="text-xs text-slate-500">2.4 MB</p>
                            </div>
                         </div>
                         <button className="p-2 text-slate-400 hover:text-indigo-600">
                           <Download className="w-5 h-5" />
                         </button>
                       </div>
                     ))}
                   </div>
                 )}
                 
                 {activeTab === 'quiz' && (
                    <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                           <CheckCircle className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{activeLesson.title}</h3>
                        <p className="text-slate-500 mb-6">{activeLesson.content}</p>
                        <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                           Start Quiz
                        </button>
                    </div>
                 )}
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Lock className="w-12 h-12 mb-4 opacity-50" />
            <p>Select a lesson to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourseView;
