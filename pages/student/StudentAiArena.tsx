import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Send, User, Bot, Sparkles, Flame, Swords, ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OPPONENTS = [
  { 
    id: 'einstein', 
    name: 'Albert Einstein', 
    role: 'Fizika Dahosi', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
    color: 'from-orange-500 to-amber-600',
    prompt: "You are Albert Einstein. Explain complex physics concepts simply, use humor, and speak with a slight German sentence structure style. You encourage curiosity."
  },
  { 
    id: 'navoi', 
    name: 'Alisher Navoiy', 
    role: 'Buyuk Mutafakkir', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Alisher_Navoi.jpg/800px-Alisher_Navoi.jpg', // Placeholder
    color: 'from-emerald-600 to-teal-700',
    prompt: "Siz Alisher Navoiysiz. O'zbek tilida, lutf bilan, hikmatli so'zlar va she'riy uslubda gapiring. Adabiyot, insoniylik va ilm haqida suhbatlashing."
  },
  { 
    id: 'jobs', 
    name: 'Steve Jobs', 
    role: 'Innovator', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
    color: 'from-slate-700 to-black',
    prompt: "You are Steve Jobs. Be direct, visionary, slightly arrogant but inspiring. Focus on design, simplicity, and 'thinking different'."
  }
];

const StudentAiArena: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOpponent, setSelectedOpponent] = useState<typeof OPPONENTS[0] | null>(null);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedOpponent) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Construct history for context
      const chatHistory = messages.map(m => ({
         role: m.role,
         parts: [{ text: m.text }]
      }));

      const model = selectedOpponent.id === 'jobs' ? 'gemini-3-flash-preview' : 'gemini-3-flash-preview'; // Use flash for speed

      const response = await ai.models.generateContent({
        model: model,
        contents: [
           ...chatHistory,
           { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
           systemInstruction: selectedOpponent.prompt,
        }
      });

      const aiText = response.text || "Uzr, aloqa uzildi.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Tizimda xatolik yuz berdi. Qayta urinib ko'ring." }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 relative overflow-hidden flex flex-col">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-6">
         <button onClick={() => selectedOpponent ? setSelectedOpponent(null) : navigate('/student')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> {selectedOpponent ? 'Raqibni o\'zgartirish' : 'Chiqish'}
         </button>
         <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 font-black tracking-widest uppercase text-sm animate-pulse">
            <Swords className="w-4 h-4" /> AI Debate Arena
         </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedOpponent ? (
           /* --- SELECTION SCREEN --- */
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.1 }}
             className="flex-1 flex flex-col items-center justify-center relative z-10"
           >
              <h1 className="text-4xl md:text-6xl font-black text-center mb-12 tracking-tighter drop-shadow-2xl">
                 RAQIBNI <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">TANLANG</span>
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                 {OPPONENTS.map((opp) => (
                    <motion.div 
                       key={opp.id}
                       whileHover={{ scale: 1.05, y: -10 }}
                       onClick={() => setSelectedOpponent(opp)}
                       className={`relative h-96 rounded-[2rem] overflow-hidden cursor-pointer group border-4 border-transparent hover:border-white/50 transition-all shadow-2xl`}
                    >
                       <div className={`absolute inset-0 bg-gradient-to-b ${opp.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                       <img src={opp.image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-500" />
                       
                       <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                          <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">{opp.role}</p>
                          <h3 className="text-3xl font-black text-white italic">{opp.name}</h3>
                       </div>

                       {/* Vs Badge */}
                       <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Swords className="w-6 h-6 text-white" />
                       </div>
                    </motion.div>
                 ))}
              </div>
           </motion.div>
        ) : (
           /* --- BATTLE/CHAT SCREEN --- */
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex-1 flex flex-col max-w-5xl mx-auto w-full bg-slate-800/50 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden relative shadow-2xl"
           >
              {/* Arena Header */}
              <div className={`p-6 bg-gradient-to-r ${selectedOpponent.color} flex items-center justify-between shadow-lg relative overflow-hidden`}>
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-sm p-1 border border-white/20">
                       <img src={selectedOpponent.image} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-white">{selectedOpponent.name}</h2>
                       <p className="text-white/80 text-sm font-medium flex items-center gap-2"><Sparkles className="w-3 h-3" /> {selectedOpponent.role}</p>
                    </div>
                 </div>
                 <div className="text-6xl font-black text-white/10 absolute right-4 -bottom-4 italic select-none">VS</div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/20">
                 {messages.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                       <Swords className="w-16 h-16 mx-auto mb-4 text-white/20" />
                       <p className="text-lg font-bold">Bahsni boshlang!</p>
                       <p className="text-sm">"{selectedOpponent.name}" sizning savolingizni kutmoqda.</p>
                    </div>
                 )}
                 {messages.map((msg, idx) => (
                    <motion.div 
                       initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       key={idx} 
                       className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                       <div className={`max-w-[80%] p-4 rounded-2xl ${
                          msg.role === 'user' 
                             ? 'bg-blue-600 text-white rounded-br-none' 
                             : 'bg-white/10 text-slate-100 border border-white/10 rounded-bl-none'
                       }`}>
                          <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] font-bold uppercase tracking-wider">
                             {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                             {msg.role === 'user' ? 'Siz' : selectedOpponent.name}
                          </div>
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                       </div>
                    </motion.div>
                 ))}
                 {isLoading && (
                    <div className="flex justify-start">
                       <div className="bg-white/5 p-4 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                          <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200"></div>
                       </div>
                    </div>
                 )}
                 <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-slate-900 border-t border-white/10">
                 <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-2xl border border-white/10 focus-within:border-blue-500/50 transition-colors">
                    <input 
                       type="text" 
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                       placeholder="Savolingizni yoki fikringizni yozing..."
                       className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 px-4 font-medium"
                       autoFocus
                    />
                    <button 
                       onClick={handleSendMessage}
                       disabled={isLoading || !input.trim()}
                       className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       <Send className="w-5 h-5" />
                    </button>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentAiArena;