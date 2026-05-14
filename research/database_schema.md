# Архитектура БД и Инфраструктуры "АвтоЛог"

## 1. Схема базы данных (PostgreSQL)

### Таблица `users`
- `id`: uuid (PK)
- `email`: varchar (unique)
- `phone`: varchar
- `created_at`: timestamp
- `settings`: jsonb (валюта, язык, пуши)

### Таблица `vehicles`
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `make`: varchar (Марка: Toyota)
- `model`: varchar (Модель: Camry)
- `year`: integer
- `vin`: varchar (опционально)
- `plate_number`: varchar
- `current_mileage`: integer
- `created_at`: timestamp

### Таблица `service_records` (Записи о сервисе)
- `id`: uuid (PK)
- `vehicle_id`: uuid (FK -> vehicles.id)
- `date`: date
- `odometer`: integer (пробег на момент записи)
- `total_amount`: decimal
- `service_center_name`: varchar
- `receipt_image_url`: varchar (ссылка на S3)
- `ocr_raw_data`: jsonb (сырые данные от распознавания)
- `status`: enum (draft, processed, manual)
- `created_at`: timestamp

### Таблица `work_items` (Детализация работ/запчастей)
- `id`: uuid (PK)
- `record_id`: uuid (FK -> service_records.id)
- `description`: varchar (Замена масла)
- `category`: enum (maintenance, repair, parts, tuning)
- `cost`: decimal
- `quantity`: decimal
- `created_at`: timestamp

---

## 2. Хранение данных и файлов

### Фотографии (S3 Storage)
- **Структура пути:** `uploads/{user_id}/{vehicle_id}/{record_id}_receipt.jpg`
- **Оптимизация:** При загрузке делать Resize (превью) и сжимать оригинал. Хранить оригиналы в "Cold Storage" через 6 месяцев для экономии.

### OCR (Распознавание)
- Для старта: **Yandex Vision OCR** или **Tesseract**.
- Логика: Пользователь грузит фото -> Асинхронная задача (Celery/Redis) -> OCR -> Запись в `ocr_raw_data` -> Уведомление пользователя "Данные готовы, проверьте".

## 3. Масштабируемость до 1 млн пользователей
- **Чтение:** Репликация БД (одна мастер-БД на запись, несколько реплик на чтение).
- **Индексы:** Обязательные индексы по `user_id` и `vehicle_id` для быстрой выдачи истории.
- **Шардирование:** При достижении 1 млн можно шардировать таблицу `service_records` по `user_id`.
