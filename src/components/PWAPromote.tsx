"use client";

import React, { useState } from "react";
import { Share, PlusSquare, MoreVertical, Smartphone, Check, AppWindow } from "lucide-react";

export default function PWAPromote() {
  const [activeTab, setActiveTab] = useState<"ios" | "android">("ios");

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
      {/* Background soft decorative blur blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Phone Mockup */}
          <div className="flex justify-center md:justify-end order-2 md:order-1">
            <div className="relative w-[280px] h-[560px] bg-white/40 backdrop-blur-xl rounded-[3rem] p-3 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] border-4 border-white/80 ring-1 ring-slate-200/50 flex flex-col overflow-hidden group">
              {/* Phone screen internal container */}
              <div 
                className="w-full h-full rounded-[2.3rem] overflow-hidden relative flex flex-col pt-3.5 pb-4 px-4 select-none border border-slate-800/50 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
              >
                {/* Surface texture */}
                <div
                  className="absolute inset-0 z-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
                    backgroundSize: "1.5rem 1.5rem",
                  }}
                />

                {/* Decorative glows adapted for mobile screen */}
                <div className="absolute top-[-20%] left-[-20%] z-0 w-[12rem] h-[12rem] rounded-full bg-white/20 blur-[2.5rem] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] z-0 w-[10rem] h-[10rem] rounded-full bg-blue-900/20 blur-[2.5rem] pointer-events-none" />

                {/* Status Bar / Notch Row */}
                <div className="relative z-30 flex justify-between items-center text-[10px] font-semibold text-white px-2 mb-4 font-mono w-full h-6 shrink-0">
                  <span className="w-12 text-left">09:41</span>
                  
                  {/* Speaker / Dynamic Island notch */}
                  <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
                    <div className="w-1 h-1 rounded-full bg-slate-800" />
                    <div className="w-10 h-0.5 bg-slate-900 rounded-full" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                  </div>

                  <div className="flex items-center gap-1 w-12 justify-end">
                    <span>5G</span>
                    <div className="w-4 h-2 border border-white rounded-sm p-0.5 flex items-center">
                      <div className="w-full h-full bg-white rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Simulated HomeScreen */}
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  {/* Fake widget */}
                  <div className="bg-white/12 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-[0_8px_32px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-[10px] text-white font-semibold">
                        П
                      </div>
                      <div className="leading-tight">
                        <p className="text-[10px] font-semibold text-white">Мой гараж</p>
                        <p className="text-[8px] text-slate-300">Пробибику</p>
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-white/16 flex justify-between text-[8px] text-slate-300 font-mono">
                      <span>Траты: 42 500 ₽</span>
                      <span className="text-emerald-400 font-semibold">Здоровье: 95%</span>
                    </div>
                  </div>

                  {/* App Grid */}
                  <div className="grid grid-cols-4 gap-x-2 gap-y-4 my-auto px-1">
                    {/* Fake apps */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10">
                        <img src="/Ikon-set/Samsung%20App%20Icons.svg" alt="Сообщения" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[8px] text-white/90 font-light">Сообщения</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10">
                        <img src="/Ikon-set/Samsung%20App%20Icons-2.svg" alt="Погода" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[8px] text-white/90 font-light">Погода</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10">
                        <img src="/Ikon-set/Samsung%20App%20Icons-1.svg" alt="Музыка" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[8px] text-white/90 font-light">Музыка</span>
                    </div>

                    {/* Probibiku app icon */}
                    <div className="flex flex-col items-center gap-1 relative">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping pointer-events-none" />
                      <div className="w-10 h-10 rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.45)] animate-bounce">
                        <img src="/Ikon-set/Probibku%20icon.svg" alt="Пробибику" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[8px] font-semibold text-white">Пробибику</span>
                    </div>
                  </div>

                  {/* Dock bar */}
                  <div className="bg-white/12 backdrop-blur-xl border border-white/20 rounded-2xl p-2.5 shadow-[0_8px_32px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] flex justify-around items-center">
                    <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/10" />
                    <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/10" />
                    <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/10" />
                    <div className="w-8 h-8 rounded-xl bg-white/15 border border-white/10" />
                  </div>
                </div>

                <div className="relative z-10 w-24 h-1 bg-white/80 rounded-full mx-auto mt-3" />
              </div>
            </div>
          </div>

          {/* Right Column: Instructions */}
          <div className="space-y-6 order-1 md:order-2 max-w-2xl w-full mx-auto md:mx-0">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/60 border border-white/80 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] backdrop-blur-md text-xs font-semibold text-blue-500 tracking-normal mb-4 select-none">
                Всегда под рукой
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 leading-tight font-sans">
                Установите ПРОБИБИКУ на экран смартфона
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed pt-2">
                Мы уже работаем над созданием нативных мобильных приложений. А пока вы можете добавить веб-версию на домашний экран — она работает быстро, поддерживает оффлайн-режим и не занимает память
              </p>
            </div>

            {/* Tabs selector */}
            <div className="flex border border-slate-200/80 rounded-xl p-1 bg-slate-100/50 w-full max-w-xs">
              <button
                onClick={() => setActiveTab("ios")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === "ios"
                    ? "bg-white text-slate-800 shadow-sm border border-slate-200/20"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                iOS (Safari)
              </button>
              <button
                onClick={() => setActiveTab("android")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeTab === "android"
                    ? "bg-white text-slate-800 shadow-sm border border-slate-200/20"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <AppWindow className="w-4 h-4" />
                Android (Chrome)
              </button>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-4 pt-2">
              {activeTab === "ios" ? (
                <>
                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-800">Откройте сайт в Safari</h4>
                      <p className="text-xs text-slate-500 font-light">
                        Перейдите на страницу личного кабинета или гаража в стандартном браузере Safari
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-800 inline-flex items-center gap-1.5">
                        Нажмите кнопку «Поделиться»
                        <Share className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      </h4>
                      <p className="text-xs text-slate-500 font-light">
                        Кнопка находится в нижнем меню браузера (квадрат со стрелкой вверх)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-800 inline-flex items-center gap-1.5">
                        Выберите «На экран «Домой»»
                        <PlusSquare className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      </h4>
                      <p className="text-xs text-slate-500 font-light">
                        Прокрутите список действий вниз и нажмите на этот пункт меню
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-800">Нажмите «Добавить»</h4>
                      <p className="text-xs text-slate-500 font-light">
                        Иконка ПРОБИБИКУ появится на вашем экране рядом с другими приложениями
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-800">Откройте сайт в Chrome</h4>
                      <p className="text-xs text-slate-500 font-light">
                        Запустите браузер Google Chrome и перейдите на страницу сервиса
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-800 inline-flex items-center gap-1.5">
                        Нажмите меню
                        <MoreVertical className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      </h4>
                      <p className="text-xs text-slate-500 font-light">
                        Кнопка с тремя точками находится в правом верхнем углу браузера
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-800">Выберите «Установить»</h4>
                      <p className="text-xs text-slate-500 font-light">
                        Нажмите на пункт «Установить приложение» (или «Добавить на главный экран»)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-slate-800">Подтвердите установку</h4>
                      <p className="text-xs text-slate-500 font-light">
                        Иконка ПРОБИБИКУ будет создана на вашем рабочем столе для быстрого запуска
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
