/**
 * Mentors offered for the one-hour session.
 *
 * Real people, per Mike 2026-07-25: the hour is a choice between Kate, Chad or
 * Mike himself.
 *
 * IMPORTANT: the descriptions below are deliberately minimal, because they are
 * the only things the vault actually supports. No years of service, job titles
 * or specialisms have been invented. Before this goes in front of the public,
 * each person should confirm their own line. Inventing credentials for a real
 * colleague is a worse failure than a thin bio.
 *
 * When this app folds into the main LinkedLeaders application, point
 * `profileUrl` at each mentor's existing page rather than carrying bios here.
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
    id: 'mike-caldwell',
    name: 'Mike Caldwell',
    background: 'Founder of LinkedLeaders. Career in K-12 school leadership.',
    bestFor: 'Building a culture plan from scratch and deciding what to run first',
    profileUrl: null,
  },
  {
    id: 'chad-carlson',
    name: 'Chad Carlson',
    background: 'Former school leader.',
    bestFor: 'Staff culture and the day to day of leading a building',
    profileUrl: null,
  },
  {
    id: 'kate-oconnell',
    name: "Kate O'Connell",
    background: 'Leadership coach. Deep background in K-12 international schools.',
    bestFor: 'Coaching conversations and leaders working outside the US system',
    profileUrl: null,
  },
];

/**
 * Whether these still need each mentor's own sign-off on their line, and links
 * to their real profiles. Drives the caveat shown under the cards.
 */
export const mentorBiosNeedConfirming = mentors.every((m) => m.profileUrl === null);
