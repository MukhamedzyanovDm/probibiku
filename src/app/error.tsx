"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="relative w-full min-h-screen bg-[#F2F2F2] flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="max-w-[1320px] mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-8">
              <AlertCircle className="w-12 h-12 text-[#314158]" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#1A2233] mb-6 leading-tight">
              504. Ошибка сервера
            </h1>
            
            <p className="text-lg md:text-xl font-display font-semibold text-[#1A2233]/70 mb-10 max-w-lg mx-auto leading-relaxed">
              Что-то пошло не так на нашей стороне. Сервер временно не отвечает, но мы уже чиним. Попробуйте обновить страницу
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button 
                onClick={() => reset()}
                size="lg"
                className="bg-[#314158] hover:bg-[#1E293B] text-white px-8 py-6 h-auto text-lg rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 font-sans font-semibold"
              >
                <RefreshCcw className="w-5 h-5" />
                Попробовать снова
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                size="lg"
                className="border-[#314158] text-[#314158] hover:bg-white/50 px-8 py-6 h-auto text-lg rounded-xl transition-all font-sans font-semibold"
              >
                На главную
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
