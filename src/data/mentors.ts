/**
 * Mentors offered for the one-hour session.
 *
 * PLACEHOLDER DATA. These are not real people and are deliberately generic so
 * nobody reviewing the site mistakes them for actual LinkedLeaders mentors.
 *
 * When this app is folded into the main LinkedLeaders application, replace this
 * file with a query against the existing mentor records. The shape below is
 * intended to map onto that: keep `id` as whatever the platform's mentor
 * identifier is, and point `profileUrl` at the real mentor page rather than
 * carrying bios around in this repo.
 */

export const SESSION_PRICE_USD = 39;

export interface Mentor {
  id: string;
  /** Displayed name. Placeholder until wired to real mentor records. */
  name: string;
  /** What they did before, which is the credibility line that matters. */
  background: string;
  /** What a leader would come to this person for. */
  bestFor: string;
  /** Link to the mentor's page in the main application. Null while placeholder. */
  profileUrl: string | null;
}

export const mentors: Mentor[] = [
  {
    id: 'placeholder-1',
    name: 'Mentor One',
    background: 'Former elementary principal, 14 years',
    bestFor: 'Staff culture in a building that has had a lot of turnover',
    profileUrl: null,
  },
  {
    id: 'placeholder-2',
    name: 'Mentor Two',
    background: 'Former middle school principal and district director',
    bestFor: 'Student belonging and the middle years, where culture gets hardest',
    profileUrl: null,
  },
  {
    id: 'placeholder-3',
    name: 'Mentor Three',
    background: 'Former high school principal, now a leadership coach',
    bestFor: 'First-year leaders building their first culture plan',
    profileUrl: null,
  },
];

/** True while the cards above are stand-ins rather than real mentor records. */
export const mentorsArePlaceholders = mentors.every((m) => m.profileUrl === null);
