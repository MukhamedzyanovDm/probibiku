import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Background />
      <Header />

      <main className="relative z-10 w-full flex-grow pt-32 pb-20 font-sans">
        <div className="max-w-4xl mx-auto px-6">
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-[2.75rem] bg-white/65 backdrop-blur-xl border border-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,1)] p-8 md:p-12 lg:p-16">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-30%] left-[-20%] w-[30rem] h-[30rem] rounded-full bg-blue-200/30 blur-[6rem] pointer-events-none" />
            <div className="absolute bottom-[-30%] right-[-20%] w-[30rem] h-[30rem] rounded-full bg-sky-200/20 blur-[6rem] pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="border-b border-slate-200/80 pb-8 mb-8">
                <p className="font-mono text-xs font-semibold tracking-[-0.04em] text-blue-500 mb-3 uppercase">
                  Правила сервиса
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.1]">
                  Условия использования
                </h1>
                <p className="mt-4 text-sm text-slate-500">
                  Последнее обновление: 17 июня 2026 г.
                </p>
              </div>

              {/* Legal Text Placeholder */}
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm md:text-base space-y-6">
                <p>
                  Добро пожаловать в сервис ПРОБИБИКУ (далее — «Сервис»). Перед началом использования функций Сервиса, пожалуйста, внимательно ознакомьтесь с настоящими Условиями использования (далее — «Условия»).
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  1. Согласие с Условиями
                </h2>
                <p>
                  Регистрируясь в Сервисе или используя его функции (включая загрузку чеков, добавление автомобилей), вы подтверждаете свое полное и безоговорочное согласие с настоящими Условиями. Если вы не согласны с какими-либо пунктами, вы должны немедленно прекратить использование Сервиса.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  2. Описание Сервиса
                </h2>
                <p>
                  ПРОБИБИКУ — это интеллектуальный ассистент для автовладельцев. Сервис предоставляет функционал для оцифровки заказ-нарядов автосервисов, ведения электронной сервисной книжки, аналитики расходов и прогнозирования предстоящего технического обслуживания на основе алгоритмов машинного обучения.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  3. Регистрация и безопасность аккаунта
                </h2>
                <p>
                  Для использования Сервиса требуется авторизация по электронной почте (через одноразовые коды Email OTP) или с использованием учетной записи Яндекс ID. Вы обязуетесь предоставлять достоверную контактную информацию и несете полную ответственность за сохранение конфиденциальности ваших данных доступа.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  4. Правила загрузки контента
                </h2>
                <p>
                  Вы имеете право загружать в Сервис только те документы (сметы, чеки, акты), которые относятся к обслуживанию принадлежащих вам автомобилей или автомобилей, обслуживание которых вы контролируете с согласия владельца. Запрещается загружать вредоносные файлы, изображения, не имеющие отношения к автомобильной тематике, или чужие персональные данные без согласия их субъекта.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  5. Ограничение ответственности
                </h2>
                <p>
                  Сервис предоставляется по принципу «как есть» (as is). Мы стремимся к максимальной точности оцифровки данных с помощью нейросетей, однако не несем ответственности за возможные неточности или ошибки распознавания сумм, наименований работ или пробега. Окончательная проверка оцифрованных данных всегда остается за Пользователем на этапе подтверждения.
                </p>
                <p>
                  Рекомендации и прогнозы ИИ касательно сроков замены деталей носят информационный характер и не заменяют официальные руководства по эксплуатации транспортных средств от заводов-изготовителей.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  6. Изменение Условий
                </h2>
                <p>
                  Мы оставляем за собой право изменять настоящие Условия в любое время. Изменения вступают в силу с момента их публикации на данной странице. Ваше дальнейшее использование Сервиса после публикации изменений означает согласие с новой редакцией Условий.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
