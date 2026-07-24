import { Lock, Users, HeartHandshake, Home, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import type { CultureActivity } from '@/data/activities';
import { categoryColors } from '@/data/activities';

interface ActivityCardProps {
  activity: CultureActivity;
  unlocked: boolean;
  index: number;
  onClick?: () => void;
}

const iconComponents: Record<string, typeof Users> = {
  Users,
  HeartHandshake,
  Home,
  Compass,
};

export function ActivityCard({ activity, unlocked, index, onClick }: ActivityCardProps) {
  const Icon = iconComponents[activity.icon] ?? Users;
  const colors = categoryColors[activity.category];
  const isFreePreview = activity.freePreview;

  return (
    <div
      onClick={unlocked ? onClick : undefined}
      className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden group ${
        unlocked
          ? `${colors.bg} ${colors.border} hover:shadow-xl hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`
          : 'bg-slate-50 border-slate-200'
      }`}
      style={{
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Free preview badge */}
      {isFreePreview && unlocked && (
        <div className="absolute top-4 left-4 z-10">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-sm">
            Free Preview
          </span>
        </div>
      )}

      {/* Week badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            unlocked ? 'bg-white/80 text-slate-600' : 'bg-slate-200 text-slate-400'
          }`}
        >
          Week {activity.week}
        </span>
      </div>

      <div className="p-6">
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

        {/* Description */}
        {unlocked ? (
          <p className="text-sm text-slate-600 leading-relaxed">{activity.description}</p>
        ) : (
          <div className="space-y-2">
            <div className="h-3 rounded-full bg-slate-200 w-full" />
            <div className="h-3 rounded-full bg-slate-200 w-4/5" />
            <div className="h-3 rounded-full bg-slate-200 w-3/5" />
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between">
          <span className={`text-xs font-medium ${unlocked ? 'text-slate-400' : 'text-slate-300'}`}>
            {activity.month} · {activity.theme}
          </span>
          {unlocked && (
            <div className="flex items-center gap-2">
              {onClick && (
                <span className={`text-xs font-semibold ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}>
                  View
                  <ArrowRight className="w-3 h-3" />
                </span>
              )}
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
            </div>
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
