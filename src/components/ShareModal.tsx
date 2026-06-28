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
    ? `${window.location.origin}/share/${car.id}`
    : `https://probibiku.ru/share/${car.id}`;

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
          {/* Real QR Code */}
          <div className="w-40 h-40 mx-auto bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center p-2.5 shadow-[0_4px_12px_rgba(15,23,42,0.02)]">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`} 
              alt="QR-код публичной сервисной книжки" 
              className="w-full h-full object-contain rounded-lg"
            />
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
