import { Sparkles, Camera, Fuel, FileText, MessageSquare, Database, Moon } from "lucide-react";
import React from "react";

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Intro */}
      <div className="text-center max-w-5xl mx-auto mb-14 font-sans">
        <span className="inline-block px-3 py-1 rounded-full bg-white/60 border border-white/80 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] backdrop-blur-md text-xs font-semibold text-blue-500 tracking-normal mb-4 select-none">
          Возможности сервиса
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl mx-auto font-sans">
          Пробибику собирает всё
          <span className="block">в одном месте</span>
        </h2>
        <p className="mt-6 text-base md:text-lg leading-8 text-slate-600 font-light max-w-3xl mx-auto">
          Сканируйте накладные, следите за расходами, проверяйте не переплатили ли вы и узнавайте заранее что пора в сервис
        </p>
      </div>

      {/* Capability Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
        {/* Capability 01 */}
        <div className="rounded-2xl bg-white/68 border border-white p-6 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.24),inset_0_1px_0_white] hover:-translate-y-1 hover:bg-white/84 transition-all duration-300">
          <div className="flex items-center justify-between gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
              <Sparkles className="w-[21px] h-[21px] text-blue-500" />
            </div>
            <span className="font-mono text-[10px] text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1">
              Сводка по авто готова
            </span>
          </div>
          <h3 className="mt-6 text-xl font-normal tracking-tight text-slate-950">
            Напоминание на почту
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
          Понятная сводка: сколько ушло на топливо, ремонт и запчасти, и что маячит на горизонте по плановому ТО или страховке
          </p>
        </div>

        {/* Capability 02 */}
        <div className="rounded-2xl bg-white/68 border border-white p-6 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.24),inset_0_1px_0_white] hover:-translate-y-1 hover:bg-white/84 transition-all duration-300">
          <div className="flex items-center justify-between gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
              <Camera className="w-[21px] h-[21px] text-blue-500" />
            </div>
            <span className="font-mono text-[10px] text-slate-500 bg-white border border-slate-200 rounded-full px-2.5 py-1 shadow-[inset_0_1px_0_white]">
              Распознавание за 3 сек
            </span>
          </div>
          <h3 className="mt-6 text-xl font-normal tracking-tight text-slate-950">
           Сфотографировал и готово
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
            Бумажный чек из сервиса или PDF из мессенджера — Пробибику распознает каждую позицию сам. Руками вбивать ничего не нужно
          </p>
        </div>

        {/* Capability 03 */}
        <div className="rounded-2xl bg-white/68 border border-white p-6 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.24),inset_0_1px_0_white] hover:-translate-y-1 hover:bg-white/84 transition-all duration-300">
          <div className="flex items-center justify-between gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
              <Fuel className="w-[21px] h-[21px] text-blue-500" />
            </div>
            <span className="font-mono text-[10px] text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1">
              Статистика заправок
            </span>
          </div>
          <h3 className="mt-6 text-xl font-normal tracking-tight text-slate-950">
          Расход топлива
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
            Фиксируйте заправки и смотрите сколько реально съедает машина. Средний расход, динамика цен, графики — всё чтобы не удивляться на заправке

          </p>
        </div>

        {/* Capability 04 */}
        <div className="rounded-2xl bg-white/68 border border-white p-6 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.24),inset_0_1px_0_white] hover:-translate-y-1 hover:bg-white/84 transition-all duration-300">
          <div className="flex items-center justify-between gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
              <FileText className="w-[21px] h-[21px] text-blue-500" />
            </div>
            <span className="font-mono text-[10px] text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1">
              Страховка
            </span>
          </div>
          <h3 className="mt-6 text-xl font-normal tracking-tight text-slate-950">
            Контроль документов
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
            Страховка, техосмотр, транспортный налог — Пробибику напомнит заранее, а не когда уже горит
          </p>
        </div>

        {/* Capability 05 */}
        <div className="rounded-2xl bg-white/68 border border-white p-6 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.24),inset_0_1px_0_white] hover:-translate-y-1 hover:bg-white/84 transition-all duration-300">
          <div className="flex items-center justify-between gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
              <MessageSquare className="w-[21px] h-[21px] text-blue-500" />
            </div>
            <span className="font-mono text-[10px] text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1">
              Прогноз износа активен
            </span>
          </div>
          <h3 className="mt-6 text-xl font-normal tracking-tight text-slate-950">
            Когда пора в сервис
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
            На основе вашей истории ремонтов Пробибику сам прикинет когда пора менять ремни, жидкости или колодки. С учётом вашего реального пробега, а не календарного «раз в год»
          </p>
        </div>

        {/* Capability 06 */}
        <div className="rounded-2xl bg-white/68 border border-white p-6 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.24),inset_0_1px_0_white] hover:-translate-y-1 hover:bg-white/84 transition-all duration-300">
          <div className="flex items-center justify-between gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
              <Database className="w-[21px] h-[21px] text-blue-500" />
            </div>
            <span className="font-mono text-[10px] text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1">
              Профиль сохранен
            </span>
          </div>
          <h3 className="mt-6 text-xl font-normal tracking-tight text-slate-950">
            Вся история машины в одном месте
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
            Все сервисы, все мастера, все чеки — хранятся вместе и никуда не деваются. Бардачок можно освободить.
          </p>
        </div>

        {/* Capability 07 / Wide Card */}
        <div className="md:col-span-2 lg:col-span-3 rounded-[2.25rem] bg-gradient-to-b from-[#1d2a3d] to-[#131c2b] text-white border border-white/10 p-6 md:p-8 shadow-[0_28px_70px_-35px_rgba(15,23,42,0.72),inset_0_1px_0_rgba(255,255,255,0.13)] overflow-hidden relative">
          {/* Background glow */}
          <div className="absolute top-[-40%] right-[-10%] w-[24rem] h-[24rem] rounded-full bg-blue-400/18 blur-[5rem]" />
          <div className="absolute bottom-[-45%] left-[-12%] w-[22rem] h-[22rem] rounded-full bg-sky-300/10 blur-[5rem]" />
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
            {/* Wide Card Copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/10 px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="font-mono text-[10px] tracking-[-0.03em] text-blue-200">
                  ВЫГОДНАЯ ПРОДАЖА
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-white leading-tight">
                Отчёт для покупателя
              </h3>
              <p className="mt-4 text-sm md:text-base leading-7 text-slate-300 font-light max-w-xl">
              Один клик и у вас на руках документ со всей историей обслуживания. 
              Покупатель видит реальные чеки, а не слова «машина в отличном состоянии, 
              один хозяин, не бита не крашена»
              </p>
            </div>

            {/* Mini End-of-Day UI */}
            <div className="rounded-[1.75rem] bg-white text-slate-900 border border-white/80 p-4 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.62),inset_0_1px_0_white]">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div>
                  <p className="text-xs text-slate-400 font-light font-sans">
                    Статистика машины
                  </p>
                  <p className="mt-1 text-xl font-normal tracking-tight text-slate-950 font-sans">
                    История подтверждена
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Moon className="w-[18px] h-[18px] text-blue-500" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 shadow-[inset_0_1px_0_white]">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    Оцифровано
                  </p>
                  <p className="mt-2 text-2xl font-light tracking-tight text-slate-950">
                    12 чеков
                  </p>
                  <p className="mt-1 text-xs text-slate-500 font-light">
                    все чеки сохранены
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 text-slate-900 border border-blue-100 p-4 shadow-[inset_0_1px_0_white]">
                  <p className="font-mono text-[10px] text-blue-500 uppercase tracking-widest">
                    Категории
                  </p>
                  <p className="mt-2 text-2xl font-light tracking-tight text-slate-950">
                    4
                  </p>
                  <p className="mt-1 text-xs text-slate-500 font-light font-sans">
                    раздела расходов в базе
                  </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 text-white border border-blue-700 p-4 shadow-[0_12px_28px_-18px_rgba(59,130,246,0.7),inset_0_1px_0_rgba(255,255,255,0.25)]">
                  <p className="font-mono text-[10px] text-blue-100 uppercase tracking-widest">
                    ТО в базе
                  </p>
                  <p className="mt-2 text-2xl font-light tracking-tight text-white">
                    45 000 ₽
                  </p>
                  <p className="mt-1 text-xs text-blue-100 font-light">
                    общая сумма затрат
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
