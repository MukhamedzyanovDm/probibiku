"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Warehouse, Car } from "lucide-react";
import Portal from "@/components/Portal";

interface GarageLoaderProps {
  isOpen: boolean;
}

const loadingSteps = [
  "Открываем ворота гаража...",
  "Загоняем автомобиль...",
  "Паркуем и закрываем гараж..."
];

export default function GarageLoader({ isOpen }: GarageLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Dark blurred backdrop */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-500 animate-[fadeIn_0.3s_ease-out]" />

        {/* Loader Box */}
        <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-white/95 border border-slate-100 p-8 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.5)] flex flex-col items-center text-center gap-6 animate-[scaleIn_0.3s_ease-out]">
          {/* Animated Icons Container */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
            
            {/* Pulsing center icon (Warehouse -> Car transition) */}
            <div className="relative z-10 w-14 h-14 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg text-white animate-pulse">
              {stepIndex === 0 ? (
                <Warehouse className="w-7 h-7 animate-bounce" />
              ) : (
                <Car className="w-7 h-7 animate-pulse" />
              )}
            </div>
          </div>

          {/* Stepped Text with micro-animation */}
          <div className="space-y-2 h-16 flex flex-col justify-center">
            <p className="text-base font-medium text-slate-800 transition-all duration-500 animate-[slideUp_0.4s_ease-out] font-sans">
              {loadingSteps[stepIndex]}
            </p>
            <p className="text-xs text-slate-400 font-light">
              Пожалуйста, подождите, обновляем гараж
            </p>
          </div>
        </div>
      </div>

      {/* Global CSS injected for keyframe animations (since we use vanilla Tailwind) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </Portal>
  );
}
