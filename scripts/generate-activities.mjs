#!/usr/bin/env node
/**
 * Generates src/data/activities.ts from the activity markdown in
 * src/data/activities/*.md.
 *
 * The markdown files are the source of truth. They are authored in the
 * Obsidian vault and copied into this repo. Do not hand-edit
 * src/data/activities.ts — it is overwritten by this script.
 *
 *   npm run generate:activities
 *
 * Expected markdown shape (see the import spec in the vault):
 *
 *   ---
 *   id: CB-58
 *   month: September
 *   theme: Establish Identity
 *   be_word: BE Consistent
 *   lane: Staff
 *   title: The Chip Bowl (September)
 *   promise: ...
 *   time_display: 20 minutes
 *   time_minutes: 20
 *   cost: $0
 *   leaves_behind: ...
 *   leader_goes_first: true
 *   ---
 *   # Culture Builder: <title>
 *
 *   <one-line promise / description>
 *
 *   ## Objective
 *   ## Time Needed
 *   ## Supplies / Setup
 *   ## Sample Prompts        (optional)
 *   ## How It Works
 *   ## Why It Works
 *   ## Script for the Leader
 *   ## Facilitator Tips
 *   ## Display Idea          (optional)
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ACTIVITY_DIR = join(here, '..', 'src', 'data', 'activities');
const OUT_FILE = join(here, '..', 'src', 'data', 'activities.ts');

/** Month display order. July is the pre-year on-ramp, so it sorts first. */
const MONTH_THEMES = [
  { month: 'July', theme: 'Renewal & Preparation', monthIndex: -1, blurb: 'Before the year begins, the leader names the one sentence everything else gets measured against.' },
  { month: 'August', theme: 'Welcome & Belonging', monthIndex: 0, blurb: 'Set the tone for the year with warm welcomes and shared norms.' },
  { month: 'September', theme: 'Establishing Identity', monthIndex: 1, blurb: 'Build traditions, define roles, and celebrate early wins.' },
  { month: 'October', theme: 'Connection & Recognition', monthIndex: 2, blurb: 'Deepen bonds through team-building, spirit, and kindness.' },
  { month: 'November', theme: 'Gratitude', monthIndex: 3, blurb: 'Make thankfulness visible across staff, students, and families.' },
  { month: 'December', theme: 'Celebration & Care', monthIndex: 4, blurb: 'Honor the season with joy, rest, and support for those in need.' },
  { month: 'January', theme: 'Fresh Start & Goals', monthIndex: 5, blurb: 'Re-center on vision and set goals for the second half.' },
  { month: 'February', theme: 'Kindness & Belonging', monthIndex: 6, blurb: 'Make kindness a daily practice and inclusion a habit.' },
  { month: 'March', theme: 'Perseverance', monthIndex: 7, blurb: 'Sustain morale through the long stretch with wellness and effort.' },
  { month: 'April', theme: 'Appreciation', monthIndex: 8, blurb: 'Recognize the quiet contributors and celebrate the community.' },
  { month: 'May', theme: 'Celebration & Legacy', monthIndex: 9, blurb: "Honor the year's work and send everyone off with pride." },
  { month: 'June', theme: 'Reflection & Closure', monthIndex: 10, blurb: 'Close the year with gratitude, recognition, and connection.' },
  { month: 'Bonus', theme: 'The Collaborative Impact Framework', monthIndex: 11, blurb: 'Clarify, Collaborate, Commit, Coach. A facilitation framework for faculty problem-solving, plus the protocols that power each phase.' },
];

/**
 * The BE word belongs to the month, not to the activity. Mike reassigns
 * activities between months, so theme and BE word are always derived from the
 * month rather than trusted from frontmatter — otherwise a moved activity shows
 * September alongside August's theme.
 */
/**
 * Short month codes for the per-activity reference, e.g. JUL-1, SEP-4.
 *
 * Three letters rather than one, because a single initial collides on seven of
 * the twelve months: J is July, June and January; M is March and May; A is
 * April and August. "J3" would be unreadable.
 */
const MONTH_CODE = {
  July: 'JUL',
  August: 'AUG',
  September: 'SEP',
  October: 'OCT',
  November: 'NOV',
  December: 'DEC',
  January: 'JAN',
  February: 'FEB',
  March: 'MAR',
  April: 'APR',
  May: 'MAY',
  June: 'JUN',
  Bonus: 'CIF',
};

