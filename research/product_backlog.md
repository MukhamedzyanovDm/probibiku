# Детализированный Беклог "АвтоЛог" (Roadmap)

## Milestone 0: Основание (Infrastructure & Auth)
- [ ] **Setup Project:** Next.js, TypeScript, Tailwind, Drizzle ORM (P0).
- [ ] **Database Migration:** Базовые таблицы `users`, `vehicles`, `service_records` (P0).
- [ ] **Auth Layer:** Интеграция NextAuth (Яндекс + Email OTP) (P0).
- [ ] **Cloud Storage:** Интеграция с Yandex S3 для загрузки файлов (P0).

## Milestone 1: Ядро продукта (The OCR Core Loop)
- [ ] **Upload Flow:** Компонент загрузки фото с мобильного/десктопа (P0).
- [ ] **OCR Engine Integration:** Связка Yandex Vision + YandexGPT (P0).
- [ ] **Data Refinement UI:** Интерфейс проверки и ручной правки распознанных данных (P0).
- [ ] **Basic Record Save:** Сохранение записи в БД с привязкой к авто (P0).

## Milestone 2: Гараж и Таймлайн (User Experience)
- [ ] **Garage Management:** Добавление/редактирование авто (Марка, Модель, VIN) (P1).
- [ ] **Service Timeline:** Красивая лента обслуживания с фильтрами по дате/пробегу (P1).
- [ ] **Receipt Viewer:** Просмотр оригинала чека прямо из записи (P1).
- [ ] **Vehicle Stats:** Краткая сводка: общий пробег, дата последнего ТО (P1).

## Milestone 3: Аналитика и Польза (Value Added)
- [ ] **Work Items Detail:** Разбивка записи на отдельные работы и запчасти (P1).
- [ ] **Cost Analytics:** Графики расходов по категориям (P2).
- [ ] **Maintenance Prediction:** Прогноз следующего ТО на основе среднего пробега (P2).
- [ ] **Digital History Transfer:** Экспорт истории в JSON для передачи новому владельцу (импорт в его ЛК) (P1).
- [ ] **Bulk Data Import:** Импорт из сторонних источников (Excel, Google Sheets, цифровые PDF-чеки) (P1).
- [ ] **Export for Sale:** Генерация PDF/Публичной ссылки для продажи авто (P2).

## Milestone 4: Масштабирование и Рост
- [ ] **Multi-car Support:** Управление несколькими авто в одном профиле (P2).
- [ ] **Notifications:** Пуши о предстоящем ТО/Страховке (P3).
- [ ] **Public Profile:** Визитка автомобиля с подтвержденной историей (P3).
