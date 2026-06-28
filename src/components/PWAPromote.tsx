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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          
          {/* Left Column: Interactive Phone Mockup */}
          <div className="flex justify-center md:justify-end order-2 md:order-1">
            <div className="relative w-[280px] h-[560px] bg-white/40 backdrop-blur-xl rounded-[3rem] p-3 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] border-4 border-white/80 ring-1 ring-slate-200/50 flex flex-col overflow-hidden group">
              {/* Speaker / Dynamic Island notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <div className="w-12 h-1 bg-slate-900 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-blue-900/60" />
              </div>

              {/* Phone screen internal container */}
              <div 
                className="w-full h-full rounded-[2.3rem] overflow-hidden relative flex flex-col pt-8 pb-4 px-4 select-none border border-slate-800/50 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/dlue-background.jpg')"
                }}
              >
                {/* Soft overlay gradient for depth and readability */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70 pointer-events-none" />

                {/* Status Bar */}
                <div className="relative z-10 flex justify-between items-center text-[10px] font-semibold text-slate-300 px-2 mb-4 font-mono">
                  <span>09:41</span>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <div className="w-4 h-2 border border-slate-400 rounded-sm p-0.5 flex items-center">
                      <div className="w-full h-full bg-slate-300 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Simulated HomeScreen */}
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  {/* Fake widget */}
                  <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                        П
                      </div>
                      <div className="leading-tight">
                        <p className="text-[10px] font-semibold text-white">Мой гараж</p>
                        <p className="text-[8px] text-slate-400">Пробибику</p>
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex justify-between text-[8px] text-slate-400 font-mono">
                      <span>Траты: 42 500 ₽</span>
                      <span className="text-emerald-400 font-semibold">Здоровье: 95%</span>
                    </div>
                  </div>

                  {/* App Grid */}
                  <div className="grid grid-cols-4 gap-x-2 gap-y-4 my-auto px-1">
                    {/* Fake apps */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center shadow-md">
                        <span className="text-[14px] text-white">💬</span>
                      </div>
                      <span className="text-[8px] text-slate-400">Чаты</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
                        <span className="text-[14px] text-white">✈️</span>
                      </div>
                      <span className="text-[8px] text-slate-400">Почта</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center shadow-md">
                        <span className="text-[14px] text-white">🎵</span>
                      </div>
                      <span className="text-[8px] text-slate-400">Музыка</span>
                    </div>

                    {/* Probibiku app icon */}
                    <div className="flex flex-col items-center gap-1 relative">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping pointer-events-none" />
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/50 p-2 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-bounce">
                        <img src="/Probibiku_small_logo.svg" alt="Пробибику" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[8px] font-semibold text-white">Пробибику</span>
                    </div>
                  </div>

                  {/* Dock bar */}
                  <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-2.5 backdrop-blur-md flex justify-around items-center">
                    <div className="w-8 h-8 rounded-lg bg-slate-800" />
                    <div className="w-8 h-8 rounded-lg bg-slate-800" />
                    <div className="w-8 h-8 rounded-lg bg-slate-800" />
                    <div className="w-8 h-8 rounded-lg bg-slate-800" />
                  </div>
                </div>

                <div className="relative z-10 w-24 h-1 bg-slate-500 rounded-full mx-auto mt-3" />
              </div>
            </div>
          </div>

          {/* Right Column: Instructions */}
          <div className="space-y-6 order-1 md:order-2 max-w-md w-full mx-auto md:mx-0">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider text-blue-500 uppercase">
                Всегда под рукой
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 leading-tight">
                Установите ПРОБИБИКУ на экран смартфона
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md pt-2">
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
