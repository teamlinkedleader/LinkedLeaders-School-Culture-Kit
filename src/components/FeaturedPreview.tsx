import { HeartHandshake, Clock, DollarSign, Compass, Flag, UserCheck, ArrowRight, Eye } from 'lucide-react';
import type { CultureActivity } from '@/data/activities';
import { categoryColors } from '@/data/activities';
import { totalActivities } from '@/data/stats';
import { canRead, type AccessState } from '@/lib/access';

interface FeaturedPreviewProps {
  activity: CultureActivity;
  onOpen: () => void;
  onSubscribeClick: () => void;
  access: AccessState;
}

/**
 * The one activity shown in full before signing up.
 *
 * Everything here is framed twice, because the section means two different
 * things either side of the gate. To a visitor it is proof, and calling it a
 * free preview is accurate. To someone who has already unlocked the year it is
 * simply the first activity, and "preview" would be describing content they
 * already have.
 */
export function FeaturedPreview({ activity, onOpen, onSubscribeClick, access }: FeaturedPreviewProps) {
  const colors = categoryColors[activity.category];
  const unlocked = canRead(access);

  return (
    <section id="featured-preview" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {unlocked ? (
            <>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
                <Flag className="w-4 h-4" />
                Start Here
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">
                If You Only Run One,
                <span className="text-blue-600"> Run This One</span>
              </h2>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                All {totalActivities} are open to you now, which is its own problem. Start with this
                one and the rest will make more sense.
              </p>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
                <Eye className="w-4 h-4" />
                Free Preview
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">
                See What You Get
                <span className="text-blue-600"> Before You Sign Up</span>
              </h2>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                This is a complete, unabridged activity, exactly what you'll get every week. This one
                is free to read in full. The other {totalActivities - 1} open when you sign up.
              </p>
            </>
          )}
        </div>

        {/* Featured card */}
        <div className="relative max-w-5xl mx-auto">
          <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} overflow-hidden shadow-xl`}>
            {/* Top banner */}
            <div className={`bg-gradient-to-r ${colors.accent} px-6 py-3 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-sm tracking-wide uppercase">
                  {activity.code} · {activity.category}
                </span>
              </div>
              <span className="text-white/90 text-sm font-medium">
                {activity.month} · {activity.ref}
              </span>
            </div>

            <div className="grid md:grid-cols-5 gap-0">
              {/* Left: promise + meta */}
              <div className="md:col-span-2 p-7 md:p-9 border-b md:border-b-0 md:border-r border-slate-200/60">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                  {activity.title}
                </h3>
                {activity.promise && (
                  <p className={`mt-3 text-base font-medium ${colors.text} italic leading-relaxed`}>
                    {activity.promise}
                  </p>
                )}

                {activity.objective && (
                  <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                    {activity.objective}
                  </p>
                )}

                {/* Meta pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {activity.timeDisplay && <MetaPill icon={Clock} label={activity.timeDisplay} />}
                  {activity.cost && <MetaPill icon={DollarSign} label={activity.cost} />}
                  {activity.lane && <MetaPill icon={Compass} label={activity.lane} />}
                  {activity.beWord && <MetaPill icon={Flag} label={activity.beWord} />}
                  {activity.leaderGoesFirst && <MetaPill icon={UserCheck} label="Leader goes first" />}
                </div>
              </div>

              {/* Right: steps preview */}
              <div className="md:col-span-3 p-7 md:p-9 bg-white/60">
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">
                  The 5 Steps
                </h4>
                <ol className="space-y-3">
                  {activity.steps?.slice(0, 3).map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <div className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full ${colors.accent} text-white text-xs font-bold`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-slate-800">{step.title}</span>
                          {step.minutes && (
                            <span className="text-xs text-slate-400 font-medium">{step.minutes}</span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                  <li className="flex gap-3 items-center text-slate-400">
                    <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-500 text-xs font-bold">
                      4
                    </div>
                    <span className="text-sm font-medium italic">Plus 2 more steps inside…</span>
                  </li>
                </ol>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onOpen}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg ${colors.accent} text-white font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg`}
                  >
                    Read the Full Activity
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {/* Nothing left to ask for once they have signed up. */}
                  {!unlocked && (
                    <button
                      onClick={onSubscribeClick}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
                    >
                      Get the Weekly Email
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Leaves behind strip */}
            {activity.leavesBehind && (
              <div className="px-7 md:px-9 py-4 bg-white/80 border-t border-slate-200/60">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-0.5">
                    Leaves behind
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {activity.leavesBehind}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaPill({ icon: Icon, label }: { icon: typeof Clock; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-slate-600 font-medium text-xs">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
