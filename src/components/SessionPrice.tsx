import { SESSION_LIST_PRICE_USD, SESSION_PRICE_USD } from '@/data/mentors';

interface SessionPriceProps {
  /** 'lg' for the section and modal headline, 'sm' for the mentor cards. */
  size?: 'lg' | 'sm';
  tone?: 'dark' | 'light';
}

/**
 * The price, shown as the list price struck through beside what is actually
 * paid.
 *
 * The struck-through figure is wrapped in <s> and both numbers carry screen
 * reader labels, because a price that reads as "seventy nine thirty nine" to
 * someone using a screen reader is worse than useless.
 */
export function SessionPrice({ size = 'lg', tone = 'dark' }: SessionPriceProps) {
  const large = size === 'lg';
  const muted = tone === 'dark' ? 'text-slate-400' : 'text-slate-400';
  const strong = tone === 'dark' ? 'text-white' : 'text-slate-800';

  return (
    <p className={`flex items-baseline gap-2 ${large ? '' : 'text-xs font-semibold'}`}>
      <span className="sr-only">Usually</span>
      <s className={`${large ? 'text-xl' : 'text-xs'} ${muted}`} aria-hidden="true">
        ${SESSION_LIST_PRICE_USD}
      </s>
      <span className="sr-only">, now</span>
      <span className={`${large ? 'text-4xl font-bold' : 'text-sm font-bold'} ${strong}`}>
        ${SESSION_PRICE_USD}
      </span>
      {large && <span className="text-slate-400 text-sm">for the hour</span>}
    </p>
  );
}
