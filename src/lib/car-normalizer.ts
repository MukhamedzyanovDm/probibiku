export async function normalizeCar(rawMake: string, rawModel: string): Promise<{ make: string; model: string }> {
  const YC_API_KEY = process.env.YC_API_KEY;
  const YC_FOLDER_ID = process.env.YC_FOLDER_ID;

  if (!YC_API_KEY || !YC_FOLDER_ID) {
    console.warn("Missing Yandex Cloud credentials for car normalization, returning raw values");
    return { make: rawMake, model: rawModel };
  }

  const prompt = `Ты — профессиональный автомобильный ассистент.
Твоя задача — нормализовать название марки и модели автомобиля.
Ты должен исправить опечатки, перевести русское (кириллическое) название марки и модели в их официальное международное написание на латинице (например: "опель астра" -> {"make": "Opel", "model": "Astra"}, "бмв х5" -> {"make": "BMW", "model": "X5"}).
Если марка уже на латинице, сохрани её официальное написание с правильным регистром букв.
Если ты не знаешь такой автомобиль или введен бред, верни исходные значения.

Входные данные от пользователя:
Марка: "${rawMake}"
Модель: "${rawModel}"

Ответ верни СТРОГО в формате JSON без каких-либо объяснений, разметки markdown или дополнительных символов:
{"make": "ОфициальнаяМаркаНаЛатинице", "model": "ОфициальнаяМодельНаЛатинице"}`;

  try {
    const response = await fetch("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Api-Key ${YC_API_KEY}`,
        "x-folder-id": YC_FOLDER_ID
      },
      body: JSON.stringify({
        modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt-lite/latest`,
        completionOptions: {
          stream: false,
          temperature: 0.1,
          maxTokens: "100"
        },
        messages: [
          {
            role: "user",
            text: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      console.error("YandexGPT normalization API failed with status:", response.status);
      return { make: rawMake, model: rawModel };
    }

    const data = await response.json() as any;
    const text = data.result?.alternatives?.[0]?.message?.text?.trim();
    if (!text) {
      return { make: rawMake, model: rawModel };
    }

    // Clean up potential markdown formatting block by extracting content between curly braces
    const startIndex = text.indexOf("{");
    const endIndex = text.lastIndexOf("}");
    let jsonStr = text;
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      jsonStr = text.substring(startIndex, endIndex + 1);
    } else {
      jsonStr = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    }
    const result = JSON.parse(jsonStr);

    if (result && typeof result.make === "string" && typeof result.model === "string") {
      return {
        make: result.make.trim(),
        model: result.model.trim()
      };
    }
  } catch (error) {
    console.error("Failed to parse or fetch car normalization from YandexGPT:", error);
  }

  return { make: rawMake, model: rawModel };
}
