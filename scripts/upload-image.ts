import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_BUCKET, R2_PUBLIC_DOMAIN } from '../src/lib/r2.js';

const filePath = process.argv[2];

if (!filePath) {
  console.log('\x1b[33mUsage:\x1b[0m pnpm upload:img <file-path>');
  console.log('\x1b[90mExample:\x1b[0m pnpm upload:img ./screenshots/burp-leak.png');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`\x1b[31m[ERROR] File not found:\x1b[0m ${filePath}`);
  process.exit(1);
}

const fileBuffer = fs.readFileSync(filePath);
const fileName = path.basename(filePath);
const ext = path.extname(fileName).toLowerCase();

const mimeMap: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

const contentType = mimeMap[ext] || 'application/octet-stream';
// Unique filename with timestamp to prevent cache collision
const uniqueKey = `writeups/${Date.now()}-${fileName.replace(/\s+/g, '-')}`;

async function uploadImage() {
  console.log(`\x1b[36m[*] Uploading ${fileName} to Cloudflare R2 (${R2_BUCKET})...\x1b[0m`);

  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: uniqueKey,
        Body: fileBuffer,
        ContentType: contentType,
      })
    );

    const publicUrl = `${R2_PUBLIC_DOMAIN}/${uniqueKey}`;
    const altText = path.basename(fileName, ext);
    const markdown = `![${altText}](${publicUrl})`;

    console.log(`\n\x1b[32m[SUCCESS] Image uploaded successfully!\x1b[0m`);
    console.log(`\x1b[36mURL:\x1b[0m ${publicUrl}`);
    console.log(`\n\x1b[33mReady to paste in your Markdown:\x1b[0m`);
    console.log(`\x1b[1m${markdown}\x1b[0m\n`);
  } catch (err: any) {
    console.error(`\x1b[31m[FAIL] Upload failed:\x1b[0m`, err?.message || err);
    process.exit(1);
  }
}

uploadImage();
