import { UserRound, CalendarCheck, ArrowRight } from 'lucide-react';
import {
  mentors,
  mentorBiosNeedConfirming,
  MENTOR_DIRECTORY_URL,
  BOOKING_URL,
} from '@/data/mentors';
import { SessionPrice } from './SessionPrice';

interface MentorCardsProps {
  /** 'dark' for the slate section, 'light' for the modal. */
  tone?: 'dark' | 'light';
}

/**
 * The bookable mentors, under the offer's headline call to action.
 *
 * The heading, the price, the per-mentor Book now buttons and the link to the
 * full directory all live here rather than in the two callers, so the pop-up
 * and the in-page section stay identical. They previously carried their own
 * price treatment below the cards, which meant two places to restyle and two
 * chances to drift.
 */
export function MentorCards({ tone = 'dark' }: MentorCardsProps) {
  const dark = tone === 'dark';

  return (
    <div>
      {/* The call to action, immediately above the cards it refers to. */}
      <div className="text-center mb-6">
        <h3
          className={`text-2xl md:text-3xl font-bold tracking-tight ${
            dark ? 'text-white' : 'text-slate-800'
          }`}
        >
          Book an hour with a culture coach
        </h3>
        <div className="mt-3 flex justify-center">
          <SessionPrice size="lg" tone={dark ? 'dark' : 'light'} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {mentors.map((m) => {
          // A mentor's own page when we have it, the booking flow when it is
          // live, the directory otherwise. Every Book now goes somewhere real.
          const href = m.profileUrl ?? BOOKING_URL ?? MENTOR_DIRECTORY_URL;

          return (
            <div
              key={m.id}
              className={`flex flex-col rounded-xl border p-4 text-left ${
                dark ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-white'
              }`}
            >
              <div
                className={`flex items-center justify-center w-11 h-11 rounded-full mb-3 ${
                  dark ? 'bg-white/10' : 'bg-slate-100'
                }`}
              >
                <UserRound className={`w-5 h-5 ${dark ? 'text-blue-300' : 'text-slate-400'}`} />
              </div>
              <p className={`text-sm font-bold ${dark ? 'text-white' : 'text-slate-800'}`}>
                {m.name}
              </p>
              <p className={`text-xs mt-0.5 ${dark ? 'text-blue-200/80' : 'text-blue-600'}`}>
                {m.background}
              </p>
              {/* Grows so every Book now sits on the same line across the row,
                  however long the description runs. */}
              <p
                className={`flex-1 text-xs mt-2 leading-relaxed ${
                  dark ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {m.bestFor}
              </p>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Book an hour with ${m.name}`}
                // Inverted on the dark section. A navy button on the navy
                // background is barely a button; white on navy is the strongest
                // contrast the brand allows and reads as the obvious action.
                className={`mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
                  dark
                    ? 'bg-white text-brand-navy hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                Book now
              </a>
            </div>
          );
        })}
      </div>

      {/* Deliberately quiet. Three named people do not scale, and someone who
          wants a different coach should not have to leave to find one. */}
      <div className="mt-5 text-center">
        <a
          href={MENTOR_DIRECTORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-sm underline underline-offset-4 transition-colors ${
            dark ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          See all available mentors
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {mentorBiosNeedConfirming && (
        <p className={`mt-3 text-center text-[11px] ${dark ? 'text-slate-400' : 'text-slate-400'}`}>
          Full profiles open once this connects to the LinkedLeaders mentor directory.
        </p>
      )}
    </div>
  );
}
