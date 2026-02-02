import React, { useState } from 'react';
import { Folder, FileText, MoreVertical, Upload, BrainCircuit, Search, Grid, List, Image, Video, File, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherResources: React.FC = () => {
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST'>('GRID');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);

  const [files, setFiles] = useState([
    { id: 1, name: "Algebra_Asoslari.pdf", type: "PDF", size: "2.4 MB", date: "12 Nov, 2026" },
    { id: 2, name: "Tarix_Prezentatsiya.pptx", type: "PPT", size: "15 MB", date: "10 Nov, 2026" },
    { id: 3, name: "Fizika_Lab_Video.mp4", type: "VIDEO", size: "120 MB", date: "08 Nov, 2026" },
    { id: 4, name: "Imtihon_Savollari.docx", type: "DOC", size: "0.5 MB", date: "05 Nov, 2026" },
    { id: 5, name: "Sinf_Surati.jpg", type: "IMG", size: "4.2 MB", date: "01 Nov, 2026" },
  ]);

  const handleGenerateQuiz = () => {
     setIsGenerating(true);
     setTimeout(() => {
        setIsGenerating(false);
        setGeneratedQuiz([
           { q: "Nyutonning birinchi qonuni nima?", a: ["Inersiya", "Kuch", "Bosim"], correct: 0 },
           { q: "E = mc^2 formulasi kimga tegishli?", a: ["Tesla", "Eynshteyn", "Nyuton"], correct: 1 },
           { q: "Eng kichik zarracha?", a: ["Atom", "Kvark", "Molekula"], correct: 1 },
        ]);
     }, 2000);
  };

  const getFileIcon = (type: string) => {
     switch(type) {
        case 'PDF': return <FileText className="w-8 h-8 text-red-500" />;
        case 'PPT': return <FileText className="w-8 h-8 text-orange-500" />;
        case 'VIDEO': return <Video className="w-8 h-8 text-blue-500" />;
        case 'IMG': return <Image className="w-8 h-8 text-purple-500" />;
        default: return <File className="w-8 h-8 text-slate-500" />;
     }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <h1 className="text-2xl font-black text-slate-900">Resurslar Markazi</h1>
           <p className="text-slate-500 font-medium">Fayllar, metodik qo'llanmalar va AI generator.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setShowAiModal(true)}
             className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-500/30 transition-all active:scale-95"
           >
              <BrainCircuit className="w-5 h-5" />
              <span>AI Quiz Tuzish</span>
           </button>
           <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
              <Upload className="w-5 h-5" />
              <span>Yuklash</span>
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center gap-2 text-sm text-slate-500 font-medium px-2">
            <span className="hover:text-indigo-600 cursor-pointer">Bosh sahifa</span>
            <span>/</span>
            <span className="hover:text-indigo-600 cursor-pointer">10-A Sinf</span>
            <span>/</span>
            <span className="text-slate-900 font-bold">Matematika</span>
         </div>
         <div className="flex gap-2">
            <button onClick={() => setViewMode('GRID')} className={`p-2 rounded-lg transition-colors ${viewMode === 'GRID' ? 'bg-slate-100 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}><Grid className="w-5 h-5" /></button>
            <button onClick={() => setViewMode('LIST')} className={`p-2 rounded-lg transition-colors ${viewMode === 'LIST' ? 'bg-slate-100 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}><List className="w-5 h-5" /></button>
         </div>
      </div>

      {/* File Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200 p-6">
         {viewMode === 'GRID' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
               {/* Folders */}
               {['Dars Ishlanmalari', 'Testlar', 'Qo\'shimcha Adabiyot'].map((folder, i) => (
                  <motion.div 
                     key={`f-${i}`}
                     whileHover={{ scale: 1.02 }}
                     className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-100 transition-colors aspect-square text-center"
                  >
                     <Folder className="w-16 h-16 text-indigo-400 mb-2 fill-indigo-200" />
                     <span className="font-bold text-indigo-900 text-sm leading-tight">{folder}</span>
                     <span className="text-[10px] text-indigo-400 mt-1">12 fayl</span>
                  </motion.div>
               ))}
               
               {/* Files */}
               {files.map((file) => (
                  <motion.div 
                     key={file.id}
                     whileHover={{ y: -5 }}
                     className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col relative group cursor-pointer"
                  >
                     <button className="absolute top-2 right-2 p-1 text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                     </button>
                     <div className="flex-1 flex items-center justify-center py-4">
                        {getFileIcon(file.type)}
                     </div>
                     <div className="mt-2">
                        <p className="font-bold text-slate-800 text-sm truncate" title={file.name}>{file.name}</p>
                        <div className="flex justify-between items-center mt-1 text-[10px] text-slate-400 font-medium">
                           <span>{file.type}</span>
                           <span>{file.size}</span>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         ) : (
            <div className="space-y-2">
               {files.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:shadow-sm transition-all">
                     <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-50 rounded-lg">{getFileIcon(file.type)}</div>
                        <div>
                           <p className="font-bold text-slate-900 text-sm">{file.name}</p>
                           <p className="text-xs text-slate-500">{file.date}</p>
                        </div>
                     </div>
                     <div className="text-sm font-bold text-slate-600">{file.size}</div>
                  </div>
               ))}
            </div>
         )}
      </div>

      {/* AI Quiz Generator Modal */}
      <AnimatePresence>
         {showAiModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl overflow-hidden max-h-[80vh] flex flex-col"
               >
                  <div className="p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white relative">
                     <button onClick={() => setShowAiModal(false)} className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                     <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                           <BrainCircuit className="w-8 h-8" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-black">AI Quiz Generator</h2>
                           <p className="text-indigo-100 text-sm">Sun'iy intellekt yordamida soniyalar ichida testlar tuzing.</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 flex-1 overflow-y-auto">
                     {!generatedQuiz ? (
                        <div className="space-y-6">
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-2">Mavzu yoki Matn</label>
                              <textarea 
                                 value={aiTopic}
                                 onChange={(e) => setAiTopic(e.target.value)}
                                 className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none font-medium"
                                 placeholder="Mavzuni kiriting yoki dars matnini shu yerga tashlang..."
                              ></textarea>
                           </div>
                           <div className="grid grid-cols-3 gap-4">
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                 <span className="block font-bold text-slate-900">5 ta</span>
                                 <span className="text-xs text-slate-500">Savol</span>
                              </div>
                              <div className="bg-indigo-50 p-4 rounded-xl border-2 border-indigo-500 text-center cursor-pointer">
                                 <span className="block font-bold text-indigo-900">10 ta</span>
                                 <span className="text-xs text-indigo-500">Savol</span>
                              </div>
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                 <span className="block font-bold text-slate-900">15 ta</span>
                                 <span className="text-xs text-slate-500">Savol</span>
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className="space-y-4">
                           {generatedQuiz.map((q: any, i: number) => (
                              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                                 <p className="font-bold text-slate-900 mb-3">{i + 1}. {q.q}</p>
                                 <div className="space-y-2">
                                    {q.a.map((opt: string, idx: number) => (
                                       <div key={idx} className={`p-2 rounded-lg text-sm ${idx === q.correct ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-200' : 'bg-white border border-slate-200 text-slate-600'}`}>
                                          {opt}
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>

                  <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                     {!generatedQuiz ? (
                        <button 
                           onClick={handleGenerateQuiz}
                           disabled={isGenerating || !aiTopic}
                           className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                           {isGenerating ? 'Generatsiya qilinmoqda...' : 'Testni Yaratish'}
                           {isGenerating && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        </button>
                     ) : (
                        <div className="flex gap-3 w-full">
                           <button onClick={() => setGeneratedQuiz(null)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100">Qayta</button>
                           <button className="flex-[2] py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg">Saqlash & Ishlatish</button>
                        </div>
                     )}
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherResources;