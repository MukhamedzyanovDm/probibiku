import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { computeHistoryHash } from "@/lib/advice-hash";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, make, model, year, mileage, serviceHistory, parts } = body;

    const currentHash = computeHistoryHash(serviceHistory || []);
    const isUuid = typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (isUuid) {
      try {
        const [dbVehicle] = await db
          .select({
            adviceCache: vehicles.adviceCache,
            adviceHistoryHash: vehicles.adviceHistoryHash,
          })
          .from(vehicles)
          .where(eq(vehicles.id, id))
          .limit(1);

        if (dbVehicle && dbVehicle.adviceHistoryHash === currentHash && dbVehicle.adviceCache) {
          try {
            const cachedRecommendations = JSON.parse(dbVehicle.adviceCache);
            return NextResponse.json({ recommendations: cachedRecommendations });
          } catch (parseCacheError) {
            console.error("Failed to parse cached recommendations:", parseCacheError);
          }
        }
      } catch (dbError) {
        console.error("Error reading advice cache from DB:", dbError);
      }
    }

    const YC_API_KEY = process.env.YC_API_KEY;
    const YC_FOLDER_ID = process.env.YC_FOLDER_ID;

    if (!YC_API_KEY || !YC_FOLDER_ID) {
      return NextResponse.json({ error: "Missing Yandex Cloud credentials" }, { status: 500 });
    }

    const historyStr = (serviceHistory || [])
      .slice(0, 15)
      .map((h: any) => `- ${h.date}: ${h.type} на пробеге ${h.mileage} км. Описание: ${h.description}. Стоимость: ${h.cost} руб. Запчасти: ${h.parts || "нет"}`)
      .join("\n");

    const currentDate = new Date().toLocaleDateString("ru-RU");

    const systemPrompt = `Ты - профессиональный ИИ-ассистент по техобслуживанию автомобилей сервиса Пробибику.
Твоя задача: проанализировать данные об автомобиле, текущем пробеге, текущей дате и истории замен, рассчитать сроки следующих замен для компонентов и вернуть СТРОГО 4 наиболее актуальные рекомендации с указанием уровня срочности.

Правила расчета:
1. Замена наступает, когда достигается ЛИБО пробег (пробег_при_замене + интервал_пробега), ЛИБО дата (дата_замены + интервал_времени) - смотря что наступит раньше.
2. Если компонент НЕ менялся (в истории нет записи), за точку отсчета берется:
   - для пробега - 0 км.
   - для времени - предполагаемый возраст авто по году выпуска. Если год неизвестен - считать, что замена нужна сразу (critical).
3. Базовые интервалы обслуживания:
   - Моторное масло + фильтр: 8 000 - 10 000 км или 1 год
   - Воздушный фильтр: 15 000 - 20 000 км или 1 год
   - Салонный фильтр: 15 000 - 20 000 км или 1 год
   - Топливный фильтр (бензин): 30 000 - 60 000 км или 2 года
   - Топливный фильтр (дизель): 20 000 - 30 000 км или 1 год
   - Тормозная жидкость: 40 000 км или 2 года
   - Охлаждающая жидкость: 60 000 - 90 000 км или 4-5 лет
   - Свечи зажигания (никель): 30 000 - 40 000 км или 3 года
   - Свечи зажигания (платина/иридий): 60 000 - 100 000 км или 5 лет
   - Ремень ГРМ: 60 000 - 90 000 км или 5 лет
   - Цепь ГРМ: 120 000 - 150 000 км или 8 лет (проверка на шум)
   - Ремень навесного оборудования: 60 000 - 90 000 км или 5 лет
   - Тормозные колодки (передние): 30 000 - 50 000 км (износ по толщине, визуальный осмотр каждые 10 000 км)
   - Тормозные колодки (задние): 40 000 - 60 000 км (износ по толщине)
   - Тормозные диски: 80 000 - 100 000 км (после 2 замен колодок)
   - Масло в МКПП: 60 000 - 80 000 км или 5 лет
   - Масло в АКПП: 40 000 - 60 000 км или 3 года
   - Масло в редукторе: 60 000 - 80 000 км или 5 лет
   - Аккумулятор: 3-5 лет (проверка нагрузочной вилкой перед зимой)
   - Шины (летние/зимние): 5 лет или по износу протектора (летний <1.6 мм, зимний <4 мм)
4. Тяжелые условия (городские пробки, частые короткие поездки, агрессивный стиль): сокращай интервалы на 20-30%.
5. Определение уровня срочности (поле "urgency"):
   - "critical": интервал превышен (пробег > замена + интервал ИЛИ дата > замена + время), либо важные компоненты (ГРМ, тормозная жидкость, антифриз) отсутствуют в истории.
   - "warning": до замены осталось менее 10% интервала (по пробегу или времени).
   - "info": замена запланирована в будущем (укажи прогнозную дату/пробег), либо общие советы (проверка жидкостей, шин, подбор запчастей).

Верни ответ СТРОГО в формате JSON-массива из 4 объектов со следующими полями:
- category: короткая фраза заглавными буквами (например: "СРОКИ ЗАМЕНЫ", "ДИАГНОСТИКА ХОДОВОЙ", "ЛИКВИДНОСТЬ АВТО", "ЭКОНОМИЯ НА ТО")
- title: заголовок рекомендации (например: "Ремень генератора")
- description: краткое описание рекомендации с указанием конкретных цифр или сроков (например: "Рекомендуется заменить через 2 500 км или 2 месяца")
- urgency: уровень срочности, СТРОГО один из трех вариантов: "critical", "warning", "info"

Не используй точки в конце заголовков (title) и категорий (category).
Отвечай ТОЛЬКО чистым JSON без markdown.`;

    const userPrompt = `Текущая дата: ${currentDate}
Автомобиль: ${make} ${model} (${year || "не указан"}).
Текущий пробег: ${mileage} км.
Запчасти в гараже: ${JSON.stringify(parts || [])}

История обслуживания:
${historyStr || "Записей обслуживания нет."}`;

    const response = await fetch("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Api-Key ${YC_API_KEY}`,
        "x-folder-id": YC_FOLDER_ID
      },
      body: JSON.stringify({
        modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt-lite/latest`,
        completionOptions: { temperature: 0.3, maxTokens: "1500" },
        messages: [
          { role: "system", text: systemPrompt },
          { role: "user", text: userPrompt }
        ]
      })
    });

    const data = (await response.json()) as any;

    if (!response.ok || !data.result?.alternatives?.[0]?.message?.text) {
      console.error("YandexGPT API error:", JSON.stringify(data, null, 2));
      return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 502 });
    }

    let resultText = data.result.alternatives[0].message.text;
    resultText = resultText.replace(/```json|```/g, "").trim();

    try {
      const recommendations = JSON.parse(resultText);

      if (isUuid) {
        try {
          await db
            .update(vehicles)
            .set({
              adviceCache: JSON.stringify(recommendations),
              adviceHistoryHash: currentHash,
            })
            .where(eq(vehicles.id, id));
        } catch (dbError) {
          console.error("Error saving advice cache to DB:", dbError);
        }
      }

      return NextResponse.json({ recommendations });
    } catch (parseError) {
      console.error("JSON parse error:", resultText, parseError);
      return NextResponse.json({ error: "Failed to parse recommendations JSON" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Recommendations API error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
