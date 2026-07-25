import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Whether the Supabase environment variables are actually present.
 *
 * `createClient` throws when the URL is missing, and because this module sits
 * near the top of the component tree that exception took the entire page down
 * to a blank screen with nothing in the UI to explain it. A missing key should
 * break the subscribe form and nothing else, so the client is built against a
 * placeholder when config is absent and callers check this flag first.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl || 'http://localhost',
  supabaseAnonKey || 'public-anon-key-placeholder',
);

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
