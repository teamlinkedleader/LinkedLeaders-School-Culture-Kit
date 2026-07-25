import { Lock, Check, AlertTriangle } from 'lucide-react';
import { totalActivities } from '@/data/stats';
import { PACK_SIZE } from '@/data/packs';
import type { AccessState } from '@/lib/access';

const PRICE_USD = 29;

interface UnlockEverythingProps {
  access: AccessState;
  onClaimClick: () => void;
}

/**
 * The one-time unlock offer.
 *
 * Payment is NOT wired up. The button below deliberately does nothing except
 * explain that, rather than pretending to take money or granting access for
 * free. Wiring it needs, in order:
 *
 *   1. A Stripe account and a Payment Link or Checkout Session for the price.
 *   2. A Supabase Edge Function receiving the Stripe webhook and setting
 *      `paid_at` on the subscriber. It must be server-side: anon has no UPDATE
 *      policy on `subscribers`, and must not be given one.
 *   3. Gated activity content served from the server rather than compiled into
 *      the bundle. Until that is done, every activity is readable in devtools
 *      regardless of payment, so this cannot honestly be sold as locked.
 *
 * Point 3 is the blocker. Do not enable payment before it is resolved.
 */
export function UnlockEverything({ access, onClaimClick }: UnlockEverythingProps) {
  if (access.tier === 'full') return null;

  const hasPack = access.tier === 'pack';

  return (
    <section id="unlock" className="py-20 md:py-24 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-5">
          <Lock className="w-4 h-4 text-blue-300" />
          <span className="text-sm font-semibold text-blue-100">One-time unlock</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Open all {totalActivities} activities
        </h2>
        <p className="mt-4 text-lg text-slate-300 leading-relaxed">
          {hasPack
            ? `You have your ${PACK_SIZE}-activity kit. Unlock the rest of the year in one go.`
            : `Start with a free ${PACK_SIZE}-activity kit, or open the whole collection at once.`}
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 text-left max-w-xl mx-auto">
          {[
            `All ${totalActivities} activities, every month of the year`,
            'The Collaborative Impact Framework and its protocols',
            'The Building Capacity self-reflection tool',
            'One-time payment, no subscription',
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
            <span className="text-slate-400 text-sm ml-2">once, not per month</span>
          </p>

          <button
            type="button"
            disabled
            title="Payment is not connected yet"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 text-white font-semibold opacity-50 cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            Unlock everything for ${PRICE_USD}
          </button>

          {/* Honest placeholder. Better a visibly unfinished button than one
              that looks live and silently does nothing. */}
          <p className="flex items-start gap-2 text-xs text-amber-300/90 max-w-md text-left">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Checkout is not connected yet, so this button is intentionally disabled rather than
              taking payments it cannot fulfil.
            </span>
          </p>

          {!hasPack && (
            <button
              type="button"
              onClick={onClaimClick}
              className="text-sm font-semibold text-blue-300 hover:text-blue-200 underline underline-offset-4"
            >
              Or get {PACK_SIZE} activities free first
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