const BE_WORD = {
  July: 'BE Ready',
  August: 'BE Visible',
  September: 'BE Consistent',
  October: 'BE Reachable',
  November: 'BE Grateful',
  December: 'BE Patient & Kind',
  January: 'BE Intentional',
  February: 'BE Authentic & Real',
  March: 'BE Steady',
  April: 'BE Generous',
  May: 'BE Memorable',
  June: 'BE Proud',
  Bonus: 'BE Collective',
};

/**
 * Everything is free to read. Mike's call, 2026-07-24: dismiss the email gate
 * for now, on the reasoning that reach matters more than capture at this stage
 * and the gate can be added later.
 *
 * To re-introduce a gate: set ALL_FREE to false. FREE_PREVIEW then becomes the
 * free sample and everything else is marked gated. Note that a real gate also
 * needs server-side work — every activity currently ships in the client bundle,
 * so `freePreview` alone only changes what the UI displays, not what a
 * determined visitor can read.
 */
const ALL_FREE = true;
const FREE_PREVIEW = new Set(['CB-01', 'CB-02', 'CB-03', 'CB-04', 'CB-10', 'CB-11', 'CB-53']);
const isFree = (code) => ALL_FREE || FREE_PREVIEW.has(code);

/** Lane vocabulary in the markdown maps onto the four display categories. */
const LANE_TO_CATEGORY = {
  Leader: 'Leader',
  Staff: 'Staff Culture',
  Student: 'Student Belonging',
  Family: 'Family & Community',
  Community: 'Family & Community',
};

const CATEGORY_ICON = {
  'Staff Culture': 'Users',
  'Student Belonging': 'HeartHandshake',
  'Family & Community': 'Home',
  Leader: 'Compass',
};

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) throw new Error('missing frontmatter');
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return { fm, body: raw.slice(m[0].length) };
}

/** Split the body into { 'Objective': '...', 'How It Works': '...' } plus the intro. */
function parseSections(body) {
  const parts = body.split(/^## /m);
  const intro = parts.shift() ?? '';
  const sections = {};
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const heading = part.slice(0, nl === -1 ? undefined : nl).trim();
    sections[heading] = (nl === -1 ? '' : part.slice(nl + 1)).trim();
  }
  return { intro, sections };
}

/** The line under the `# Culture Builder: ...` H1 is the card description. */
function introDescription(intro) {
  const lines = intro.split(/\r?\n/).map((l) => l.trim());
  const h1 = lines.findIndex((l) => l.startsWith('# '));
  return lines.slice(h1 + 1).find((l) => l.length > 0) ?? '';
}

const bullets = (text) =>
  (text ?? '')
    .split(/\r?\n/)
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2).trim())
    .filter(Boolean);

const paragraphs = (text) =>
  (text ?? '')
    .split(/\r?\n\r?\n/)
    .map((p) => p.replace(/\s*\r?\n\s*/g, ' ').trim())
    .filter(Boolean);

/**
 * "3. **Draft the sentence (7 minutes).** Complete this: ..."
 *   -> { title: 'Draft the sentence', minutes: '7 min', detail: 'Complete this: ...' }
 */
function parseSteps(text) {
  const steps = [];
  for (const line of (text ?? '').split(/\r?\n/)) {
    const m = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*(.*)$/);
    if (!m) continue;
    let label = m[1].trim().replace(/[.:]$/, '');
    const detail = m[2].trim();
    let minutes;
    const paren = label.match(/^(.*?)\s*\(([^()]*)\)$/);
    if (paren) {
      label = paren[1].trim().replace(/[,.]$/, '');
      const inner = paren[2].trim();
      const mins = inner.match(/(\d+)\s*minute/i);
      const secs = inner.match(/(\d+)\s*second/i);
      if (mins) minutes = `${mins[1]} min`;
      else if (secs) minutes = `${secs[1]} sec`;
      else minutes = inner;
    }
    steps.push({ title: label, detail, ...(minutes ? { minutes } : {}) });
  }
  return steps;
}

/**
 * Script sections often open with a stage direction ("For the staff meeting:")
 * before the quote. Keep the quote, drop the direction.
 */
function parseScript(text) {
  const paras = paragraphs(text);
  const firstQuote = paras.findIndex((p) => p.startsWith('"') || p.startsWith('“'));
  const kept = firstQuote === -1 ? paras : paras.slice(firstQuote);
  return kept.join('\n\n');
}

