import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, MoreHorizontal, Maximize2, Minimize2, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AiVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'MINI' | 'FULL'>('MINI');
  const [transcript, setTranscript] = useState("Salom! Men EduNexus AI yordamchisiman. Menga savol bering.");
  
  // Audio Visualizer Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number>(0);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      setIsListening(true);
      setTranscript("Eshitmoqdaman...");
      drawVisualizer();

      // Simulate recording duration then send to AI (Mock logic for demo)
      setTimeout(() => {
        stopListening();
        processQuery();
      }, 4000);

    } catch (err) {
      console.error("Microphone access denied or error:", err);
      // Fallback to Simulation Mode for Demo purposes
      setIsListening(true);
      setTranscript("Mikrofon ishlamadi (Demo rejim)...");
      simulateVisualizer(); // Use simulated visualizer
      
      setTimeout(() => {
        stopListening();
        processQuery();
      }, 3000);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    // Stop all tracks to release microphone
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current) return;
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 30;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#4f46e5';
      ctx.fill();

      // Draw frequency bars in a circle
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 4;
        const angle = (i * 2 * Math.PI) / bufferLength;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        ctx.strokeStyle = `rgba(99, 102, 241, ${barHeight / 50})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };

    draw();
  };

  const simulateVisualizer = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = 64; // Simulated bin count

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 30;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#4f46e5';
      ctx.fill();

      for (let i = 0; i < bufferLength; i++) {
        // Generate random heights for simulation
        const val = Math.random() * 100;
        const barHeight = val / 3;
        const angle = (i * 2 * Math.PI) / bufferLength;
        
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        ctx.strokeStyle = `rgba(99, 102, 241, ${Math.max(0.2, barHeight / 30)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };

    draw();
  };

  const processQuery = async () => {
    setIsProcessing(true);
    setTranscript("O'ylayapman...");
    
    try {
       const prompt = "The student asked a question about physics. Give a short, encouraging answer in Uzbek.";
       const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt
       });
       
       setTranscript(response.text || "Javob topilmadi.");
    } catch (e) {
       console.error(e);
       setTranscript("Aloqa uzildi. Qayta urinib ko'ring.");
    } finally {
       setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform group"
          >
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-20"></div>
            <Zap className="w-8 h-8 fill-current" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Assistant Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
               opacity: 1, 
               y: 0, 
               scale: 1,
               width: mode === 'FULL' ? '100%' : '384px',
               height: mode === 'FULL' ? '100%' : 'auto',
               borderRadius: mode === 'FULL' ? '0px' : '24px',
               bottom: mode === 'FULL' ? 0 : 32,
               right: mode === 'FULL' ? 0 : 32
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bg-slate-900/95 backdrop-blur-xl text-white shadow-2xl border border-white/10 z-50 overflow-hidden flex flex-col ${mode === 'FULL' ? 'inset-0' : 'w-96'}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="font-bold text-sm tracking-widest">GEMINI LIVE</span>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => setMode(mode === 'MINI' ? 'FULL' : 'MINI')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                     {mode === 'MINI' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors">
                     <X className="w-4 h-4" />
                  </button>
               </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
               {/* Visualizer Circle */}
               <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  <canvas ref={canvasRef} width="200" height="200" className="absolute inset-0 z-0" />
                  
                  <motion.button
                     whileTap={{ scale: 0.9 }}
                     onClick={isListening ? stopListening : startListening}
                     className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                        isListening ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 
                        isProcessing ? 'bg-yellow-500 animate-pulse' :
                        'bg-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:bg-indigo-500'
                     }`}
                  >
                     <Mic className="w-10 h-10 text-white" />
                  </motion.button>
                  
                  {/* Ripples */}
                  {isListening && (
                     <>
                        <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-ping delay-150"></div>
                     </>
                  )}
               </div>

               {/* Transcript */}
               <div className="text-center max-w-xs">
                  <p className={`text-lg font-medium leading-relaxed ${isProcessing ? 'animate-pulse text-slate-400' : 'text-slate-200'}`}>
                     "{transcript}"
                  </p>
               </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-black/20 text-center">
               <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Hold to speak • Powered by Google Gemini
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiVoiceAssistant;