import { CalendarCheck } from 'lucide-react';

interface MentorOfferIntroProps {
  /** 'dark' for the in-page section, 'light' for the pop-up's header band. */
  tone?: 'dark' | 'light';
  /** The visitor's first name, when we have it. */
  name?: string | null;
  /** Centred in the section, left-aligned in the pop-up's band. */
  align?: 'center' | 'left';
}

/**
 * The words above the mentor cards, shared by the pop-up and the in-page
 * section.
 *
 * The two used to argue with each other. The pop-up asked the sharp question,
 * "which of these will you actually run?", while the section led with "design
 * your culture strategy with someone who has done the job" and then spent four
 * bullet points explaining the same hour. Same offer, two pitches, and the
 * weaker one was in the place a visitor is most likely to read carefully.
 *
 * Both now say the one thing worth saying, and there is a single place to
 * change it.
 */
export function MentorOfferIntro({ tone = 'dark', name, align = 'center' }: MentorOfferIntroProps) {
  const dark = tone === 'dark';
  const centred = align === 'center';

  return (
    <div className={centred ? 'text-center' : 'text-left'}>
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${
          dark ? 'bg-white/10' : 'bg-white/15'
        }`}
      >
        <CalendarCheck className={`w-3.5 h-3.5 ${dark ? 'text-blue-300' : 'text-blue-100'}`} />
        <span className={`text-xs font-semibold ${dark ? 'text-blue-100' : 'text-blue-100'}`}>
          One hour, one-to-one
        </span>
      </div>

      <h2
        className={`font-bold tracking-tight text-white ${
          centred ? 'text-3xl md:text-4xl' : 'text-2xl'
        }`}
      >
        {name ? `${name}, which of these will you actually run?` : 'Which of these will you actually run?'}
      </h2>

      <p
        className={`mt-4 text-blue-100 leading-relaxed ${
          centred ? 'text-lg max-w-2xl mx-auto' : 'text-sm max-w-lg'
        }`}
      >
        You have the whole year now. Deciding which few matter for your building, and getting them
        onto a real calendar, is the harder part. Spend an hour on it with someone who has done the
        job.
      </p>
    </div>
  );
}
