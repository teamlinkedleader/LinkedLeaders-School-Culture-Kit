/**
 * Who can read what.
 *
 * Three states:
 *   - visitor        nothing claimed, nothing paid
 *   - pack           claimed a free three-pack, can read those three
 *   - full           paid the one-time unlock, can read everything
 *
 * IMPORTANT, and it is the reason this file is small: this module decides what
 * the UI *shows*. It does not and cannot decide what a visitor can *obtain*.
 * Every activity's full text is compiled into the JavaScript bundle, so anyone
 * willing to open devtools can read all of it regardless of what this returns.
 *
 * Until gated content is fetched from the server rather than bundled, the paid
 * tier is enforced by presentation only. See the note in
 * `School Culture Kit App` in the vault. Do not describe this as a paywall in
 * anything customer-facing until that is fixed.
 */
import { supabase, isSupabaseConfigured } from './supabase';
import { packActivityIds } from '@/data/packs';

const STORAGE_KEY = 'll-access-v1';

export type AccessTier = 'visitor' | 'pack' | 'full';

export interface AccessState {
  tier: AccessTier;
  email: string | null;
  name: string | null;
  packKey: string | null;
}

export const emptyAccess: AccessState = {
  tier: 'visitor',
  email: null,
  name: null,
  packKey: null,
};

export function loadAccess(): AccessState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...emptyAccess, ...(JSON.parse(raw) as Partial<AccessState>) };
  } catch {
    // Unavailable or corrupt storage should never break the page.
  }
  return emptyAccess;
}

export function saveAccess(state: AccessState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode or a full quota is not worth failing over.
  }
}

/**
 * Ask the server whether this email has paid.
 *
 * Uses the `has_full_access` function rather than reading `subscribers`, which
 * anon deliberately cannot do. Returns false on any error: failing closed is
 * correct for an access check, and a network blip should not hand out the
 * paid tier.
 */
export async function checkFullAccess(email: string): Promise<boolean> {
  if (!isSupabaseConfigured || !email) return false;
  try {
    const { data, error } = await supabase.rpc('has_full_access', {
      check_email: email.trim().toLowerCase(),
    });
    if (error) return false;
    return data === true;
  } catch {
    return false;
  }
}

/**
 * Whether an activity's full text is shown.
 *
 * This is a soft gate, enforced in the browser. That is deliberate and it is
 * fine here, because nothing behind it costs money: it exists to trade a full
 * activity for an email address, which is the entire job of a lead magnet.
 *
 * The earlier objection to client-side gating stands only where money is
 * involved. Charging for something a visitor can lift out of the bundle is
 * dishonest; asking for an email before showing the full text of a free
 * activity is ordinary practice, and the worst case is that a determined
 * visitor reads something we were giving away anyway.
 *
 * Card-level information (title, promise, month, time) is always visible. That
 * is the advertisement, and hiding it would defeat the point.
 */
export function canRead(state: AccessState, activityId: number): boolean {
  if (state.tier === 'full') return true;
  if (state.tier === 'pack') return packActivityIds(state.packKey).has(activityId);
  return false;
}
