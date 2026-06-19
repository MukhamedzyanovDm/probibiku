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
        const lines: any[] = [];
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
            const height = maxY - minY;
            const text = l.words.map((w: any) => w.text).join(" ");
            
            lines.push({
              text,
              minY,
              maxY,
              minX,
              maxX,
              height,
              centerY: minY + height / 2
            });
          });
        });

        if (lines.length === 0) return;

        // Sort lines vertically by their center Y coordinate
        lines.sort((a, b) => a.centerY - b.centerY);

        // Group lines into rows based on overlapping/close center Y coordinates
        const rows: any[][] = [];
        lines.forEach((line) => {
          if (rows.length === 0) {
            rows.push([line]);
            return;
          }

          const currentRow = rows[rows.length - 1];
          const avgCenterY = currentRow.reduce((sum, l) => sum + l.centerY, 0) / currentRow.length;
          const avgHeight = currentRow.reduce((sum, l) => sum + l.height, 0) / currentRow.length;

          // If vertical difference is within 50% of the line height (or at least 8 pixels), it's the same row
          const threshold = Math.max(avgHeight * 0.5, 8);
          if (Math.abs(line.centerY - avgCenterY) <= threshold) {
            currentRow.push(line);
          } else {
            rows.push([line]);
          }
        });

        // Combine row elements from left to right using tabs for clear column separation
        rows.forEach((row) => {
          row.sort((a, b) => a.minX - b.minX);
          const rowText = row.map((l) => l.text).join("\t");
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
            text: "Ты ассистент автолюбителя. Извлеки данные из текста чека СТО в JSON: date (YYYY-MM-DD), totalAmount (number/string, e.g. '12500.50'), items (list of {description, cost, quantity}), mileage (number/null), serviceCenterName (string/null). Только чистый JSON без markdown."
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
