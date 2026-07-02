import { Upload, FileText, Target, ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Workflow() {
  return (
    <section id="workflow" className="max-w-7xl mx-auto px-6 py-20 font-sans">
      {/* Section Intro */}
      <div className="text-center max-w-5xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 rounded-full bg-white/60 border border-white/80 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] backdrop-blur-md text-xs font-semibold text-blue-500 tracking-normal mb-4 select-none">
          Как это работает
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl mx-auto font-sans">
          Четыре простых шага
          <span className="block">от бумажного чека до отчета</span>
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg leading-8 text-slate-600 font-light">
          Просто сфотографируйте чек автосервиса, а Пробибику оцифрует позиции,
          сохранит в понятную таблицу и никогда ничего не забудет
        </p>
      </div>

      {/* Timeline Shell */}
      <div className="relative overflow-hidden rounded-[2.75rem] bg-transparent sm:bg-white/55 backdrop-blur-none sm:backdrop-blur-xl border-transparent sm:border-white shadow-none sm:shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,1)] px-0 sm:px-6 md:px-10 pt-4 sm:pt-16 pb-6 sm:pb-12">
        {/* Soft background glows */}
        <div className="absolute top-[-35%] left-[10%] w-[32rem] h-[32rem] rounded-full bg-blue-200/35 blur-[6rem] pointer-events-none" />
        <div className="absolute bottom-[-35%] right-[5%] w-[30rem] h-[30rem] rounded-full bg-sky-200/22 blur-[6rem] pointer-events-none" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
            backgroundSize: "2rem 2rem",
          }}
        />

        {/* Timeline Area */}
        <div className="relative">
          {/* Animated Connection Line */}
          <div className="hidden lg:block absolute left-0 right-0 top-[3.05rem] h-px">
            <div className="absolute inset-x-12 top-0 border-t border-dashed border-blue-300/60" />
            <div className="absolute top-[-1px] left-12 h-[2px] w-52 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent rounded-full animate-[auraConnectionFlow_4.5s_linear_infinite]" />
          </div>

          {/* Premium Light Glow Behind Steps */}
          <div className="hidden lg:block pointer-events-none absolute top-4 left-1/2 h-20 w-full max-w-5xl -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-blue-300/35 to-transparent blur-2xl" />
          <div className="hidden lg:block pointer-events-none absolute top-7 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-sky-200/45 to-transparent blur-xl" />

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Step 01 */}
            <div className="group relative flex flex-col items-center text-center">
              {/* Number Circle */}
              <div className="h-24 w-full relative flex items-center justify-center">
                <span className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-white to-slate-100 border border-white shadow-[0_16px_34px_-20px_rgba(15,23,42,0.55),inset_0_1px_0_white]">
                  <span className="absolute inset-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 border border-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_rgba(59,130,246,0.28)]" />
                  <span className="relative font-mono text-sm font-semibold text-white">
                    01
                  </span>
                </span>
              </div>
              {/* Card */}
              <div className="mt-4 rounded-2xl bg-white/70 border border-white p-6 min-h-[15rem] shadow-[0_16px_36px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] group-hover:-translate-y-1 group-hover:bg-white/85 transition-all duration-300">
                <div className="w-11 h-11 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white] mb-5">
                  <Upload className="w-[21px] h-[21px] text-blue-500" />
                </div>
                <h3 className="text-xl font-normal tracking-tight text-slate-950 font-sans">
                  Фотографируете чек
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
                  Прямо в сервисе или дома — просто наведите камеру
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-[11px] text-blue-600 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Загрузка за секунды
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="group relative flex flex-col items-center text-center">
              {/* Number Circle */}
              <div className="h-24 w-full relative flex items-center justify-center">
                <span className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-white to-slate-100 border border-white shadow-[0_16px_34px_-20px_rgba(15,23,42,0.55),inset_0_1px_0_white]">
                  <span className="absolute inset-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 border border-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_rgba(59,130,246,0.28)]" />
                  <span className="relative font-mono text-sm font-semibold text-white">
                    02
                  </span>
                </span>
              </div>
              {/* Card */}
              <div className="mt-4 rounded-2xl bg-white/70 border border-white p-6 min-h-[15rem] shadow-[0_16px_36px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] group-hover:-translate-y-1 group-hover:bg-white/85 transition-all duration-300">
                <div className="w-11 h-11 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white] mb-5">
                  <FileText className="w-[21px] h-[21px] text-blue-500" />
                </div>
                <h3 className="text-xl font-normal tracking-tight text-slate-950 font-sans">
                  Мы читаем его за вас
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
                Запчасти, стоимость, дата и пробег появляется в истории автоматически
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-[11px] text-blue-600 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Детализация готова
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="group relative flex flex-col items-center text-center">
              {/* Number Circle */}
              <div className="h-24 w-full relative flex items-center justify-center">
                <span className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-white to-slate-100 border border-white shadow-[0_16px_34px_-20px_rgba(15,23,42,0.55),inset_0_1px_0_white]">
                  <span className="absolute inset-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 border border-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_rgba(59,130,246,0.28)]" />
                  <span className="relative font-mono text-sm font-semibold text-white">
                    03
                  </span>
                </span>
              </div>
              {/* Card */}
              <div className="mt-4 rounded-2xl bg-white/70 border border-white p-6 min-h-[15rem] shadow-[0_16px_36px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] group-hover:-translate-y-1 group-hover:bg-white/85 transition-all duration-300">
                <div className="w-11 h-11 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white] mb-5">
                  <Target className="w-[21px] h-[21px] text-blue-500" />
                </div>
                <h3 className="text-xl font-normal tracking-tight text-slate-950 font-sans">
                  Получаете напоминания вовремя
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
                  Пробибику сам считает когда пора на следующее ТО и предупреждает заранее
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-[11px] text-blue-600 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Анализ завершен
                </div>
              </div>
            </div>

            {/* Step 04 */}
            <div className="group relative flex flex-col items-center text-center">
              {/* Number Circle */}
              <div className="h-24 w-full relative flex items-center justify-center">
                <span className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-white to-slate-100 border border-white shadow-[0_16px_34px_-20px_rgba(15,23,42,0.55),inset_0_1px_0_white]">
                  <span className="absolute inset-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 border border-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_rgba(59,130,246,0.28)]" />
                  <span className="relative font-mono text-sm font-semibold text-white">
                    04
                  </span>
                </span>
              </div>
              {/* Card */}
              <div className="mt-4 rounded-2xl bg-white/70 border border-white p-6 min-h-[15rem] shadow-[0_16px_36px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] group-hover:-translate-y-1 group-hover:bg-white/85 transition-all duration-300">
                <div className="w-11 h-11 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white] mb-5">
                  <ClipboardList className="w-[21px] h-[21px] text-blue-500" />
                </div>
                <h3 className="text-xl font-normal tracking-tight text-slate-950 font-sans">
                  Знаете что и когда делать дальше
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
                  Вся история машины и сколько вы уже потратили — в одном месте
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-[11px] text-blue-600 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Автоотчет сформирован
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-12 flex flex-col sm:flex-row justify-center items-center gap-3">
          <a
            href="#features"
            className="w-full sm:w-64 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-b from-white to-slate-50 border border-slate-200 text-slate-700 text-sm font-normal shadow-[0_6px_16px_rgba(15,23,42,0.06),inset_0_1px_0_white] hover:from-slate-50 hover:to-slate-100 hover:-translate-y-0.5 transition-all duration-300"
          >
            Возможности сервиса
          </a>
          <Link
            href="/login"
            className="w-full sm:w-64 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal shadow-[0_10px_24px_rgba(59,130,246,0.26),inset_0_1px_0_rgba(255,255,255,0.35)] hover:from-blue-400 hover:to-blue-500 hover:-translate-y-0.5 transition-all duration-300"
          >
            Попробовать бесплатно
            <ArrowRight className="w-[18px] h-[18px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
