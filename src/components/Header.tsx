"use client";
import { Sparkles } from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import AIChat from "./AIChat";

export function Header({ showAccountIcon = false }: { showAccountIcon?: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 pt-5">
        <div className="relative rounded-full bg-white/55 backdrop-blur-xl border border-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,1)] px-4 py-3">

          {/* Nav Content */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Brand */}
            <a href="#" className="flex items-center gap-3 group">
              <img 
                src="/Probibiku_small_logo.svg" 
                alt="ПРОБИБИКУ" 
                className="h-[24px] w-auto lg:hidden" 
              />
              <img 
                src="/Probibiku_main_logo.svg" 
                alt="ПРОБИБИКУ" 
                className="h-[24px] w-auto hidden lg:block" 
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-7 text-xs text-slate-600 font-normal">
              <a
                href="#features"
                className="relative transition-colors duration-300 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Возможности
              </a>
              <a
                href="#demo"
                className="relative transition-colors duration-300 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Как это работает
              </a>

              <a
                href="#privacy"
                className="relative transition-colors duration-300 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Безопасность
              </a>
              <a
                href="#pricing"
                className="relative transition-colors duration-300 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Цены
              </a>
            </div>

            {/* Navigation CTAs */}
            <div className="flex items-center gap-2">
              {mounted && (
                showAccountIcon ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-slate-800 bg-white hover:bg-amber-50/20 border border-amber-400/70 hover:border-amber-500 shadow-[0_4px_12px_rgba(245,158,11,0.08),inset_0_1px_0_white] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>ИИ Ассистент</span>
                    </button>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="text-slate-600 hover:text-blue-600 transition-colors flex items-center justify-center cursor-pointer"
                        title="Личный кабинет"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[28px] h-[28px]">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="10" r="3" />
                          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                        </svg>
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-3 w-48 rounded-2xl bg-white border border-slate-200 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.15)] py-1.5 z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <a
                              href="#pricing"
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <span>Мой счет</span>
                              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white bg-gradient-to-b from-amber-500 to-amber-600 border border-amber-600 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[10px] h-[10px]">
                                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                </svg>
                                <span>10</span>
                              </span>
                            </a>
                            <a
                              href="/garage"
                              onClick={() => setDropdownOpen(false)}
                              className="px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors block"
                            >
                              Мои автомобили
                            </a>
                            <a
                              href="/settings"
                              onClick={() => setDropdownOpen(false)}
                              className="px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors block"
                            >
                              Настройки
                            </a>
                            <a
                              href="/"
                              onClick={() => setDropdownOpen(false)}
                              className="px-4 py-2.5 text-xs text-red-600 hover:bg-red-50/50 transition-colors block border-t border-slate-100"
                            >
                              Выйти
                            </a>
                          </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-slate-800 bg-white hover:bg-amber-50/20 border border-amber-400/70 hover:border-amber-500 shadow-[0_4px_12px_rgba(245,158,11,0.08),inset_0_1px_0_white] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>ИИ Ассистент</span>
                    </button>
                    <a
                      href="/login"
                      className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors duration-300"
                    >
                      Войти
                    </a>
                  </>
                )
              )}
            </div>
        </div>
      </div>
      </nav>
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </header>
  );
}

export default Header;
