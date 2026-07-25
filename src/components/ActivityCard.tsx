import { Lock, Users, HeartHandshake, Home, Compass, CheckCircle2, ArrowRight, Star, Sparkles } from 'lucide-react';
import { toggleFavourite, useIsFavourite } from '@/lib/favourites';
import type { CultureActivity } from '@/data/activities';
import { categoryColors } from '@/data/activities';

interface ActivityCardProps {
  activity: CultureActivity;
  unlocked: boolean;
  index: number;
  onClick?: () => void;
  /** Opens the unlock form. Every locked card offers this, so someone scanning
   *  the grid never has to scroll back up to find the one button. */
  onClaimClick?: () => void;
}

const iconComponents: Record<string, typeof Users> = {
  Users,
  HeartHandshake,
  Home,
  Compass,
};

export function ActivityCard({
  activity,
  unlocked,
  index,
  onClick,
  onClaimClick,
}: ActivityCardProps) {
  const Icon = iconComponents[activity.icon] ?? Users;
  const colors = categoryColors[activity.category];
  const isFreePreview = activity.freePreview;
  const saved = useIsFavourite(activity.id);

  return (
    <div
      onClick={unlocked ? onClick : onClaimClick}
      // flex column at full height so every card's footer, and therefore every
      // Unlock button, sits on the same line across a row regardless of how
      // many lines the title runs to.
      className={`relative flex h-full flex-col rounded-xl border-2 transition-all duration-300 overflow-hidden group ${
        unlocked
          ? `${colors.bg} ${colors.border} hover:shadow-xl hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`
          : `bg-slate-50 border-slate-200 ${
              onClaimClick ? 'cursor-pointer hover:border-blue-300 hover:shadow-lg' : ''
            }`
      }`}
      style={{
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Save control. Stops propagation so saving does not also open the
          activity, which would be maddening. */}
      {unlocked && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(activity.id);
          }}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${activity.title} from saved` : `Save ${activity.title}`}
          title={saved ? 'Saved' : 'Save this activity'}
          // Always visible, never hover-gated. A control that only appears on
          // hover does not exist on a touch device, and school leaders are
          // heavily on iPads.
          className={`absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            saved
              ? 'bg-brand-purple text-white shadow-sm'
              : 'bg-white/70 text-slate-400 hover:bg-white hover:text-brand-purple'
          }`}
        >
          <Star className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      )}

      {/* Free preview badge */}
      {isFreePreview && unlocked && (
        <div className="absolute top-4 left-4 z-10">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-sm">
            Free Preview
          </span>
        </div>
      )}

      {/* Activity reference, e.g. SEP-4. Sits left of the save control rather
          than under it. This replaced a week number, which broke once a month
          held more than four activities. */}
      <div className={`absolute top-4 ${unlocked ? 'right-12' : 'right-4'}`}>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            unlocked ? 'bg-white/80 text-slate-600' : 'bg-slate-200 text-slate-400'
          }`}
        >
          {activity.ref}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
            unlocked ? `${colors.accent}` : 'bg-slate-300'
          }`}
        >
          {unlocked ? (
            <Icon className="w-6 h-6 text-white" />
          ) : (
            <Lock className="w-5 h-5 text-slate-500" />
          )}
        </div>

        {/* Category tag */}
        <div className={`text-xs font-semibold mb-2 ${unlocked ? colors.text : 'text-slate-400'}`}>
          {activity.category}
        </div>

        {/* Title */}
        <h3
          className={`text-base font-bold mb-2 leading-snug ${
            unlocked ? 'text-slate-800' : 'text-slate-400'
          }`}
        >
          {activity.title}
        </h3>

        {/* Description. Grows to fill whatever the title left over, which is
            what pushes the footer down to a consistent line. */}
        <div className="flex-1">
          {unlocked ? (
            <p className="text-sm text-slate-600 leading-relaxed">{activity.description}</p>
          ) : (
            <div className="space-y-2">
              <div className="h-3 rounded-full bg-slate-200 w-full" />
              <div className="h-3 rounded-full bg-slate-200 w-4/5" />
              <div className="h-3 rounded-full bg-slate-200 w-3/5" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
          <span className={`text-xs font-medium ${unlocked ? 'text-slate-400' : 'text-slate-300'}`}>
            {activity.month} · {activity.theme}
          </span>
          {unlocked ? (
            <div className="flex items-center gap-2">
              {onClick && (
                <span className={`text-xs font-semibold ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}>
                  View
                  <ArrowRight className="w-3 h-3" />
                </span>
              )}
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
            </div>
          ) : (
            onClaimClick && (
              // A real button, not just the clickable card, so this is reachable
              // by keyboard and announced by a screen reader. stopPropagation
              // keeps the card's own handler from firing the modal twice.
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClaimClick();
                }}
                aria-label={`Unlock ${activity.title} and the rest of the year`}
                // z-20 lifts it above the locked card's fade overlay, which
                // otherwise washes the button out to an unreadable grey.
                className="relative z-20 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <Sparkles className="w-3 h-3" />
                Unlock
              </button>
            )
          )}
        </div>
      </div>

      {/* Lock overlay for locked cards */}
      {!unlocked && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