function categoryFor(lane) {
  const primary = (lane ?? '').split('·')[0].trim();
  return LANE_TO_CATEGORY[primary] ?? 'Staff Culture';
}

function build() {
  const files = readdirSync(ACTIVITY_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const parsed = files.map((file) => {
    const raw = readFileSync(join(ACTIVITY_DIR, file), 'utf8');
    let fm, body;
    try {
      ({ fm, body } = parseFrontmatter(raw));
    } catch (e) {
      throw new Error(`${file}: ${e.message}`);
    }
    const { intro, sections } = parseSections(body);

    const code = fm.id;
    if (!code || !/^CB-\d+$/.test(code)) throw new Error(`${file}: bad or missing id "${fm.id}"`);

    const monthMeta = MONTH_THEMES.find((m) => m.month === fm.month);
    if (!monthMeta) throw new Error(`${file}: unknown month "${fm.month}"`);

    const category = categoryFor(fm.lane);
    const steps = parseSteps(sections['How It Works']);
    if (steps.length === 0) throw new Error(`${file}: no steps parsed from "How It Works"`);

    return {
      code,
      id: Number(code.slice(3)),
      title: (fm.title ?? '').replace(/\s*\([A-Z][a-z]+\)\s*$/, '').trim(),
      category,
      month: fm.month,
      monthIndex: monthMeta.monthIndex,
      theme: monthMeta.theme,
      description: introDescription(intro),
      icon: CATEGORY_ICON[category],
      freePreview: isFree(code) || undefined,
      promise: fm.promise,
      timeDisplay: fm.time_display,
      timeMinutes: fm.time_minutes ? Number(fm.time_minutes) : undefined,
      cost: fm.cost,
      leavesBehind: fm.leaves_behind,
      leaderGoesFirst: fm.leader_goes_first === 'true',
      beWord: BE_WORD[fm.month] ?? fm.be_word,
      lane: fm.lane,
      objective: paragraphs(sections['Objective']).join('\n\n'),
      supplies: bullets(sections['Supplies / Setup']),
      samplePrompts: bullets(sections['Sample Prompts']),
      steps,
      whyItWorks: bullets(sections['Why It Works']),
      leaderScript: parseScript(sections['Script for the Leader']),
      facilitatorTips: bullets(sections['Facilitator Tips']),
      displayIdea: paragraphs(sections['Display Idea']).join('\n\n'),
      learnMore: fm.learn_more ?? '',
      frameworkPhase: fm.framework_phase ?? '',
    };
  });

  // Display order: by month, then by activity number within the month.
  parsed.sort((a, b) => a.monthIndex - b.monthIndex || a.id - b.id);

  // Each activity gets a short reference: its month code plus its position
  // within that month, e.g. JUL-1, SEP-4. This replaces the old "Week N"
  // label, which stopped making sense once months held more than four.
  const perMonth = new Map();
  for (const a of parsed) {
    const n = (perMonth.get(a.month) ?? 0) + 1;
    perMonth.set(a.month, n);
    a.ref = `${MONTH_CODE[a.month] ?? 'ACT'}-${n}`;
  }

  const duplicates = parsed.map((a) => a.code).filter((c, i, all) => all.indexOf(c) !== i);
  if (duplicates.length) throw new Error(`duplicate ids: ${duplicates.join(', ')}`);

  return parsed;
}

const s = (v) => JSON.stringify(v);

function emitActivity(a) {
  const lines = [
    `    id: ${a.id},`,
    `    ref: ${s(a.ref)},`,
    `    title: ${s(a.title)},`,
    `    category: ${s(a.category)},`,
    `    month: ${s(a.month)},`,
    `    monthIndex: ${a.monthIndex},`,
    `    theme: ${s(a.theme)},`,
    `    description: ${s(a.description)},`,
    `    icon: ${s(a.icon)},`,
  ];
  if (a.freePreview) lines.push('    freePreview: true,');
  lines.push(
    `    code: ${s(a.code)},`,
    `    promise: ${s(a.promise)},`,
    `    timeDisplay: ${s(a.timeDisplay)},`,
    `    timeMinutes: ${a.timeMinutes},`,
    `    cost: ${s(a.cost)},`,
    `    leavesBehind: ${s(a.leavesBehind)},`,
    `    leaderGoesFirst: ${a.leaderGoesFirst},`,
    `    beWord: ${s(a.beWord)},`,
    `    lane: ${s(a.lane)},`,
    `    objective: ${s(a.objective)},`,
    `    supplies: [\n${a.supplies.map((x) => `      ${s(x)},`).join('\n')}\n    ],`,
  );
  if (a.samplePrompts.length) {
    lines.push(`    samplePrompts: [\n${a.samplePrompts.map((x) => `      ${s(x)},`).join('\n')}\n    ],`);
  }
  lines.push(
    `    steps: [\n${a.steps
      .map(
        (st) =>
          `      {\n        title: ${s(st.title)},\n${
            st.minutes ? `        minutes: ${s(st.minutes)},\n` : ''
          }        detail: ${s(st.detail)},\n      },`,
      )
      .join('\n')}\n    ],`,
    `    whyItWorks: [\n${a.whyItWorks.map((x) => `      ${s(x)},`).join('\n')}\n    ],`,
    `    leaderScript: ${s(a.leaderScript)},`,
    `    facilitatorTips: [\n${a.facilitatorTips.map((x) => `      ${s(x)},`).join('\n')}\n    ],`,
  );
  if (a.displayIdea) lines.push(`    displayIdea: ${s(a.displayIdea)},`);
  if (a.learnMore) lines.push(`    learnMore: ${s(a.learnMore)},`);
  if (a.frameworkPhase) lines.push(`    frameworkPhase: ${s(a.frameworkPhase)},`);
  return `  {\n${lines.join('\n')}\n  },`;
}

function emit(parsed) {
  const byMonth = [];
  let current = null;
  for (const a of parsed) {
    if (a.month !== current) {
      current = a.month;
      byMonth.push(`\n  // ${a.month} — ${a.theme}`);
    }
    byMonth.push(emitActivity(a));
  }

  return `// GENERATED FILE — DO NOT EDIT BY HAND.
// Source of truth: src/data/activities/*.md
// Regenerate with: npm run generate:activities
// ${parsed.length} activities.

export interface ActivityStep {
  title: string;
  detail: string;
  minutes?: string;
}

export interface CultureActivity {
  id: number;
  /** Short human reference, e.g. "SEP-4". Month code plus position in month. */
  ref: string;
  title: string;
  category: 'Staff Culture' | 'Student Belonging' | 'Family & Community' | 'Leader';
  month: string;
  monthIndex: number;
  theme: string;
  description: string;
  icon: string;
  freePreview?: boolean;
  code?: string;
  promise?: string;
  timeDisplay?: string;
  timeMinutes?: number;
  cost?: string;
  leavesBehind?: string;
  leaderGoesFirst?: boolean;
  beWord?: string;
  lane?: string;
  objective?: string;
  supplies?: string[];
  samplePrompts?: string[];
  steps?: ActivityStep[];
  whyItWorks?: string[];
  leaderScript?: string;
  facilitatorTips?: string[];
  displayIdea?: string;
  /** Attribution link for externally-developed methods. */
  learnMore?: string;
  /** Which phase of the Collaborative Impact Framework this serves. */
  frameworkPhase?: string;
}

export const monthThemes: { month: string; theme: string; monthIndex: number; blurb: string }[] = [
${MONTH_THEMES.map((m) => `  { month: ${s(m.month)}, theme: ${s(m.theme)}, monthIndex: ${m.monthIndex}, blurb: ${s(m.blurb)} },`).join('\n')}
];

export const activities: CultureActivity[] = [
${byMonth.join('\n')}
];

export const categoryColors: Record<CultureActivity['category'], { bg: string; text: string; border: string; accent: string }> = {
  'Staff Culture': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    accent: 'bg-blue-600',
  },
  'Student Belonging': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    accent: 'bg-indigo-600',
  },
  'Family & Community': {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    accent: 'bg-teal-600',
  },
  'Leader': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    accent: 'bg-amber-600',
  },
};
`;
}

const parsed = build();
writeFileSync(OUT_FILE, emit(parsed), 'utf8');

const counts = parsed.reduce((acc, a) => ({ ...acc, [a.month]: (acc[a.month] ?? 0) + 1 }), {});
console.log(`Wrote ${parsed.length} activities to src/data/activities.ts`);
for (const [month, n] of Object.entries(counts)) console.log(`  ${month}: ${n}`);
console.log(`  free preview: ${parsed.filter((a) => a.freePreview).length}`);
