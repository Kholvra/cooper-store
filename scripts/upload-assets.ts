import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const region = process.env.AWS_REGION || "us-east-2";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
const bucket = "assets";

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.error("Missing S3 configuration in environment.");
  process.exit(1);
}

const s3 = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
});

const assetsDir = path.resolve(process.cwd(), "docs/Game Assets");
const files = fs.readdirSync(assetsDir);

console.log(`Found ${files.length} asset files to upload...`);

for (const file of files) {
  const filePath = path.join(assetsDir, file);
  const fileBuffer = fs.readFileSync(filePath);
  
  // Normalize key for S3: lowercase, replace spaces with hyphen
  const cleanKey = file.toLowerCase().replace(/\s+/g, "-");
  const s3Key = `games/${cleanKey}`;
  
  console.log(`Uploading ${file} -> ${s3Key}...`);
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: "image/jpeg",
    })
  );
}

console.log("All assets uploaded successfully to Neon Object Storage!");
