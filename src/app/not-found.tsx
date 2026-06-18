"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Car, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Background />
      <Header showAccountIcon={true} />
      
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 py-32">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="backdrop-blur-xl bg-white/60 border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)] rounded-[3rem] p-8 sm:p-10 flex flex-col items-center"
          >
            {/* Анимированный визуальный элемент - потерявшаяся машинка */}
            <div className="relative w-32 h-20 bg-slate-50/50 rounded-2xl flex items-center justify-center border border-slate-200/60 shadow-inner overflow-hidden mb-8">
              {/* Левая фара */}
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 blur-xs"
              />
              {/* Правая фара */}
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 blur-xs"
              />
              {/* Вращающийся радар/компас на фоне */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
              >
                <Compass className="w-16 h-16 text-slate-800" />
              </motion.div>
              
              <Car className="w-10 h-10 text-slate-700 relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            
            <span className="text-[10px] font-semibold tracking-wider text-blue-600 bg-blue-50 border border-blue-100/50 px-3 py-1 rounded-full uppercase font-mono mb-4">
              Ошибка 404
            </span>
            
            <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight mb-4">
              Маршрут перестроен
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed mb-8 max-w-xs">
              Этой страницы нет на нашей карте. Давайте вернемся в гараж, чтобы продолжить ведение истории вашего авто
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <Link href="/dashboard/garage" className="w-full">
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 border border-blue-700 text-white text-xs font-normal py-3.5 rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.15)] transition-all cursor-pointer active:scale-95"
                >
                  В личный гараж
                </Button>
              </Link>
              
              <Link href="/" className="w-full">
                <Button 
                  variant="outline"
                  className="w-full border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-normal py-3.5 rounded-full transition-all cursor-pointer active:scale-95"
                >
                  На главную
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
