import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.PUBLIC_SUPABASE_URL || import.meta.env?.PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl
  .trim()
  .replace(/^["']|["']$/g, '')
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');
const supabaseAnonKey = (process.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env?.PUBLIC_SUPABASE_ANON_KEY || '').trim().replace(/^["']|["']$/g, '');
const supabaseServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env?.SUPABASE_SERVICE_ROLE_KEY || '').trim().replace(/^["']|["']$/g, '');

// Client for public reads (safe for client-side or SSR)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for backend operations and CLI (uses service role key)
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
