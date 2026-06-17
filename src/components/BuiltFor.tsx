import { ArrowRight, Briefcase, Lock, UserCheck, Rocket, SquarePen, Wand2 } from "lucide-react";
import React from "react";

export default function BuiltFor() {
  return (
    <section id="built-for" className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center max-w-5xl mx-auto mb-14 font-sans">
        <p className="font-mono text-xs font-medium tracking-[-0.04em] text-blue-500 mb-4">
          Для кого создан сервис
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl mx-auto">
          Создан для тех, кто хочет
          <span className="block">порядка в обслуживании авто</span>
        </h2>
        <p className="mt-6 text-base md:text-lg leading-8 text-slate-600 font-light max-w-3xl mx-auto">
          Пробибику помогает структурировать расходы и историю ремонта — от
          семейного автомобиля до коммерческого автопарка
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/login"
            className="inline-flex items-center gap-2 justify-center rounded-full px-6 py-3.5 text-sm font-normal text-white bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 shadow-[0_10px_24px_rgba(59,130,246,0.26),inset_0_1px_0_rgba(255,255,255,0.35)] hover:from-blue-400 hover:to-blue-500 hover:-translate-y-0.5 transition-all duration-300"
          >
            Начать бесплатно
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-normal text-slate-700 bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-[0_6px_16px_rgba(15,23,42,0.06),inset_0_1px_0_white] hover:from-slate-50 hover:to-slate-100 hover:-translate-y-0.5 transition-all duration-300"
          >
            Как это работает
          </a>
        </div>
      </div>

      {/* Use Case Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 font-sans">
        {/* Card 01 — Автовладельцы */}
        <article className="group bg-white/70 rounded-[2rem] border border-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.34),inset_0_1px_0_white] overflow-hidden hover:-translate-y-1 hover:bg-white/88 transition-all duration-300">
          {/* Visual Panel */}
          <div className="relative isolate mx-4 mt-4 rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-white to-slate-100 border border-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.28),inset_0_1px_0_white] min-h-[13rem]">
            {/* Texture + Glow */}
            <div
              className="absolute inset-0 z-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
                backgroundSize: "1.5rem 1.5rem",
              }}
            />
            <div className="absolute top-[-35%] right-[-20%] z-0 w-[14rem] h-[14rem] rounded-full bg-blue-200/55 blur-[4rem] pointer-events-none" />

            {/* Mini UI */}
            <div className="relative z-10 p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                </div>
                <span className="font-mono text-[10px] text-slate-400">
                  АВТОЛЮБИТЕЛЬ
                </span>
              </div>

              <div className="rounded-2xl bg-white text-slate-900 border border-slate-200 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_0_white]">
                <p className="text-xs text-slate-400 font-light font-sans">
                  Ближайшие работы
                </p>
                <p className="mt-1 text-xl font-normal tracking-tight text-slate-950 font-sans">
                  Машина обслужена
                </p>
                <div className="mt-4 space-y-2 font-sans">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Замена масла через 1 200 км
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Проверить тормозные колодки
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Оплачен налог на ТС
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                <Rocket className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-normal tracking-tight text-slate-950">
                  Владельцы автомобилей
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
                  Забудьте о кипах бумаг в бардачке. Оцифруйте сервисную историю,
                  контролируйте износ деталей и продавайте автомобиль дороже с
                  подтвержденным отчетом
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-[11px] text-blue-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Порядок в автоистории без усилий
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 02 — Автопарки */}
        <article className="group relative bg-gradient-to-b from-blue-400 to-blue-600 rounded-[2rem] border border-blue-700 shadow-[0_24px_60px_-30px_rgba(59,130,246,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] overflow-hidden hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-[-35%] right-[-20%] w-[18rem] h-[18rem] rounded-full bg-white/25 blur-[4rem] pointer-events-none" />
          <div className="absolute bottom-[-40%] left-[-25%] w-[16rem] h-[16rem] rounded-full bg-sky-200/20 blur-[4rem] pointer-events-none" />

          {/* Visual Panel */}
          <div className="relative mx-4 mt-4 rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600 border border-blue-700 shadow-[0_18px_42px_-24px_rgba(59,130,246,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] min-h-[13rem]">
            <div className="absolute top-[-35%] right-[-20%] w-[14rem] h-[14rem] rounded-full bg-white/24 blur-[4rem] pointer-events-none" />
            <div className="absolute bottom-[-40%] left-[-25%] w-[14rem] h-[14rem] rounded-full bg-blue-900/16 blur-[4rem] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
                backgroundSize: "1.35rem 1.35rem",
              }}
            />

            {/* Mini UI */}
            <div className="relative p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] text-blue-100">
                  АВТОПАРК (5 ТС)
                </span>
                <div className="w-9 h-9 rounded-xl bg-white/90 border border-white flex items-center justify-center shadow-[0_8px_18px_-12px_rgba(15,23,42,0.35),inset_0_1px_0_white]">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              <div className="space-y-3 font-sans">
                {/* Meeting Prep */}
                <div className="rounded-[1.35rem] bg-white/95 border border-white p-4 shadow-[0_12px_28px_-18px_rgba(15,23,42,0.26),inset_0_1px_0_white]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-normal text-slate-900">
                        Сметы проверены
                      </p>
                      <p className="mt-1 text-xs text-slate-400 font-light">
                        Дубликаты работ исключены
                      </p>
                    </div>
                    <span className="text-xs text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2 py-1">
                      активно
                    </span>
                  </div>
                </div>

                {/* Focus Window */}
                <div className="rounded-[1.35rem] bg-blue-500/32 text-white border border-white/20 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-blue-100 font-light">
                        Бюджет на ТО (июнь)
                      </p>
                      <p className="mt-1 text-2xl font-light tracking-tight text-white">
                        42 000 ₽
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-white/90 border border-white flex items-center justify-center shadow-[inset_0_1px_0_white]">
                      <Lock className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-white/16 border border-white/20 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-normal tracking-tight text-white">
                  Коммерческие автопарки
                </h3>
                <p className="mt-3 text-sm leading-6 text-blue-50/90 font-light">
                  Контролируйте затраты водителей на ремонт, выявляйте переплаты в
                  сторонних автосервисах и планируйте бюджет на обслуживание парка
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/16 border border-white/20 px-3 py-1.5 text-[11px] text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Ваш автопарк под полным контролем
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Card 03 — Покупатели б/у авто */}
        <article className="group bg-white/70 rounded-[2rem] border border-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.34),inset_0_1px_0_white] overflow-hidden hover:-translate-y-1 hover:bg-white/88 transition-all duration-300">
          {/* Visual Panel */}
          <div className="relative mx-4 mt-4 rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-white to-slate-100 border border-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.28),inset_0_1px_0_white] min-h-[13rem]">
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
                backgroundSize: "1.5rem 1.5rem",
              }}
            />
            <div className="absolute top-[-30%] left-[-18%] z-0 w-[14rem] h-[14rem] rounded-full bg-sky-200/42 blur-[3.75rem] pointer-events-none" />

            {/* Mini UI */}
            <div className="relative p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] text-slate-400">
                  ПРОВЕРКА ИСТОРИИ
                </span>
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <SquarePen className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              <div className="rounded-2xl bg-white text-slate-900 border border-slate-200 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_0_white]">
                <p className="text-xs text-slate-400 font-light font-sans">
                  Анализ б/у машины
                </p>
                <p className="mt-1 text-xl font-normal tracking-tight text-slate-950 font-sans">
                  Чеки проверены
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 font-mono">
                  <div className="rounded-xl bg-blue-50 border border-blue-100 px-3 py-2 text-center">
                    <p className="text-lg font-light text-blue-600">8</p>
                    <p className="text-[10px] text-blue-500">сервисов</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-center">
                    <p className="text-lg font-light text-slate-900">45</p>
                    <p className="text-[10px] text-slate-400">деталей</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-center">
                    <p className="text-lg font-light text-slate-900">100%</p>
                    <p className="text-[10px] text-slate-400">пробег</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                <Wand2 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-normal tracking-tight text-slate-950">
                  Покупатели б/у авто
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
                  Оцифруйте и проверьте кипу чеков от предыдущего владельца, чтобы
                  убедиться в реальности пробега, узнать даты замен и составить
                  смету будущих ТО
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-[11px] text-blue-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Честная сделка без сюрпризов
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>


    </section>
  );
}
