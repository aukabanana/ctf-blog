import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl
  .trim()
  .replace(/^["']|["']$/g, '')
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim().replace(/^["']|["']$/g, '');

if (!supabaseUrl || !serviceKey) {
  console.error('\x1b[31m[ERROR] Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env\x1b[0m');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const writeupsDir = path.resolve('src/content/writeups');
const files = fs.readdirSync(writeupsDir).filter((f) => f.endsWith('.md') && !f.startsWith('_'));

async function main() {
  console.log(`\x1b[36m[*] Found ${files.length} writeup files to process...\x1b[0m`);
  let pushedCount = 0;

  for (const file of files) {
    const filePath = path.join(writeupsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const slug = file.replace(/\.md$/, '');

    // Extract flag from frontmatter
    const flagMatch = content.match(/^flag:\s*["']?([^"'\r\n]+)["']?/m);
    if (!flagMatch) {
      console.log(`\x1b[90m[-] No flag found in frontmatter for: ${slug}\x1b[0m`);
      continue;
    }

    const flag = flagMatch[1].trim();
    console.log(`\x1b[33m[*] Uploading flag for ${slug}: ${flag}\x1b[0m`);

    // Upsert into Supabase
    const { error } = await supabase
      .from('flags')
      .upsert({ slug, flag, updated_at: new Date().toISOString() }, { onConflict: 'slug' });

    if (error) {
      console.error(`\x1b[31m[ERROR] Failed to push flag for ${slug}:\x1b[0m`, error.message);
      continue;
    }

    console.log(`\x1b[32m[SUCCESS] Flag for '${slug}' stored in Supabase!\x1b[0m`);
    pushedCount++;

    // Remove flag from frontmatter and redact any direct mention in body
    let updatedContent = content.replace(/^flag:\s*["']?[^"'\r\n]+["']?\r?\n/m, '');
    
    // Redact the raw flag in the markdown body if present
    if (updatedContent.includes(flag)) {
      updatedContent = updatedContent.split(flag).join('[REDACTED - Click "Reveal Flag" below]');
    }

    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`\x1b[90m[CLEANED] Flag removed from ${file}\x1b[0m`);
  }

  console.log(`\n\x1b[32m[DONE] Successfully pushed and stripped ${pushedCount} flags!\x1b[0m`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
