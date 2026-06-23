import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, vehicleContext, garageContext } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages array is required" }, { status: 400 });
    }

    const YC_API_KEY = process.env.YC_API_KEY;
    const YC_FOLDER_ID = process.env.YC_FOLDER_ID;

    if (!YC_API_KEY || !YC_FOLDER_ID) {
      console.error("Missing Yandex Cloud credentials in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // System prompt aligning with the project's rules and UI copy guidelines (no trailing periods for headers/short lists, etc.)
    let systemPrompt = `Ты — умный ИИ-помощник сервиса Пробибику. Помогаешь автовладельцам оцифровать историю обслуживания автомобиля.

Вот основные факты о Пробибику, которыми ты должен руководствоваться:
1. Что делает сервис: позволяет сфотографировать или загрузить бумажный чек/заказ-наряд СТО, распознает текст с помощью ИИ (Yandex Vision OCR + YandexGPT) и автоматически заносит работы, запчасти, цены и пробег в электронную сервисную книжку.
2. Польза: наглядно показывает историю обслуживания при продаже машины, помогает планировать будущие ТО и вести учет расходов.
3. Монетизация: нет ежемесячных подписок. Используется система разовых кредитов, которые не сгорают. 1 оцифровка чека или 1 ИИ-проверка сметы = 1 кредит. При регистрации дарится 10 бесплатных кредитов.
4. Создатель и вдохновение: сервис придуман продуктовым дизайнером, вдохновленным своей мамой, которая 10 лет собирала бумажные чеки СТО.
5. Интеграция с авто: так как ты сейчас находишься на главной странице, у тебя нет доступа к конкретной машине или истории обслуживания пользователя (пока он не войдет в свой гараж).`;

    if (vehicleContext) {
      const historyStr = (vehicleContext.serviceHistory || [])
        .map((h: any) => `- ${h.date}: ${h.type} на пробеге ${h.mileage} км. Описание: ${h.description}. Стоимость: ${h.cost} руб. Запчасти: ${h.parts || "нет"}`)
        .join("\n");

      systemPrompt += `\n\nИНФОРМАЦИЯ О ТЕКУЩЕМ АВТОМОБИЛЕ ПОЛЬЗОВАТЕЛЯ (ты находишься в гараже этого авто):
- Марка/Модель: ${vehicleContext.make} ${vehicleContext.model}
- Год выпуска: ${vehicleContext.year || "не указан"}
- Госномер: ${vehicleContext.licensePlate || "не указан"}
- Текущий пробег: ${vehicleContext.mileage} км
- Дата окончания ОСАГО: ${vehicleContext.insuranceExpiry || "не указана"}
- Запчасти/Регламенты в базе: ${JSON.stringify(vehicleContext.parts || [])}

ИСТОРИЯ ОБСЛУЖИВАНИЯ (из базы данных):
${historyStr || "Записей обслуживания пока нет."}`;
    }

    if (garageContext && Array.isArray(garageContext) && garageContext.length > 0) {
      const garageStr = garageContext
        .map((car: any, idx: number) => `${idx + 1}. ${car.make} ${car.model} (${car.year} г.в., госномер: ${car.licensePlate || "нет"}, пробег: ${car.mileage} км, расходы: ${car.carExpenses || 0} руб., окончание ОСАГО: ${car.insuranceExpiry || "не указано"})`)
        .join("\n");

      systemPrompt += `\n\nИНФОРМАЦИЯ О ВСЕХ АВТОМОБИЛЯХ В ГАРАЖЕ ПОЛЬЗОВАТЕЛЯ:
${garageStr}

Используй эти данные, чтобы отвечать на вопросы о списке машин пользователя, их пробегах, годах выпуска или суммарных расходах по всему гаражу.`;
    }

    systemPrompt += `\n\nПРАВИЛА ОТВЕТОВ:
- Отвечай дружелюбно, профессионально и по делу.
- Не ставь точки в конце заголовков, подзаголовков и коротких списков.
- Строго придерживайся фактов и не выдумывай информацию, которой нет в списке выше или в предоставленном контексте автомобиля. Если информации не хватает или её нет, вежливо отвечай, что не располагаешь такой информацией.`;

    // Map client messages to YandexGPT roles and construct messages array
    const formattedMessages = [
      {
        role: "system",
        text: systemPrompt
      },
      ...messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        text: m.text
      }))
    ];

    const body = {
      modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: "2000"
      },
      messages: formattedMessages
    };

    const response = await fetch("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Api-Key ${YC_API_KEY}`,
        "x-folder-id": YC_FOLDER_ID
      },
      body: JSON.stringify(body)
    });

    const data = (await response.json()) as any;

    if (!response.ok) {
      console.error("❌ YandexGPT API Error:", JSON.stringify(data, null, 2));
      return NextResponse.json({ error: "YandexGPT API call failed" }, { status: 502 });
    }

    const resultText = data.result.alternatives[0].message.text;

    return NextResponse.json({ text: resultText });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate chat response" }, { status: 500 });
  }
}
