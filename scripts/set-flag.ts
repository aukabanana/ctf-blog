import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('\x1b[31m[ERROR] Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env\x1b[0m');
  process.exit(1);
}

const slug = process.argv[2];
const flag = process.argv[3];

if (!slug || !flag) {
  console.log('\x1b[33mUsage:\x1b[0m pnpm flag:set <slug> <flag>');
  console.log('\x1b[90mExample:\x1b[0m pnpm flag:set web-sqli-login "STUDIO{my_secret_flag}"');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function setFlag() {
  console.log(`\x1b[36m[*] Setting flag for challenge slug:\x1b[0m ${slug}...`);
  
  const { error } = await supabase
    .from('flags')
    .upsert({ slug, flag, updated_at: new Date().toISOString() }, { onConflict: 'slug' });

  if (error) {
    console.error(`\x1b[31m[FAIL] Could not store flag:\x1b[0m`, error.message);
    process.exit(1);
  }

  console.log(`\x1b[32m[SUCCESS] Flag for '${slug}' successfully stored in Supabase!\x1b[0m`);
  console.log(`\x1b[90mFlag is protected and will only be lazy-loaded on reveal.\x1b[0m`);
}

setFlag();
