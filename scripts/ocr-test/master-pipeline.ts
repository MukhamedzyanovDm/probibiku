import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "../../src/db";
import { serviceRecords, workItems, vehicles } from "../../src/db/schema";
import { eq } from "drizzle-orm";

dotenv.config();

const YC_API_KEY = process.env.YC_API_KEY;
const YC_FOLDER_ID = process.env.YC_FOLDER_ID;
const BUCKET_NAME = process.env.YC_BUCKET_NAME || "autolog-docs";

const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: process.env.YC_S3_ENDPOINT || "https://storage.yandexcloud.net",
  credentials: {
    accessKeyId: process.env.YC_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.YC_SECRET_ACCESS_KEY || "",
  },
});

async function runMasterPipeline(imagePath: string, vehicleId: string) {
  console.log(`\n🚗 Starting Master Pipeline for vehicle: ${vehicleId}`);

  // 1. Upload to S3
  const fileContent = fs.readFileSync(imagePath);
  const fileName = `receipts/${Date.now()}_${imagePath.split('/').pop()}`;
  
  console.log(`⬆️  Uploading to S3: ${fileName}...`);
  await s3Client.send(new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: "image/jpeg",
  }));
  console.log("✅ Uploaded to S3.");

  // 2. OCR (Yandex Vision)
  console.log("👁️  Running OCR...");
  const base64Image = fileContent.toString('base64');
  const visionResp = await fetch('https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Api-Key ${YC_API_KEY}` },
    body: JSON.stringify({
      folderId: YC_FOLDER_ID,
      analyze_specs: [{
        content: base64Image,
        features: [{ type: 'TEXT_DETECTION', text_detection_config: { language_codes: ['*'] } }]
      }]
    })
  });

  const visionData = (await visionResp.json()) as any;
  if (!visionResp.ok || !visionData.results?.[0]?.results?.[0]?.textDetection) {
    console.error('❌ Vision API Error or invalid response:', JSON.stringify(visionData, null, 2));
    return;
  }

  const textDetection = visionData.results[0].results[0].textDetection;
  let fullText = "";
  if (textDetection.pages) {
    textDetection.pages.forEach((p: any) => {
      p.blocks?.forEach((b: any) => b.lines?.forEach((l: any) => {
        fullText += l.words.map((w: any) => w.text).join(' ') + '\n';
      }));
    });
  }
  console.log("✅ OCR complete.");

  // 3. AI Structuring (YandexGPT)
  console.log("🤖 Structuring data with YandexGPT...");
  const gptResp = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Api-Key ${YC_API_KEY}`,
      'x-folder-id': YC_FOLDER_ID
    },
    body: JSON.stringify({
      modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt/latest`,
      completionOptions: { temperature: 0.1 },
      messages: [
        { role: "system", text: "Ты ассистент автолюбителя. Извлеки данные из текста чека СТО в JSON: date (YYYY-MM-DD), total_amount (number), items (list of {name, price}), mileage (number/null), service_name (string/null). Только чистый JSON без markdown." },
        { role: "user", text: fullText }
      ]
    })
  });

  const gptData = (await gptResp.json()) as any;
  if (!gptResp.ok || !gptData.result?.alternatives?.[0]?.message?.text) {
    console.error('❌ GPT API Error:', JSON.stringify(gptData, null, 2));
    return;
  }

  let resultText = gptData.result.alternatives[0].message.text;
  resultText = resultText.replace(/```json|```/g, "").trim();
  
  const structured = JSON.parse(resultText);
  console.log("✅ AI structuring complete.");

  // 4. Save to Database (Supabase via Drizzle)
  console.log("💾 Saving to database...");
  const [record] = await db.insert(serviceRecords).values({
    vehicleId: vehicleId,
    date: structured.date,
    odometer: structured.mileage,
    totalAmount: structured.total_amount.toString(),
    serviceCenterName: structured.service_name,
    receiptImageUrl: fileName,
    status: "processed",
    ocrRawData: structured,
  }).returning();

  if (structured.items && structured.items.length > 0) {
    for (const item of structured.items) {
      await db.insert(workItems).values({
        recordId: record.id,
        description: item.name,
        cost: item.price.toString(),
      });
    }
  }
  console.log(`\n🎉 SUCCESS! Record ${record.id} created with ${structured.items?.length || 0} items.`);
}

async function start() {
  const cars = await db.select().from(vehicles).limit(1);
  if (cars.length > 0) {
    await runMasterPipeline('docs/raw/share-photo-11946055835.jpeg', cars[0].id);
  } else {
    console.error("❌ No vehicles found in DB. Run save-test-receipt.ts first.");
  }
  process.exit(0);
}

start();
