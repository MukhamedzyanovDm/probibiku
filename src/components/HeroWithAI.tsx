"use client";
import { Icon } from "@iconify/react";
import React from "react";

export default function HeroWithAI() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-20">

      <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center">
        {/* Hero Copy */}
        <div className="text-center lg:text-left min-w-0">
          {/* Hero Label */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/75 border border-white px-3.5 py-2 shadow-[0_6px_18px_-12px_rgba(15,23,42,0.3),inset_0_1px_0_white] mb-8">
            <span className="w-7 h-7 rounded-full bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-[inset_0_1px_0_white] flex items-center justify-center">
              <Icon
                icon="solar:stars-linear"
                style={{ strokeWidth: 1.5 }}
                className="text-base text-blue-500"
              />
            </span>
            <span className="font-mono text-xs font-medium tracking-[-0.04em] text-slate-500">
              Умный помощник автовладельца
            </span>
          </div>

          {/* Hero Headline */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl font-sans"
            style={{ textShadow: "0 1px 1px rgba(255,255,255,0.8)" }}
          >
            <span className="block">Вы помните сколько потратили на машину в прошлом году?</span>
          </h1>

          <p className="mt-8 text-base md:text-lg leading-8 text-slate-600 font-light max-w-2xl mx-auto lg:mx-0">
            Мы тоже нет. Поэтому и сделали Пробибику. Больше никаких «ой, а когда там масло меняли?». Просто сфотографируйте чек из автосервиса — Пробибику запомнит всё сам и вовремя скажет, что нужно сделать дальше
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <a
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal shadow-[0_10px_24px_rgba(59,130,246,0.26),inset_0_1px_0_rgba(255,255,255,0.35)] hover:from-blue-400 hover:to-blue-500 hover:-translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)] transition-all duration-300"
            >
              Попробовать бесплатно
              <Icon
                icon="solar:arrow-right-linear"
                style={{ strokeWidth: 1.5 }}
                className="text-lg"
              />
            </a>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-b from-white to-slate-50 border border-slate-200 text-slate-700 text-sm font-normal shadow-[0_4px_12px_rgba(15,23,42,0.05),inset_0_1px_0_white] hover:from-slate-50 hover:to-slate-100 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Icon
                icon="solar:play-circle-linear"
                style={{ strokeWidth: 1.5 }}
                className="text-lg text-blue-500"
              />
              Как это работает
            </a>
          </div>

          {/* Social Proof Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* Avatar Stack */}
            <div className="flex -space-x-2.5 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Пользователь"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Пользователь"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Пользователь"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Пользователь"
              />
            </div>
            {/* Caption */}
            <p className="text-xs text-slate-500 font-light font-sans text-center lg:text-left">
              <span className="font-semibold text-slate-900">1 013 ответственных автовладельцев</span> уже контролируют свои расходы с нами
            </p>
          </div>
        </div>

        {/* Hero Product Mockup */}
        <div className="relative lg:pl-4 min-w-0">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-200/40 via-white/20 to-sky-200/30 blur-3xl" />

          <div className="relative">
            {/* AI Assistant Chat Mockup Container */}
            <div className="rounded-[1.5rem] bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35),inset_0_1px_0_white] overflow-hidden">
              {/* Mockup Top Bar */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200/80 bg-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-tight text-slate-500 uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ИИ Ассистент Пробибику</span>
                </div>
              </div>

              {/* Chat Content Panel */}
              <div className="p-5 sm:p-6 h-[390px] flex flex-col justify-between bg-slate-50/50">
                {/* Scrollable Message List (driven purely by CSS animations) */}
                <div className="flex-1 overflow-hidden pr-1 min-h-0">
                  <div className="css-chat-container">
                    {/* Message 1 (User) */}
                    <div className="css-chat-msg-1 flex flex-col max-w-[85%] ml-auto items-end overflow-hidden">
                      <div className="rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed bg-blue-600 text-white shadow-md shadow-blue-600/10 rounded-tr-none">
                        Когда меняли задние стойки?
                      </div>
                    </div>

                    {/* AI Typing 1 */}
                    <div className="css-chat-typing-1 flex flex-col items-start max-w-[85%] mr-auto overflow-hidden">
                      <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-white border border-slate-200/60 text-slate-500 shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>

                    {/* Message 2 (AI) */}
                    <div className="css-chat-msg-2 flex flex-col max-w-[85%] mr-auto items-start overflow-hidden">
                      <div className="rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed bg-white border border-slate-200/60 text-slate-800 shadow-sm rounded-tl-none">
                        Задние стойки амортизаторов (Kayaba) заменялись 12 мая 2025 г. при пробеге 72 100 км.
                      </div>
                    </div>

                    {/* Message 3 (User) */}
                    <div className="css-chat-msg-3 flex flex-col max-w-[85%] ml-auto items-end overflow-hidden">
                      <div className="rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed bg-blue-600 text-white shadow-md shadow-blue-600/10 rounded-tr-none">
                        Когда мне нужно ехать на ТО?
                      </div>
                    </div>

                    {/* AI Typing 2 */}
                    <div className="css-chat-typing-2 flex flex-col items-start max-w-[85%] mr-auto overflow-hidden">
                      <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-white border border-slate-200/60 text-slate-500 shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>

                    {/* Message 4 (AI) */}
                    <div className="css-chat-msg-4 flex flex-col max-w-[85%] mr-auto items-start overflow-hidden">
                      <div className="rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed bg-white border border-slate-200/60 text-slate-800 shadow-sm rounded-tl-none">
                        Следующее ТО-6 рекомендуется пройти через 1 500 км (на пробеге 90 000 км) или к августу 2026 г.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Input Area */}
                <div className="mt-4 border-t border-slate-100 pt-3.5 flex items-center justify-between text-[11px] text-slate-400 font-light">
                  <div className="flex items-center gap-1.5">
                    <Icon icon="solar:magic-stick-2-linear" className="text-sm text-blue-500 animate-pulse" />
                    <span>Связан с базой ТО</span>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5 border border-slate-200 shadow-sm cursor-text hover:bg-slate-50 transition-colors">
                    <span className="text-slate-400">Спросить ИИ...</span>
                    <Icon icon="solar:arrow-right-linear" className="text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
