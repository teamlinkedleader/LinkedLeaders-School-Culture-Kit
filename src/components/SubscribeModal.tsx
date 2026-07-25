import { useState, useEffect, type FormEvent } from 'react';
import { X, Mail, User, Briefcase, School, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface SubscribeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SubscribeModal({ open, onClose, onSuccess }: SubscribeModalProps) {
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
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    if (!isSupabaseConfigured) {
      setErrorMsg('Sign-ups are not configured yet. Everything on the page is free to read in the meantime.');
      setStatus('error');
      return;
    }

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          role: role.trim() || null,
          school_name: schoolName.trim() || null,
        });

      if (error) {
        if (error.code === '23505') {
          setErrorMsg('You\u2019re already on the list. Your next activity is on its way.');
          setStatus('error');
        } else {
          setErrorMsg('Something went wrong. Please try again.');
          setStatus('error');
        }
        return;
      }

      setStatus('success');
      setTimeout(() => {
        onSuccess(name.trim());
        onClose();
      }, 1400);
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-7 py-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-2xl font-bold text-white">Get the Weekly Activity</h2>
          <p className="text-blue-100 text-sm mt-2">
            Get one culture-building activity delivered to your inbox each week for a full year.
          </p>
        </div>

        {/* Body */}
        <div className="p-7">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <CheckCircle2 className="w-9 h-9 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">You\u2019re In!</h3>
              <p className="text-slate-500 text-sm">
                You\u2019re on the list. Check your inbox for your first activity.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Rivera"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Your Role <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Principal, Assistant Principal, Teacher..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700"
                  />
                </div>
              </div>

              {/* School */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  School or District <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Lincoln Elementary"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-slate-700"
                  />
                </div>
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200">
                  <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-rose-700">{errorMsg}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Send It to Me'
                )}
              </button>

              <p className="text-center text-xs text-slate-400 leading-relaxed">
                We respect your inbox. One email per week, no spam, unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
