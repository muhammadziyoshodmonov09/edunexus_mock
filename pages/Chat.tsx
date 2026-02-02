import React, { useState, useEffect, useRef } from 'react';
import { CHAT_CONTACTS, CHAT_MESSAGES } from '../services/mockData';
import { ChatContact, ChatMessage } from '../types';
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, Check, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chat: React.FC = () => {
  const [activeContactId, setActiveContactId] = useState<string>(CHAT_CONTACTS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = CHAT_CONTACTS.find(c => c.id === activeContactId);
  const currentMessages = messages.filter(m => 
    (m.senderId === activeContactId && m.receiverId === 'u1') || 
    (m.senderId === 'u1' && m.receiverId === activeContactId)
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: 'u1', // Assuming current user is u1
      receiverId: activeContactId,
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simulate automated reply
    setTimeout(() => {
       const reply: ChatMessage = {
          id: `m${Date.now() + 1}`,
          senderId: activeContactId,
          receiverId: 'u1',
          content: 'Xabaringizni qabul qildim. Tez orada javob beraman!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false
       };
       setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-100px)] flex gap-6 overflow-hidden">
      {/* Sidebar: Contact List */}
      <div className="w-full md:w-80 lg:w-96 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col overflow-hidden">
         <div className="p-6 border-b border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Xabarlar</h2>
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Qidirish..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20"
               />
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {CHAT_CONTACTS.map(contact => (
               <motion.button
                  key={contact.id}
                  onClick={() => setActiveContactId(contact.id)}
                  whileHover={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                     activeContactId === contact.id 
                        ? 'bg-indigo-600 shadow-lg shadow-indigo-500/30' 
                        : 'hover:bg-slate-50'
                  }`}
               >
                  <div className="relative">
                     <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                     {contact.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                     <div className="flex justify-between items-center mb-0.5">
                        <h4 className={`font-bold truncate ${activeContactId === contact.id ? 'text-white' : 'text-slate-900'}`}>{contact.name}</h4>
                        <span className={`text-[10px] font-medium ${activeContactId === contact.id ? 'text-indigo-200' : 'text-slate-400'}`}>{contact.lastMessageTime}</span>
                     </div>
                     <p className={`text-xs truncate ${activeContactId === contact.id ? 'text-indigo-100' : 'text-slate-500'}`}>{contact.lastMessage}</p>
                  </div>
                  {contact.unreadCount > 0 && (
                     <div className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                        {contact.unreadCount}
                     </div>
                  )}
               </motion.button>
            ))}
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col overflow-hidden relative">
         {/* Chat Header */}
         {activeContact ? (
            <div className="h-20 px-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <img src={activeContact.avatar} className="w-10 h-10 rounded-full object-cover" />
                     {activeContact.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></div>}
                  </div>
                  <div>
                     <h3 className="font-bold text-slate-900">{activeContact.name}</h3>
                     <p className="text-xs text-slate-500 font-medium">{activeContact.role} • {activeContact.isOnline ? 'Online' : 'Offline'}</p>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                     <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                     <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                     <MoreVertical className="w-5 h-5" />
                  </button>
               </div>
            </div>
         ) : (
            <div className="h-full flex items-center justify-center text-slate-400">Chatni boshlash uchun kontakt tanlang</div>
         )}

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
            <AnimatePresence>
               {currentMessages.map((msg) => {
                  const isMe = msg.senderId === 'u1';
                  return (
                     <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                     >
                        <div className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm text-sm font-medium leading-relaxed relative ${
                           isMe 
                              ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-none' 
                              : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                        }`}>
                           {msg.content}
                           <div className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {msg.timestamp}
                              {isMe && (msg.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
                           </div>
                        </div>
                     </motion.div>
                  );
               })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
         </div>

         {/* Input Area */}
         <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-3xl border border-slate-200">
               <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all">
                  <Paperclip className="w-5 h-5" />
               </button>
               <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Xabar yozing..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 placeholder-slate-400 max-h-32 py-2.5"
               />
               <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all">
                  <Smile className="w-5 h-5" />
               </button>
               <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                  <Send className="w-5 h-5" />
               </motion.button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Chat;