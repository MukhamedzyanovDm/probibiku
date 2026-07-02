import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  Bell,
  FileText,
  Calendar,
  MessageSquare,
  ClipboardList,
  Lock,
  ShieldCheck
} from "lucide-react";
import React from "react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-20">
      <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center">
        {/* Hero Copy */}
        <div className="text-center lg:text-left min-w-0">
          {/* Hero Label */}
          <div className="inline-flex items-center gap-2 mb-8 select-none">
            <span className="w-7 h-7 rounded-full bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-[inset_0_1px_0_white] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-500" />
            </span>
            <span className="font-mono text-xs font-medium tracking-[-0.04em] text-slate-500">
              Умный помощник автовладельца
            </span>
          </div>

          {/* Hero Headline */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl font-sans"
            style={{ textShadow: "0 1px 1px rgba(255,255,255,0.8)" }}
          >
            <span className="block">Вы помните сколько потратили на машину в этом году?</span>
            </h1>

          <p className="mt-8 text-base md:text-lg leading-8 text-slate-600 font-light max-w-2xl mx-auto lg:mx-0">
          Больше никаких «ой, а когда там масло меняли?». Просто сфотографируйте чек из автосервиса, а Пробибику запомнит всё сам и вовремя скажет, что нужно сделать дальше
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <a
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-700 text-white text-sm font-normal shadow-[0_10px_24px_rgba(59,130,246,0.26),inset_0_1px_0_rgba(255,255,255,0.35)] hover:from-blue-400 hover:to-blue-500 hover:-translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)] transition-all duration-300"
            >
              Попробовать бесплатно
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-b from-white to-slate-50 border border-slate-200 text-slate-700 text-sm font-normal shadow-[0_4px_12px_rgba(15,23,42,0.05),inset_0_1px_0_white] hover:from-slate-50 hover:to-slate-100 hover:-translate-y-0.5 transition-all duration-300"
            >
              <PlayCircle className="w-5 h-5 text-blue-500" />
              Как это работает
            </a>
          </div>

          {/* Social Proof Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* Avatar Stack */}
            <div className="flex -space-x-2.5">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Пользователь"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Пользователь"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Пользователь"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Пользователь"
              />
            </div>
            {/* Caption */}
            <p className="text-xs text-slate-500 font-light font-sans text-center lg:text-left">
              <span className="font-semibold text-slate-900">1 013 ответственных автовладельцев</span> уже контролируют свои расходы с нами
            </p>
          </div>
        </div>

        {/* Hero Product Mockup */}
        <div className="relative lg:pl-4 min-w-0">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-200/40 via-white/20 to-sky-200/30 blur-3xl" />

          <div className="relative">
            {/* Floating Bubble Stack / Asymmetric Orbit */}
            <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
              {/* Bubble 01 — Top Right */}
              <div className="aura-float-bubble absolute -right-7 top-10 rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45),inset_0_1px_0_white] min-w-[12rem]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-normal">
                      Обнаружен износ ГРМ
                    </p>
                    <p className="text-xs text-slate-400 font-light">
                      Замена через 3 500 км
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble 02 — Mid Right */}
              <div className="aura-float-bubble absolute -right-7 top-[35%] rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45),inset_0_1px_0_white] min-w-[12rem]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-normal font-sans">
                      Чек оцифрован
                    </p>
                    <p className="text-xs text-slate-400 font-light">
                      3 запчасти внесены в базу
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble 03 — Lower Right */}
              <div className="aura-float-bubble absolute -right-7 bottom-[26%] rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45),inset_0_1px_0_white] min-w-[12rem]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-normal">
                      Запланировано ТО
                    </p>
                    <p className="text-xs text-slate-400 font-light">
                      Суббота, замена масла
                    </p>
                  </div>
                </div>
              </div>

              {/* Bubble 04 — Bottom Left */}
              <div className="aura-float-bubble absolute left-8 -bottom-6 rounded-2xl bg-white/90 backdrop-blur border border-white px-4 py-3 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.45),inset_0_1px_0_white] min-w-[12rem]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-normal">
                      Смета проверена
                    </p>
                    <p className="text-xs text-slate-400 font-light">
                      Завышений цен не найдено
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35),inset_0_1px_0_white] overflow-hidden">
              {/* Mockup Top Bar */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="font-mono text-xs text-slate-400 tracking-[-0.05em]">
                  СВОДКА АВТОМОБИЛЯ
                </div>
              </div>

              {/* Mockup Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-400 font-light mb-1">Сегодня</p>
                    <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-slate-900">
                      Ваша аналитика готова
                    </h2>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-[inset_0_1px_0_white]">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                <div className="grid gap-3">
                  {/* Animated Product Card */}
                  <div className="aura-hero-card rounded-2xl bg-white border border-slate-200 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_0_white]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-normal text-slate-800">
                          Распознан чек
                        </p>
                        <p className="text-xs leading-5 text-slate-500 mt-1 font-light">
                          “Замена передних тормозных колодок и дисков в автосервисе 'АвтоКлуб'”
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Animated Product Card */}
                  <div className="aura-hero-card rounded-2xl bg-white border border-slate-200 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_0_white]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-normal text-slate-800">
                            Рекомендации AI
                          </p>
                          <span className="text-xs text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2 py-1">
                            2 важно
                          </span>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            Проверить износ тормозных дисков к осени
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            Заменить тормозную жидкость (срок 2 года)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Cards */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {/* Focus Window */}
                    <div className="aura-hero-card relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-slate-200 text-slate-900 border border-blue-100 p-4 shadow-[0_12px_28px_-16px_rgba(59,130,246,0.24),inset_0_1px_0_white]">
                      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-300/30 blur-2xl pointer-events-none" />
                      <div className="relative flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" />
                            <p className="text-xs text-slate-500 font-light">
                              Ближайшее ТО
                            </p>
                          </div>
                          <p className="mt-2 text-2xl font-light tracking-tight text-slate-950">
                            через 1 500 км
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-white/80 border border-white flex items-center justify-center shadow-[inset_0_1px_0_white]">
                          <Lock className="w-4 h-4 text-blue-500" />
                        </div>
                      </div>
                      <div className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-white px-2.5 py-1 text-[10px] text-slate-500 shadow-[inset_0_1px_0_white]">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                        Замена моторного масла
                      </div>
                    </div>

                    {/* Suggested Reply */}
                    <div className="aura-hero-card rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 text-white border border-blue-700 p-4 shadow-[0_10px_24px_-14px_rgba(59,130,246,0.55),inset_0_1px_0_rgba(255,255,255,0.30)]">
                      <p className="text-xs text-blue-100 font-light">
                        Всего расходов
                      </p>
                      <p className="mt-2 text-xl font-normal leading-5">
                        28 500 ₽
                      </p>
                      <p className="mt-1 text-xs text-blue-100 font-light">
                        потрачено за этот месяц
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
