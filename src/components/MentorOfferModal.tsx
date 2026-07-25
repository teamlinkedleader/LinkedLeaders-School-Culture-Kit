import { useEffect } from 'react';
import { X } from 'lucide-react';
import { MentorCards } from './MentorCards';
import { MentorOfferIntro } from './MentorOfferIntro';

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
          <div id="mentor-offer-title">
            <MentorOfferIntro tone="light" name={name} align="left" />
          </div>
        </div>

        <div className="p-7">
          <MentorCards tone="light" />

          <div className="mt-6 flex flex-col items-center gap-3 text-center">
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
