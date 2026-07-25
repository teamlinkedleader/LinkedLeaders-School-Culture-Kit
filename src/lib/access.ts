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

/**
 * Reviewer preview.
 *
 * Visiting with `?preview=all` opens every activity without claiming a pack and
 * without writing anything to the database. It exists so the team can review
 * the full collection on a deployed link without each reviewer leaving a junk
 * row in the live subscribers table.
 *
 * This is not a security hole. The gate it bypasses is a soft, browser-side one
 * over content that is free, and every activity already ships in the bundle, so
 * this exposes nothing that was not already reachable.
 */
function previewRequested(): boolean {
  try {
    return new URLSearchParams(window.location.search).get('preview') === 'all';
  } catch {
    return false;
  }
}

export function loadAccess(): AccessState {
  if (previewRequested()) {
    return { tier: 'full', email: null, name: null, packKey: null };
  }
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
 * One question: has this visitor given us their details? If so, the whole year
 * opens.
 *
 * It used to open only the three activities in their chosen theme. That made
 * sense while the remaining activities were going to be the paid tripwire.
 * Once the tripwire became a coaching session, holding back 80 activities
 * protected nothing and simply made the magnet stingy. Worse, the headline
 * promises a year of culture building, and delivering three against that
 * promise would be a bait-and-switch.
 *
 * This is a soft gate, enforced in the browser. That is deliberate and it is
 * fine here, because nothing behind it costs money: it exists to trade content
 * for an email address, which is the entire job of a lead magnet.
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
export function canRead(state: AccessState): boolean {
  return state.tier !== 'visitor';
}

/** Whether an activity is in the theme the visitor chose to start with. Used
 *  only to highlight their starting point, never to restrict anything. */
export function isStartingTheme(state: AccessState, activityId: number): boolean {
  return state.tier !== 'visitor' && packActivityIds(state.packKey).has(activityId);
}
