/**
 * Three-pack culture kits.
 *
 * A visitor chooses one theme and gets three activities from it free, in
 * exchange for their details. Everything else is behind the one-time unlock.
 *
 * Packs are derived from the month themes rather than hand-listed, so adding
 * activities or months never leaves this file stale. A theme only becomes a
 * pack once it has enough activities to fill one.
 */
import { activities, monthThemes, type CultureActivity } from './activities';

export const PACK_SIZE = 3;

export interface CulturePack {
  /** Stable key stored in `subscribers.pack_theme`. Uses the month, not the
   *  theme text, because theme wording may be reworded and the month will not. */
  key: string;
  month: string;
  theme: string;
  blurb: string;
  monthIndex: number;
  activities: CultureActivity[];
}

/**
 * The three activities offered for a theme.
 *
 * Deliberately the first three in display order rather than a random or rotating
 * selection: the pack has to be identical for everyone, or two people comparing
 * notes get different content for the same choice, and support becomes guesswork.
 */
function packFor(monthIndex: number): CultureActivity[] {
  return activities.filter((a) => a.monthIndex === monthIndex).slice(0, PACK_SIZE);
}

export const packs: CulturePack[] = monthThemes
  .map((m) => ({
    key: m.month,
    month: m.month,
    theme: m.theme,
    blurb: m.blurb,
    monthIndex: m.monthIndex,
    activities: packFor(m.monthIndex),
  }))
  .filter((p) => p.activities.length === PACK_SIZE);

export const packByKey = (key: string | null | undefined): CulturePack | undefined =>
  packs.find((p) => p.key === key);

/** Activity ids included in a given pack, for fast lookup when rendering the grid. */
export const packActivityIds = (key: string | null | undefined): Set<number> =>
  new Set(packByKey(key)?.activities.map((a) => a.id) ?? []);

/** Themes that exist but cannot yet fill a pack. Surfaced so a thin month is visible. */
export const themesWithoutAPack = monthThemes
  .filter((m) => packFor(m.monthIndex).length < PACK_SIZE)
  .map((m) => m.month);
