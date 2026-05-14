"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

export default function UnderConstruction() {
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
              <Construction className="w-12 h-12 text-[#C89F87]" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#1A2233] mb-6 leading-tight">
              Раздел находится в разработке
            </h1>
            
            <p className="text-lg md:text-xl font-display font-semibold text-[#1A2233]/70 mb-10 max-w-lg mx-auto leading-relaxed">
              Мы вовсю работаем над этим разделом, чтобы сделать использование сервиса еще удобнее. Совсем скоро здесь появится много полезного
            </p>
            
            <Link href="/">
              <Button 
                size="lg"
                className="bg-[#C89F87] hover:bg-[#B88F77] text-white px-8 py-6 h-auto text-lg rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] font-sans font-semibold"
              >
                Вернуться на главную
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
