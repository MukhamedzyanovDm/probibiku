import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const YC_API_KEY = process.env.YC_API_KEY;
const YC_FOLDER_ID = process.env.YC_FOLDER_ID;

async function runFullPipeline(imagePath: string) {
  if (!YC_API_KEY || !YC_FOLDER_ID) {
    console.error('❌ Error: YC_API_KEY or YC_FOLDER_ID is missing in .env');
    return;
  }

  console.log(`📸 [Step 1] Reading image: ${imagePath}`);
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  console.log('👁️ [Step 2] Sending to Yandex Vision OCR...');
  const visionBody = {
    folderId: YC_FOLDER_ID,
    analyze_specs: [{
      content: base64Image,
      features: [{ type: 'TEXT_DETECTION', text_detection_config: { language_codes: ['*'] } }]
    }]
  };

  const visionResponse = await fetch('https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Api-Key ${YC_API_KEY}` },
    body: JSON.stringify(visionBody)
  });

  const visionData = (await visionResponse.json()) as any;
  if (!visionResponse.ok) {
    console.error('❌ Vision API Error:', visionData);
    return;
  }

  const textDetection = visionData.results[0].results[0].textDetection;
  let fullText = "";
  textDetection.pages.forEach((page: any) => {
    page.blocks.forEach((block: any) => {
      block.lines.forEach((line: any) => {
        fullText += line.words.map((w: any) => w.text).join(' ') + '\n';
      });
    });
  });

  console.log('✅ OCR Complete. Raw text extracted.');
  console.log('🤖 [Step 3] Sending to YandexGPT for structuring...');

  const gptBody = {
    modelUri: `gpt://${YC_FOLDER_ID}/yandexgpt/latest`,
    completionOptions: { temperature: 0.1, maxTokens: "2000" },
    messages: [
      {
        role: "system",
        text: "Ты — ассистент автолюбителя. Извлеки данные из текста чека СТО в JSON: date (YYYY-MM-DD), total_amount (number), items (list of {name, quantity, price}), mileage (number/null), service_name (string/null). Только JSON."
      },
      { role: "user", text: `Текст чека:\n${fullText}` }
    ]
  };

  const gptResponse = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Api-Key ${YC_API_KEY}`,
      'x-folder-id': YC_FOLDER_ID
    },
    body: JSON.stringify(gptBody)
  });

  const gptData = (await gptResponse.json()) as any;
  if (!gptResponse.ok) {
    console.error('❌ GPT API Error:', gptData);
    return;
  }

  console.log('\n🏆 FINAL RESULT:\n');
  console.log(gptData.result.alternatives[0].message.text);
}

const targetFile = 'docs/raw/share-photo-11946056603.jpeg';
runFullPipeline(targetFile);
