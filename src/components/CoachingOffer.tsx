import type { AccessState } from '@/lib/access';
import { MentorCards } from './MentorCards';
import { MentorOfferIntro } from './MentorOfferIntro';

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
 *
 * Structure matches the pop-up exactly, because they are the same offer: the
 * question, then the coaches, then nothing else. The four bullet points that
 * used to sit in between described an hour the mentor cards already describe,
 * and a section that argues its case at length reads less confident than one
 * that simply states it.
 */
export function CoachingOffer({ access }: CoachingOfferProps) {
  return (
    <section id="coaching" className="py-20 md:py-24 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <MentorOfferIntro tone="dark" name={access.name} align="center" />

        <div className="mt-10 text-left">
          <MentorCards tone="dark" />
        </div>
      </div>
    </section>
  );
}
