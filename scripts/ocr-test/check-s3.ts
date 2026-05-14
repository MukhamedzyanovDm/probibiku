import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config();

async function checkS3() {
  console.log("🔍 Checking Yandex Object Storage connection...");

  const s3Client = new S3Client({
    region: "ru-central1",
    endpoint: process.env.YC_S3_ENDPOINT || "https://storage.yandexcloud.net",
    credentials: {
      accessKeyId: process.env.YC_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.YC_SECRET_ACCESS_KEY || "",
    },
  });

  try {
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    if (response.Buckets && response.Buckets.length > 0) {
      console.log("\n✅ Connection successful! Found buckets:");
      response.Buckets.forEach((bucket) => {
        console.log(` - ${bucket.Name} (Created: ${bucket.CreationDate})`);
      });
      
      const expectedBucket = process.env.YC_BUCKET_NAME;
      const found = response.Buckets.find(b => b.Name === expectedBucket);
      
      if (found) {
        console.log(`\n🎯 Target bucket "${expectedBucket}" is READY.`);
      } else {
        console.log(`\n⚠️ Warning: Target bucket "${expectedBucket}" NOT FOUND in the list.`);
      }
    } else {
      console.log("\n✅ Connection successful, but NO BUCKETS found in this account.");
    }
  } catch (error: any) {
    console.error("\n❌ S3 Connection Failed:");
    console.error(`Message: ${error.message}`);
    if (error.name === "InvalidAccessKeyId") {
      console.error("Tip: Check your YC_ACCESS_KEY_ID in .env");
    } else if (error.name === "SignatureDoesNotMatch") {
      console.error("Tip: Check your YC_SECRET_ACCESS_KEY in .env");
    }
  }
}

checkS3();
