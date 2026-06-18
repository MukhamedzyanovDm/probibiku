import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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
                  Безопасность данных
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-slate-950 leading-[1.1]">
                  Политика конфиденциальности
                </h1>
                <p className="mt-4 text-sm text-slate-500">
                  Последнее обновление: 17 июня 2026 г.
                </p>
              </div>

              {/* Legal Text Placeholder */}
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm md:text-base space-y-6">
                <p>
                  Настоящая Политика конфиденциальности описывает, как сервис ПРОБИБИКУ (далее — «Сервис», «мы») собирает, использует, хранит и защищает информацию, полученную от пользователей (далее — «Пользователь», «вы») при использовании нашего веб-сайта и связанных услуг.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  1. Собираемые данные
                </h2>
                <p>
                  Мы собираем только те данные, которые необходимы для полноценного функционирования Сервиса и оцифровки вашей автоистории:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Информация профиля:</strong> адрес электронной почты, номер телефона, а также данные авторизации (через Яндекс ID или Email OTP).</li>
                  <li><strong>Данные автомобилей:</strong> марка, модель, год выпуска, VIN-номер, государственный регистрационный знак и текущий пробег.</li>
                  <li><strong>Документы об обслуживании:</strong> загружаемые фотографии заказ-нарядов, смет, чеков и актов выполненных работ.</li>
                  <li><strong>Распознанный текст:</strong> информация о видах работ, артикулах использованных запчастей, их количестве и стоимости.</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  2. Как мы используем информацию
                </h2>
                <p>
                  Собранная информация используется исключительно в целях предоставления услуг Сервиса:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Оцифровка загруженных чеков с использованием технологий распознавания символов (OCR) и искусственного интеллекта.</li>
                  <li>Создание единого защищенного архива истории обслуживания ваших транспортных средств.</li>
                  <li>Прогнозирование регламентных работ (замена масла, фильтров, ГРМ) на основе истории и среднего пробега.</li>
                  <li>Коммуникация с вами касательно обновлений Сервиса, критических напоминаний о ТО или безопасности.</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  3. Хранение и безопасность данных
                </h2>
                <p>
                  Все загружаемые файлы (фотографии чеков) безопасно сохраняются в приватном объектном хранилище Yandex Cloud Object Storage. Доступ к оригинальным изображениям третьих лиц исключен. Мы применяем современные методы шифрования для защиты передаваемой и хранимой информации.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  4. Передача данных третьим лицам
                </h2>
                <p>
                  Мы не продаем, не обмениваем и не передаем ваши личные данные третьим лицам. Исключение составляют случаи, когда это явно требуется по закону Российской Федерации, либо когда вы самостоятельно делитесь публичной ссылкой на историю вашего автомобиля при его продаже.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  5. Права пользователя
                </h2>
                <p>
                  Вы являетесь полноправным владельцем своей истории обслуживания. В личном кабинете вы можете в любой момент изменить любые данные, удалить некорректно распознанные сметы, а также полностью удалить свой профиль и все связанные с ним документы из базы данных Сервиса в один клик.
                </p>

                <h2 className="text-xl md:text-2xl font-normal text-slate-950 pt-4 border-t border-slate-100">
                  6. Контакты для связи
                </h2>
                <p>
                  Если у вас возникли вопросы касательно политики обработки данных или вы хотите направить запрос на удаление информации, пожалуйста, свяжитесь с нами по электронной почте: <span className="font-mono text-blue-600">privacy@probibiku.ru</span>
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
