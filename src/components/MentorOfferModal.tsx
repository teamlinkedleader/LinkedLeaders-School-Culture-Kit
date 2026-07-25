import { useEffect } from 'react';
import { X, CalendarCheck } from 'lucide-react';
import { MentorCards } from './MentorCards';
import { SESSION_PRICE_USD } from '@/data/mentors';

interface MentorOfferModalProps {
  open: boolean;
  onClose: () => void;
  name: string | null;
}

/**
 * The tripwire, as an interruption.
 *
 * It appears once, after someone has unlocked the year and started reading, on
 * the reasoning that the offer only makes sense to a person who has seen the
 * material and is now facing the real problem: which of these do I actually
 * run. Shown before that it is noise; left at the bottom of the page it is
 * never seen at all.
 *
 * Appearing once and never again is deliberate. A repeating pop-up would earn
 * more dismissals than bookings and would sour the free thing it interrupts.
 */
export function MentorOfferModal({ open, onClose, name }: MentorOfferModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentor-offer-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
      >
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-7 py-7 relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 mb-3">
            <CalendarCheck className="w-3.5 h-3.5 text-blue-100" />
            <span className="text-xs font-semibold text-blue-100">One hour, one-to-one</span>
          </div>
          <h2 id="mentor-offer-title" className="text-2xl font-bold text-white">
            {name ? `${name}, which of these will you actually run?` : 'Which of these will you actually run?'}
          </h2>
          <p className="text-blue-100 text-sm mt-2 max-w-lg">
            You have the whole year now. Deciding which few matter for your building, and getting
            them onto a real calendar, is the harder part. Spend an hour on it with someone who has
            done the job.
          </p>
        </div>

        <div className="p-7">
          <MentorCards tone="light" />

          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <p className="text-slate-800">
              <span className="text-3xl font-bold">${SESSION_PRICE_USD}</span>
              <span className="text-slate-400 text-sm ml-2">for the hour</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold text-slate-500 hover:text-slate-700 underline underline-offset-4"
            >
              Not now, keep reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
