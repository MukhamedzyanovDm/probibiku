"use client";
import { Icon } from "@iconify/react";

import React, { useState } from "react";

export default function Privacy() {
  const [rememberPreference, setRememberPreference] = useState(true);

  return (
    <section id="privacy" className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center max-w-5xl mx-auto mb-14 font-sans">
        <p className="font-mono text-xs font-medium tracking-[-0.04em] text-blue-500 mb-4">
          Безопасность и контроль
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05] max-w-5xl mx-auto">
          Ваш помощник должен знать историю авто.
          <span className="block">Но не владеть ей</span>
        </h2>
        <p className="mt-6 text-base md:text-lg leading-8 text-slate-600 font-light max-w-3xl mx-auto">
          Пробибику сохраняет ваши накладные и сметы конфиденциально. Вы
          остаетесь полным владельцем данных и управляете тем, что сохраняется,
          анализируется и переносится в историю
        </p>
      </div>

      {/* Light Privacy Workspace */}
      <div className="relative overflow-hidden rounded-[2.75rem] bg-white/60 backdrop-blur-xl border border-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,1)]">
        {/* Soft Hero-style Glows */}
        <div className="absolute top-[-35%] left-[-10%] w-[34rem] h-[34rem] rounded-full bg-blue-200/35 blur-[6rem] pointer-events-none" />
        <div className="absolute bottom-[-40%] right-[-10%] w-[32rem] h-[32rem] rounded-full bg-sky-200/24 blur-[6rem] pointer-events-none" />

        {/* Subtle Dot Texture */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
            backgroundSize: "2rem 2rem",
          }}
        />

        <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 p-6 md:p-10 lg:p-12">
          {/* Left Trust Copy */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs text-blue-600 font-light w-fit mb-7 shadow-[inset_0_1px_0_white]">
              <Icon
                icon="solar:shield-check-linear"
                style={{ strokeWidth: 1.5 }}
                className="text-base text-blue-500"
              />
              Конфиденциальный автопрофиль
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-[3.25rem] font-normal tracking-tight text-slate-950 leading-[1.08] max-w-2xl font-sans">
              История должна быть
              <span className="block sm:whitespace-nowrap">полезной, а не загадочной</span>
            </h3>

            <p className="mt-6 text-base leading-8 text-slate-600 font-light font-sans">
              Пробибику делает хранение автоистории прозрачным. Сохраняйте то, что
              требуется, убирайте дублирующиеся сметы и экспортируйте историю по
              требованию
            </p>

            {/* Trust Pills */}
            <div className="mt-9 flex flex-wrap gap-3 font-sans">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/72 border border-white px-4 py-2 text-xs text-slate-600 font-light shadow-[0_8px_20px_-16px_rgba(15,23,42,0.24),inset_0_1px_0_white]">
                <Icon
                  icon="solar:database-linear"
                  style={{ strokeWidth: 1.5 }}
                  className="text-base text-blue-500"
                />
                Контролируемые данные
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/72 border border-white px-4 py-2 text-xs text-slate-600 font-light shadow-[0_8px_20px_-16px_rgba(15,23,42,0.24),inset_0_1px_0_white]">
                <Icon
                  icon="solar:tuning-2-linear"
                  style={{ strokeWidth: 1.5 }}
                  className="text-base text-blue-500"
                />
                Настройка VIN-доступа
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/72 border border-white px-4 py-2 text-xs text-slate-600 font-light shadow-[0_8px_20px_-16px_rgba(15,23,42,0.24),inset_0_1px_0_white]">
                <Icon
                  icon="solar:restart-circle-linear"
                  style={{ strokeWidth: 1.5 }}
                  className="text-base text-blue-500"
                />
                Сброс при продаже
              </span>
            </div>
          </div>

          {/* Right Privacy Visual */}
          <div className="relative">
            {/* Main Privacy Panel */}
            <div className="relative isolate overflow-hidden rounded-[2.35rem] bg-gradient-to-b from-white to-slate-50 text-slate-900 border border-slate-200/80 p-5 md:p-6 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.42),0_10px_30px_-24px_rgba(15,23,42,0.24),inset_0_1px_0_white]">
              {/* Inner Light Glow */}
              <div className="absolute top-[-35%] right-[-20%] z-0 w-[22rem] h-[22rem] rounded-full bg-blue-200/45 blur-[4.5rem] pointer-events-none" />
              <div className="absolute bottom-[-40%] left-[-20%] z-0 w-[20rem] h-[20rem] rounded-full bg-sky-200/28 blur-[4rem] pointer-events-none" />

              <div className="relative z-10">
                {/* Browser Bar */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 tracking-[-0.04em]">
                    ЦЕНТР БЕЗОПАСНОСТИ
                  </span>
                </div>

                {/* Privacy Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-400 font-light mb-1">
                      Конфиденциальность истории
                    </p>
                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-slate-950 font-sans">
                      Вы управляете автоисторией
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                    <Icon
                      icon="solar:lock-keyhole-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-2xl text-blue-500"
                    />
                  </div>
                </div>

                {/* Memory Controls */}
                <div className="grid gap-3 font-sans">
                  {/* Control 01 */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 shadow-[inset_0_1px_0_white]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                          <Icon
                            icon="solar:check-circle-linear"
                            style={{ strokeWidth: 1.5 }}
                            className="text-lg text-blue-500"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-normal text-slate-900">
                            Запоминать характеристики деталей
                          </p>
                          <p className="mt-1 text-xs text-slate-400 font-light">
                            Для автоподбора совместимых запчастей
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setRememberPreference(!rememberPreference)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] ${
                          rememberPreference
                            ? "bg-gradient-to-b from-blue-500 to-blue-600 border-blue-700"
                            : "bg-slate-200 border-slate-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                            rememberPreference ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Control 02 */}
                  <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_0_white]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                          <Icon
                            icon="solar:clock-circle-linear"
                            style={{ strokeWidth: 1.5 }}
                            className="text-lg text-slate-600"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-normal text-slate-900">
                            Временное хранение смет
                          </p>
                          <p className="mt-1 text-xs text-slate-400 font-light">
                            Удалять изображения чеков после оцифровки
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1">
                        активно
                      </span>
                    </div>
                  </div>

                  {/* Control 03 */}
                  <div className="rounded-2xl bg-gradient-to-b from-blue-50 to-white text-slate-900 border border-blue-100 p-4 shadow-[0_12px_28px_-20px_rgba(59,130,246,0.28),inset_0_1px_0_white]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-[inset_0_1px_0_white]">
                          <Icon
                            icon="solar:shield-warning-linear"
                            style={{ strokeWidth: 1.5 }}
                            className="text-lg text-blue-500"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-normal text-slate-900">
                            Скрывать автоколонку
                          </p>
                          <p className="mt-1 text-xs text-slate-500 font-light">
                            Не передавать цены дилерам и автосервисам
                          </p>
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.12)]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Control Bar */}
                <div className="mt-4 rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.03),inset_0_1px_0_white]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-sans">
                    <div>
                      <p className="text-xs font-normal text-slate-900 font-sans">
                        Экспорт истории доступен в 1 клик
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400 font-light">
                        Скачивайте PDF-отчет или передавайте профиль при продаже.
                      </p>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-100 shadow-[inset_0_1px_0_white] hover:bg-blue-100 transition-colors">
                      Управление VIN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 md:p-8 pt-4 md:pt-2 font-sans">
          {/* Trust Card 01 */}
          <div className="relative overflow-hidden bg-white/78 border border-white rounded-[2rem] p-6 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.38),0_4px_14px_-12px_rgba(59,130,246,0.20),inset_0_1px_0_white]">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shadow-[inset_0_1px_0_white]">
              <Icon
                icon="solar:database-linear"
                style={{ strokeWidth: 1.5 }}
                className="text-2xl text-blue-500"
              />
            </div>
            <h3 className="text-lg font-normal tracking-tight text-slate-950">
              Ваши данные — ваши
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
            Сами решаете что добавить, что удалить и что оставить только для себя
            </p>
          </div>

          {/* Trust Card 02 */}
          <div className="relative overflow-hidden bg-white/78 border border-white rounded-[2rem] p-6 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.38),0_4px_14px_-12px_rgba(59,130,246,0.20),inset_0_1px_0_white]">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shadow-[inset_0_1px_0_white]">
              <Icon
                icon="solar:folder-security-linear"
                style={{ strokeWidth: 1.5 }}
                className="text-2xl text-blue-500"
              />
            </div>
            <h3 className="text-lg font-normal tracking-tight text-slate-950">
            Всё хранится надёжно
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
            Чеки и сметы зашифрованы и лежат в защищённом облаке. Не на чьём-то компьютере, не в таблице Excel
            </p>
          </div>

          {/* Trust Card 03 */}
          <div className="relative overflow-hidden bg-white/78 border border-white rounded-[2rem] p-6 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.38),0_4px_14px_-12px_rgba(59,130,246,0.20),inset_0_1px_0_white]">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shadow-[inset_0_1px_0_white]">
              <Icon
                icon="solar:tuning-2-linear"
                style={{ strokeWidth: 1.5 }}
                className="text-2xl text-blue-500"
              />
            </div>
            <h3 className="text-lg font-normal tracking-tight text-slate-950">
              Платите за то что используете
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-500 font-light">
              Никаких скрытых списаний. Только за реальное количество оцифровок или автомобилей в аккаунте
            </p>
          </div>

          {/* Trust Card 04 */}
          <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-[2rem] p-6 shadow-[0_16px_38px_-26px_rgba(59,130,246,0.28),inset_0_1px_0_white]">
            <div className="w-11 h-11 rounded-2xl bg-white border border-white flex items-center justify-center mb-5 shadow-[inset_0_1px_0_white]">
              <Icon
                icon="solar:trash-bin-minimalistic-linear"
                style={{ strokeWidth: 1.5 }}
                className="text-2xl text-blue-500"
              />
            </div>
            <h3 className="text-lg font-normal tracking-tight text-slate-950 font-sans">
              Захотели уйти — уходите
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 font-light">
            Удалить историю или аккаунт полностью можно в один клик. Без звонков в поддержку и «подождите 30 дней»
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
