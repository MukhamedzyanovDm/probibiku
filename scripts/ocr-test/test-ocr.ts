import * as fs from 'fs';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const YC_API_KEY = process.env.YC_API_KEY;
const YC_FOLDER_ID = process.env.YC_FOLDER_ID;

async function testOCR(imagePath: string) {
  if (!YC_API_KEY || !YC_FOLDER_ID) {
    console.error('❌ Error: YC_API_KEY or YC_FOLDER_ID is missing in .env');
    return;
  }

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Error: Image file not found at ${imagePath}`);
    return;
  }

  console.log(`🚀 Starting OCR test for: ${imagePath}...`);

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const body = {
      folderId: YC_FOLDER_ID,
      analyze_specs: [
        {
          content: base64Image,
          features: [
            {
              type: 'TEXT_DETECTION',
              text_detection_config: {
                language_codes: ['*'],
              },
            },
          ],
        },
      ],
    };

    const response = await fetch('https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${YC_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as any;

    if (!response.ok) {
      console.error('❌ Yandex Vision API Error:', JSON.stringify(data, null, 2));
      return;
    }

    const textResults = data.results[0].results[0].textDetection;
    if (textResults && textResults.pages) {
      console.log('\n✅ Recognition successful! Detected text:\n');
      console.log('--- START ---');
      textResults.pages.forEach((page: any) => {
        page.blocks.forEach((block: any) => {
          block.lines.forEach((line: any) => {
            const lineText = line.words.map((w: any) => w.text).join(' ');
            console.log(lineText);
          });
        });
      });
      console.log('--- END ---');
    } else {
      console.log('⚠️ No text detected or unexpected response format.');
    }
  } catch (error) {
    console.error('❌ Request failed:', error);
  }
}

// Get image path from command line arguments or use a default one from docs/raw
const imageArg = process.argv[2];
const defaultImage = 'docs/raw/share-photo-11944630683.jpeg'; 
const imageToTest = imageArg || defaultImage;

testOCR(imageToTest);
