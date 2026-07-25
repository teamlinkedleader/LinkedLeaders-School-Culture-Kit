import { UserRound, CalendarCheck } from 'lucide-react';
import { mentors, mentorsArePlaceholders, SESSION_PRICE_USD } from '@/data/mentors';

interface MentorCardsProps {
  /** 'dark' for the slate section, 'light' for the modal. */
  tone?: 'dark' | 'light';
}

/**
 * The three bookable mentors.
 *
 * Shared between the in-page offer and the pop-up so the two never drift apart.
 * While the mentors are placeholders the buttons are inert and say so, rather
 * than looking bookable and doing nothing.
 */
export function MentorCards({ tone = 'dark' }: MentorCardsProps) {
  const dark = tone === 'dark';

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {mentors.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-4 text-left ${
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
            <p className={`text-xs mt-2 leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
              {m.bestFor}
            </p>

            {m.profileUrl ? (
              <a
                href={m.profileUrl}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-400"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                Book ${SESSION_PRICE_USD}
              </a>
            ) : (
              <span
                className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold ${
                  dark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                Booking opens soon
              </span>
            )}
          </div>
        ))}
      </div>

      {mentorsArePlaceholders && (
        <p className={`mt-3 text-[11px] ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
          Example mentors. Real profiles appear here once this is connected to the LinkedLeaders
          mentor directory.
        </p>
      )}
    </div>
  );
}
