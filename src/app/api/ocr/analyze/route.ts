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

        // 4. Group lines into 3 columns dynamically adjusted by page width
        const pageWidth = p.width ? Number(p.width) : 1000;
        const colLeft = lines.filter(l => l.x < pageWidth * 0.45);
        const colMiddle = lines.filter(l => l.x >= pageWidth * 0.45 && l.x < pageWidth * 0.75);
        const colRight = lines.filter(l => l.x >= pageWidth * 0.75);

        // Sort columns vertically from top to bottom
        colLeft.sort((a, b) => a.y - b.y);
        colMiddle.sort((a, b) => a.y - b.y);
        colRight.sort((a, b) => a.y - b.y);

        // Reconstruct layout
        fullText += "--- КОЛОНКА 1 (НАИМЕНОВАНИЕ / РЕКВИЗИТЫ СЛЕВА) ---\n";
        colLeft.forEach(l => fullText += l.text + "\n");

        fullText += "\n--- КОЛОНКА 2 (КОДЫ ДЕТАЛЕЙ / РАБОТ / РЕКВИЗИТЫ В ЦЕНТРЕ) ---\n";
        colMiddle.forEach(l => fullText += l.text + "\n");

        fullText += "\n--- КОЛОНКА 3 (КОЛИЧЕСТВО / ЦЕНЫ / РЕКВИЗИТЫ СПРАВА) ---\n";
        colRight.forEach(l => fullText += l.text + "\n");
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
            text: "Ты ассистент автолюбителя. Тебе дан текст чека СТО, разделенный на 3 колонки: Колонка 1 (Названия работ и запчастей), Колонка 2 (Коды) и Колонка 3 (Единицы измерения, количество и цены).\n" +
                  "Твоя задача — извлечь данные в JSON с полями:\n" +
                  "- date (YYYY-MM-DD)\n" +
                  "- totalAmount (число или строка, например, '5000.00')\n" +
                  "- mileage (пробег, число или null)\n" +
                  "- serviceCenterName (название СТО, строка или null)\n" +
                  "- items (список позиций, каждая содержит {description, cost, quantity}).\n\n" +
                  "ПРАВИЛО СОПОСТАВЛЕНИЯ ПОЗИЦИЙ:\n" +
                  "Сопоставляй позиции строго по порядку следования сверху вниз. 1-я строка из Колонки 1 соответствует 1-й строке из Колонки 2 и 1-й строке из Колонки 3. Игнорируй заголовки колонок.\n" +
                  "Будь предельно аккуратен и не путай цены и количества местами. Верни только чистый JSON без markdown."
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
      return NextResponse.json({ data: structured });
    } catch (parseError) {
      console.error("Failed to parse JSON from YandexGPT response:", resultText, parseError);
      return NextResponse.json({ error: "Failed to parse structured response from AI" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("OCR Analysis error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze receipt" }, { status: 500 });
  }
}
