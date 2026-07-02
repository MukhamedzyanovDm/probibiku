"use client";

import { User, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [step, setStep] = useState<"email" | "code">("email");
  const [timer, setTimer] = useState(59);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const performLogin = async () => {
    if (!email) return;
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.userId) {
          document.cookie = `user_id=${data.userId}; path=/; max-age=${60 * 60 * 24 * 365}`;
        }
      }
    } catch (e) {
      console.error("Login failed:", e);
    } finally {
      setIsLoggingIn(false);
      router.push("/dashboard/garage");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "code" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  useEffect(() => {
    const saved = localStorage.getItem("login_email_saved");
    const expires = localStorage.getItem("login_email_expires");
    if (saved && expires) {
      if (Date.now() < Number(expires)) {
        setEmail(saved);
      } else {
        localStorage.removeItem("login_email_saved");
        localStorage.removeItem("login_email_expires");
      }
    }
  }, []);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Сохраняем email на 30 дней
    const expiryTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
    localStorage.setItem("login_email_saved", email);
    localStorage.setItem("login_email_expires", String(expiryTime));

    setStep("code");
    setTimer(59);
  };

  const handleCodeChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Auto-focus next input
    if (element.value !== "" && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }

    // Auto-submit if all digits are entered
    if (newCode.every(digit => digit !== "")) {
      // Direct redirect for demo purposes
      setTimeout(() => {
        performLogin();
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && code[index] === "" && e.currentTarget.previousSibling) {
      (e.currentTarget.previousSibling as HTMLInputElement).focus();
    }
  };

  const resendCode = () => {
    setTimer(59);
    setCode(Array(6).fill(""));
  };

  return (
    <>
      <Background />

      <main className="relative z-10 flex-1 flex items-center justify-center min-h-screen px-4 sm:px-6 pt-24 pb-16 font-sans">
        <div className="relative w-full max-w-md rounded-2xl bg-white/70 border border-white shadow-[0_30px_70px_-25px_rgba(15,23,42,0.15),inset_0_2px_0_white] backdrop-blur-2xl overflow-hidden p-6 sm:p-10 text-center">
          
          {/* Вернуться на главный экран */}
          <div className="flex justify-start mb-6 -mt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Вернуться на главную</span>
            </Link>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shadow-[inset_0_1px_0_white] mx-auto mb-6">
            {step === "email" ? (
              <User className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Lock className="w-6 h-6 stroke-[1.5]" />
            )}
          </div>

          <h1 className="text-2xl font-normal tracking-tight text-slate-900 mb-2">
            {step === "email" ? "Войти в личный кабинет" : "Введите код подтверждения"}
          </h1>
          <p className="text-sm text-slate-600 mb-8 max-w-xs mx-auto">
            {step === "email"
              ? "Мы отправим одноразовый код на вашу электронную почту для безопасного входа"
              : `Мы отправили 6-значный проверочный код на адрес ${email}`}
          </p>

          {step === "email" ? (
            <form onSubmit={handleSendCode} className="space-y-4 text-left">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 pl-1">
                  Электронная почта
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all"
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                Получить код
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* OTP Input Fields */}
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    autoFocus={idx === 0}
                    onChange={(e) => handleCodeChange(e.target, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-full max-w-[3rem] aspect-square text-center text-lg font-mono font-medium border border-slate-200 focus:border-blue-500 bg-slate-50/50 focus:bg-white rounded-[25%] outline-none transition-all"
                  />
                ))}
              </div>

              {/* Countdown & Resend */}
              <div className="text-xs text-slate-500">
                {timer > 0 ? (
                  <span>Отправить код повторно через <strong className="font-mono text-slate-700 font-normal">{timer} сек</strong></span>
                ) : (
                  <button
                    onClick={resendCode}
                    className="text-blue-500 hover:text-blue-600 font-normal underline transition-colors"
                  >
                    Отправить код еще раз
                  </button>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep("email")}
                  className="flex-1 rounded-full border border-slate-200 text-slate-500 text-sm font-normal py-3 bg-white hover:bg-slate-50 transition-all duration-300"
                >
                  Назад
                </button>
                <button
                  onClick={performLogin}
                  disabled={isLoggingIn}
                  className="flex-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-normal py-3 shadow-[0_4px_12px_rgba(59,130,246,0.2)] transition-all duration-300 disabled:opacity-50"
                >
                  {isLoggingIn ? "Вход..." : "Войти"}
                </button>
              </div>
            </div>
          )}

          {/* Terms & Privacy Disclaimer */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Авторизуясь в сервисе, вы соглашаетесь с<br />
              <Link href="/terms" className="underline hover:text-blue-500 transition-colors">Условиями использования</Link>
              {" и "}
              <Link href="/privacy" className="underline hover:text-blue-500 transition-colors">Политикой конфиденциальности</Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
