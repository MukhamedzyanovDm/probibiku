import { NextRequest, NextResponse } from "next/server";
import { getPresignedUploadUrl } from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const { contentType, fileName } = await req.json();

    if (!contentType) {
      return NextResponse.json({ error: "contentType is required" }, { status: 400 });
    }

    const fileExtension = fileName ? fileName.split(".").pop() : "jpg";
    const key = `receipts/${crypto.randomUUID()}.${fileExtension}`;

    const uploadUrl = await getPresignedUploadUrl(key, contentType);

    return NextResponse.json({ 
      uploadUrl, 
      key,
      publicUrl: `${process.env.YC_S3_ENDPOINT}/${process.env.YC_BUCKET_NAME}/${key}`
    });
  } catch (error) {
    console.error("Upload URL generation error:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
