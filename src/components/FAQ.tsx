import { Icon } from "@iconify/react";
import React from "react";

export default function FAQ() {
  return (
    <section id="faq" className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Intro */}
      <div className="text-center max-w-3xl mx-auto mb-14 font-sans">
        <p className="font-mono text-xs font-medium tracking-[-0.04em] text-blue-500 mb-4">
          FAQ
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.05]">
          Частые вопросы
          <span className="block">Простые ответы</span>
        </h2>
        <p className="mt-6 text-base md:text-lg leading-8 text-slate-600 font-light">
          Все, что нужно знать о распознавании авточеков, защите ваших данных и
          прогнозировании сроков технического обслуживания.
        </p>
      </div>

      {/* FAQ Shell */}
      <div className="relative overflow-hidden rounded-[2.75rem] bg-white/60 backdrop-blur-xl border border-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,1)] p-4 md:p-6 lg:p-8">
        {/* Soft Background Glows */}
        <div className="absolute top-[-35%] left-[-10%] w-[34rem] h-[34rem] rounded-full bg-blue-200/35 blur-[6rem] pointer-events-none" />
        <div className="absolute bottom-[-40%] right-[-10%] w-[32rem] h-[32rem] rounded-full bg-sky-200/22 blur-[6rem] pointer-events-none" />

        {/* Dot Texture */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0)",
            backgroundSize: "2rem 2rem",
          }}
        />

        <div className="relative grid lg:grid-cols-[0.82fr_1.18fr] gap-6 lg:gap-8 items-start">
          {/* Left Support Card */}
          <div className="rounded-[2.25rem] bg-gradient-to-b from-[#1d2a3d] to-[#131c2b] text-white border border-white/10 p-6 md:p-8 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.62),inset_0_1px_0_rgba(255,255,255,0.13)] overflow-hidden relative">
            {/* Inner Texture */}
            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />

            {/* Soft Glow */}
            <div className="absolute top-[-35%] right-[-25%] w-[18rem] h-[18rem] rounded-full bg-blue-400/18 blur-[4.5rem] pointer-events-none" />
            <div className="absolute bottom-[-35%] left-[-20%] w-[16rem] h-[16rem] rounded-full bg-sky-200/10 blur-[4rem] pointer-events-none" />

            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] mb-8">
                <Icon
                  icon="solar:question-circle-linear"
                  style={{ strokeWidth: 1.5 }}
                  className="text-2xl text-blue-200"
                />
              </div>

              <p className="font-mono text-xs font-medium tracking-[-0.04em] text-blue-200 mb-4">
                ЕСТЬ ВОПРОСЫ?
              </p>

              <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-white leading-[1.08] font-sans">
                Учет без лишней
                <span className="block">рутины</span>
              </h3>

              <p className="mt-5 text-sm md:text-base leading-7 text-slate-300 font-light font-sans">
                Пробибику разработан, чтобы избавить вас от бумажного хаоса.
                Загружайте чеки, а система сама разберет номенклатуру запчастей и
                распределит расходы по категориям
              </p>

              <div className="mt-8 grid gap-3 font-sans">
                <div className="rounded-2xl bg-white/[0.07] border border-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex items-center gap-3">
                    <Icon
                      icon="solar:shield-check-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-200"
                    />
                    <span className="text-sm text-white font-normal">
                      Приватность и шифрование VIN
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.07] border border-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex items-center gap-3">
                    <Icon
                      icon="solar:document-text-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-200"
                    />
                    <span className="text-sm text-white font-normal">
                      Оцифровка смет, чеков и накладных
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.07] border border-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex items-center gap-3">
                    <Icon
                      icon="solar:restart-circle-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-200"
                    />
                    <span className="text-sm text-white font-normal">
                      Сброс или экспорт архива
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-white text-slate-950 text-sm font-normal border border-white shadow-[inset_0_1px_0_white] hover:bg-slate-100 hover:-translate-y-0.5 transition-all"
                >
                  Начать бесплатно
                  <Icon
                    icon="solar:arrow-right-linear"
                    style={{ strokeWidth: 1.5 }}
                    className="text-lg"
                  />
                </a>
                <a
                  href="#privacy"
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 bg-white/[0.07] text-white text-sm font-normal border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/[0.1] transition-all"
                >
                  Безопасность
                </a>
              </div>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3 font-sans">
            {/* FAQ 01 */}
            <details className="group rounded-[2rem] bg-white/72 border border-white shadow-[0_14px_34px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] overflow-hidden open:bg-white/90 transition-all">
              <summary className="cursor-pointer list-none px-5 md:px-6 py-5 flex items-center justify-between gap-5 select-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                    <Icon
                      icon="solar:chat-round-like-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-500"
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-normal tracking-tight text-slate-950">
                    Чем Пробибику отличается от обычных таблиц расходов?
                  </h3>
                </div>
                <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex items-center justify-center shadow-[0_4px_10px_rgba(15,23,42,0.05),inset_0_1px_0_white]">
                  <Icon
                    icon="solar:add-circle-linear"
                    style={{ strokeWidth: 1.5 }}
                    className="text-xl text-slate-505 group-open:rotate-45 transition-transform"
                  />
                </div>
              </summary>
              <div className="px-5 md:px-6 pb-6 md:pl-[5.75rem]">
                <p className="text-sm md:text-base leading-7 text-slate-600 font-light font-sans">
                  Вам не нужно вбивать расходы вручную. Пробибику сам считывает
                  запчасти, стоимость услуг и даты с фото чеков. Кроме того, он
                  анализирует реальный износ деталей и строит график ТО
                </p>
              </div>
            </details>

            {/* FAQ 02 */}
            <details className="group rounded-[2rem] bg-white/72 border border-white shadow-[0_14px_34px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] overflow-hidden open:bg-white/90 transition-all">
              <summary className="cursor-pointer list-none px-5 md:px-6 py-5 flex items-center justify-between gap-5 select-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                    <Icon
                      icon="solar:microphone-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-500"
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-normal tracking-tight text-slate-950">
                    Какие чеки и накладные я могу загружать?
                  </h3>
                </div>
                <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex items-center justify-center shadow-[0_4px_10px_rgba(15,23,42,0.05),inset_0_1px_0_white]">
                  <Icon
                    icon="solar:add-circle-linear"
                    style={{ strokeWidth: 1.5 }}
                    className="text-xl text-slate-505 group-open:rotate-45 transition-transform"
                  />
                </div>
              </summary>
              <div className="px-5 md:px-6 pb-6 md:pl-[5.75rem]">
                <p className="text-sm md:text-base leading-7 text-slate-600 font-light font-sans">
                  Вы можете фотографировать бумажные чеки из любых
                  автосервисов, загружать PDF-документы от официальных дилеров, а
                  также квитанции за покупку моторных масел и запчастей
                </p>
              </div>
            </details>

            {/* FAQ 03 */}
            <details className="group rounded-[2rem] bg-white/72 border border-white shadow-[0_14px_34px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] overflow-hidden open:bg-white/90 transition-all">
              <summary className="cursor-pointer list-none px-5 md:px-6 py-5 flex items-center justify-between gap-5 select-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                    <Icon
                      icon="solar:devices-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-500"
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-normal tracking-tight text-slate-950">
                    Работает ли Пробибику на смартфонах?
                  </h3>
                </div>
                <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex items-center justify-center shadow-[0_4px_10px_rgba(15,23,42,0.05),inset_0_1px_0_white]">
                  <Icon
                    icon="solar:add-circle-linear"
                    style={{ strokeWidth: 1.5 }}
                    className="text-xl text-slate-505 group-open:rotate-45 transition-transform"
                  />
                </div>
              </summary>
              <div className="px-5 md:px-6 pb-6 md:pl-[5.75rem]">
                <p className="text-sm md:text-base leading-7 text-slate-600 font-light font-sans">
                  Да. Наш веб-интерфейс полностью адаптирован под мобильные
                  экраны. Вы можете открыть сайт прямо на парковке сервиса,
                  сфотографировать чек и сразу загрузить его
                </p>
              </div>
            </details>

            {/* FAQ 04 */}
            <details className="group rounded-[2rem] bg-white/72 border border-white shadow-[0_14px_34px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] overflow-hidden open:bg-white/90 transition-all">
              <summary className="cursor-pointer list-none px-5 md:px-6 py-5 flex items-center justify-between gap-5 select-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                    <Icon
                      icon="solar:sun-2-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-500"
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-normal tracking-tight text-slate-950">
                    Как ИИ прогнозирует регламентные работы?
                  </h3>
                </div>
                <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex items-center justify-center shadow-[0_4px_10px_rgba(15,23,42,0.05),inset_0_1px_0_white]">
                  <Icon
                    icon="solar:add-circle-linear"
                    style={{ strokeWidth: 1.5 }}
                    className="text-xl text-slate-505 group-open:rotate-45 transition-transform"
                  />
                </div>
              </summary>
              <div className="px-5 md:px-6 pb-6 md:pl-[5.75rem]">
                <p className="text-sm md:text-base leading-7 text-slate-600 font-light font-sans">
                  AI-модель сопоставляет марку автомобиля и пробеги с официальной
                  сеткой ТО от автопроизводителя. Также анализируются даты прошлых
                  замен жидкостей и колодок, чтобы заранее предупредить о скором ТО
                </p>
              </div>
            </details>

            {/* FAQ 05 */}
            <details className="group rounded-[2rem] bg-white/72 border border-white shadow-[0_14px_34px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] overflow-hidden open:bg-white/90 transition-all">
              <summary className="cursor-pointer list-none px-5 md:px-6 py-5 flex items-center justify-between gap-5 select-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                    <Icon
                      icon="solar:shield-check-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-500"
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-normal tracking-tight text-slate-950">
                    Безопасны ли мои VIN-данные и чеки?
                  </h3>
                </div>
                <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex items-center justify-center shadow-[0_4px_10px_rgba(15,23,42,0.05),inset_0_1px_0_white]">
                  <Icon
                    icon="solar:add-circle-linear"
                    style={{ strokeWidth: 1.5 }}
                    className="text-xl text-slate-505 group-open:rotate-45 transition-transform"
                  />
                </div>
              </summary>
              <div className="px-5 md:px-6 pb-6 md:pl-[5.75rem]">
                <p className="text-sm md:text-base leading-7 text-slate-600 font-light font-sans">
                  Да. Пробибику строго защищает ваши персональные данные и файлы
                  чеков. Смета и пробеги шифруются и не передаются автосервисам,
                  магазинам запчастей или другим лицам без вашего разрешения
                </p>
              </div>
            </details>

            {/* FAQ 06 */}
            <details className="group rounded-[2rem] bg-white/72 border border-white shadow-[0_14px_34px_-26px_rgba(15,23,42,0.32),inset_0_1px_0_white] overflow-hidden open:bg-white/90 transition-all">
              <summary className="cursor-pointer list-none px-5 md:px-6 py-5 flex items-center justify-between gap-5 select-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[inset_0_1px_0_white]">
                    <Icon
                      icon="solar:user-check-linear"
                      style={{ strokeWidth: 1.5 }}
                      className="text-xl text-blue-500"
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-normal tracking-tight text-slate-950">
                    Как автоотчет помогает повысить цену при продаже?
                  </h3>
                </div>
                <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200 flex items-center justify-center shadow-[0_4px_10px_rgba(15,23,42,0.05),inset_0_1px_0_white]">
                  <Icon
                    icon="solar:add-circle-linear"
                    style={{ strokeWidth: 1.5 }}
                    className="text-xl text-slate-505 group-open:rotate-45 transition-transform"
                  />
                </div>
              </summary>
              <div className="px-5 md:px-6 pb-6 md:pl-[5.75rem]">
                <p className="text-sm md:text-base leading-7 text-slate-600 font-light font-sans">
                  Покупателям б/у машин важно видеть честную сервисную историю.
                  Вместо слов «не бита, не крашена», вы показываете оцифрованный
                  профиль с реальными пробегами и чеками из автосервисов
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
