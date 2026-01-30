import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COURSES, LESSONS, ASSIGNMENTS } from '../../services/mockData';
import { 
  ChevronLeft, Plus, PlayCircle, FileText, CheckCircle, 
  Trash2, Edit, Upload, Settings, Users, Calendar 
} from 'lucide-react';

const TeacherCourseManager: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);
  const [activeTab, setActiveTab] = useState<'lessons' | 'assignments' | 'students'>('lessons');
  const [isEditingLesson, setIsEditingLesson] = useState(false);

  // Mock filtered data
  const lessons = LESSONS.filter(l => l.courseId === courseId);
  const assignments = ASSIGNMENTS.filter(a => a.courseId === courseId);

  if (!course) return <div className="p-8">Course not found</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <button onClick={() => navigate('/teacher/courses')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 mb-2">
            <ChevronLeft className="w-4 h-4" /> Back to Courses
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
          <p className="text-slate-500">Manage curriculum, content, and assessments.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 flex items-center gap-2">
             <Settings className="w-4 h-4" /> Settings
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-sm">
             Publish Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('lessons')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'lessons' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Lessons & Content
        </button>
        <button 
          onClick={() => setActiveTab('assignments')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'assignments' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Assignments & Quizzes
        </button>
        <button 
          onClick={() => setActiveTab('students')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'students' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Students
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-900">Curriculum</h3>
               <button onClick={() => setIsEditingLesson(true)} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100">
                 <Plus className="w-4 h-4" /> Add Lesson
               </button>
            </div>

            <div className="space-y-3">
              {lessons.map((lesson, idx) => (
                <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="text-slate-400 font-mono text-sm w-6">{(idx + 1).toString().padStart(2, '0')}</div>
                  <div className="p-2 bg-slate-100 rounded text-slate-600">
                    {lesson.type === 'VIDEO' && <PlayCircle className="w-5 h-5" />}
                    {lesson.type === 'TEXT' && <FileText className="w-5 h-5" />}
                    {lesson.type === 'QUIZ' && <CheckCircle className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{lesson.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                       <span>{lesson.duration || 'No duration'}</span>
                       <span>•</span>
                       <span className={lesson.isCompleted ? 'text-emerald-600' : 'text-slate-400'}>
                         {lesson.type}
                       </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {lessons.length === 0 && <p className="text-slate-500 text-center py-8">No lessons yet. Click "Add Lesson" to start.</p>}
            </div>

            {/* Simple Add Lesson Modal Simulation */}
            {isEditingLesson && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                  <div className="p-5 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">Create New Lesson</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Lesson Title</label>
                      <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Intro to Algebra" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Lesson Type</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="VIDEO">Video Lesson</option>
                        <option value="TEXT">Text / Reading</option>
                        <option value="QUIZ">Quiz / Assessment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Content URL or Text</label>
                      <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24" placeholder="Paste video URL or type lesson content here..."></textarea>
                    </div>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-indigo-300 cursor-pointer">
                       <Upload className="w-6 h-6 mb-2" />
                       <span className="text-xs">Upload Documents (PDF, DOCX)</span>
                    </div>
                  </div>
                  <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                    <button onClick={() => setIsEditingLesson(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">Cancel</button>
                    <button onClick={() => setIsEditingLesson(false)} className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Save Lesson</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-lg font-bold text-slate-900">Assignments</h3>
               <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100">
                 <Plus className="w-4 h-4" /> Create Assignment
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map(assign => (
                <div key={assign.id} className="p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-slate-900">{assign.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${assign.status === 'PENDING' ? 'bg-orange-50 border-orange-100 text-orange-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
                      {assign.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{assign.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                     <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Due: {assign.dueDate}</span>
                     <span className="font-semibold">Max Score: {assign.maxGrade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
           <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
             <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                 <tr>
                   <th className="px-6 py-4 font-medium">Student Name</th>
                   <th className="px-6 py-4 font-medium">Email</th>
                   <th className="px-6 py-4 font-medium">Progress</th>
                   <th className="px-6 py-4 font-medium">Last Active</th>
                   <th className="px-6 py-4 font-medium text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {[1,2,3,4,5].map(i => (
                   <tr key={i} className="hover:bg-slate-50">
                     <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                         S{i}
                       </div>
                       Student {i}
                     </td>
                     <td className="px-6 py-4 text-slate-500">student{i}@school.edu</td>
                     <td className="px-6 py-4">
                       <div className="w-24 bg-slate-200 rounded-full h-1.5">
                         <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-slate-500">2 hours ago</td>
                     <td className="px-6 py-4 text-right">
                       <button className="text-indigo-600 hover:underline">View Profile</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourseManager;
