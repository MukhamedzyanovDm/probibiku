"use client";

import React from "react";

export default function OCRDemo() {
  return (
    <section id="demo" className="relative max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full bg-gradient-to-tr from-blue-100/30 via-sky-100/20 to-indigo-100/30 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs font-semibold tracking-wider text-blue-500 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100">
          Видео демонстрация
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 mt-4 leading-tight">
          Как это работает в действии
        </h2>
        <p className="mt-4 text-base md:text-lg text-slate-600 font-light">
          Просто загрузите или сфотографируйте чек — искусственный интеллект мгновенно оцифрует позиции, проанализирует цены и спланирует будущие ТО
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto rounded-[2.5rem] bg-white/50 border border-white/0 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_rgba(255,255,255,0.25)] backdrop-blur-xl overflow-hidden p-2 sm:p-4">
        <div className="relative rounded-[2rem] overflow-hidden bg-slate-950 shadow-2xl aspect-video w-full flex items-center justify-center">
          <video 
            src="/ocr-demo.mp4" 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
            controls
          />
        </div>
      </div>
    </section>
  );
}
