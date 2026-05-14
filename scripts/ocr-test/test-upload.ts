import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config();

async function testUpload() {
  const bucketName = process.env.YC_BUCKET_NAME || "autolog-docs";
  console.log(`🚀 Attempting direct upload to bucket: ${bucketName}...`);

  const s3Client = new S3Client({
    region: "ru-central1",
    endpoint: process.env.YC_S3_ENDPOINT || "https://storage.yandexcloud.net",
    credentials: {
      accessKeyId: process.env.YC_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.YC_SECRET_ACCESS_KEY || "",
    },
  });

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: "connection-test.txt",
      Body: "Hello from AutoLog! S3 connection is working.",
      ContentType: "text/plain",
    });

    await s3Client.send(command);
    console.log("\n✅ SUCCESS! File uploaded directly to the bucket.");
    console.log(`🔗 Path: ${bucketName}/connection-test.txt`);
  } catch (error: any) {
    console.error("\n❌ Direct Upload Failed:");
    console.error(`Message: ${error.message}`);
    console.error(`Status Code: ${error.$metadata?.httpStatusCode}`);
    
    if (error.message.includes("NoSuchBucket")) {
      console.error(`Tip: The bucket "${bucketName}" does not exist. Create it in Yandex Console.`);
    }
  }
}

testUpload();
