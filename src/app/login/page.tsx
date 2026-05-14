"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Имитация отправки кода
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleOtpComplete = (value: string) => {
    console.log("OTP Completed:", value);
    // Здесь будет логика проверки кода через NextAuth
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col items-center justify-center p-6">
      {/* Back button */}
      <Link 
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-[#1A2233]/60 hover:text-[#1A2233] transition-colors font-sans text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        На главную
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-white rounded-[32px] shadow-[0px_20px_40px_rgba(0,0,0,0.05)] p-8 md:p-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-[#F2F2F2] rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-[#C89F87]" />
          </div>
          <h1 className="text-2xl font-display font-bold text-[#1A2233] mb-2">
            {step === "email" ? "Вход в Пробибику" : "Введите код"}
          </h1>
          <p className="text-sm font-sans text-[#1A2233]/60">
            {step === "email" 
              ? "Введите ваш email для получения кода доступа" 
              : `Мы отправили 6-значный код на ${email}`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.form
              key="email-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleEmailSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A2233]/30" />
                  <Input 
                    type="email"
                    placeholder="example@mail.ru"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-[#E2E8F0] focus:border-[#C89F87] transition-all"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#C89F87] hover:bg-[#B88F77] text-white font-sans font-semibold text-base transition-all shadow-sm"
              >
                {isLoading ? "Отправка..." : "Получить код"}
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2E8F0]"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#1A2233]/30 font-sans font-medium">или</span>
                </div>
              </div>

              <Button 
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl border-[#E2E8F0] text-[#1A2233] font-sans font-semibold text-base hover:bg-[#F8FAFC] transition-all flex items-center justify-center gap-3"
                onClick={() => console.log("Yandex Login")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9023 20V8.21639L15.9082 0H12.793L10.3379 5.86248L7.86523 0H4.57031L8.57617 8.21639V20H11.9023Z" fill="#FF0000"/>
                </svg>
                Войти через Яндекс
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col items-center space-y-8"
            >
              <InputOTP 
                maxLength={6} 
                onComplete={handleOtpComplete}
                autoFocus
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border-[#E2E8F0] focus:border-[#C89F87]" />
                  <InputOTPSlot index={1} className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border-[#E2E8F0] focus:border-[#C89F87]" />
                  <InputOTPSlot index={2} className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border-[#E2E8F0] focus:border-[#C89F87]" />
                  <InputOTPSlot index={3} className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border-[#E2E8F0] focus:border-[#C89F87]" />
                  <InputOTPSlot index={4} className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border-[#E2E8F0] focus:border-[#C89F87]" />
                  <InputOTPSlot index={5} className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border-[#E2E8F0] focus:border-[#C89F87]" />
                </InputOTPGroup>
              </InputOTP>

              <button 
                type="button"
                onClick={() => setStep("email")}
                className="text-sm font-sans font-medium text-[#C89F87] hover:text-[#B88F77] transition-colors"
              >
                Изменить email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <p className="mt-8 text-xs text-[#1A2233]/40 text-center max-w-[300px] font-sans leading-relaxed">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <Link href="/privacy" className="underline hover:text-[#1A2233]/60 transition-colors">политикой конфиденциальности</Link>
        {" "}и{" "}
        <Link href="/terms" className="underline hover:text-[#1A2233]/60 transition-colors">условиями использования</Link>
      </p>
    </div>
  );
}
