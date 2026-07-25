/**
 * Building Capacity Self-Reflection Tool.
 *
 * Statements, scale and reflection prompts are taken verbatim from Mike's
 * printed tool. Do not reword them.
 *
 * The `phase` on each statement maps it onto the Collaborative Impact
 * Framework, which is what lets the results point a leader at the protocols
 * for their weakest phase rather than just handing back a number.
 *
 * Note the phase distribution is uneven: Clarify 2, Collaborate 3, Commit 1,
 * Coach 4. That comes from the source tool, which was not written against the
 * framework. Commit resting on a single statement is flagged in the UI so the
 * score is not over-read. Adding two Commit statements would fix it, but that
 * changes Mike's instrument and is his call.
 */

export type FrameworkPhase = 'Clarify' | 'Collaborate' | 'Commit' | 'Coach';

export interface AssessmentStatement {
  id: number;
  text: string;
  phase: FrameworkPhase;
}

export const ratingScale: { value: number; label: string; descriptor: string }[] = [
  { value: 1, label: 'Rarely', descriptor: 'I seldom demonstrate this behavior.' },
  { value: 2, label: 'Sometimes', descriptor: 'I demonstrate this behavior inconsistently.' },
  { value: 3, label: 'Often', descriptor: 'I demonstrate this behavior most of the time.' },
  { value: 4, label: 'Very Often', descriptor: 'I demonstrate this behavior frequently.' },
  { value: 5, label: 'Consistently', descriptor: 'I demonstrate this behavior regularly and with intention.' },
];

export const statements: AssessmentStatement[] = [
  { id: 1, text: 'I assume team members have the ability to learn and grow.', phase: 'Clarify' },
  { id: 2, text: 'I create and communicate a clear vision that inspires and guides our work.', phase: 'Clarify' },
  { id: 3, text: 'I invite and value the ideas of others when addressing challenges and making decisions.', phase: 'Collaborate' },
  { id: 4, text: 'I build confidence and ownership by empowering others to lead and contribute.', phase: 'Commit' },
  { id: 5, text: 'I establish a supportive environment where learning and risk-taking are safe.', phase: 'Collaborate' },
  { id: 6, text: 'I invest in developing the knowledge and skills of others.', phase: 'Coach' },
  { id: 7, text: 'I encourage collaboration and leverage the strengths of our team.', phase: 'Collaborate' },
  { id: 8, text: 'I provide feedback and support that helps others improve.', phase: 'Coach' },
  { id: 9, text: 'I remove barriers and provide resources so our team can succeed.', phase: 'Coach' },
  { id: 10, text: 'I celebrate progress and recognize the contributions of others.', phase: 'Coach' },
];

export const reflectionPrompts: string[] = [
  'What are my strengths as they relate to building capacity?',
  'Which areas will have the greatest impact if I grow in them?',
  'What is one specific action I will take in the next 30 days to build capacity in others?',
];

export const phaseGuidance: Record<
  FrameworkPhase,
  { question: string; meaning: string; protocols: string[] }
> = {
  Clarify: {
    question: 'What matters?',
    meaning:
      'Building a shared understanding before solving the problem. A low score here usually means people are being asked to act on a problem they have never actually agreed on.',
    protocols: ['Future Search', 'Open Space', 'Appreciative Inquiry'],
  },
  Collaborate: {
    question: 'What do we see?',
    meaning:
      'Harnessing the collective expertise of the faculty. A low score here often means the same confident few are contributing and everyone else is waiting.',
    protocols: ['World Café', 'Fishbowl', 'Consultancy Protocol', 'Liberating Structures'],
  },
  Commit: {
    question: 'What will we do?',
    meaning:
      'Converting ideas into action with named owners. A low score here is the most common failure in schools: good conversations that nobody is doing anything about on Monday.',
    protocols: ['Success Gallery Walk', 'Design Thinking Sprint', 'The Collective Ownership Session'],
  },
  Coach: {
    question: 'How will we know?',
    meaning:
      'Sustaining momentum through observation, coaching and celebration. A low score here means commitments are made and never revisited, which teaches people not to make them honestly.',
    protocols: ['The Collaborative Impact Framework', 'The Collective Ownership Session'],
  },
};

export const bands: { min: number; max: number; label: string; note: string }[] = [
  {
    min: 10,
    max: 20,
    label: 'Emerging',
    note: 'You are carrying most of the load yourself. The fastest gains here come from one structural change rather than trying to improve everything at once.',
  },
  {
    min: 21,
    max: 30,
    label: 'Developing',
    note: 'The intent is there and the practice is inconsistent. Pick your lowest phase and make one routine out of it rather than relying on remembering.',
  },
  {
    min: 31,
    max: 40,
    label: 'Strong',
    note: 'You build capacity deliberately in most areas. Your lowest phase is where the next real gain is, and it is probably the one you find least comfortable.',
  },
  {
    min: 41,
    max: 50,
    label: 'Embedded',
    note: 'This is how you lead rather than something you do. The useful question now is whether it survives your absence, which is the actual test of capacity.',
  },
];

export const phaseOrder: FrameworkPhase[] = ['Clarify', 'Collaborate', 'Commit', 'Coach'];

/** Statement counts per phase, used to caveat thinly-supported scores. */
export const phaseCounts: Record<FrameworkPhase, number> = phaseOrder.reduce(
  (acc, p) => ({ ...acc, [p]: statements.filter((s) => s.phase === p).length }),
  {} as Record<FrameworkPhase, number>,
);
