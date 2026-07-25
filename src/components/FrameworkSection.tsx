import { Workflow } from 'lucide-react';
import { activities, type CultureActivity } from '@/data/activities';
import { ActivityCard } from './ActivityCard';
import { SelfAssessment } from './SelfAssessment';
import { canRead, type AccessState } from '@/lib/access';

/** The Bonus grouping sits at monthIndex 11, after the calendar months. */
const BONUS_MONTH_INDEX = 11;

const phases = [
  { name: 'Clarify', question: 'What matters?', detail: 'Build a shared understanding before solving the problem.' },
  { name: 'Collaborate', question: 'What do we see?', detail: 'Harness the collective expertise of the faculty.' },
  { name: 'Commit', question: 'What will we do?', detail: 'Convert ideas into action with named owners.' },
  { name: 'Coach', question: 'How will we know?', detail: 'Sustain momentum through observation and celebration.' },
];

interface FrameworkSectionProps {
  access: AccessState;
  onActivityClick?: (activity: CultureActivity) => void;
}

/**
 * The Collaborative Impact Framework, given its own section.
 *
 * It previously existed only as a "Bonus" group buried at the end of an 83-card
 * activity grid, with the self-assessment floating separately below it. That
 * undersold the one asset here that is LinkedLeaders' own: the activities are a
 * library, the framework is the method.
 *
 * Order inside the section is deliberate: the four phases, then the
 * self-assessment (which tells a leader which phase they are weakest in), then
 * the protocols that serve each phase. Diagnose, then prescribe.
 */
export function FrameworkSection({ access, onActivityClick }: FrameworkSectionProps) {
  const bonus = activities.filter((a) => a.monthIndex === BONUS_MONTH_INDEX);

  return (
    <section id="framework" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-brand-purple text-sm font-semibold mb-4">
            <Workflow className="w-4 h-4" />
            The LinkedLeaders Method
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">
            The Collaborative
            <span className="text-blue-500"> Impact Framework</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            Activities are the easy part. Getting a faculty to own the work together is the job.
            Four phases, four questions, and the protocols that make each one happen.
          </p>
        </div>

        {/* The four phases */}
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {phases.map((p, i) => (
            <li key={p.name} className="rounded-xl border border-brand-border bg-blue-50/60 p-5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
                Phase {i + 1}
              </span>
              <h3 className="mt-1.5 text-xl font-bold text-slate-800">{p.name}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">{p.question}</p>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{p.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Diagnose: which phase are you weakest in */}
      <SelfAssessment />

      {/* Prescribe: the protocols that serve each phase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            The protocols
          </h3>
          <p className="mt-3 text-slate-500 leading-relaxed">
            {bonus.length} facilitation tools for faculty meetings and retreats. Each one names the
            phase it serves, so you can pick by where you are rather than by preference.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {bonus.map((activity, i) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              unlocked={canRead(access)}
              index={i}
              onClick={() => onActivityClick?.(activity)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
