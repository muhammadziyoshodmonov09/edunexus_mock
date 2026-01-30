import React, { useState } from 'react';
import { SUBMISSIONS, ASSIGNMENTS } from '../../services/mockData';
import { CheckCircle, XCircle, FileText, Send } from 'lucide-react';

const TeacherGrading: React.FC = () => {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState<number | ''>('');
  const [feedbackInput, setFeedbackInput] = useState('');

  const selectedSubmission = SUBMISSIONS.find(s => s.id === selectedSubmissionId);
  const selectedAssignment = selectedSubmission ? ASSIGNMENTS.find(a => a.id === selectedSubmission.assignmentId) : null;

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* List of Submissions */}
      <div className="w-1/3 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-900">Needs Grading</h2>
          <p className="text-xs text-slate-500">{SUBMISSIONS.filter(s => s.status === 'SUBMITTED').length} pending submissions</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {SUBMISSIONS.map(sub => {
            const assign = ASSIGNMENTS.find(a => a.id === sub.assignmentId);
            return (
              <button
                key={sub.id}
                onClick={() => { 
                   setSelectedSubmissionId(sub.id); 
                   setGradeInput(sub.grade || ''); 
                   setFeedbackInput(sub.feedback || '');
                }}
                className={`w-full text-left p-4 border-b border-slate-100 transition-colors hover:bg-slate-50 ${selectedSubmissionId === sub.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-slate-900">{sub.studentName}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${sub.status === 'GRADED' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                    {sub.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mb-1">{assign?.title}</p>
                <p className="text-[10px] text-slate-400">Submitted: {sub.submittedDate}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grading Workspace */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
        {selectedSubmission && selectedAssignment ? (
          <>
            <div className="p-6 border-b border-slate-200 flex justify-between items-start">
               <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedAssignment.title}</h2>
                  <p className="text-slate-500 text-sm">Student: {selectedSubmission.studentName}</p>
               </div>
               <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">Max Score</div>
                  <div className="text-xl font-bold text-slate-900">{selectedAssignment.maxGrade}</div>
               </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
               <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm min-h-[200px]">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Submission Content
                  </h4>
                  <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{selectedSubmission.content}</p>
                  
                  {/* File Attachment Simulation */}
                  {selectedSubmission.content.includes("PDF") && (
                     <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center font-bold text-xs">PDF</div>
                        <span className="text-sm font-medium text-slate-700 underline cursor-pointer">download_submission.pdf</span>
                     </div>
                  )}
               </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-white">
               <div className="grid grid-cols-3 gap-6">
                 <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Feedback Comments</label>
                    <textarea 
                      className="w-full h-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                      placeholder="Enter feedback for the student..."
                      value={feedbackInput}
                      onChange={(e) => setFeedbackInput(e.target.value)}
                    ></textarea>
                 </div>
                 <div className="col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Grade</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-bold"
                        placeholder="0"
                        value={gradeInput}
                        onChange={(e) => setGradeInput(Number(e.target.value))}
                        max={selectedAssignment.maxGrade}
                      />
                      <span className="text-slate-400 text-sm font-medium">/ {selectedAssignment.maxGrade}</span>
                    </div>
                    <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2">
                       <CheckCircle className="w-4 h-4" /> Post Grade
                    </button>
                 </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
               <CheckCircle className="w-8 h-8 text-slate-300" />
             </div>
             <p>Select a submission to begin grading</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherGrading;
