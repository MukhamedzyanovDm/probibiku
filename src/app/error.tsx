"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RefreshCcw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
            {/* Анимированный значок Check Engine */}
            <div className="relative w-24 h-24 bg-amber-50/40 border border-amber-200/50 rounded-2xl flex items-center justify-center shadow-inner mb-8">
              <svg className="w-12 h-12 text-amber-500 fill-amber-500/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Корпус двигателя */}
                <path d="M4 10h3l2-3h6l2 3h3v5h-2l-1 2h-8l-1-2H4v-5z" />
                {/* Свеча/клапан сверху */}
                <path d="M10 7V5h4v2" />
                {/* Валы по бокам */}
                <path d="M2 12h2M20 12h2M12 17v2" />
                {/* Моргающий элемент */}
                <circle cx="12" cy="12" r="1.5" className="fill-amber-500 animate-ping" />
              </svg>
            </div>
            
            <span className="text-[10px] font-semibold tracking-wider text-amber-600 bg-amber-50 border border-amber-100/50 px-3 py-1 rounded-full uppercase font-mono mb-4">
              Ошибка 504 / Сервер перегрелся
            </span>
            
            <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight mb-4">
              Заехали на пит-стоп
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed mb-8 max-w-xs">
              Что-то пошло не так под капотом нашей системы. Мы уже проверяем свечи зажигания. Попробуйте обновить страницу
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <Button 
                onClick={() => reset()}
                className="w-full bg-blue-500 hover:bg-blue-600 border border-blue-700 text-white text-xs font-normal py-3.5 rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.15)] transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                Обновить страницу
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/dashboard/garage'}
                className="w-full border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-normal py-3.5 rounded-full transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                В личный гараж
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
