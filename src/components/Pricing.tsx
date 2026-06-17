"use client";
import { Icon } from "@iconify/react";

import React, { useState } from "react";

export default function Pricing() {
  const [credits, setCredits] = useState(60);

  const getPricePerCredit = (qty: number) => {
    if (qty >= 120) return 7;
    if (qty >= 60) return 9;
    if (qty >= 30) return 12;
    return 15;
  };

  const pricePerCredit = getPricePerCredit(credits);
  const totalPrice = credits * pricePerCredit;

  // Calculate discount percentage compared to base price (15 ₽)
  const discountPercent = Math.round(((15 - pricePerCredit) / 15) * 100);

  const packages = [
    {
      name: "Старт",
      credits: 20,
      price: 290, // ~14.5 ₽
      description: "Попробовать сервис в деле и оцифровать первые чеки",
      icon: "solar:check-circle-linear",
      badge: "Быстрый старт",
    },
    {
      name: "Оптимальный",
      credits: 60,
      price: 590, // ~9.8 ₽
      description: "Хватит на 1-2 года обслуживания одного автомобиля",
      icon: "solar:stars-linear",
      badge: "Популярно",
      popular: true,
    },
    {
      name: "Максимум",
      credits: 150,
      price: 1190, // ~7.9 ₽
      description: "Для семейного автопарка или полной проверки истории бу авто перед покупкой",
      icon: "solar:buildings-2-linear",
      badge: "Макс. выгода",
    },
  ];

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 font-sans">
      {/* Section Intro */}
      <div className="text-center max-w-5xl mx-auto mb-16 font-sans">
        <p className="font-mono text-xs font-medium tracking-[-0.04em] text-blue-500 mb-4">
          Тарифы
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl mx-auto">
          Платите только за то,
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium">чем действительно пользуетесь</span>
        </h2>
        <p className="mt-6 text-base md:text-lg leading-8 text-slate-600 font-light max-w-3xl mx-auto">
          Никаких подписок. Купленные кредиты не сгорают и остаются на балансе навсегда
          <span className="block mt-1 font-normal text-slate-800">1 кредит = 1 оцифрованный чек или AI-проверка сметы</span>
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Interactive Calculator Card */}
        <div className="relative rounded-[2.5rem] bg-white/70 border border-white p-8 md:p-10 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.15),inset_0_1px_0_white] backdrop-blur-md mb-12">
          <div className="absolute -top-4 left-6 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-mono tracking-wider rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.3),inset_0_1px_0_white] uppercase">
            Интерактивный калькулятор
          </div>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
            {/* Left Column: Slider controls */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-normal text-slate-900">Выберите количество кредитов</h3>
                <p className="text-xs text-slate-400 font-light mt-1">Чем больше объем, тем дешевле каждый кредит</p>
              </div>

              {/* Slider Input */}
              <div className="space-y-3 pt-4">
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={credits}
                  onChange={(e) => setCredits(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 border border-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((credits - 10) / 190) * 100}%, #f1f5f9 ${((credits - 10) / 190) * 100}%, #f1f5f9 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>10 кр.</span>
                  <span>50 кр.</span>
                  <span>100 кр.</span>
                  <span>150 кр.</span>
                  <span>200 кр.</span>
                </div>
              </div>

              {/* What is 1 credit block */}
              <div className="pt-2">
                <p className="text-xs font-normal text-slate-800 mb-2">На что можно потратить кредиты:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-light font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    Оцифровка чеков
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-light font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    AI-анализ смет
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-light font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    Прогнозы износа
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-light font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    Экспорт отчетов
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Price summary display */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/50 border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-[inset_0_1px_0_white]">
              <div className="text-4xl md:text-5xl font-normal tracking-tight text-slate-900 font-sans">
                {credits} <span className="text-base text-slate-400 font-light">кредитов</span>
              </div>

              <div className="mt-4 flex items-baseline gap-1 text-slate-500 text-xs">
                <span>Цена за кредит:</span>
                <span className="text-sm font-normal text-slate-800">{pricePerCredit} ₽</span>
                {discountPercent > 0 && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-1.5 py-0.5 ml-1">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              <div className="mt-5 pt-5 border-t border-slate-200/80 w-full">
                <span className="text-xs font-light text-slate-400 block mb-1">Итого к оплате</span>
                <div className="text-3xl md:text-4xl font-normal text-slate-950">
                  {totalPrice.toLocaleString()} ₽
                </div>
              </div>

              <button className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white font-normal text-xs shadow-[0_10px_20px_-10px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:from-blue-400 hover:to-blue-500 hover:-translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all cursor-pointer">
                Купить {credits} кредитов
              </button>
            </div>
          </div>
        </div>

        {/* Headline for packages */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-normal text-slate-800">Или выберите готовый пакет:</h3>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 font-sans">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              onClick={() => setCredits(pkg.credits)}
              className={`cursor-pointer group relative rounded-[2rem] bg-white/60 border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.1),inset_0_1px_0_white] p-6 flex flex-col justify-between ${
                pkg.popular
                  ? "border-blue-300 shadow-[0_15px_30px_-15px_rgba(59,130,246,0.12),inset_0_1px_0_white] ring-1 ring-blue-100"
                  : "border-slate-200 shadow-[0_10px_20px_-15px_rgba(0,0,0,0.05),inset_0_1px_0_white]"
              }`}
            >
              {pkg.badge && (
                <div className={`absolute -top-3 left-6 px-2.5 py-0.5 text-[9px] font-mono tracking-wider rounded-full shadow-[inset_0_1px_0_white] ${
                  pkg.popular
                    ? "bg-gradient-to-b from-blue-400 to-blue-500 text-white border border-blue-600"
                    : "bg-slate-100 border border-slate-200 text-slate-500"
                }`}>
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="flex justify-between items-start pt-2 mb-4">
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {pkg.name}
                    </h4>
                    <p className="text-2xl font-normal text-slate-900 mt-1">
                      {pkg.credits} кр.
                    </p>
                  </div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    pkg.popular
                      ? "bg-blue-50 border-blue-100 text-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}>
                    <Icon
                      icon={pkg.icon}
                      style={{ strokeWidth: 1.5 }}
                      className="text-lg"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-light">Стоимость</span>
                  <span className="text-lg font-normal text-slate-900">{pkg.price} ₽</span>
                </div>
                <span className={`text-[10px] font-mono rounded-full px-2 py-1 ${
                  pkg.popular ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"
                }`}>
                  ~{Math.round(pkg.price / pkg.credits * 10) / 10} ₽ / кр.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
