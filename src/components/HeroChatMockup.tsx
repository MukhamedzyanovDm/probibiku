"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles, Loader2 } from 'lucide-react';
import { cn } from "@/components/ui/utils";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const DIALOGUE: Message[] = [
  { role: "user", content: "Когда в последний раз меняли колодки?" },
  { role: "assistant", content: "Анализирую историю... По записям от 12 мая: колодки заменены 2 300 км назад. Износ был 20%, еще можно поездить." },
  { role: "user", content: "А страховка сколько еще действительна?" },
  { role: "assistant", content: "Проверяю документы... Полис ОСАГО действителен до 23 сентября 2026 г. Напомню за месяц до истечения." },
];

export const HeroChatMockup = () => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMessages, isTyping]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (index < DIALOGUE.length) {
      const currentMsg = DIALOGUE[index];
      
      if (currentMsg.role === "user") {
        timer = setTimeout(() => {
          setVisibleMessages(prev => [...prev, currentMsg]);
          setIndex(prev => prev + 1);
        }, 1000);
      } else {
        setIsTyping(true);
        timer = setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(prev => [...prev, currentMsg]);
          setIndex(prev => prev + 1);
        }, 2000);
      }
    } else {
      timer = setTimeout(() => {
        setVisibleMessages([]);
        setIndex(0);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="relative w-full max-w-[300px] mx-auto group">
      {/* Physical Buttons Simulation */}
      <div className="absolute -left-[2px] top-24 w-[2px] h-10 bg-slate-200 rounded-l-sm border-y border-slate-300" /> {/* Volume Up */}
      <div className="absolute -left-[2px] top-36 w-[2px] h-10 bg-slate-200 rounded-l-sm border-y border-slate-300" /> {/* Volume Down */}
      <div className="absolute -right-[2px] top-28 w-[2px] h-14 bg-slate-200 rounded-r-sm border-y border-slate-300" /> {/* Power Button */}

      {/* Main Device Frame */}
      <div className="relative bg-white rounded-[50px] p-[14px] pb-[16px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15),inset_0_0_20px_rgba(0,0,0,0.03)] ring-1 ring-slate-200 overflow-hidden aspect-[9/19.5] flex flex-col">
        
        {/* Inner Border (Steel effect) */}
        <div className="absolute inset-[4px] rounded-[38px] border-[1px] border-slate-100 pointer-events-none z-10" />

        {/* Screen Content Container */}
        <div className="relative flex-1 bg-white rounded-[32px] overflow-hidden flex flex-col shadow-[inset_0_0_10px_rgba(0,0,0,0.02)] border-[1px] border-slate-100">
          
          {/* Status Bar / Dynamic Island Area */}
          <div className="h-12 w-full relative flex items-center justify-between px-7 z-50">
            {/* Clock */}
            <div className="w-10">
              <span className="text-[11px] font-bold text-slate-900 leading-none">9:41</span>
            </div>
            
            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-900 rounded-full flex items-center justify-center gap-1.5 px-3">
              <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
              <div className="w-8 h-1 bg-slate-800 rounded-full" />
            </div>
            
            {/* Icons */}
            <div className="flex items-center gap-1.5 w-10 justify-end">
              {/* Signal */}
              <div className="flex gap-[1px] items-end h-[8px]">
                <div className="w-[2px] h-[3px] bg-slate-900 rounded-full" />
                <div className="w-[2px] h-[5px] bg-slate-900 rounded-full" />
                <div className="w-[2px] h-[8px] bg-slate-900 rounded-full" />
              </div>
              {/* Battery */}
              <div className="w-[15px] h-[8px] border border-slate-900/20 rounded-[2.5px] p-[1px] relative">
                <div className="w-full h-full bg-slate-900 rounded-[1px]" />
                <div className="absolute -right-[2.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-[3px] bg-slate-900/20 rounded-r-full" />
              </div>
            </div>
          </div>

          {/* Chat Header */}
          <div className="px-5 py-3 border-b border-slate-50 flex items-center gap-3 bg-white/80 backdrop-blur-md sticky top-0 z-40">
            <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center shadow-sm shadow-amber-100 ring-1 ring-amber-100/50">
              <Sparkles className="h-4 w-4 text-amber-500 fill-amber-500/20" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900 leading-none">Пробибику</p>
              <p className="text-[8px] text-green-500 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                AI Assistant
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/30 scrollbar-hide flex flex-col pt-4 scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {visibleMessages.map((msg, i) => (
                <motion.div
                  key={`${i}-${msg.content}`}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className={cn(
                    "flex flex-col max-w-[92%]",
                    msg.role === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-1.5 mb-1.5 px-1",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {msg.role === "assistant" ? "Помощник" : "Вы"}
                    </span>
                  </div>
                  <div className={cn(
                    "p-3.5 rounded-2xl text-[12px] leading-relaxed shadow-sm ring-1 ring-black/5",
                    msg.role === "assistant" 
                      ? "bg-white text-slate-900 rounded-tl-none" 
                      : "bg-slate-900 text-white rounded-tr-none shadow-slate-200"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-2 text-amber-600/60"
                >
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-[10px] font-semibold italic">Ассистент думает...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Placeholder */}
          <div className="p-4 bg-white border-t border-slate-50 mt-auto pb-6">
            <div className="h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center px-4">
              <span className="text-[11px] text-slate-400">Напишите вопрос...</span>
            </div>
            {/* Home Indicator */}
            <div className="w-24 h-1 bg-slate-200 rounded-full mx-auto mt-4" />
          </div>
        </div>

        {/* Screen Gloss/Reflection */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden rounded-[45px]">
          <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-12 transform group-hover:translate-x-10 transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
};
