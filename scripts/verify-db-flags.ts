import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = (process.env.PUBLIC_SUPABASE_URL || '').trim().replace(/^['"]|['"]$/g, '');
const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim().replace(/^['"]|['"]$/g, '');
const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from('flags').select('slug, flag');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log(`Total flags in Supabase: ${data.length}`);
    data.forEach((f) => console.log(`  - ${f.slug}: ${f.flag}`));
  }
}

check();
