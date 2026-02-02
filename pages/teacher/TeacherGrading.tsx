import React, { useState, useEffect } from 'react';
import { SUBMISSIONS, ASSIGNMENTS } from '../../services/mockData';
import { CheckCircle, XCircle, FileText, Send, Sparkles, Sliders, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherGrading: React.FC = () => {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState<number | ''>('');
  const [feedbackInput, setFeedbackInput] = useState('');
  
  // AI & Rubric State
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [rubricScores, setRubricScores] = useState({
     content: 0, // Max 40%
     grammar: 0, // Max 30%
     creativity: 0 // Max 30%
  });

  const selectedSubmission = SUBMISSIONS.find(s => s.id === selectedSubmissionId);
  const selectedAssignment = selectedSubmission ? ASSIGNMENTS.find(a => a.id === selectedSubmission.assignmentId) : null;

  // Auto-calculate total grade when rubric changes
  useEffect(() => {
     if (!selectedAssignment) return;
     const max = selectedAssignment.maxGrade || 100;
     const totalPercent = rubricScores.content + rubricScores.grammar + rubricScores.creativity; // Sum of percentages (0-100)
     const calculatedGrade = Math.round((totalPercent / 100) * max);
     setGradeInput(calculatedGrade);
  }, [rubricScores, selectedAssignment]);

  const generateAiFeedback = () => {
     setIsAiGenerating(true);
     // Simulate AI latency
     setTimeout(() => {
        setIsAiGenerating(false);
        setFeedbackInput(
           `Hurmatli ${selectedSubmission?.studentName}, 
           
Sizning ishingiz mavzuni yaxshi yoritib bergan. Ayniqsa, keltirilgan misollar juda o'rinli. 
Biroq, grammatik qoidalarga biroz ko'proq e'tibor qaratishingizni tavsiya qilaman. Ijodiy yondashuv uchun rahmat!
           
Tavsiya: Keyingi safar xulosa qismini kengroq yozing.`
        );
        // Auto-set rubric roughly based on "analysis"
        setRubricScores({ content: 35, grammar: 20, creativity: 25 });
     }, 1500);
  };

  const updateRubric = (key: keyof typeof rubricScores, val: number) => {
     setRubricScores(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* List of Submissions */}
      <div className="w-1/3 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-900">Baholash Kutayotganlar</h2>
          <p className="text-xs text-slate-500">{SUBMISSIONS.filter(s => s.status === 'SUBMITTED').length} ta ish</p>
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
                   setRubricScores({ content: 0, grammar: 0, creativity: 0 }); // Reset rubric
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
                <p className="text-[10px] text-slate-400">Topshirildi: {sub.submittedDate}</p>
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
                  <p className="text-slate-500 text-sm">Talaba: {selectedSubmission.studentName}</p>
               </div>
               <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">Max Ball</div>
                  <div className="text-xl font-bold text-slate-900">{selectedAssignment.maxGrade}</div>
               </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
               {/* Left: Content */}
               <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50 border-r border-slate-200">
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                       <FileText className="w-4 h-4" /> Topshiriq Mazmuni
                     </h4>
                     <p className="text-slate-800 whitespace-pre-wrap leading-relaxed font-serif text-lg">{selectedSubmission.content}</p>
                     
                     {/* File Attachment Simulation */}
                     {selectedSubmission.content.includes("PDF") && (
                        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                           <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center font-bold text-xs">PDF</div>
                           <span className="text-sm font-medium text-slate-700 underline cursor-pointer">download_submission.pdf</span>
                        </div>
                     )}
                  </div>
               </div>

               {/* Right: Grading Tools */}
               <div className="w-80 p-6 bg-white overflow-y-auto">
                  <div className="mb-6">
                     <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                           <Sliders className="w-4 h-4 text-indigo-600" /> Mezonlar (Rubrika)
                        </label>
                     </div>
                     
                     <div className="space-y-6">
                        <div>
                           <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium text-slate-600">Mazmun (40%)</span>
                              <span className="font-bold text-indigo-600">{rubricScores.content}%</span>
                           </div>
                           <input 
                              type="range" min="0" max="40" value={rubricScores.content} 
                              onChange={(e) => updateRubric('content', Number(e.target.value))}
                              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                           />
                        </div>
                        <div>
                           <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium text-slate-600">Grammatika (30%)</span>
                              <span className="font-bold text-indigo-600">{rubricScores.grammar}%</span>
                           </div>
                           <input 
                              type="range" min="0" max="30" value={rubricScores.grammar} 
                              onChange={(e) => updateRubric('grammar', Number(e.target.value))}
                              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                           />
                        </div>
                        <div>
                           <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium text-slate-600">Ijodkorlik (30%)</span>
                              <span className="font-bold text-indigo-600">{rubricScores.creativity}%</span>
                           </div>
                           <input 
                              type="range" min="0" max="30" value={rubricScores.creativity} 
                              onChange={(e) => updateRubric('creativity', Number(e.target.value))}
                              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="mb-6 pt-6 border-t border-slate-100">
                     <label className="block text-sm font-bold text-slate-900 mb-2">Yakuniy Ball</label>
                     <div className="flex items-center gap-2">
                        <input 
                           type="number" 
                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-2xl font-black text-slate-900 text-center"
                           placeholder="0"
                           value={gradeInput}
                           onChange={(e) => setGradeInput(Number(e.target.value))}
                           max={selectedAssignment.maxGrade}
                        />
                        <span className="text-slate-400 text-sm font-medium">/ {selectedAssignment.maxGrade}</span>
                     </div>
                  </div>

                  <div className="mb-6 pt-6 border-t border-slate-100">
                     <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-slate-900">Izoh</label>
                        <button 
                           onClick={generateAiFeedback}
                           disabled={isAiGenerating}
                           className="text-xs flex items-center gap-1 text-purple-600 font-bold hover:bg-purple-50 px-2 py-1 rounded transition-colors"
                        >
                           <Sparkles className="w-3 h-3" /> AI Yozsin
                        </button>
                     </div>
                     <div className="relative">
                        <textarea 
                           className="w-full h-32 px-3 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none text-sm leading-relaxed"
                           placeholder="Talabaga fikr bildiring..."
                           value={feedbackInput}
                           onChange={(e) => setFeedbackInput(e.target.value)}
                        ></textarea>
                        {isAiGenerating && (
                           <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                              <div className="flex flex-col items-center">
                                 <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                                 <span className="text-xs font-bold text-purple-600 animate-pulse">Tahlil qilinmoqda...</span>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  <button className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                     <CheckCircle className="w-5 h-5" /> Bahoni Tasdiqlash
                  </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
               <CheckCircle className="w-10 h-10 text-slate-300" />
             </div>
             <p className="font-medium">Baholash uchun ishni tanlang</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherGrading;