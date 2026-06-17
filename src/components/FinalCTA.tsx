import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Database, RotateCcw } from "lucide-react";
import React from "react";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="max-w-7xl mx-auto px-6 pt-14 pb-20 font-sans">
      {/* Transition Copy Between FAQ + CTA */}
      <div className="relative text-center max-w-3xl mx-auto mb-10">
        <div className="absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-white/0 via-blue-100/20 to-transparent blur-2xl pointer-events-none" />
        <p className="relative font-mono text-xs font-medium tracking-[-0.04em] text-blue-500 mb-3">
          Шаг к порядку
        </p>
        <h2 className="relative text-3xl md:text-4xl font-normal tracking-tight text-slate-950 leading-[1.08]">
          Меньше бумажного хаоса
          <span className="block">Больше уверенности в авто</span>
        </h2>
        <p className="relative mt-4 text-sm md:text-base leading-7 text-slate-600 font-light">
          Пробибику берет на себя рутину: от оцифровки чеков до напоминаний о плановом ТО
        </p>
      </div>

      {/* Blue CTA Shell */}
      <div className="relative isolate overflow-hidden rounded-[2.75rem] bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-white border border-blue-700 shadow-[0_40px_90px_-45px_rgba(59,130,246,0.72),inset_0_1px_0_rgba(255,255,255,0.34)]">
        {/* Blue surface texture */}
        <div
          className="absolute inset-0 z-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "2rem 2rem",
          }}
        />

        {/* Blue depth glows */}
        <div className="absolute top-[-35%] left-[-12%] z-0 w-[34rem] h-[34rem] rounded-full bg-white/26 blur-[6rem] pointer-events-none" />
        <div className="absolute bottom-[-40%] right-[-12%] z-0 w-[32rem] h-[32rem] rounded-full bg-blue-900/18 blur-[6rem] pointer-events-none" />
        <div className="absolute top-[30%] left-[48%] z-0 w-[20rem] h-[20rem] rounded-full bg-sky-200/18 blur-[5rem] pointer-events-none" />

        {/* Floating Bubble: Top Left */}
        <div className="hidden md:block absolute left-10 top-12 z-20 rotate-[-5deg] animate-[auraFinalFloatOne_5.5s_ease-in-out_infinite]">
          <div className="rounded-2xl bg-white border border-white px-4 py-3 shadow-[0_28px_60px_-24px_rgba(15,23,42,0.52),inset_0_1px_0_white] min-w-[12.5rem]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-slate-900 font-normal">
                  График ТО готов
                </p>
                <p className="text-xs text-slate-500 font-light font-sans">
                  3 замены запланировано
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Bubble: Bottom Right */}
        <div className="hidden md:block absolute right-10 bottom-12 z-20 rotate-[5deg] animate-[auraFinalFloatTwo_6.25s_ease-in-out_infinite]">
          <div className="rounded-2xl bg-white border border-white px-4 py-3 shadow-[0_28px_60px_-24px_rgba(15,23,42,0.52),inset_0_1px_0_white] min-w-[12.5rem]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-slate-900 font-normal">
                  Чеки оцифрованы
                </p>
                <p className="text-xs text-slate-500 font-light font-sans">
                  Машина под контролем
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Content */}
        <div className="relative z-10 px-6 py-24 md:px-12 md:py-28 text-center font-sans">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/16 border border-white/20 px-3.5 py-2 mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.14)]" />
            <span className="font-mono text-xs font-medium tracking-[-0.04em] text-blue-50">
              КОНТРОЛЬ РАСХОДОВ И ТО В ОДНОМ КЛИКЕ
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.05] max-w-5xl mx-auto">
          Вы уже потратили на машину 
            <span className="block">больше чем помните</span>
          </h2>

          <p className="mt-6 text-base md:text-lg leading-8 text-blue-50/90 font-light max-w-3xl mx-auto">
            Пробибику поможет разобраться и больше не удивляться цифрам
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-gradient-to-b from-white to-blue-50 border border-white text-blue-600 text-sm font-normal shadow-[0_14px_30px_rgba(15,23,42,0.18),inset_0_1px_0_white] hover:from-white hover:to-white hover:-translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(15,23,42,0.08)] transition-all duration-300"
            >
              Попробовать бесплатно
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-white/14 border border-white/24 text-white text-sm font-normal shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Как это работает
            </a>
          </div>

          {/* Small Trust Row */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 text-xs text-blue-50/78 font-light">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white" />
              Конфиденциально
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
            <span className="inline-flex items-center gap-2">
              <Database className="w-4 h-4 text-white" />
              Управление данными
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-white" />
              Сброс в 1 клик
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
