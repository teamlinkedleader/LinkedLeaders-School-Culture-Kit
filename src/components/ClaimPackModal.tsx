import { useState, useEffect, type FormEvent } from 'react';
import { X, Mail, User, Briefcase, School, Loader2, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { packs, PACK_SIZE, type CulturePack } from '@/data/packs';

interface ClaimPackModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (name: string, email: string, packKey: string) => void;
  /** Preselect a theme when the visitor opened this from a specific pack. */
  initialPackKey?: string | null;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ClaimPackModal({ open, onClose, onSuccess, initialPackKey }: ClaimPackModalProps) {
  const [packKey, setPackKey] = useState<string | null>(initialPackKey ?? null);
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
      setPackKey(initialPackKey ?? null);
    }
  }, [open, initialPackKey]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const selected: CulturePack | undefined = packs.find((p) => p.key === packKey);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!packKey) {
      setErrorMsg('Choose which three-pack you would like first.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    if (!isSupabaseConfigured) {
      setErrorMsg('Sign-ups are not configured yet. Please try again shortly.');
      setStatus('error');
      return;
    }

    try {
      const cleanEmail = email.trim().toLowerCase();
      const { error } = await supabase.from('subscribers').insert({
        email: cleanEmail,
        name: name.trim(),
        role: role.trim(),
        school_name: schoolName.trim(),
        pack_theme: packKey,
      });

      if (error) {
        // 23505 is the unique violation on email. An existing subscriber asking
        // for a pack is a normal thing to do, not an error worth blocking on.
        if (error.code === '23505') {
          setStatus('success');
          setTimeout(() => { onSuccess(name.trim(), cleanEmail, packKey); onClose(); }, 1200);
          return;
        }
        setErrorMsg('Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setTimeout(() => { onSuccess(name.trim(), cleanEmail, packKey); onClose(); }, 1400);
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
            Choose Your Free {PACK_SIZE}-Activity Culture Kit
          </h2>
          <p className="text-blue-100 text-sm mt-2 max-w-lg">
            Pick the theme you need most right now. We will send you those {PACK_SIZE} activities,
            ready to run, plus one new idea each week.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-14 px-7">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <CheckCircle2 className="w-9 h-9 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Your kit is unlocked</h3>
            <p className="text-slate-500 text-sm">
              {selected ? `${selected.month}: ${selected.theme}` : ''} is open below, and your first
              email is on its way.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-7 space-y-6">
            {/* Pack chooser */}
            <fieldset>
              <legend className="block text-sm font-semibold text-slate-700 mb-3">
                1. Which {PACK_SIZE} activities would you like?{' '}
                <span className="text-rose-500">*</span>
              </legend>
              <div className="grid gap-2.5 sm:grid-cols-2 max-h-64 overflow-y-auto pr-1">
                {packs.map((p) => {
                  const isSelected = p.key === packKey;
                  return (
                    <button
                      type="button"
                      key={p.key}
                      onClick={() => setPackKey(p.key)}
                      aria-pressed={isSelected}
                      className={`text-left rounded-xl border-2 p-3.5 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{p.theme}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{p.month}</p>
                        </div>
                        {isSelected && (
                          <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-600">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {selected && (
                <ul className="mt-3 rounded-lg bg-slate-50 border border-slate-100 p-3 space-y-1">
                  {selected.activities.map((a) => (
                    <li key={a.id} className="flex gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{a.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </fieldset>

            {/* Details. All four are required. */}
            <fieldset className="space-y-4">
              <legend className="block text-sm font-semibold text-slate-700 mb-1">
                2. Where should we send it? <span className="text-rose-500">*</span>
              </legend>

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
                `Send Me My ${PACK_SIZE} Activities`
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
