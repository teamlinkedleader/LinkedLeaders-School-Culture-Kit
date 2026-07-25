import { Sparkles, Calendar } from 'lucide-react';
import { activities, monthThemes, categoryColors } from '@/data/activities';
import { ActivityCard } from './ActivityCard';
import type { CultureActivity } from '@/data/activities';

interface ActivityGridProps {
  unlocked: boolean;
  onSubscribeClick: () => void;
  onActivityClick?: (activity: CultureActivity) => void;
}

export function ActivityGrid({ unlocked, onSubscribeClick, onActivityClick }: ActivityGridProps) {
  const sortedMonths = [...monthThemes].sort((a, b) => a.monthIndex - b.monthIndex);
  return (
    <section id="activities" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            52 Culture-Building Activities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">
            A Full Year of
            <span className="text-blue-600"> Intentional Culture</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            Organized by month and themed around the school year rhythm. Each week
            delivers one actionable activity across staff culture, student belonging,
            or family connection.
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {(Object.keys(categoryColors) as CultureActivity['category'][]).map((cat) => {
            const c = categoryColors[cat];
            return (
              <div key={cat} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100">
                <span className={`w-3 h-3 rounded-full ${c.accent}`} />
                <span className="text-sm font-medium text-slate-600">{cat}</span>
              </div>
            );
          })}
        </div>

        {/* Weekly email invitation. Everything is readable already, so this asks
            rather than gates. */}
        {!unlocked && (
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-blue-100" />
              <h3 className="text-xl font-bold text-white">One a week, all year</h3>
            </div>
            <p className="text-blue-100 mb-5 max-w-xl mx-auto">
              Read anything here for free. If you would rather not plan it yourself,
              we will send you the right activity for the right week, every week.
            </p>
            <button
              onClick={onSubscribeClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <Sparkles className="w-5 h-5" />
              Send Me the Weekly Activity
            </button>
          </div>
        )}

        {/* Month sections */}
        <div className="space-y-16">
          {sortedMonths.map((mt) => {
            const monthActivities = activities.filter((a) => a.monthIndex === mt.monthIndex);
            return (
              <div key={mt.monthIndex}>
                {/* Month header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="text-2xl font-bold text-slate-800">{mt.month}</h3>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full">
                        {mt.theme}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{mt.blurb}</p>
                  </div>
                </div>

                {/* Activity cards for this month */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                  {monthActivities.map((activity, i) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      unlocked={unlocked || activity.freePreview === true}
                      index={i}
                      onClick={() => onActivityClick?.(activity)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
