import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

// DB client - use with: import { supabase } from '@/integrations/supabase/client';

export const supabase = createClient<Database>(
  supabaseUrl as string,
  supabaseAnonKey as string
);