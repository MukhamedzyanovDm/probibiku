import { NextRequest, NextResponse } from "next/server";
import { getObjectBuffer } from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "key is required" }, { status: 400 });
    }

    console.log(`⏳ Analyzing receipt: ${key}`);

    // 1. Get image buffer from Yandex S3
    const fileBuffer = await getObjectBuffer(key);
    const base64Image = fileBuffer.toString("base64");

    const YC_API_KEY = process.env.YC_API_KEY;
    const YC_FOLDER_ID = process.env.YC_FOLDER_ID;

    if (!YC_API_KEY || !YC_FOLDER_ID) {
      console.error("Missing Yandex Cloud credentials in environment variables");
      return NextResponse.json(
        { error: "Server configuration error: missing Yandex Cloud credentials" },
        { status: 500 }
      );
    }

    // 2. OCR (Yandex Vision)
    console.log("👁️ Running OCR via Yandex Vision...");
    const visionResp = await fetch("https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Api-Key ${YC_API_KEY}`
      },
      body: JSON.stringify({
        folderId: YC_FOLDER_ID,
        analyze_specs: [{
          content: base64Image,
          features: [{ type: "TEXT_DETECTION", text_detection_config: { language_codes: ["*"] } }]
        }]
      })
    });

    const visionData = (await visionResp.json()) as any;
    if (!visionResp.ok || !visionData.results?.[0]?.results?.[0]?.textDetection) {
      console.error("❌ Vision API Error or invalid response:", JSON.stringify(visionData, null, 2));
      return NextResponse.json({ error: "Vision OCR analysis failed" }, { status: 502 });
    }

    const textDetection = visionData.results[0].results[0].textDetection;
    let fullText = "";
    if (textDetection.pages) {
      textDetection.pages.forEach((p: any) => {
        // 1. Collect centers of all detected lines on the page
        const lineCenters: any[] = [];
        p.blocks?.forEach((b: any) => {
          b.lines?.forEach((l: any) => {
            if (!l.words || l.words.length === 0) return;
            const vertices = l.boundingBox?.vertices || [];
            const yCoords = vertices.map((v: any) => Number(v.y || 0));
            const xCoords = vertices.map((v: any) => Number(v.x || 0));
            const minY = yCoords.length > 0 ? Math.min(...yCoords) : 0;
            const maxY = yCoords.length > 0 ? Math.max(...yCoords) : 0;
            const minX = xCoords.length > 0 ? Math.min(...xCoords) : 0;
            const maxX = xCoords.length > 0 ? Math.max(...xCoords) : 0;
            lineCenters.push({
              x: minX + (maxX - minX) / 2,
              y: minY + (maxY - minY) / 2
            });
          });
        });

        // 2. Search for the best tilt angle by maximizing horizontal alignment
        let theta = 0;
        if (lineCenters.length > 0) {
          let bestScore = -1;
          for (let deg = -8; deg <= 8; deg += 0.2) {
            const rad = (deg * Math.PI) / 180;
            const cos = Math.cos(-rad);
            const sin = Math.sin(-rad);

            const rotatedY = lineCenters.map(w => w.x * sin + w.y * cos);
            rotatedY.sort((a, b) => a - b);

            let score = 0;
            for (let i = 0; i < rotatedY.length - 1; i++) {
              const diff = rotatedY[i+1] - rotatedY[i];
              if (diff <= 5) {
                score += (6 - diff);
              }
            }

            if (score > bestScore) {
              bestScore = score;
              theta = rad;
            }
          }
        }

        const cosT = Math.cos(-theta);
        const sinT = Math.sin(-theta);
        console.log(`📐 Detected tilt angle: ${(theta * 180 / Math.PI).toFixed(2)}°`);

        // 3. Extract lines with de-rotated coordinates
        const lines: any[] = [];
        p.blocks?.forEach((b: any) => {
          b.lines?.forEach((l: any) => {
            if (!l.words || l.words.length === 0) return;
            
            const vertices = l.boundingBox?.vertices || [];
            const rVertices = vertices.map((v: any) => {
              const x = Number(v.x || 0);
              const y = Number(v.y || 0);
              return {
                x: x * cosT - y * sinT,
                y: x * sinT + y * cosT
              };
            });

            const yCoords = rVertices.map((v: any) => v.y);
            const xCoords = rVertices.map((v: any) => v.x);
            
            const minY = yCoords.length > 0 ? Math.min(...yCoords) : 0;
            const maxY = yCoords.length > 0 ? Math.max(...yCoords) : 0;
            const minX = xCoords.length > 0 ? Math.min(...xCoords) : 0;
            const maxX = xCoords.length > 0 ? Math.max(...xCoords) : 0;
            const height = maxY - minY;
            const text = l.words.map((w: any) => w.text).join(" ");
            
            lines.push({
              text,
              x: minX,
              y: minY + height / 2
            });
          });
        });

        if (lines.length === 0) return;

        // 4. Group lines into horizontal rows by Y coordinate proximity
        lines.sort((a, b) => a.y - b.y);
        const rows: { y: number; items: any[] }[] = [];
        lines.forEach((line) => {
          const threshold = 8;
          const matchingRow = rows.find((row) => Math.abs(row.y - line.y) < threshold);
          
          if (matchingRow) {
            matchingRow.items.push(line);
            // Recalculate average Y for the row
            matchingRow.y = matchingRow.items.reduce((sum, item) => sum + item.y, 0) / matchingRow.items.length;
          } else {
            rows.push({
              y: line.y,
              items: [line]
            });
          }
        });

        // Reconstruct layout row by row (sorting items in each row from left to right by X coordinate)
        rows.sort((a, b) => a.y - b.y);
        rows.forEach((row) => {
          row.items.sort((a, b) => a.x - b.x);
          const rowText = row.items.map(item => item.text).join(" | ");
          fullText += rowText + "\n";
        });
      });
    }

    if (!fullText.trim()) {
      console.warn("⚠️ No text detected on image");
      return NextResponse.json({ error: "No text detected on the receipt image" }, { status: 422 });
    }

    console.log("✅ OCR complete, length:", fullText.length);

    // 3. AI Structuring (YandexGPT)
    console.log("🤖 Structuring data with YandexGPT...");
    const gptResp = await fetch("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Api-Key ${YC_API_KEY}`,
        "x-folder-id": YC_FOLDER_ID
      },
      body: JSON.stringify({
        modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt/latest`,
        completionOptions: { temperature: 0.1 },
        messages: [
          {
            role: "system",
            text: "Ты ассистент автолюбителя. Тебе дан распознанный текст чека СТО. Текст сгруппирован по строкам таблицы (элементы одной строки разделены символом '|').\n" +
                  "Твоя задача — извлечь данные в JSON с полями:\n" +
                  "- date (YYYY-MM-DD)\n" +
                  "- totalAmount (число или строка, например, '5000.00'; если итоговая сумма обрезана или не видна, вычисли её как сумму всех cost позиций)\n" +
                  "- mileage (пробег, число или null)\n" +
                  "- serviceCenterName (название СТО, строка или null)\n" +
                  "- items (список позиций, каждая содержит {description, price, quantity, cost}).\n\n" +
                  "ПРАВИЛА ИЗВЛЕЧЕНИЯ ДЛЯ КАЖДОЙ ПОЗИЦИИ:\n" +
                  "1. description: название работы или запчасти (строка).\n" +
                  "2. quantity: количество товара/услуги. Обрати внимание: в строке оно может быть записано с единицами измерения (например, '11 п/дм3', '2 шт.', '0.5 л'). Извлеки из него только число (например, 11 или 2, число).\n" +
                  "3. price: цена за единицу. Будь предельно внимателен! Если в таблице есть колонка НДС (например, 'НДС', '18%', '20%', '1 870,00'), ИГНОРИРУЙ её. Цена за единицу (price) должна соответствовать столбцу 'Цена' (например, 1020.00), а общая стоимость — столбцу 'Сумма' (например, 11220.00).\n" +
                  "4. cost: общая стоимость позиции (столбец 'Сумма'; если обрезана/не видна, вычисли её как price * quantity, число).\n\n" +
                  "Верни только чистый JSON без markdown."
          },
          { role: "user", text: fullText }
        ]
      })
    });

    const gptData = (await gptResp.json()) as any;
    if (!gptResp.ok || !gptData.result?.alternatives?.[0]?.message?.text) {
      console.error("❌ GPT API Error:", JSON.stringify(gptData, null, 2));
      return NextResponse.json({ error: "GPT data structuring failed" }, { status: 502 });
    }

    let resultText = gptData.result.alternatives[0].message.text;
    resultText = resultText.replace(/```json|```/g, "").trim();

    try {
      const structured = JSON.parse(resultText);
      console.log("✅ AI structuring complete:", structured);
      return NextResponse.json({ 
        data: structured,
        ocrRawData: {
          rawText: fullText,
          visionResult: textDetection
        }
      });
    } catch (parseError) {
      console.error("Failed to parse JSON from YandexGPT response:", resultText, parseError);
      return NextResponse.json({ error: "Failed to parse structured response from AI" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("OCR Analysis error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze receipt" }, { status: 500 });
  }
}
