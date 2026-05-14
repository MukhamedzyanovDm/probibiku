import * as dotenv from 'dotenv';

dotenv.config();

const YC_API_KEY = process.env.YC_API_KEY;
const YC_FOLDER_ID = process.env.YC_FOLDER_ID;

const RAW_OCR_TEXT = `
015954 от 1 июля 2021 г.
Арутюнян Карен Эйлязович, ИНН 442300710308, 108851, г. Москва, г. Щербинка, ул.
Индустриальная, д. 12, кв. 99
Заказчик: Светлишина Наталья Александровна
Наименование работ, услуг
Количество
Цена
Сумма
Пружина амортизационной стойки передней (обе). Снять и установить.
2 шт
2 100,00
4 200,00
Итого:
4 200,00
Без налога (НДС)
оказано услуг 1, на сумму 4 200,00 руб
Четыре тысячи двести рублей 00 копеек
Бонусной картой: 420
`;

async function testYandexGPT(text: string) {
  if (!YC_API_KEY || !YC_FOLDER_ID) {
    console.error('❌ Error: YC_API_KEY or YC_FOLDER_ID is missing in .env');
    return;
  }

  console.log('🤖 Sending text to YandexGPT for structuring...');

  const systemPrompt = `Ты — профессиональный ассистент автолюбителя. Твоя задача — извлечь данные из распознанного текста чека СТО или автомагазина и представить их в строгом JSON формате.
  
Вытащи следующие поля:
1. date (дата в формате YYYY-MM-DD)
2. total_amount (числом)
3. items (список работ и запчастей: название, количество, цена)
4. mileage (пробег, если указан)
5. service_name (название сервиса или имя исполнителя)

Если поле не найдено, пиши null. Отвечай ТОЛЬКО чистым JSON, без лишних пояснений.`;

  const body = {
    modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt/latest`,
    completionOptions: {
      stream: false,
      temperature: 0.1,
      maxTokens: "2000"
    },
    messages: [
      {
        role: "system",
        text: systemPrompt
      },
      {
        role: "user",
        text: `Распознанный текст чека:\n${text}`
      }
    ]
  };

  try {
    const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${YC_API_KEY}`,
        'x-folder-id': YC_FOLDER_ID
      },
      body: JSON.stringify(body)
    });

    const data = (await response.json()) as any;

    if (!response.ok) {
      console.error('❌ YandexGPT API Error:', JSON.stringify(data, null, 2));
      return;
    }

    const resultText = data.result.alternatives[0].message.text;
    console.log('\n✅ YandexGPT structured data:\n');
    console.log(resultText);
    
  } catch (error) {
    console.error('❌ Request failed:', error);
  }
}

testYandexGPT(RAW_OCR_TEXT);
