import { useEffect } from 'react';
import {
  X,
  Clock,
  DollarSign,
  FileText,
  Package,
  ListChecks,
  Lightbulb,
  MessageSquareQuote,
  Sparkles,
  Compass,
  Flag,
  Repeat,
  UserCheck,
  HelpCircle,
  Image,
  ExternalLink,
  Workflow,
  Lock,
} from 'lucide-react';
import type { CultureActivity } from '@/data/activities';
import { categoryColors } from '@/data/activities';

interface ActivityCornerProps {
  /** Whether this visitor's access tier allows reading the full activity. */
  readable?: boolean;
  onClaimClick?: () => void;
  activity: CultureActivity | null;
  onClose: () => void;
}

export function ActivityCorner({activity, onClose, readable = true, onClaimClick }: ActivityCornerProps) {
  useEffect(() => {
    if (activity) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [activity, onClose]);

  if (!activity) return null;

  const colors = categoryColors[activity.category];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-[fadeIn_0.2s_ease-out]"
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-white z-50 shadow-2xl overflow-y-auto animate-[slideInRight_0.3s_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-label={`${activity.title} details`}
      >
        {/* Sticky header */}
        <div className={`sticky top-0 z-10 ${colors.bg} ${colors.border} border-b-2 px-6 py-5`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 ${colors.text}`}>
                  {activity.code ?? `Activity ${activity.id}`}
                </span>
                <span className={`text-xs font-semibold ${colors.text}`}>{activity.category}</span>
                {activity.freePreview && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                    Free Preview
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-800 leading-snug">{activity.title}</h2>
              {activity.promise && (
                <p className={`mt-2 text-sm font-medium ${colors.text} italic`}>
                  {activity.promise}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-2 rounded-lg text-slate-500 hover:bg-white/60 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Meta strip */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            {activity.timeDisplay && (
              <MetaPill icon={Clock} label={activity.timeDisplay} />
            )}
            {activity.cost && <MetaPill icon={DollarSign} label={activity.cost} />}
            {activity.lane && <MetaPill icon={Compass} label={activity.lane} />}
            {activity.beWord && <MetaPill icon={Flag} label={activity.beWord} />}
            {activity.leaderGoesFirst && (
              <MetaPill icon={UserCheck} label="Leader goes first" />
            )}
          </div>
        </div>

        {/* Body */}
        {!readable ? (
          <div className="px-6 py-14 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 mx-auto mb-4">
              <Lock className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Unlock this and the rest of the year</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
              {activity.promise}
            </p>
            <button
              type="button"
              onClick={onClaimClick}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg"
            >
              Unlock the year
            </button>
          </div>
        ) : (
        <div className="px-6 py-6 space-y-8">
          {/* Objective */}
          {activity.objective && (
            <Section icon={FileText} title="The Point">
              <p className="text-sm text-slate-600 leading-relaxed">{activity.objective}</p>
            </Section>
          )}

          {/* Leaves behind */}
          {activity.leavesBehind && (
            <Section icon={Sparkles} title="What It Leaves Behind">
              <p className="text-sm text-slate-600 leading-relaxed">{activity.leavesBehind}</p>
            </Section>
          )}

          {/* Supplies */}
          {activity.supplies && activity.supplies.length > 0 && (
            <Section icon={Package} title="Supplies">
              <ul className="space-y-2">
                {activity.supplies.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Sample prompts */}
          {activity.samplePrompts && activity.samplePrompts.length > 0 && (
            <Section icon={HelpCircle} title="Prompts You Can Use">
              <ul className="space-y-2">
                {activity.samplePrompts.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Steps */}
          {activity.steps && activity.steps.length > 0 && (
            <Section icon={ListChecks} title="Step by Step">
              <ol className="space-y-4">
                {activity.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <div className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full ${colors.accent} text-white text-xs font-bold`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-slate-800">{step.title}</h4>
                        {step.minutes && (
                          <span className="text-xs text-slate-400 font-medium">{step.minutes}</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {/* Why it works */}
          {activity.whyItWorks && activity.whyItWorks.length > 0 && (
            <Section icon={Lightbulb} title="Why It Works">
              <ul className="space-y-3">
                {activity.whyItWorks.map((w, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.accent} shrink-0`} />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Leader script */}
          {activity.leaderScript && (
            <Section icon={MessageSquareQuote} title="Leader Script">
              <blockquote className={`border-l-4 ${colors.border} pl-4 py-1 text-sm text-slate-700 leading-relaxed italic`}>
                {activity.leaderScript}
              </blockquote>
            </Section>
          )}

          {/* Facilitator tips */}
          {activity.facilitatorTips && activity.facilitatorTips.length > 0 && (
            <Section icon={Repeat} title="Facilitator Tips">
              <ul className="space-y-3">
                {activity.facilitatorTips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                    <span className="text-slate-400 mt-0.5">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Collaborative Impact Framework phase */}
          {activity.frameworkPhase && (
            <Section icon={Workflow} title="Where This Fits">
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">{activity.frameworkPhase}</span> in
                the Collaborative Impact Framework: Clarify, Collaborate, Commit, Coach.
              </p>
            </Section>
          )}

          {/* Attribution for externally-developed methods */}
          {activity.learnMore && (
            <Section icon={ExternalLink} title="Where This Comes From">
              <p className="text-sm text-slate-600 leading-relaxed">
                This is our take on an established facilitation method. Learn more from the source:{' '}
                <a
                  href={activity.learnMore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all hover:text-blue-700"
                >
                  {activity.learnMore}
                </a>
              </p>
            </Section>
          )}

          {/* Display idea */}
          {activity.displayIdea && (
            <Section icon={Image} title="Make It Visible">
              <p className="text-sm text-slate-600 leading-relaxed">{activity.displayIdea}</p>
            </Section>
          )}
        </div>
        )}

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {activity.month} · {activity.theme}
          </span>
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </aside>
    </>
  );
}

function MetaPill({ icon: Icon, label }: { icon: typeof Clock; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-slate-600 font-medium">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof FileText;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </section>
  );
}
