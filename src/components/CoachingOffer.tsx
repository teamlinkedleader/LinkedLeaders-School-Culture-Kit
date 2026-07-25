import { CalendarCheck, Check, AlertTriangle } from 'lucide-react';
import { PACK_SIZE } from '@/data/packs';
import type { AccessState } from '@/lib/access';

const PRICE_USD = 29;

/**
 * Where the booking flow lives.
 *
 * Set this to the Stripe Payment Link (with the scheduler as its success URL)
 * or directly to the scheduling page if payment is collected there. Until it is
 * set, the button below is disabled rather than pretending to work.
 */
const BOOKING_URL: string | null = null;

interface CoachingOfferProps {
  access: AccessState;
}

/**
 * The tripwire.
 *
 * Deliberately not a content unlock. Every activity on this site is free to
 * read; what is being sold is an hour with someone who has done the job, which
 * is the one thing that cannot be copied, forwarded or scraped.
 */
export function CoachingOffer({ access }: CoachingOfferProps) {
  // Sentence has to read correctly whether or not we know their name.
  const opener = access.name ? `${access.name}, every` : 'Every';

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
          {opener} activity here is free to read. The hard part is not finding ideas, it is
          deciding which three matter for your building this year and actually running them. That is
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

        <div className="mt-9 flex flex-col items-center gap-4">
          <p className="text-white">
            <span className="text-4xl font-bold">${PRICE_USD}</span>
            <span className="text-slate-400 text-sm ml-2">for the hour</span>
          </p>

          {BOOKING_URL ? (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <CalendarCheck className="w-4 h-4" />
              Book your session
            </a>
          ) : (
            <>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 text-white font-semibold opacity-50 cursor-not-allowed"
              >
                <CalendarCheck className="w-4 h-4" />
                Book your session
              </button>
              <p className="flex items-start gap-2 text-xs text-amber-300/90 max-w-md text-left">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Booking is not connected yet. Set <code>BOOKING_URL</code> in CoachingOffer.tsx to
                  the payment or scheduling link and this becomes live.
                </span>
              </p>
            </>
          )}

          <p className="text-xs text-slate-400 max-w-md">
            Not sure yet? Start with your free {PACK_SIZE}-activity kit and come back when you know
            what you want to work on.
          </p>
        </div>
      </div>
    </section>
  );
}
