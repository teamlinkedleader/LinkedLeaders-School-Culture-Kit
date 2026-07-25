/**
 * Headline figures, derived from the activity data rather than typed into copy.
 *
 * Every number the marketing copy quotes comes from here. Nothing about the
 * collection's size should be hardcoded in a component again: adding activity
 * markdown and regenerating is all it should take for the site to say the right
 * thing.
 */
import { activities, monthThemes } from './activities';

/** The Bonus grouping is not a calendar month, so it is excluded from month counts. */
const BONUS = 'Bonus';

export const totalActivities = activities.length;

export const calendarActivities = activities.filter((a) => a.month !== BONUS).length;

export const bonusActivities = activities.filter((a) => a.month === BONUS).length;

/** Calendar months that actually have at least one activity in them. */
export const monthsCovered = monthThemes.filter(
  (m) => m.month !== BONUS && activities.some((a) => a.monthIndex === m.monthIndex),
).length;

/** Distinct lanes in use, e.g. Staff Culture / Student Belonging / Family & Community / Leader. */
export const culturePillars = new Set(activities.map((a) => a.category)).size;

/**
 * How the collection is described in prose. Reads naturally at any size and
 * never claims a round number the data does not support.
 */
export const activityCountLabel = `${totalActivities} activities`;

export const collectionSummary =
  `${calendarActivities} culture-building activities across ${monthsCovered} months of the school year` +
  (bonusActivities > 0 ? `, plus ${bonusActivities} bonus facilitation tools` : '');
