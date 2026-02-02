import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { BrainCircuit, Video, BookOpen, MessageCircle, Save, Plus, GripVertical, Sparkles, Clock, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MODULE_TYPES = [
  { id: 'lecture', label: 'Ma\'ruza', icon: BookOpen, color: 'bg-blue-500', duration: 15 },
  { id: 'video', label: 'Video Material', icon: Video, color: 'bg-red-500', duration: 10 },
  { id: 'activity', label: 'Interaktiv O\'yin', icon: Sparkles, color: 'bg-purple-500', duration: 20 },
  { id: 'discussion', label: 'Munozara', icon: MessageCircle, color: 'bg-emerald-500', duration: 15 },
];

const TeacherSyllabus: React.FC = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const generateWithAI = async () => {
    if (!topic) return;
    setIsAiLoading(true);
    
    try {
      const prompt = `Create a structured lesson plan timeline for the topic: "${topic}". 
      Return a JSON array where each object has: "type" (one of: lecture, video, activity, discussion), "title" (string), "duration" (number in minutes).
      Generate 4-6 items.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const generatedData = JSON.parse(response.text || '[]');
      const formattedItems = generatedData.map((item: any, idx: number) => ({
         id: `ai-${Date.now()}-${idx}`,
         ...item,
         icon: MODULE_TYPES.find(t => t.id === item.type)?.icon || BookOpen,
         color: MODULE_TYPES.find(t => t.id === item.type)?.color || 'bg-slate-500'
      }));

      setItems(formattedItems);
    } catch (e) {
      console.error(e);
      alert("AI xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const addItem = (type: any) => {
    setItems([...items, {
      id: `manual-${Date.now()}`,
      type: type.id,
      title: `Yangi ${type.label}`,
      duration: type.duration,
      icon: type.icon,
      color: type.color
    }]);
  };

  const removeItem = (id: string) => {
     setItems(items.filter(i => i.id !== id));
  };

  const totalDuration = items.reduce((acc, item) => acc + item.duration, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
         <div className="flex items-center gap-4">
            <button onClick={() => navigate('/teacher')} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
               <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div>
               <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <BrainCircuit className="w-8 h-8 text-indigo-600" /> Neural Syllabus Architect
               </h1>
               <p className="text-slate-500 font-medium">Dars rejasini konstruktor kabi yiging.</p>
            </div>
         </div>
         <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
            <Save className="w-5 h-5" /> Saqlash
         </button>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
         {/* Left: Component Toolbox */}
         <div className="w-80 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Modullar</h3>
            <div className="space-y-3">
               {MODULE_TYPES.map(type => (
                  <motion.div 
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     key={type.id}
                     onClick={() => addItem(type)}
                     className="bg-slate-50 border border-slate-200 p-4 rounded-2xl cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-4"
                  >
                     <div className={`w-10 h-10 rounded-xl ${type.color} flex items-center justify-center text-white shadow-sm`}>
                        <type.icon className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="font-bold text-slate-800 text-sm">{type.label}</p>
                        <p className="text-xs text-slate-400 font-medium">{type.duration} daqiqa</p>
                     </div>
                     <Plus className="w-5 h-5 ml-auto text-slate-300" />
                  </motion.div>
               ))}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100">
               <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <h4 className="font-bold mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-300" /> AI Generator</h4>
                  <p className="text-xs text-indigo-100 mb-4 leading-relaxed">Mavzuni kiriting va AI sizga mukammal dars rejasini tuzib beradi.</p>
                  <input 
                     type="text" 
                     placeholder="Mavzu: Kvant Fizikasi..." 
                     className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-sm text-white placeholder-indigo-200 outline-none focus:bg-white/30 mb-3"
                     value={topic}
                     onChange={(e) => setTopic(e.target.value)}
                  />
                  <button 
                     onClick={generateWithAI}
                     disabled={isAiLoading || !topic}
                     className="w-full bg-white text-indigo-600 py-2 rounded-lg text-xs font-black uppercase tracking-wide hover:bg-indigo-50 transition-colors disabled:opacity-70"
                  >
                     {isAiLoading ? 'Yaratilmoqda...' : 'Generatsiya'}
                  </button>
               </div>
            </div>
         </div>

         {/* Right: Canvas / Timeline */}
         <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-inner p-8 overflow-y-auto relative custom-scrollbar flex flex-col">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto w-full">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-slate-900">Vaqt Shkalasi</h2>
                  <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                     <Clock className="w-4 h-4 text-slate-500" />
                     <span className="font-mono font-bold text-slate-700">{totalDuration} daqiqa</span>
                  </div>
               </div>

               {items.length === 0 ? (
                  <div className="h-64 border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center text-slate-400">
                     <BrainCircuit className="w-12 h-12 mb-4 opacity-50" />
                     <p className="font-medium">Chap tarafdan modullarni qo'shing yoki AI dan foydalaning.</p>
                  </div>
               ) : (
                  <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-4">
                     {items.map((item) => (
                        <Reorder.Item key={item.id} value={item}>
                           <motion.div 
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex items-center gap-6 relative group cursor-grab active:cursor-grabbing"
                           >
                              <div className="text-slate-300 cursor-grab">
                                 <GripVertical className="w-6 h-6" />
                              </div>
                              <div className={`w-14 h-14 rounded-2xl ${item.color || 'bg-slate-500'} flex items-center justify-center text-white shadow-md`}>
                                 {/* Icon rendering fallback */}
                                 {item.icon ? <item.icon className="w-7 h-7" /> : <BookOpen className="w-7 h-7"/>}
                              </div>
                              <div className="flex-1">
                                 <input 
                                    className="text-lg font-bold text-slate-900 bg-transparent outline-none w-full"
                                    value={item.title}
                                    onChange={(e) => {
                                       const newItems = items.map(i => i.id === item.id ? {...i, title: e.target.value} : i);
                                       setItems(newItems);
                                    }}
                                 />
                                 <div className="flex items-center gap-4 mt-1">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{item.type}</span>
                                    <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-xs font-medium text-slate-600">
                                       <Clock className="w-3 h-3" />
                                       <input 
                                          type="number" 
                                          className="w-8 bg-transparent outline-none text-center"
                                          value={item.duration}
                                          onChange={(e) => {
                                             const val = parseInt(e.target.value) || 0;
                                             const newItems = items.map(i => i.id === item.id ? {...i, duration: val} : i);
                                             setItems(newItems);
                                          }}
                                       />
                                       min
                                    </div>
                                 </div>
                              </div>
                              <button onClick={() => removeItem(item.id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                 <Trash2 className="w-5 h-5" />
                              </button>
                           </motion.div>
                           {/* Connecting Line */}
                           <div className="h-6 w-0.5 bg-slate-200 mx-auto my-[-4px] last:hidden relative z-0"></div>
                        </Reorder.Item>
                     ))}
                  </Reorder.Group>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default TeacherSyllabus;