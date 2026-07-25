import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

/**
 * Supabase renamed the browser-safe key from "anon / public" to "publishable".
 * Both names are accepted so the variable can be called whatever the dashboard
 * currently calls it without breaking the build.
 *
 * This must never be the "secret" key (formerly service_role). A secret key
 * bypasses row-level security, and everything in a Vite build is shipped to
 * every visitor, so putting it here would expose the entire subscribers table.
 */
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

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
