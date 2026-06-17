"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Play } from 'lucide-react';

export function VideoDemoSection() {
  return (
    <section className="relative w-full py-24 bg-[#f8fafc] overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-[#c89f87] bg-white rounded-full border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Магия OCR</span>
            </div>

            <h2 className="text-[32px] md:text-5xl font-bold font-display text-slate-900 mb-6 leading-tight">
              Оцифровка чека <br className="hidden md:block" /> за пару секунд
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Забудьте о ручном вводе данных. Наш искусственный интеллект мгновенно превращает бумажные накладные в структурированную историю обслуживания
            </p>

            <ul className="space-y-4">
              {[
                "Распознает любой почерк и печать",
                "Автоматически считает итоговые суммы",
                "Разделяет работы и запчасти по категориям",
                "Сохраняет фото оригинала для страховки"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="h-6 w-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-[#c89f87]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Side: Video/Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-video w-full bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border-[8px] border-white group cursor-pointer">
              {/* Placeholder for video - can be replaced with real video tag later */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                <div className="relative flex flex-col items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                  <span className="text-white/40 text-sm font-medium tracking-wide uppercase">Смотреть демо</span>
                </div>
              </div>
              
              {/* Optional: Real video element (commented until asset is ready) */}
              {/* 
              <video 
                src="/assets/ocr-demo.mp4" 
                muted 
                loop 
                autoPlay 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              /> 
              */}
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-amber-100/50 rounded-[32px] blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
