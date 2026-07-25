import { CalendarCheck, Check } from 'lucide-react';
import type { AccessState } from '@/lib/access';
import { MentorCards } from './MentorCards';

interface CoachingOfferProps {
  access: AccessState;
}

/**
 * The tripwire.
 *
 * Deliberately not a content unlock. The full year of activities is the free
 * lead magnet, traded for an email; what is sold here is an hour with someone
 * who has done the job, which is the one thing that cannot be copied,
 * forwarded or scraped.
 */
export function CoachingOffer({ access }: CoachingOfferProps) {
  const opener = access.name ? `${access.name}, you` : 'You';

  return (
    <section id="coaching" className="py-20 md:py-24 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-5">
          <CalendarCheck className="w-4 h-4 text-blue-300" />
          <span className="text-sm font-semibold text-blue-100">One hour, one-to-one</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Design your culture strategy with someone who has done the job
        </h2>

        <p className="mt-5 text-lg text-slate-300 leading-relaxed">
          {opener} now have a year of activities. The hard part was never finding ideas, it is
          deciding which few matter for your building this year and actually running them. That is
          what the hour is for.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 text-left max-w-xl mx-auto">
          {[
            'Look at your school and pick the few moves that matter',
            'Build a term of culture work onto your real calendar',
            'Pressure-test it with a former school leader',
            'Leave with a plan you have already talked through',
          ].map((line) => (
            <li key={line} className="flex gap-2.5 text-sm text-slate-200">
              <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-left">
          <MentorCards tone="dark" />
        </div>

        <p className="mt-8 text-xs text-slate-400 max-w-md mx-auto">
          Not sure yet? Unlock the year first and come back once you know what you want to work on.
        </p>
      </div>
    </section>
  );
}
