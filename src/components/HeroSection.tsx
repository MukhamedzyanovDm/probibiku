"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mouse } from 'lucide-react';
import { HeroChatMockup } from './HeroChatMockup';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Unifying Background Element (The "Stage") */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/40 via-white to-blue-200/40 rounded-full blur-[120px] opacity-80" />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1100px] mx-auto h-full px-6 flex flex-col justify-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="max-w-xl pointer-events-auto z-30">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-[#1A2233] bg-[#F8FAFC] rounded-full border border-slate-200"
              >
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                <span>Ваш ассистент в автосервисе</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[36px] xs:text-[44px] md:text-5xl lg:text-7xl font-bold font-display text-slate-900 mb-6 xs:mb-8 leading-[1.05] tracking-tight"
              >
                Отвечайте мастеру уверенно
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[16px] xs:text-[18px] md:text-xl text-slate-600 mb-8 xs:mb-10 leading-relaxed max-w-xl"
              >
                Больше не нужно вспоминать, когда вы в последний раз меняли масло или ГРМ. Вся история обслуживания в вашем телефоне — забудьте о поисках бумажек в бардачке.
              </motion.p>

              {/* Mobile Mockup */}
              <div className="lg:hidden mb-12 max-w-[280px] mx-auto">
                <HeroChatMockup />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full md:w-auto"
              >
                <Link href="/login" className="block w-full h-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-slate-900 w-full md:w-auto px-8 py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all duration-200 hover:bg-slate-800 pointer-events-auto flex items-center justify-center"
                  >
                    <p className="font-sans font-semibold text-base text-white leading-6 whitespace-nowrap">
                      Добавить первый автомобиль →
                    </p>
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex justify-start pointer-events-auto"
            >
              <div className="w-full max-w-[340px] relative">

                {/* Decorative background element for the phone */}
                <div className="absolute -inset-10 bg-amber-50/50 rounded-full blur-3xl -z-10" />
                <div className="transform transition-transform duration-700">
                  <HeroChatMockup />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-slate-300 w-full"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse className="w-6 h-6" />
        </motion.div>
        <span className="text-[10px] font-medium uppercase tracking-widest whitespace-nowrap">Листайте вниз</span>
      </motion.div>
    </section>
  );
};
