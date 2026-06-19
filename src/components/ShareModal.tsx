"use client";
import { XCircle } from "lucide-react";
import Portal from "@/components/Portal";

import React, { useState } from "react";
import { Car } from "@/utils/garageStore";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
}

export default function ShareModal({ isOpen, onClose, car }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/maintenance/${car.make.toLowerCase()}/${car.model.toLowerCase()}`
    : `https://probibiku.ru/maintenance/${car.make.toLowerCase()}/${car.model.toLowerCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Portal>
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.3)] p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-medium text-slate-900">Поделиться историей</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
          >
            <XCircle className="w-7 h-7" />
          </button>
        </div>

        <div className="text-center space-y-4">
          {/* Simulated QR Code */}
          <div className="w-40 h-40 mx-auto bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-center p-4 shadow-[0_4px_12px_rgba(15,23,42,0.02)]">
            {/* Simple representation of QR code with CSS */}
            <div className="w-full h-full bg-slate-950 rounded relative overflow-hidden flex flex-wrap gap-1 p-2">
              <div className="w-8 h-8 bg-white border border-black absolute top-2 left-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-black" />
              </div>
              <div className="w-8 h-8 bg-white border border-black absolute top-2 right-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-black" />
              </div>
              <div className="w-8 h-8 bg-white border border-black absolute bottom-2 left-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-black" />
              </div>
              {/* Fake inner pixels */}
              <div className="absolute inset-x-8 inset-y-8 flex flex-wrap gap-1 opacity-80">
                <div className="w-2 h-2 bg-white" /><div className="w-2 h-2 bg-white" />
                <div className="w-2 h-2 bg-white" /><div className="w-2 h-2 bg-white" />
                <div className="w-2 h-2 bg-white" /><div className="w-2 h-2 bg-white" />
                <div className="w-2 h-2 bg-white" /><div className="w-2 h-2 bg-white" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-normal text-slate-800">
              {car.make} {car.model}
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-light">
              QR-код ведет на публичную сервисную книжку вашего автомобиля
            </p>
          </div>

          <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 p-1">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 text-xs text-slate-500 bg-transparent px-3 outline-none select-all truncate"
            />
            <button
              onClick={handleCopy}
              className="rounded-lg bg-blue-500 text-white font-normal text-[11px] px-3 py-1.5 hover:bg-blue-600 transition-colors shadow-[0_2px_6px_rgba(59,130,246,0.15)] shrink-0"
            >
              {copied ? "Скопировано!" : "Копировать"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-full border border-slate-200 text-slate-600 text-sm font-normal py-3 hover:bg-slate-50 transition-colors mt-2"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
    </Portal>
  );
}
