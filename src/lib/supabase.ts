import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Subscriber {
  id: string;
  email: string;
  name: string;
  role: string | null;
  school_name: string | null;
  unlocked: boolean;
  current_week: number;
  created_at: string;
}
