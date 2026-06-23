import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { make, model, year, mileage, serviceHistory, parts } = await req.json();

    const YC_API_KEY = process.env.YC_API_KEY;
    const YC_FOLDER_ID = process.env.YC_FOLDER_ID;

    if (!YC_API_KEY || !YC_FOLDER_ID) {
      return NextResponse.json({ error: "Missing Yandex Cloud credentials" }, { status: 500 });
    }

    const historyStr = (serviceHistory || [])
      .map((h: any) => `- ${h.date}: ${h.type} на пробеге ${h.mileage} км. Описание: ${h.description}. Стоимость: ${h.cost} руб. Запчасти: ${h.parts || "нет"}`)
      .join("\n");

    const systemPrompt = `Ты — профессиональный ИИ-ассистент автолюбителя сервиса Пробибику. Твоя задача — проанализировать данные об автомобиле и истории его обслуживания, а затем дать 4 наиболее актуальные рекомендации по обслуживанию, экономии или безопасности.

Верни ответ СТРОГО в формате JSON-массива из 4 объектов со следующими полями:
- category: короткая фраза заглавными буквами (например: "СРОКИ ЗАМЕНЫ", "ДИАГНОСТИКА ХОДОВОЙ", "ЛИКВИДНОСТЬ АВТО", "ЭКОНОМИЯ НА ТО")
- title: заголовок рекомендации (например: "Ремень генератора")
- description: краткое описание рекомендации (1-2 предложения, конкретно и по делу)

Не используй точки в конце заголовков (title) и категорий (category).
Отвечай ТОЛЬКО чистым JSON без markdown.`;

    const userPrompt = `Автомобиль: ${make} ${model} (${year || "не указан"}).
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
        modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt/latest`,
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
