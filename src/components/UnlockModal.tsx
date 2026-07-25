import { useState, useEffect, type FormEvent } from 'react';
import { X, Mail, User, Briefcase, School, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { totalActivities } from '@/data/stats';

interface UnlockModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function UnlockModal({ open, onClose, onSuccess }: UnlockModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (open) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();

    try {
      // Posts to a Netlify function rather than to MailerLite directly: the
      // MailerLite API key grants full account access and must never reach the
      // browser bundle. MailerLite upserts, so signing up twice is fine.
      const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          name: name.trim(),
          role: role.trim(),
          school_name: schoolName.trim(),
        }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'unknown' }));
        setErrorMsg(
          error === 'not_configured'
            ? 'Sign-ups are not configured yet. Please try again shortly.'
            : 'Something went wrong. Please try again.',
        );
        setStatus('error');
        return;
      }

      setStatus('success');
      setTimeout(() => { onSuccess(name.trim(), cleanEmail); onClose(); }, 1400);
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* The offer */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-7 py-8 relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-2xl font-bold text-white">
            Unlock a Year of Culture Building
          </h2>
          <p className="text-blue-100 text-sm mt-2 max-w-lg">
            All {totalActivities} activities open straight away, free. We will also send you one
            ready-to-run idea a week so you never have to plan it yourself.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-14 px-7">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <CheckCircle2 className="w-9 h-9 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">The whole year is open</h3>
            <p className="text-slate-500 text-sm">
              All {totalActivities} activities are unlocked below, and your first email is on its
              way.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 space-y-6">
            {/* Details. All four are required. */}
            <fieldset className="space-y-4">
              <legend className="sr-only">Your details</legend>

              <Field icon={User} label="Your Name" value={name} onChange={setName} placeholder="Jordan Rivera" />
              <Field icon={Mail} label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@school.edu" />
              <Field icon={Briefcase} label="Your Position" value={role} onChange={setRole} placeholder="Principal, Assistant Principal, Teacher..." />
              <Field icon={School} label="School or District" value={schoolName} onChange={setSchoolName} placeholder="Lincoln Elementary" />
            </fieldset>

            {status === 'error' && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-700">{errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <><Loader2 className="w-5 h-5 animate-spin" />Sending...</>
              ) : (
                'Unlock the Year'
              )}
            </button>

            <p className="text-center text-xs text-slate-400 leading-relaxed">
              One email per week, no spam, unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  icon: typeof User;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">
        {label} <span className="text-rose-500">*</span>
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700"
        />
      </div>
    </div>
  );
}
