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
 * Whether an activity is readable.
 *
 * Always true. Mike's tripwire is a one-hour coaching session, not a content
 * unlock, so nothing here is gated: every activity is free to read by design.
 *
 * The tiers below are kept because they still carry useful information — who
 * someone is, and which three-pack they chose — but they no longer decide what
 * anyone can see. Gating content again would mean serving it from the server
 * rather than the bundle; a flag in this function would not achieve it.
 */
export function canRead(): boolean {
  return true;
}

/** Whether an activity is part of the visitor's claimed three-pack. Used to
 *  highlight their kit, not to restrict anything. */
export function isInTheirPack(state: AccessState, activityId: number): boolean {
  return state.tier !== 'visitor' && packActivityIds(state.packKey).has(activityId);
}
